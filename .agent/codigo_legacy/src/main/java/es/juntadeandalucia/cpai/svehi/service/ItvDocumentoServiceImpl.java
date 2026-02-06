package es.juntadeandalucia.cpai.svehi.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.juntadeandalucia.cpai.svehi.entity.ItvDocumento;
import es.juntadeandalucia.cpai.svehi.repository.ItvDocumentoRepository;

@Service
public class ItvDocumentoServiceImpl implements ItvDocumentoService {
	
	@Autowired
	private ItvDocumentoRepository itvDocumentoRepository;
	
	public ItvDocumento guardarDocumentoItv(ItvDocumento documento) {
		return itvDocumentoRepository.save(documento);
	}
	
	public List<ItvDocumento> obtenerDocumentosPorIdItv(Long id) {
		return itvDocumentoRepository.findByFkItvIdAndEliminadoFalse(id);
	}

	public ItvDocumento obtenerItvDocumentoPorId(long id) {
		return itvDocumentoRepository.findById(id);
	}

}
