<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<div class="modal fade" data-backdrop="static" id="modalParametro" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog modal-xl" role="document">
    <div class="modal-content">
      <div class="modal-header">
		<h4 id="cabecera" class="modal-title" class="close float-left" id="myModalLabel">Nuevo Parametro</h4>
        <button type="button" class="close " data-dismiss="modal" aria-label="Close" onclick="resetModal()" ><span aria-hidden="true">&times;</span></button>
      </div>
      <div class="modal-body">
     	<form id="nuevoParametro" action="./crearParametro" method="POST">
     		<input id="idParametro" name="id" type="hidden">
     		<input id="permisoActual" name="permisoActual" value="${permisoActual}" type="hidden">
			<div class="form-row">
				<!-- Columna 1 -->
				<div class="col">
					<!-- Nombre -->
					<label for="fname" id="Lblnombre" class="float-left">Nombre (*)</label>
		  			<input type="text" id="nombre" name="nombre" class="form-control" maxlength="150">	
					<!-- CentroDirectivo -->
					<label  id="LblCentroDirectivo" class="float-left">Centro Directivo</label>		
				    <select class="form-control" id="selectorCentroDirectivo" name="centroDirectivo.id" class="float-left">
				        <option value="">-- Seleccione --</option>
    					<c:forEach items="${centrosDirectivos}" var="centroDirectivo" >
		         				<option value="${centroDirectivo.id}">${centroDirectivo.nombre}</option>	
		    			</c:forEach>
    				</select>
				</div>
				<div class="col">
					<!-- TipoParametro -->
					<label for="fname" id="LblTipoParametro" class="float-left">Tipo Parametro (*)</label>
					<select class="form-control" id="selectorTipoParametro" name="tipoParametro.id" class="float-left" required>
						<option value="">-- Seleccione --</option>
						<!-- IIM SVEHI-391 -->
						<option value="temp"></option>
						<!-- IIM SVEHI-391 -->
						<c:forEach items="${tiposParametros}" var="tipoParametro">
							<option value="${tipoParametro.id}">${tipoParametro.nombre}</option>
						</c:forEach>
					</select>
		  			<!-- LiteralExtra -->
					<label for="fname" id="LblLiteralExtra" class="float-left">Informaci&oacute;n Extra</label>
		  			<input type="text" id="literalExtra" name="literalExtra" class="form-control" maxlength="150">
				</div>
			</div>
			<div class="form-row">
				<!-- Activo -->
				<div class="custom-control custom-switch">
					<input type="checkbox" id="activo" name="activo" checked="checked" value="true" class="custom-control-input">
  					<label class="custom-control-label" for="activo">Activo</label>
				</div>
			</div>
			<div class="form-row">
				<!-- Datos Extras -->
				<div class="custom-control custom-switch">
					<input type="checkbox" id="datosExtra" name="datosExtra" checked="checked" value="true" class="custom-control-input">
  					<label class="custom-control-label" for="datosExtra">Datos extra</label>
				</div>
			</div>
  		</form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal" onclick="resetModal()">Cerrar</button>
        <button type="button" id="guardarParametro" class="btn btn-primary" onclick="crearParametro()">Guardar</button>
      </div>
    </div>
  </div>
</div>