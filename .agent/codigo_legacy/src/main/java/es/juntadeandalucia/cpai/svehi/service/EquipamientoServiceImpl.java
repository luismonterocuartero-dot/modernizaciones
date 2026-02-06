package es.juntadeandalucia.cpai.svehi.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import es.juntadeandalucia.cpai.svehi.entity.Equipamiento;
import es.juntadeandalucia.cpai.svehi.repository.EquipamientoRepository;

@Service
public class EquipamientoServiceImpl implements EquipamientoService {

	@Autowired
	private EquipamientoRepository equipamientoRepository;
	
	public List<Equipamiento> obtenerEquipamientosNoEliminados() {
		return equipamientoRepository.findByEliminadoFalse();
	}
	
	public List<Equipamiento> obtenerEquipamientosDeVehiculoNoEliminados(Long id) {
		return equipamientoRepository.findByFkVehiculoIdAndEliminadoFalse(id);
	}
	
	public Equipamiento guardaEquipamiento(Equipamiento equipamiento) {
		return equipamientoRepository.save(equipamiento);
	}
	
	public Equipamiento obtenerEquipamientoPorId(long id){
			return equipamientoRepository.findById(id);
	}
	
	 public List<Equipamiento> equipamientoParametroTipoEquipamientoActivosByParametro(long idParametro){
		 return equipamientoRepository.findByFkTipoEquipamientoIdAndEliminadoFalse(idParametro);
	 }
}