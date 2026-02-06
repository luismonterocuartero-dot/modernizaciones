<div class="container mt-2 mb-2">
	<div class="row">
		<div class="col">
			<h1><strong><em>Usuarios</em></strong></h1>
		</div>
	</div>
	<div class="row">
		<div class="col mb-2">
			<button type="button" id="botonNuevoUsuario" class="editar edit-modal btn btn-success float-right" hidden="true" onclick="nuevoUsuario()"><span class="fa fa-plus"></span><span class="hidden-xs"> Nuevo Usuario</span></button>
		</div>
	</div>
	<div class="row">
		<div class="col">
			<!-- Cuadro de aviso -->
			<div id="avisoPermisoUsuario" class="classAviso d-none">Actualmente no dispone de permisos suficientes para acceder a &eacute;sta pantalla, por favor contacte con el Administrador</div>
			<!-- Tabla -->
			<table id="tablaUsuarios" class="table table-striped table-bordered mb-2"></table>
		</div>
	</div>
</div>
<!-- Modal Eliminar Usuario-->
<jsp:include page="modal/modalEliminarUsuario.jsp"/>
<!-- Modal Usuario-->
<jsp:include page="modal/modalUsuario.jsp"/>
<!-- Modal PermisoUsuario-->
<jsp:include page="modal/modalPermisoUsuario.jsp"/>
<!-- Modal AvisoUsuario-->
<jsp:include page="modal/modalAvisoEdicionUsuario.jsp"/>
<script src="resources/js/usuario.js" charset="utf-8"></script>