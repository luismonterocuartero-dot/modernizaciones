<!-- Boton Nuevo Concepto -->
<div class="container mt-2 mb-2">
<div class="row">
<div class="col">
<h1><strong><em>Conceptos</em></strong></h1>
</div>
</div>
<div class="row">
<div class="col mb-2">
<button type="button" id="botonNuevoConcepto" hidden="true" class="editar edit-modal btn btn-success float-right" onclick="nuevoConcepto()"><span class="fa fa-plus"></span><span class="hidden-xs"> Nuevo Concepto</span></button>
</div>
</div>
<div class="row">
<div class="col">
<!-- Cuadro de aviso -->
<div id="avisoPermisoConcepto" class="classAviso d-none">Actualmente no dispone de permisos suficientes para acceder a &eacute;sta pantalla, por favor contacte con el Administrador</div>
<!-- Tabla -->
<table id="tablaConceptos" class="table table-striped table-bordered mb-2"></table>
</div>
</div>
</div>
<!-- Modal Eliminar Concepto-->
<jsp:include page="modal/modalEliminarConcepto.jsp"/>
<!-- Modal Concepto-->
<jsp:include page="modal/modalConcepto.jsp"/>
<script src="resources/js/concepto.js" charset="utf-8"></script>