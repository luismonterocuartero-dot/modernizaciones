package es.juntadeandalucia.cpai.svehi.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.juntadeandalucia.cpai.svehi.entity.HistoricoAdscrito;
import es.juntadeandalucia.cpai.svehi.repository.HistoricoAdscritoRepository;

@Service
public class HistoricoAdscritoServiceImpl implements HistoricoAdscritoService{

	@Autowired 
	HistoricoAdscritoRepository historicoAdscritoRepository;
	
	public List<HistoricoAdscrito> obtenerHistoricosAdscritos(){
		return historicoAdscritoRepository.findAll();
	}
	
	public HistoricoAdscrito obtnerHistoricoAdscritoPorId(long id) {
			return historicoAdscritoRepository.findById(id);
	}
	
	public HistoricoAdscrito guardaHistoricoAdscrito(HistoricoAdscrito historicoAdscrito) {
		return historicoAdscritoRepository.save(historicoAdscrito);
	}
	
	public List<HistoricoAdscrito> obtenerHistoricosAdscritosPorVehiculo(Long id){
		return historicoAdscritoRepository.findByFkVehiculoId(id);
	}
	
}
