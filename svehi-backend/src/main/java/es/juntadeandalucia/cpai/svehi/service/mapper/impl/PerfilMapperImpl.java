package es.juntadeandalucia.cpai.svehi.service.mapper.impl;

import es.juntadeandalucia.cpai.svehi.domain.Perfil;
import es.juntadeandalucia.cpai.svehi.model.vo.PerfilVO;
import es.juntadeandalucia.cpai.svehi.service.mapper.PerfilMapper;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class PerfilMapperImpl implements PerfilMapper {

    private final ModelMapper mapper;

    @Override
    public PerfilVO toVO(Perfil entity) {
        return mapper.map(entity, PerfilVO.class);
    }

    @Override
    public Perfil toEntity(PerfilVO vo) {
        return mapper.map(vo, Perfil.class);
    }
}
