package es.juntadeandalucia.cpai.svehi.service;

import java.util.List;

import es.juntadeandalucia.cpai.svehi.entity.Matricula;

public interface MatriculaService {

	List<Matricula> obtenerMatriculasNoEliminadas();
	List<Matricula> obtenerMatriculasDeVehiculoNoEliminadas(Long id);
	List<String> obtenerNombresDeMatriculasDeVehiculoNoEliminadas(Long id);
	Matricula obtenerMatriculaPorNombre(String nombre);
	Matricula obtenerMatriculaPorId(long id);
	Matricula guardaMatricula(Matricula matricula);
	List<Matricula> obtenerTodasMatriculas();
	Matricula obtenerVehiculoFlota(String matricula);
	Matricula obtenerMatriculaPorNombreFichero(String nombre);
	
}
