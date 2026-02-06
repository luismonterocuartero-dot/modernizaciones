package es.juntadeandalucia.cpai.svehi.service;


import java.util.List;
import es.juntadeandalucia.cpai.svehi.entity.Operadora;

public interface OperadoraService {
	
	List<Operadora> obtenerOperadoras();
	List<Operadora> obtenerOperadorasNoEliminadas();
	List<Operadora> obtenerOperadorasNoEliminadasActivas();
	Operadora obtenerOperadoraPorId(long id);
	Operadora guardarOperadora(Operadora operadora);
}
