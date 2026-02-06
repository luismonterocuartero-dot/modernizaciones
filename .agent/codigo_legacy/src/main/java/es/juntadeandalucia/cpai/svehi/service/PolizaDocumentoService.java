package es.juntadeandalucia.cpai.svehi.service;

import java.util.List;

import es.juntadeandalucia.cpai.svehi.entity.PolizaDocumento;

public interface PolizaDocumentoService {

	PolizaDocumento guardarDocumentoPoliza(PolizaDocumento documento);
	PolizaDocumento obtenerPolizaDocumentoPorId(long id);
	List<PolizaDocumento> obtenerDocumentosPorIdPoliza(Long id);
}
