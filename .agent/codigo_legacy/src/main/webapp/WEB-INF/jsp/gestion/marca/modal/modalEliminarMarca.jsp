<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<div class="modal fade" id="modalEliminarMarca" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
		<h4 id="idModalEliminarMarca" class="modal-title" class="close float-left"></h4>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
      </div>
      <div class="modal-body">
      	<form class="float-left" id="eliminarMarca">
      		<input id="idMarcaEliminar" name="id" type="hidden">
      		<h5>¿Está seguro que desea eliminar la marca?</h5>	
      	</form>
      </div>
      <div class="modal-footer">
        <button type="button" data-dismiss="modal" class="btn btn-default">Cerrar</button>
        <button type="button" class="btn btn-danger" onclick="eliminarMarca()">Aceptar</button>
      </div>
    </div>
  </div>
</div>