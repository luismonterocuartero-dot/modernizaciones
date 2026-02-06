package es.juntadeandalucia.cpai.svehi.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.juntadeandalucia.cpai.svehi.entity.VehiculoDocumento;
import es.juntadeandalucia.cpai.svehi.repository.VehiculoDocumentoRepository;

@Service
public class VehiculoDocumentoServiceImpl implements VehiculoDocumentoService{

	@Autowired
	private VehiculoDocumentoRepository vehiculoDocumentoRepository;
	
	public VehiculoDocumento guardarDocumentoVehiculo(VehiculoDocumento documento) {
		return vehiculoDocumentoRepository.save(documento);
	}
	
	public List<VehiculoDocumento> obtenerDocumentosPorIdVehiculo(Long id) {
		return vehiculoDocumentoRepository.findByFkVehiculoIdAndEliminadoFalse(id);
	}

	public VehiculoDocumento obtenerVehiculoDocumentoPorId(long id) {
		return vehiculoDocumentoRepository.findById(id);
	}

}
