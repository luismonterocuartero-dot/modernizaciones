package es.juntadeandalucia.cpai.svehi.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.juntadeandalucia.cpai.svehi.entity.Marca;
import es.juntadeandalucia.cpai.svehi.repository.MarcaRepository;

@Service
public class MarcaServiceImpl implements MarcaService {

	@Autowired
	private MarcaRepository marcaRepository;
	
	public List<Marca> obtenerMarcas(){
		return marcaRepository.findAll();
	}
	
	public List<Marca> obtenerMarcasNoEliminadas(){
		return marcaRepository.findByEliminadoFalse();
	}
	
	public List<Marca> obtenerMarcasNoEliminadasActivas(){
		return marcaRepository.findByEliminadoFalseAndActivoTrue();
	}
	
	public Marca obtenerMarcaPorId(long id){
			return marcaRepository.findById(id);
	}
	public Marca guardarMarca(Marca marca) {
		return marcaRepository.save(marca);
	}
}

