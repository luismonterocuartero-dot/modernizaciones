<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<div class="modal fade" id="modalServicioTaller" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog modal-xl" role="document">
    <div class="modal-content">
      <div class="modal-header">
		<h4 class="modal-title" class="close float-left" id="myModalLabel">Gesti&#243n Servicio Taller</h4>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close" onclick="resetModalServicioTaller()"><span aria-hidden="true">&times;</span></button>
      </div>
      <div class="modal-body">
	      <div id="alertaServicioOK" style="display: none;" class="alert alert-success" role="alert">
	   		<strong>La datos del servicio se han guardado correctamente.</strong>
		  </div>
		  <div id="alertaServicioKO" style="display: none;" class="alert alert-danger" role="alert">
	   		<strong>Se ha producido un error al guardar los datos del servicio.</strong>
		  </div>
		  <div id="alertaEliminarServicioOK" style="display: none;" class="alert alert-success" role="alert">
	   		<strong>El servicio se ha eliminado correctamente.</strong>
		  </div>
		  <div id="alertaEliminarServicioKO" style="display: none;" class="alert alert-danger" role="alert">
	   		<strong>Se ha producido un error al eliminar el servicio.</strong>
		  </div>
	      <form id="muestraServicioTaller" action="./crearServicio" method="POST">
	      	<input id="rolActual" name="rolActual" value="${rol}" type="hidden">
	      	<input id="idTallerServicio" name="fkTaller.id" type="hidden">
	      	<input id="idServicio" name="id" type="hidden">	
			<div class="form-row">
				<!-- Columna 1 -->
		    	<div class="col">
		    	<!-- Centro Directivo -->
					<label id="lblCentroDirectivo" class="float-left">Centro Directivo (*)</label>
					<select class="form-control" id="centroDirectivoOpt" name="fkCentroDirectivo.id" class="float-left">
					<option value="">-- Seleccione --</option>
							<c:forEach items="${centros}" var="centro">				
							<c:choose>
						  <c:when test="${centroUsuario == centro.nombre}">
						    <option value="${centro.id}" selected>${centro.nombre}</option>
						  </c:when>
						  <c:otherwise>
						    <option value="${centro.id}">${centro.nombre}</option>
						  </c:otherwise>
						</c:choose>
						</c:forEach>
					</select>	
		  			<!-- Nombre de Contacto -->
					<label id="lblNombreContacto" for="fname" class="float-left">Nombre de Contacto</label>
					<input type="text" id="contacto" name="contacto" maxlength="250" class="form-control">	
					<!-- Fecha Inicio -->
					<label id="lblFechaInicioServicio" for="inicio" class="float-left">Fecha Inicio (*)</label>
					<input type="text" id="fechaInicio" name="fechaInicio" class="form-control" maxlength="10"/>
					<!-- Numero de Expediente -->
					<label id="lblNumeroExpediente" for="lname" class="float-left">N&uacute;mero de Expediente</label>
		  			<input type="text" id="numeroExpediente" name="expediente" maxlength="50" class="form-control">	
		  			<!-- Licitacion -->
					<div class= "licitacion" style="margin-top:10% ">
					<div class="custom-control custom-switch">
					<input type="checkbox" id="licitacion" name="licitacion" class="custom-control-input">
  					<label class="custom-control-label" for="licitacion">Licitaci&oacute;n</label>
  					</div></div>
		    	</div>
		    	<!-- Columna 2 -->
		    	<div class="col">
							<!-- Servicio Adscrito -->
							<label id="lblServicioAdscrito" class="float-left">Servicio Adscrito (*)</label>
							<select class="form-control" id="servicioAdscritoOpt" name="fkServicioAdscrito.id" class="float-left">
								<option value="">-- Seleccione --</option>	
								<c:forEach items="${servicios}" var="servicio">	
								<c:choose>
								  <c:when test="${servicioUsuario == servicio.nombre}">
								    <option value="${servicio.id}" selected>${servicio.nombre}</option>
								  </c:when>
								  <c:otherwise>
								    <option value="${servicio.id}">${servicio.nombre}</option>
								  </c:otherwise>
								</c:choose>
								</c:forEach>
							</select>	
    				<!-- Telefono de Contacto -->
					<label id="lblTelefonoContacto" for="fname" class="float-left">Tel&eacute;fono de Contacto</label>
					<input type="text" id="telefono" name="telefono" maxlength="20" onkeypress="return soloNumeros(event)" class="form-control">
					<!-- Fecha Fin -->
					<label id="lblFechaFinServicio" for="fin" class="float-left">Fecha Fin</label>
					<input type="text" id="fechaFin" name="fechaFin" class="form-control" maxlength="10"/>	
					<!-- Tipos Vehiculo -->
					<label id="lblTiposVehiculo" class="float-left">Tipos veh&iacute;culos</label>
    				<select multiple size="7" class="form-control" id="tiposVehiculosOpt" name="tiposVehiculos" class="float-left">
    					<c:forEach items="${parametros}" var="parametro">
		    				<c:if test = "${parametro.tipoParametro.codigo == 'TV'}">
		         				<option value="${parametro.id}">${parametro.nombre}</option>
		      				</c:if>		
		    			</c:forEach>
    				</select>
		    	</div>
		    	<!-- Columna 3 -->
		    	<div class="col">
		    		<!-- Tipo Servicio -->
					<label id="lblServicio" class="float-left">Servicio (*)</label>
					<select class="form-control" id="fkTipoServicio" name="fkTipoServicio.id" class="float-left">
						<option value="">-- Seleccione --</option>
		    			<c:forEach items="${parametros}" var="parametro">
		    				<c:if test = "${parametro.tipoParametro.codigo == 'SV'}">
		         				<option value="${parametro.id}">${parametro.nombre}</option>
		      				</c:if>		
		    			</c:forEach>
		    		</select>
    				<!-- Email de Contacto -->
					<label id="lblEmailContacto" for="fname" class="float-left">Email de Contacto</label>
					<input type="text" id="email" name="email" maxlength="100" class="form-control">	
					<!-- Motivo Fin Servicio -->
					<label id="lblMotivofin" for="fname" class="float-left">Motivo Fin</label>
					<input type="text" id="motivoFin" name="motivoFin" maxlength="500" class="form-control">	
					<!-- Conceptos -->
					<label id="lblConceptos" class="float-left">Conceptos</label>
    				<select multiple size="2" class="form-control" id="conceptosOpt" name="conceptos" class="float-left">
    					<c:forEach items="${parametros}" var="parametro">
		    				<c:if test = "${parametro.tipoParametro.codigo == 'CO'}">
		         				<option value="${parametro.id}">${parametro.nombre}</option>
		      				</c:if>		
		    			</c:forEach>
    				</select>
		    	</div>
	     	</div>
	     	<!-- Observaciones -->
				<label for="fname" class="float-left">Observaciones</label>
				<textarea id="observacionesServicioTaller" rows="4" cols="150" wrap="soft" class="form-control" name="observaciones" maxlength="1500"></textarea>
	     </form>
	     <!-- Tabla -->
		 <table id="tablaServicio" class="table table-striped table-bordered" style="width:100%"></table>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal" onclick="resetModalServicioTaller()">Cerrar</button>
        <button id="limpiaServicioTaller" type="button" class="btn btn-primary float-right" onclick="clearModalServicioTaller()">Limpiar</button>
        <button id="guardaServicioTaller" type="button" class="btn btn-primary" onclick="crearServicioTaller()">Guardar</button>
      </div>
    </div>
  </div>
</div>