package es.juntadeandalucia.cpai.svehi.service;

import java.util.List;

import es.juntadeandalucia.cpai.svehi.entity.ServicioTaller;

public interface ServicioTallerService {
	ServicioTaller obtenerServicioTallerPorId(long id);
	ServicioTaller guardaServicioTaller(ServicioTaller servicioTaller);
	List<ServicioTaller> obtenerServiciosDeTallerNoEliminados(Long id);
	List<ServicioTaller> obtenerServiciosNoEliminados();
	List<ServicioTaller> obtenerServiciosTaller();
	List<ServicioTaller> servicioTallerParametroTipoServicioActivosByParametro(long idParametro);
	List<ServicioTaller> obtenerServiciosDeTallerPorServAdscritoNoEliminados(Long id, Long idServAds);
}
