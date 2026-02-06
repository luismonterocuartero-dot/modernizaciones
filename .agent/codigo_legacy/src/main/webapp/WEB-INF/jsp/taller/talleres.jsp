<!-- Bot�n Nuevo Taller -->
<div class="container mt-2 mb-2">
<div class="row">
<div class="col">
<h1><strong><em>Talleres</em></strong></h1>
</div>
</div>
<div class="row">
<div class="col mb-2">
<button type="button" id="botonNuevoTaller" class="editar edit-modal btn btn-success botonEditar float-right" hidden="true" onclick="nuevoTaller()"><span class="fa fa-plus"></span><span class="hidden-xs"> Nuevo Taller</span></button>
</div>
</div>
<div class="row">
<div class="col">
<!-- Cuadro de aviso -->
<div id="avisoPermisoTaller" class="classAviso d-none">Actualmente no dispone de permisos suficientes para acceder a &eacute;sta pantalla, por favor contacte con el Administrador</div>
<!-- Tabla -->
<table id="tablaTaller" class="table table-striped table-bordered mb-2"></table>
</div>
</div>
</div>
<!-- Modal Editar Taller-->
<jsp:include page="modal/modalTaller.jsp"/>
<!-- Modal Eliminar Taller-->
<jsp:include page="modal/modalEliminarTaller.jsp"/>
<!-- Modal Eliminar Servicio Taller-->
<jsp:include page="modal/modalEliminarServicioTaller.jsp"/>
<!-- Modal Servicio Taller -->
<jsp:include page="modal/modalServicioTaller.jsp"/>
<!-- JS -->
<script src="resources/js/taller.js"></script>
<script src="resources/js/date-eu.js" charset="utf-8"></script>