package es.juntadeandalucia.cpai.svehi.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.juntadeandalucia.cpai.svehi.entity.Provincia;
import es.juntadeandalucia.cpai.svehi.repository.ProvinciaRepository;

@Service
public class ProvinciaServiceImpl implements ProvinciaService {

	@Autowired
	private ProvinciaRepository provinciaRepository;
	
	public List<Provincia> obtenerProvinciasAndaNoEliminadas(){
		Long codigo = 4L;
		return provinciaRepository.findByCodigoAndSituacionFalseOrderByNombre(codigo);
	}
}

