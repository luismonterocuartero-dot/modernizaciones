package es.juntadeandalucia.cpai.svehi.service.mapper.impl;

import es.juntadeandalucia.cpai.svehi.domain.Usuario;
import es.juntadeandalucia.cpai.svehi.model.vo.UsuarioVO;
import es.juntadeandalucia.cpai.svehi.service.mapper.UsuarioMapper;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UsuarioMapperImpl implements UsuarioMapper {

    private final ModelMapper mapper;

    @Override
    public UsuarioVO toVO(Usuario entity) {
        return mapper.map(entity, UsuarioVO.class);
    }

    @Override
    public Usuario toEntity(UsuarioVO vo) {
        return mapper.map(vo, Usuario.class);
    }
}
