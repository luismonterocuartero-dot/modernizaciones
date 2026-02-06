package es.juntadeandalucia.cpai.svehi.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.juntadeandalucia.cpai.svehi.entity.Marca;
import es.juntadeandalucia.cpai.svehi.entity.Modelo;
import es.juntadeandalucia.cpai.svehi.repository.ModeloRepository;

@Service
public class ModeloServiceImpl implements ModeloService{

	@Autowired
	private ModeloRepository modeloRepository;
	
	public List<Modelo> obtenerModelos(){
		return modeloRepository.findAll();
	}
	
	public List<Modelo> obtenerModelosNoEliminados(){
		return modeloRepository.findByEliminadoFalse();
	}
	
	public Modelo obtenerModeloPorId(long id){
			return modeloRepository.findById(id);
	}
	
	public List<Modelo> obtenerModeloPorMarca(Marca marca){
			return modeloRepository.findByFkMarcaAndEliminadoFalse(marca);
	}

	public Modelo guardarModelo(Modelo modelo) {
		return modeloRepository.save(modelo);
	}
	
	public List<Object[]> obtenerDatosListadoDeModelos() {
		return modeloRepository.obtenerDatosListadoDeModelos();
	}
	
	public List<Modelo> modeloParametroTipoVehiculoActivosByParametro(long idParametro) {
		return modeloRepository.findByFkParametroTipoVehiculoIdAndEliminadoFalse(idParametro);
	}
	
	public List<Modelo> modeloParametroAlimentacionByParametro(long idParametro) {
		return modeloRepository.findByFkParametroAlimentacionIdAndEliminadoFalse(idParametro);
	}
}
