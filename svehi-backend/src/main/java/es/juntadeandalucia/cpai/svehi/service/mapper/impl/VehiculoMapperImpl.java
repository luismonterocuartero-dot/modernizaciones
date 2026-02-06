package es.juntadeandalucia.cpai.svehi.service.mapper.impl;

import es.juntadeandalucia.cpai.svehi.domain.Vehiculo;
import es.juntadeandalucia.cpai.svehi.model.vo.VehiculoVO;
import es.juntadeandalucia.cpai.svehi.service.mapper.VehiculoMapper;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class VehiculoMapperImpl implements VehiculoMapper {

    private final ModelMapper mapper;

    @Override
    public VehiculoVO toVO(Vehiculo entity) {
        VehiculoVO vo = mapper.map(entity, VehiculoVO.class);
        try {
            if (entity.getMarca() != null) {
                vo.setMarcaNombre(entity.getMarca().getNombre());
                vo.setMarcaId(entity.getMarca().getId());
                // TODO: Get modelo name from Marca->Modelo relationship
                vo.setModelo(entity.getMarca().getNombre() + " (Modelo)");
            } else {
                vo.setMarcaNombre("SIN MARCA");
                vo.setMarcaId(null);
                vo.setModelo("N/A");
            }
        } catch (Exception e) {
            // Handle case where Marca reference is broken (FK exists but entity doesn't)
            vo.setMarcaNombre("MARCA NO ENCONTRADA");
            vo.setMarcaId(null);
            vo.setModelo("N/A");
        }

        // TODO: Load matricula from T_D_MATR_MATRICULA table
        // For now, show bastidor as identifier
        vo.setMatricula(entity.getBastidor() != null
                ? entity.getBastidor().substring(Math.max(0, entity.getBastidor().length() - 8))
                : "SIN MAT");

        // TODO: Load tipoVehiculo from parameters
        vo.setTipoVehiculo("TURISMO"); // Placeholder

        return vo;
    }

    @Override
    public Vehiculo toEntity(VehiculoVO vo) {
        return mapper.map(vo, Vehiculo.class);
    }
}
