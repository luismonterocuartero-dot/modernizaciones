package es.juntadeandalucia.cpai.svehi.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.juntadeandalucia.cpai.svehi.entity.HistoricoFicherosRepoImp;
import es.juntadeandalucia.cpai.svehi.entity.Repostaje;
import es.juntadeandalucia.cpai.svehi.entity.RepostajeDescartados;
import es.juntadeandalucia.cpai.svehi.entity.RepostajeErrorCodigo;
import es.juntadeandalucia.cpai.svehi.entity.RepostajeRegistrosImportados;
import es.juntadeandalucia.cpai.svehi.repository.RepostajeDescartadosRepository;
import es.juntadeandalucia.cpai.svehi.repository.RepostajeErrorCodigoRepository;
import es.juntadeandalucia.cpai.svehi.repository.RepostajeImportadosRepoRepository;
import es.juntadeandalucia.cpai.svehi.repository.RepostajesHistoricosRepository;
import es.juntadeandalucia.cpai.svehi.repository.RepostajeRepository;

@Service
public class RepostajeServiceImpl implements RepostajeService {

	@Autowired
	private RepostajeRepository repostajeRepository;
	
	@Autowired
	private RepostajeDescartadosRepository repostajeDescartadosRepository;
	
	@Autowired
	private RepostajeImportadosRepoRepository repostajeImportadosRepoRepository;
	
	@Autowired
	private RepostajesHistoricosRepository repostajesHistoricosRepository;
	
	@Autowired
	private RepostajeErrorCodigoRepository repostajeErrorcodigoRepository;
	
	public List<Repostaje> obtenerRepostajesNoEliminados() {
		return repostajeRepository.findByEliminadoFalse();
	}
	
	public List<Repostaje> obtenerRepostajesDeVehiculoNoEliminados(Long id){
		return repostajeRepository.findByFkVehiculoIdAndEliminadoFalse(id);
	}
	
	public List<Repostaje> obtenerRepostajesDeVehiculoYMatriculasNoEliminados(Long id, Long idMat) {
		return repostajeRepository.findByFkVehiculoIdAndFkMatriculaIdAndEliminadoFalse(id,idMat);
	}
	
	public List<Repostaje> obtenerRepostajesDeMariculasNoEliminados(String nombre) {
		return repostajeRepository.findByFkMatriculaNombreAndEliminadoFalse(nombre);
	}
	
	public Repostaje guardaRepostaje(Repostaje repostaje) {
		return repostajeRepository.save(repostaje);
	}
	public Repostaje obtenerRepostajePorId(long id) {
			return repostajeRepository.findById(id);
	}

	@Override
	public List<RepostajeDescartados> obtenerRepostajesDescartados() {
		return repostajeDescartadosRepository.findAll();
	}

	@Override
	public List<RepostajeRegistrosImportados> obtenerRepostajesImportadosRegistros() {
		return repostajeImportadosRepoRepository.findAll();
	}

	@Override
	public List<HistoricoFicherosRepoImp> obtenerRepostajesHistoricos() {
		return repostajesHistoricosRepository.findAll();
	}
	
	@Override
	public RepostajeErrorCodigo obtenerErrorPorCodigo(Long id) {
		return repostajeErrorcodigoRepository.findById(id).orElse(null);
	}

	@Override
	public void guardarLineaDescartada(RepostajeDescartados lineaDescartada) {
		repostajeDescartadosRepository.save(lineaDescartada);
		
	}
	
	@Override
	public void guardarLineaCorrecta(RepostajeRegistrosImportados registroCorrecto) {
		repostajeImportadosRepoRepository.save(registroCorrecto);
	}
}