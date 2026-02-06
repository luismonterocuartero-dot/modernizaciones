package es.juntadeandalucia.cpai.svehi.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.juntadeandalucia.cpai.svehi.entity.TipoParametro;
import es.juntadeandalucia.cpai.svehi.repository.TipoParametroRepository;

@Service
public class TipoParametroServiceImpl implements TipoParametroService{
	
	@Autowired
	private TipoParametroRepository tipoParametroRepository;
	
	public List<TipoParametro> obtenerTiposParametros() {
		return tipoParametroRepository.findAll();
	}
	
	public List<TipoParametro> obtenerTiposParametrosActivos(){
		return tipoParametroRepository.findByActivoTrue();
	}
	
	//IIM SVEHI-391
	public List<TipoParametro> obtenerTiposParametrosActivosYModificables(){
		return tipoParametroRepository.findByActivoTrueAndModifTrue();
	}
	//IIM SVEHI-391
	
	public Optional<TipoParametro> obtenerTipoParametroPorId(Long id){
			return tipoParametroRepository.findById(id);
	}
	
	public TipoParametro obtenerTipoParametroPorCodigo(String codigo) {
		return tipoParametroRepository.findByCodigo(codigo);
	}
	
}
