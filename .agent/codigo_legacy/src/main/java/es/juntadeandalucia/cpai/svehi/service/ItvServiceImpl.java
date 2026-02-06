package es.juntadeandalucia.cpai.svehi.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.juntadeandalucia.cpai.svehi.entity.Itv;
import es.juntadeandalucia.cpai.svehi.repository.ItvRepository;

@Service
public class ItvServiceImpl implements ItvService{

	@Autowired
	private ItvRepository itvRepository;
	
	public List<Itv> obtenerItvsNoEliminadas() {
		return itvRepository.findByEliminadoFalse();
	}
	
	public List<Itv> obtenerItvsDeVehiculoNoEliminados(Long id) {
		return itvRepository.findByFkVehiculoIdAndEliminadoFalse(id);
	}
	
	public List<Itv> obtenerItvsDeVehiculoYMatriculasNoEliminados(Long id, Long idMat) {
		return itvRepository.findByFkVehiculoIdAndFkMatriculaIdAndEliminadoFalse(id,idMat);
	}
	
	public List<Itv> obtenerItvsDeMariculasNoEliminados(String nombre) {
		return itvRepository.findByFkMatriculaNombreAndEliminadoFalse(nombre);
	}
	
	public Itv guardaItv(Itv itv) {
		return itvRepository.save(itv);
	}
	
	public Itv obtenerItvPorId(long id) {
			return itvRepository.findById(id);
	}
}
