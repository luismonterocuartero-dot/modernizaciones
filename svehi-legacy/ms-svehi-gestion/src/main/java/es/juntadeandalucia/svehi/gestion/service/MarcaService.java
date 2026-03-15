package es.juntadeandalucia.svehi.gestion.service;

import es.juntadeandalucia.svehi.gestion.model.vo.MarcaVO;
import java.util.List;

public interface MarcaService {
    List<MarcaVO> findAll();

    MarcaVO findById(Long id);

    MarcaVO save(MarcaVO marcaVO);

    void delete(Long id);
}
