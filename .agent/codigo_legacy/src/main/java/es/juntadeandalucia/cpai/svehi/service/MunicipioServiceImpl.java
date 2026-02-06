package es.juntadeandalucia.cpai.svehi.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.juntadeandalucia.cpai.svehi.entity.Municipio;
import es.juntadeandalucia.cpai.svehi.repository.MunicipioRepository;

@Service
public class MunicipioServiceImpl implements MunicipioService {

	@Autowired
	private MunicipioRepository municipioRepository;
	
	public List<Municipio> obtenerMunicipiosNoEliminados(){
		return municipioRepository.findBySituacionFalseOrderByNombre();
	}
	
	public List<Municipio> obtenerMunicipiosNoEliminadosSegunProvincia(long idProv){
		return municipioRepository.findByCodigoAndSituacionFalseOrderByNombre(idProv);
	}
}

