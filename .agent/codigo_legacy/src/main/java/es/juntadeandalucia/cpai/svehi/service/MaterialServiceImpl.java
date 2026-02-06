package es.juntadeandalucia.cpai.svehi.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.juntadeandalucia.cpai.svehi.entity.Material;
import es.juntadeandalucia.cpai.svehi.repository.MaterialRepository;

@Service
public class MaterialServiceImpl implements MaterialService {

	@Autowired
	private MaterialRepository materialRepository;
	
	public List<Material> obtenerMaterialesNoEliminados(){
		return materialRepository.findByEliminadoFalse();
	}
	
	public List<Material> obtenerMaterialesDeVehiculoNoEliminados(Long id){
		return materialRepository.findByFkVehiculoIdAndEliminadoFalse(id);
	}
	
	public Material guardaMaterial(Material material) {
		return materialRepository.save(material);
	}
	
	public Material obtenerMaterialPorId(long id){
			return materialRepository.findById(id);
	}
	public List<Material> materialesActivosByParametro(Long idParametro) {
		return materialRepository.findByFkTipoMaterialIdAndEliminadoFalse(idParametro);
	}
}
