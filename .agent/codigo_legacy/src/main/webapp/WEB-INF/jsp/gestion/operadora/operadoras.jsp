<!-- Bot�n Nueva Operadora -->
<div class="container mt-2 mb-2">
<div class="row">
<div class="col">
<h1><strong><em>Operadoras</em></strong></h1>
</div>
</div>
<div class="row">
<div class="col mb-2">
<button type="button" id="botonNuevaOperadora" class="editar edit-modal btn btn-success float-right" hidden="true" onclick="nuevaOperadora()"><span class="fa fa-plus"></span><span class="hidden-xs"> Nueva Operadora</span></button>
</div>
</div>
<div class="row">
<div class="col">
<!-- Cuadro de aviso -->
<div id="avisoPermisoOperadora" class="classAviso d-none">Actualmente no dispone de permisos suficientes para acceder a &eacute;sta pantalla, por favor contacte con el Administrador</div>
<!-- Tabla -->
<table id="tablaOperadoras" class="table table-striped table-bordered mb-2"></table>
</div>
</div>
</div>
<!-- Modal Eliminar Operadora-->
<jsp:include page="modal/modalEliminarOperadora.jsp"/>
<!-- Modal Operadora-->
<jsp:include page="modal/modalOperadora.jsp"/>
<script src="resources/js/operadora.js" charset="utf-8"></script>