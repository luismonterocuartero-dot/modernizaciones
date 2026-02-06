package es.juntadeandalucia.cpai.svehi.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.juntadeandalucia.cpai.svehi.entity.CentroDirectivo;
import es.juntadeandalucia.cpai.svehi.entity.ServicioAdscrito;
import es.juntadeandalucia.cpai.svehi.repository.ServicioAdscritoRepository;


@Service
public class ServicioAdscritoServiceImpl implements ServicioAdscritoService{

		@Autowired
		private ServicioAdscritoRepository servicioAdscritoRepository;
		
		public List<ServicioAdscrito> obtenerServiciosAdscritos(){
			return servicioAdscritoRepository.findAll();
		}
		
		public List<ServicioAdscrito> obtenerServiciosNoEliminados(){
			return servicioAdscritoRepository.findByEliminadoFalse();
		}
		
		public List<ServicioAdscrito> obtenerServiciosNoEliminadosActivos(){
			return servicioAdscritoRepository.findByEliminadoFalseAndActivoTrue();
		}
		
		public List<ServicioAdscrito> obtenerServicioPorCentro(CentroDirectivo centroDirectivo){
				return servicioAdscritoRepository.findByCentroDirectivo(centroDirectivo);
		}
		
		
		public ServicioAdscrito obtenerServicioPorId(long id) {
				return servicioAdscritoRepository.findById(id);
		}

		
}
