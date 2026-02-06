package es.juntadeandalucia.cpai.svehi.service.mapper.impl;

import es.juntadeandalucia.cpai.svehi.domain.*;
import es.juntadeandalucia.cpai.svehi.model.vo.*;
import es.juntadeandalucia.cpai.svehi.service.mapper.GestionMapper;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class GestionMapperImpl implements GestionMapper {

    private final ModelMapper mapper;

    // ==================== COMPANIA ====================
    @Override
    public CompaniaVO toCompaniaVO(Compania entity) {
        return mapper.map(entity, CompaniaVO.class);
    }

    @Override
    public Compania toCompaniaEntity(CompaniaVO vo) {
        return mapper.map(vo, Compania.class);
    }

    // ==================== CONCEPTO ====================
    @Override
    public ConceptoVO toConceptoVO(Concepto entity) {
        return mapper.map(entity, ConceptoVO.class);
    }

    @Override
    public Concepto toConceptoEntity(ConceptoVO vo) {
        return mapper.map(vo, Concepto.class);
    }

    // ==================== MODELO ====================
    @Override
    public ModeloVO toModeloVO(Modelo entity) {
        return mapper.map(entity, ModeloVO.class);
    }

    @Override
    public Modelo toModeloEntity(ModeloVO vo) {
        return mapper.map(vo, Modelo.class);
    }

    // ==================== OPERADORA ====================
    @Override
    public OperadoraVO toOperadoraVO(Operadora entity) {
        return mapper.map(entity, OperadoraVO.class);
    }

    @Override
    public Operadora toOperadoraEntity(OperadoraVO vo) {
        return mapper.map(vo, Operadora.class);
    }

    // ==================== PARAMETRO ====================
    @Override
    public ParametroVO toParametroVO(Parametro entity) {
        return mapper.map(entity, ParametroVO.class);
    }

    @Override
    public Parametro toParametroEntity(ParametroVO vo) {
        return mapper.map(vo, Parametro.class);
    }
}
