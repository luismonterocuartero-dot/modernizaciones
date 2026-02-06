<!-- Botï¿½n Nueva Compania -->
<div class="container mt-2 mb-2">
<div class="row">
<div class="col">
<h1><strong><em>Compa&ntilde;&iacute;as de seguro</em></strong></h1>
</div>
</div>
<div class="row">
<div class="col mb-2">
<button type="button" id="botonNuevaCompania" hidden="true" class="editar edit-modal btn btn-success float-right" onclick="nuevaCompania()"><span class="fa fa-plus"></span><span class="hidden-xs"> Nueva Compa&ntilde;&iacute;a</span></button>
</div>
</div>
<div class="row">
<div class="col">
<!-- Cuadro de aviso -->
<div id="avisoPermisoCompania" class="classAviso d-none">Actualmente no dispone de permisos suficientes para acceder a &eacute;sta pantalla, por favor contacte con el Administrador</div>
<!-- Tabla -->
<table id="tablaCompanias" class="table table-striped table-bordered mb-2"></table>
</div>
</div>
</div>
<!-- Modal Eliminar Compañia-->
<jsp:include page="modal/modalEliminarCompania.jsp"/>
<!-- Modal Compañia-->
<jsp:include page="modal/modalCompania.jsp"/>
<script src="resources/js/compania.js" charset="utf-8"></script>