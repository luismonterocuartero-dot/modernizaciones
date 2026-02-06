<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<div class="modal fade" id="modalGeneral" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog modal-xl" role="document">
    <div class="modal-content">
      <div class="modal-header">
		<h4 id="cabecera" class="modal-title" class="close float-left" id="myModalLabel">Gesti&oacute;n del Veh&iacute;culo</h4>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close" onclick="resetModalGeneral()" ><span aria-hidden="true">&times;</span></button>
      </div>
      <br />  
      <label id="cabeceraMatriculas" style=""></label>
      <!-- MENSAJES GENERALES DE SUCCESS Y ERROR -->
      <div id="alertaSuccesGeneral" style="display: none;" class="alert alert-success" role="alert">
         <strong>${successGeneral}</strong>
      </div>
      <div id="alertaErrorGeneral" style="display: none;" class="alert alert-danger" role="alert">
         <strong>${errorGeneral}</strong>
      </div>
      <!-- MENSAJES CABECERA MATRICULA -->
      <div id="alertaGeneralCabeceraMatriculaKO" style="display: none;" class="alert alert-danger" role="alert">
         <strong>Se ha producido un error al mostrar las matriculas del veh&#237;culo.</strong>
      </div>	
      <!-- MENSAJES VEHICULO -->
      <div id="alertaGeneralVehiculoOK" style="display: none;" class="alert alert-success" role="alert">
         <strong>Los datos del veh&#237;culo se han guardado correctamente.</strong>
      </div>
      <div id="alertaGeneralVehiculoKO" style="display: none;" class="alert alert-danger" role="alert">
         <strong>Se ha producido un error al guardar los datos del veh&#237;culo.</strong>
      </div>
      <!-- MENSAJES MATRICULA -->
      <div id="alertaGeneralMatriculaOK" style="display: none;" class="alert alert-success" role="alert">
         <strong>La datos de la matr&#237;cula se han guardado correctamente.</strong>
      </div>
      <div id="alertaGeneralMatriculaKO" style="display: none;" class="alert alert-danger" role="alert">
         <strong>Se ha producido un error al guardar los datos de la matr&#237;cula.</strong>
      </div>
      <div id="alertaEliminarGeneralMatriculaOK" style="display: none;" class="alert alert-success" role="alert">
         <strong>La matr&#237;cula se ha eliminado correctamente.</strong>
      </div>
      <div id="alertaEliminarGeneralMatriculaKO" style="display: none;" class="alert alert-danger" role="alert">
         <strong>Se ha producido un error al eliminar la matr&#237;cula.</strong>
      </div>
      <!-- MENSAJES VEHICULO DOCUMENTO -->
      <div id="alertaVehiculoDocumentoGeneralOK" style="display: none;" class="alert alert-success" role="alert">
         <strong>La datos del documento se han guardado correctamente.</strong>
      </div>
      <div id="alertaVehiculoDocumentoGeneralKO" style="display: none;" class="alert alert-danger" role="alert">
         <strong>Se ha producido un error al guardar los datos del documento.</strong>
      </div>
      <div id="alertaEliminarVehiculoDocumentoGeneralOK" style="display: none;" class="alert alert-success" role="alert">
         <strong>El documento se ha eliminado correctamente.</strong>
      </div>
      <div id="alertaEliminarVehiculoDocumentoGeneralKO" style="display: none;" class="alert alert-danger" role="alert">
         <strong>Se ha producido un error al eliminar el documento.</strong>
      </div>
      <!-- MENSAJES EQUIPAMIENTO -->
      <div id="alertaGeneralEquipamientoOK" style="display: none;" class="alert alert-success" role="alert">
         <strong>La datos del equipamiento se han guardado correctamente.</strong>
      </div>
      <div id="alertaGeneralEquipamientoKO" style="display: none;" class="alert alert-danger" role="alert">
         <strong>Se ha producido un error al guardar los datos del equipamiento.</strong>
      </div>
      <div id="alertaEliminarGeneralEquipamientoOK" style="display: none;" class="alert alert-success" role="alert">
         <strong>El equipamiento se ha eliminado correctamente.</strong>
      </div>
      <div id="alertaEliminarGeneralEquipamientoKO" style="display: none;" class="alert alert-danger" role="alert">
         <strong>Se ha producido un error al eliminar el equipamiento.</strong>
      </div>
      <!-- MENSAJES MATERIAL -->
      <div id="alertaMaterialGeneralOK" style="display: none;" class="alert alert-success" role="alert">
         <strong>La datos del material se han guardado correctamente.</strong>
      </div>
      <div id="alertaMaterialGeneralKO" style="display: none;" class="alert alert-danger" role="alert">
         <strong>Se ha producido un error al guardar los datos del material.</strong>
      </div>
      <div id="alertaEliminarMaterialGeneralOK" style="display: none;" class="alert alert-success" role="alert">
         <strong>El material se ha eliminado correctamente.</strong>
      </div>
      <div id="alertaEliminarMaterialGeneralKO" style="display: none;" class="alert alert-danger" role="alert">
         <strong>Se ha producido un error al eliminar el material.</strong>
      </div>
      <!-- MENSAJES CESION -->
      <div id="alertaGeneralCesionOK" style="display: none;" class="alert alert-success" role="alert">
         <strong>La datos de la cesi&oacute;n se han guardado correctamente.</strong>
      </div>
      <div id="alertaGeneralCesionKO" style="display: none;" class="alert alert-danger" role="alert">
         <strong>Se ha producido un error al guardar los datos de la cesi&oacute;n.</strong>
      </div>
      <div id="alertaEliminarCesionGeneralOK" style="display: none;" class="alert alert-success" role="alert">
         <strong>La cesi&oacute;n se ha eliminado correctamente.</strong>
      </div>
      <div id="alertaEliminarCesionGeneralKO" style="display: none;" class="alert alert-danger" role="alert">
         <strong>Se ha producido un error al eliminar la cesi&oacute;n.</strong>
      </div>
      <!-- MENSAJES REPOSTAJE -->
      <div id="alertaGeneralRepostajeOK" style="display: none;" class="alert alert-success" role="alert">
         <strong>La datos del repostaje se han guardado correctamente.</strong>
      </div>
      <div id="alertaGeneralRepostajeKO" style="display: none;" class="alert alert-danger" role="alert">
         <strong>Se ha producido un error al guardar los datos del repostaje.</strong>
      </div>
      <div id="alertaEliminarRepostajeGeneralOK" style="display: none;" class="alert alert-success" role="alert">
         <strong>El repostaje se ha eliminado correctamente.</strong>
      </div>
      <div id="alertaEliminarRepostajeGeneralKO" style="display: none;" class="alert alert-danger" role="alert">
         <strong>Se ha producido un error al eliminar el repostaje.</strong>
      </div>
      <!-- MENSAJES SINIESTRO -->
      <div id="alertaSiniestroGeneralOK" style="display: none;" class="alert alert-success" role="alert">
         <strong>La datos del siniestro se han guardado correctamente.</strong>
      </div>
      <div id="alertaSiniestroGeneralKO" style="display: none;" class="alert alert-danger" role="alert">
         <strong>Se ha producido un error al guardar los datos del siniestro.</strong>
      </div>
      <div id="alertaEliminarSiniestroGeneralOK" style="display: none;" class="alert alert-success" role="alert">
         <strong>El siniestro se ha eliminado correctamente.</strong>
      </div>
      <div id="alertaEliminarSiniestroGeneralKO" style="display: none;" class="alert alert-danger" role="alert">
         <strong>Se ha producido un error al eliminar el siniestro.</strong>
      </div>
      <!-- MENSAJES POLIZA -->
      <div id="alertaPolizaGeneralOK" style="display: none;" class="alert alert-success" role="alert">
         <strong>La datos de la p&#243;liza se han guardado correctamente.</strong>
      </div>
      <div id="alertaPolizaGeneralKO" style="display: none;" class="alert alert-danger" role="alert">
         <strong>Se ha producido un error al guardar los datos de la p&#243;liza.</strong>
      </div>
      <div id="alertaEliminarPolizaGeneralOK" style="display: none;" class="alert alert-success" role="alert">
         <strong>La p&#243;liza se ha eliminado correctamente.</strong>
      </div>
      <div id="alertaEliminarPolizaGeneralKO" style="display: none;" class="alert alert-danger" role="alert">
         <strong>Se ha producido un error al eliminar la p&#243;liza.</strong>
      </div>
      <!-- MENSAJES ITV -->
      <div id="alertaGeneralItvOK" style="display: none;" class="alert alert-success" role="alert">
         <strong>La datos de la itv se han guardado correctamente.</strong>
      </div>
      <div id="alertaGeneralItvKO" style="display: none;" class="alert alert-danger" role="alert">
         <strong>Se ha producido un error al guardar los datos de la itv.</strong>
      </div>
      <div id="alertaEliminarItvGeneralOK" style="display: none;" class="alert alert-success" role="alert">
         <strong>La itv se ha eliminado correctamente.</strong>
      </div>
      <div id="alertaEliminarItvGeneralKO" style="display: none;" class="alert alert-danger" role="alert">
         <strong>Se ha producido un error al eliminar la itv.</strong>
      </div>
      <!-- MENSAJES INFRACCION -->
      <div id="alertaInfraccionGeneralOK" style="display: none;" class="alert alert-success" role="alert">
         <strong>La datos de la infracci&#243;n se han guardado correctamente.</strong>
      </div>
      <div id="alertaInfraccionGeneralKO" style="display: none;" class="alert alert-danger" role="alert">
         <strong>Se ha producido un error al guardar los datos de la infracci&#243;n.</strong>
      </div>
      <div id="alertaEliminarInfraccionGeneralOK" style="display: none;" class="alert alert-success" role="alert">
         <strong>La infracci&#243;n se ha eliminado correctamente.</strong>
      </div>
      <div id="alertaEliminarInfraccionGeneralKO" style="display: none;" class="alert alert-danger" role="alert">
         <strong>Se ha producido un error al eliminar la infracci&#243;n.</strong>
      </div>
      <!-- MENSAJES MANTENIMIENTO -->
         <div id="alertaMantenimientoGeneralOK" style="display: none;" class="alert alert-success" role="alert">
         <strong>La datos del mantenimiento se han guardado correctamente.</strong>
      </div>
      <div id="alertaMantenimientoGeneralKO" style="display: none;" class="alert alert-danger" role="alert">
         <strong>Se ha producido un error al guardar los datos del mantenimiento.</strong>
      </div>
      <div id="alertaEliminarMantenimientoGeneralOK" style="display: none;" class="alert alert-success" role="alert">
         <strong>El mantenimiento se ha eliminado correctamente.</strong>
      </div>
      <div id="alertaEliminarMantenimientoGeneralKO" style="display: none;" class="alert alert-danger" role="alert">
         <strong>Se ha producido un error al eliminar el mantenimiento.</strong>
      </div>
      <div class="modal-body">
     	<!-- DEFINIMOS LAS PESTANAS -->
		<ul class="nav nav-tabs" id="tabsVehi" role="tablist">
			<li class="nav-item"><a class="nav-link active" id="vehiculo-tab" data-toggle="tab" href="#vehiculo" role="tab" aria-controls="vehiculo" aria-selected="true">Veh&iacute;culo</a></li>
			<li class="nav-item"><a class="nav-link" id="historico-tab" data-toggle="tab" href="#historico" role="tab" aria-controls="historico" aria-selected="false">Adscripciones</a></li>
			<li class="nav-item"><a class="nav-link" id="documento-tab" data-toggle="tab" href="#documento" role="tab" aria-controls="documento" aria-selected="false">Doc. Veh&iacute;culo</a></li>
			<li class="nav-item"><a class="nav-link" id="matricula-tab" data-toggle="tab" href="#matricula" role="tab" aria-controls="matricula" aria-selected="false">Matr&iacute;culas</a></li>
			<li class="nav-item"><a class="nav-link" id="equipamiento-tab" data-toggle="tab" href="#equipamiento" role="tab" aria-controls="equipamiento" aria-selected="false">Equip.</a></li>
			<li class="nav-item"><a class="nav-link" id="cesion-tab" data-toggle="tab" href="#cesion" role="tab" aria-controls="cesion" aria-selected="false">Cesi&oacute;n</a></li>
			<li class="nav-item"><a class="nav-link" id="repostaje-tab" data-toggle="tab" href="#repostaje" role="tab" aria-controls="repostaje" aria-selected="false">Repostaje</a></li>
			<li class="nav-item"><a class="nav-link" id="siniestro-tab" data-toggle="tab" href="#siniestro" role="tab" aria-controls="siniestro" aria-selected="false">Siniestro</a></li>
			<li class="nav-item"><a class="nav-link" id="poliza-tab" data-toggle="tab" href="#poliza" role="tab" aria-controls="poliza" aria-selected="false">P&oacute;liza</a></li>
			<li class="nav-item"><a class="nav-link" id="itv-tab" data-toggle="tab" href="#itv" role="tab" aria-controls="itv" aria-selected="false">Itv</a></li>
			<li class="nav-item"><a class="nav-link" id="infraccion-tab" data-toggle="tab" href="#infraccion" role="tab" aria-controls="infraccion" aria-selected="false">Infracci&oacute;n</a></li>
			<li class="nav-item"><a class="nav-link" id="infraccion-tab" data-toggle="tab" href="#mantenimiento" role="tab" aria-controls="mantenimiento" aria-selected="false">Mantenimiento</a></li>
		</ul>
		<!-- HASTA AQUI -->
		<!-- DEFINIMOS EL CONTENIDO -->
		<div class="tab-content" id="tabsVehiContent">
			<!-- SE DEFINE VARIABLE GENERAL DEL VEHICULO PARA VER EL ESTADO DE DICHO VEHICULO ALTA/BAJA -->
			<form id="formuEstadoGeneralVehi">
				<input type="hidden" id="estadoGeneralVehi" name="estadoGeneralVehi" value="">
				<input id="permisoActualVehiculo" name="permisoActualVehiculo" value="${permisoActualVehiculo}" type="hidden">
				<input id="permisoActualEquipamiento" name="permisoActualEquipamiento" value="${permisoActualEquipamiento}" type="hidden">
				<input id="permisoActualMaterial" name="permisoActualMaterial" value="${permisoActualMaterial}" type="hidden">
				<input id="permisoActualCesion" name="permisoActualCesion" value="${permisoActualCesion}" type="hidden">
				<input id="permisoActualRepostaje" name="permisoActualRepostaje" value="${permisoActualRepostaje}" type="hidden">
				<input id="permisoActualSiniestro" name="permisoActualSiniestro" value="${permisoActualSiniestro}" type="hidden">
				<input id="permisoActualPoliza" name="permisoActualPoliza" value="${permisoActualPoliza}" type="hidden">
				<input id="permisoActualItv" name="permisoActualItv" value="${permisoActualItv}" type="hidden">
				<input id="permisoActualInfraccion" name="permisoActualInfraccion" value="${permisoActualInfraccion}" type="hidden">
				<input id="permisoActualMantenimiento" name="permisoActualMantenimiento" value="${permisoActualMantenimiento}" type="hidden">
				<input id="permisoCheckFinalizado" name="permisoCheckFinalizado" value="${permisoCheckFinalizado}" type="hidden">
				<input id="permisoFiltraProvincia" name="permisoFiltraProvincia" value="${permisoFiltraProvincia}" type="hidden">
			</form>
			<!-- VEHICULO -->
			<div class="tab-pane fade show active" id="vehiculo" role="tabpanel" aria-labelledby="vehiculo-tab">
				<div id="formuGenVehi">
					<br />
					<h4>Datos del Veh&iacute;culo</h4>
					<br />
					<form id="geneVehiculo" action="./crearVehiculo" method="POST">
					<div class="form-row">
					<!-- Columna 1 -->
					<div class="col">
						<!-- Servicio Adscrito -->
						<label id="sAdsLabel" class="float-left">Servicio Adscrito (*) </label>
						<select class="form-control" id="servicioOpt" name="fkServicioAdscrito.id" class="float-left"  required>
							<option value="">-- Seleccione --</option>
							<c:forEach items="${servicios}" var="servicio">
								<option value="${servicio.id}">${servicio.nombre}</option>
							</c:forEach>
						</select>
						<!-- Tipo Repostaje -->
						<label class="float-left">Tipo Repostaje</label>
						<select class="form-control" id="repostajeOpt" name="fkParametroTipoRepostaje.id" class="float-left">
							<option value="0">-- Seleccione --</option>
							<c:forEach items="${parametros}" var="parametro">
								<c:if test = "${parametro.tipoParametro.codigo == 'AL'}">
									<option value="${parametro.id}">${parametro.nombre}</option>
								</c:if>		
							</c:forEach>
						</select>
						<!-- Fecha Compra -->
						<label for="compra" id="lblCompra" class="float-left">Fecha Compra</label>
						<input type="date" id="compra" name="fechaCompra" class="form-control" pattern="dd-MM-yyyy" max='9999-12-31'/>
						<!-- Color -->
						<label for="fname" class="float-left">Color</label>
						<input type="text" id="color" name="color" class="form-control" maxlength="150">
						<!-- Tipo Adquisicion -->
						<label class="float-left">Tipo Adquisici&oacute;n</label>
						<select class="form-control" id="adquisicionOpt" name="fkParametroTipoAdquisicion.id" class="float-left">
							<option value="0">-- Seleccione --</option>
							<c:forEach items="${parametros}" var="parametro">
								<c:if test = "${parametro.tipoParametro.codigo == 'TA'}">
									<option value="${parametro.id}">${parametro.nombre}</option>
								</c:if>		
							</c:forEach>
						</select>
						<hr>
						<!-- Situacion -->
						<label class="float-left">Situaci&oacute;n</label>
						<select class="form-control" id="situacionOpt" name="fkParametroTipoSituacion.id" class="float-left">
							<option value="0">-- Seleccione --</option>
							<c:forEach items="${parametros}" var="parametro">
								<c:if test = "${parametro.tipoParametro.codigo == 'SI'}">
									<option value="${parametro.id}">${parametro.nombre}</option>
								</c:if>		
							</c:forEach>
						</select>
						<!-- Destino Baja -->
						<label class="float-left">Destino</label>
						<select class="form-control" id="destinoOpt" name="fkParametroTipoDestino.id" class="float-left">
							<option value="0">-- Seleccione --</option>
							<c:forEach items="${parametros}" var="parametro">
								<c:if test = "${parametro.tipoParametro.codigo == 'DT'}">
									<option value="${parametro.id}">${parametro.nombre}</option>
								</c:if>		
							</c:forEach>
						</select>
					</div>
					<!-- Columna 2 -->
					<div class="col">
						<!-- Fecha Adscripcion -->
						<label for="adscripcion" id="lblAdscripcion" class="float-left">Fecha Adscripci&oacute;n</label>
						<input type="date" id="adscripcion" name="fechaAdscripcion" class="form-control" pattern="dd-MM-yyyy" max='9999-12-31'/>
						<!-- Marca -->
						<label id="marcaLabel" class="float-left">Marca (*)</label>
						<select class="form-control" id="marcaOpt" name="marca.id" class="float-left" required>    		
							<option value="">-- Seleccione --</option>
							<c:forEach items="${marcas}" var="marca">
								<option value="${marca.id}">${marca.nombre}</option>
							</c:forEach>
						</select>
						<!-- Expediente -->
						<label for="lname" class="float-left">Expediente</label>
						<input type="text" id="expediente" name="expedienteCompra" class="form-control" maxlength="150">
						<!-- Bastidor -->
						<label for="lname" class="float-left">Bastidor</label>
						<input type="text" id="bastidor" name="numeroBastidor" class="form-control" maxlength="150">
						<!-- Empresa Operadora -->
			           	<label id="operadoraLabel" class="float-left">Empresa Operadora </label>
			           	<select class="form-control" id="fkOperadora" name="fkOperadora.id" class="float-left" disabled="true">
			            	<option value="">-- Seleccione --</option>
			            	<c:forEach items="${operadoras}" var="operadora">
			             		<option value="${operadora.id}">${operadora.nombre}</option>
			            	</c:forEach>
			           	</select>	
						<hr>
						<!-- Fecha Baja -->
						<label for="baja" class="float-left">Fecha Baja</label>
						<input type="date" id="baja" name="fechaBaja" class="form-control" disabled="true" pattern="dd-MM-yyyy" max='9999-12-31'/>
						<!-- Motivo Destino -->
						<label for="fname" class="float-left">Motivo Destino</label>
						<input type="text" id="motivoDestino" name="motivoDestino" class="form-control" maxlength="1500">				
					</div>
					<!-- Columna 3 -->
					<div class="col">
						<!-- Tipo Uso -->
						<label class="float-left">Uso</label>
						<select class="form-control" id="usoOpt" name="fkParametroTipoUso.id" class="float-left">
							<option value="0">-- Seleccione --</option>
							<c:forEach items="${parametros}" var="parametro">
								<c:if test = "${parametro.tipoParametro.codigo == 'US'}">
									<option value="${parametro.id}">${parametro.nombre}</option>
								</c:if>		
							</c:forEach>
						</select>
						<!-- Modelo -->
						<label id="modeloLabel" class="float-left">Modelo (*) </label>
						<select class="form-control" id="modeloOpt" name="fkModelo.id" class="float-left" required>
							<option value="">-- Seleccione --</option>
							<c:forEach items="${modelos}" var="modelo">
								<option value="${modelo.id}">${modelo.nombre}</option>
							</c:forEach>
						</select>
						<!-- Inventario -->
						<label for="fname" class="float-left">Inventario</label>
						<input type="text" id="inventario" name="numeroInventario" onkeypress="return soloNumeros(event)" class="form-control" maxlength="150">
						<!-- Tipo de Vehiculo -->
						<label for="fname" class="float-left">Tipo de Veh&iacute;culo</label>
						<input type="text" id="tipoVehiculo" name="tipoVehiculo" class="form-control" readonly>
						<!-- espacio -->
           				<label class="text-white" for="fname" class="float-left">&nbsp;</label>
           				<input type="text" id="espacio" name="espacio" class="form-control bg-white border-0" readonly>
						<hr>
						<!-- Motivo Baja -->
						<label for="fname" class="float-left">Motivo Baja</label>
						<input type="text" id="motivoBaja" name="motivoBaja" maxlength="1500" class="form-control" disabled="true">
					</div>
					</div>
					<!-- Observaciones -->
					<label for="fname" class="float-left">Observaciones</label>
					<textarea id="observaciones" rows="4" cols="150" wrap="soft" class="form-control" name="observaciones" maxlength="4000"></textarea>
					<input type="hidden" id="idVehiculoActualiza" name="id" class="form-control">
					</form>
				  </div>
				<div class="modal-footer">
					<button type="button" id="botonGenerarPDF" class="btn btn-primary" onclick="generarPDFConLogoYTexto()">Informaci&oacute;n veh&iacute;culo PDF</button>
					<button type="button" id="habilitarEdicionVehi" class="btn btn-primary" onclick="habilitarEdicionVehiculo()">Habilitar Edici&oacute;n</button>
					<button type="button" id="guardarVehiculo" class="btn btn-primary" onclick="crearVehiculoGeneral()">Guardar</button>
					<button type="button" id="eliminarVehiculoGeneral" class="btn btn-danger" onclick="modalEliminarVehiculoGeneral()">Eliminar</button>
				</div>
				<hr>
				<div id="dataTablesVehi">
					<div id="formuGenMatr">
						<br />
						<h4>Datos de las Matr&iacute;culas</h4>
						<br />
						<!-- Tabla -->
						<table id="tablaMatriculaVehi" class="table table-striped table-bordered" style="width:100%"></table>
					</div>
					<div class="modal-footer">
						<button type="button" id="redireccionMatricula" class="btn btn-primary d-none" onclick="redireccionPestanas('matricula','NO')">Crear Matr&iacute;cula</button>
					</div>
					<hr>
					<br />
					<div id="formuGenDocu">
						<br />
						<h4>Documentos del Veh&iacute;culo</h4>
						<br />
						<!-- Tabla -->
						<table id="tablaVehiculoDocumentoVehi" class="table table-striped table-bordered mb-2 mt-2" style="width:100%"></table>
					</div>
					<div class="modal-footer">
						<button type="button" id="redireccionVehiDoc" class="btn btn-primary d-none" onclick="redireccionPestanas('vehiDoc','NO')">Crear Documento Veh&iacute;culo</button>
					</div>
					<hr>
					<br />
					<div id="formuGenEqui">
						<br />
						<h4>Datos del Equipamiento</h4>
						<br />
						<!-- Tabla -->
						<table id="tablaEquipamientoVehi" class="table table-striped table-bordered" style="width: 100%"></table>			
					</div>
					<div class="modal-footer">
						<button type="button" id="redireccionEquipamiento" class="btn btn-primary d-none" onclick="redireccionPestanas('equipamiento','NO')">Crear Equipamiento</button>
					</div>
					<hr>
					<br />
					<div id="formuGenCesi">
						<br />
						<h4>Datos de la Cesi&oacute;n</h4>
						<br />
						<!-- Tabla -->
						<table id="tablaCesionVehi" class="table table-striped table-bordered" style="width:100%"></table>			
					</div>
					<div class="modal-footer">
						<button type="button" id="redireccionCesion" class="btn btn-primary d-none" onclick="redireccionPestanas('cesion','NO')">Crear Cesi&oacute;n</button>
					</div>
					<hr>
					<br />
					<div id="formuGenPoli">
						<br />
						<h4>Datos de la P&oacute;liza</h4>
						<br />
						<!-- Tabla -->
						<table id="tablaPolizaVehi" class="table table-striped table-bordered" style="width:100%"></table>
					</div>
					<div class="modal-footer">
						<button type="button" id="redireccionPoliza" class="btn btn-primary d-none" onclick="redireccionPestanas('poliza','NO')">Crear P&oacute;liza</button>
					</div>
					<hr>
					<br />
					<div id="formuGenHistorico">
						<br />
						<h4>Hist&oacute;rico de Adscripciones</h4>
						<br />
						<!-- Tabla -->
						<table id="tablaHistoricoVehi" class="table table-striped table-bordered mb-2 mt-2" style="width:100%"></table>
					</div>
					<hr>
					<br />
				</div>
			</div>
			<!-- HISTORICO SERVICIOS ADSCRITOS -->
			<div class="tab-pane fade" id="historico" role="tabpanel" aria-labelledby="historico-tab">
				<div id="formuGenHistorico">
					<br />
					<h4>Hist&oacute;rico de Adscripciones</h4>
					<br />
					<!-- Tabla -->
					<table id="tablaHistorico" class="table table-striped table-bordered mb-2 mt-2" style="width:100%"></table>
				</div>
			</div>
			<!-- DOCUMENTOS DEL VEHICULO-->
			<div class="tab-pane fade" id="documento" role="tabpanel" aria-labelledby="documento-tab">
				<div id="formuGenDocumento">
					<form id="geneVehiculoDocumento" action="./guardarDocumentoVehiculo" enctype="multipart/form-data" method="POST">
						<input id="idVehiculoDocumento" name="fkVehiculo.id" type="hidden">
						<!-- Documento -->
						<fieldset id="zonaDocVehiculo">
							<br />
							<legend class="float-left">Documentos del Veh&iacute;culo</legend>
							<label id="lblFicheroVehiculo" for="fname" class="float-left">Adjunto (*)</label>
							<input type="file" id="ficheroVehiculo" name="ficheroVehiculo" size="25" accept="application/pdf" class="form-control">
						</fieldset>
						<!-- Observaciones -->
						<label for="fname" class="float-left">Observaciones</label>
						<textarea id="observacionesVehiculoDocumento" rows="4" cols="150" wrap="soft" class="form-control" name="observaciones" maxlength="1500"></textarea>
					</form>
					<!-- Tabla -->
					<table id="tablaVehiculoDocumento" class="table table-striped table-bordered mb-2 mt-2" style="width:100%"></table>
				</div>
				<div class="modal-footer">
					<button type="button" id="habilitarEdicionVehiDoc" class="btn btn-primary" onclick="habilitarEdicionVehiculoDocumento()">Habilitar Doc. Veh&iacute;culo</button>
					<button id="limpiaVehiculoDocumento" type="button" class="btn btn-primary float-right" onclick="clearModalGenVehiculoDocumento(this.id)">Limpiar</button>
					<button type="button" id="guardarVehiculoDocumento" class="btn btn-primary" onclick="crearDocumentoVehiculoGeneral()">Guardar</button>
				</div>
			</div>
			<!-- MATRICULA -->
			<div class="tab-pane fade" id="matricula" role="tabpanel" aria-labelledby="matricula-tab">
				<div id="formuGenMatr">
					<br />
					<h4>Datos de las Matr&iacute;culas</h4>
					<br />
					<form id="geneMatricula" action="./crearMatricula" method="POST">
						<input id="idVehiculoMatricula" name="fkVehiculo.id" type="hidden">	
						<input id="idMatricula" name="id" type="hidden">	
						<div class="form-row">
							<div class="float-left">
								<div class="col">
									<div class="row">
										<!-- Doblada -->
										<div class="custom-control custom-switch">
											<input type="checkbox" id="doblada" name="doblada" value="true" class="custom-control-input">
											<label id="lblDoblada" class="custom-control-label" for="doblada">Doblada</label>
										</div>
									</div>
								</div>
								<div class="row">
									<div class="col">
										<!-- Matricula -->
										<label id="lblNombre" for="lname" class="float-left">Matr&iacute;cula (*)</label>
										<input type="text" id="nombre" name="nombre" maxlength="50" class="form-control" onkeypress="return validaMatricula(event)">
										<!-- Fecha Matriculacion -->
										<label id="lblFechaMatriculacion" for="fname" class="float-left">Fecha Matriculaci&oacute;n (*)</label>
										<input type="date" id="fechaMatriculacion" name="fechaMatriculacion" class="form-control" pattern="dd-MM-yyyy" max='9999-12-31'/>
									</div>
									<div class="col">
										<!-- Tarjeta Repostaje -->
										<label for="lname" class="float-left">Tarjeta Repostaje</label>
										<input type="text" id="tarjetaRepostaje" name="tarjetaRepostaje" maxlength="50" class="form-control">
										<!-- Num Pin -->
										<label id="lblPin" for="lname" class="float-left">Pin</label>
										<input type="text" id="pin" name="pin" class="form-control"  maxlength="4" onkeypress="return soloNumeros(event)">
									</div>
									<div class="col">
										<!-- Tarjeta Peaje -->
										<label for="lname" class="float-left">Tarjeta Peaje</label>
										<input type="text" id="tarjetaPeaje" name="tarjetaPeaje" maxlength="50" class="form-control">
									</div>
								</div>
							</div>
						</div>
						<!-- Observaciones -->
							<label for="fname" class="float-left">Observaciones</label>
							<textarea id="observacionesMatricula" rows="4" cols="150" wrap="soft" class="form-control" name="observacionesMat" maxlength="1500"></textarea>
					 </form>
					<!-- Tabla -->
					<table id="tablaMatricula" class="table table-striped table-bordered" style="width:100%"></table>
				</div>
				<div class="modal-footer">
					<button type="button" id="habilitarEdicionMatr" class="btn btn-primary" onclick="habilitarEdicionMatricula()">Habilitar Matr&iacute;culas</button>
					<button id="limpiaMatricula" type="button" class="btn btn-primary float-right" onclick="clearModalGenMatricula(this.id)">Limpiar</button>
					<button id="guardaMatricula" type="button" class="btn btn-primary" onclick="crearMatriculaGeneral()">Guardar</button>
				</div>
			</div>
			<!-- EQUIPAMIENTO -->
			<div class="tab-pane fade" id="equipamiento" role="tabpanel" aria-labelledby="equipamiento-tab">
				<div id="avisoPermisoEquipamiento" class="classAviso d-none">Actualmente no dispone de permisos suficientes para acceder a &eacute;sta pantalla, por favor contacte con el Administrador</div>
				<div id="formuGenEquip">
					<br />
					<h4>Datos del Equipamiento</h4>
					<br />
					<form id="geneEquipamiento" action="./crearEquipamiento" method="POST">
						<input id="idVehiculoEquipamiento" name="fkVehiculo.id" type="hidden">
						<div class="form-row">
							<div class="col">
								<!-- Tipo Equipamiento -->
								<label id="lblEquipamiento" class="float-left">Tipo de Equipamiento (*)</label>
								<select class="form-control" id="fkTipoEquipamiento" name="fkTipoEquipamiento.id" class="float-left">
									<option value="">-- Seleccione --</option>
									<c:forEach items="${parametros}" var="parametro">
										<c:if test="${parametro.tipoParametro.codigo == 'EQ'}">
											<option value="${parametro.id}">${parametro.nombre}</option>
										</c:if>
									</c:forEach>
								</select>
							</div>
							<div class="col">
								<!-- Detalle -->
								<label for="lname" class="float-left">Datos</label>
								<input type="text" id="detalle" name="detalle" maxlength="500" class="form-control" disabled>
							</div>
						</div>
						<!-- Observaciones -->
						<label for="fname" class="float-left">Observaciones</label>
						<textarea id="observacionesEquipamiento" rows="4" cols="150" wrap="soft" class="form-control" name="observaciones" maxlength="1500"></textarea>
						<input type="hidden" id="idEquipamientoActualiza" name="id" class="form-control">
					</form>
					<!-- Tabla -->
					<table id="tablaEquipamiento" class="table table-striped table-bordered" style="width: 100%"></table>
				</div>
				<div id="footerBtnEquipamiento" class="modal-footer">
					<button type="button" id="habilitarEdicionEquipamiento" class="btn btn-primary" onclick="habilitarEdicionEquipamiento()">Habilitar Equipamiento</button>
					<button id="limpiaEquipamiento" type="button" class="btn btn-primary float-right" onclick="clearModalGenEquipamiento(this.id)">Limpiar</button>
					<button id="guardaEquipamiento" type="button" class="btn btn-primary" onclick="crearEquipamientoGeneral()">Guardar</button>
				</div>
			</div>
			<!-- MATERIAL -->
			<div class="tab-pane fade" id="material" role="tabpanel" aria-labelledby="material-tab">
				<div id="avisoPermisoMaterial" class="classAviso d-none">Actualmente no dispone de permisos suficientes para acceder a &eacute;sta pantalla, por favor contacte con el Administrador</div>
				<div id="formuGenMate">
					<br />
					<h4>Datos del Material</h4>
					<br />
					<form id="geneMaterial" action="./crearMaterial" method="POST">
						<input id="idVehiculoMaterial" name="fkVehiculo.id" type="hidden">	
						<div class="form-row">
							<div class="col">
								<!-- Tipo Material -->
								<label id="lblMaterial" class="float-left">Tipo de Material (*)</label>
								<select class="form-control" id="fkTipoMaterial" name="fkTipoMaterial.id" class="float-left">
									<option value="">-- Seleccione --</option>
									<c:forEach items="${parametros}" var="parametro">
										<c:if test = "${parametro.tipoParametro.codigo == 'MA'}">
											<option value="${parametro.id}">${parametro.nombre}</option>
										</c:if>		
									</c:forEach>
								</select>
							</div>
							<div class="col">
								<!-- Detalle -->
								<label for="lname" class="float-left">Datos</label>
								<input type="text" id="infoExtraMaterial" name="infoExtraMaterial" maxlength="500" class="form-control" disabled>
							</div>
						</div>
						<!-- Observaciones -->
						<label for="fname" class="float-left">Observaciones</label>
						<textarea id="observacionesMaterial" rows="4" cols="150" wrap="soft" class="form-control" name="observaciones" maxlength="1500"></textarea>
						<input type="hidden" id="idMaterialActualiza" name="id" class="form-control">
					</form>	     
					<!-- Tabla -->
					<table id="tablaMaterial" class="table table-striped table-bordered mb-2 mt-2" style="width:100%"></table>
				</div>
				<div id="footerBtnMaterial" class="modal-footer" >
					<button type="button" id="habilitarEdicionMaterial"  class="btn btn-primary" onclick="habilitarEdicionMaterial()">Habilitar Material</button>
					<button id="limpiaMaterial" type="button" class="btn btn-primary float-right" onclick="clearModalGenMaterial(this.id)">Limpiar</button>
					<button id="guardaMaterial" type="button" class="btn btn-primary" onclick="crearMaterialGeneral()">Guardar</button>
				</div>
			</div>
			<!-- CESION -->
			<div class="tab-pane fade" id="cesion" role="tabpanel" aria-labelledby="cesion-tab">
				<div id="avisoPermisoCesion" class="classAviso d-none">Actualmente no dispone de permisos suficientes para acceder a &eacute;sta pantalla, por favor contacte con el Administrador</div>
				<div id="formuGenCes">
					<br />
					<h4>Datos de la Cesi&oacute;n</h4>
					<br />
					<form id="geneCesion" action="./crearCesion" method="POST">
						<input id="idVehiculoCesion" name="fkVehiculo.id" type="hidden">	
						<div class="form-row">
							<div class="col">
								<!-- Tipo Motivo -->
								<label id="lblMotivo" class="float-left">Motivo (*)</label>
								<select class="form-control" id="fkParametroTipoMotivo" name="fkParametroTipoMotivo.id" class="float-left">
									<option value="">-- Seleccione --</option>
									<c:forEach items="${parametros}" var="parametro">
										<c:if test = "${parametro.tipoParametro.codigo == 'MO'}">
											<option value="${parametro.id}">${parametro.nombre}</option>
										</c:if>		
									</c:forEach>
								</select>
								<!-- kmInciales -->
								<label for="lname" id="lblKmIniciales" class="float-left">Kil&oacute;metros Iniciales</label>
								<input type="text" id="kmIniciales" name="kmIniciales" class="form-control" maxlength="9" onkeypress="return soloNumeros(event)">
								<!-- Fecha Inicio -->
								<label for="inicio" id="lblInicio" class="float-left">Fecha Inicio</label>
								<input type="text" id="inicio" name="fechaInicio" maxlength="10" class="form-control"/>
							</div>
							<div class="col">
								<!-- Destino -->
								<label id="lblDestino" class="float-left">Destino (*)</label>
								<select class="form-control" id="cesionDestino" name="fkServicioAdscrito.id" class="float-left">
									<option value="">-- Seleccione --</option>
									<c:forEach items="${servicios}" var="servicio">
											<option value="${servicio.id}">${servicio.nombre}</option>	
									</c:forEach>
								</select>
								<!-- kmFinales -->
								<label for="lname" id="lblKmFinales" class="float-left">Kil&oacute;metros Finales</label>
								<input type="text" id="kmFinales" name="kmFinales" class="form-control" maxlength="9" onkeypress="return soloNumeros(event)">
								<!-- Fecha Fin -->
								<label for="fin" id="lblFin" class="float-left">Fecha Fin</label>
								<input type="text" id="fin" name="fechaFin" maxlength="10" class="form-control"/>
							</div>
						</div>
						<!-- Observaciones -->
						<label for="fname" class="float-left">Observaciones</label>
						<textarea id="observacionesCesion" rows="4" cols="150" wrap="soft" class="form-control" name="observaciones" maxlength="2000"></textarea>
						<input type="hidden" id="idCesionActualiza" name="id" class="form-control">
					</form>
					<!-- Tabla -->
					<table id="tablaCesion" class="table table-striped table-bordered" style="width:100%"></table>
				</div>
				<div id="footerBtnCesion" class="modal-footer">
					<button type="button" id="habilitarEdicionCesion" class="btn btn-primary" onclick="habilitarEdicionCesion()">Habilitar Cesi&oacute;n</button>
					<button id="limpiaCesion" type="button" class="btn btn-primary float-right" onclick="clearModalGenCesion(this.id)">Limpiar</button>
					<button id="guardaCesion" type="button" class="btn btn-primary" onclick="crearCesionGeneral()">Guardar</button>
				</div>
			</div>
			<!-- REPOSTAJE -->
			<div class="tab-pane fade" id="repostaje" role="tabpanel" aria-labelledby="repostaje-tab">
				<div id="avisoPermisoRepostaje" class="classAviso d-none">Actualmente no dispone de permisos suficientes para acceder a &eacute;sta pantalla, por favor contacte con el Administrador</div>
				<div id="formuGenRep">
					<br />
					<h4>Datos del Repostaje</h4>
					<br />
					<form id="geneRepostaje" action="./crearRepostaje" method="POST">
						<input id="nombreMatriculaRepostaje" name="nombreMatriculaRepostaje" type="hidden">
						<input id="idRepostajeActualiza" name="id" type="hidden">
						<input id="idVehiculoRepostaje" name="fkVehiculo.id" type="hidden">	
						<div class="form-row">
							<div class="col">
								<!-- Matricula -->
								<label for="lmatrepo" id="lblMatriculaRepo" class="float-left">Matr&iacute;cula (*)</label>
								<select class="form-control" id="matriculaRepo" name="fkMatricula.id" class="float-left">
									<option value="">-- Seleccione --</option>
								</select>
								<!-- Num Kilometros -->
								<label for="lname" id="lblKilometros" class="float-left">N&ordm; Kil&oacute;metros</label>
								<input type="text" id="kilometros" name="kilometros" class="form-control"  maxlength="9" onkeypress="return soloNumeros(event)">
							</div>
							<div class="col">
								<!-- Num Litros -->
								<label for="lname" id="lblLitros" class="float-left">N&ordm; Litros</label>
								<input type="text" id="litros" name="litros" class="form-control"  maxlength="9" onkeypress="return soloNumeros(event)">
								<!-- Fecha Repostaje -->
								<label id="lblFechaRepostaje" for="fname" class="float-left">Fecha Repostaje (*)</label>
								<input type="date" id="fechaRepostaje" name="fechaRepostaje" class="form-control" pattern="dd-MM-yyyy" max='9999-12-31'/>
							</div>
							<div class="col">
								<!-- Importe -->
								<label id="lblImporte" for="lname" class="float-left">Importe (*)</label>
								<input type="text" id="importe" name="importe" class="form-control"  maxlength="9" onkeypress="return soloNumeros(event)">
							</div>
						</div>
						<div class="form-row">
							<div class="col-8">
								<!-- Descripción -->
								<label id="lblDescripcion" for="ldesrepo" class="float-left">Descripci&oacute;n</label>
								<input type="text" id="descripcion" name="descripcion" class="form-control" maxlength="100">
							</div>
						</div>					
						<!-- Observaciones -->
						<label for="fname" class="float-left">Observaciones</label>
						<textarea id="observacionesRepostaje" rows="4" cols="150" wrap="soft" class="form-control" name="observaciones" maxlength="1500"></textarea>
					</form>
					<!-- Tabla -->
					<table id="tablaRepostaje" class="table table-striped table-bordered" style="width:100%"></table>
				</div>
				<div id="footerBtnRepostaje" class="modal-footer">
					<button type="button" id="habilitarEdicionRepostaje" class="btn btn-primary" onclick="habilitarEdicionRepostaje()">Habilitar Repostaje</button>
					<button id="limpiaRepostaje" type="button" class="btn btn-primary float-right" onclick="clearModalGenRepostaje(this.id)">Limpiar</button>
					<button id="guardaRepostaje" type="button" class="btn btn-primary" onclick="crearRepostajeGeneral()">Guardar</button>
				</div>
			</div>
			<!-- SINIESTRO -->
			<div class="tab-pane fade" id="siniestro" role="tabpanel" aria-labelledby="siniestro-tab">
				<div id="avisoPermisoSiniestro" class="classAviso d-none">Actualmente no dispone de permisos suficientes para acceder a &eacute;sta pantalla, por favor contacte con el Administrador</div>
				<div id="formuGenSini">
					<br />
					<h4>Datos del Siniestro</h4>
					<br />
					<form id="geneSiniestro" action="./crearSiniestro" method="POST">
						<input id="idSiniestroActualiza" name="id" type="hidden">
						<input id="idVehiculoSiniestro" name="fkVehiculo.id" type="hidden">	
						<div class="form-row">
							<!-- Columna 1 -->
							<div class="col">
								<!-- Matricula -->
								<label for="lmatsini" id="lblMatriculaSini" class="float-left">Matr&iacute;cula (*)</label>
								<select class="form-control" id="matriculaSini" name="fkMatricula.id" class="float-left">
									<option value="">-- Seleccione --</option>
								</select>
								<!-- Lugar Siniestro -->
								<label for="fname" class="float-left">Lugar</label>
								<input type="text" id="lugarSiniestro" name="lugarSiniestro" maxlength="500" class="form-control">
								<!-- Conductor Contrario -->
								<label for="fname" class="float-left">Conductor Contrario</label>
								<input type="text" id="conductorContrario" name="conductorContrario" maxlength="500" class="form-control">				
							</div>
							<!-- Columna 2 -->
							<div class="col">
								<!-- Fecha Siniestro -->
								<label id="lblFechaSiniestro" class="float-left">Fecha (*)</label>
								<input type="date" id="fechaSiniestro" name="fechaSiniestro" class="form-control" pattern="dd-MM-yyyy" max='9999-12-31'/>
								<!-- Conductor -->
								<label for="fname" class="float-left">Conductor</label>
								<input type="text" id="conductor" name="conductor" maxlength="500" class="form-control">
								<!-- Compania Contraria -->
								<label for="fname" class="float-left">Compa&ntilde;&iacute;a Contraria</label>
								<input type="text" id="companiaContrario" name="companiaContrario" maxlength="250" class="form-control">
							</div>
							<!-- Columna 3 -->
							<div class="col">			
								<!-- Hora Siniestro -->
								<label for="fname" id="horaLabel" class="float-left">Hora</label>
								<input type="text" id="horaSiniestro" name="horaSiniestro" maxlength="5" class="form-control" onkeypress="return soloNumerosHora(event)" placeholder="HH:mm">					
								<!-- Numero Expediente -->
								<label for="fname" class="float-left">N&uacute;mero Expediente</label>
								<input type="text" id="numeroExpediente" name="numeroExpediente" maxlength="50" class="form-control">
								<!-- Poliza Contrario -->
								<label for="fname" class="float-left">P&oacute;liza Contrario</label>
								<input type="text" id="polizaContrario" name="polizaContrario" maxlength="50" class="form-control">
							</div>
						</div>
						<!-- Danos -->
						<label for="fname" class="float-left">Da&ntilde;os</label>
						<textarea id="danos" rows="4" cols="150" wrap="soft" class="form-control" name="danos" maxlength="1500"></textarea>
						<!-- Observaciones -->
						<label for="fname" class="float-left">Observaciones</label>
						<textarea id="observacionesSiniestro" rows="4" cols="150" wrap="soft" class="form-control" name="observaciones" maxlength="1500"></textarea>
					</form>
					<!-- Tabla -->
					<table id="tablaSiniestro" class="table table-striped table-bordered" style="width:100%"></table>
				</div>
				<div id="footerBtnSiniestro" class="modal-footer">
					<button type="button" id="habilitarEdicionSiniestro"  class="btn btn-primary" onclick="habilitarEdicionSiniestro()">Habilitar Siniestro</button>
					<button id="limpiaSiniestro" type="button" class="btn btn-primary float-right" onclick="clearModalGenSiniestro(this.id)">Limpiar</button>
					<button id="guardaSiniestro" type="button" class="btn btn-primary" onclick="crearSiniestroGeneral()">Guardar</button>					     
				</div>
			</div>
			<!-- POLIZA -->
			<div class="tab-pane fade" id="poliza" role="tabpanel" aria-labelledby="poliza-tab">
				<div id="avisoPermisoPoliza" class="classAviso d-none">Actualmente no dispone de permisos suficientes para acceder a &eacute;sta pantalla, por favor contacte con el Administrador</div>
				<div id="formuGenPoli">
					<br />
					<h4>Datos de la P&oacute;liza</h4>
					<br />
					<form id="genePoliza" action="./crearPoliza" method="POST">
						<input id="idVehiculoPoliza" name="fkVehiculo.id" type="hidden">	
						<input id="idPolizaActualiza" name="id" type="hidden">	
						<div class="form-row">
							<!-- Columna 1 -->
							<div class="col">
								<!-- Matricula -->
								<label for="lmatpoli" id="lblMatriculaPoli" class="float-left">Matr&iacute;cula (*)</label>
								<select class="form-control" id="matriculaPoli" name="fkMatricula.id" class="float-left">
									<option value="">-- Seleccione --</option>
								</select>
								<!-- Fecha Inicio -->
								<label id="etiquetaFechaInicio" for="fname" class="float-left">Fecha Inicio (*)</label>
								<input type="text" id="inicioPol" name="fechaInicio" maxlength="10" class="form-control">
								<!-- Direccion -->
								<label for="fname" id="etiquetaDireccion" class="float-left">Direcci&oacute;n</label>
					  			<input type="text" id="direccion" name="direccion" maxlength="500" class="form-control">						
							</div>
							<!-- Columna 2 -->
							<div class="col">
								<!-- Compania -->
								<label id="etiquetaCompania" class="float-left">Compa&ntilde;&iacute;a (*)</label>
								<select class="form-control" id="fkCompania" name="fkCompania.id" class="float-left">
									<option value="">-- Seleccione --</option>
									<c:forEach items="${companias}" var="compania">
										<option value="${compania.id}">${compania.nombre}</option>
									</c:forEach>
								</select>
								<!-- Fecha Fin -->
								<label id="etiquetaFechaFin" for="fname" class="float-left">Fecha Fin</label>
								<input type="text" id="finPol" name="fechaFin" maxlength="10" class="form-control">
								<!-- Telefono -->
								<label for="fname" id="etiquetaTelefono" class="float-left">Tel&eacute;fono </label>
					  			<input type="text" id="telefono" name="telefono" maxlength="50" onkeypress="return soloNumerosTelefonos(event)" class="form-control">
							</div>
							<!-- Columna 3 -->
							<div class="col">
								<!-- N Poliza -->
								<label id="etiquetaPoliza" for="fname" class="float-left">N&ordm; P&oacute;liza (*)</label>
								<input type="text" id="numeroPoliza" name="numeroPoliza" maxlength="50" class="form-control">
								<!-- NIF -->
								<label for="fname" id="etiquetaNIF" class="float-left">NIF</label>
								<input type="text" id="nif" name="nif" maxlength="10" class="form-control">
								<!-- Contacto -->
								<label for="fname" id="etiquetaContacto" class="float-left">Contacto</label>
					  			<input type="text" id="contacto" name="contacto" maxlength="250" class="form-control">
							</div>
						</div>
						<!-- Observaciones -->
						<label for="fname" class="float-left">Observaciones</label>
						<textarea id="observacionesPoliza" rows="4" cols="150" wrap="soft" class="form-control" name="observaciones" maxlength="1500"></textarea>
					</form>
					<!-- Tabla -->
					<table id="tablaPoliza" class="table table-striped table-bordered" style="width:100%"></table>
				</div>
				<div id="footerBtnPoliza" class="modal-footer">
					<button type="button" id="habilitarEdicionPoliza"  class="btn btn-primary" onclick="habilitarEdicionPoliza()">Habilitar P&oacute;liza</button>
					<button id="limpiaPoliza" type="button" class="btn btn-primary float-right" onclick="clearModalGenPoliza(this.id)">Limpiar</button>
					<button id="guardaPoliza" type="button" class="btn btn-primary" onclick="crearPolizaGeneral()">Guardar</button>					     
				</div>
			</div>
			<!-- ITV -->
			<div class="tab-pane fade" id="itv" role="tabpanel" aria-labelledby="itv-tab">
				<div id="avisoPermisoItv" class="classAviso d-none">Actualmente no dispone de permisos suficientes para acceder a &eacute;sta pantalla, por favor contacte con el Administrador</div>
				<div id="formuGenItv">
					<br />
					<h4>Datos de la Itv</h4>
					<br />
					<form id="geneItv" action="./crearItv" method="POST">
						<input id="idVehiculoItv" name="fkVehiculo.id" type="hidden">
						<input id="idItvActualiza" name="id" type="hidden">
						<div class="form-row">
							<div class="float-left">
								<div class="col">
									<div class="row ">
										<!-- itvSuperada -->
										<div class="custom-control custom-switch">
											<input type="checkbox" id="itvSuperada" name="itvSuperada" value="true" class="custom-control-input">
											<label id="lblItvSuperada" class="custom-control-label"	for="itvSuperada">Superada</label>
										</div>
									</div>
									<div class="row">
										<!-- leves -->
										<div class="custom-control custom-switch">
											<input type="checkbox" id="leves" name="leves" value="true" class="custom-control-input">
											<label class="custom-control-label" for="leves">Leves</label>
										</div>
									</div>
								</div>
								<div class="row">
									<div class="col">
										<!-- Matricula -->
										<label for="lmatitv" id="lblMatriculaItv" class="float-left">Matr&iacute;cula (*)</label>
										<select class="form-control" id="matriculaItv" name="fkMatricula.id" class="float-left">
											<option value="">-- Seleccione --</option>
										</select>
									</div>
									<div class="col">
										<!-- Fecha Itv -->
										<label id="lblFechaItv" for="fechaItv" class="float-left">Fecha	Realizaci&oacute;n(*)</label>
										<input type="date" id="fechaItv" name="fechaItv" class="form-control" pattern="dd-MM-yyyy" max='9999-12-31'/>
									</div>
									<div class="col">
										<!-- Fecha Siguiente -->
										<label id="lblFechaSiguienteItv" for="fechaSiguienteItv" class="float-left"> Fecha Pr&oacute;xima Realizaci&oacute;n(*)</label>
										<input type="date" id="fechaSiguienteItv" name="fechaSiguienteItv" class="form-control" pattern="dd-MM-yyyy" max='9999-12-31'/>
									</div>
								</div>
							</div>
						</div>
						<!-- Observaciones -->
						<label for="fname" class="float-left">Observaciones</label>
						<textarea id="observacionesItv" rows="4" cols="150" wrap="soft"	class="form-control" name="observaciones" maxlength="1500"></textarea>
					</form>
					<!-- Tabla -->
					<table id="tablaItv" class="table table-striped table-bordered"	style="width: 100%"></table>
				</div>
				<div id="footerBtnItv" class="modal-footer">
					<button type="button" id="habilitarEdicionItv" class="btn btn-primary" onclick="habilitarEdicionItv()">Habilitar Itv</button>
					<button id="limpiaItv" type="button" class="btn btn-primary float-right" onclick="clearModalGenItv(this.id)">Limpiar</button>
					<button id="guardaItv" type="button" class="btn btn-primary" onclick="crearItvGeneral()">Guardar</button>					     
				</div>
			</div>
			<!-- INFRACCION -->
			<div class="tab-pane fade" id="infraccion" role="tabpanel" aria-labelledby="infraccion-tab">
				<div id="avisoPermisoInfraccion" class="classAviso d-none">Actualmente no dispone de permisos suficientes para acceder a &eacute;sta pantalla, por favor contacte con el Administrador</div>
				<div id="formuGenInfra">
					<br />
					<h4>Datos de la Infracci&oacute;n</h4>
					<br />
					<form id="geneInfraccion" action="./crearInfraccion" method="POST">
						<input id="idVehiculoInfraccion" name="fkVehiculo.id" type="hidden">
						<input id="idInfraccionActualiza" name="id" type="hidden">	
						<div class="form-row">
							<!-- Columna 1 -->
							<div class="col">
								<!-- Matricula -->
								<label for="lmatinfr" id="lblMatriculaInfr" class="float-left">Matr&iacute;cula (*)</label>
								<select class="form-control" id="matriculaInfr" name="fkMatricula.id" class="float-left">
									<option value="">-- Seleccione --</option>
								</select>
								<!-- Conductor -->
								<label for="fname" class="float-left">Conductor</label>
					  			<input type="text" id="conductor" name="conductor" class="form-control" maxlength="500">
					  			<!-- Importe -->
								<label for="fname" id="lblImporte" class="float-left">Importe</label>
					  			<input type="text" id="importeInfraccion" name="importe" class="form-control" maxlength="9" onkeypress="return soloNumeros(event)">
							</div>
							<!-- Columna 2 -->
							<div class="col">
								<!-- Fecha Infraccion -->
								<label id="lblFechaInfraccion" class="float-left">Fecha Infracci&oacute;n(*)</label>
								<input type="date" id="fechaInfraccion" name="fechaInfraccion" class="form-control" pattern="dd-MM-yyyy" max='9999-12-31'/>
								<!-- Numero Expediente -->
								<label for="fname" class="float-left">N&uacute;mero Expediente</label>
					  			<input type="text" id="nexpediente" name="nexpediente" class="form-control" maxlength="50">
					  			<!-- Motivo -->
								<label for="fname" class="float-left">Motivo</label>
					  			<input type="text" id="motivo" name="motivo" class="form-control" maxlength="250">
							</div>
							<!-- Columna 3 -->
							<div class="col">
								<!-- Hora Infraccion -->
								<label for="fname" id="horaLabel" class="float-left">Hora</label>
					  			<input type="text" id="horaInfraccion" name="horaInfraccion" class="form-control" maxlength="5" onkeypress="return soloNumerosHora(event)" placeholder="HH:mm">
								<!-- Lugar Infraccion -->
								<label for="fname" class="float-left">Lugar</label>
					  			<input type="text" id="lugarInfraccion" name="lugarInfraccion" class="form-control" maxlength="500">
							</div>
						</div>
						<!-- Danos aunque pase a llamarse visualmente Descripcion -->
						<label for="fname" class="float-left">Descripci&oacute;n</label>
					  	<textarea id="danos" rows="4" cols="150" wrap="soft" class="form-control" name="danos" maxlength="1500"></textarea>
						<!-- Observaciones -->
						<label for="fname" class="float-left">Observaciones</label>
						<textarea id="observacionesInfraccion" rows="4" cols="150" wrap="soft" class="form-control" name="observaciones" maxlength="1500"></textarea>
					</form>
					<!-- Tabla -->
					<table id="tablaInfraccion" class="table table-striped table-bordered" style="width:100%"></table>
				</div>
				<div id="footerBtnInfraccion" class="modal-footer">
					<button type="button" id="habilitarEdicionInfraccion" class="btn btn-primary" onclick="habilitarEdicionInfraccion()">Habilitar Infracci&#243;n</button>
					<button id="limpiaInfraccion" type="button" class="btn btn-primary float-right" onclick="clearModalGenInfraccion(this.id)">Limpiar</button>
					<button id="guardaInfraccion" type="button" class="btn btn-primary" onclick="crearInfraccionGeneral()">Guardar</button>					     
				</div>
			</div>
			<!-- Mantenimiento -->
			<div class="tab-pane fade" id="mantenimiento" role="tabpanel" aria-labelledby="mantenimiento-tab">
				<div id="avisoPermisoMantenimiento" class="classAviso d-none">Actualmente no dispone de permisos suficientes para acceder a &eacute;sta pantalla, por favor contacte con el Administrador</div>
				<div id="formuGenMant">
					<br />
					<h4>Datos del Mantenimiento</h4>
					<br />
					<form id="geneMantenimiento" action="./crearMantenimiento" method="POST">
						<input id="idMantenimientoActualiza" name="id" type="hidden">
						<input id="idVehiculoMantenimiento" name="fkVehiculo.id" type="hidden">
						<div class="form-row">
							<div class="float-left">
								<div class="row">
									<!-- Columna 1 -->
									<div class="col">
										<!-- Matricula -->
										<label for="lmatmant" id="lblMatriculaMant" class="float-left">Matr&iacute;cula (*)</label>
										<select class="form-control" id="matriculaMant" name="fkMatricula.id" class="float-left">
											<option value="">-- Seleccione --</option>
										</select>
										<!-- Tipo de Vehiculo -->
										<label for="fname" class="float-left">Tipo de Veh&iacute;culo</label>
										<input type="text" id="tipoVehiculoMant" name="tipoVehiculoMant" class="form-control" readonly>
										<!-- Base Imponible -->
										<label for="fname" class="float-left">Base Imponible</label>
										<input type="text" id="baseImponible" name="baseImponible" maxlength="5" class="form-control" readonly>
										<!-- Fecha Autorizacion -->
										<label id="lblFechaAutorizacionMant" class="float-left">Fecha Autorizaci&oacute;n</label>
										<input type="date" id="fechaAutorizacion" name="fechaAutorizacion" class="form-control" pattern="dd-MM-yyyy" max='9999-12-31'/>
										<!-- Nº de Fatcura -->
										<label for="fname" class="float-left">Nº de Factura</label>
										<input type="text" id="numeroFactura" name="numeroFactura" maxlength="50" class="form-control">
										<!-- Fecha Intervencion (Nuevo Campo)-->
										<!-- SVEHI-288. Se anade nuevo campo fecha intervencion  -->
										<label for="fname" id="lblFechaIntervervencion" class="float-left">Fecha de intervenci&oacute;n</label>
										<input type="date" id="fechaIntervencion" name="fechaIntervencion" class="form-control" pattern="dd-MM-yyyy" max='9999-12-31'>
									</div>
									<!-- Columna 2 -->
									<div class="col">
										<!-- Marca -->
										<label for="fname" class="float-left">Marca</label>
										<input type="text" id="marcaMant" name="marcaMant" class="form-control" readonly>
										<!-- Servicio Adscrito -->
										<label for="fname" class="float-left">Servicio Adscrito</label>
										<input type="text" id="serviciAdsMant" name="serviciAdsMant" class="form-control" readonly>
										<!-- Precio Total -->
										<!-- SVEHI-288. Quitamos el readonly para que pueda ser editable. id del label se anadio nuevo tambien -->
										<label for="fname" id="lblPrecioTotal" class="float-left">Precio Total (*)</label>
										<input type="text" id="precioTotal" name="precioTotal" maxlength="20" class="form-control" onkeypress="return soloNumeros(event)" readonly>
										<!-- KM INI -->
										<label for="fname" class="float-left">Km del veh&iacute;culo</label>
										<input type="text" id="kmInicial" name="kmInicial" maxlength="9" class="form-control" onkeypress="return soloNumeros(event)">
										<!-- Fecha Factura -->
										<label id="lblFechaFacturaMant" class="float-left">Fecha de Factura</label>
										<input type="date" id="fechaFactura" name="fechaFactura" class="form-control" pattern="dd-MM-yyyy" max='9999-12-31'/>
									</div>
									<!-- Columna 3 -->
									<div class="col">
										<!-- Modelo -->
										<label for="fname" class="float-left">Modelo</label>
										<input type="text" id="modeloMant" name="modeloMant" maxlength="50" class="form-control" readonly>
										<!-- Uso -->
										<label for="fname" class="float-left">Uso</label>
										<input type="text" id="usoMant" name="usoMant" maxlength="250" class="form-control" readonly>
										<!-- Taller -->
										<label for="fname" id="lblTallerMant" class="float-left">Taller (*)</label>
										<select class="form-control" id="tallerMant" name="fkTaller.id" class="float-left">
											<option value="">-- Seleccione --</option>
										</select>
										<!-- Reparacion -->
										<!--  SVEHI-288. -->
										<label for="fname" id="lblReparacionMant" class="float-left">Reparaci&oacute;n (*)</label>
										<select class="form-control" id=reparacionMant name="fkParametroTipoReparacion.id" class="float-left">
											<option value="">-- Seleccione --</option>
												<c:forEach items="${parametros}" var="parametro">
													<c:if test="${parametro.tipoParametro.codigo == 'TR'}">
														<option value="${parametro.id}">${parametro.nombre}</option>
													</c:if>
												</c:forEach>
										</select>
										<!-- IVA -->
										<!-- SVEHI-288. Se anade readonly para que solo sea modo lectura. Se ha quitado el (*) -->
										<label for="fname" id="lblIVAMant" class="float-left">IVA</label>
										<input type="text" id="iva" name="iva" maxlength="3" class="form-control" onkeypress="return soloNumeros(event)" readonly>
									</div>
								</div>
								<div class="col">
									<div class="row">
										<div class="custom-control custom-switch">
											<input type="checkbox" id="finalizado" name="finalizado" value="true" class="custom-control-input">
											<label id="lblMantenimientoFinalizado" class="custom-control-label"	for="finalizado">Finalizado</label>
										</div>
									</div>
								</div>
							</div>
						</div>
						<!-- Observaciones -->
						<label for="fname" class="float-left">Observaciones</label>
						<textarea id="observaciones" rows="4" cols="150" wrap="soft" class="form-control" name="observaciones" maxlength="1500"></textarea>
					</form>
				</div>
				<div id="footerBtnMantenimiento" class="modal-footer">
					<button type="button" id="habilitarEdicionMantenimiento"  class="btn btn-primary" onclick="habilitarEdicionMantenimiento()">Habilitar Mantenimiento</button>
					<button id="limpiaMantenimiento" type="button" class="btn btn-primary float-right" onclick="clearModalGenMantenimiento(this.id)">Limpiar</button>
					<button id="guardaMantenimiento" type="button" class="btn btn-primary" onclick="crearMantenimientoGeneral()">Guardar</button>					     
				</div>
				<!-- Tabla Mantenimientos -->
				<table id="tablaMantenimiento" class="table table-striped table-bordered" style="width:100%"></table>
			</div>
		</div>
		<!-- HASTA AQUI -->
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal" onclick="resetModalGeneral()">Cerrar</button>
      </div>
    </div>
  </div>
</div>
<script src="resources/js/date-eu.js" charset="utf-8"></script>