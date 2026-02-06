package es.juntadeandalucia.cpai.svehi.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.juntadeandalucia.cpai.svehi.entity.Usuario;
import es.juntadeandalucia.cpai.svehi.repository.UsuarioRepository;

@Service
public class UsuarioServiceImpl implements UsuarioService {

	@Autowired
	private UsuarioRepository usuarioRepository;
	
	public List<Usuario> obtenerUsuarios(){
		return usuarioRepository.findAll();
	}
	
	public List<Usuario> obtenerUsuariosActivos(){
		return usuarioRepository.findByActivoTrue();
	}

	public Usuario obtenerUsuarioPorNIF(String dni) {
		return usuarioRepository.findByNifAndActivoTrue(dni);
	}
	
	public Usuario guardarUsuario(Usuario usuario) {
		return usuarioRepository.save(usuario);
	}

	public Usuario obtenerUsuarioPorId(long id) {
			return usuarioRepository.findById(id);
	}
	
	public List<Usuario> usuariosActivosByPerfil(long idPerfil) {
		return usuarioRepository.findByFkPerfilIdAndActivoTrue(idPerfil);
}
	
}
