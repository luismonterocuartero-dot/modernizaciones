package es.juntadeandalucia.cpai.svehi.service;

import java.util.List;

import es.juntadeandalucia.cpai.svehi.entity.Perfil;


public interface PerfilService {

	List<Perfil> obtenerPerfiles();
	List<Perfil> obtenerPerfilNoEliminadas();
	List<Perfil> obtenerPerfilNoEliminadasYActivos();
	List<Perfil> obtenerPerfilNoEliminadoActivoPorDefecto();
	Perfil obtenerPerfilPorId(long id);
	Perfil guardarPerfil(Perfil taller);
}
