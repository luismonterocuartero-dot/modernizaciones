<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<div class="modal fade" data-backdrop="static" id="modalPermiso" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog modal-xl" role="document">
    <div class="modal-content">
      <div class="modal-header">
		<h4 id="cabecera" class="modal-title" class="close float-left" id="myModalLabel">Nuevo Permiso</h4>
        <button type="button" class="close " data-dismiss="modal" aria-label="Close" onclick="resetModal()" ><span aria-hidden="true">&times;</span></button>
      </div>
      <div class="modal-body">
     	<form id="nuevoPermiso" action="./crearPermiso" method="POST">
     		<input id="permisoActual" name="permisoActual" value="${permisoActual}" type="hidden">
     		<input id="idPermiso" name="id" value="" type="hidden">
     		<div class="form-row">
			</div>
			<div class="form-row">
				<!-- Edicion -->
				<div class="custom-control custom-switch">
  					<input type="checkbox" id="edicion" name="edicion" class="custom-control-input">
  					<label id="edicionLabel" class="custom-control-label" for="edicion">Visualizacion y Edicion</label>
				</div>
			</div>
			<div class="form-row">
				<!-- Visualizacion -->
				<div class="custom-control custom-switch">
  					<input type="checkbox" id="visualizacion" name="visualizacion" checked="checked" class="custom-control-input">
  					<label  id="visualizacionLabel" class="custom-control-label" for="visualizacion">Solo Visualizacion</label>
				</div>
			</div>
			<div class="form-row">
				<!-- Columna 1 -->
				<div class="col">
					<!-- Nombre -->
					<label for="fname" id="nombreLabel" class="float-left">Nombre (*)</label>
		  			<input type="text" id="nombre" name="nombre" class="form-control">
				</div>
				<!-- Columna 2 -->
				<div class="col">
					<!-- Objeto -->
					<label id="etiquetaObjeto" class="float-left">Objeto (*)</label>
					<select class="form-control" id="selectorObjeto" name="fkParametroObjeto.id" class="float-left">
				        <option value="">-- Seleccione --</option>
    					<c:forEach items="${objetos}" var="objeto" >
		         				<option value="${objeto.id}">${objeto.nombre}</option>	
		    			</c:forEach>
    				</select>				
				</div>
			</div>
  		</form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal" onclick="resetModal()">Cerrar</button>
        <button type="button" id="guardarPermiso" class="btn btn-primary" onclick="crearPermiso()">Guardar</button>
      </div>
    </div>
  </div>
</div>