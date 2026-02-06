<div class="container mt-2 mb-2">
<div class="row">
<div class="col">
<h1><strong><em>Modelos</em></strong></h1>
</div>
</div>
<div class="row">
<div class="col mb-2">
<button type="button" id="botonNuevoModelo" class="editar edit-modal btn btn-success float-right" hidden="true" onclick="nuevoModelo()"><span class="fa fa-plus"></span><span class="hidden-xs"> Nuevo Modelo</span></button>
</div>
</div>
<div class="row">
<div class="col">
<!-- Cuadro de aviso -->
<div id="avisoPermisoModelo" class="classAviso d-none">Actualmente no dispone de permisos suficientes para acceder a &eacute;sta pantalla, por favor contacte con el Administrador</div>
<!-- Tabla -->
<table id="tablaModelos" class="table table-striped table-bordered mb-2"></table>
</div>
</div>
</div>
<!-- Modal Eliminar Modelo-->
<jsp:include page="modal/modalEliminarModelo.jsp"/>
<!-- Modal Modelo-->
<jsp:include page="modal/modalModelo.jsp"/>
<script src="resources/js/modelo.js" charset="utf-8"></script>