<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<div class="modal fade" data-backdrop="static" id="modalConcepto" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog modal-xl" role="document">
    <div class="modal-content">
      <div class="modal-header">
		<h4 id="cabecera" class="modal-title" class="close float-left" id="myModalLabel">Nuevo Concepto</h4>
        <button type="button" class="close " data-dismiss="modal" aria-label="Close" onclick="resetModal()" ><span aria-hidden="true">&times;</span></button>
      </div>
      <div class="modal-body">
     	<form id="nuevoConcepto" action="./crearConcepto" method="POST">
     		<input id="idConcepto" name="id" type="hidden">
     		<input id="permisoActual" name="permisoActual" value="${permisoActual}" type="hidden">
			<div class="form-row">
				<!-- Columna 1 -->
				<div class="col">
					<!-- Nombre -->
					<label for="fname" id="nombreLabel" class="float-left">Nombre (*)</label>
		  			<input type="text" id="nombreConcepto" name="nombre" maxlength="150" class="form-control">
					<!-- Kilometros -->
					<label for="fname" id="kilometroLabel" class="float-left">Kil&oacute;metros</label>
		  			<input type="text" id="kilometrosConcepto" name="kilometros" maxlength="10" onkeypress="soloNumerosDecimales(event)" class="form-control">
				</div>
				<!-- Columna 2 -->
				<div class="col">
					<!-- Precio Unitario -->
					<label for="fname" id="precioLabel" class="float-left">Precio Unitario (*)</label>
		  			<input type="text" id="precioConcepto" name="precioUnitario" maxlength="10" onkeypress="soloNumerosDecimales(event)" class="form-control">
		  			<!-- Dias -->
					<label for="fname" id="diaLabel" class="float-left">D&iacute;as</label>
		  			<input type="text" id="diasConcepto" name="dias" maxlength="5" onkeypress="soloNumeros(event)" class="form-control">
				</div>
				
			</div>
  		</form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal" onclick="resetModal()">Cerrar</button>
        <button type="button" id="guardarConcepto" class="btn btn-primary" onclick="crearConcepto()">Guardar</button>
      </div>
    </div>
  </div>
</div>