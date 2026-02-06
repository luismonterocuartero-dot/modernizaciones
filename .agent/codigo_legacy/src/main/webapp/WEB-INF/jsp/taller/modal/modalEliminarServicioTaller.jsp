<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<div class="modal fade" id="modalEliminarServicioTaller" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
		<h4 id="idModalEliminarServicioTaller" class="modal-title" class="close float-left"></h4>
        <button type="button" class="close" onclick="cerrarEliminarServicioTaller()" aria-label="Close"><span aria-hidden="true">&times;</span></button>
      </div>
      <div class="modal-body">
      	<form class="float-left" id="eliminarServicioTaller">
      		<input id="idServicioEliminar" name="id" type="hidden">
      		<input id="idTallerServicioEliminar" name="fkTaller.id" type="hidden">
			<input id="idServicioAdscritoEliminar" name="fkServicioAdscrito.id" type="hidden">
			<input id="idCentroDirectivoEliminar" name="fkCentroDirectivo.id" type="hidden">
			<input id="idTipoServicioEliminar" name="fkTipoServicio.id" type="hidden">
			<input id="fechaInicioEliminar" name="fechaInicio" type="hidden">
			<input id="licitacionEliminar" name="licitacion" type="hidden">
      		<h5>¿Está seguro que desea eliminar el Servicio de Taller?</h5>	
      	</form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" onclick="cerrarEliminarServicioTaller()">Cerrar</button>
        <button type="button" class="btn btn-danger" onclick="eliminarServicioTaller()">Aceptar</button>
      </div>
    </div>
  </div>
</div>