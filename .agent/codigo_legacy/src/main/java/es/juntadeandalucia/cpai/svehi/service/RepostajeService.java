package es.juntadeandalucia.cpai.svehi.service;

import java.util.List;

import es.juntadeandalucia.cpai.svehi.entity.HistoricoFicherosRepoImp;
import es.juntadeandalucia.cpai.svehi.entity.Repostaje;
import es.juntadeandalucia.cpai.svehi.entity.RepostajeDescartados;
import es.juntadeandalucia.cpai.svehi.entity.RepostajeErrorCodigo;
import es.juntadeandalucia.cpai.svehi.entity.RepostajeRegistrosImportados;

public interface RepostajeService {

	List<Repostaje> obtenerRepostajesNoEliminados();
	List<Repostaje> obtenerRepostajesDeVehiculoNoEliminados(Long id);
	List<Repostaje> obtenerRepostajesDeVehiculoYMatriculasNoEliminados(Long id, Long idMat);
	List<Repostaje> obtenerRepostajesDeMariculasNoEliminados(String nombre);
	Repostaje guardaRepostaje(Repostaje repostaje);
	Repostaje obtenerRepostajePorId(long id);
	List<RepostajeDescartados> obtenerRepostajesDescartados();
	List<HistoricoFicherosRepoImp> obtenerRepostajesHistoricos();
	List<RepostajeRegistrosImportados> obtenerRepostajesImportadosRegistros();
	RepostajeErrorCodigo obtenerErrorPorCodigo(Long id);
	void guardarLineaDescartada(RepostajeDescartados lineaDescartada);
	void guardarLineaCorrecta(RepostajeRegistrosImportados registroCorrecto);
	
}
