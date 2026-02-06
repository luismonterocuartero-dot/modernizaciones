<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<div class="modal fade" id="modalEliminarEquipamientoGeneral" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
		<h4 id="idModalEliminarEquipamientoGeneral" class="modal-title" class="close float-left"></h4>
        <button type="button" class="close" onclick="cerrarEliminarEquipamientoGeneral()" aria-label="Close"><span aria-hidden="true">&times;</span></button>
      </div>
      <div class="modal-body">
      	<form class="float-left" id="eliminarEquipamientoGeneral">
      		<input id="idEquipamientoEliminarGeneral" name="id" type="hidden">
      		<h5>&iquest;Est&aacute; seguro que desea eliminar el equipamiento?</h5>	
      	</form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" onclick="cerrarEliminarEquipamientoGeneral()">Cerrar</button>
        <button type="button" class="btn btn-danger" onclick="eliminarEquipamientoGeneral()">Aceptar</button>
      </div>
    </div>
  </div>
</div>