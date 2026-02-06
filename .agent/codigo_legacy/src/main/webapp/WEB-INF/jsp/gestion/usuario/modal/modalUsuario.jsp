<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<div class="modal fade" data-backdrop="static" id="modalUsuario" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog modal-xl" role="document">
    <div class="modal-content">
      <div class="modal-header">
		<h4 id="cabecera" class="modal-title" class="close float-left" id="myModalLabel">Nuevo Usuario</h4>
        <button type="button" class="close " data-dismiss="modal" aria-label="Close" onclick="resetModal()" ><span aria-hidden="true">&times;</span></button>
      </div>
      <div class="modal-body">
     	<form id="nuevoUsuario" action="./crearUsuario" method="POST">
     		<input id="idUsuario" name="id" type="hidden">
     		<input id="permisoActual" name="permisoActual" value="${permisoActual}" type="hidden">
			<input id="idSesionActual" name="idSesionActual" value="${idSesionActual}" type="hidden">
     		<div class="form-row">
				<!-- Activo -->
				<div class="custom-control custom-switch">
  					<input type="checkbox" id="activo" name="activo" checked="checked" value="true" class="custom-control-input">
  					<label class="custom-control-label" for="activo">Activo</label>
				</div>
			</div>
			<div class="form-row">
				<!-- Filtra Provincia-->
				<div class="custom-control custom-switch">
					<input type="checkbox" id="filtraserv" name="filtraserv" checked="checked" value="true" class="custom-control-input">
					<label class="custom-control-label" for="filtraserv">Filtra Provincia</label>
				</div>
			</div>
			<div class="form-row">
				<!-- Check Mantenimiento Finalizado-->
				<div class="custom-control custom-switch">
					<input type="checkbox" id="checkFinalizado" name="checkFinalizado" value="true" class="custom-control-input">
					<label class="custom-control-label" for="checkFinalizado">Check Finalizado</label>
				</div>
			</div>
			<div class="form-row">
				<!-- Columna 1 -->
				<div class="col">
					<!-- Nombre -->
					<label for="fname" id="nombreLabel" class="float-left">Nombre (*)</label>
		  			<input type="text" id="nombre" name="nombre" maxlength="50" onkeypress="return soloLetras(event)" class="form-control">
		  			<!-- DNI/NIF/CIF -->
					<label for="fname" id="dniLabel" class="float-left">DNI/NIF/CIF (*)</label>
		  			<input type="text" id="nif" name="nif" maxlength="10" class="form-control">
				</div>
				<!-- Columna 2 -->
				<div class="col">
					<!-- 1� Apellido -->
					<label for="fname" id="apellido1Label" class="float-left">Apellido 1 (*)</label>
		  			<input type="text" id="apellido1" name="apellido1" maxlength="100" onkeypress="return soloLetras(event)" class="form-control">
		  			<!-- Perfil -->
					<label id="etiquetaPerfil" class="float-left">Perfil (*) </label>
		    		<select class="form-control" id="selectorPerfil" name="fkPerfil.id" class="float-left"  required>
		    			<option value="">-- Seleccione --</option>
		    			<c:forEach items="${perfiles}" var="perfil">
		        			<option value="${perfil.id}">${perfil.nombre}</option>
		    			</c:forEach>
		    		</select>
				</div>
				<!-- Columna 3 -->
				<div class="col">
					<!-- 2� Apellido -->
					<label for="fname" id="apellido2Label" class="float-left">Apellido 2 (*)</label>
		  			<input type="text" id="apellido2" name="apellido2" maxlength="100" onkeypress="return soloLetras(event)" class="form-control">
		  			<!-- ServicioAdscrito -->
					<label id="etiquetaServicioAdscrito" class="float-left">Servicio Adscrito (*) </label>
		    		<select class="form-control" id="selectorServicioAdscrito" name="fkServicioAdscrito.id" class="float-left"  required>
		    			<option value="">-- Seleccione --</option>
		    			<c:forEach items="${servicios}" var="servicio">
		        			<option value="${servicio.id}">${servicio.nombre}</option>
		    			</c:forEach>
		    		</select>
				</div>
			</div>
  		</form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal" onclick="resetModal()">Cerrar</button>
        <button type="button" id="guardarUsuario" class="btn btn-primary" onclick="modalAvisoEdicionUsuario()">Guardar</button>
      </div>
    </div>
  </div>
</div>