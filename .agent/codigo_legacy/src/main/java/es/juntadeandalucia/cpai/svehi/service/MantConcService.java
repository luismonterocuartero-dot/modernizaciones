package es.juntadeandalucia.cpai.svehi.service;

import java.util.List;

import es.juntadeandalucia.cpai.svehi.entity.MantConc;

public interface MantConcService {
	List<MantConc> obtenerMantConcNoEliminados();
	List<MantConc> obtenerMantConcRelacionadoNoEliminados(Long id);
	List<MantConc> obtenerMantConcActivosPorConct(Long id);
	MantConc guardarMantConc(MantConc mantConc);
	MantConc obtenerMantConcPorId(long id);

}
