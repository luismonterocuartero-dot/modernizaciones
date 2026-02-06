<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<div class="modal fade" id="modalEliminarMantenimientoConceptoGeneral" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
		<h4 id="idModalEliminarMantenimientoConceptoGeneral" class="modal-title" class="close float-left"></h4>
        <button type="button" class="close" onclick="cerrarEliminarMantenimientoConceptoGeneral()" aria-label="Close"><span aria-hidden="true">&times;</span></button>
      </div>
      <div class="modal-body">
      	<form class="float-left" id="eliminarMantenimientoConceptoGeneral">
      		<input id="idMantenimientoConceptoEliminarGeneral" name="id" type="hidden">
      		<h5>&iquest;Est&aacute; seguro que desea eliminar el Concepto?</h5>	
      	</form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" onclick="cerrarEliminarMantenimientoConcepto()">Cerrar</button>
        <button type="button" class="btn btn-danger" onclick="eliminarMantenimientoConcepto()">Aceptar</button>
      </div>
    </div>
  </div>
</div>