package es.juntadeandalucia.cpai.svehi.service;

import java.util.List;

import es.juntadeandalucia.cpai.svehi.entity.Mantenimiento;

public interface MantenimientoService {
	List<Mantenimiento> obtenerMantenimientosNoEliminados();
	List<Mantenimiento> obtenerMantenimientosDeVehiculoNoEliminados(Long id);
	List<Mantenimiento> obtenerMantenimientosDeVehiculoYMatriculasNoEliminados(Long id, Long idMat);
	List<Mantenimiento> obtenerMantenimientosDeMatriculasNoEliminados(String nombre);
	Mantenimiento guardaMantenimiento(Mantenimiento mantenimiento);
	Mantenimiento obtenerMantenimientoPorId(long id);
}
