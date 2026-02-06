package es.juntadeandalucia.cpai.svehi.service;

import java.util.List;
import java.util.Optional;

import es.juntadeandalucia.cpai.svehi.entity.TipoParametro;


public interface TipoParametroService {

	List<TipoParametro> obtenerTiposParametros();
	List<TipoParametro> obtenerTiposParametrosActivos();
	//IIM SVEHI-391
	List<TipoParametro> obtenerTiposParametrosActivosYModificables();
	//IIM SVEHI-391
	Optional<TipoParametro> obtenerTipoParametroPorId(Long id);
	TipoParametro obtenerTipoParametroPorCodigo(String codigo);
}
