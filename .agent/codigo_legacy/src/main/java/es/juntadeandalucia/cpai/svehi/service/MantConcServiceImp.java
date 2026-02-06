package es.juntadeandalucia.cpai.svehi.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.juntadeandalucia.cpai.svehi.entity.MantConc;
import es.juntadeandalucia.cpai.svehi.repository.MantConcRepository;

@Service
public class MantConcServiceImp implements MantConcService {

	@Autowired
	private MantConcRepository mantConcRepository;
	
	@Override
	public List<MantConc> obtenerMantConcNoEliminados() {
		return mantConcRepository.findByEliminadoFalse();
		
	}

	@Override
	public List<MantConc> obtenerMantConcRelacionadoNoEliminados(Long id) {
		
		return mantConcRepository.findByFkMantenimientoIdAndEliminadoFalse(id);
	}
	
	@Override
	public List<MantConc> obtenerMantConcActivosPorConct(Long id) {
		
		return mantConcRepository.findByFkConceptoIdAndEliminadoFalse(id);
	}

	@Override
	public MantConc guardarMantConc(MantConc mantConc) {
		
		return mantConcRepository.save(mantConc);
	}

	@Override
	public MantConc obtenerMantConcPorId(long id) {
		
		return mantConcRepository.findById(id);
	}

}
