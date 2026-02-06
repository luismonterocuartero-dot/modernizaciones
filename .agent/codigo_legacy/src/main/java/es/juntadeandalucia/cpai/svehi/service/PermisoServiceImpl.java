package es.juntadeandalucia.cpai.svehi.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.juntadeandalucia.cpai.svehi.entity.Permiso;
import es.juntadeandalucia.cpai.svehi.repository.PermisoRepository;

@Service
public class PermisoServiceImpl implements PermisoService {

	@Autowired
	private PermisoRepository permisoRepository;
	@Autowired
	private PermisoUsuarioService permisoUsuarioService;
	

	public List<Permiso> obtenerPermisosNoEliminados() {
		return permisoRepository.findByEliminadoFalse();
	}

	public Permiso guardarPermiso(Permiso permiso) {
		return permisoRepository.save(permiso);
	}

	public Permiso obtenerPermisoPorId(long id) {
		return permisoRepository.findById(id);
	}
	
	public List<Object[]> obtenerPermisoPorReferencia(String referencia) {
		return permisoRepository.obtenerDatosPermisosPorReferenciaNoEliminados(referencia);
	}
	
	/**
	** Funcion que devuelve el permiso de acceso del usuario logado sobre la pantalla que este intentando acceder (SIN_PERMISO, ADMINISTRADOR, EDITOR, VISUALIZADOR)
	**/
	public String permisoDeAcceso(String rol, Long idUsuario, List<String> permisoFin) {
		// PERMISO POR DEFECTO
		String permisoReferencia="SIN_PERMISO";
		
		// SI ES ADMINISTRADOR
		if(rol.equals("ADMINISTRADOR")){
			permisoReferencia="ADMINISTRADOR";
		}else if (rol.equals("REPOSTAJE")) {
			permisoReferencia="REPOSTAJE";
		}else{
		
			permisoReferencia = permisoNoAdmin(permisoReferencia, permisoFin, idUsuario);
		}
		
		return permisoReferencia;
	}
	
	/**
	** FUNCION QUE DEVUELVE EL PERMISO EN CASO DE NO SER ADMINISTRADOR
	**/
	private String permisoNoAdmin(String permisoReferencia, List<String> permisoFin, Long idUsuario) {
		// OBTENEMOS PERMISOS DEL USUARIO
		String refe = "";
		String esEditor = "NO";
		List<Object[]> permisos = permisoUsuarioService.obtenerPermisosPorListaAplicacionesYUsuarioIdNoEliminados(permisoFin,idUsuario);
		for(Object[] permiso: permisos) {
			refe = permiso[1].toString();
			if(refe.equals("E")){
				esEditor = "SI";
			}
		}
		if(!refe.equals("")){
			if(esEditor.equals("SI")){
				permisoReferencia="EDITOR";
			}else{
				permisoReferencia="VISUALIZADOR";
			}
		}
		
		return permisoReferencia;
	}
}