package es.juntadeandalucia.cpai.svehi.service;

import java.util.List;

import es.juntadeandalucia.cpai.svehi.entity.Infraccion;

public interface InfraccionService {

	List<Infraccion> obtenerInfraccionesDeVehiculoNoEliminadas(Long id);
	List<Infraccion> obtenerInfraccionesDeVehiculoYMatriculasNoEliminados(Long id, Long idMat);
	List<Infraccion> obtenerInfraccionesDeMariculasNoEliminados(String nombre);
	Infraccion obtenerInfraccionPorId(long id);
	Infraccion guardarInfraccion(Infraccion infraccion);
}
