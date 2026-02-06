package es.juntadeandalucia.cpai.svehi.service.impl;

import es.juntadeandalucia.cpai.svehi.domain.Usuario;
import es.juntadeandalucia.cpai.svehi.exception.AppErrorCode;
import es.juntadeandalucia.cpai.svehi.exception.BusinessValidationException;
import es.juntadeandalucia.cpai.svehi.exception.DuplicateEntityException;
import es.juntadeandalucia.cpai.svehi.model.vo.PageUsuarioVO;
import es.juntadeandalucia.cpai.svehi.model.vo.UsuarioVO;
import es.juntadeandalucia.cpai.svehi.repository.UsuarioRepository;
import es.juntadeandalucia.cpai.svehi.repository.PerfilRepository;
import es.juntadeandalucia.cpai.svehi.service.UsuarioService;
import es.juntadeandalucia.cpai.svehi.service.ValidationService;
import es.juntadeandalucia.cpai.svehi.service.mapper.UsuarioMapper;
import es.juntadeandalucia.cpai.svehi.repository.PermisoRepository;
import es.juntadeandalucia.cpai.svehi.domain.Permiso;
import es.juntadeandalucia.cpai.svehi.model.vo.PermisoVO;
import org.modelmapper.ModelMapper;
import java.util.HashSet;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import jakarta.persistence.EntityNotFoundException;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class UsuarioServiceImpl implements UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final PerfilRepository perfilRepository;
    private final UsuarioMapper usuarioMapper;
    private final PermisoRepository permisoRepository;
    private final ModelMapper modelMapper;
    private final ValidationService validationService;

    @Override
    @Transactional(readOnly = true)
    public PageUsuarioVO findAll(String nif, String nombre, Pageable pageable) {
        log.info("Buscando usuarios con filtros - NIF: {}, Nombre: {}", nif, nombre);
        Specification<Usuario> spec = Specification.where(null);

        if (nif != null && !nif.isEmpty()) {
            spec = spec.and((root, query, cb) -> cb.equal(root.get("nif"), nif));
        }
        if (nombre != null && !nombre.isEmpty()) {
            spec = spec
                    .and((root, query, cb) -> cb.like(cb.lower(root.get("nombre")), "%" + nombre.toLowerCase() + "%"));
        }

        Page<Usuario> page = usuarioRepository.findAll(spec, pageable);

        List<UsuarioVO> content = page.getContent().stream()
                .map(usuarioMapper::toVO)
                .toList();

        PageUsuarioVO result = new PageUsuarioVO();
        result.setContent(content);
        result.setTotalElements(page.getTotalElements());
        result.setTotalPages(page.getTotalPages());
        result.setSize(page.getSize());
        result.setNumber(page.getNumber());

        return result;
    }

    @Override
    @Transactional(readOnly = true)
    public UsuarioVO findById(Long id) {
        log.info("Obteniendo usuario por ID: {}", id);
        return usuarioRepository.findById(id)
                .map(usuarioMapper::toVO)
                .orElseThrow(() -> new EntityNotFoundException("Usuario no encontrado con id: " + id));
    }

    @Override
    public UsuarioVO create(UsuarioVO usuarioVO) {
        log.info("Creando nuevo usuario con NIF: {}", usuarioVO.getNif());

        // Validaciones de campos obligatorios
        validationService.validateNIF(usuarioVO.getNif());
        validationService.validateRequiredField(usuarioVO.getNombre(), "Nombre");
        validationService.validateRequiredField(usuarioVO.getApellido1(), "Apellido1");
        validationService.validateRequiredField(usuarioVO.getApellido2(), "Apellido2");
        validationService.validateRequiredObject(usuarioVO.getPerfilId(), "Perfil");
        validationService.validateRequiredField(usuarioVO.getServicioAdscrito(), "Servicio Adscrito");
        validationService.validateEmail(usuarioVO.getEmail());

        // Verificar NIF duplicado
        if (usuarioRepository.existsByNif(usuarioVO.getNif())) {
            log.warn("Intento de crear usuario con NIF duplicado: {}", usuarioVO.getNif());
            throw new DuplicateEntityException("Ya existe un usuario con NIF: " + usuarioVO.getNif());
        }

        Usuario entity = usuarioMapper.toEntity(usuarioVO);

        // Verificar que el perfil existe
        if (usuarioVO.getPerfilId() != null) {
            entity.setPerfil(perfilRepository.findById(usuarioVO.getPerfilId())
                    .orElseThrow(() -> new BusinessValidationException(
                            "Perfil no encontrado con id: " + usuarioVO.getPerfilId(),
                            AppErrorCode.INVALID_REFERENCE)));
        }

        // Por defecto, los usuarios se crean activos
        if (usuarioVO.getActivo() == null) {
            entity.setActivo(true);
        }

        Usuario saved = usuarioRepository.save(entity);
        log.info("Usuario creado con ID: {}", saved.getId());
        return usuarioMapper.toVO(saved);
    }

    @Override
    public UsuarioVO update(Long id, UsuarioVO usuarioVO) {
        log.info("Actualizando usuario con ID: {}", id);

        // Validaciones
        validationService.validateRequiredField(usuarioVO.getNombre(), "Nombre");
        validationService.validateRequiredField(usuarioVO.getApellido1(), "Apellido1");
        validationService.validateRequiredField(usuarioVO.getApellido2(), "Apellido2");
        validationService.validateEmail(usuarioVO.getEmail());

        Usuario existing = usuarioRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Usuario no encontrado con id: " + id));

        // Actualizar campos
        existing.setNombre(usuarioVO.getNombre());
        existing.setApellido1(usuarioVO.getApellido1());
        existing.setApellido2(usuarioVO.getApellido2());
        existing.setEmail(usuarioVO.getEmail());
        existing.setActivo(usuarioVO.getActivo() != null ? usuarioVO.getActivo() : existing.isActivo());
        existing.setServicioAdscrito(usuarioVO.getServicioAdscrito());

        if (usuarioVO.getPerfilId() != null) {
            existing.setPerfil(perfilRepository.findById(usuarioVO.getPerfilId())
                    .orElseThrow(() -> new BusinessValidationException(
                            "Perfil no encontrado con id: " + usuarioVO.getPerfilId(),
                            AppErrorCode.INVALID_REFERENCE)));
        }

        Usuario saved = usuarioRepository.save(existing);
        log.info("Usuario actualizado: {}", saved.getId());
        return usuarioMapper.toVO(saved);
    }

    @Override
    public void delete(Long id) {
        log.info("Desactivando usuario con ID: {}", id);

        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Usuario no encontrado con id: " + id));

        // Los usuarios NO se eliminan, solo se desactivan (regla de negocio)
        usuario.setActivo(false);
        usuarioRepository.save(usuario);
        log.info("Usuario desactivado: {}", id);
    }

    // --- Permisos ---

    @Override
    @Transactional(readOnly = true)
    public List<PermisoVO> findAllPermisos() {
        log.info("Obteniendo todos los permisos");
        return permisoRepository.findAll().stream()
                .map(p -> modelMapper.map(p, PermisoVO.class))
                .collect(Collectors.toList());
    }

    @Override
    public PermisoVO createPermiso(PermisoVO vo) {
        log.info("Creando nuevo permiso: {}", vo.getNombre());

        // Validaciones
        validationService.validateRequiredField(vo.getNombre(), "Nombre");
        validationService.validateRequiredField(vo.getObjeto(), "Objeto");
        validationService.validateRequiredObject(vo.getTipoPermiso(), "Tipo Permiso");

        // Validar que el tipo de permiso es válido
        if (!vo.getTipoPermiso().equals("VISUALIZACION") && !vo.getTipoPermiso().equals("EDICION")) {
            throw new BusinessValidationException(
                    "Tipo de permiso inválido. Debe ser VISUALIZACION o EDICION",
                    AppErrorCode.INVALID_ARGUMENT);
        }

        Permiso entity = modelMapper.map(vo, Permiso.class);
        entity.setId(null);

        Permiso saved = permisoRepository.save(entity);
        log.info("Permiso creado con ID: {}", saved.getId());
        return modelMapper.map(saved, PermisoVO.class);
    }

    @Override
    @Transactional(readOnly = true)
    public List<PermisoVO> findPermisosByUsuario(Long usuarioId) {
        log.info("Obteniendo permisos del usuario: {}", usuarioId);

        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new EntityNotFoundException("Usuario no encontrado con id: " + usuarioId));

        if (usuario.getPermisos() == null) {
            return List.of();
        }

        return usuario.getPermisos().stream()
                .map(p -> modelMapper.map(p, PermisoVO.class))
                .collect(Collectors.toList());
    }

    @Override
    public void updatePermisosUsuario(Long usuarioId, List<Long> permisoIds) {
        log.info("Actualizando permisos del usuario: {}", usuarioId);

        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new EntityNotFoundException("Usuario no encontrado con id: " + usuarioId));

        // Verificar que todos los permisos existen
        List<Permiso> permisos = permisoRepository.findAllById(permisoIds);
        if (permisos.size() != permisoIds.size()) {
            throw new BusinessValidationException(
                    "Uno o más permisos no existen",
                    AppErrorCode.INVALID_REFERENCE);
        }

        usuario.setPermisos(new HashSet<>(permisos));
        usuarioRepository.save(usuario);
        log.info("Permisos actualizados para usuario: {}", usuarioId);
    }
}
