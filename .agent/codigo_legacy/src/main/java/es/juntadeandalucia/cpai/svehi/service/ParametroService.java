package es.juntadeandalucia.cpai.svehi.service;


import java.util.List;
import es.juntadeandalucia.cpai.svehi.entity.Parametro;
import es.juntadeandalucia.cpai.svehi.entity.TipoParametro;
import es.juntadeandalucia.cpai.svehi.entity.Usuario;

public interface ParametroService {

	List<Parametro> obtenerParametros();
	List<Parametro> obtenerParametrosActivos();
	List<Parametro> obtenerParametrosNoEliminados();
	List<Parametro> obtenerParametrosNoEliminadosActivos();
	List<Parametro> obtenerParametrosNoEliminadosActivosOrderByNombreAsc();
	Parametro obtenerParametroPorId(long id);
	List<Parametro> obtenerParametrosPorTipoParametro(TipoParametro tipoParametro);
	Parametro obtenerNombreCentroDirectivo(Usuario usuario);
	Parametro guardarParametro(Parametro parametro);
	Parametro obtenerParametroByNombre(String nombre);
}
