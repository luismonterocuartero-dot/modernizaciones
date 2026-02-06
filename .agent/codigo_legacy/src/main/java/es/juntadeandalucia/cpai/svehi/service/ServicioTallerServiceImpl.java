package es.juntadeandalucia.cpai.svehi.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.juntadeandalucia.cpai.svehi.entity.ServicioTaller;
import es.juntadeandalucia.cpai.svehi.repository.ServicioTallerRepository;

@Service
public class ServicioTallerServiceImpl implements ServicioTallerService{
	
	@Autowired
	private ServicioTallerRepository servicioTallerRepository;
	
	public List<ServicioTaller> obtenerServiciosTaller(){
		return servicioTallerRepository.findAll();
	}
	
	public ServicioTaller obtenerServicioTallerPorId(long id) {
			return servicioTallerRepository.findById(id);
	}
	
	public List<ServicioTaller> obtenerServiciosDeTallerNoEliminados(Long id) {
		return servicioTallerRepository.findByFkTallerIdAndEliminadoFalse(id);
	}
	
	public ServicioTaller guardaServicioTaller(ServicioTaller servicioTaller) {
		return servicioTallerRepository.save(servicioTaller);
	}
	public List<ServicioTaller> obtenerServiciosNoEliminados(){
		return servicioTallerRepository.findByEliminadoFalse();
	}
	
	public List<ServicioTaller> servicioTallerParametroTipoServicioActivosByParametro(long idParametro) {
		return servicioTallerRepository.findByFkTipoServicioIdAndEliminadoFalse(idParametro);
	}
	
	public List<ServicioTaller> obtenerServiciosDeTallerPorServAdscritoNoEliminados(Long id, Long idServAds) {
		return servicioTallerRepository.findByFkTallerIdAndFkServicioAdscritoIdAndEliminadoFalse(id, idServAds);
	}
}
