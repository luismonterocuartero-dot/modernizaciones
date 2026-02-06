package es.juntadeandalucia.cpai.svehi.service;

import java.util.List;

import es.juntadeandalucia.cpai.svehi.entity.ItvDocumento;


public interface ItvDocumentoService {
	
	ItvDocumento guardarDocumentoItv(ItvDocumento documento);
	ItvDocumento obtenerItvDocumentoPorId(long id);
	List<ItvDocumento> obtenerDocumentosPorIdItv(Long id);

}
