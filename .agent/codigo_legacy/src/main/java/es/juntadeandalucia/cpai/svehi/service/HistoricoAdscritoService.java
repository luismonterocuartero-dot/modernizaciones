package es.juntadeandalucia.cpai.svehi.service;

import java.util.List;

import es.juntadeandalucia.cpai.svehi.entity.HistoricoAdscrito;

public interface HistoricoAdscritoService {
	HistoricoAdscrito obtnerHistoricoAdscritoPorId(long id);
	HistoricoAdscrito guardaHistoricoAdscrito(HistoricoAdscrito historicoAdscrito);
	List<HistoricoAdscrito> obtenerHistoricosAdscritos();
	List<HistoricoAdscrito> obtenerHistoricosAdscritosPorVehiculo(Long id);
}
