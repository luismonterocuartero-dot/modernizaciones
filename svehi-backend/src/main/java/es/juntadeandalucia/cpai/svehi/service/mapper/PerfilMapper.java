package es.juntadeandalucia.cpai.svehi.service.mapper;

import es.juntadeandalucia.cpai.svehi.domain.Perfil;
import es.juntadeandalucia.cpai.svehi.model.vo.PerfilVO;

public interface PerfilMapper {
    PerfilVO toVO(Perfil entity);

    Perfil toEntity(PerfilVO vo);
}
