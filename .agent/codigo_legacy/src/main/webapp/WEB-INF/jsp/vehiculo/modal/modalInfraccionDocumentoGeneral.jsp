 <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<div class="modal fade" id="modalInfraccionDocumentoGeneral" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog modal-xl" role="document">
    <div class="modal-content">
      <div class="modal-header">
		<h4 class="modal-title" class="close float-left" id="myModalLabel">Gesti&oacute;n Infracci&oacute;n Documento</h4>
        <button type="button" class="close " data-dismiss="modal" aria-label="Close" onclick="cerrarInfraccionDocumentoGeneral()" ><span aria-hidden="true">&times;</span></button>
      </div>
      <div class="modal-body">
      	<div id="alertaInfraccionDocumentoGeneralOK" style="display: none;" class="alert alert-success" role="alert">
	   		<strong>El documento se ha guardado correctamente.</strong>
		</div>
		<div id="alertaInfraccionDocumentoGeneralKO" style="display: none;" class="alert alert-danger" role="alert">
	   		<strong>Se ha producido un error al guardar el documento.</strong>
		</div>
		<div id="alertaEliminarInfraccionDocumentoGeneralOK" style="display: none;" class="alert alert-success" role="alert">
	   		<strong>El documento se ha eliminado correctamente.</strong>
		</div>
		<div id="alertaEliminarInfraccionDocumentoGeneralKO" style="display: none;" class="alert alert-danger" role="alert">
	    	<strong>Se ha producido un error al eliminar el documento.</strong>
		</div>
     	<form id="nuevaInfraccionDocumentoGeneral" action="./guardarDocumentoInfraccion" enctype="multipart/form-data" method="POST">
     	<input id="idInfraccionDocumentoGeneral" name="fkInfraccion.id" type="hidden">	
			<!-- Documento -->
			<fieldset id="zonaDocInfraccion">
				<legend class="float-left">Documentos de la Infracci&oacute;n</legend>
				<label id="lblFicheroInfraccionGeneral" for="fname" class="float-left">Adjunto (*)</label>		
				<input type="file" id="ficheroInfraccionGeneral"  name="ficheroInfraccionGeneral" size="25" accept="application/pdf" class="form-control">
			</fieldset>
			<!-- Observaciones -->
			<label for="fname" class="float-left">Observaciones</label>
			<textarea id="observacionesInfraccionDocumentoGeneral" rows="4" cols="150" wrap="soft" class="form-control" name="observaciones" maxlength="1500"></textarea>
  		</form>
  		<!-- Tabla -->
		 <table id="tablaInfraccionDocumentoGeneral" class="table table-striped table-bordered" style="width:100%"></table>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal" onclick="cerrarInfraccionDocumentoGeneral()">Cerrar</button>
        <button id="limpiaInfraccionDocumento" type="button" class="btn btn-primary float-right" onclick="clearModalGenInfraccionDocumento()">Limpiar</button>
        <button type="button" id="guardarInfraccionDocumento" class="btn btn-primary" onclick="guardarDocumentoInfraccionGeneral()">Guardar</button>
      </div>
    </div>
  </div>
</div>