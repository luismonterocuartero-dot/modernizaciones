<!-- Boton Nuevo Parametro -->
<div class="container mt-2 mb-2">
<div class="row">
<div class="col">
<h1><strong><em>Par&aacute;metros</em></strong></h1>
</div>
</div>
<div class="row">
<div class="col mb-2">
<button type="button" id="botonNuevoParametro" class="editar edit-modal btn btn-success float-right" hidden="true" onclick="nuevoParametro()"><span class="fa fa-plus"></span><span class="hidden-xs"> Nuevo Par&aacute;metro</span></button>
</div>
</div>
<div class="row">
<div class="col">
<!-- Cuadro de aviso -->
<div id="avisoPermisoParametro" class="classAviso d-none">Actualmente no dispone de permisos suficientes para acceder a &eacute;sta pantalla, por favor contacte con el Administrador</div>
<!-- Tabla -->
<table id="tablaParametros" class="table table-striped table-bordered mb-2"></table>
</div>
</div>
</div>
<!-- Modal Eliminar Parametro-->
<jsp:include page="modal/modalEliminarParametro.jsp"/>
<!-- Modal Parametro-->
<jsp:include page="modal/modalParametro.jsp"/>
<script src="resources/js/parametro.js" charset="utf-8"></script>