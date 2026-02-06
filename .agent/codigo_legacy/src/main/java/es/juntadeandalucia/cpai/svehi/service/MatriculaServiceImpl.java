package es.juntadeandalucia.cpai.svehi.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.juntadeandalucia.cpai.svehi.entity.Matricula;
import es.juntadeandalucia.cpai.svehi.repository.MatriculaRepository;

@Service
public class MatriculaServiceImpl implements MatriculaService {

	@Autowired
	private MatriculaRepository matriculaRepository;
	
	public Matricula obtenerMatriculaPorNombre(String nombre) {
		return matriculaRepository.findByNombreAndEliminadoFalse(nombre);
	}
	
	public List<Matricula> obtenerMatriculasNoEliminadas() {
		return matriculaRepository.findByEliminadoFalse();
	}
	
	public List<Matricula> obtenerMatriculasDeVehiculoNoEliminadas(Long id) {
		return matriculaRepository.findByFkVehiculoIdAndEliminadoFalseOrderByNombre(id);
	}
	
	public List<String> obtenerNombresDeMatriculasDeVehiculoNoEliminadas(Long id) {
		List<String>nombreMatriculas = new ArrayList<>();
		List<Matricula>matriculas= matriculaRepository.findByFkVehiculoIdAndEliminadoFalseOrderByNombre(id);
		for (int i = 0; i<matriculas.size();i++) {
			nombreMatriculas.add(matriculas.get(i).getNombre()); 
		}
		return nombreMatriculas;
	}
	
	public Matricula guardaMatricula(Matricula matricula) {
		return matriculaRepository.save(matricula);
	}

	public Matricula obtenerMatriculaPorId(long id) {
			return matriculaRepository.findById(id);
	}
	
	public List<Matricula> obtenerTodasMatriculas(){
		return matriculaRepository.obtenerTodasMatriculas();
	}
	
	public Matricula obtenerVehiculoFlota(String matricula) {
		return matriculaRepository.obtenerFlotaByMatricula(matricula);
	}

	public Matricula obtenerMatriculaPorNombreFichero(String nombre) {
		return matriculaRepository.findByNombre(nombre);
	}
}