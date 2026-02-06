 <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<div class="modal fade" id="modalMantenimientoDocumentoGeneral" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog modal-xl" role="document">
    <div class="modal-content">
      <div class="modal-header">
		<h4 class="modal-title" class="close float-left" id="myModalLabel">Gesti&oacute;n Mantenimiento Documento</h4>
        <button type="button" class="close " data-dismiss="modal" aria-label="Close" onclick="cerrarMantenimientoDocumentoGeneral()" ><span aria-hidden="true">&times;</span></button>
      </div>
      <div class="modal-body">
      	<div id="alertaMantenimientoDocumentoGeneralOK" style="display: none;" class="alert alert-success" role="alert">
	   		<strong>El documento se ha guardado correctamente.</strong>
		</div>
		<div id="alertaMantenimientoDocumentoGeneralKO" style="display: none;" class="alert alert-danger" role="alert">
	   		<strong>Se ha producido un error al guardar el documento.</strong>
		</div>
		<div id="alertaEliminarMantenimientoDocumentoGeneralOK" style="display: none;" class="alert alert-success" role="alert">
	   		<strong>El documento se ha eliminado correctamente.</strong>
		</div>
		<div id="alertaEliminarMantenimientoDocumentoGeneralKO" style="display: none;" class="alert alert-danger" role="alert">
	    	<strong>Se ha producido un error al eliminar el documento.</strong>
		</div>
     	<form id="nuevoMantenimientoDocumentoGeneral" action="./guardarDocumentoMantenimiento" enctype="multipart/form-data" method="POST">
     		<input id="idMantenimientoDocumentoGeneral" name="fkMantenimiento.id" type="hidden">	
			<!-- Documento -->
			<fieldset id="zonaDocMantenimiento">
				<legend class="float-left">Documentos del Mantenimiento:</legend>
				<label id="lblFicheroMantenimientoGeneral" for="fname" class="float-left">Adjunto (*)</label>	
				<input type="file" id="ficheroMantenimientoGeneral" name="ficheroMantenimientoGeneral" size="25" accept="application/pdf" class="form-control">
			</fieldset>
			<!-- Observaciones -->
			<label for="fname" class="float-left">Observaciones</label>
			<textarea id="observacionesMantenimientoDocumentoGeneral" rows="4" cols="150" wrap="soft" class="form-control" name="observaciones" maxlength="1500"></textarea>
  		</form>
  		<!-- Tabla -->
		 <table id="tablaMantenimientoDocumentoGeneral" class="table table-striped table-bordered" style="width:100%"></table>
      </div>
      <div class="modal-footer">
      		<button type="button" class="btn btn-default" data-dismiss="modal" onclick="cerrarMantenimientoDocumentoGeneral()">Cerrar</button>
			<button id="limpiaMantenimientoDocumento" type="button" class="btn btn-primary float-right" onclick="clearModalGenMantenimientoDocumento()">Limpiar</button>
			<button type="button" id="guardarMantenimientoDocumento" class="btn btn-primary" onclick="guardarDocumentoMantenimientoGeneral()">Guardar</button>
      </div>
    </div>
  </div>
</div>