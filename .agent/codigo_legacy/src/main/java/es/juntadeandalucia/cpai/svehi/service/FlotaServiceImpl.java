package es.juntadeandalucia.cpai.svehi.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.juntadeandalucia.cpai.svehi.entity.DocumentoAlfrescoFlota;
import es.juntadeandalucia.cpai.svehi.repository.FlotaRepository;

@Service
public class FlotaServiceImpl implements FlotaService {

	@Autowired
	private FlotaRepository flotaRepository;
	
	
	public List<DocumentoAlfrescoFlota> obtenerUriAlfrescoFlota(String matricula) {
		return flotaRepository.obtenerUriAlfrescoByMatricula(matricula);
	}
}