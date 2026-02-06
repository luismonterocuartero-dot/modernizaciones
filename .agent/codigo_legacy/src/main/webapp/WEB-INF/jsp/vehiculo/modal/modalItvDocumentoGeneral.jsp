 <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<div class="modal fade" id="modalItvDocumentoGeneral" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog modal-xl" role="document">
    <div class="modal-content">
      <div class="modal-header">
		<h4 class="modal-title" class="close float-left" id="myModalLabel">Gesti&oacute;n Itv Documento</h4>
        <button type="button" class="close " data-dismiss="modal" aria-label="Close" onclick="cerrarItvDocumentoGeneral()" ><span aria-hidden="true">&times;</span></button>
      </div>
      <div class="modal-body">
      	<div id="alertaItvDocumentoGeneralOK" style="display: none;" class="alert alert-success" role="alert">
	   		<strong>El documento se ha guardado correctamente.</strong>
		</div>
		<div id="alertaItvDocumentoGeneralKO" style="display: none;" class="alert alert-danger" role="alert">
	   		<strong>Se ha producido un error al guardar el documento.</strong>
		</div>
		<div id="alertaEliminarItvDocumentoGeneralOK" style="display: none;" class="alert alert-success" role="alert">
	   		<strong>El documento se ha eliminado correctamente.</strong>
		</div>
		<div id="alertaEliminarItvDocumentoGeneralKO" style="display: none;" class="alert alert-danger" role="alert">
	    	<strong>Se ha producido un error al eliminar el documento.</strong>
		</div>
     	<form id="nuevoItvDocumentoGeneral" action="./guardarDocumentoItv" enctype="multipart/form-data" method="POST">
     		<input id="idItvDocumentoGeneral" name="Itv.id" type="hidden">	
			<!-- Documento -->
			<fieldset id="zonaDocItv">
				<legend class="float-left">Documentos de la ITV:</legend>
				<label id="lblFicheroItvGeneral" for="fname" class="float-left">Adjunto (*)</label>	
				<input type="file" id="ficheroItvGeneral" name="ficheroItvGeneral" size="25" accept="application/pdf" class="form-control">
			</fieldset>
			<!-- Observaciones -->
			<label for="fname" class="float-left">Observaciones</label>
			<textarea id="observacionesItvDocumentoGeneral" rows="4" cols="150" wrap="soft" class="form-control" name="observaciones" maxlength="1500"></textarea>
  		</form>
  		<!-- Tabla -->
		 <table id="tablaItvDocumentoGeneral" class="table table-striped table-bordered" style="width:100%"></table>
      </div>
      <div class="modal-footer">
      		<button type="button" class="btn btn-default" data-dismiss="modal" onclick="cerrarItvDocumentoGeneral()">Cerrar</button>
			<button id="limpiaItvDocumento" type="button" class="btn btn-primary float-right" onclick="clearModalGenItvDocumento()">Limpiar</button>
			<button type="button" id="guardarItvDocumento" class="btn btn-primary" onclick="guardarDocumentoItvGeneral()">Guardar</button>
      </div>
    </div>
  </div>
</div>