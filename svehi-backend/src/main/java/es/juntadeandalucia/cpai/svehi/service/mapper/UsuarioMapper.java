package es.juntadeandalucia.cpai.svehi.service.mapper;

import es.juntadeandalucia.cpai.svehi.domain.Usuario;
import es.juntadeandalucia.cpai.svehi.model.vo.UsuarioVO;

public interface UsuarioMapper {
    UsuarioVO toVO(Usuario entity);

    Usuario toEntity(UsuarioVO vo);
}
