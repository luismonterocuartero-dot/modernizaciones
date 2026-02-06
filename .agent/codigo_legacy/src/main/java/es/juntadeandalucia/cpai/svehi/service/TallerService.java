package es.juntadeandalucia.cpai.svehi.service;


import java.util.List;
import javax.servlet.http.HttpSession;
import es.juntadeandalucia.cpai.svehi.entity.Taller;
public interface TallerService {
	
	List<Taller> obtenerTalleres();
	List<Taller> obtenerTallerNoEliminadas();
	Taller obtenerTallerPorId(long id);
	Taller guardarTaller(Taller taller);
	List<Object[]> obtenerTalleresConServiciosNoEliminados();
	List<Object[]> obtenerTalleresConServiciosNoEliminadosPorAds(String idServAds);
	List<Object[]> obtenerTalleresConServiciosNoEliminadosOrderByNameAsc();
	List<Object[]> obtenerTalleresConServiciosNoEliminadosPorAdsOrderByNameAsc(String idServAds);
	List<Taller> obtenerTalleresPorUsuario(HttpSession session);
	Taller obtenerTallerNombre(String nombre);
}
