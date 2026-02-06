<div class="container mt-2 mb-2">
	<div class="row">
		<div class="col">
			<h1><strong><em>Permisos</em></strong></h1>
		</div>
	</div>
	<div class="row">
		<div class="col mb-2">
			<button type="button" id="botonNuevoPermiso" class="editar edit-modal btn btn-success float-right"  hidden="true" onclick="nuevoPermiso()"><span class="fa fa-plus"></span><span class="hidden-xs"> Nuevo Permiso</span></button>
		</div>
	</div>
	<div class="row">
		<div class="col">
			<!-- Cuadro de aviso -->
			<div id="avisoPermiso" class="classAviso d-none">Actualmente no dispone de permisos suficientes para acceder a &eacute;sta pantalla, por favor contacte con el Administrador</div>
			<!-- Tabla -->
			<table id="tablaPermisos" class="table table-striped table-bordered mb-2"></table>
		</div>
	</div>
</div>
<!-- Modal Eliminar Usuario-->
<jsp:include page="modal/modalEliminarPermiso.jsp"/>
<!-- Modal Usuario-->
<jsp:include page="modal/modalPermiso.jsp"/>
<script src="resources/js/permiso.js" charset="utf-8"></script>