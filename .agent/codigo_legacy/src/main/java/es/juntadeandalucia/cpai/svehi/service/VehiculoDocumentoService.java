package es.juntadeandalucia.cpai.svehi.service;

import java.util.List;

import es.juntadeandalucia.cpai.svehi.entity.VehiculoDocumento;

public interface VehiculoDocumentoService {
	VehiculoDocumento guardarDocumentoVehiculo(VehiculoDocumento documento);
	VehiculoDocumento obtenerVehiculoDocumentoPorId(long id);
	List<VehiculoDocumento> obtenerDocumentosPorIdVehiculo(Long id);
}
