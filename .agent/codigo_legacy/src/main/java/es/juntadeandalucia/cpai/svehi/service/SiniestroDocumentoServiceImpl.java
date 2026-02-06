package es.juntadeandalucia.cpai.svehi.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.juntadeandalucia.cpai.svehi.entity.SiniestroDocumento;
import es.juntadeandalucia.cpai.svehi.repository.SiniestroDocumentoRepository;

@Service
public class SiniestroDocumentoServiceImpl implements SiniestroDocumentoService{

	@Autowired
	private SiniestroDocumentoRepository siniestroDocumentoRepository;
	
	public SiniestroDocumento guardarDocumentoSiniestro(SiniestroDocumento documento) {
		return siniestroDocumentoRepository.save(documento);
	}
	
	public List<SiniestroDocumento> obtenerDocumentosPorIdSiniestro(Long id) {
		return siniestroDocumentoRepository.findByFkSiniestroIdAndEliminadoFalse(id);
	}

	public SiniestroDocumento obtenerSiniestroDocumentoPorId(long id) {
		return siniestroDocumentoRepository.findById(id);
	}

}
