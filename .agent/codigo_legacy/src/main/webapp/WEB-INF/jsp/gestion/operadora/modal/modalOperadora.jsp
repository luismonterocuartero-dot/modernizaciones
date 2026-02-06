<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<div class="modal fade" data-backdrop="static" id="modalOperadora" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog modal-xl" role="document">
    <div class="modal-content">
      <div class="modal-header">
		<h4 id="cabecera" class="modal-title" class="close float-left" id="myModalLabel">Nueva Operadora</h4>
        <button type="button" class="close " data-dismiss="modal" aria-label="Close" onclick="resetModal()" ><span aria-hidden="true">&times;</span></button>
      </div>
      <div class="modal-body">
     	<form id="nuevaOperadora" action="./crearOperadora" method="POST">
     		<input id="idOperadora" name="id" type="hidden">
     		<input id="permisoActual" name="permisoActual" value="${permisoActual}" type="hidden">
			<div class="form-row">
				<!-- Fila 1 -->
				<div class="form-group col-md-4">
					<!-- Nombre -->
					<label id="labelNombre" for="fname" class="float-left">Nombre (*)</label>
					<input type="text" id="nombre" name="nombre" class="form-control" maxlength="150">
				</div>
				<div class="form-group col-md-4">
					<!-- Contacto -->
					<label id="lblContacto" for="fname" class="float-left">Contacto</label>
					<input type="text" id="contacto" name="contacto" class="form-control" maxlength="150">
				</div>		
				<!-- Fila 2 -->
				<div class="form-group col-md-4">
					<!-- Telefono -->
					<label for="fname" class="float-left">Tel&eacute;fono</label>
					<input type="text" id="telefono" name="telefono" onkeypress="return soloNumeros(event)" class="form-control" maxlength="50">
				</div>
				<div class="form-group col-md-8">
					<!-- Direccion -->
					<label for="fname" class="float-left">Direcci&oacute;n</label>
					<input type="text" id="direccion" name="direccion" class="form-control" maxlength="500">
				</div>
			</div>
			<div class="form-row">
				<!-- Activo -->
				<div class="custom-control custom-switch">
					<input type="checkbox" id="activo" name="activo" checked="checked" value="true" class="custom-control-input">
  					<label class="custom-control-label" for="activo">Activo</label>
				</div>
			</div>
  		</form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal" onclick="resetModal()">Cerrar</button>
        <button type="button" id="guardarOperadora" class="btn btn-primary" onclick="crearOperadora()">Guardar</button>
      </div>
    </div>
  </div>
</div>