package es.juntadeandalucia.svehi.gestion.controller;

import es.juntadeandalucia.svehi.gestion.api.*;

import es.juntadeandalucia.svehi.gestion.model.vo.*;
import es.juntadeandalucia.svehi.gestion.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import java.util.List;

@Component
@RequiredArgsConstructor
public class BaseController
        implements MarcasApiDelegate, ModelosApiDelegate, OperadorasApiDelegate, CompaniasApiDelegate {

    @Override
    public java.util.Optional<org.springframework.web.context.request.NativeWebRequest> getRequest() {
        return java.util.Optional.empty();
    }

    private final MarcaService marcaService;
    private final ModeloService modeloService;
    private final OperadoraService operadoraService;
    private final CompaniaService companiaService;

    // MARCAS
    @Override
    public ResponseEntity<List<MarcaVO>> getMarcas(Integer page, Integer size) {
        return ResponseEntity.ok(marcaService.findAll());
    }

    @Override
    public ResponseEntity<MarcaVO> createMarca(MarcaVO marcaVO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(marcaService.save(marcaVO));
    }

    // MODELOS
    @Override
    public ResponseEntity<List<ModeloVO>> getModelos(Long marcaId) {
        return ResponseEntity.ok(modeloService.findByMarca(marcaId));
    }

    @Override
    public ResponseEntity<Void> createModelo(ModeloVO modeloVO) {
        modeloService.save(modeloVO);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    // OPERADORAS
    @Override
    public ResponseEntity<List<OperadoraVO>> getOperadoras() {
        return ResponseEntity.ok(operadoraService.findAll());
    }

    // COMPANIAS
    @Override
    public ResponseEntity<List<CompaniaVO>> getCompanias() {
        return ResponseEntity.ok(companiaService.findAll());
    }
}
