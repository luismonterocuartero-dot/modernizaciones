<!doctype html>	
	<html lang="es">
		<head>
			<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
			
			<link rel="stylesheet" href="resources/css/bootstrap/bootstrap.css">
			<link rel="stylesheet" href="resources/css/bootstrap/buttons.dataTables.min.css">
			<link rel="stylesheet" href="resources/css/bootstrap/datatables.min.css">
			<!-- DATEPICKER -->
			<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
			
			<script src="resources/js/jquery-3.6.0.js"></script>
			<script src="resources/js/bootstrap.js"></script>
			<script src="resources/js/datatables.min.js"></script>
			<script src="resources/js/dataTables.buttons.min.js"></script>
			<script src="resources/js/moment.js"></script>
			<script src="resources/js/moment.min.js"></script>
			<script src="resources/js/datetime-moment.js"></script>
			<script src="https://use.fontawesome.com/releases/v5.15.1/js/all.js"></script>
			<script src="resources/js/sweetalert2@11.js"></script>
			
			<script type="text/javascript">

			function importacionCorrecta(nombrefichero) {
				Swal.fire({
					title: 'Carga completada',
					html: 'La carga del fichero '+nombrefichero+' ha finalizado correctamente.',
					icon: 'success',
					showCloseButton: true,
					showCancelButton: true,
					confirmButtonText: 'Visualizar registros importados',
					cancelButtonText: 'Cerrar'
				}).then((result) => {
					if (result.isConfirmed) {
						window.location= "/svehi/repostajeImportados";
					}
				});
			}

			function importacionIncorrecta(nombrefichero) {
				Swal.fire({
					title: 'Carga Completada',
					html: 'En la carga del fichero '+nombrefichero+' ha finalizado con errores.',
					icon: 'success',
					showCloseButton: true,
					showDenyButton: true,
					showConfirmButton: true,
					showCancelButton: true,
					confirmButtonText: 'Visualizar registros importados',
					denyButtonText: 'Ver registros erroneos',
					cancelButtonText: 'Cerrar'
				}).then((result) => {
					if(result.isConfirmed){
						window.location= "/svehi/repostajeImportados";
					}else if (result.isDenied) {
						window.location= "/svehi/repostajeError";
					}
				});
			}

			function importacionError() {
				Swal.fire({
					title: 'Carga Erronea',
					html: 'La carga del fichero no se ha podido realizar.',
					icon: 'error',
					showCloseButton: true,
					showDenyButton: false,
					showConfirmButton: false,
					showCancelButton: true,
					cancelButtonText: 'Cerrar'
				}).then((result) => {

				});
			}
		
			
			
			<!--  inicio para lanzar la modal de carga de repostaje  -->	

	$(document).ready(function() {
		 		sessionStorage.setItem('estadoCargaRepostaje','${estadoCargaRepostaje}');
		 	
		     if (sessionStorage.getItem('estadoCargaRepostaje') && sessionStorage.getItem('estadoCargaRepostaje') !== '0,0') {
		         cargarModal(sessionStorage.getItem('estadoCargaRepostaje'));
		         
		     }
		 	
	})
		function cargarModal(estadoFicheroRepostaje){
			if(sessionStorage.getItem("isModalVisible")=='false'){
				var estado = estadoFicheroRepostaje.split(",")[0];
				var fichero = estadoFicheroRepostaje.split(",")[1];
				switch (estado) {
				case "1":
					importacionCorrecta(fichero);
					break;
				case "2":
					importacionIncorrecta(fichero);
					break;
				case "3":
					importacionError();
					break;
				default:
					break;
				}
				sessionStorage.setItem("isModalVisible",true);
				sessionStorage.setItem('estadoCargaRepostaje', '0,0');
				<%session.setAttribute("estadoCargaRepostaje","0,0");%>
			}
		}
	
	</script>
<!-- Fin de la modal -->
			
			<style>/* Flecha > para submen� de Repostaje */
				.dropdown-menu .dropdown-toggle::after {
					vertical-align: middle;
					border-left: 0.3em solid;
					border-right: 0;
					border-top: 0.3em solid transparent;
					border-bottom: 0.3em solid transparent;
					margin-left: 0.5rem;
				} /* Mostrar hover Repostaje */
				@media ( min-width : 992px) {
					.dropdown-menu .dropright:hover>.dropdown-menu {
						display: block;
						top: 0;
						left: 100%;
						margin-top: -7px;
					}
				}
			</style>
			
			<!-- DATEPICKER -->
			<script src="resources/js/jquery-ui.js"></script>
			
			<title>Gesti&oacute;n de Veh&iacute;culos</title>
		</head>
		<body class="text-center">
        <header>
            <nav aria-label="Parque Movil" class="navbar navbar-expand-sm bg-light">
                <a class="navbar-brand" href="#">
                    <img src="resources/img/logo.png" class="rounded float-left" width="200" height="120" alt="logo">
                </a>
                <h1 id="labelTitulo">&nbsp;&nbsp;PARQUE M&Oacute;VIL ${cdResponsable}</h1>
            </nav>        
        </header>
<nav aria-label="Menu" class="navbar navbar-dark bg-dark navbar-expand-lg">
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
	<div class="collapse navbar-collapse" id="navbarResponsive">
	     <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
	    	<li class="nav-item">
	        	<a class="nav-link nav-item" href="menu">Inicio <span class="sr-only">(current)</span></a>
	        </li>
	        <li class="nav-item">
	            <a id="gestion" class="nav-link dropdown-toggle" href="#" data-toggle="dropdown">Gesti&oacute;n</a>
	            <div class="dropdown-menu" aria-labelledby="gestion">
          			<a class="dropdown-item" href="companias">Compa&ntilde;&iacute;as de seguro</a>
          			<a class="dropdown-item" href="conceptos">Conceptos</a>
          			<a class="dropdown-item" href="marcas">Marcas de veh&iacute;culos</a>
          			<a class="dropdown-item" href="modelos">Modelos de veh&iacute;culos</a>
          			<a class="dropdown-item" href="operadoras">Operadoras</a>
          			<a class="dropdown-item" href="parametros">Par&aacute;metros</a>
          			<a class="dropdown-item" href="perfiles">Perfiles de usuarios</a>
					<a class="dropdown-item" href="permisos">Permisos</a>
          			<a class="dropdown-item" href="usuarios">Usuarios</a>
          			
          			<div class="dropright">
						<a class="dropdown-item dropdown-toggle" href="#">Repostaje</a>
						<div class="dropdown-menu">
							<a class="dropdown-item" href="repostajeCargar">Cargar Repostaje</a>
							<a class="dropdown-item" href="repostajeImportados">Repostajes Importados</a>
							<a class="dropdown-item" href="repostajeHistoricosImportados">Hist&oacute;rico Importados</a>
							<a class="dropdown-item" href="repostajeError">Errores Repostajes</a>
						</div>
					</div>
					
				</div>
	        </li>
			<li class="nav-item">
	            <a class="nav-link nav-item" href="talleres">Talleres</a>
	        </li>
	        <li class="nav-item">
	       		<a class="nav-link nav-item" href="vehiculos">Veh&iacute;culos</a>
	      	</li>
	    </ul>
	    <form class="form-inline my-2 my-lg-0">
      		<div class="tooltip-container">
        		<span class="tooltip-text">&Uacute;ltimo Acceso: ${ultimoAcceso}</span>
        		<i class="fa fa-user mr-sm-2 tooltip-icon"></i>
      		</div>
      		<label class="text-white bg-dark mr-sm-2">${apellido1} ${apellido2}, ${nombre} - ${rol}</label>
      		<button class="text-white fa fa-power-off my-2 my-sm-0" onclick="location='logout'" type="submit"></button>
    	</form>
	</div>  
</nav>
<!-- MENSAJE A IMPRIMIR DE SUCCESS Y ERROR QUE NO SE MUESTRA PERO NECESARIO PARA RECOJER EL DATO -->
<input type="hidden" id="msjSuccessGeneral" name="msjSuccessGeneral" value="${successGeneral}" />
<input type="hidden" id="msjErrorGeneral" name="msjErrorGeneral" value="${errorGeneral}" />
<!-- INICIO MODAL GENERAL -->
<div id="alertaEliminarVehiculoGeneralOK" style="display: none;" class="alert alert-success" role="alert">
   <strong>El veh&#237;culo se ha eliminado correctamente.</strong>
</div>
<div id="alertaEliminarVehiculoGeneralKO" style="display: none;" class="alert alert-danger" role="alert">
   <strong>Se ha producido un error al eliminar el veh&#237;culo.</strong>
</div>
<!-- FIN MODAL GENERAL -->
<div id="alertaVehiculoOK" style="display: none;" class="alert alert-success" role="alert">
   <strong>Los datos del veh&#237;culo se han guardado correctamente.</strong>
</div>
<div id="alertaVehiculoKO" style="display: none;" class="alert alert-danger" role="alert">
   <strong>Se ha producido un error al guardar los datos del veh&#237;culo.</strong>
</div>
<div id="alertaTallerOK" style="display: none;" class="alert alert-success" role="alert">
   <strong>Los datos del taller se han guardado correctamente.</strong>
</div>
<div id="alertaTallerKO" style="display: none;" class="alert alert-danger" role="alert">
   <strong>Se ha producido un error al guardar los datos del taller.</strong>
</div>
<div id="alertaEliminarTallerOK" style="display: none;" class="alert alert-success" role="alert">
   <strong>El taller se ha eliminado correctamente.</strong>
</div>
<div id="alertaEliminarTallerKO" style="display: none;" class="alert alert-danger" role="alert">
   <strong>Se ha producido un error al eliminar el taller.</strong>
</div>
<div id="alertaMarcaOK" style="display: none;" class="alert alert-success" role="alert">
	<strong>La datos de la marca se han guardado correctamente.</strong>
</div>
<div id="alertaMarcaKO" style="display: none;" class="alert alert-danger" role="alert">
	<strong>Se ha producido un error al guardar los datos de la marca.</strong>
</div>
<div id="alertaEliminarMarcaOK" style="display: none;" class="alert alert-success" role="alert">
   <strong>La marca se ha eliminado correctamente.</strong>
</div>
<div id="alertaEliminarMarcaKO" style="display: none;" class="alert alert-danger" role="alert">
   <strong>Se ha producido un error al eliminar la marca.</strong>
</div>
<div id="alertaCompaniaOK" style="display: none;" class="alert alert-success" role="alert">
	<strong>La datos de la compa&ntilde;&iacute;a de seguro se han guardado correctamente.</strong>
</div>
<div id="alertaCompaniaKO" style="display: none;" class="alert alert-danger" role="alert">
	<strong>Se ha producido un error al guardar los datos de la compa&ntilde;&iacute;a de seguro.</strong>
</div>
<div id="alertaEliminarCompaniaOK" style="display: none;" class="alert alert-success" role="alert">
   <strong>La compa&ntilde;&iacute;a de seguro se ha eliminado correctamente.</strong>
</div>
<div id="alertaEliminarCompaniaKO" style="display: none;" class="alert alert-danger" role="alert">
   <strong>Se ha producido un error al eliminar la compa&ntilde;&iacute;a de seguro.</strong>
</div>
<div id="alertaOperadoraOK" style="display: none;" class="alert alert-success" role="alert">
	<strong>La datos de la operadora se han guardado correctamente.</strong>
</div>
<div id="alertaOperadoraKO" style="display: none;" class="alert alert-danger" role="alert">
	<strong>Se ha producido un error al guardar los datos de la operadora.</strong>
</div>
<div id="alertaEliminarOperadoraOK" style="display: none;" class="alert alert-success" role="alert">
   <strong>La operadora se ha eliminado correctamente.</strong>
</div>
<div id="alertaEliminarOperadoraKO" style="display: none;" class="alert alert-danger" role="alert">
   <strong>Se ha producido un error al eliminar la operadora.</strong>
</div>
<div id="alertaModeloOK" style="display: none;" class="alert alert-success" role="alert">
   <strong>Los datos del modelo se han guardado correctamente.</strong>
</div>
<div id="alertaModeloKO" style="display: none;" class="alert alert-danger" role="alert">
   <strong>Se ha producido un error al guardar los datos del modelo.</strong>
</div>
<div id="alertaEliminarModeloOK" style="display: none;" class="alert alert-success" role="alert">
   <strong>El modelo se ha eliminado correctamente.</strong>
</div>
<div id="alertaEliminarModeloKO" style="display: none;" class="alert alert-danger" role="alert">
   <strong>Se ha producido un error al eliminar el modelo.</strong>
</div>
<div id="alertaUsuarioOK" style="display: none;" class="alert alert-success" role="alert">
   <strong>Los datos del usuario se han guardado correctamente.</strong>
</div>
<div id="alertaUsuarioKO" style="display: none;" class="alert alert-danger" role="alert">
   <strong>Se ha producido un error al guardar los datos del usuario.</strong>
</div>
<div id="alertaEliminarUsuarioOK" style="display: none;" class="alert alert-success" role="alert">
   <strong>El usuario se ha eliminado correctamente.</strong>
</div>
<div id="alertaEliminarUsuarioKO" style="display: none;" class="alert alert-danger" role="alert">
   <strong>Se ha producido un error al eliminar el usuario.</strong>
</div>
<div id="alertaPermisoOK" style="display: none;" class="alert alert-success" role="alert">
   <strong>Los datos del permiso se han guardado correctamente.</strong>
</div>
<div id="alertaPermisoKO" style="display: none;" class="alert alert-danger" role="alert">
   <strong>Se ha producido un error al guardar los datos del permiso.</strong>
</div>
<div id="alertaEliminarPermisoOK" style="display: none;" class="alert alert-success" role="alert">
   <strong>El permiso se ha eliminado correctamente.</strong>
</div>
<div id="alertaEliminarPermisoKO" style="display: none;" class="alert alert-danger" role="alert">
   <strong>Se ha producido un error al eliminar el permiso.</strong>
</div>
<div id="alertaPerfilOK" style="display: none;" class="alert alert-success" role="alert">
   <strong>Los datos del perfil de usuario se han guardado correctamente.</strong>
</div>
<div id="alertaPerfilKO" style="display: none;" class="alert alert-danger" role="alert">
   <strong>Se ha producido un error al guardar los datos del perfil de usuario.</strong>
</div>
<div id="alertaEliminarPerfilOK" style="display: none;" class="alert alert-success" role="alert">
   <strong>El perfil de usuario se ha eliminado correctamente.</strong>
</div>
<div id="alertaEliminarPerfilKO" style="display: none;" class="alert alert-danger" role="alert">
   <strong>Se ha producido un error al eliminar el perfil de usuario.</strong>
</div>
<div id="alertaParametroOK" style="display: none;" class="alert alert-success" role="alert">
   <strong>Los datos del par&aacute;metro se han guardado correctamente.</strong>
</div>
<div id="alertaParametroKO" style="display: none;" class="alert alert-danger" role="alert">
   <strong>Se ha producido un error al guardar los datos del par&aacute;metro.</strong>
</div>
<div id="alertaEliminarParametroOK" style="display: none;" class="alert alert-success" role="alert">
   <strong>El par&aacute;metro se ha eliminado correctamente.</strong>
</div>
<div id="alertaEliminarParametroKO" style="display: none;" class="alert alert-danger" role="alert">
   <strong>Se ha producido un error al eliminar el par&aacute;metro.</strong>
</div>
<div id="alertaConceptoOK" style="display: none;" class="alert alert-success" role="alert">
	<strong>La datos del concepto se han guardado correctamente.</strong>
</div>
<div id="alertaConceptoKO" style="display: none;" class="alert alert-danger" role="alert">
	<strong>Se ha producido un error al guardar los datos del concepto.</strong>
</div>
<div id="alertaEliminarConceptoOK" style="display: none;" class="alert alert-success" role="alert">
   <strong>El concepto se ha eliminado correctamente.</strong>
</div>
<div id="alertaEliminarConceptoKO" style="display: none;" class="alert alert-danger" role="alert">
   <strong>Se ha producido un error al eliminar el concepto.</strong>
</div>
            <c:choose>
                <c:when test="${irVehiculo}">
                    <jsp:include page="vehiculo/vehiculos.jsp"/>
                </c:when>
                <c:when test="${irCentroDirectivo}">
                    <%-- <jsp:include page="centroDirectivo/centrosDirectivos.jsp"/> --%>
                </c:when>
                <c:when test="${irServicioAdscrito}">
                    <%-- <jsp:include page="servicioAdscrito/serviciosAdscritos.jsp"/> --%>
                </c:when>
                <c:when test="${irParametro}">
                    <jsp:include page="gestion/parametro/parametros.jsp"/>
                </c:when>
                <c:when test="${irTipoParametro}">
                    <%-- <jsp:include page="tipoParametro/tiposParametros.jsp"/> --%>
                </c:when>
                <c:when test="${irModelo}">
                    <jsp:include page="gestion/modelo/modelos.jsp"/>
                </c:when>                   
                <c:when test="${irMarca}">
                    <jsp:include page="gestion/marca/marcas.jsp"/>
                </c:when>
                <c:when test="${irTaller}">
                    <jsp:include page="taller/talleres.jsp"/>
                </c:when>
                <c:when test="${irPerfil}">
                    <jsp:include page="gestion/perfil/perfiles.jsp"/>
                </c:when>
                <c:when test="${irUsuario}">
                    <jsp:include page="gestion/usuario/usuarios.jsp"/>
                </c:when>
                <c:when test="${irPermiso}">
                    <jsp:include page="gestion/permiso/permisos.jsp"/>
                </c:when>
                <c:when test="${irCompania}">
                    <jsp:include page="gestion/compania/companias.jsp"/>
                </c:when>
                <c:when test="${irConcepto}">
                    <jsp:include page="gestion/concepto/conceptos.jsp"/>
                </c:when>
               <c:when test="${irsyncroDoc}">
                    <jsp:include page="syncroDoc.jsp"/>
	       </c:when>
                <c:when test="${irOperadora}">
                    <jsp:include page="gestion/operadora/operadoras.jsp"/>
                </c:when>
                <c:when test="${irRepostajeCargar}">
                    <jsp:include page="gestion/repostaje/repostaje.jsp"/>
                </c:when>
                 <c:when test="${irRepostajeError}">
                    <jsp:include page="gestion/repostaje/respostajeerror.jsp"/>
                </c:when>
                 <c:when test="${irRepostajeImportados}">
                    <jsp:include page="gestion/repostaje/respostajeimportados.jsp"/>
                </c:when>
                <c:when test="${irRepostajeHistoricoImportados}">
                    <jsp:include page="gestion/repostaje/respostajehistoricoimportados.jsp"/>
                </c:when>
                <c:otherwise>
                	<jsp:include page="bienvenida.jsp"/>
                </c:otherwise>           
            </c:choose>
        </body>
        <jsp:include page="footer.jsp"/>
	</html>