package es.juntadeandalucia.svehi.gestion.service;

import es.juntadeandalucia.svehi.gestion.model.vo.CompaniaVO;
import java.util.List;

public interface CompaniaService {
    List<CompaniaVO> findAll();

    CompaniaVO save(CompaniaVO companiaVO);
}
