package es.juntadeandalucia.cpai.svehi.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.juntadeandalucia.cpai.svehi.entity.MantenimientoDocumento;
import es.juntadeandalucia.cpai.svehi.repository.MantenimientoDocumentoRepository;

@Service
public class MantenimientoDocumentoServiceImp implements MantenimientoDocumentoService {

	@Autowired
	private MantenimientoDocumentoRepository mantenimientoDocumentoRepository;
	
	@Override
	public MantenimientoDocumento guardarDocumentoMantenimiento(MantenimientoDocumento documento) {
		
		return mantenimientoDocumentoRepository.save(documento);
	}

	@Override
	public MantenimientoDocumento obtenerMantenimientoDocumentoPorId(long id) {
		return mantenimientoDocumentoRepository.findById(id);
	}

	@Override
	public List<MantenimientoDocumento> obtenerDocumentosPorIdMantenimiento(Long id) {
		return mantenimientoDocumentoRepository.findByFkMantenimientoIdAndEliminadoFalse(id);
	}

}
