package es.juntadeandalucia.cpai.svehi.controller;

import es.juntadeandalucia.cpai.svehi.api.VehiculosApiDelegate;
import es.juntadeandalucia.cpai.svehi.model.vo.PageVehiculoVO;
import es.juntadeandalucia.cpai.svehi.model.vo.*;
import es.juntadeandalucia.cpai.svehi.service.VehiculoService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class VehiculoController implements VehiculosApiDelegate {

    private final VehiculoService vehiculoService;

    @Override
    public ResponseEntity<PageVehiculoVO> getVehiculos(String matricula, Long marcaId, Integer page, Integer size) {
        log.info("REST request to get Vehiculos");
        return ResponseEntity.ok(vehiculoService.findByFilters(matricula, marcaId, page, size));
    }

    @Override
    public ResponseEntity<VehiculoVO> createVehiculo(VehiculoVO vehiculoVO) {
        log.info("REST request to create Vehiculo");
        return ResponseEntity.status(HttpStatus.CREATED).body(vehiculoService.create(vehiculoVO));
    }

    @Override
    public ResponseEntity<List<MatriculaVO>> getVehiculoMatriculas(Long id) {
        return ResponseEntity.ok(vehiculoService.getMatriculas(id));
    }

    @Override
    public ResponseEntity<Void> addVehiculoMatricula(Long id, MatriculaVO matriculaVO) {
        vehiculoService.addMatricula(id, matriculaVO);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @Override
    public ResponseEntity<List<EquipamientoVO>> getVehiculoEquipamiento(Long id) {
        return ResponseEntity.ok(vehiculoService.getEquipamiento(id));
    }

    @Override
    public ResponseEntity<Void> addVehiculoEquipamiento(Long id, EquipamientoVO equipamientoVO) {
        vehiculoService.addEquipamiento(id, equipamientoVO);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @Override
    public ResponseEntity<List<MantenimientoVO>> getVehiculoMantenimientos(Long id) {
        return ResponseEntity.ok(vehiculoService.getMantenimientos(id));
    }

    @Override
    public ResponseEntity<Void> addVehiculoMantenimiento(Long id, MantenimientoVO mantenimientoVO) {
        vehiculoService.addMantenimiento(id, mantenimientoVO);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
