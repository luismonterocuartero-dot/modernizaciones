package es.juntadeandalucia.cpai.svehi.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.juntadeandalucia.cpai.svehi.entity.Mantenimiento;
import es.juntadeandalucia.cpai.svehi.repository.MantenimientoRepository;

@Service
public class MantenimientoServiceImp implements MantenimientoService {

	@Autowired
	private MantenimientoRepository mantenimientoRepository;
	
	@Override
	public List<Mantenimiento> obtenerMantenimientosNoEliminados() {
		return mantenimientoRepository.findByEliminadoFalse();
	}

	@Override
	public List<Mantenimiento> obtenerMantenimientosDeVehiculoNoEliminados(Long id) {
		return mantenimientoRepository.findByFkVehiculoIdAndEliminadoFalse(id);
	}
	
	@Override
	public List<Mantenimiento> obtenerMantenimientosDeVehiculoYMatriculasNoEliminados(Long id, Long idMat) {
		return mantenimientoRepository.findByFkVehiculoIdAndFkMatriculaIdAndEliminadoFalse(id,idMat);
	}
	
	@Override
	public List<Mantenimiento> obtenerMantenimientosDeMatriculasNoEliminados(String nombre) {
		return mantenimientoRepository.findByFkMatriculaNombreAndEliminadoFalse(nombre);
	}

	@Override
	public Mantenimiento guardaMantenimiento(Mantenimiento mantenimiento) {
		
		return mantenimientoRepository.save(mantenimiento);
	}

	@Override
	public Mantenimiento obtenerMantenimientoPorId(long id) {
		
		return mantenimientoRepository.findById(id);
	}

}
