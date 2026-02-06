package es.juntadeandalucia.cpai.svehi.service;

import es.juntadeandalucia.cpai.svehi.entity.HistoricoFicherosRepoImp;

public interface HistoricoFicheroRepoService {
	
	HistoricoFicherosRepoImp guardaFicheroRepostaje(HistoricoFicherosRepoImp fichero);
	HistoricoFicherosRepoImp obtenerFicheroRepostajePorNumeroReferencia(String numeroReferencia);
}
