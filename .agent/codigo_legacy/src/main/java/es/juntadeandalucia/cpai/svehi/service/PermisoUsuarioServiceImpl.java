package es.juntadeandalucia.cpai.svehi.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.juntadeandalucia.cpai.svehi.entity.PermisoUsuario;
import es.juntadeandalucia.cpai.svehi.repository.PermisoUsuarioRepository;

@Service
public class PermisoUsuarioServiceImpl implements PermisoUsuarioService {

	@Autowired
	private PermisoUsuarioRepository permisoUsuarioRepository;
	
	public PermisoUsuario guardarPermisoUsuario(PermisoUsuario permisoUsuario) {
		return permisoUsuarioRepository.save(permisoUsuario);
	}
	
	public List<PermisoUsuario> obtenerPermisosNoEliminadosDeUsuariosPorId(Long id){
		return permisoUsuarioRepository.findByFkUsuariosIdAndEliminadoFalse(id);
	}
	
	public List<PermisoUsuario> obtenerPermisosApliNoEliminadosPorId(Long id){
		return permisoUsuarioRepository.findByFkPermisosIdAndEliminadoFalse(id);
	}
	
	public List<Object[]> obtenerPermisosPorListaAplicacionesYUsuarioIdNoEliminados(List<String> listapli, Long idusu){
		return permisoUsuarioRepository.obtenerDatosPorPermisosYUsuariosNoEliminados(listapli,idusu);
	}
	
	public List<Object[]> obtenerListadoPermisosNoEliminadosYNoAsignadosPorUsuario(Long idusuario){
		return permisoUsuarioRepository.obtenerListadoPermisosNoEliminadosYNoAsignadosPorUsuario(idusuario);
	}
	
	public List<Object[]> obtenerListadoPermisosNoEliminadosYAsignadosPorUsuario(Long idusuario){
		return permisoUsuarioRepository.obtenerListadoPermisosNoEliminadosYAsignadosPorUsuario(idusuario);
	}
	
	public PermisoUsuario obtenerPermisosPorAplicacionIdYUsuarioIdNoEliminados(Long idapli, Long idusu){
		return permisoUsuarioRepository.findByFkPermisosIdAndFkUsuariosId(idapli,idusu);
	}
}