 <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<div class="modal fade" id="modalMantenimientoConceptoGeneral" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog modal-xl" role="document">
    <div class="modal-content">
      <div class="modal-header">
		<h4 class="modal-title" class="close float-left" id="myModalLabel">Gesti&oacute;n Conceptos del Mantenimiento</h4>
        <button type="button" class="close " data-dismiss="modal" aria-label="Close" onclick="cerrarMantenimientoConceptoGeneral()" ><span aria-hidden="true">&times;</span></button>
      </div>
      <div class="modal-body">
      	<div id="alertaMantenimientoConceptoGeneralOK" style="display: none;" class="alert alert-success" role="alert">
	   		<strong>El concepto del mantenimiento se ha guardado correctamente.</strong>
		</div>
		<div id="alertaMantenimientoConceptoGeneralKO" style="display: none;" class="alert alert-danger" role="alert">
	   		<strong>Se ha producido un error al guardar el concepto del mantenimiento.</strong>
		</div>
		<div id="alertaEliminarMantenimientoConceptoGeneralOK" style="display: none;" class="alert alert-success" role="alert">
	   		<strong>El concepto del mantenimiento se ha eliminado correctamente.</strong>
		</div>
		<div id="alertaEliminarMantenimientoConceptoGeneralKO" style="display: none;" class="alert alert-danger" role="alert">
	    	<strong>Se ha producido un error al eliminar el concepto del mantenimiento.</strong>
		</div>
		<br />
		<h4>Datos de los Conceptos del Mantenimiento</h4>
		<br />
		<span id="spMantConc"></span>
		<br />
		<br />
     	<form id="nuevoMantenimientoConceptoGeneral" action="./guardarMantenimientoConcepto" method="POST">
			<input id="idMantenimientoConceptoActualiza" name="id" type="hidden">
			<input id="idManteGeneral" name="fkMantenimiento.id" type="hidden">
			<div class="form-row">
				<div class="float-left">
					<div class="row">
						<!-- Columna 1 -->
						<div class="col">
							<!-- Concepto -->
							<label for="fname" id="lblMantConcepto" class="float-left">Concepto (*)</label>
							<select class="form-control" id="mantConcepto" name="fkConcepto.id" class="float-left">
								<option value="">-- Seleccione --</option>
							</select>
							<!-- Fecha Proxima Revision -->
							<label id="lblFechaProximaRevision" class="float-left">Fecha Pr&oacute;xima Revisi&oacute;n</label>
							<input type="date" id="fechaProximaRevision" name="fechaProximaRevision" class="form-control" pattern="dd-MM-yyyy" max='9999-12-31'/>
						</div>
						<!-- Columna 2 -->
						<div class="col">
							<!-- Cantidad -->
							<label for="fname" id="lblCantidad" class="float-left">Cantidad (*)</label>
							<input type="text" id="cantidad" name="cantidad" maxlength="5" class="form-control" value="1" onkeypress="return soloNumerosTelefonos(event)">
							<!-- Num Kilometros -->
							<label for="fname" class="float-left">Num. Kil&oacute;metros</label>
							<input type="text" id="numKilometros" name="numKilometros" maxlength="9" class="form-control" onkeypress="return soloNumeros(event)">
						</div>
						<!-- Columna 3 -->
						<div class="col">
							<!-- Precio Unitario -->
							<!-- SVEHI-288. Se anade el readonly para convertirlo en solo lectura -->
							<label for="fname" id="lblPrecionUnitario" class="float-left">Precio Unitario (*)</label>
							<input type="text" id="precioUnitario" name="precioUnitario" maxlength="9" class="form-control" value="0"  onkeypress="return soloNumeros(event)" readonly>
						</div>
					</div>
				</div>
			</div>
			<!-- Observaciones -->
			<label for="fname" class="float-left">Observaciones</label>
			<textarea id="observaciones" rows="4" cols="150" wrap="soft" class="form-control" name="observaciones" maxlength="1500"></textarea>
  		</form>
  		<!-- Tabla -->
		<table id="tablaMantenimientoConcepto" class="table table-striped table-bordered" style="width:100%"></table>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal" onclick="cerrarMantenimientoConceptoGeneral()">Cerrar</button>
        <button id="limpiaMantenimientoConcepto" type="button" class="btn btn-primary float-right" onclick="clearModalGenMantenimientoConcepto()">Limpiar</button>
        <button type="button" id="guardarMantenimientoConcepto" class="btn btn-primary" onclick="guardarMantenimientoConceptoGeneral()">Guardar</button>
      </div>
    </div>
  </div>
</div>