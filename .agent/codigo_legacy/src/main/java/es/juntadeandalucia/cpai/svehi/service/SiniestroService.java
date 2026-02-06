package es.juntadeandalucia.cpai.svehi.service;

import java.util.List;

import es.juntadeandalucia.cpai.svehi.entity.Siniestro;

public interface SiniestroService {

	List<Siniestro> obtenerSiniestrosNoEliminados();
	List<Siniestro> obtenerSiniestrosDeVehiculoNoEliminados(Long id);
	List<Siniestro> obtenerSiniestrosDeVehiculoYMatriculasNoEliminados(Long id, Long idMat);
	List<Siniestro> obtenerSiniestrosDeMariculasNoEliminados(String nombre);
	Siniestro guardaSiniestro(Siniestro siniestro);
	Siniestro obtenerSiniestroPorId(long id);
}
