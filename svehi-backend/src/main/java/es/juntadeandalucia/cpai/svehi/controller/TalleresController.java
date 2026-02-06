package es.juntadeandalucia.cpai.svehi.controller;

import es.juntadeandalucia.cpai.svehi.api.TalleresApiDelegate;
import es.juntadeandalucia.cpai.svehi.model.vo.TallerVO;
import es.juntadeandalucia.cpai.svehi.model.vo.ServicioTallerVO;
import es.juntadeandalucia.cpai.svehi.service.TallerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class TalleresController implements TalleresApiDelegate {

    private final TallerService tallerService;

    @Override
    public ResponseEntity<List<TallerVO>> getTalleres() {
        return ResponseEntity.ok(tallerService.findAll());
    }

    @Override
    public ResponseEntity<TallerVO> createTaller(TallerVO tallerVO) {
        return new ResponseEntity<>(tallerService.create(tallerVO), HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<List<ServicioTallerVO>> getTallerServicios(Long id) {
        return ResponseEntity.ok(tallerService.findServiciosByTaller(id));
    }

    @Override
    public ResponseEntity<ServicioTallerVO> createTallerServicio(Long id, ServicioTallerVO servicioTallerVO) {
        tallerService.addServicio(id, servicioTallerVO);
        return new ResponseEntity<>(servicioTallerVO, HttpStatus.CREATED);
    }
}
