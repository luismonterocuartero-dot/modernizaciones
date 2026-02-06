package es.juntadeandalucia.cpai.svehi.service;

import java.util.List;

import es.juntadeandalucia.cpai.svehi.entity.DocumentoAlfrescoFlota;

public interface FlotaService {

	List<DocumentoAlfrescoFlota> obtenerUriAlfrescoFlota(String matricula);
	
}
