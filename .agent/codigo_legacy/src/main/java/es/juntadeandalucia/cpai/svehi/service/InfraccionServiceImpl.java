package es.juntadeandalucia.cpai.svehi.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.juntadeandalucia.cpai.svehi.entity.Infraccion;
import es.juntadeandalucia.cpai.svehi.repository.InfraccionRepository;

@Service
public class InfraccionServiceImpl implements InfraccionService {
	
	@Autowired
	private InfraccionRepository infraccionRepository;

	@Override
	public List<Infraccion> obtenerInfraccionesDeVehiculoNoEliminadas(Long id) {
		return infraccionRepository.findByFkVehiculoIdAndEliminadoFalse(id);
	}
	
	public List<Infraccion> obtenerInfraccionesDeVehiculoYMatriculasNoEliminados(Long id, Long idMat) {
		return infraccionRepository.findByFkVehiculoIdAndFkMatriculaIdAndEliminadoFalse(id,idMat);
	}
	
	public List<Infraccion> obtenerInfraccionesDeMariculasNoEliminados(String nombre) {
		return infraccionRepository.findByFkMatriculaNombreAndEliminadoFalse(nombre);
	}
	
	public Infraccion guardarInfraccion(Infraccion infraccion) {
		return infraccionRepository.save(infraccion);
	}
	
	public Infraccion obtenerInfraccionPorId(long id) {
			return infraccionRepository.findById(id);
	}

}
