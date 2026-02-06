package es.juntadeandalucia.cpai.svehi.service;

import java.util.List;

import es.juntadeandalucia.cpai.svehi.entity.InfraccionDocumento;

public interface InfraccionDocumentoService {

	InfraccionDocumento guardarDocumentoInfraccion(InfraccionDocumento documento);
	InfraccionDocumento obtenerInfraccionDocumentoPorId(long id);
	List<InfraccionDocumento> obtenerDocumentosPorIdInfraccion(Long id);
}
