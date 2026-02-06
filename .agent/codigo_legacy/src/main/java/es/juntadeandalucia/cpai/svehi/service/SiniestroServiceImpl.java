package es.juntadeandalucia.cpai.svehi.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.juntadeandalucia.cpai.svehi.entity.Siniestro;
import es.juntadeandalucia.cpai.svehi.repository.SiniestroRepository;

@Service
public class SiniestroServiceImpl implements SiniestroService {

	@Autowired
	private SiniestroRepository siniestroRepository;
	
	public List<Siniestro> obtenerSiniestrosNoEliminados(){
		return siniestroRepository.findByEliminadoFalse();
	}
	
	public List<Siniestro> obtenerSiniestrosDeVehiculoNoEliminados(Long id){
		return siniestroRepository.findByFkVehiculoIdAndEliminadoFalse(id);
	}
	
	public List<Siniestro> obtenerSiniestrosDeVehiculoYMatriculasNoEliminados(Long id, Long idMat) {
		return siniestroRepository.findByFkVehiculoIdAndFkMatriculaIdAndEliminadoFalse(id,idMat);
	}
	
	public List<Siniestro> obtenerSiniestrosDeMariculasNoEliminados(String nombre) {
		return siniestroRepository.findByFkMatriculaNombreAndEliminadoFalse(nombre);
	}
	
	public Siniestro guardaSiniestro(Siniestro siniestro) {
		return siniestroRepository.save(siniestro);
	}
	
	public Siniestro obtenerSiniestroPorId(long id) {
			return siniestroRepository.findById(id);
	}
	
}
