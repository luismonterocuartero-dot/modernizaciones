package es.juntadeandalucia.cpai.svehi.controller;

import es.juntadeandalucia.cpai.svehi.api.MaestrosApiDelegate;
import es.juntadeandalucia.cpai.svehi.model.vo.*;
import es.juntadeandalucia.cpai.svehi.service.MaestrosService;
import es.juntadeandalucia.cpai.svehi.service.GestionService;
import org.springframework.http.HttpStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class MaestrosController implements MaestrosApiDelegate {

    private final MaestrosService maestrosService;
    private final GestionService gestionService;

    @Override
    public ResponseEntity<List<MarcaVO>> getMarcas() {
        return ResponseEntity.ok(maestrosService.getMarcas());
    }

    @Override
    public ResponseEntity<List<PerfilVO>> getPerfiles() {
        return ResponseEntity.ok(maestrosService.getPerfiles());
    }

    // --- Companias ---
    @Override
    public ResponseEntity<List<CompaniaVO>> getCompanias() {
        return ResponseEntity.ok(gestionService.findAllCompanias());
    }

    @Override
    public ResponseEntity<CompaniaVO> createCompania(CompaniaVO companiaVO) {
        return new ResponseEntity<>(gestionService.createCompania(companiaVO), HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<CompaniaVO> updateCompania(Long id, CompaniaVO companiaVO) {
        return ResponseEntity.ok(gestionService.updateCompania(id, companiaVO));
    }

    @Override
    public ResponseEntity<Void> deleteCompania(Long id) {
        gestionService.deleteCompania(id);
        return ResponseEntity.noContent().build();
    }

    // --- Conceptos ---
    @Override
    public ResponseEntity<List<ConceptoVO>> getConceptos() {
        return ResponseEntity.ok(gestionService.findAllConceptos());
    }

    @Override
    public ResponseEntity<ConceptoVO> createConcepto(ConceptoVO conceptoVO) {
        return new ResponseEntity<>(gestionService.createConcepto(conceptoVO), HttpStatus.CREATED);
    }

    // --- Modelos ---
    @Override
    public ResponseEntity<List<ModeloVO>> getModelos() {
        return ResponseEntity.ok(gestionService.findAllModelos());
    }

    @Override
    public ResponseEntity<ModeloVO> createModelo(ModeloVO modeloVO) {
        return new ResponseEntity<>(gestionService.createModelo(modeloVO), HttpStatus.CREATED);
    }

    // --- Operadoras ---
    @Override
    public ResponseEntity<List<OperadoraVO>> getOperadoras() {
        return ResponseEntity.ok(gestionService.findAllOperadoras());
    }

    @Override
    public ResponseEntity<OperadoraVO> createOperadora(OperadoraVO operadoraVO) {
        return new ResponseEntity<>(gestionService.createOperadora(operadoraVO), HttpStatus.CREATED);
    }

    // --- Parametros ---
    @Override
    public ResponseEntity<List<ParametroVO>> getParametros() {
        return ResponseEntity.ok(gestionService.findAllParametros());
    }

    @Override
    public ResponseEntity<ParametroVO> createParametro(ParametroVO parametroVO) {
        return new ResponseEntity<>(gestionService.createParametro(parametroVO), HttpStatus.CREATED);
    }
}
