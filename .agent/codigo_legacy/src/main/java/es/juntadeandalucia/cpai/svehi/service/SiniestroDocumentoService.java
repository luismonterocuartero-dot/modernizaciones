package es.juntadeandalucia.cpai.svehi.service;

import java.util.List;

import es.juntadeandalucia.cpai.svehi.entity.SiniestroDocumento;

public interface SiniestroDocumentoService {
	SiniestroDocumento guardarDocumentoSiniestro(SiniestroDocumento documento);
	SiniestroDocumento obtenerSiniestroDocumentoPorId(long id);
	List<SiniestroDocumento> obtenerDocumentosPorIdSiniestro(Long id);
}
