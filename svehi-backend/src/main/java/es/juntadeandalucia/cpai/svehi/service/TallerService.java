package es.juntadeandalucia.cpai.svehi.service;

import es.juntadeandalucia.cpai.svehi.model.vo.TallerVO;
import es.juntadeandalucia.cpai.svehi.model.vo.ServicioTallerVO;
import java.util.List;

public interface TallerService {
    List<TallerVO> findAll();

    TallerVO create(TallerVO vo);

    List<ServicioTallerVO> findServiciosByTaller(Long tallerId);

    void addServicio(Long tallerId, ServicioTallerVO vo);
}
