package es.juntadeandalucia.cpai.svehi.service;

import java.util.List;

import es.juntadeandalucia.cpai.svehi.entity.Material;

public interface MaterialService {
		
	List<Material> obtenerMaterialesNoEliminados();
	List<Material> obtenerMaterialesDeVehiculoNoEliminados(Long id);
	Material guardaMaterial(Material material);
	Material obtenerMaterialPorId(long id);
	List<Material> materialesActivosByParametro(Long idParametro);

}
