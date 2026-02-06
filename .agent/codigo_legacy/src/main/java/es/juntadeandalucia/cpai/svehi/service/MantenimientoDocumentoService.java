package es.juntadeandalucia.cpai.svehi.service;

import java.util.List;

import es.juntadeandalucia.cpai.svehi.entity.MantenimientoDocumento;

public interface MantenimientoDocumentoService {
	MantenimientoDocumento guardarDocumentoMantenimiento(MantenimientoDocumento documento);
	MantenimientoDocumento obtenerMantenimientoDocumentoPorId(long id);
	List<MantenimientoDocumento> obtenerDocumentosPorIdMantenimiento(Long id);
}
