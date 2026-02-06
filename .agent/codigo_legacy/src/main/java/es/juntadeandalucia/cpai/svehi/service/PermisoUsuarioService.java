package es.juntadeandalucia.cpai.svehi.service;

import java.util.List;

import es.juntadeandalucia.cpai.svehi.entity.PermisoUsuario;

public interface PermisoUsuarioService {
	PermisoUsuario guardarPermisoUsuario(PermisoUsuario permisoUsuario);
	List<PermisoUsuario> obtenerPermisosNoEliminadosDeUsuariosPorId(Long id);
	List<PermisoUsuario> obtenerPermisosApliNoEliminadosPorId(Long id);
	List<Object[]> obtenerPermisosPorListaAplicacionesYUsuarioIdNoEliminados(List<String> listapli, Long idusu);
	List<Object[]> obtenerListadoPermisosNoEliminadosYNoAsignadosPorUsuario(Long idusuario);
	List<Object[]> obtenerListadoPermisosNoEliminadosYAsignadosPorUsuario(Long idusuario);
	PermisoUsuario obtenerPermisosPorAplicacionIdYUsuarioIdNoEliminados(Long idapli, Long idusu);
}
