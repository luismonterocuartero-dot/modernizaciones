package es.juntadeandalucia.cpai.svehi.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import es.juntadeandalucia.cpai.svehi.entity.Usuario;
import es.juntadeandalucia.cpai.svehi.repository.UsuarioRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
	
	@Autowired
	private UsuarioRepository usuarioRepository;
	
	@Override
	public UserDetails loadUserByUsername(String nombre) throws UsernameNotFoundException {
		
		Usuario usuario = usuarioRepository.findByNifAndActivoTrue(nombre);
		List<GrantedAuthority> roles = new ArrayList<>();
		roles.add(new SimpleGrantedAuthority(usuario.getFkPerfil().getNombre()));
		
		return new User(usuario.getNif(),usuario.getNombre(), roles);
	}

}
