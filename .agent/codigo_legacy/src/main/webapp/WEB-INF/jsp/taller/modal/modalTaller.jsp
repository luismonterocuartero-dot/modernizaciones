<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<div class="modal fade" id="modalEditarTaller" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog modal-xl" role="document">
    <div class="modal-content">
      <div class="modal-header">
		<h4 class="modal-title" class="close float-left" id="cabecera">Nuevo Taller</h4>
        <button type="button" class="close " data-dismiss="modal" aria-label="Close" onclick="resetModal()"><span aria-hidden="true">&times; </span></button>
      </div>
      <div class="modal-body">
     	<form id="nuevoTaller" action="./crearTaller"  method="POST">
     	<input id="permisoActual" name="permisoActual" value="${permisoActual}" type="hidden">
	<input id="permisoActualServ" name="permisoActualServ" value="${permisoActualServ}" type="hidden">
		<div class="form-row">
		<!-- Fila 1 -->
		<div class="form-group col-md-4">
		    <!-- Nombre -->
			<label id="labelNombre" for="fname" class="float-left">Nombre (*)</label>
  			<input type="text" id="nombre" name="nombre" class="form-control" maxlength="250">
  			</div>
  			<div class="form-group col-md-4">
  			<!-- CIF/NIF -->
			<label id="lblCif" for="fname" class="float-left">CIF/NIF (*)</label>
  			<input type="text" id="cif" name="cif" class="form-control" maxlength="50">
  			</div>
  			<div class="form-group col-md-4">
  			<!-- Email-->
			<label id="lblEmail" for="fname" class="float-left">Email</label>
  			<input type="text" id="email" name="email" class="form-control" maxlength="250">
  			</div>		
		<!-- Fila 2 -->
		<div class="form-group col-md-4">
  			<!-- Telefono -->
			<label for="fname" class="float-left">Tel&eacutefono</label>
  			<input type="text" id="telefono" name="telefono" class="form-control" onkeypress="return soloNumeros(event)" maxlength="50">
			</div>
			<div class="form-group col-md-8">
			<!-- Direccion -->
			<label for="fname" class="float-left">Direccion</label>
  			<input type="text" id="direccion" name="direccion" class="form-control" maxlength="500">
		</div>
		<!-- Fila 3 -->
		<div class="form-group col-md-4">
			<label id="lblProvincia" class="float-left">Provincia</label>
			<select class="form-control" id="selectorProvincia" name="provincia" class="float-left">
				<option value="">-- Seleccione --</option>
				<c:forEach items="${provincias}" var="provincia">
					<option value="${provincia.id}">${provincia.nombre}</option>	
				</c:forEach>
			</select>		
  		</div>
		<div class="form-group col-md-4">
			<label id="lblMunicipio" class="float-left">Municipio</label>
			<select class="form-control" id="selectorMunicipio" name="municipio" class="float-left" disabled="true">
				<option value="">-- Seleccione --</option>
				<c:forEach items="${municipios}" var="municipio">
					<option value="${municipio.id}">${municipio.nombre}</option>	
				</c:forEach>
			</select>		
  		</div>
		<div class="form-group col-md-4">
			<!-- CodigoPostal -->
			<label for="lname" id="lblCodigoPostal" class="float-left">C&oacute;digo Postal</label>
			<input type="text" id="codigoPostal" name="codigoPostal" class="form-control"  maxlength="5" onkeypress="return soloNumeros(event)">
		</div>		
		</div>
				<!-- Observaciones -->
		<label for="fname" class="float-left">Observaciones</label>
		<textarea id="observaciones" rows="4" cols="150" wrap="soft" class="form-control" name="observaciones" maxlength="2000"></textarea>
		<input type="hidden" id="idTallerActualiza" name="id" class="form-control">
  		
  		</form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal" onclick="resetModal()">Cerrar</button>
        <button type="button" id="guardarTaller" class="btn btn-primary" onclick="crearTaller()">Guardar</button>
      </div>
    </div>
  </div>
</div>