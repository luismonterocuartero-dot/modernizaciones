<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<div class="modal fade" data-backdrop="static" id="modalMarca" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog modal-xl" role="document">
    <div class="modal-content">
      <div class="modal-header">
		<h4 id="cabecera" class="modal-title" class="close float-left" id="myModalLabel">Nueva Marca</h4>
        <button type="button" class="close " data-dismiss="modal" aria-label="Close" onclick="resetModal()" ><span aria-hidden="true">&times;</span></button>
      </div>
      <div class="modal-body">
     	<form id="nuevaMarca" action="./crearMarca" method="POST">
     		<input id="idMarca" name="id" type="hidden">
     		<input id="permisoActual" name="permisoActual" value="${permisoActual}" type="hidden">
			<div class="form-row">
				<!-- Columna 1 -->
				<div class="col">
					<!-- Marca -->
					<label for="fname" id="nombreLabel" class="float-left">Nombre (*)</label>
		  			<input type="text" id="nombre" name="nombre" maxlength="150" class="form-control">
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
        <button type="button" id="guardarMarca" class="btn btn-primary" onclick="crearMarca()">Guardar</button>
      </div>
    </div>
  </div>
</div>