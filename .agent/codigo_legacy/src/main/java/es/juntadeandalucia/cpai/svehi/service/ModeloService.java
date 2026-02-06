package es.juntadeandalucia.cpai.svehi.service;

import java.util.List;
import es.juntadeandalucia.cpai.svehi.entity.Marca;
import es.juntadeandalucia.cpai.svehi.entity.Modelo;

public interface ModeloService {
	List<Object[]> obtenerDatosListadoDeModelos();
	List<Modelo> obtenerModelos();
	List<Modelo> obtenerModelosNoEliminados();
	List<Modelo> obtenerModeloPorMarca(Marca marca);
    Modelo obtenerModeloPorId(long id);
    Modelo guardarModelo(Modelo modelo);
	List<Modelo> modeloParametroTipoVehiculoActivosByParametro(long id);
	List<Modelo> modeloParametroAlimentacionByParametro(long id);
}
