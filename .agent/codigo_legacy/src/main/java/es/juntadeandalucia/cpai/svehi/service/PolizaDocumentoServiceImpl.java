package es.juntadeandalucia.cpai.svehi.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.juntadeandalucia.cpai.svehi.entity.PolizaDocumento;
import es.juntadeandalucia.cpai.svehi.repository.PolizaDocumentoRepository;

@Service
public class PolizaDocumentoServiceImpl implements PolizaDocumentoService{

	@Autowired
	private PolizaDocumentoRepository polizaDocumentoRepository;
	
	public PolizaDocumento guardarDocumentoPoliza(PolizaDocumento documento) {
		return polizaDocumentoRepository.save(documento);
	}
	
	public List<PolizaDocumento> obtenerDocumentosPorIdPoliza(Long id) {
		return polizaDocumentoRepository.findByFkPolizaIdAndEliminadoFalse(id);
	}

	public PolizaDocumento obtenerPolizaDocumentoPorId(long id) {
		return polizaDocumentoRepository.findById(id);
	}

}
