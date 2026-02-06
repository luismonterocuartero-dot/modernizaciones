<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<div class="modal fade" id="modalEliminarSiniestroGeneral" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
		<h4 id="idModalEliminarSiniestroGeneral" class="modal-title" class="close float-left"></h4>
        <button type="button" class="close" onclick="cerrarEliminarSiniestroGeneral()" aria-label="Close"><span aria-hidden="true">&times;</span></button>
      </div>
      <div class="modal-body">
      	<form class="float-left" id="eliminarSiniestroGeneral">
      		<input id="idSiniestroEliminarGeneral" name="id" type="hidden">
      		<h5>&iquest;Est&aacute; seguro que desea eliminar el siniestro?</h5>	
      	</form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" onclick="cerrarEliminarSiniestroGeneral()">Cerrar</button>
        <button type="button" class="btn btn-danger" onclick="eliminarSiniestroGeneral()">Aceptar</button>
      </div>
    </div>
  </div>
</div>