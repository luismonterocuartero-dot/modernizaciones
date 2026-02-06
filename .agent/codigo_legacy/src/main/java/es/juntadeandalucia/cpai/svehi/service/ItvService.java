package es.juntadeandalucia.cpai.svehi.service;

import java.util.List;

import es.juntadeandalucia.cpai.svehi.entity.Itv;
public interface ItvService {

	List<Itv> obtenerItvsNoEliminadas();
	List<Itv> obtenerItvsDeVehiculoNoEliminados(Long id);
	List<Itv> obtenerItvsDeVehiculoYMatriculasNoEliminados(Long id, Long idMat);
	List<Itv> obtenerItvsDeMariculasNoEliminados(String nombre);
	Itv guardaItv(Itv itv);
	Itv obtenerItvPorId(long id);
}
