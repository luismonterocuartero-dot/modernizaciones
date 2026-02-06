package es.juntadeandalucia.cpai.svehi.service.mapper.impl;

import es.juntadeandalucia.cpai.svehi.domain.Marca;
import es.juntadeandalucia.cpai.svehi.model.vo.MarcaVO;
import es.juntadeandalucia.cpai.svehi.service.mapper.MarcaMapper;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class MarcaMapperImpl implements MarcaMapper {

    private final ModelMapper mapper;

    @Override
    public MarcaVO toVO(Marca entity) {
        return mapper.map(entity, MarcaVO.class);
    }

    @Override
    public Marca toEntity(MarcaVO vo) {
        return mapper.map(vo, Marca.class);
    }
}
