package es.juntadeandalucia.cpai.svehi.service;


import java.util.List;
import es.juntadeandalucia.cpai.svehi.entity.Provincia;

public interface ProvinciaService {
	
	List<Provincia> obtenerProvinciasAndaNoEliminadas();
}
