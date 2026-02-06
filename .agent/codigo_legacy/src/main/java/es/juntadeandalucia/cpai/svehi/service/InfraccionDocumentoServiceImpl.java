package es.juntadeandalucia.cpai.svehi.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.juntadeandalucia.cpai.svehi.entity.InfraccionDocumento;

import es.juntadeandalucia.cpai.svehi.repository.InfraccionDocumentoRepository;

@Service
public class InfraccionDocumentoServiceImpl implements InfraccionDocumentoService{

	@Autowired
	private InfraccionDocumentoRepository infraccionDocumentoRepository;
	
	public InfraccionDocumento guardarDocumentoInfraccion(InfraccionDocumento documento) {
		return infraccionDocumentoRepository.save(documento);
	}

	public List<InfraccionDocumento> obtenerDocumentosPorIdInfraccion(Long id) {
		return infraccionDocumentoRepository.findByFkInfraccionIdAndEliminadoFalse(id);
	}

	public InfraccionDocumento obtenerInfraccionDocumentoPorId(long id) {
		return infraccionDocumentoRepository.findById(id);
	}
	
}
