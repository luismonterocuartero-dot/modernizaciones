package es.juntadeandalucia.cpai.svehi.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.juntadeandalucia.cpai.svehi.entity.Perfil;
import es.juntadeandalucia.cpai.svehi.repository.PerfilRepository;

@Service
public class PerfilServiceImpl implements PerfilService {

	@Autowired
	private PerfilRepository perfilRepository;

	public List<Perfil> obtenerPerfiles() {
		return perfilRepository.findAll();
	}
	
	public List<Perfil> obtenerPerfilNoEliminadas() {
		return perfilRepository.findByEliminadoFalse();
	}

	public Perfil guardarPerfil(Perfil perfil) {
		return perfilRepository.save(perfil);
	}

	public Perfil obtenerPerfilPorId(long id) {
			return perfilRepository.findById(id);
	}
	
	public List<Perfil> obtenerPerfilNoEliminadasYActivos() {
		return perfilRepository.findByEliminadoFalseAndActivoTrue();
	}
	
	public List<Perfil> obtenerPerfilNoEliminadoActivoPorDefecto() {
		return perfilRepository.findByEliminadoFalseAndActivoTrueAndDefectoTrue();
	}
}