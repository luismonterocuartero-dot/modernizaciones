package es.juntadeandalucia.cpai.svehi.service;

import java.util.List;
import es.juntadeandalucia.cpai.svehi.entity.Equipamiento;

public interface EquipamientoService {

	List<Equipamiento> obtenerEquipamientosNoEliminados();
	List<Equipamiento> obtenerEquipamientosDeVehiculoNoEliminados(Long id);
	Equipamiento guardaEquipamiento(Equipamiento matricula);
	Equipamiento obtenerEquipamientoPorId(long id);
	List<Equipamiento> equipamientoParametroTipoEquipamientoActivosByParametro(long id);
}
