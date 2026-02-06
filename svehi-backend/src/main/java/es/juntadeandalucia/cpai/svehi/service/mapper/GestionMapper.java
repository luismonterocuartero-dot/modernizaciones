package es.juntadeandalucia.cpai.svehi.service.mapper;

import es.juntadeandalucia.cpai.svehi.domain.*;
import es.juntadeandalucia.cpai.svehi.model.vo.*;

public interface GestionMapper {
    // Compania
    CompaniaVO toCompaniaVO(Compania entity);

    Compania toCompaniaEntity(CompaniaVO vo);

    // Concepto
    ConceptoVO toConceptoVO(Concepto entity);

    Concepto toConceptoEntity(ConceptoVO vo);

    // Modelo
    ModeloVO toModeloVO(Modelo entity);

    Modelo toModeloEntity(ModeloVO vo);

    // Operadora
    OperadoraVO toOperadoraVO(Operadora entity);

    Operadora toOperadoraEntity(OperadoraVO vo);

    // Parametro
    ParametroVO toParametroVO(Parametro entity);

    Parametro toParametroEntity(ParametroVO vo);
}
