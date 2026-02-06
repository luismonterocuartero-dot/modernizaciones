package es.juntadeandalucia.cpai.svehi.service;

import java.util.List;

import es.juntadeandalucia.cpai.svehi.entity.Operadora;
import es.juntadeandalucia.cpai.svehi.entity.Vehiculo;

public interface VehiculoService {

	List<Vehiculo> obtenerVehiculos();
	List<Object[]> obtenerDatosListadoDeVehiculos();
	List<Object[]> obtenerDatosListadoDeVehiculosPorServAds(String idServAds);
	List<Object[]> obtenerDatosListadoDeVehiculosDoblados();
	List<Object[]> obtenerDatosListadoDeVehiculosDobladosPorServAds(String idServAds);
	List<Vehiculo> obtenerVehiculosNoEliminados();
	List<Object[]> obtenerVehiculosNoEliminadosMatrPrincipal(String doblada);
	List<Object[]> obtenerVehiculosNoEliminadosMatrPrincipalPorServAds(String doblada,String idServAds);
	Vehiculo guardarVehiculo(Vehiculo vehiculo);
	Vehiculo obtenerVehiculoPorId(long id);
	List<Vehiculo> vehiculosActivosByMarca(long idMarca);
	List<Vehiculo> vehiculosActivosByOperadora(Operadora operadora);
	List<Vehiculo> vehiculosActivosByModelo(long idModelo);
	List<Vehiculo> vehiculosParametroTipoSituacionActivosByParametro(long idParametro);
	List<Vehiculo> vehiculosParametroTipoUsoActivosByParametro(long idParametro);
	List<Vehiculo> vehiculosParametroTipoDestinonActivosByParametro(long idParametro);
	List<Vehiculo> vehiculosParametroTipoRepostajeActivosByParametro(long idParametro);
	List<Object[]> obtenerDatosListadoDeVehiculosFiltrados(List<List<String>> listaFiltrada, String dobladaRecibida);
	List<Object[]> obtenerDatosListadoDeVehiculosFiltradosContador(List<List<String>> listaFiltrada, String dobladaRecibida);
}
