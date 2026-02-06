package es.juntadeandalucia.cpai.svehi.service;


import java.util.List;
import es.juntadeandalucia.cpai.svehi.entity.Marca;

public interface MarcaService {
	
	List<Marca> obtenerMarcas();
	List<Marca> obtenerMarcasNoEliminadas();
	List<Marca> obtenerMarcasNoEliminadasActivas();
	Marca obtenerMarcaPorId(long id);
	Marca guardarMarca(Marca marca);
}
