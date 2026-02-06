package es.juntadeandalucia.cpai.svehi.controller;

import es.juntadeandalucia.cpai.svehi.api.UsuariosApiDelegate;
import es.juntadeandalucia.cpai.svehi.model.vo.PageUsuarioVO;
import es.juntadeandalucia.cpai.svehi.model.vo.UsuarioVO;
import es.juntadeandalucia.cpai.svehi.service.UsuarioService;
import es.juntadeandalucia.cpai.svehi.model.vo.PermisoVO;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class UsuariosController implements UsuariosApiDelegate {

    private final UsuarioService usuarioService;

    @Override
    public ResponseEntity<PageUsuarioVO> getUsuarios(String nif, String nombre, Integer page, Integer size) {
        log.info("REST request to get Usuarios. nif: {}, nombre: {}", nif, nombre);
        Pageable pageable = PageRequest.of(page != null ? page : 0, size != null ? size : 10);
        return ResponseEntity.ok(usuarioService.findAll(nif, nombre, pageable));
    }

    @Override
    public ResponseEntity<UsuarioVO> createUsuario(UsuarioVO usuarioVO) {
        log.info("REST request to create Usuario: {}", usuarioVO.getNif());
        return ResponseEntity.status(HttpStatus.CREATED).body(usuarioService.create(usuarioVO));
    }

    @Override
    public ResponseEntity<UsuarioVO> getUsuarioById(Long id) {
        log.info("REST request to get Usuario by ID: {}", id);
        return ResponseEntity.ok(usuarioService.findById(id));
    }

    @Override
    public ResponseEntity<UsuarioVO> updateUsuario(Long id, UsuarioVO usuarioVO) {
        return ResponseEntity.ok(usuarioService.update(id, usuarioVO));
    }

    @Override
    public ResponseEntity<Void> deleteUsuario(Long id) {
        usuarioService.delete(id);
        return ResponseEntity.noContent().build();
    }

    // --- Permisos ---

    @Override
    public ResponseEntity<List<PermisoVO>> getPermisosTabla() {
        return ResponseEntity.ok(usuarioService.findAllPermisos());
    }

    @Override
    public ResponseEntity<PermisoVO> createPermiso(PermisoVO permisoVO) {
        return new ResponseEntity<>(usuarioService.createPermiso(permisoVO), HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<List<PermisoVO>> getUsuarioPermisos(Long id) {
        return ResponseEntity.ok(usuarioService.findPermisosByUsuario(id));
    }

    @Override
    public ResponseEntity<Void> updateUsuarioPermisos(Long id, List<Long> requestBody) {
        usuarioService.updatePermisosUsuario(id, requestBody);
        return ResponseEntity.ok().build();
    }
}
