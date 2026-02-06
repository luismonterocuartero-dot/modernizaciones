var objetoAviso = document.getElementById('avisoPermisoRepostajeError');
var permisoDeAcceso = $('#permisoActual').val();
var tablaErroresImportado = document.getElementById('tablaRepostajeErrores');

const mapeoCampos = {
    "NOM_EMPR": "nombreEmpresa",
    "DIR_EMPR": "direccionEmpresa",
    "POB_EMPR": "poblacionEmpresa",
    "COD_POSTAL": "codigoPostalEmpresa",
    "COD_PROV": "provinciaEmpresa",
    "NIF_EMPR": "nifEmpresa",
    "COD_CLI": "codigoCliente",
    "NUM_SERFAC": "numeroSerieFactura",
    "ANO_FACTUR": "anoFactura",
    "NUM_FACTUR": "numeroFactura",
    "FEC_FACTUR": "fechaFactura",
    "NUM_TARJET": "numeroTarjeta",
    "MATRICULA": "matricula",
    "CONDUCTOR": "conductor",
    "NUM_REFER": "numeroReferencia",
    "FEC_OPERAC": "fechaRepostaje",
    "HOR_OPERAC": "horaRepostaje",
    "NOM_ESTABL": "nombreEstablecimiento",
    "COD_PROVES": "codigoProvinciaEstablecimiento",
    "POB_ESTABL": "poblacionEstablecimiento",
    "KILOMETROS": "kilometros",
    "DES_PRODU": "descripcionProducto",
    "NUM_LITROS": "litros",
    "MONEDA": "numeroMoneda",
    "IMPORTE": "importe",
    "TIP_OPERAC": "tipoOperacion",
    "COD_ESTABL": "codigoEstablecimiento",
    "IVA": "porcentajeIVA",
    "COD_PRODU": "codigoProducto",
    "VIU": "numeroVIU",
    "PU_LITRO": "pulitro",
    "DCTO_FIJO": "descuentoFijo",
    "DCTO_EESS": "descuentoEstacionServicio",
    "DCTO_OPERAC": "descuentoOperacion",
    "RAPPEL": "numeroRappel",
    "BONIF_TOTAL": "bonificacionTotal",
    "IMP_TOTAL": "importeTotal",
    "COD_CONTROL": "codigoControl",
    "R_AUT": "numeroRAUT",
    "PRECIO_LITRO": "precioLitro",
    "INFO_AUXILIAR": "informacionAuxiliar"
};

$(document).ready(function() {
	if (permisoDeAcceso == "EDITOR" || permisoDeAcceso == "ADMINISTRADOR") {

		$('#tablaRepostajeErrores').DataTable({
			"order": [[0, "desc"]],
			ajax: {
				url: './tablaRepostajeDescartados',
				dataSrc: ''
			},
			columnDefs: [

			],
			language: {
				"search": "",
				"searchPlaceholder": "Buscar...",
				"sSearch": "",
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
						columns: [0, 1, 2, 3,4],
					}
				},
				{
					extend: 'pdf',
					text: 'Exportar a PDF',
					exportOptions: {
						columns: [0, 1, 2, 3,4],
					}
				}
				],
			columns: [
				{
					title: 'Fichero',
					data: 'hfimCodigo.nombreFicheroImportacion'
				},
				{
					title: 'Linea Error',
					data: 'linea'
				},	
				{
					title: 'Columna Error',
					data: 'descripcion'
				},
				{
					title: 'Valor',
					data: function(row){
						return row.hfimCodigo[mapeoCampos[row.descripcion]] || '';
					}
				},
				{
					title: 'Error',
					data: 'coerCodigo.desc'
				},
			],
		});
		tablaErroresImportado.classList.remove("d-none");
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