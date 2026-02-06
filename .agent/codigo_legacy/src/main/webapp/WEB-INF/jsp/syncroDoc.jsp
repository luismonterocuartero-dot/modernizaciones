<!-- Boton syncroDoc -->
<!-- Verifica si el atributo alertaAccesoNo es true y muestra el mensaje de alerta -->
<!-- Cuadro de aviso -->

<div id="alertaAccesoNo" class="classAviso d-none">Actualmente no
	dispone de permisos suficientes para acceder a &eacute;sta pantalla,
	por favor contacte con el Administrador</div>
<div id="sincronizado" style="display: none;" class="alert alert-success" role="alert">
   <strong>La sincronizacion de documentos ha sido correcta.</strong>
</div>
<div id="sincronizadoFallo" style="display: none;" class="alert alert-danger" role="alert">
   <strong>La sincronizacion de documentos ha fallado.</strong>
</div>
<div id=sincronizadoAviso style="display: none;" class="alert alert-warning" role="alert">
   <strong>Existen documentos no sincronizados.</strong>
</div>
<div id="sincronizadoVacio" style="display: none;" class="alert alert-success" role="alert">
   <strong>No hay documentos que sincronizar.</strong>
</div>
<div class="container mt-2 mb-2">
	<div class="row">
		<div class="col">
			<h1>
				<strong><em>Sincronizar Documentos</em></strong>
			</h1>
		</div>
	</div>
	<div id="contenido" class="row">
		<div class="col mb-2">
			<button type="button" id="botonsyncroDoc"
				class="btn btn-success mb-3" onclick="acciona()">
				<span class="fas fa-sync-alt"></span> <span
					class="d-none d-sm-inline">Sincronizar</span>
			</button>
			<div id="spinner" class="spinner" style="display:none;margin:auto;"></div>
			<div id="cuadroSincro" class="card border-0 rounded-lg shadow-lg d-none">
				<div class="card-body text-center">
					<h5 class="card-title font-weight-bold mb-4"
						style="font-size: 1.5rem; color: #4CAF50;">Sincronización
						Total</h5>
						<p class="font-weight-bold"><u>MANTENIMIENTOS</u></p>
					<ul class="list-unstyled">
						<li class="mb-3">Sincronizados: <span id="numero1"></span></li>
						<li>No Sincronizados: <span id="numero2"></span></li>
					</ul>
						<p class="font-weight-bold"><u>SINIESTROS</u></p>
					<ul class="list-unstyled">
						<li class="mb-3">Sincronizados:
							 <span id="numero3"></span></li>
						<li>No Sincronizados: <span id="numero4"></span></li>
					</ul>
						<p class="font-weight-bold"><u>INFRACCIONES</u></p>
					<ul class="list-unstyled">
						<li class="mb-3">Sincronizados:
							 <span id="numero5"></span></li>
						<li>No Sincronizados: <span id="numero6"></span></li>
					</ul>
						<p class="font-weight-bold"><u>VEHICULOS</u></p>
					<ul class="list-unstyled">
						<li class="mb-3">Sincronizados:
							 <span id="numero7"></span></li>
						<li>No Sincronizados: <span id="numero8"></span></li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</div>
<script>
	// Obtener el valor del atributo alertaAccesoNo
	var alertaAccesoNoValue = "${alertaAccesoNo}";

	// Obtener el elemento div
	var alertaAccesoNoDiv = document.getElementById('alertaAccesoNo');
	var contenidoDiv = document.getElementById('contenido');

	// Verificar si alertaAccesoNoValue no está vacío
	if (alertaAccesoNoValue.trim() !== "") {
		if (alertaAccesoNoValue.trim() !== "NoHabilitado") {
		// Si no está vacío, mostrar el mensaje de alerta eliminando la clase d-none
			alertaAccesoNoDiv.classList.remove('d-none');
			contenidoDiv.classList.add('d-none');
		} else {
			$('#botonsyncroDoc').addClass('btn-light');
			$('#botonsyncroDoc').prop('disabled',true);
		}
	} 
</script>
<script src="resources/js/syncroDoc.js" charset="utf-8"></script>