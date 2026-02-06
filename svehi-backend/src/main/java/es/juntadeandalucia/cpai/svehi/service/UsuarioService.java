package es.juntadeandalucia.cpai.svehi.service;

import es.juntadeandalucia.cpai.svehi.model.vo.PageUsuarioVO;
import es.juntadeandalucia.cpai.svehi.model.vo.UsuarioVO;
import org.springframework.data.domain.Pageable;
import es.juntadeandalucia.cpai.svehi.model.vo.PermisoVO;
import java.util.List;

public interface UsuarioService {

    PageUsuarioVO findAll(String nif, String nombre, Pageable pageable);

    UsuarioVO findById(Long id);

    UsuarioVO create(UsuarioVO usuarioVO);

    UsuarioVO update(Long id, UsuarioVO usuarioVO);

    void delete(Long id);

    // Permisos
    List<PermisoVO> findAllPermisos();

    PermisoVO createPermiso(PermisoVO vo);

    List<PermisoVO> findPermisosByUsuario(Long usuarioId);

    void updatePermisosUsuario(Long usuarioId, List<Long> permisoIds);
}
