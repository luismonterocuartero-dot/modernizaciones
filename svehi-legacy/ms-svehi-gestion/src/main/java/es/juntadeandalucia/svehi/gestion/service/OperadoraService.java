package es.juntadeandalucia.svehi.gestion.service;

import es.juntadeandalucia.svehi.gestion.model.vo.OperadoraVO;
import java.util.List;

public interface OperadoraService {
    List<OperadoraVO> findAll();

    OperadoraVO save(OperadoraVO operadoraVO);
}
