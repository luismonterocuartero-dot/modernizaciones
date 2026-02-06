package es.juntadeandalucia.cpai.svehi.service.impl;

import es.juntadeandalucia.cpai.svehi.domain.Usuario;
import es.juntadeandalucia.cpai.svehi.model.vo.LoginRequestVO;
import es.juntadeandalucia.cpai.svehi.model.vo.UsuarioVO;
import es.juntadeandalucia.cpai.svehi.repository.UsuarioRepository;
import es.juntadeandalucia.cpai.svehi.service.AuthService;
import es.juntadeandalucia.cpai.svehi.service.mapper.UsuarioMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import jakarta.persistence.EntityNotFoundException;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UsuarioRepository usuarioRepository;
    private final UsuarioMapper usuarioMapper;

    @Override
    @Transactional(readOnly = true)
    public UsuarioVO login(LoginRequestVO loginRequest) {
        log.info("Intento de login para usuario: {}", loginRequest.getUsername());

        Usuario usuario = usuarioRepository.findByUsernameAndActivoTrue(loginRequest.getUsername())
                .orElseThrow(() -> new EntityNotFoundException("Usuario no encontrado o inactivo"));

        // Comparación de contraseña (en texto plano por ahora según requerimiento
        // simple)
        // TODO: Usar PasswordEncoder
        if (!usuario.getPassword().equals(loginRequest.getPassword())) {
            log.warn("Contraseña incorrecta para usuario: {}", loginRequest.getUsername());
            throw new IllegalArgumentException("Credenciales inválidas");
        }

        log.info("Login exitoso para usuario: {}", usuario.getEmail());
        return usuarioMapper.toVO(usuario);
    }

    @Override
    @Transactional(readOnly = true)
    public UsuarioVO loginWithCertificate(String nif) {
        log.info("Intento de login con certificado para NIF: {}", nif);

        Usuario usuario = usuarioRepository.findByNif(nif)
                .orElseThrow(() -> new EntityNotFoundException("Usuario no encontrado con certificado"));

        if (!usuario.isActivo()) {
            throw new IllegalArgumentException("Usuario inactivo");
        }

        log.info("Login certificado exitoso para usuario: {}", usuario.getEmail());
        return usuarioMapper.toVO(usuario);
    }
}
