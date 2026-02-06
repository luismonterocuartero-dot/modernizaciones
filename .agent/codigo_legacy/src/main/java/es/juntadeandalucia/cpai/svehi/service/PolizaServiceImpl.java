package es.juntadeandalucia.cpai.svehi.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.juntadeandalucia.cpai.svehi.entity.Poliza;
import es.juntadeandalucia.cpai.svehi.entity.Compania;
import es.juntadeandalucia.cpai.svehi.repository.PolizaRepository;

@Service
public class PolizaServiceImpl implements PolizaService {
	
	@Autowired
	private PolizaRepository polizaRepository;

	@Override
	public List<Poliza> obtenerPolizasDeVehiculoNoEliminadas(Long id) {
		return polizaRepository.findByFkVehiculoIdAndEliminadoFalse(id);
	}
	
	public List<Poliza> obtenerPolizasPorCompania(Compania compania) {
		return polizaRepository.findByFkCompaniaAndEliminadoFalse(compania);
	}
	
	public List<Poliza> obtenerPolizasDeVehiculoYMatriculasNoEliminados(Long id, Long idMat) {
		return polizaRepository.findByFkVehiculoIdAndFkMatriculaIdAndEliminadoFalse(id,idMat);
	}
	
	public List<Poliza> obtenerPolizasDeMariculasNoEliminados(String nombre) {
		return polizaRepository.findByFkMatriculaNombreAndEliminadoFalse(nombre);
	}
	
	public Poliza guardarPoliza(Poliza poliza) {
		return polizaRepository.save(poliza);
	}
	
	public Poliza obtenerPolizaPorId(long id) {
			return polizaRepository.findById(id);
	}

}
