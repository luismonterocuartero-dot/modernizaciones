 <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<div class="modal fade" id="modalPolizaDocumentoGeneral" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog modal-xl" role="document">
    <div class="modal-content">
      <div class="modal-header">
		<h4 class="modal-title" class="close float-left" id="myModalLabel">Gesti&oacute;n P&oacute;liza Documento</h4>
        <button type="button" class="close " data-dismiss="modal" aria-label="Close" onclick="cerrarPolizaDocumentoGeneral()" ><span aria-hidden="true">&times;</span></button>
      </div>
      <div class="modal-body">
      	<div id="alertaPolizaDocumentoGeneralOK" style="display: none;" class="alert alert-success" role="alert">
	   		<strong>El documento se ha guardado correctamente.</strong>
		</div>
		<div id="alertaPolizaDocumentoGeneralKO" style="display: none;" class="alert alert-danger" role="alert">
	   		<strong>Se ha producido un error al guardar el documento.</strong>
		</div>
		<div id="alertaEliminarPolizaDocumentoGeneralOK" style="display: none;" class="alert alert-success" role="alert">
	   		<strong>El documento se ha eliminado correctamente.</strong>
		</div>
		<div id="alertaEliminarPolizaDocumentoGeneralKO" style="display: none;" class="alert alert-danger" role="alert">
	    	<strong>Se ha producido un error al eliminar el documento.</strong>
		</div>
     	<form id="nuevaPolizaDocumentoGeneral" action="./guardarDocumentoPoliza" enctype="multipart/form-data" method="POST">
     		<input id="idPolizaDocumentoGeneral" name="fkPoliza.id" type="hidden">	
			<!-- Documento -->
			<fieldset id="zonaDocPoliza">
				<legend class="float-left">Documentos de la P&oacute;liza</legend>
				<label id="lblFicheroPolizaGeneral" for="fname" class="float-left">Adjunto (*)</label>	
				<input type="file" id="ficheroPolizaGeneral" name="ficheroPolizaGeneral" size="25" accept="application/pdf" class="form-control">
			</fieldset>
			<!-- Observaciones -->
			<label for="fname" class="float-left">Observaciones</label>
			<textarea id="observacionesPolizaDocumentoGeneral" rows="4" cols="150" wrap="soft" class="form-control" name="observaciones" maxlength="1500"></textarea>
  		</form>
  		<!-- Tabla -->
		 <table id="tablaPolizaDocumentoGeneral" class="table table-striped table-bordered" style="width:100%"></table>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal" onclick="cerrarPolizaDocumentoGeneral()">Cerrar</button>
        <button id="limpiaPolizaDocumento" type="button" class="btn btn-primary float-right" onclick="clearModalGenPolizaDocumento()">Limpiar</button>
        <button type="button" id="guardarPolizaDocumento" class="btn btn-primary" onclick="guardarDocumentoPolizaGeneral()">Guardar</button>
      </div>
    </div>
  </div>
</div>