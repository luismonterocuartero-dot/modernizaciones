package es.juntadeandalucia.cpai.svehi.service;


import java.util.List;
import es.juntadeandalucia.cpai.svehi.entity.Municipio;

public interface MunicipioService {
	
	List<Municipio> obtenerMunicipiosNoEliminados();
	List<Municipio> obtenerMunicipiosNoEliminadosSegunProvincia(long idProv);
}
