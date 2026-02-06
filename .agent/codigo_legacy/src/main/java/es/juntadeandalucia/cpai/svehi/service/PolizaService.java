package es.juntadeandalucia.cpai.svehi.service;

import java.util.List;

import es.juntadeandalucia.cpai.svehi.entity.Poliza;
import es.juntadeandalucia.cpai.svehi.entity.Compania;

public interface PolizaService {

	List<Poliza> obtenerPolizasDeVehiculoNoEliminadas(Long id);
	List<Poliza> obtenerPolizasPorCompania(Compania compania);
	List<Poliza> obtenerPolizasDeVehiculoYMatriculasNoEliminados(Long id, Long idMat);
	List<Poliza> obtenerPolizasDeMariculasNoEliminados(String nombre);
	Poliza obtenerPolizaPorId(long id);
	Poliza guardarPoliza(Poliza poliza);
}
