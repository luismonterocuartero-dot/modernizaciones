package es.juntadeandalucia.cpai.svehi.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.juntadeandalucia.cpai.svehi.entity.Operadora;
import es.juntadeandalucia.cpai.svehi.entity.Vehiculo;
import es.juntadeandalucia.cpai.svehi.repository.VehiculoRepository;

@Service
public class VehiculoServiceImpl implements VehiculoService {

	@Autowired
	private VehiculoRepository vehiculoRepository;
	
	public List<Vehiculo> obtenerVehiculos(){
		return vehiculoRepository.findAll();
	}
	
	public List<Vehiculo> obtenerVehiculosNoEliminados(){
		return vehiculoRepository.findByEliminadoFalse();
	}
	
	public List<Object[]> obtenerVehiculosNoEliminadosMatrPrincipal(String doblada) {
		List<Object[]> listadoFinal = null;
		if(doblada.equals("SI")){
			listadoFinal = vehiculoRepository.findByEliminadoFalseAndDobladaTrue();
		}else{
			listadoFinal = vehiculoRepository.findByEliminadoFalseAndDobladaFalse();
		}
		return listadoFinal;
	}
	
	public List<Object[]> obtenerVehiculosNoEliminadosMatrPrincipalPorServAds(String doblada,String idServAds) {
		List<Object[]> listadoFinal = null;
		if(doblada.equals("SI")){
			listadoFinal = vehiculoRepository.findByEliminadoFalseAndDobladaTruePorServAds(idServAds);
		}else{
			listadoFinal = vehiculoRepository.findByEliminadoFalseAndDobladaFalsePorServAds(idServAds);
		}
		return listadoFinal;
	}

	public Vehiculo guardarVehiculo(Vehiculo vehiculo) {
		return vehiculoRepository.save(vehiculo);
	}
	
	public Vehiculo obtenerVehiculoPorId(long id){
			return vehiculoRepository.findById(id);
	}

	public List<Object[]> obtenerDatosListadoDeVehiculos() {
		return vehiculoRepository.obtenerDatosListadoDeVehiculos();
	}
	
	public List<Object[]> obtenerDatosListadoDeVehiculosPorServAds(String idServAds) {
		return vehiculoRepository.obtenerDatosListadoDeVehiculosPorServAds(idServAds);
	}
	
	public List<Object[]> obtenerDatosListadoDeVehiculosDoblados() {
		return vehiculoRepository.obtenerDatosListadoDeVehiculosDoblados();
	}
	
	public List<Object[]> obtenerDatosListadoDeVehiculosDobladosPorServAds(String idServAds) {
		return vehiculoRepository.obtenerDatosListadoDeVehiculosDobladosPorServAds(idServAds);
	}
	
	public List<Vehiculo> vehiculosActivosByMarca(long idMarca){
		return vehiculoRepository.findByFkModeloFkMarcaIdAndEliminadoFalseAndFkModeloEliminadoFalse(idMarca);
	}
	
	public List<Vehiculo> vehiculosActivosByOperadora(Operadora operadora){
		return vehiculoRepository.findByFkOperadoraAndEliminadoFalse(operadora);
	}
	
	public List<Vehiculo> vehiculosActivosByModelo(long idModelo){
		return vehiculoRepository.findByFkModeloIdAndEliminadoFalseAndFkModeloEliminadoFalse(idModelo);
	}
	
	public List<Vehiculo> vehiculosParametroTipoSituacionActivosByParametro(long idParametro) {
		return vehiculoRepository.findByFkParametroTipoSituacionIdAndEliminadoFalse(idParametro);
	}
	
	public List<Vehiculo> vehiculosParametroTipoUsoActivosByParametro(long idParametro) {
		return vehiculoRepository.findByFkParametroTipoUsoIdAndEliminadoFalse(idParametro);
	}
	
	public List<Vehiculo> vehiculosParametroTipoDestinonActivosByParametro(long idParametro) {
		return vehiculoRepository.findByFkParametroTipoDestinoIdAndEliminadoFalse(idParametro);
	}
	
	public List<Vehiculo> vehiculosParametroTipoRepostajeActivosByParametro(long idParametro) {
		return vehiculoRepository.findByFkParametroTipoRepostajeIdAndEliminadoFalse(idParametro);
	}	

	public List<Object[]> obtenerDatosListadoDeVehiculosFiltrados( List<List<String>> listaFiltrada,String dobladaRecibida ) {
		//Variable donde guardaremos el valor de la lista
		String fkServicioAdscrito = null;
		String fechaBajaDesde = null;
		String fechaBajaHasta = null;
		String fkModelo = null;
		String fkParametroTipoRepostaje = null;
		String fechaAdscripcionDesde = null;
		String fechaAdscripcionHasta = null;
		String marca = null;
		String fkParametroTipoUso= null;
		String fkParametroTipoSituacion = null;
		String numeroBastidor = null;
		String fechaCompraDesde= null;
		String fechaCompraHasta =null;
		String nombreMatricula = null;
		String tarjetaRepostaje=null;
		String fechaMatriculacionDesde=null;
		String fechaMatriculacionHasta=null;
		String fkTipoEquipamiento=null;
		String fkServicioAdscritoCesiones=null;
		String fkParametroTipoMotivo=null;
		String fechaInicioDesde=null;
		String fechaInicioHasta =null;
		String fechaFinDesde=null;
		String fechaFinHasta =null;
		String fechaRepostajeDesde=null;
		String fechaRepostajeHasta=null;
		String descripcionRepo=null;
		String fechaSiniestroDesde=null;
		String fechaSiniestroHasta=null;
		String fkCompania=null;
		String numeroPoliza=null;
		String fechaInicioPolizaDesde=null;
		String fechaInicioPolizaHasta=null;
		String fechaFinPolizaDesde=null;
		String fechaFinPolizaHasta=null;
		String fechaItvDesde=null;
		String fechaItvHasta=null;
		String fechaSiguienteItvDesde=null;
		String fechaSiguienteItvHasta=null;
		String fechaInfraccionDesde=null;
		String fechaInfraccionHasta=null;
		String fkTaller=null;
		String fechaAutorizacionDesde=null;
		String fechaAutorizacionHasta=null;
		String fkConcepto=null;
		String fechaFacturaDesde=null;
		String fechaFacturaHasta=null;
		String fkParametroTipoReparacion=null;
		String fechaIntervencionDesde=null;
		String fechaIntervencionHasta=null;
		String tipoVehiculo= null;
		String fkOperadora= null;
        String fkParametroTipoAdquisicion= null;
		String valorCampo;
		
		for(int i=0;i<listaFiltrada.size();i++)
		{
			// Acceder a cada lista interna
	        List<String> fila = listaFiltrada.get(i);
			
	        String campo = fila.get(0); // El primer elemento es el nombre del campo
	        valorCampo = fila.get(1); // El segundo elemento es el valor del campo
			
			switch (campo) {
			   case "fkServicioAdscrito":
				   fkServicioAdscrito=valorCampo; 
			        break;
			   case "fechaBajaDesde":
			    	fechaBajaDesde= valorCampo;
			    	break;
			    case "fechaBajaHasta":
			    	fechaBajaHasta= valorCampo;        
			    	break;
			    case "fkParametroTipoRepostaje":
			    	fkParametroTipoRepostaje = valorCampo;
			        break;
			    case "fechaAdscripcionDesde":
			    	fechaAdscripcionDesde = valorCampo;
			        break;
			    case "fechaAdscripcionHasta":
			    	fechaAdscripcionHasta = valorCampo;
			        break;
			    case "marca":
			    	marca = valorCampo;
			        break;
			    case "fkModelo":
			    	fkModelo=valorCampo; 
			        break;
			    case "fkParametroTipoUso":
			    	fkParametroTipoUso=valorCampo;
			        break;
			    case "fkParametroTipoSituacion":
			    	fkParametroTipoSituacion = valorCampo;
			        break; 
			    case "numeroBastidor":
			    	numeroBastidor=valorCampo;
			        break;
			    case "fechaCompraDesde":
			    	fechaCompraDesde=valorCampo;
			        break;
			    case "fechaCompraHasta":	
			    	fechaCompraHasta=valorCampo;
			        break;
			    case "nombreMatricula":
			    	nombreMatricula=valorCampo;
			        break;
			    case "tarjetaRepostaje":
			    	tarjetaRepostaje=valorCampo;
			        break;
			    case "fechaMatriculacionDesde":
			    	fechaMatriculacionDesde=valorCampo;
			        break;
			    case "fechaMatriculacionHasta":
			    	fechaMatriculacionHasta=valorCampo;
			    	break;
			    case "fkTipoEquipamiento":
			    	fkTipoEquipamiento=valorCampo;
			        break;
			    case "fkParametroTipoMotivo":
			    	fkParametroTipoMotivo=valorCampo;
			        break;
			    case "fkServicioAdscritoCesiones":
			    	fkServicioAdscritoCesiones=valorCampo;
			        break;
			    case "fechaInicioDesde":
			    	fechaInicioDesde=valorCampo;
			        break;
			    case "fechaInicioHasta":
			    	fechaInicioHasta=valorCampo;
			        break;
			    case "fechaFinDesde":
			    	fechaFinDesde=valorCampo;
			        break;
			    case "fechaFinHasta":
			    	fechaFinHasta=valorCampo;
			        break;
			    case "fechaRepostajeDesde":
			    	fechaRepostajeDesde=valorCampo;
			        break;
			    case "fechaRepostajeHasta":		  
			    	fechaRepostajeHasta=valorCampo;
			    	break;
			    case "descripcionRepo":
			    	descripcionRepo=valorCampo;
			        break;
			    case "fechaSiniestroDesde":
			    	fechaSiniestroDesde=valorCampo;
			        break;
			    case "fechaSiniestroHasta":	
			    	fechaSiniestroHasta=valorCampo;
			    	break;
			    case "fkCompania":
			    	fkCompania=valorCampo;
			        break;
			    case "numeroPoliza":
			    	numeroPoliza=valorCampo;
			        break;
			    case "fechaInicioPolizaDesde":
			    	fechaInicioPolizaDesde=valorCampo;
			        break;
			    case "fechaInicioPolizaHasta":
			    	fechaInicioPolizaHasta=valorCampo;
			        break;
			    case "fechaFinPolizaDesde":
			    	fechaFinPolizaDesde=valorCampo;
			    	break;
			    case "fechaFinPolizaHasta":
			    	fechaFinPolizaHasta=valorCampo;
			    	break;
			    case "fechaItvDesde":
			    	fechaItvDesde=valorCampo;
			        break;
			    case "fechaItvHasta":
			    	fechaItvHasta=valorCampo;
			    	break;
			    case "fechaSiguienteItvDesde":
			    	fechaSiguienteItvDesde=valorCampo;
			        break;
			    case "fechaSiguienteItvHasta":
			    	fechaSiguienteItvHasta=valorCampo;
			    	break;
			    case "fechaInfraccionDesde":
			    	fechaInfraccionDesde=valorCampo;
			        break;
			    case "fechaInfraccionHasta":	
			    	fechaInfraccionHasta=valorCampo;
			    	break;
			    case "fkTaller":
			    	fkTaller=valorCampo;
			        break;
			    case "fechaAutorizacionDesde":
			    	fechaAutorizacionDesde=valorCampo;
			        break;
			    case "fechaAutorizacionHasta":		
			    	fechaAutorizacionHasta=valorCampo;
			    	break;
			    case "fkConcepto":
			    	fkConcepto=valorCampo;
			        break;
			    case "fechaFacturaDesde":
			    	fechaFacturaDesde=valorCampo;
			        break;
			    case "fechaFacturaHasta":
			    	fechaFacturaHasta=valorCampo;
			    	break;
				case "fkParametroTipoReparacion":
					fkParametroTipoReparacion=valorCampo;
					break;
				case "fechaIntervencionDesde":
					fechaIntervencionDesde=valorCampo;
					break;
				case "fechaIntervencionHasta":
					fechaIntervencionHasta=valorCampo;
					break;
			    case "tipoVehiculo":
			    	tipoVehiculo = valorCampo;
			    	break;
			    case "fkOperadora":
			    	fkOperadora = valorCampo;
			    	break;
			    case "fkParametroTipoAdquisicion":
			    	fkParametroTipoAdquisicion= valorCampo;
			    	break;
			    default:
			        // Codigo para el caso por defecto
			        break;
			}
		}
		if(dobladaRecibida.equals("SI")) {
			return vehiculoRepository.obtenerFiltradoListadoDeVehiculosDobladaTrue(fkServicioAdscrito,fechaBajaDesde,fechaBajaHasta,fkParametroTipoRepostaje,fechaAdscripcionDesde,fechaAdscripcionHasta,marca,fkModelo,fkParametroTipoUso,fkParametroTipoSituacion,numeroBastidor,fechaCompraDesde,fechaCompraHasta,nombreMatricula,tarjetaRepostaje,fechaMatriculacionDesde,fechaMatriculacionHasta,fkTipoEquipamiento,fkParametroTipoMotivo,fkServicioAdscritoCesiones,fechaInicioDesde,fechaInicioHasta,fechaFinDesde,fechaFinHasta,fechaRepostajeDesde,fechaRepostajeHasta,descripcionRepo,fechaSiniestroDesde,fechaSiniestroHasta,fkCompania,numeroPoliza,fechaInicioPolizaDesde,fechaInicioPolizaHasta,fechaFinPolizaDesde,fechaFinPolizaHasta,fechaItvDesde,fechaItvHasta,fechaSiguienteItvDesde,fechaSiguienteItvHasta,fechaInfraccionDesde,fechaInfraccionHasta,fkTaller,fechaAutorizacionDesde,fechaAutorizacionHasta,fkConcepto,fechaFacturaDesde,fechaFacturaHasta,fkParametroTipoReparacion,fechaIntervencionDesde,fechaIntervencionHasta,tipoVehiculo,fkOperadora,fkParametroTipoAdquisicion);
		}else {
			return vehiculoRepository.obtenerFiltradoListadoDeVehiculosDobladaFalse(fkServicioAdscrito,fechaBajaDesde,fechaBajaHasta,fkParametroTipoRepostaje,fechaAdscripcionDesde,fechaAdscripcionHasta,marca,fkModelo,fkParametroTipoUso,fkParametroTipoSituacion,numeroBastidor,fechaCompraDesde,fechaCompraHasta,nombreMatricula,tarjetaRepostaje,fechaMatriculacionDesde,fechaMatriculacionHasta,fkTipoEquipamiento,fkParametroTipoMotivo,fkServicioAdscritoCesiones,fechaInicioDesde,fechaInicioHasta,fechaFinDesde,fechaFinHasta,fechaRepostajeDesde,fechaRepostajeHasta,descripcionRepo,fechaSiniestroDesde,fechaSiniestroHasta,fkCompania,numeroPoliza,fechaInicioPolizaDesde,fechaInicioPolizaHasta,fechaFinPolizaDesde,fechaFinPolizaHasta,fechaItvDesde,fechaItvHasta,fechaSiguienteItvDesde,fechaSiguienteItvHasta,fechaInfraccionDesde,fechaInfraccionHasta,fkTaller,fechaAutorizacionDesde,fechaAutorizacionHasta,fkConcepto,fechaFacturaDesde,fechaFacturaHasta,fkParametroTipoReparacion,fechaIntervencionDesde,fechaIntervencionHasta,tipoVehiculo,fkOperadora,fkParametroTipoAdquisicion);
		}
	}
	
	public List<Object[]> obtenerDatosListadoDeVehiculosFiltradosContador( List<List<String>> listaFiltrada,String dobladaRecibida ) {
		//Variable donde guardaremos el valor de la lista
		String fkServicioAdscrito = null;
		String fechaBajaDesde = null;
		String fechaBajaHasta = null;
		String fkModelo = null;
		String fkParametroTipoRepostaje = null;
		String fechaAdscripcionDesde = null;
		String fechaAdscripcionHasta = null;
		String marca = null;
		String fkParametroTipoUso= null;
		String fkParametroTipoSituacion = null;
		String numeroBastidor = null;
		String fechaCompraDesde= null;
		String fechaCompraHasta =null;
		String nombreMatricula = null;
		String tarjetaRepostaje=null;
		String fechaMatriculacionDesde=null;
		String fechaMatriculacionHasta=null;
		String fkTipoEquipamiento=null;
		String fkServicioAdscritoCesiones=null;
		String fkParametroTipoMotivo=null;
		String fechaInicioDesde=null;
		String fechaInicioHasta =null;
		String fechaFinDesde=null;
		String fechaFinHasta =null;
		String fechaRepostajeDesde=null;
		String fechaRepostajeHasta=null;
		String descripcionRepo=null;
		String fechaSiniestroDesde=null;
		String fechaSiniestroHasta=null;
		String fkCompania=null;
		String numeroPoliza=null;
		String fechaInicioPolizaDesde=null;
		String fechaInicioPolizaHasta=null;
		String fechaFinPolizaDesde=null;
		String fechaFinPolizaHasta=null;
		String fechaItvDesde=null;
		String fechaItvHasta=null;
		String fechaSiguienteItvDesde=null;
		String fechaSiguienteItvHasta=null;
		String fechaInfraccionDesde=null;
		String fechaInfraccionHasta=null;
		String fkTaller=null;
		String fechaAutorizacionDesde=null;
		String fechaAutorizacionHasta=null;
		String fkConcepto=null;
		String fechaFacturaDesde=null;
		String fechaFacturaHasta=null;
		String fkParametroTipoReparacion = null;
		String fechaIntervencionDesde = null;
		String fechaIntervencionHasta = null;
		String tipoVehiculo= null;
		String fkOperadora= null;
        String fkParametroTipoAdquisicion= null;
		String valorCampo;
		
		for(int i=0;i<listaFiltrada.size();i++)
		{
			// Acceder a cada lista interna
	        List<String> fila = listaFiltrada.get(i);
			
	        String campo = fila.get(0); // El primer elemento es el nombre del campo
	        valorCampo = fila.get(1); // El segundo elemento es el valor del campo
			
			switch (campo) {
			   case "fkServicioAdscrito":
				   fkServicioAdscrito=valorCampo; 
			        break;
			   case "fechaBajaDesde":
			    	fechaBajaDesde= valorCampo;
			    	break;
			    case "fechaBajaHasta":
			    	fechaBajaHasta= valorCampo;        
			    	break;
			    case "fkParametroTipoRepostaje":
			    	fkParametroTipoRepostaje = valorCampo;
			        break;
			    case "fechaAdscripcionDesde":
			    	fechaAdscripcionDesde = valorCampo;
			        break;
			    case "fechaAdscripcionHasta":
			    	fechaAdscripcionHasta = valorCampo;
			        break;
			    case "marca":
			    	marca = valorCampo;
			        break;
			    case "fkModelo":
			    	fkModelo=valorCampo; 
			        break;
			    case "fkParametroTipoUso":
			    	fkParametroTipoUso=valorCampo;
			        break;
			    case "fkParametroTipoSituacion":
			    	fkParametroTipoSituacion = valorCampo;
			        break; 
			    case "numeroBastidor":
			    	numeroBastidor=valorCampo;
			        break;
			    case "fechaCompraDesde":
			    	fechaCompraDesde=valorCampo;
			        break;
			    case "fechaCompraHasta":	
			    	fechaCompraHasta=valorCampo;
			        break;
			    case "nombreMatricula":
			    	nombreMatricula=valorCampo;
			        break;
			    case "tarjetaRepostaje":
			    	tarjetaRepostaje=valorCampo;
			        break;
			    case "fechaMatriculacionDesde":
			    	fechaMatriculacionDesde=valorCampo;
			        break;
			    case "fechaMatriculacionHasta":
			    	fechaMatriculacionHasta=valorCampo;
			    	break;
			    case "fkTipoEquipamiento":
			    	fkTipoEquipamiento=valorCampo;
			        break;
			    case "fkParametroTipoMotivo":
			    	fkParametroTipoMotivo=valorCampo;
			        break;
			    case "fkServicioAdscritoCesiones":
			    	fkServicioAdscritoCesiones=valorCampo;
			        break;
			    case "fechaInicioDesde":
			    	fechaInicioDesde=valorCampo;
			        break;
			    case "fechaInicioHasta":
			    	fechaInicioHasta=valorCampo;
			        break;
			    case "fechaFinDesde":
			    	fechaFinDesde=valorCampo;
			        break;
			    case "fechaFinHasta":
			    	fechaFinHasta=valorCampo;
			        break;
			    case "fechaRepostajeDesde":
			    	fechaRepostajeDesde=valorCampo;
			        break;
			    case "fechaRepostajeHasta":		  
			    	fechaRepostajeHasta=valorCampo;
			    	break;
			    case "descripcionRepo":
			    	descripcionRepo=valorCampo;
			        break;
			    case "fechaSiniestroDesde":
			    	fechaSiniestroDesde=valorCampo;
			        break;
			    case "fechaSiniestroHasta":	
			    	fechaSiniestroHasta=valorCampo;
			    	break;
			    case "fkCompania":
			    	fkCompania=valorCampo;
			        break;
			    case "numeroPoliza":
			    	numeroPoliza=valorCampo;
			        break;
			    case "fechaInicioPolizaDesde":
			    	fechaInicioPolizaDesde=valorCampo;
			        break;
			    case "fechaInicioPolizaHasta":
			    	fechaInicioPolizaHasta=valorCampo;
			        break;
			    case "fechaFinPolizaDesde":
			    	fechaFinPolizaDesde=valorCampo;
			    	break;
			    case "fechaFinPolizaHasta":
			    	fechaFinPolizaHasta=valorCampo;
			    	break;
			    case "fechaItvDesde":
			    	fechaItvDesde=valorCampo;
			        break;
			    case "fechaItvHasta":
			    	fechaItvHasta=valorCampo;
			    	break;
			    case "fechaSiguienteItvDesde":
			    	fechaSiguienteItvDesde=valorCampo;
			        break;
			    case "fechaSiguienteItvHasta":
			    	fechaSiguienteItvHasta=valorCampo;
			    	break;
			    case "fechaInfraccionDesde":
			    	fechaInfraccionDesde=valorCampo;
			        break;
			    case "fechaInfraccionHasta":	
			    	fechaInfraccionHasta=valorCampo;
			    	break;
			    case "fkTaller":
			    	fkTaller=valorCampo;
			        break;
			    case "fechaAutorizacionDesde":
			    	fechaAutorizacionDesde=valorCampo;
			        break;
			    case "fechaAutorizacionHasta":		
			    	fechaAutorizacionHasta=valorCampo;
			    	break;
			    case "fkConcepto":
			    	fkConcepto=valorCampo;
			        break;
			    case "fechaFacturaDesde":
			    	fechaFacturaDesde=valorCampo;
			        break;
			    case "fechaFacturaHasta":
			    	fechaFacturaHasta=valorCampo;
			    	break;
				case "fkParametroTipoReparacion":
					fkParametroTipoReparacion = valorCampo;
					break;
				case "fechaIntervencionDesde":
					fechaIntervencionDesde = valorCampo;
					break;
				case "fechaIntervencionHasta":
					fechaIntervencionHasta = valorCampo;
					break;
			    case "tipoVehiculo":
			    	tipoVehiculo = valorCampo;
			    	break;
			    case "fkOperadora":
			    	fkOperadora = valorCampo;
			    	break;
			    case "fkParametroTipoAdquisicion":
			    	fkParametroTipoAdquisicion= valorCampo;
			    	break;
			    default:
			        // Codigo para el caso por defecto
			        break;
			}
		}
		if(dobladaRecibida.equals("SI")) {
			return vehiculoRepository.obtenerFiltradoListadoDeVehiculosDobladaTrueContador(fkServicioAdscrito,fechaBajaDesde,fechaBajaHasta,fkParametroTipoRepostaje,fechaAdscripcionDesde,fechaAdscripcionHasta,marca,fkModelo,fkParametroTipoUso,fkParametroTipoSituacion,numeroBastidor,fechaCompraDesde,fechaCompraHasta,nombreMatricula,tarjetaRepostaje,fechaMatriculacionDesde,fechaMatriculacionHasta,fkTipoEquipamiento,fkParametroTipoMotivo,fkServicioAdscritoCesiones,fechaInicioDesde,fechaInicioHasta,fechaFinDesde,fechaFinHasta,fechaRepostajeDesde,fechaRepostajeHasta,descripcionRepo,fechaSiniestroDesde,fechaSiniestroHasta,fkCompania,numeroPoliza,fechaInicioPolizaDesde,fechaInicioPolizaHasta,fechaFinPolizaDesde,fechaFinPolizaHasta,fechaItvDesde,fechaItvHasta,fechaSiguienteItvDesde,fechaSiguienteItvHasta,fechaInfraccionDesde,fechaInfraccionHasta,fkTaller,fechaAutorizacionDesde,fechaAutorizacionHasta,fkConcepto,fechaFacturaDesde,fechaFacturaHasta,fkParametroTipoReparacion,fechaIntervencionDesde,fechaIntervencionHasta,tipoVehiculo,fkOperadora,fkParametroTipoAdquisicion);
		}else {
			return vehiculoRepository.obtenerFiltradoListadoDeVehiculosDobladaFalseContador(fkServicioAdscrito,fechaBajaDesde,fechaBajaHasta,fkParametroTipoRepostaje,fechaAdscripcionDesde,fechaAdscripcionHasta,marca,fkModelo,fkParametroTipoUso,fkParametroTipoSituacion,numeroBastidor,fechaCompraDesde,fechaCompraHasta,nombreMatricula,tarjetaRepostaje,fechaMatriculacionDesde,fechaMatriculacionHasta,fkTipoEquipamiento,fkParametroTipoMotivo,fkServicioAdscritoCesiones,fechaInicioDesde,fechaInicioHasta,fechaFinDesde,fechaFinHasta,fechaRepostajeDesde,fechaRepostajeHasta,descripcionRepo,fechaSiniestroDesde,fechaSiniestroHasta,fkCompania,numeroPoliza,fechaInicioPolizaDesde,fechaInicioPolizaHasta,fechaFinPolizaDesde,fechaFinPolizaHasta,fechaItvDesde,fechaItvHasta,fechaSiguienteItvDesde,fechaSiguienteItvHasta,fechaInfraccionDesde,fechaInfraccionHasta,fkTaller,fechaAutorizacionDesde,fechaAutorizacionHasta,fkConcepto,fechaFacturaDesde,fechaFacturaHasta,fkParametroTipoReparacion,fechaIntervencionDesde,fechaIntervencionHasta,tipoVehiculo,fkOperadora,fkParametroTipoAdquisicion);
		}
	}
}
