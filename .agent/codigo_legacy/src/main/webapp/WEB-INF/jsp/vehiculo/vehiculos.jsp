<!-- Boton Nuevo Vehiculo -->
<div class="container mt-2 mb-2">
	<div class="row">
		<div class="col">
			<h1><strong><em>Veh&iacute;culos</em></strong></h1>
		</div>
	</div>
	<div class="row">
		<!-- Doblada -->
		<div id="dobladaDiv" class="ml-3 custom-control custom-switch d-none">
			<input type="checkbox" id="dobladaVehi" onclick="filtroDobladaVehi();" name="dobladaVehi" value="true" class="custom-control-input">
			<label id="lblDobladaVehi" class="custom-control-label" for="dobladaVehi">Doblada</label>								
		</div>
		<div class="col mb-2">
			<button type="button" id="botonNuevoVehiculo" class="btn btn-success float-right" hidden="true" onclick="nuevoVehiculo()"><span class="fa fa-plus"></span><span class="hidden-xs"> Nuevo Veh&iacute;culo</span></button>
			<button style="margin-right: 5px;" type="button" id="botonFiltroVehiculo" class="btn btn-success float-right" hidden="true" onclick="nuevoFiltroVehiculo()"><span class="fa fa-filter"></span><span class="hidden-xs"> Filtro</span></button>
			<button style="margin-right: 5px;" type="button" id="botonEliminarFiltroVehiculo" class="btn btn-danger float-right" hidden="true" onclick="eliminarFiltroVehiculo()"><span class="fa fa-window-close"></span></button>
		</div>
	</div>
	<div class="row">
		<div class="col">
			<!-- Cuadro de aviso -->
			<div id="avisoPermisoVehiculo" class="classAviso d-none">Actualmente no dispone de permisos suficientes para acceder a &eacute;sta pantalla, por favor contacte con el Administrador</div>
			<!-- Tabla -->
			<table id="tablaVehiculo" class="table table-striped table-bordered mb-2"></table>
		</div>
	</div>
	<div class="row">
		<div class="col">
			<div id="totvehi" class="float-left d-none">Total de Veh&iacute;culos: ${total}</div>
		</div>
	</div>
</div>
<!-- Modal General Vehiculo-->
<jsp:include page="modal/modalGeneral.jsp"/>
<!-- Modal Eliminar Vehiculo General-->
<jsp:include page="modal/modalEliminarVehiculoGeneral.jsp"/>
<!-- Modal Eliminar VehiculoDocumento General-->
<jsp:include page="modal/modalEliminarDocumentoVehiculoGeneral.jsp"/>
<!-- Modal Eliminar Matricula General-->
<jsp:include page="modal/modalEliminarMatriculaGeneral.jsp"/>
<!-- Modal Eliminar Equipamiento General -->
<jsp:include page="modal/modalEliminarEquipamientoGeneral.jsp"/>
<!-- Modal Eliminar Material General-->
<jsp:include page="modal/modalEliminarMaterialGeneral.jsp"/>
<!-- Modal Eliminar Cesion General-->
<jsp:include page="modal/modalEliminarCesionGeneral.jsp"/>
<!-- Modal Eliminar Repostaje General-->
<jsp:include page="modal/modalEliminarRepostajeGeneral.jsp"/>
<!-- Modal Eliminar Siniestro General -->
<jsp:include page="modal/modalEliminarSiniestroGeneral.jsp"/>
<!-- Modal Eliminar SiniestroDocumento General-->
<jsp:include page="modal/modalEliminarDocumentoSiniestroGeneral.jsp"/>
<!-- Modal Eliminar Poliza General-->
<jsp:include page="modal/modalEliminarPolizaGeneral.jsp"/>
<!-- Modal Eliminar PolizaDocumento General-->
<jsp:include page="modal/modalEliminarDocumentoPolizaGeneral.jsp"/>
<!-- Modal Eliminar Itv General -->
<jsp:include page="modal/modalEliminarItvGeneral.jsp"/>
<!-- Modal Eliminar ItvDocumento General -->
<jsp:include page="modal/modalEliminarDocumentoItvGeneral.jsp"/>
<!-- Modal Eliminar Infraccion General-->
<jsp:include page="modal/modalEliminarInfraccionGeneral.jsp"/>
<!-- Modal Eliminar InfraccionDocumento General-->
<jsp:include page="modal/modalEliminarDocumentoInfraccionGeneral.jsp"/>
<!-- Modal Eliminar Mantenimiento General-->
<jsp:include page="modal/modalEliminarMantenimientoGeneral.jsp"/>
<!-- Modal Eliminar MantenimientoDocumento General-->
<jsp:include page="modal/modalEliminarDocumentoMantenimientoGeneral.jsp"/>
<!-- Modal Eliminar MantenimientoConcepto General-->
<jsp:include page="modal/modalEliminarMantenimientoConceptoGeneral.jsp"/>
<!-- Modal Filtrar Vehiculo-->
<jsp:include page="modal/modalFiltroVehiculo.jsp"/>
<!-- Modal Documento Siniestro General-->
<jsp:include page="modal/modalSiniestroDocumentoGeneral.jsp"/>
<!-- Modal Documento Poliza General-->
<jsp:include page="modal/modalPolizaDocumentoGeneral.jsp"/>
<!-- Modal Documento Itv General -->
<jsp:include page="modal/modalItvDocumentoGeneral.jsp"/>
<!-- Modal Documento Infraccion General -->
<jsp:include page="modal/modalInfraccionDocumentoGeneral.jsp"/>
<!-- Modal Documento Mantenimiento General -->
<jsp:include page="modal/modalMantenimientoDocumentoGeneral.jsp"/>
<!-- Modal Nuevo Vehiculo-->
<jsp:include page="modal/modalVehiculo.jsp"/>
<!-- Modal Conceptos de Mantenimiento General -->
<jsp:include page="modal/modalMantenimientoConceptoGeneral.jsp"/>
<!-- JS -->
<script src="resources/js/vehiculo.js" charset="utf-8"></script>

<!-- Incluye DataTables CSS y JS -->
<link rel="stylesheet" type="text/css" href="resources/css/jquery.dataTables-1.10.24.min.css">
<script src="resources/js/jquery.dataTables-1.10.24.min.js"></script>

<!-- Incluye DataTables Buttons CSS y JS -->
<link rel="stylesheet" type="text/css" href="resources/css/buttons.dataTables-1.7.1.min.css">
<script src="resources/js/dataTables.buttons-1.7.1.min.js"></script>
<script src="resources/js/buttons.html5-1.7.1.min.js"></script>

<!-- Incluye pdfMake -->
<script src="resources/js/jszip-3.1.3.min.js"></script>
<script src="resources/js/pdfmake-0.1.32.min.js"></script>
<script src="resources/js/vfs_fonts-0.1.32.js"></script>
<script src="resources/js/accent-neutralise-1.13.7.js"></script>