 		<script src="resources/js/jquery.dataTables-1.10.24.min.js" charset="utf-8"></script>
 		<script src="resources/js/dataTables.buttons-1.7.1.min.js" charset="utf-8"></script>
 		<script src="resources/js/buttons.html5-1.7.1.min.js" charset="utf-8"></script>
 		<script src="resources/js/jszip-3.1.3.min.js" charset="utf-8"></script>
 		<script src="resources/js/buttons.print-1.6.2.min.js" charset="utf-8"></script>
 		<script src="resources/js/pdfmake-0.1.32.min.js" charset="utf-8"></script>
 		<script src="resources/js/vfs_fonts-0.1.32.js" charset="utf-8"></script>
 		<script src="resources/js/accent-neutralise-1.13.7.js" charset="utf-8"></script>
 		
		<link rel="stylesheet" href="resources/css/jquery.dataTables-1.10.24.min.css">
		<link rel="stylesheet" href="resources/css/buttons.dataTables-1.7.1.min.css">
 		
 		
 		
 		
<div class="container mt-2 mb-2">
	<div class="row">
		<div class="col">
			<h1>
				<strong><em>Errores Repostaje</em></strong>
			</h1>
		</div>
	</div>

	<div class="row">
		<div class="col">
			<!-- Cuadro de aviso -->
			<div id="avisoPermisoRepostajeError" class="classAviso d-none">Actualmente no dispone de permisos suficientes para acceder a esta pantalla. Por favor, contacte con el Administrador</div>

			<div class="row">
				<div class="col">
					<!-- Tabla -->
					<table id="tablaRepostajeErrores" class="d-none table table-striped table-bordered mb-2">
						<caption></caption>
						<tr><th></th></tr>
					</table>
				</div>
			</div>
		</div>
	</div>
</div>
<input id="permisoActual" name="permisoActual" value="${permisoActual}"
	type="hidden">
<input id="idSesionActual" name="idSesionActual"
	value="${idSesionActual}" type="hidden">
<script src="resources/js/repostajeerror.js" charset="utf-8"></script>