package es.juntadeandalucia.cpai.svehi.service;

import es.juntadeandalucia.cpai.svehi.model.vo.MarcaVO;
import es.juntadeandalucia.cpai.svehi.model.vo.PerfilVO;
import java.util.List;

public interface MaestrosService {
    List<MarcaVO> getMarcas();

    List<PerfilVO> getPerfiles();
}
