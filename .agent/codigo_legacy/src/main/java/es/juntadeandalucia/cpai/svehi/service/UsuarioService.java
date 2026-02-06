package es.juntadeandalucia.cpai.svehi.service;

import java.util.List;

import es.juntadeandalucia.cpai.svehi.entity.Usuario;

public interface UsuarioService {

		List<Usuario> obtenerUsuarios();
		List<Usuario> obtenerUsuariosActivos();
		Usuario obtenerUsuarioPorNIF(String nif);
		Usuario obtenerUsuarioPorId(long id);
		Usuario guardarUsuario(Usuario usuario);
		List<Usuario> usuariosActivosByPerfil(long idPerfil);
}
