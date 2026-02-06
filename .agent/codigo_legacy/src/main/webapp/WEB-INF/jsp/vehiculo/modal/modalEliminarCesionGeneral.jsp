<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<div class="modal fade" id="modalEliminarCesionGeneral" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
		<h4 id="idModalEliminarCesionGeneral" class="modal-title" class="close float-left"></h4>
        <button type="button" class="close" onclick="cerrarEliminarCesionGeneral()" aria-label="Close"><span aria-hidden="true">&times;</span></button>
      </div>
      <div class="modal-body">
      	<form class="float-left" id="eliminarCesionGeneral">
      		<input id="idCesionEliminarGeneral" name="id" type="hidden">
      		<input id="idVehiculoCesionGeneralEliminar" name="fkVehiculo.id" type="hidden">
      		<input id="idMotivoEliminarCesionGeneral" name="fkParametroTipoMotivo.id" type="hidden">
      		<input id="idDestinoEliminarCesionGeneral" name="fkParametroTipoDestino.id" type="hidden">
		<input id="idServicioEliminarCesionGeneral" name="fkServicioAdscrito.id" type="hidden">
      		<h5>&iquest;Est&aacute; seguro que desea eliminar la cesion?</h5>	
      	</form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" onclick="cerrarEliminarCesionGeneral()">Cerrar</button>
        <button type="button" class="btn btn-danger" onclick="eliminarCesionGeneral()">Aceptar</button>
      </div>
    </div>
  </div>
</div>