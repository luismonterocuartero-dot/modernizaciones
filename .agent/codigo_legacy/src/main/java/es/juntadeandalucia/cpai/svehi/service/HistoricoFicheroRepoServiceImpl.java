package es.juntadeandalucia.cpai.svehi.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.juntadeandalucia.cpai.svehi.entity.HistoricoFicherosRepoImp;
import es.juntadeandalucia.cpai.svehi.repository.HistoricoFicheroRepoRepository;

@Service
public class HistoricoFicheroRepoServiceImpl implements HistoricoFicheroRepoService {
	
	@Autowired
	private HistoricoFicheroRepoRepository historicoFicheroRepoRepository;
	
	public HistoricoFicherosRepoImp guardaFicheroRepostaje(HistoricoFicherosRepoImp fichero) {
		return historicoFicheroRepoRepository.save(fichero);
	}

	public HistoricoFicherosRepoImp obtenerFicheroRepostajePorNumeroReferencia(String numeroReferencia) {
		return historicoFicheroRepoRepository.findByNumeroReferencia(numeroReferencia);
	}
}
