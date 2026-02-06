package es.juntadeandalucia.cpai.svehi.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import es.juntadeandalucia.cpai.svehi.entity.Operadora;
import es.juntadeandalucia.cpai.svehi.repository.OperadoraRepository;

@Service
public class OperadoraServiceImpl implements OperadoraService {

	@Autowired
	private OperadoraRepository operadoraRepository;
	
	public List<Operadora> obtenerOperadoras(){
		return operadoraRepository.findAll();
	}
	
	public List<Operadora> obtenerOperadorasNoEliminadas(){
		return operadoraRepository.findByEliminadoFalse();
	}
	
	public List<Operadora> obtenerOperadorasNoEliminadasActivas(){
		return operadoraRepository.findByEliminadoFalseAndActivoTrue();
	}
	
	public Operadora obtenerOperadoraPorId(long id){
			return operadoraRepository.findById(id);
	}
	public Operadora guardarOperadora(Operadora marca) {
		return operadoraRepository.save(marca);
	}
}

