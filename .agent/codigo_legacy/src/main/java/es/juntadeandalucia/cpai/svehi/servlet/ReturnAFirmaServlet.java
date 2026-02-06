package es.juntadeandalucia.cpai.svehi.servlet;

import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationDetailsSource;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.SpringBeanAutowiringSupport;
import org.springframework.web.context.support.WebApplicationContextUtils;

import es.juntadeandalucia.afirma.authentication.beans.CertificateInfo;
import es.juntadeandalucia.afirma.authentication.beans.ResultAuthenticationBean;
import es.juntadeandalucia.cpai.svehi.entity.Usuario;
import es.juntadeandalucia.cpai.svehi.service.ParametroService;
import es.juntadeandalucia.cpai.svehi.service.UsuarioService;

public class ReturnAFirmaServlet extends HttpServlet{

	private static final long serialVersionUID = 4713761410148929931L;
	private static final Logger LOGGER = Logger.getLogger(ReturnAFirmaServlet.class);
	private AuthenticationDetailsSource<HttpServletRequest, ?> authenticationDetailsSource = new WebAuthenticationDetailsSource();
	
	@Autowired
	private UsuarioService usuarioService;
	@Autowired
	private ParametroService parametroService;
	
	@Override
	public void init(ServletConfig config) throws ServletException {
		super.init(config);
	    SpringBeanAutowiringSupport.processInjectionBasedOnServletContext(this, config.getServletContext());
	  }
	
	@Override
	protected void doGet(final HttpServletRequest request, final HttpServletResponse response) {
		String urlMenu = request.getContextPath();
		String urlErrorUsuario = "/WEB-INF/jsp/errorAutentificacion.jsp";
		String urlErrorCertificado = "/WEB-INF/jsp/errorCertificado.jsp";
		String urlErrorTicket = "/WEB-INF/jsp/errorTicket.jsp";
		String nombreCD;
		Usuario usuario = null;
		ServletContext context = getServletContext();
        WebApplicationContext ctx = WebApplicationContextUtils.getWebApplicationContext(context);
		try {
			
			ResultAuthenticationBean resultado = (ResultAuthenticationBean) request.getSession().getAttribute("afirma_authentication_client_response");
			if (resultado != null && resultado.getCertificateData() != null && resultado.isValidTicket()) {
				request.getSession().invalidate();
				Map<String, String> mapaCert = new HashMap<>();
				for (CertificateInfo cerInfo : resultado.getCertificateData()) {
					mapaCert.put(cerInfo.getFieldIdentity(), cerInfo.getFieldValue());
				}
				usuario = usuarioService.obtenerUsuarioPorNIF(mapaCert.get("NIFResponsable"));
				if(usuario != null) {
					LOGGER.info("El usuario con NIF: "+ usuario.getNif() + " se ha logueado correctamente.");
					HttpSession session = request.getSession();
					nombreCD = parametroService.obtenerNombreCentroDirectivo(usuario).getNombre();
					session.setAttribute("idUsuario", usuario.getId());
					session.setAttribute("nombre", usuario.getNombre());
					session.setAttribute("apellido1", usuario.getApellido1());
					session.setAttribute("apellido2", usuario.getApellido2());
					session.setAttribute("rol",usuario.getFkPerfil().getNombre());
					// INFORMACION ACCESO USUARIO (SVEHI-236)
					// OBTENEMOS LA FECHA ACTUAL CON LA QUE SE ACCEDE
					Date fechaActual = new Date();
					// COMPROBAMOS SI ES LA PRIMERA VEZ QUE SE ACCEDE O NO PARA ACTUALIZAR LA FECHA DEL ULTIMO ACCESO
					if(usuario.getActualAcceso()==null){
						usuario.setUltimoAcceso(fechaActual);
					}else{
						usuario.setUltimoAcceso(usuario.getActualAcceso());
					}
					// ACTUALIZAMOS LA FECHA ACTUAL
					usuario.setActualAcceso(fechaActual);
					// METEMOS EN SESION EL VALOR DE LA FECHA DE ULTIMO ACCESO
					DateFormat formato = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
					String fechaActualString = formato.format(usuario.getUltimoAcceso());
					session.setAttribute("ultimoAcceso",fechaActualString);
					// APLICAMOS LOS CAMBIOS A LA TABLA DE BD
					usuarioService.guardarUsuario(usuario);
					// FIN INFORMACION ACCESO USUARIO (SVEHI-236)
					session.setAttribute("idServicioUsuario", usuario.getFkServicioAdscrito().getId());
					session.setAttribute("servicioUsuario", usuario.getFkServicioAdscrito().getNombre());
					session.setAttribute("centroUsuario", usuario.getFkServicioAdscrito().getCentroDirectivo().getNombre());
					session.setAttribute("centroUsuarioIdentificador", usuario.getFkServicioAdscrito().getCentroDirectivo().getId());
					session.setAttribute("cdResponsable", nombreCD);
					UsernamePasswordAuthenticationToken authRequest = new UsernamePasswordAuthenticationToken(usuario.getNif(), usuario.getNombre());
					authRequest.setDetails(authenticationDetailsSource.buildDetails(request));
					AuthenticationManager authenticationManager = ctx.getBean("authenticationManager", AuthenticationManager.class);
					Authentication authResult = authenticationManager.authenticate(authRequest);
					SecurityContextHolder.getContext().setAuthentication(authResult);
					response.sendRedirect(urlMenu);

				}else {
					LOGGER.info("Error de Autentificación con @firma. El Usuario no existe.");
					request.setAttribute("nif", mapaCert.get("NIFResponsable"));
					request.getRequestDispatcher(urlErrorUsuario).forward(request, response);
				}
			} else if (resultado == null) {
				LOGGER.info("Error de Autentificación con @firma. No se ha recuperado los datos del certificado.");
				request.getRequestDispatcher(urlErrorCertificado).forward(request, response);
			} else if (!resultado.isValidTicket()) {
				LOGGER.info("Error de Autentificación con @firma. Ticket inválido.");
				request.getRequestDispatcher(urlErrorTicket).forward(request, response);
			}
		} catch (ServletException | IOException e) {
			LOGGER.info("Error en la respuesta del servlet ReturnAFirmaServlet");
		}
	}
}
