package es.juntadeandalucia.cpai.svehi.service.impl;

import es.juntadeandalucia.cpai.svehi.domain.*;
import es.juntadeandalucia.cpai.svehi.exception.AppErrorCode;
import es.juntadeandalucia.cpai.svehi.exception.BusinessValidationException;
import es.juntadeandalucia.cpai.svehi.model.vo.*;
import es.juntadeandalucia.cpai.svehi.repository.*;
import es.juntadeandalucia.cpai.svehi.service.GestionService;
import es.juntadeandalucia.cpai.svehi.service.mapper.GestionMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class GestionServiceImpl implements GestionService {

    private final CompaniaRepository companiaRepository;
    private final ConceptoRepository conceptoRepository;
    private final ModeloRepository modeloRepository;
    private final OperadoraRepository operadoraRepository;
    private final ParametroRepository parametroRepository;
    private final GestionMapper gestionMapper;

    // ==================== COMPANIA ====================
    @Override
    public List<CompaniaVO> findAllCompanias() {
        log.debug("Buscando todas las compañías");
        return companiaRepository.findAll().stream()
                .map(gestionMapper::toCompaniaVO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public CompaniaVO createCompania(CompaniaVO vo) {
        log.debug("Creando compañía: {}", vo.getNombre());
        Compania entity = gestionMapper.toCompaniaEntity(vo);
        Compania saved = companiaRepository.save(entity);
        return gestionMapper.toCompaniaVO(saved);
    }

    @Override
    @Transactional
    public CompaniaVO updateCompania(Long id, CompaniaVO vo) {
        log.debug("Actualizando compañía con id: {}", id);
        Compania existing = companiaRepository.findById(id)
                .orElseThrow(
                        () -> new BusinessValidationException("Compañía no encontrada", AppErrorCode.ENTITY_NOT_FOUND));

        existing.setNombre(vo.getNombre());
        existing.setActivo(vo.getActivo());

        Compania updated = companiaRepository.save(existing);
        return gestionMapper.toCompaniaVO(updated);
    }

    @Override
    @Transactional
    public void deleteCompania(Long id) {
        log.debug("Eliminando compañía con id: {}", id);
        if (!companiaRepository.existsById(id)) {
            throw new BusinessValidationException("Compañía no encontrada", AppErrorCode.ENTITY_NOT_FOUND);
        }
        companiaRepository.deleteById(id);
    }

    // ==================== CONCEPTO ====================
    @Override
    public List<ConceptoVO> findAllConceptos() {
        log.debug("Buscando todos los conceptos");
        return conceptoRepository.findAll().stream()
                .map(gestionMapper::toConceptoVO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ConceptoVO createConcepto(ConceptoVO vo) {
        log.debug("Creando concepto: {}", vo.getNombre());
        Concepto entity = gestionMapper.toConceptoEntity(vo);
        Concepto saved = conceptoRepository.save(entity);
        return gestionMapper.toConceptoVO(saved);
    }

    // ==================== MODELO ====================
    @Override
    public List<ModeloVO> findAllModelos() {
        log.debug("Buscando todos los modelos");
        return modeloRepository.findAll().stream()
                .map(gestionMapper::toModeloVO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ModeloVO createModelo(ModeloVO vo) {
        log.debug("Creando modelo: {}", vo.getNombre());
        Modelo entity = gestionMapper.toModeloEntity(vo);
        Modelo saved = modeloRepository.save(entity);
        return gestionMapper.toModeloVO(saved);
    }

    // ==================== OPERADORA ====================
    @Override
    public List<OperadoraVO> findAllOperadoras() {
        log.debug("Buscando todas las operadoras");
        return operadoraRepository.findAll().stream()
                .map(gestionMapper::toOperadoraVO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public OperadoraVO createOperadora(OperadoraVO vo) {
        log.debug("Creando operadora: {}", vo.getNombre());
        Operadora entity = gestionMapper.toOperadoraEntity(vo);
        Operadora saved = operadoraRepository.save(entity);
        return gestionMapper.toOperadoraVO(saved);
    }

    // ==================== PARAMETRO ====================
    @Override
    public List<ParametroVO> findAllParametros() {
        log.debug("Buscando todos los parámetros");
        return parametroRepository.findAll().stream()
                .map(gestionMapper::toParametroVO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ParametroVO createParametro(ParametroVO vo) {
        log.debug("Creando parámetro: {}", vo.getNombre());
        Parametro entity = gestionMapper.toParametroEntity(vo);
        Parametro saved = parametroRepository.save(entity);
        return gestionMapper.toParametroVO(saved);
    }
}
