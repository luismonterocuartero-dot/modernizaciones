package es.juntadeandalucia.cpai.svehi.service;

import es.juntadeandalucia.cpai.svehi.model.vo.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;

public interface GestionService {
    // Compania
    List<CompaniaVO> findAllCompanias();

    CompaniaVO createCompania(CompaniaVO vo);

    CompaniaVO updateCompania(Long id, CompaniaVO vo);

    void deleteCompania(Long id);

    // Concepto
    List<ConceptoVO> findAllConceptos();

    ConceptoVO createConcepto(ConceptoVO vo);

    // Modelo
    List<ModeloVO> findAllModelos();

    ModeloVO createModelo(ModeloVO vo);

    // Operadora
    List<OperadoraVO> findAllOperadoras();

    OperadoraVO createOperadora(OperadoraVO vo);

    // Parametro
    List<ParametroVO> findAllParametros();

    ParametroVO createParametro(ParametroVO vo);
}
