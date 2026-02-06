<!-- Bot�n Nuevo Perfil -->
<div class="container mt-2 mb-2">
	<div class="row">
		<div class="col">
			<h1>
				<strong><em>Perfiles</em></strong>
			</h1>
		</div>
	</div>
	<div class="row">
		<div class="col mb-2">
			<button type="button" id="botonNuevoPerfil"
				class="editar edit-modal btn btn-success botonEditar float-right"
				hidden="true"
				onclick="nuevoPerfil()">
				<span class="fa fa-plus"></span><span class="hidden-xs">
					Nuevo Perfil</span>
			</button>
		</div>
	</div>
	<div class="row">
		<div class="col">
			<!-- Cuadro de aviso -->
			<div id="avisoPermisoPerfil" class="classAviso d-none">Actualmente no dispone de permisos suficientes para acceder a &eacute;sta pantalla, por favor contacte con el Administrador</div>
			<!-- Tabla -->
			<table id="tablaPerfil"
				class="table table-striped table-bordered mb-2"></table>
		</div>
	</div>
</div>
<!-- Modal Editar Perfil-->
<jsp:include page="modal/modalPerfil.jsp" />
<!-- Modal Eliminar Perfil-->
<jsp:include page="modal/modalEliminarPerfil.jsp" />
<!-- JS -->
<script src="resources/js/perfil.js"></script>