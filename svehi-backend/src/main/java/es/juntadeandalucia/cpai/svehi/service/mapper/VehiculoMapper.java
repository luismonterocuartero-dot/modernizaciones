package es.juntadeandalucia.cpai.svehi.service.mapper;

import es.juntadeandalucia.cpai.svehi.domain.Vehiculo;
import es.juntadeandalucia.cpai.svehi.model.vo.VehiculoVO;

public interface VehiculoMapper {
    VehiculoVO toVO(Vehiculo entity);

    Vehiculo toEntity(VehiculoVO vo);
}
