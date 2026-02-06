<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<div class="modal fade" id="modalEditarPerfil" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog modal-xs" role="document">
    <div class="modal-content">
      <div class="modal-header">
		<h4 class="modal-title" class="close float-left" id="cabecera">Nuevo Perfil</h4>
        <button type="button" class="close " data-dismiss="modal" aria-label="Close" onclick="resetModal()"><span aria-hidden="true">&times; </span></button>
      </div>
      <div class="modal-body">
     	<form id="nuevoPerfil" action=""  method="POST">
     	<input id="permisoActual" name="permisoActual" value="${permisoActual}" type="hidden">
		<div class="form-row">
		<!-- Fila 1 -->
		<div class="form-group col-md-12">
		    <!-- Nombre -->
			<label id="labelNombre" for="fname" class="float-left">Nombre (*)</label>
  			<input type="text" id="nombre" name="nombre" maxlength="50" onkeypress="return soloLetras(event)" class="form-control" maxlength="250">
  			</div>
  		</div>
  		<div class="form-row">
  			<!-- Activo-->
			<div class="custom-control custom-switch">
  				<input type="checkbox" id="activo" name="activo" checked="checked" value="true" class="custom-control-input">
  				<label class="custom-control-label" for="activo">Activo</label>
			</div>
		</div>
		<div class="form-row">
			<!-- Perfil por defecto-->
			<div class="custom-control custom-switch">
  				<input type="checkbox" id="defecto" name="defecto" class="custom-control-input">
  				<label class="custom-control-label" for="defecto">Perfil por defecto</label>
			</div>
		</div>
		<input type="hidden" id="idPerfilActualiza" name="id" class="form-control"> 		
  		</form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal" onclick="resetModal()">Cerrar</button>
        <button type="button" id="guardarPerfil" class="btn btn-primary" onclick="crearPerfil()">Guardar</button>
      </div>
    </div>
  </div>
</div>