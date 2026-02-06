package es.juntadeandalucia.cpai.svehi.service.impl;

import es.juntadeandalucia.cpai.svehi.domain.Vehiculo;
import es.juntadeandalucia.cpai.svehi.model.vo.PageVehiculoVO;
import es.juntadeandalucia.cpai.svehi.model.vo.VehiculoVO;
import es.juntadeandalucia.cpai.svehi.repository.MarcaRepository;
import es.juntadeandalucia.cpai.svehi.repository.VehiculoRepository;
import es.juntadeandalucia.cpai.svehi.service.VehiculoService;
import es.juntadeandalucia.cpai.svehi.service.mapper.VehiculoMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import es.juntadeandalucia.cpai.svehi.repository.MatriculaRepository;
import es.juntadeandalucia.cpai.svehi.repository.EquipamientoRepository;
import es.juntadeandalucia.cpai.svehi.repository.MantenimientoRepository;
import es.juntadeandalucia.cpai.svehi.domain.Matricula;
import es.juntadeandalucia.cpai.svehi.model.vo.MatriculaVO;
import es.juntadeandalucia.cpai.svehi.domain.Equipamiento;
import es.juntadeandalucia.cpai.svehi.model.vo.EquipamientoVO;
import es.juntadeandalucia.cpai.svehi.domain.Mantenimiento;
import es.juntadeandalucia.cpai.svehi.model.vo.MantenimientoVO;
import es.juntadeandalucia.cpai.svehi.repository.CesionRepository;
import es.juntadeandalucia.cpai.svehi.repository.RepostajeRepository;
import es.juntadeandalucia.cpai.svehi.repository.SiniestroRepository;
import es.juntadeandalucia.cpai.svehi.repository.PolizaRepository;
import es.juntadeandalucia.cpai.svehi.repository.ItvRepository;
import es.juntadeandalucia.cpai.svehi.repository.InfraccionRepository;
import es.juntadeandalucia.cpai.svehi.domain.Cesion;
import es.juntadeandalucia.cpai.svehi.model.vo.CesionVO;
import es.juntadeandalucia.cpai.svehi.domain.Repostaje;
import es.juntadeandalucia.cpai.svehi.model.vo.RepostajeVO;
import es.juntadeandalucia.cpai.svehi.domain.Siniestro;
import es.juntadeandalucia.cpai.svehi.model.vo.SiniestroVO;
import es.juntadeandalucia.cpai.svehi.domain.Poliza;
import es.juntadeandalucia.cpai.svehi.model.vo.PolizaVO;
import es.juntadeandalucia.cpai.svehi.domain.Itv;
import es.juntadeandalucia.cpai.svehi.model.vo.ItvVO;
import es.juntadeandalucia.cpai.svehi.domain.Infraccion;
import es.juntadeandalucia.cpai.svehi.model.vo.InfraccionVO;
import org.modelmapper.ModelMapper;
import java.util.List;

import jakarta.persistence.EntityNotFoundException;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class VehiculoServiceImpl implements VehiculoService {

    private final VehiculoRepository vehiculoRepository;
    private final MarcaRepository marcaRepository;
    private final VehiculoMapper vehiculoMapper;
    private final MatriculaRepository matriculaRepository;
    private final EquipamientoRepository equipamientoRepository;
    private final MantenimientoRepository mantenimientoRepository;
    private final CesionRepository cesionRepository;
    private final RepostajeRepository repostajeRepository;
    private final SiniestroRepository siniestroRepository;
    private final PolizaRepository polizaRepository;
    private final ItvRepository itvRepository;
    private final InfraccionRepository infraccionRepository;
    private final ModelMapper modelMapper;

    @Override
    @Transactional(readOnly = true)
    public PageVehiculoVO findByFilters(String matricula, Long marcaId, int page, int size) {
        log.info("Buscando vehículos con filtros - Matrícula: {}, MarcaId: {}", matricula, marcaId);
        Page<Vehiculo> result = vehiculoRepository.findAllByFilters(matricula, marcaId, PageRequest.of(page, size));

        PageVehiculoVO vo = new PageVehiculoVO();
        vo.setContent(result.getContent().stream().map(vehiculoMapper::toVO).collect(Collectors.toList()));
        vo.setTotalElements((int) result.getTotalElements());
        vo.setTotalPages(result.getTotalPages());
        vo.setSize(result.getSize());
        vo.setNumber(result.getNumber());
        return vo;
    }

    @Override
    @Transactional
    public VehiculoVO create(VehiculoVO vo) {
        log.info("Creando nuevo vehículo con matrícula: {}", vo.getMatricula());
        Vehiculo entity = vehiculoMapper.toEntity(vo);

        if (vo.getMarcaId() != null) {
            entity.setMarca(marcaRepository.findById(vo.getMarcaId())
                    .orElseThrow(() -> new EntityNotFoundException("Marca no encontrada con id: " + vo.getMarcaId())));
        }

        Vehiculo saved = vehiculoRepository.save(entity);
        return vehiculoMapper.toVO(saved);
    }

    // --- Sub-recursos ---

    @Override
    @Transactional(readOnly = true)
    public List<MatriculaVO> getMatriculas(Long vehiculoId) {
        return matriculaRepository.findByVehiculoId(vehiculoId).stream()
                .map(e -> modelMapper.map(e, MatriculaVO.class))
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void addMatricula(Long vehiculoId, MatriculaVO vo) {
        Vehiculo vehiculo = vehiculoRepository.findById(vehiculoId)
                .orElseThrow(() -> new EntityNotFoundException("Vehiculo no encontrado: " + vehiculoId));
        Matricula entity = modelMapper.map(vo, Matricula.class);
        entity.setId(null);
        entity.setVehiculo(vehiculo);
        matriculaRepository.save(entity);
    }

    @Override
    @Transactional(readOnly = true)
    public List<EquipamientoVO> getEquipamiento(Long vehiculoId) {
        return equipamientoRepository.findByVehiculoId(vehiculoId).stream()
                .map(e -> modelMapper.map(e, EquipamientoVO.class))
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void addEquipamiento(Long vehiculoId, EquipamientoVO vo) {
        Vehiculo vehiculo = vehiculoRepository.findById(vehiculoId)
                .orElseThrow(() -> new EntityNotFoundException("Vehiculo no encontrado: " + vehiculoId));
        Equipamiento entity = modelMapper.map(vo, Equipamiento.class);
        entity.setId(null);
        entity.setVehiculo(vehiculo);
        equipamientoRepository.save(entity);
    }

    @Override
    @Transactional(readOnly = true)
    public List<MantenimientoVO> getMantenimientos(Long vehiculoId) {
        return mantenimientoRepository.findByVehiculoId(vehiculoId).stream()
                .map(e -> modelMapper.map(e, MantenimientoVO.class))
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void addMantenimiento(Long vehiculoId, MantenimientoVO vo) {
        Vehiculo vehiculo = vehiculoRepository.findById(vehiculoId)
                .orElseThrow(() -> new EntityNotFoundException("Vehiculo no encontrado: " + vehiculoId));
        Mantenimiento entity = modelMapper.map(vo, Mantenimiento.class);
        entity.setId(null);
        entity.setVehiculo(vehiculo);
        mantenimientoRepository.save(entity);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CesionVO> getCesiones(Long vehiculoId) {
        return cesionRepository.findByVehiculoId(vehiculoId).stream()
                .map(e -> modelMapper.map(e, CesionVO.class))
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void addCesion(Long vehiculoId, CesionVO vo) {
        Vehiculo vehiculo = vehiculoRepository.findById(vehiculoId)
                .orElseThrow(() -> new EntityNotFoundException("Vehiculo no encontrado: " + vehiculoId));
        Cesion entity = modelMapper.map(vo, Cesion.class);
        entity.setId(null);
        entity.setVehiculo(vehiculo);
        cesionRepository.save(entity);
    }

    @Override
    @Transactional(readOnly = true)
    public List<RepostajeVO> getRepostajes(Long vehiculoId) {
        return repostajeRepository.findByVehiculoId(vehiculoId).stream()
                .map(e -> modelMapper.map(e, RepostajeVO.class))
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void addRepostaje(Long vehiculoId, RepostajeVO vo) {
        Vehiculo vehiculo = vehiculoRepository.findById(vehiculoId)
                .orElseThrow(() -> new EntityNotFoundException("Vehiculo no encontrado: " + vehiculoId));
        Repostaje entity = modelMapper.map(vo, Repostaje.class);
        entity.setId(null);
        entity.setVehiculo(vehiculo);
        repostajeRepository.save(entity);
    }

    @Override
    @Transactional(readOnly = true)
    public List<SiniestroVO> getSiniestros(Long vehiculoId) {
        return siniestroRepository.findByVehiculoId(vehiculoId).stream()
                .map(e -> modelMapper.map(e, SiniestroVO.class))
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void addSiniestro(Long vehiculoId, SiniestroVO vo) {
        Vehiculo vehiculo = vehiculoRepository.findById(vehiculoId)
                .orElseThrow(() -> new EntityNotFoundException("Vehiculo no encontrado: " + vehiculoId));
        Siniestro entity = modelMapper.map(vo, Siniestro.class);
        entity.setId(null);
        entity.setVehiculo(vehiculo);
        siniestroRepository.save(entity);
    }

    @Override
    @Transactional(readOnly = true)
    public List<PolizaVO> getPolizas(Long vehiculoId) {
        return polizaRepository.findByVehiculoId(vehiculoId).stream()
                .map(e -> modelMapper.map(e, PolizaVO.class))
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void addPoliza(Long vehiculoId, PolizaVO vo) {
        Vehiculo vehiculo = vehiculoRepository.findById(vehiculoId)
                .orElseThrow(() -> new EntityNotFoundException("Vehiculo no encontrado: " + vehiculoId));
        Poliza entity = modelMapper.map(vo, Poliza.class);
        entity.setId(null);
        entity.setVehiculo(vehiculo);
        polizaRepository.save(entity);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ItvVO> getItvs(Long vehiculoId) {
        return itvRepository.findByVehiculoId(vehiculoId).stream()
                .map(e -> modelMapper.map(e, ItvVO.class))
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void addItv(Long vehiculoId, ItvVO vo) {
        Vehiculo vehiculo = vehiculoRepository.findById(vehiculoId)
                .orElseThrow(() -> new EntityNotFoundException("Vehiculo no encontrado: " + vehiculoId));
        Itv entity = modelMapper.map(vo, Itv.class);
        entity.setId(null);
        entity.setVehiculo(vehiculo);
        itvRepository.save(entity);
    }

    @Override
    @Transactional(readOnly = true)
    public List<InfraccionVO> getInfracciones(Long vehiculoId) {
        return infraccionRepository.findByVehiculoId(vehiculoId).stream()
                .map(e -> modelMapper.map(e, InfraccionVO.class))
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void addInfraccion(Long vehiculoId, InfraccionVO vo) {
        Vehiculo vehiculo = vehiculoRepository.findById(vehiculoId)
                .orElseThrow(() -> new EntityNotFoundException("Vehiculo no encontrado: " + vehiculoId));
        Infraccion entity = modelMapper.map(vo, Infraccion.class);
        entity.setId(null);
        entity.setVehiculo(vehiculo);
        infraccionRepository.save(entity);
    }
}
