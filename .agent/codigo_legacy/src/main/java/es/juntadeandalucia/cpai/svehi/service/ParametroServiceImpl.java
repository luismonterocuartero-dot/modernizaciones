package es.juntadeandalucia.cpai.svehi.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.juntadeandalucia.cpai.svehi.entity.Parametro;
import es.juntadeandalucia.cpai.svehi.entity.TipoParametro;
import es.juntadeandalucia.cpai.svehi.entity.Usuario;
import es.juntadeandalucia.cpai.svehi.repository.ParametroRepository;
import es.juntadeandalucia.cpai.svehi.repository.TipoParametroRepository;

@Service
public class ParametroServiceImpl implements ParametroService {

	@Autowired
	private ParametroRepository parametroRepository;
	
	@Autowired
	private TipoParametroRepository tipoParametroRepository;
	
	public List<Parametro> obtenerParametros(){
		return parametroRepository.findAll();
	}
	
	public List<Parametro> obtenerParametrosActivos(){
		return parametroRepository.findByActivoTrue();
	}
	
	public List<Parametro> obtenerParametrosNoEliminados(){
		return parametroRepository.findByEliminadoFalse();
	}
	
	public List<Parametro> obtenerParametrosNoEliminadosActivos(){
		return parametroRepository.findByEliminadoFalseAndActivoTrue();
	}
	
	public List<Parametro> obtenerParametrosNoEliminadosActivosOrderByNombreAsc(){
		return parametroRepository.findByEliminadoFalseAndActivoTrueOrderByNombreAsc();
	}
	
	public Parametro obtenerParametroPorId(long id){
			return parametroRepository.findById(id);
	}
	
	public List<Parametro> obtenerParametrosPorTipoParametro(TipoParametro tipoParametro){
			return parametroRepository.findByTipoParametroAndEliminadoFalseAndActivoTrueOrderByNombre(tipoParametro);
	}
	
	public Parametro obtenerNombreCentroDirectivo(Usuario usuario) {
		TipoParametro codigoParametro = tipoParametroRepository.findByCodigo("CD");
		return parametroRepository.findByCentroDirectivoAndTipoParametro(usuario.getFkServicioAdscrito().getCentroDirectivo(), codigoParametro);
	}
	public Parametro guardarParametro(Parametro parametro) {
		return parametroRepository.save(parametro);
	}

	@Override
	public Parametro obtenerParametroByNombre(String nombre) {
		return parametroRepository.findByNombre(nombre);
	}
}
