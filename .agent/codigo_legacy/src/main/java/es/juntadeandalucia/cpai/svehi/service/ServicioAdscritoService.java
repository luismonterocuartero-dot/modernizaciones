package es.juntadeandalucia.cpai.svehi.service;

import java.util.List;

import es.juntadeandalucia.cpai.svehi.entity.CentroDirectivo;
import es.juntadeandalucia.cpai.svehi.entity.ServicioAdscrito;

public interface ServicioAdscritoService {
	
	List<ServicioAdscrito> obtenerServiciosAdscritos();
	List<ServicioAdscrito> obtenerServiciosNoEliminados();
	List<ServicioAdscrito> obtenerServiciosNoEliminadosActivos();
	List<ServicioAdscrito> obtenerServicioPorCentro(CentroDirectivo centroDirectivo);
	ServicioAdscrito obtenerServicioPorId(long id);
}
