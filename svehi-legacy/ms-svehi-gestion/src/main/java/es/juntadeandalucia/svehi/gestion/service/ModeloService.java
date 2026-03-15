package es.juntadeandalucia.svehi.gestion.service;

import es.juntadeandalucia.svehi.gestion.model.vo.ModeloVO;
import java.util.List;

public interface ModeloService {
    List<ModeloVO> findByMarca(Long marcaId);

    ModeloVO save(ModeloVO modeloVO);
}
