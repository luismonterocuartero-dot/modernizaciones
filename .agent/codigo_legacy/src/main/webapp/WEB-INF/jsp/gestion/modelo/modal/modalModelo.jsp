<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<div class="modal fade" data-backdrop="static" id="modalModelo" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog modal-xl" role="document">
    <div class="modal-content">
      <div class="modal-header">
		<h4 id="cabecera" class="modal-title" class="close float-left" id="myModalLabel">Nuevo Modelo</h4>
        <button type="button" class="close " data-dismiss="modal" aria-label="Close" onclick="resetModal()" ><span aria-hidden="true">&times;</span></button>
      </div>
      <div class="modal-body">
     	<form id="nuevoModelo" action="./crearMarca" method="POST">
     		<input id="idModelo" name="id" type="hidden">
     		<input id="permisoActual" name="permisoActual" value="${permisoActual}" type="hidden">
			<div class="form-row">
				<!-- Columna 1 -->
				<div class="col">
					<!-- Nombre -->
					<label for="fname" id="nombreLabel" class="float-left">Nombre (*)</label>
		  			<input type="text" id="nombre" name="nombre" maxlength="150" class="form-control">
		  			<!-- Potencia -->
					<label for="fname" id="potenciaLabel" class="float-left">Potencia</label>
		  			<input type="text" id="potencia" name="potencia" maxlength="50" class="form-control">
		  			<!-- Tipo Vehículo -->
					<label id="etiquetaTipoVehiculo" class="float-left">Tipo Vehículo (*) </label>
		    		<select class="form-control" id="selectorTipoVehiculo" name="fkParametroTipoVehiculo.id" class="float-left"  required>
		    			<option value="">-- Seleccione --</option>
		    			<c:forEach items="${paramVehiculos}" var="parametro">
		        			<option value="${parametro.id}">${parametro.nombre}</option>
		    			</c:forEach>
		    		</select>
		    		<!-- Tipo Alimentación -->
					<label id="etiquetaAlimentacion" class="float-left">Alimentación (*) </label>
		    		<select class="form-control" id="selectorTipoAlimentacion" name="fkParametroAlimentacion.id" class="float-left"  required>
		    			<option value="">-- Seleccione --</option>
		    			<c:forEach items="${paramAlimentaciones}" var="parametro">
		        			<option value="${parametro.id}">${parametro.nombre}</option>
		    			</c:forEach>
		    		</select>
				</div>
				<!-- Columna 2 -->
				<div class="col">
					<!-- Marca -->
					<label id="etiquetaMarca" class="float-left">Marca (*) </label>
		    		<select class="form-control" id="selectorMarca" name="fkMarca.id" class="float-left"  required>
		    			<option value="">-- Seleccione --</option>
		    			<c:forEach items="${marcas}" var="marca">
		        			<option value="${marca.id}">${marca.nombre}</option>
		    			</c:forEach>
		    		</select>
		    		<!-- Cilindrada -->
					<label for="fname" id="cilindradaLabel" class="float-left">Cilindrada</label>
		  			<input type="text" id="cilindrada" name="cilindrada" maxlength="50" class="form-control">
		    		<!-- Info Extra Tipo Vehículo -->
					<label for="fname" id="infotipoVehiculoLabel" class="float-left">Info Extra Tipo Vehículo</label>
		  			<input type="text" id="infoExtraTipoVehiculo" name="infoExtraTipoVehiculo" maxlength="500" class="form-control">
		  			<!-- Info Extra Alimentación -->
					<label for="fname" id="infoExtraAlimentacionLabel" class="float-left">Info Extra Alimentación</label>
		  			<input type="text" id="infoExtraAlimentacion" name="infoExtraAlimentacion" maxlength="500" class="form-control">
				</div>
			</div>
  		</form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal" onclick="resetModal()">Cerrar</button>
        <button type="button" id="guardarModelo" class="btn btn-primary" onclick="crearModelo()">Guardar</button>
      </div>
    </div>
  </div>
</div>