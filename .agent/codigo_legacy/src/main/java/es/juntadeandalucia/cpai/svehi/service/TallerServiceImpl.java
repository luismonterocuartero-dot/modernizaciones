package es.juntadeandalucia.cpai.svehi.service;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.juntadeandalucia.cpai.svehi.entity.Taller;
import es.juntadeandalucia.cpai.svehi.entity.Usuario;
import es.juntadeandalucia.cpai.svehi.repository.TallerRepository;

@Service
public class TallerServiceImpl implements TallerService {

	@Autowired
	private  TallerRepository tallerRepository;
	
	@Autowired
	private  UsuarioService usuarioService;
	
	public List<Taller> obtenerTalleres(){
		return tallerRepository.findAll();
	}
	
	public List<Taller> obtenerTallerNoEliminadas(){
		return tallerRepository.findByEliminadoFalse();
	}
	
	public Taller guardarTaller( Taller taller) {
		return tallerRepository.save(taller);

	}
	public Taller obtenerTallerPorId(long id){
			return tallerRepository.findById(id);
	}
	
	public List<Object[]> obtenerTalleresConServiciosNoEliminados(){
		return tallerRepository.obtenerTalleresConServiciosNoEliminados();
	}
	
	public List<Object[]> obtenerTalleresConServiciosNoEliminadosPorAds(String idServAds){
		return tallerRepository.obtenerTalleresConServiciosNoEliminadosPorAds(idServAds);
	}
	
	public List<Object[]> obtenerTalleresConServiciosNoEliminadosOrderByNameAsc(){
		return tallerRepository.obtenerTalleresConServiciosNoEliminadosOrderByNameAsc();
	}
	
	public List<Object[]> obtenerTalleresConServiciosNoEliminadosPorAdsOrderByNameAsc(String idServAds){
		return tallerRepository.obtenerTalleresConServiciosNoEliminadosPorAdsOrderByNameAsc(idServAds);
	}
	
    public List<Taller> obtenerTalleresPorUsuario(HttpSession session) {
        List<Taller> talleres = new ArrayList<>();
        List<Object[]> talleresTmp;

		Usuario usuarioActual = usuarioService.obtenerUsuarioPorId(Long.valueOf(session.getAttribute("idUsuario").toString()));
        
        if (Boolean.TRUE.equals(usuarioActual.getFiltraserv())) {
            talleresTmp = obtenerTalleresConServiciosNoEliminadosPorAdsOrderByNameAsc(session.getAttribute("idServicioUsuario").toString());
        } else {
            talleresTmp = obtenerTalleresConServiciosNoEliminadosOrderByNameAsc();
        }

        for (Object[] tallerTmp : talleresTmp) {
            Taller taller = obtenerTallerPorId(Long.valueOf(tallerTmp[0].toString()));
            talleres.add(taller);
        }

        return talleres;
    }
	
	public Taller obtenerTallerNombre(String nombre) {
		return tallerRepository.findByNombre(nombre);
	}
}

