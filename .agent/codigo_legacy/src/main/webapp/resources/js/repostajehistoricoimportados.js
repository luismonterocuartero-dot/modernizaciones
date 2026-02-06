var objetoAviso = document.getElementById('avisoPermisoHistoricoImp');
var permisoDeAcceso = $('#permisoActual').val();
var tablaRepostajeHist = document.getElementById('tablaRepostajeHistoricoImportados');

$(document).ready(function() {
	if (permisoDeAcceso == "EDITOR" || permisoDeAcceso == "ADMINISTRADOR") {

		$('#tablaRepostajeHistoricoImportados').DataTable({
			"order": [[0, "desc"]],
			"autoWidth": true,
			ajax: {
				url: './tablaRepostajeHistricosImportados',
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
						columns: [0, 1, 2, 3, 4, 5, 6, 7, 9],
						format: {
							body: function(data, row, column, node) {
								if (column === 8) { 
									return data.indexOf("fa fa-check") != -1 ? 'Correcto' : 'Erroneo'; 
								}
								return data; 
							}
						}
					}
				},
				{
					extend: 'pdf',
					text: 'Exportar a PDF',
					exportOptions: {
						columns: [0, 1, 2, 3, 4, 5, 6, 7, 9],
						format: {
							body: function(data, row, column, node) {
								if (column === 8) {
									return data.indexOf("fa fa-check") != -1 ? 'Correcto' : 'Erroneo';
								}
								return data;
							}
						}
					}
				}
				],
			columns: [
				{
					title: 'Nombre Fichero',
					data: 'nombreFicheroImportacion'
				},
				{
					title: 'Nº Referencia',
					data: 'numeroReferencia'
				},
				{
					title: 'Matr\u00EDcula',
					data: 'matricula'
				},
				{
					title: 'Nº litros',
					data: 'litros'
				},
				{
					title: 'Importe',
					data: 'importe'
				},
				{
					title: 'Nº Kil\u00F3metros',
					data: 'kilometros'
				},
				{
					title: 'Fecha del repostaje',
					data: 'fechaRepostaje'
				},
				{
					title: 'Descripci\u00F3n',
					data: 'descripcionProducto'
				},
				{
					title: 'Observaciones',
					data: 'informacionAuxiliar'
				},
				{
					title: 'Estado Importaci\u00F3n',
					render: function (data, type, row){
						
						if (row.fkRepostaje != null){
							return '<button type="button" class="edit-modal btn btn-success" data-toggle="tooltip" data-placement="bottom" disabled><i class="fa fa-check"></i></button>';
						}else{
							return '<button type="button" class="edit-modal btn btn-danger" data-toggle="tooltip" data-placement="bottom" disabled><i class="fa fa-times"></i></button>';						
						}
					}
				},
				{
					title: 'Acciones',
					render: function(data, type, row) {
						return '<button type="button" id="ButtonMostrar" class="edit-modal btn btn-success" data-toggle="modal" data-target="#modalshowrepostaje" data-placement="bottom" title="Ver infromacion" onclick="mostrarRepostaje(' + row.id + ')"><i class="fa fa-eye"></i></button>'
					}
				}
				
			],
		});
		tablaRepostajeHist.classList.remove("d-none");
	} else {
		mostrarAviso();

	}



});

function mostrarAviso() {
	objetoAviso.classList.remove("d-none");
}
function mostrarRepostaje(id){
	let repostaje =  $('#tablaRepostajeHistoricoImportados').DataTable().rows().data().filter(row => row.id === id)[0];
	 
	var detallesHTML = `
	    <div class="container mt-4">
	      <!-- Información de la Empresa -->
	      <div class="card mb-3">
	        <div class="card-header">
	          <h4>Informaci\u00F3n de la Empresa</h4>
	        </div>
	        <div class="card-body">
	          <div class="row">
	          <div class="col-md-3">
	                <strong>C\u00F3digo Cliente:</strong>
	                <p>${checknull(repostaje.codigoCliente)}</p>
	              </div>
	            <div class="col-md-3">
	              <strong>Nombre Empresa:</strong>
	              <p>${checknull(repostaje.nombreEmpresa)}</p>
	            </div>
	            <div class="col-md-3">
	              <strong>Direcci\u00F3n:</strong>
	              <p>${checknull(repostaje.direccionEmpresa)}</p>
	            </div>
	            <div class="col-md-3">
	              <strong>NIF:</strong>
	              <p>${checknull(repostaje.nifEmpresa)}</p>
	            </div>
	            <div class="col-md-3">
	              <strong>Poblaci\u00F3n:</strong>
	              <p>${checknull(repostaje.poblacionEmpresa)}</p>
	            </div>
	            <div class="col-md-3">
	              <strong>C\u00F3digo Postal:</strong>
	              <p>${checknull(repostaje.codigoPostalEmpresa)}</p>
	            </div>
	            <div class="col-md-3">
	              <strong>Provincia:</strong>
	              <p>${checknull(repostaje.provinciaEmpresa)}</p>
	            </div>
	          </div>
	        </div>
	      </div>
	      
	      <!-- Información de la Factura -->
	        <div class="card mb-3">
	          <div class="card-header">
	            <h4>Información de la Factura</h4>
	          </div>
	          <div class="card-body">
	            <div class="row">
	              <div class="col-md-3">
	                <strong>N\u00FAmero de serie Factura:</strong>
	                <p>${checknull(repostaje.numeroSerieFactura)}</p>
	              </div>
	              <div class="col-md-3">
	                <strong>N\u00FAmero Factura:</strong>
	                <p>${checknull(repostaje.numeroFactura)}</p>
	              </div>
	              <div class="col-md-3">
	                <strong>Fecha Factura:</strong>
	                <p>${checknull(repostaje.fechaFactura)}</p>
	              </div>
	              <div class="col-md-3">
	                <strong>A\u00F1o Factura:</strong>
	                <p>${checknull(repostaje.anoFactura)}</p>
	              </div>
	              <div class="col-md-3">
	                <strong>N\u00FAmero Tarjeta:</strong>
	                <p>${checknull(repostaje.numeroTarjeta)}</p>
	              </div>
	            </div>
	          </div>
	        </div>

	      <!-- Información del Repostaje Importado -->
	      <div class="card mb-3">
	        <div class="card-header">
	          <h4>Información del Repostaje Importado</h4>
	        </div>
	        <div class="card-body">
	          <div class="row">
	            <div class="col-md-3">
	              <strong>Matr\u00EDcula:</strong>
	              <p>${checknull(repostaje.matricula)}</p>
	            </div>
	            <div class="col-md-3">
	              <strong>Kil\u00F3metros:</strong>
	              <p>${checknull(repostaje.kilometros)}</p>
	            </div>
	            <div class="col-md-3">
	              <strong>Conductor:</strong>
	              <p>${checknull(repostaje.conductor)}</p>
	            </div>
	            <div class="col-md-3">
	              <strong>N\u00FAmero Referencia:</strong>
	              <p>${checknull(repostaje.numeroReferencia)}</p>
	            </div>
	            <div class="col-md-3">
	              <strong>Fecha Repostaje:</strong>
	              <p>${checknull(repostaje.fechaRepostaje)}</p>
	            </div>
	            <div class="col-md-3">
	              <strong>Hora Repostaje:</strong>
	              <p>${checknull(repostaje.horaRepostaje)}</p>
	            </div>
	            <div class="col-md-3">
	              <strong>Nombre Establecimientos:</strong>
	              <p>${checknull(repostaje.nombreEstablecimiento)}</p>
	            </div>
	            <div class="col-md-3">
	              <strong>C\u00F3digo Provincia Establecimiento:</strong>
	              <p>${checknull(repostaje.codigoProvinciaEstablecimiento)}</p>
	            </div>
	            <div class="col-md-3">
	              <strong>Poblaci\u00F3n Establecimiento:</strong>
	              <p>${checknull(repostaje.poblacionEstablecimiento)}</p>
	            </div>
	            <div class="col-md-3">
	              <strong>Descripci\u00F3n del Producto:</strong>
	              <p>${checknull(repostaje.descripcionProducto)}</p>
	            </div>
	            <div class="col-md-3">
	              <strong>Litros:</strong>
	              <p>${checknull(repostaje.litros,true)} L</p>
	            </div>
	            <div class="col-md-3">
	              <strong>N\u00FAmero Moneda:</strong>
	              <p>${checknull(repostaje.numeroMoneda)}</p>
	            </div>
	            <div class="col-md-3">
	              <strong>Importe:</strong>
	              <p>${checknull(repostaje.importe,true)} €</p>
	            </div>
	            <div class="col-md-3">
	              <strong>Tipo Operaci\u00F3n:</strong>
	              <p>${checknull(repostaje.tipoOperacion)}</p>
	            </div>
	            <div class="col-md-3">
	              <strong>C\u00F3digo Establecimiento:</strong>
	              <p>${checknull(repostaje.codigoEstablecimiento)}</p>
	            </div>
	            <div class="col-md-3">
	              <strong>Porcentaje IVA:</strong>
	              <p>${checknull(repostaje.porcentajeIVA,true)} %</p>
	            </div>
	            <div class="col-md-3">
	              <strong>C\u00F3digo Producto:</strong>
	              <p>${checknull(repostaje.codigoProducto)}</p>
	            </div>
	            <div class="col-md-3">
	              <strong>N\u00FAmero VIU:</strong>
	              <p>${checknull(repostaje.numeroVIU)}</p>
	            </div>
	            <div class="col-md-3">
	              <strong>PULitro:</strong>
	              <p>${checknull(repostaje.pulitro,true)}</p>
	            </div>
	            <div class="col-md-3">
	              <strong>Descuento Fijo:</strong>
	              <p>${checknull(repostaje.descuentoFijo,true)}</p>
	            </div>
	            <div class="col-md-3">
	              <strong>Descuento Estaci\u00F3n Servicio:</strong>
	              <p>${checknull(repostaje.descuentoEstacionServicio,true)}</p>
	            </div>
	            <div class="col-md-3">
	              <strong>Descuento Operaci\u00F3n:</strong>
	              <p>${checknull(repostaje.descuentoOperacion,true)}</p>
	            </div>
	            <div class="col-md-3">
	              <strong>N\u00FAmero Rappel:</strong>
	              <p>${checknull(repostaje.numeroRappel,true)}</p>
	            </div>
	            <div class="col-md-3">
	              <strong>Bonificaci\u00F3n Total:</strong>
	              <p>${checknull(repostaje.bonificacionTotal,true)}</p>
	            </div>
	            <div class="col-md-3">
	              <strong>Importe Total:</strong>
	              <p>${checknull(repostaje.importeTotal,true)}</p>
	            </div>
	            <div class="col-md-3">
	              <strong>C\u00F3digo Control:</strong>
	              <p>${checknull(repostaje.codigoControl)}</p>
	            </div>
	            <div class="col-md-3">
	              <strong>N\u00FAmero RAUT:</strong>
	              <p>${checknull(repostaje.numeroRAUT)}</p>
	            </div>
	            <div class="col-md-3">
	              <strong>Precio Litro:</strong>
	              <p>${checknull(repostaje.precioLitro,true)}</p>
	            </div>
	            <div class="col-md-3">
	              <strong>Información Auxiliar:</strong>
	              <p>${checknull(repostaje.informacionAuxiliar)}</p>
	            </div>
	            <div class="col-md-3">
	              <strong>Fecha Importaci\u00F3n Fichero:</strong>
	              <p>${checknull(repostaje.fechaImportacionFichero)}</p>
	            </div>
	            <div class="col-md-3">
	              <strong>Nombre Fichero:</strong>
	              <p>${checknull(repostaje.nombreFicheroImportacion)}</p>
	            </div>
	            <div class="col-md-3">
	              <strong>Creado por:</strong>
	              <p>${checknull(repostaje.liCreacion)}</p>
	            </div>
	            <div class="col-md-3">
	              <strong>Modificado por:</strong>
	              <p>${checknull(repostaje.liModificacion)}</p>
	            </div>
	          </div>
	        </div>
	      </div>
	    </div>`;

	
	$('#detallesRepostaje').html(detallesHTML);

}
function checknull(valor, remplazo = false){
	return valor != null ? remplazo ? valor.replace('.',','): valor  : "";
}

function muestraBotonNuevo() {
	var myButton = document.getElementById('botonCargarRepostaje');
	$("#inputCargarRepostaje").attr("disable", "")
	$("#botonCargarRepostaje").removeClass("disabled")
}