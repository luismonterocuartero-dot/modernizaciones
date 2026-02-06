 <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<div class="modal fade" id="modalSiniestroDocumentoGeneral" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog modal-xl" role="document">
    <div class="modal-content">
      <div class="modal-header">
		<h4 class="modal-title" class="close float-left" id="myModalLabel">Gesti&oacute;n Siniestro Documento</h4>
        <button type="button" class="close " data-dismiss="modal" aria-label="Close" onclick="cerrarSiniestroDocumentoGeneral()" ><span aria-hidden="true">&times;</span></button>
      </div>
      <div class="modal-body">
      	<div id="alertaSiniestroDocumentoGeneralOK" style="display: none;" class="alert alert-success" role="alert">
	   		<strong>El documento se ha guardado correctamente.</strong>
		</div>
		<div id="alertaSiniestroDocumentoGeneralKO" style="display: none;" class="alert alert-danger" role="alert">
	   		<strong>Se ha producido un error al guardar el documento.</strong>
		</div>
		<div id="alertaEliminarSiniestroDocumentoGeneralOK" style="display: none;" class="alert alert-success" role="alert">
	   		<strong>El documento se ha eliminado correctamente.</strong>
		</div>
		<div id="alertaEliminarSiniestroDocumentoGeneralKO" style="display: none;" class="alert alert-danger" role="alert">
	    	<strong>Se ha producido un error al eliminar el documento.</strong>
		</div>
     	<form id="nuevoSiniestroDocumentoGeneral" action="./guardarDocumentoSiniestro" enctype="multipart/form-data" method="POST">
     		<input id="idSiniestroDocumentoGeneral" name="fkSiniestro.id" type="hidden">	
			<!-- Documento -->
			<fieldset id="zonaDocSiniestro">
				<legend class="float-left">Documentos del Siniestro:</legend>
				<label id="lblFicheroSiniestroGeneral" for="fname" class="float-left">Adjunto (*)</label>	
				<input type="file" id="ficheroSiniestroGeneral" name="ficheroSiniestroGeneral" size="25" accept="application/pdf" class="form-control">
			</fieldset>
			<!-- Observaciones -->
			<label for="fname" class="float-left">Observaciones</label>
			<textarea id="observacionesSiniestroDocumentoGeneral" rows="4" cols="150" wrap="soft" class="form-control" name="observaciones" maxlength="1500"></textarea>
  		</form>
  		<!-- Tabla -->
		 <table id="tablaSiniestroDocumentoGeneral" class="table table-striped table-bordered" style="width:100%"></table>
      </div>
      <div class="modal-footer">
      		<button type="button" class="btn btn-default" data-dismiss="modal" onclick="cerrarSiniestroDocumentoGeneral()">Cerrar</button>
			<button id="limpiaSiniestroDocumento" type="button" class="btn btn-primary float-right" onclick="clearModalGenSiniestroDocumento()">Limpiar</button>
			<button type="button" id="guardarSiniestroDocumento" class="btn btn-primary" onclick="guardarDocumentoSiniestroGeneral()">Guardar</button>
      </div>
    </div>
  </div>
</div>