<!-- Bot�n Nueva Marca -->
<div class="container mt-2 mb-2">
<div class="row">
<div class="col">
<h1><strong><em>Marcas</em></strong></h1>
</div>
</div>
<div class="row">
<div class="col mb-2">
<button type="button" id="botonNuevaMarca" class="editar edit-modal btn btn-success float-right" hidden="true" onclick="nuevaMarca()"><span class="fa fa-plus"></span><span class="hidden-xs"> Nueva Marca</span></button>
</div>
</div>
<div class="row">
<div class="col">
<!-- Cuadro de aviso -->
<div id="avisoPermisoMarca" class="classAviso d-none">Actualmente no dispone de permisos suficientes para acceder a &eacute;sta pantalla, por favor contacte con el Administrador</div>
<!-- Tabla -->
<table id="tablaMarcas" class="table table-striped table-bordered mb-2"></table>
</div>
</div>
</div>
<!-- Modal Eliminar Marca-->
<jsp:include page="modal/modalEliminarMarca.jsp"/>
<!-- Modal Marca-->
<jsp:include page="modal/modalMarca.jsp"/>
<script src="resources/js/marca.js" charset="utf-8"></script>