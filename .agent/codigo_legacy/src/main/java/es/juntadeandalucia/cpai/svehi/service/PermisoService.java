package es.juntadeandalucia.cpai.svehi.service;

import java.util.List;

import es.juntadeandalucia.cpai.svehi.entity.Permiso;


public interface PermisoService {

	List<Permiso> obtenerPermisosNoEliminados();
	Permiso obtenerPermisoPorId(long id);
	Permiso guardarPermiso(Permiso permiso);
	List<Object[]> obtenerPermisoPorReferencia(String referencia);
	String permisoDeAcceso(String rol, Long idUsuario, List<String> permisoFin);
}
