var objetoAviso = document.getElementById('avisoPermisoRepostajeImportado');
var permisoDeAcceso = $('#permisoActual').val();
var tablaimportados = document.getElementById('tablaRepostajeImportados'); 

$(document).ready(function() {
	if (permisoDeAcceso == "EDITOR" || permisoDeAcceso == "ADMINISTRADOR") {

		$('#tablaRepostajeImportados').DataTable({
			"order": [[0, "desc"]],
			ajax: {
				url: './tablaRepostajeImportados',
				dataSrc: ''
			},
			columnDefs: [
				
			],
			language: {
				"search": "",
				"searchPlaceholder": "Buscar...",
				"paginate": {
					"next": "Siguiente",
					"previous": "Anterior"
				},
				"lengthMenu": "Mostrar _MENU_ registros",
				"info": "Mostrando _START_ a _END_ de _TOTAL_ registros",
				"infoEmpty": "Mostrando 0 a 0 de 0 registros",
				"infoFiltered": "(filtrado de _MAX_ registros totales)",
				"zeroRecords": "No hay datos disponibles en la tabla",
				"loadingRecords": "Cargando..."
			},
			dom: 'Blfrtip',
			buttons: [
				{
					extend: 'excel',
					text: 'Exportar a Excel',
					exportOptions: {
						columns: [0, 1, 2, 3, 4, 5,6],
					}
				},
				{
					extend: 'pdf',
					text: 'Exportar a PDF',
					exportOptions: {
						columns: [0, 1, 2, 3, 4, 5,6],
					}
				}
				],
			columns: [
				{
					title: 'Fichero Importado',
					data: 'ficheroRepostaje.nombreFicheroImportacion'
				},

				{
					title: 'Matr\u00EDcula',
					data: 'ficheroRepostaje.matricula'
				},
				{
					title: 'Nº litros',
					data: 'ficheroRepostaje.litros'
				},
				{
					title: 'Importe',
					data: 'ficheroRepostaje.importe'
				},
				{
					title: 'Nº Kil\u00F3metros',
					data: 'ficheroRepostaje.kilometros'
				},
				{
					title: 'Fecha del repostaje',
					data: 'ficheroRepostaje.fechaRepostaje'
				},
				{
					title: 'Descripci\u00F3n',
					data: 'ficheroRepostaje.descripcionProducto'
				},
				{
					title: 'Observaciones',
					data: 'ficheroRepostaje.informacionAuxiliar'
				}
			],
		});
		tablaimportados.classList.remove("d-none");
	} else {
		mostrarAviso();

	}



});

function mostrarAviso() {
	objetoAviso.classList.remove("d-none");
}

function muestraBotonNuevo() {
	var myButton = document.getElementById('botonCargarRepostaje');
	$("#inputCargarRepostaje").attr("disable", "")
	$("#botonCargarRepostaje").removeClass("disabled")
}