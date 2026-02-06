package es.juntadeandalucia.cpai.svehi.service.mapper;

import es.juntadeandalucia.cpai.svehi.domain.Marca;
import es.juntadeandalucia.cpai.svehi.model.vo.MarcaVO;

public interface MarcaMapper {
    MarcaVO toVO(Marca entity);

    Marca toEntity(MarcaVO vo);
}
