// INICIO TABLA VEHICULOS
var tablaVehiculo;
var objetoVehiculo = document.getElementById('avisoPermisoVehiculo');
var objetoEquipamiento = document.getElementById('avisoPermisoEquipamiento');
var objetoMaterial = document.getElementById('avisoPermisoMaterial');
var objetoCesion = document.getElementById('avisoPermisoCesion');
var objetoRepostaje = document.getElementById('avisoPermisoRepostaje');
var objetoSiniestro = document.getElementById('avisoPermisoSiniestro');
var objetoPoliza = document.getElementById('avisoPermisoPoliza');
var objetoItv = document.getElementById('avisoPermisoItv');
var objetoInfraccion = document.getElementById('avisoPermisoInfraccion');
var objetoMantenimiento = document.getElementById('avisoPermisoMantenimiento');
var permisoDeAccesoVehiculo = $('#modalGeneral #permisoActualVehiculo').val();
var permisoDeAccesoEquipamiento = $('#modalGeneral #permisoActualEquipamiento').val();
var permisoDeAccesoMaterial= $('#modalGeneral #permisoActualMaterial').val();
var permisoDeAccesoCesion= $('#modalGeneral #permisoActualCesion').val();
var permisoDeAccesoRepostaje= $('#modalGeneral #permisoActualRepostaje').val();
var permisoDeAccesoSiniestro= $('#modalGeneral #permisoActualSiniestro').val();
var permisoDeAccesoPoliza= $('#modalGeneral #permisoActualPoliza').val();
var permisoDeAccesoItv= $('#modalGeneral #permisoActualItv').val();
var permisoDeAccesoInfraccion= $('#modalGeneral #permisoActualInfraccion').val();
var permisoDeAccesoMantenimiento= $('#modalGeneral #permisoActualMantenimiento').val();
//Agrego un permiso de edicion para hacer el comprobante luego
var permisoCheckFinalizado= $('#modalGeneral #permisoCheckFinalizado').val(); 
var permisoFiltraProvincia= $('#modalGeneral #permisoFiltraProvincia').val();
$(document).ready(function() {
	if(permisoDeAccesoVehiculo == "EDITOR" || permisoDeAccesoVehiculo == "ADMINISTRADOR")
	{
		muestraBotonNuevo();
		
	}
	if(permisoDeAccesoVehiculo != "SIN_PERMISO" && permisoDeAccesoVehiculo != "" ) {
		muestraTotalVehiculos();
		mostrarTablaInicialVehiculos("NO");
		muestraBotonFiltrar();
	}else{
		mostrarAviso();	
	}
});


// FUNCION QUE MUESTRA EL LISTADO DE VEHICULOS EN LA PANTALLA INICIAL
function mostrarTablaInicialVehiculos(doblada){
	tablaVehiculo = $('#tablaVehiculo').DataTable({
	   "order": [[ 2, "asc" ]],
	   ajax : {
	        url: './tablaVehiculos/'+ doblada,
	        dataSrc: ''
	   },
	   columnDefs: [
	        {
	            "targets": [0],
	            "visible": false
	        }
	    ],
	    language: {
            "search": "",
            "searchPlaceholder": "Buscar...",
            "sSearch": ""  
        },
        
        dom: 'Bfrtip', 
        buttons: [
        	{
                extend: 'excel',
				text: 'Exportar a Excel',
                exportOptions: {
                    columns: [1, 2, 3, 4, 5, 6] 
                }
            },
            {
                extend: 'pdf',
				text: 'Exportar a PDF',
                exportOptions: {
                    columns: [1, 2, 3, 4, 5, 6] 
                }
            }
        ],
	   columns : [
	   			{
	               title: 'Id',
	               data:'id'
	           },
			   {
	               title: 'Matr&#237cula',
				   render: function (data, type, row) {
					   return '<a href="javascript:muestraGeneral('+row.id+',\''+row.matricula+'\')">'+row.matricula+'</a>';
	               }
	           },
			   {
				   title: 'Marca - Modelo',
				   render: function (data, type, row) {
					   return '<a href="javascript:muestraGeneral('+row.id+',\''+row.matricula+'\')">'+row.marca+' - '+row.modelo+'</a>';
	               }
	           },
	           {
	               title: 'Adscripción',
				   render: function (data, type, row) {
					   return '<a href="javascript:muestraGeneral('+row.id+',\''+row.matricula+'\')">'+row.servicio+'</a>';
	               }
	           },
			   {
	               title: 'Tipo Vehículo',
				   render: function (data, type, row) {
					   return '<a href="javascript:muestraGeneral('+row.id+',\''+row.matricula+'\')">'+row.tipoVehiculo+'</a>';
	               }
	           },
			   {
	               title: 'Uso',
				   render: function (data, type, row) {
					   return '<a href="javascript:muestraGeneral('+row.id+',\''+row.matricula+'\')">'+row.uso+'</a>';
	               }
	           },
			   {
	               title: 'Estado',
				   render: function (data, type, row) {
					   return '<a href="javascript:muestraGeneral('+row.id+',\''+row.matricula+'\')">'+row.estado+'</a>';
	               }
	           }]
	});
}



 //FUNCION QUE MUESTRA EL LISTADO DE VEHICULOS EN LA PANTALLA INICIAL
function mostrarTablaFiltradaVehiculos(doblada, filtrada, filtroDTO){
	//Aqui llamamos al controller para filtrar
	$('#modalFiltroVehiculo').modal('hide');
	tablaVehiculo = $('#tablaVehiculo').DataTable({
		"order": [[ 2, "asc" ]],
		ajax : {
            url: './filtrarVehiculo/' + doblada + '/' + filtrada + '?' + filtroDTO, // Concatenamos los datos serializados como parámetros de URL
            method: 'GET', // Usamos el método GET
			dataSrc: ''
		},
		columnDefs: [
			{
				"targets": [0],
				"visible": false
			}
			],
			language: {
				"search": "",
				"searchPlaceholder": "Buscar...",
				"sSearch": ""  
			},
			
			dom: 'Bfrtip', 
			buttons: [
				{
					extend: 'excel',
					text: 'Exportar a Excel',
					exportOptions: {
						columns: [1, 2, 3, 4, 5, 6] 
					}
				},
				{
					extend: 'pdf',
					text: 'Exportar a PDF',
					exportOptions: {
						columns: [1, 2, 3, 4, 5, 6] 
					}
				}
				],
				columns : [
					{
						title: 'Id',
						data:'id'
					},
					{
						title: 'Matr&#237cula',
						render: function (data, type, row) {
							return '<a href="javascript:muestraGeneral('+row.id+',\''+row.matricula+'\')">'+row.matricula+'</a>';
						}
					},
					{
						title: 'Marca - Modelo',
						render: function (data, type, row) {
							return '<a href="javascript:muestraGeneral('+row.id+',\''+row.matricula+'\')">'+row.marca+' - '+row.modelo+'</a>';
						}
					},
					{
						title: 'Adscripción',
						render: function (data, type, row) {
							return '<a href="javascript:muestraGeneral('+row.id+',\''+row.matricula+'\')">'+row.servicio+'</a>';
						}
					},
					{
						title: 'Tipo Vehículo',
						render: function (data, type, row) {
							return '<a href="javascript:muestraGeneral('+row.id+',\''+row.matricula+'\')">'+row.tipoVehiculo+'</a>';
						}
					},
					{
						title: 'Uso',
						render: function (data, type, row) {
							return '<a href="javascript:muestraGeneral('+row.id+',\''+row.matricula+'\')">'+row.uso+'</a>';
						}
					},
					{
						title: 'Estado',
						render: function (data, type, row) {
							$('#totvehi').html('Total de Veh&iacute;culos: '+row.tamano);
							return '<a href="javascript:muestraGeneral('+row.id+',\''+row.matricula+'\')">'+row.estado+'</a>';
						}
					}]
					
	});
	if(tablaVehiculo.data().length == 0){
		$('#totvehi').html('Total de Veh&iacute;culos: 0');
	}
	
}



// FUNCION QUE SE LLAMA AL PULSAR EN EL FILTRAR DE LA PANTALLA FILTRAR VEHICULOS
function filtrarTablaVehiculo(){
	tablaVehiculo.destroy();
	var formData = $('#modalFiltroVehiculo #filtroVehiculo').serializeArray();
	var filtroDTO = $.param(formData);
	cambiarColor();
	if (document.getElementById('dobladaVehi').checked){
		mostrarTablaFiltradaVehiculos("SI","SI",filtroDTO);
	}else{
		mostrarTablaFiltradaVehiculos("NO","SI",filtroDTO);
	}
	muestraBotonEliminarFiltro();
}

// FUNCION QUE SE LLAMA AL PULSAR EN EL CHECK DE LA PANTALLA INICIAL DE VEHICULOS
function filtroDobladaVehi(){
	if(document.getElementById('botonFiltroVehiculo').classList.contains('btn-success'))
	{
		if (document.getElementById('dobladaVehi').checked){
			tablaVehiculo.destroy();
			mostrarTablaInicialVehiculos("SI");
			actualizarcontadorve("SI");
		}else{
			tablaVehiculo.destroy();
			mostrarTablaInicialVehiculos("NO");
			actualizarcontadorve("NO");
		}
	}else{
		filtrarTablaVehiculo();
	}

}

function mostrarAviso() {
  objetoVehiculo.classList.remove("d-none");
}

function muestraBotonNuevo() {
	var myButton = document.getElementById('botonNuevoVehiculo');
	myButton.hidden = false;
}

function muestraBotonFiltrar() {
	var myButton = document.getElementById('botonFiltroVehiculo');
	myButton.hidden = false;
}

function muestraBotonEliminarFiltro(){
	var myButtonLimpiar = document.getElementById('botonEliminarFiltroVehiculo');
	myButtonLimpiar.hidden = false;
}

function muestraTotalVehiculos() {
	var ocultaTotal = document.getElementById('totvehi');
	ocultaTotal.classList.remove("d-none");
	var lblDobladaVehi = document.getElementById('dobladaDiv');
	lblDobladaVehi.classList.remove("d-none");
}

function cambiarColor(){
	var elemento = document.getElementById('botonFiltroVehiculo');
	if (elemento) {
        elemento.classList.remove('btn-success');
        elemento.classList.add('btn-primary');
	}
}

function nuevoVehiculo() {
	$('#modalEditarVehiculo #cabecera').html('Nuevo Veh&iacute;culo');
	$('#modalEditarVehiculo #idVehiculoActualiza').val("");
	$('#modalEditarVehiculo input').prop('disabled', false);
	$('#modalEditarVehiculo select').prop('disabled', false);
	$('#modalEditarVehiculo textarea').prop('disabled', false);
	$('#modalEditarVehiculo').find('form')[0].reset();
	$('#modalEditarVehiculo #modeloOpt').children('option:not(:first)').remove();
	$('#modalEditarVehiculo #situacionOpt option:contains("ALTA")').prop('selected',true);
	$('#modalEditarVehiculo #baja').prop('disabled', true);
	$('#modalEditarVehiculo #motivoBaja').prop('disabled', true);
	$('#modalEditarVehiculo #fkOperadora').prop('disabled', true);
	$('#modalEditarVehiculo #espacio').prop('disabled', true);
	$('#modalEditarVehiculo #guardarVehiculo').removeClass('btn-light');
	$('#modalEditarVehiculo #guardarVehiculo').prop('disabled',false);
	
	$('#modalEditarVehiculo').modal({
		keyboard: false,
		backdrop: 'static'
	});
}

function nuevoFiltroVehiculo() {
	if(document.getElementById('botonFiltroVehiculo').classList.contains('btn-success')){
		limpiarFormFiltroVehiculo();
	}
	$('#modalFiltroVehiculo #fkOperadora').prop('disabled', true);
	if($('#modalFiltroVehiculo #adquisicionOpt option:selected').text()=="RENTING"){
		$('#modalFiltroVehiculo #fkOperadora').prop('disabled', false);
	}
	$('#modalFiltroVehiculo').modal({
		keyboard: false,
		backdrop: 'static'
	});
}

function limpiarFormFiltroVehiculo(){
        $('#modalFiltroVehiculo #cabecera').html('Filtro Veh&iacute;culo');
        $('#modalFiltroVehiculo input').prop('disabled', false);
        $('#modalFiltroVehiculo select').prop('disabled', false);
        if(permisoFiltraProvincia == "true"){
          $('#modalFiltroVehiculo #servicioOpt option:not(:selected)').prop('disabled', true);
        }
        $('#modalFiltroVehiculo textarea').prop('disabled', false);
        $('#modalFiltroVehiculo').find('form')[0].reset();
        $('#modalFiltroVehiculo #modeloOpt').children('option:not(:first)').remove();
        $('#modalFiltroVehiculo #situacionOpt option:contains("ALTA")').prop('selected',true);
        $('#modalFiltroVehiculo #fechaBajaDesde').prop('disabled', true);
        $('#modalFiltroVehiculo #fechaBajaHasta').prop('disabled', true);
		    $('#modalFiltroVehiculo #fkOperadora').prop('disabled', true);
        $('#modalFiltroVehiculo #espacio').prop('disabled', true);
        $('#modalFiltroVehiculo #filtrarVehiculo').removeClass('btn-light');
        $('#modalFiltroVehiculo #filtrarVehiculo').prop('disabled',false);
}

function eliminarFiltroVehiculo(){
        window.location.href = "./vehiculos";
}

function crearVehiculo() {
	if(validaCampos())
	{
		var parser = new DOMParser();
    var responseDoc = null;
		$.ajax({
		    type: 'POST',
		    url: './crearVehiculo',
		    data: $('#nuevoVehiculo').serialize() , 
		    success: function (data) {
				$('#modalEditarVehiculo').modal('hide');
				filtroDobladaVehi();
				$("#alertaVehiculoOK").fadeIn(1500);
				setTimeout(function() {$("#alertaVehiculoOK").fadeOut(1500);},3000);			
    		},
			 error: function( jqXHR, textStatus, errorThrown ) {
				$('#modalEditarVehiculo').modal('hide');
        // PARSEAMOS EL DATA, SACAMOS EL VALOR DEL MENSAJE DE SUCCESS Y LO INCLUIMOS EN EL DIV CORRESPONDIENTE
        responseDoc = parser.parseFromString(jqXHR.responseText, "text/html");
        var myNodeList = responseDoc.body.querySelectorAll("p");
        var msjErr = myNodeList[1].textContent.split("java.lang.Exception");
        $("#alertaVehiculoKO").html('<strong>Error'+msjErr[1]+'</strong>');
				$("#alertaVehiculoKO").fadeIn(1500);
				setTimeout(function() {$("#alertaVehiculoKO").fadeOut(1500);},3000);
			 }

		});
	}
}

function validaCampos() {
	var res = true;
  var validV = true;
  var validM = true;
	if($('#modalEditarVehiculo #servicioOpt').val() == "") {
		$('#modalEditarVehiculo #servicioOpt').addClass("border border-danger");
		$('#modalEditarVehiculo #sAdsLabel').html('Servicio Adscrito (*) Campo Obligatorio');	
		$('#modalEditarVehiculo #sAdsLabel').css('color','red');
    $('#modalEditarVehiculo #nuevoVehiculoMatr-tab').addClass("text-danger");
		res = false;
    validV = false;
	}
	if($('#modalEditarVehiculo #adquisicionOpt option:selected').text() == "RENTING" && $('#modalEditarVehiculo #fkOperadora option:selected').val()=="")
	{
		$('#modalEditarVehiculo #fkOperadora').addClass("border border-danger");	
		$('#modalEditarVehiculo #operadoraLabel').html('Empresa Operadora (*) Campo Obligatorio');	
		$('#modalEditarVehiculo #operadoraLabel').css('color','red');
		$('#modalEditarVehiculo #nuevoVehiculoMatr-tab').addClass("text-danger");
		res = false;
    validV = false;
	}
	if($('#modalEditarVehiculo #modeloOpt').val() == "") {
		$('#modalEditarVehiculo #modeloOpt').addClass("border border-danger");	
		$('#modalEditarVehiculo #modeloLabel').html('Modelo (*) Campo Obligatorio');	
		$('#modalEditarVehiculo #modeloLabel').css('color','red');
    $('#modalEditarVehiculo #nuevoVehiculoMatr-tab').addClass("text-danger");
		res = false;
    validV = false;
	}	
	if($('#modalEditarVehiculo #marcaOpt').val() == "") {
		$('#modalEditarVehiculo #marcaOpt').addClass("border border-danger");	
		$('#modalEditarVehiculo #marcaLabel').html('Marca (*) Campo Obligatorio');	
		$('#modalEditarVehiculo #marcaLabel').css('color','red');
    $('#modalEditarVehiculo #nuevoVehiculoMatr-tab').addClass("text-danger");
		res = false;
    validV = false;
	}	
	if(!($('#modalEditarVehiculo #compra').val()) == "" && !($('#modalEditarVehiculo #adscripcion').val()) == "") {
		if(ValidateDate($('#modalEditarVehiculo #compra').val(), $('#modalEditarVehiculo #adscripcion').val()) == false){
			$('#modalEditarVehiculo #adscripcion').addClass("border border-danger");	
			$('#modalEditarVehiculo #lblAdscripcion').html('Fecha Adscripción, La fecha adscripción no puede ser anterior a la fecha compra');	
			$('#modalEditarVehiculo #lblAdscripcion').css('color','red');
      $('#modalEditarVehiculo #nuevoVehiculoMatr-tab').addClass("text-danger");
			res = false;
      validV = false;
		}
	}
  
  if(validV){
    $('#modalEditarVehiculo #nuevoVehiculoMatr-tab').removeClass("text-danger");
  }
  
  // INCLUIMOS LOS CAMPOS DEL FORMULARIO DE MATRICULA
  if($('#modalEditarVehiculo #nombre').val() == "") {
		$('#modalEditarVehiculo #nombre').addClass("border border-danger");
		$('#modalEditarVehiculo #lblNombre').html('Matrícula (*) Campo Obligatorio');	
		$('#modalEditarVehiculo #lblNombre').css('color','red');
    $('#modalEditarVehiculo #nuevaMatriculaVehi-tab').addClass("text-danger");
		res = false;
    validM = false;
	}
	
	if($('#modalEditarVehiculo #fechaMatriculacion').val() == "") {
		$('#modalEditarVehiculo #fechaMatriculacion').addClass("border border-danger");
		$('#modalEditarVehiculo #lblFechaMatriculacion').html('Fecha Matriculación (*) Campo Obligatorio');	
		$('#modalEditarVehiculo #lblFechaMatriculacion').css('color','red');
    $('#modalEditarVehiculo #nuevaMatriculaVehi-tab').addClass("text-danger");
		res = false;
    validM = false;
	}
  
  if(validM){
    $('#modalEditarVehiculo #nuevaMatriculaVehi-tab').removeClass("text-danger");
  }
		return res;
}

//CUANDO CAMBIA LA MARCA DEL VEHICULO SE RELLENAN LOS MODELOS (EDICION VEHICULO)
$("#modalFiltroVehiculo  #marcaOpt").change(function(){
	var modelosF = $("#modalFiltroVehiculo #modeloOpt");
	var marcasF = $(this);
	if($(this).val() != ''){
		$.ajax({
			data: { id : marcasF.val() },
			url: './rellenaModelosPorMarca',
			type : 'POST',
			dataType: 'json',
			success: function(r){
				modelosF.children('option:not(:first)').remove();
				$(r).each(function(i,v){
					$('#modalFiltroVehiculo  #modeloOpt').append(new Option(v.nombre, v.id, false, false));
				})
			},
			
		});
	}else{
		modelosF.children('option:not(:first)').remove();
	}
	
	// LIMPIAMOS LOS ERRORES DE LA MARCA EN CASO DE QUE HAYA ALGUNO
	$('#modalFiltroVehiculo  #marcaOpt').removeClass("border border-danger");
	$('#modalFiltroVehiculo  #marcaLabel').html('Marca (*)');
	$('#modalFiltroVehiculo  #marcaLabel').css('color','black');
});

//FUNCION QUE LIMPIA DE ERRORES EL FORMULARIO DE CREACION DE VEHICULO
function resetModal() {
	$('#modalEditarVehiculo #modeloOpt').removeClass("border border-danger");
	$('#modalEditarVehiculo #modeloLabel').html('Modelo (*)');	
	$('#modalEditarVehiculo #modeloLabel').css('color','black');
	$('#modalEditarVehiculo #servicioOpt').removeClass("border border-danger");	
	$('#modalEditarVehiculo #sAdsLabel').html('Servicio Adscrito (*)');	
	$('#modalEditarVehiculo #sAdsLabel').css('color','black');
	$('#modalEditarVehiculo #marcaOpt').removeClass("border border-danger");	
	$('#modalEditarVehiculo #marcaLabel').html('Marca (*)');	
	$('#modalEditarVehiculo #marcaLabel').css('color','black');
	$('#modalEditarVehiculo #fkOperadora').removeClass("border border-danger");	
	$('#modalEditarVehiculo #operadoraLabel').html('Empresa Operadora');	
	$('#modalEditarVehiculo #operadoraLabel').css('color','black');
	$('#modalEditarVehiculo #adscripcion').removeClass("border border-danger");	
	$('#modalEditarVehiculo #lblAdscripcion').html('Fecha Adscripción');	
	$('#modalEditarVehiculo #lblAdscripcion').css('color','black');
	$('#modalEditarVehiculo #nombre').removeClass("border border-danger");	
	$('#modalEditarVehiculo #lblNombre').html('Matr&iacute;cula');	
	$('#modalEditarVehiculo #lblNombre').css('color','black');
	$('#modalEditarVehiculo #fechaMatriculacion').removeClass("border border-danger");	
	$('#modalEditarVehiculo #lblFechaMatriculacion').html('Fecha Matriculaci&oacute;n');	
	$('#modalEditarVehiculo #lblFechaMatriculacion').css('color','black');
  $('#modalEditarVehiculo #nuevoVehiculoMatr-tab').removeClass("text-danger");
  $('#modalEditarVehiculo #nuevaMatriculaVehi-tab').removeClass("text-danger");
}

//FUNCION QUE LIMPIA DE ERRORES EL FORMULARIO DE FILTRAR VEHICULOS
function resetModalFilter() {
	$('#modalFiltroVehiculo #modeloOpt').removeClass("border border-danger");
	$('#modalFiltroVehiculo #modeloLabel').html('Modelo (*)');	
	$('#modalFiltroVehiculo #modeloLabel').css('color','black');
	$('#modalFiltroVehiculo #servicioOpt').removeClass("border border-danger");	
	$('#modalFiltroVehiculo #sAdsLabel').html('Servicio Adscrito (*)');	
	$('#modalFiltroVehiculo #sAdsLabel').css('color','black');
	$('#modalFiltroVehiculo #marcaOpt').removeClass("border border-danger");	
	$('#modalFiltroVehiculo #marcaLabel').html('Marca (*)');	
	$('#modalFiltroVehiculo #marcaLabel').css('color','black');
	$('#modalFiltroVehiculo #adscripcion').removeClass("border border-danger");	
	$('#modalFiltroVehiculo #lblAdscripcion').html('Fecha Adscripción');	
	$('#modalFiltroVehiculo #lblAdscripcion').css('color','black');
	$('#modalFiltroVehiculo #nombre').removeClass("border border-danger");	
	$('#modalFiltroVehiculo #lblNombre').html('Matr&iacute;cula');	
	$('#modalFiltroVehiculo #lblNombre').css('color','black');
	$('#modalFiltroVehiculo #fechaMatriculacion').removeClass("border border-danger");	
	$('#modalFiltroVehiculo #lblFechaMatriculacion').html('Fecha Matriculaci&oacute;n');	
	$('#modalFiltroVehiculo #lblFechaMatriculacion').css('color','black');
	$('#modalFiltroVehiculo #nuevoVehiculoMatr-tab').removeClass("text-danger");
	$('#modalFiltroVehiculo #nuevaMatriculaVehi-tab').removeClass("text-danger");
}

// EVENTOS REFERENTES A LA PANTALLA DE CREACION DE VEHICULOS
$("#modalEditarVehiculo #modeloOpt").change(function() {
	$('#modalEditarVehiculo #modeloOpt').removeClass("border border-danger");
	$('#modalEditarVehiculo #modeloLabel').html('Modelo (*)');	
	$('#modalEditarVehiculo #modeloLabel').css('color','black');
});

$("#modalEditarVehiculo #servicioOpt").change(function() {
	$('#modalEditarVehiculo #servicioOpt').removeClass("border border-danger");	
	$('#modalEditarVehiculo #sAdsLabel').html('Servicio Adscrito (*)');	
	$('#modalEditarVehiculo #sAdsLabel').css('color','black');
});

$("#modalEditarVehiculo #adscripcion").change(function() {
	$('#modalEditarVehiculo #adscripcion').removeClass("border border-danger");	
	$('#modalEditarVehiculo #lblAdscripcion').html('Fecha Adscripción');	
	$('#modalEditarVehiculo #lblAdscripcion').css('color','black');
});

$("#modalEditarVehiculo #adquisicionOpt").change(function(){
	$('#modalEditarVehiculo #operadoraLabel').css('color','black');
	$('#modalEditarVehiculo #fkOperadora').removeClass("border border-danger");
	if($("#modalEditarVehiculo #adquisicionOpt").find('option:selected').text() == "RENTING")
	{
		$('#modalEditarVehiculo #fkOperadora').prop('disabled', false);
		$('#modalEditarVehiculo #operadoraLabel').html('Empresa Operadora (*)');	
	}
	else{
		$('#modalEditarVehiculo #fkOperadora').prop('disabled', true);
		$('#modalEditarVehiculo #fkOperadora').val("");
		$('#modalEditarVehiculo #operadoraLabel').html('Empresa Operadora');	
	}
});

$("#modalFiltroVehiculo #adquisicionOpt").change(function(){
	if($("#modalFiltroVehiculo #adquisicionOpt").find('option:selected').text() == "RENTING")
	{
		$('#modalFiltroVehiculo #fkOperadora').prop('disabled', false);
	}
	else{
		$('#modalFiltroVehiculo #fkOperadora').prop('disabled', true);
		$('#modalFiltroVehiculo #fkOperadora').val("");
	}
});

$("#modalEditarVehiculo #fkOperadora").change(function(){
	$('#modalEditarVehiculo #fkOperadora').removeClass("border border-danger");
	$('#modalEditarVehiculo #operadoraLabel').html('Empresa Operadora (*)');	
	$('#modalEditarVehiculo #operadoraLabel').css('color','black');
	}
);

$("#modalEditarVehiculo #situacionOpt").change(function(){
	if($("#modalEditarVehiculo #situacionOpt").find('option:selected').text() == "BAJA")
	{
		$('#modalEditarVehiculo #baja').prop('disabled', false);
		$('#modalEditarVehiculo #motivoBaja').prop('disabled', false);
	}
	else{
		$('#modalEditarVehiculo #baja').prop('disabled', true);
		$('#modalEditarVehiculo #motivoBaja').prop('disabled', true);
		$('#modalEditarVehiculo #baja').val("");
		$('#modalEditarVehiculo #motivoBaja').val("");
	}
});

$("#modalFiltroVehiculo #situacionOpt").change(function(){
	if($("#modalFiltroVehiculo #situacionOpt").find('option:selected').text() == "BAJA")
	{
		$('#modalFiltroVehiculo #fechaBajaDesde').prop('disabled', false);
		$('#modalFiltroVehiculo #fechaBajaHasta').prop('disabled', false);
	}else{
		$('#modalFiltroVehiculo #fechaBajaDesde').prop('disabled', true);
		$('#modalFiltroVehiculo #fechaBajaHasta').prop('disabled', true);
		$('#modalFiltroVehiculo #fechaBajaDesde').val("");
		$('#modalFiltroVehiculo #fechaBajaHasta').val("");
	}
});

$('#modalEditarVehiculo #nombre').keydown(function(event){
	$('#modalEditarVehiculo #nombre').removeClass("border border-danger");
	$('#modalEditarVehiculo #lblNombre').html('Matrícula (*)');	
	$('#modalEditarVehiculo #lblNombre').css('color','black');
});

$('#modalEditarVehiculo #fechaMatriculacion').change(function(event){
	$('#modalEditarVehiculo #fechaMatriculacion').removeClass("border border-danger");
	$('#modalEditarVehiculo #lblFechaMatriculacion').html('Fecha Matriculación (*)');	
	$('#modalEditarVehiculo #lblFechaMatriculacion').css('color','black');
});

function redireccionPestanas(pestana,edicion) {
	// Utilizar switch para redirigir a la pestana correspondiente
  switch (pestana) {
     case 'matricula':
        if(edicion!="SI"){
				  $('#modalGeneral #formuGenMatr').find('form')[0].reset();
				  $('#modalGeneral #geneMatricula #idMatricula').val(null);
        }
        habilitarEdicionMatricula();
        document.getElementById("matricula-tab").click(); // Simula un clic en la pestana de matricula
        break;
     case 'vehiDoc':
        if(edicion!="SI"){
				  $('#modalGeneral #formuGenDocumento').find('form')[0].reset();
        }
        habilitarEdicionVehiculoDocumento();
        document.getElementById("documento-tab").click(); // Simula un clic en la pestana de doc vehiculos
        break;
     case 'equipamiento':
        if(edicion!="SI"){
				  $('#modalGeneral #formuGenEquip').find('form')[0].reset();
	        $('#modalGeneral #geneEquipamiento #idEquipamientoActualiza').val(null);
        }
        habilitarEdicionEquipamiento();
        document.getElementById("equipamiento-tab").click(); // Simula un clic en la pestana de equipamiento
        break;
     case 'cesion':
        if(edicion!="SI"){
				  $('#modalGeneral #formuGenCes').find('form')[0].reset();
	        $('#modalGeneral #geneCesion #idCesionActualiza').val(null);
	        $("#modalGeneral #geneCesion #inicio").datepicker('option', 'maxDate', null);
	        $("#modalGeneral #geneCesion #fin").datepicker('option', 'minDate', null);
        }
        habilitarEdicionCesion();
        document.getElementById("cesion-tab").click(); // Simula un clic en la pestana de cesion
        break;
     case 'poliza':
        if(edicion!="SI"){
				  $('#modalGeneral #formuGenPoli').find('form')[0].reset();
	        $('#modalGeneral #genePoliza #idPolizaActualiza').val(null);
	        $("#modalGeneral #genePoliza #inicioPol").datepicker('option', 'maxDate', null);
	        $("#modalGeneral #genePoliza #finPol").datepicker('option', 'minDate', null);
        }
        habilitarEdicionPoliza();
        document.getElementById("poliza-tab").click(); // Simula un clic en la pestana de poliza
        break;
     default:
        // Si la pestaña no coincide con ninguna, no hacer nada
        break;
    }
}

// FUNCION QUE RELLENA EL TIPO DE VEHICULO EN BASE A LA MARCA Y EL MODELO
function rellenarTipoVehiculo(modeloId) {
    if (modeloId != '') {
        $.ajax({
            data: { id : modeloId },
            url: './rellenaTipoVehiPorModelos',
            type : 'POST',
            dataType: 'text',
            success: function(response){
			        // Remover el atributo readonly
        			$("#tipoVehiculo").prop("readonly", false);
			
        			// Establecer el valor del campo tipoVehiculo en blanco
        			$("#tipoVehiculo").val(response);
			
        			// Volver a agregar el atributo readonly
         			$("#tipoVehiculo").prop("readonly", true);
            },
            error: function(xhr, status, error){
                console.error(xhr.responseText);
            }
        });
    } else {
  		// Remover el atributo readonly
  		$("#tipoVehiculo").prop("readonly", false);
		
  		// Establecer el valor del campo tipoVehiculo en blanco
  		$("#tipoVehiculo").val("");
		
  		// Volver a agregar el atributo readonly
  		$("#tipoVehiculo").prop("readonly", true);
    }
}

// CUANDO CAMBIA LA MARCA DEL VEHICULO SE RELLENAN LOS MODELOS (VEHICULO NUEVO)
$("#modalEditarVehiculo #marcaOpt").change(function(){
	var modelosN = $("#modalEditarVehiculo #modeloOpt");
	var marcasN = $(this);
	if($(this).val() != ''){
		$.ajax({
			data: { id : marcasN.val() },
			url: './rellenaModelosPorMarca',
			type : 'POST',
			dataType: 'json',
			success: function(r){
				modelosN.children('option:not(:first)').remove();
				$(r).each(function(i,v){
					$('#modalEditarVehiculo #modeloOpt').append(new Option(v.nombre, v.id, false, false));
				})
			},
			
		});
	}else{
		modelosN.children('option:not(:first)').remove();
	}
	
	// LIMPIAMOS LOS ERRORES DE LA MARCA EN CASO DE QUE HAYA ALGUNO
	$('#modalEditarVehiculo #marcaOpt').removeClass("border border-danger");
	$('#modalEditarVehiculo #marcaLabel').html('Marca (*)');
	$('#modalEditarVehiculo #marcaLabel').css('color','black');
});
// FIN TABLA VEHICULOS

// DEFINICION RESTO TABLAS DEL VEHICULO
var tablaHistorico;
var tablaVehiculoDocumento;
var tablaMatricula;
var tablaEquipamiento;
var tablaMaterial;
var tablaCesion;
var tablaRepostaje;
var tablaSiniestro;
var tablaSiniestroDocumento;
var tablaPoliza;
var tablaPolizaDocumento;
var tablaItv;
var tablaItvDocumento;
var tablaInfraccion;
var tablaInfraccionDocumento;
var tablaMantenimiento;
var tablaMantenimientoDocumento;
var tablaMantenimientoConcepto;
var tablaVehiculoDocumentoVehi;
var tablaHistoricoVehi;
var tablaMatriculaVehi;
var tablaEquipamientoVehi;
var tablaCesionVehi;
var tablaPolizaVehi;
// INICIO FUNCIONES GENERALES

/*** FUNCION QUE COMPRUEBA FECHAS, NO SE UTILIZA PERO
 * SE DEJA COMENTADA POR SI SE NECESITA EN ALGUN MOMENTO
 * @param fechaBaja
 * @returns boolean
 */
/***
function compruebaFecha(fechaBaja) {
	var flag = false;
	var f = new Date();
	var fBajaSeparada = fechaBaja.split('-');
	var año = fBajaSeparada[0];
	var mes = fBajaSeparada[1]-1;//se le resta uno ya que el new Date se lo suma
	var diaArray = fBajaSeparada[2].split(' ');
	var dia = diaArray[0];
	var fcomparar = new Date(año, mes, dia);
	if(f.getTime() > fcomparar.getTime()){
		flag = true;
	}
	return flag;
}
***/

// FUNCION QUE ACTUALIZA EL CONTADOR DE VEHICULOS DE LA PAGINA INICIAL
function actualizarcontadorve(doblada){
	$.ajax({
		type: 'GET',
		url: './recargarNumVe/'+doblada,
	    xhrFields: {
			responseType: 'text'
		},
	    success: function (data) {
			var obj = JSON.parse(data);
	    	console.log("NUMERO DE VEHICULOS CALCULADO: "+obj.valor_total);
			$('#totvehi').html('Total de Veh&iacute;culos: '+obj.valor_total);
		},
		error: function( jqXHR, textStatus, errorThrown ) {
			console.log("ERROR AL CALCULAR EL NUMERO DE VEHICULOS");
		}
	});
}

// FUNCION QUE PERMITE CUALQUIER CARACTER MENOS EL "*"
function validaMatricula(event){
  var regex = new RegExp("^[*]+$");
  var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
  if (regex.test(key)) {
    event.preventDefault();
    return false;
  }
}

// FUNCION QUE SETEA UNA FECHA
function setFecha(fecha){
	let date = new Date(fecha)
	let day = date.getDate()
	let month = date.getMonth() + 1
	let year = date.getFullYear()
	
	if(month < 10){
	  return `${year}-0${month}-${day}`
	}else{
	  return `${year}-${month}-${day}`
	}
}

// FUNCION QUE TRANSFORMA UNA FECHA CON FORMATO DD/MM/YYYY EN YYYY-MM-DD
function transformarFormatoFechaCorrecto(fecha) {
	var dateParts = fecha.replaceAll("/", "-").split("-");
	return dateParts[2] + "-" + dateParts[1] + "-" + dateParts[0];
}

// FUNCION QUE NO PERMITE QUE LA "date2" SEA INFERIOR O IGUAL A LA "date1"
// FORMATO DE FECHAS CORRECTO YYYY-MM-DD
var ValidateDate = (function (date1, date2) {
	var res = true;
    if (date2 < date1) {
   		res = false;
    }
	return res;
});

// FUNCION QUE NO PERMITE QUE "kmfin" SEA INFERIOR A "kmini"
var ValidateKm = (function (kmini, kmfin) {
	var res = true;
    if (kmfin < kmini) {
   		res = false;
    }
	return res;
});

// FUNCION QUE SOLO PERMITE NUMEROS ENTEROS O CON DOS DECIMALES
function ValidateDecimal(str) {
	var REGEX = /^\-?[0-9]+(?:\,[0-9]{1,2})?$/;
    var valid = false;
	if ( str.match( REGEX ) ) {
      valid = true;
    }
    return valid;
}

// FUNCION QUE SOLO PERMITE INTRODUCIR CARACTERES NUMERICOS Y EL CARACTER ","
function soloNumeros(event){
	var regex = new RegExp("^[0-9,]+$");
	var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
	if (!regex.test(key)) {
		event.preventDefault();
		return false;
	}
}

// FUNCION QUE VALIDA UN NIF
var ValidateNIF = (function() {
	  'use strict';
	  
	  var DNI_REGEX = /^(\d{8})([A-Z])$/;
	  var NIE_REGEX = /^[XYZ]\d{7,8}[A-Z]$/;

	  var ValidateNIF2 = function( str ) {

	    // Ensure upcase and remove whitespace
	    str = str.toUpperCase();

	    var valid = false;
	    var type = spainIdType( str );

	    switch (type) {
	      case 'dni':
	        valid = validDNI( str );
	        break;
	      case 'nie':
	        valid = validNIE( str );
	        break;
	    }

	    return valid;
	    

	  };

	  var spainIdType = function( str ) {
	    if ( str.match( DNI_REGEX ) ) {
	      return 'dni';
	    }
	    if ( str.match( NIE_REGEX ) ) {
	      return 'nie';
	    }
	  };

	  var validDNI = function( dni ) {
	    var dni_letters = "TRWAGMYFPDXBNJZSQVHLCKE";
	    var letter = dni_letters.charAt( parseInt( dni, 10 ) % 23 );
	    
	    return letter == dni.charAt(8);
	  };

	  var validNIE = function( nie ) {

	    // Change the initial letter for the corresponding number and validate as DNI
	    var nie_prefix = nie.charAt( 0 );

	    switch (nie_prefix) {
	      case 'X': nie_prefix = 0; break;
	      case 'Y': nie_prefix = 1; break;
	      case 'Z': nie_prefix = 2; break;
	    }

	    return validDNI( nie_prefix + nie.substr(1) );

	  };

	  return ValidateNIF2;
	})();

// FUNCION QUE VALIDA EL FORMATO DE HORA
function ValidateHora(str) {
  var HORA = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;

    var valid = false;
	if ( str.match( HORA ) ) {
      valid = true;
    }
 
    return valid;
}

// FUNCION QUE VALIDA QUE SOLO SE PUEDA INTRODUCIR NUMEROS Y EL CARACTER ":"
function soloNumerosHora(event){
  var regex = new RegExp("^[0-9:]+$");
  var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
  if (!regex.test(key)) {
    event.preventDefault();
    return false;
  }
}

// FUNCION QUE VALIDA QUE SOLO SE PUEDAN INTRODUCIR NUMEROS
function soloNumerosTelefonos(event){
	var regex = new RegExp("^[0-9]+$");
	var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
	if (!regex.test(key)) {
		event.preventDefault();
		return false;
	}
}

// FUNCION QUE PASADO UN ID DE VEHICULO RECARGA UN LISTADO DE MATRICULAS DADO
function recargarMatriculas(idVehi,formu,nombreSel){
	var campoMatr = $('#modalGeneral #'+formu+' #'+nombreSel+'');
	var matriSelec = $('#modalGeneral #geneRepostaje #nombreMatriculaRepostaje').val();
	$.ajax({
		data: { id : idVehi },
		url: './rellenaMatriculasPorVehi',
		type : 'POST',
		dataType: 'json',
		success: function(r){
			campoMatr.children('option:not(:first)').remove();
			$(r).each(function(i,v){
        var option = new Option(v.nombre, v.id, false, false);
        if (matriSelec == v.nombre) {
          option.selected = true;
        }
        campoMatr.append(option);
			})
		},
	});
}

// FUNCION QUE VALIDA EL FORMATO DE UNA FECHA PASADA (dd/mm/yyyy)
function validarFormatoFecha(campo) {
    var RegExPattern = /^\d{1,2}\/\d{1,2}\/\d{2,4}$/;
    if ((campo.match(RegExPattern)) || (campo.trim()=='')) {
        return true;
    } else {
        return false;
    }
}

// FUNCION QUE VALIDA SI UNA FECHA ES CORRECTA EN CALENDARIO
function existeFecha(fecha){
	var fechaf = fecha.split("/");
	var day = fechaf[0];
	var month = fechaf[1];
	var year = fechaf[2];
	var date = new Date(year,month,'0');
	if((day-0)>(date.getDate()-0)){
		return false;
	}
	return true;
}

//FIN FUNCIONES GENERALES

// INICIO DE FUNCIONES DE DESCARGA DE DOCUMENTOS
function descargarDocumentoVehiculo(nombre, id) {
	$.ajax({
		    type: 'GET',
		    url: './descargarDocumento/'+'vehiculo/'+id,
		    xhrFields: {
				responseType: 'blob'
			},
		    success: function (data) {
    			var link=document.createElement('a');
    			link.href=window.URL.createObjectURL(data);
    			link.download=nombre;
    			link.click();		
    		}
		});
}

function descargarDocumentoSiniestro(nombre, id) {
	$.ajax({
		    type: 'GET',
		    url: './descargarDocumento/'+'siniestro/'+id,
		    xhrFields: {
				responseType: 'blob'
			},
		    success: function (data) {
    			var link=document.createElement('a');
    			link.href=window.URL.createObjectURL(data);
    			link.download=nombre;
    			link.click();		
    		}
		});
}

function descargarDocumentoPoliza(nombre, id) {
	$.ajax({
		    type: 'GET',
		    url: './descargarDocumento/'+'poliza/'+id,
		    xhrFields: {
				responseType: 'blob'
			},
		    success: function (data) {
    			var link=document.createElement('a');
    			link.href=window.URL.createObjectURL(data);
    			link.download=nombre;
    			link.click();		
    		}
		});
}

function descargarDocumentoItv(nombre, id) {
	$.ajax({
		    type: 'GET',
		    url: './descargarDocumento/'+'itv/'+id,
		    xhrFields: {
				responseType: 'blob'
			},
		    success: function (data) {
    			var link=document.createElement('a');
    			link.href=window.URL.createObjectURL(data);
    			link.download=nombre;
    			link.click();		
    		}
		});
} 

function descargarDocumentoInfraccion(nombre, id) {
	$.ajax({
		    type: 'GET',
		    url: './descargarDocumento/'+'infraccion/'+id,
		    xhrFields: {
				responseType: 'blob'
			},
		    success: function (data) {
    			var link=document.createElement('a');
    			link.href=window.URL.createObjectURL(data);
    			link.download=nombre;
    			link.click();		
    		}
		});
}

function descargarDocumentoMantenimiento(nombre, id) {
	$.ajax({
		    type: 'GET',
		    url: './descargarDocumento/'+'mantenimiento/'+id,
		    xhrFields: {
				responseType: 'blob'
			},
		    success: function (data) {
    			var link=document.createElement('a');
    			link.href=window.URL.createObjectURL(data);
    			link.download=nombre;
    			link.click();		
    		}
		});
}
// FIN DE FUNCIONES DE DESCARGA DE DOCUMENTOS

//DATEPICKER
$(function() {
  $("#modalGeneral #geneCesion #inicio").datepicker({
		dateFormat: 'dd/mm/yy',
		firstDay: 1,
		monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
		dayNamesMin: [ "Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
		onSelect: function(dateText){
			$("#modalGeneral #geneCesion #fin").datepicker('option', 'minDate', dateText);
			$('#modalGeneral #geneCesion #inicio').removeClass("border border-danger");
			$('#modalGeneral #geneCesion #lblInicio').html('Fecha Inicio');
			$('#modalGeneral #geneCesion #lblInicio').css('color','black');
		}
	});
	
	$('#modalGeneral #geneCesion #inicio').keydown(function(event){
		$('#modalGeneral #geneCesion #inicio').removeClass("border border-danger");
		$('#modalGeneral #geneCesion #lblInicio').html('Fecha Inicio');
		$('#modalGeneral #geneCesion #lblInicio').css('color','black');
	});
	
	$("#modalGeneral #geneCesion #fin").datepicker({
		dateFormat: 'dd/mm/yy',
		firstDay: 1,
		monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
		dayNamesMin: [ "Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
		onSelect: function(dateText){
			$("#modalGeneral #geneCesion #inicio").datepicker('option', 'maxDate', dateText);
			$('#modalGeneral #geneCesion #fin').removeClass("border border-danger");
			$('#modalGeneral #geneCesion #lblFin').html('Fecha Fin');
			$('#modalGeneral #geneCesion #lblFin').css('color','black');
		}
	});
	
	$('#modalGeneral #geneCesion #fin').keydown(function(event){
		$('#modalGeneral #geneCesion #fin').removeClass("border border-danger");
		$('#modalGeneral #geneCesion #lblFin').html('Fecha Fin');
		$('#modalGeneral #geneCesion #lblFin').css('color','black');
	});
	
	$("#modalGeneral #genePoliza #inicioPol").datepicker({
		dateFormat: 'dd/mm/yy',
		firstDay: 1,
		monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
		dayNamesMin: [ "Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
		onSelect: function(dateText){
			$("#modalGeneral #genePoliza #finPol").datepicker('option', 'minDate', dateText);
			$('#modalGeneral #genePoliza #inicioPol').removeClass("border border-danger");	
			$('#modalGeneral #genePoliza #etiquetaFechaInicio').html('Fecha Inicio (*)');	
			$('#modalGeneral #genePoliza #etiquetaFechaInicio').css('color','black');
		}
	});
	
	$('#modalGeneral #genePoliza #inicioPol').keydown(function(event){
		$('#modalGeneral #genePoliza #inicioPol').removeClass("border border-danger");
		$('#modalGeneral #genePoliza #etiquetaFechaInicio').html('Fecha Inicio (*)');
		$('#modalGeneral #genePoliza #etiquetaFechaInicio').css('color','black');
	});
	
	$("#modalGeneral #genePoliza #finPol").datepicker({
		dateFormat: 'dd/mm/yy',
		firstDay: 1,
		monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
		dayNamesMin: [ "Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
		onSelect: function(dateText){
			$("#modalGeneral #genePoliza #inicioPol").datepicker('option', 'maxDate', dateText);
			$('#modalGeneral #genePoliza #finPol').removeClass("border border-danger");
			$('#modalGeneral #genePoliza #etiquetaFechaFin').html('Fecha Fin');
			$('#modalGeneral #genePoliza #etiquetaFechaFin').css('color','black');
		}
	});
	
	$('#modalGeneral #genePoliza #finPol').keydown(function(event){
		$('#modalGeneral #genePoliza #finPol').removeClass("border border-danger");
		$('#modalGeneral #genePoliza #etiquetaFechaFin').html('Fecha Fin');
		$('#modalGeneral #genePoliza #etiquetaFechaFin').css('color','black');
	});
});

//FUNCIONES PARA VISTA GENERALES
// FUNCION PARA LA GENERACION DE PDF DE VEHICULO GENERAL
function generarPDFConLogoYTexto() {
	var id = document.getElementById("idVehiculoActualiza").value;
    window.location.href = "./generarPDF/" + id;
}

function muestraGeneral(id, matricula){
// SE OBTIENE LISTADO DE MATRICULAS DEL VEHICULO EN CUESTION PARA LISTARLAS A NIVEL GENERAL DE MODAL
	cabeceraMatriculas(id);

	// DATOS REFERENTES A LAS DIFERENTES PESTANAS
	// VEHICULOS
	deshabilitarDatosVehi();
	obtenerDatosVehi(id);
	
	// MATRICULAS
	obtenerDatosMatr(id);
  obtenerDatosMatrVehi(id);
	
	// HISTORICO SERVICIO ADSCRITO
	obtenerhistoricoServicioAdscrito(id);
  obtenerhistoricoServicioAdscritoVehi(id);
	
	// VEHICULO DOCUMENTOS
	deshabilitarEdicionVehiculoDocumento();	
	obtenerDatosVehiculoDocumento(id);
  obtenerDatosVehiculoDocumentoVehi(id);
  
  // COMPRUEBA INFORMACION DE PERMISO SOBRE VEHICULOS
	if(permisoDeAccesoVehiculo!="VISUALIZADOR"){
		document.getElementById('redireccionMatricula').classList.remove("d-none");
  	document.getElementById('redireccionVehiDoc').classList.remove("d-none");
	}
	
	// EQUIPAMIENTO
	if (permisoDeAccesoEquipamiento == "SIN_PERMISO" || permisoDeAccesoEquipamiento == "") {
		document.getElementById('formuGenEquip').classList.add("d-none");
		document.getElementById('footerBtnEquipamiento').classList.add("d-none");
		mostrarAvisoEquipamiento();
	}else{
		obtenerDatosEquipamiento(id);
		obtenerDatosEquipamientoVehi(id);
	}
	
  // COMPRUEBA INFORMACION DE PERMISO SOBRE EQUIPAMIENTOS
	if(permisoDeAccesoEquipamiento == "EDITOR" || permisoDeAccesoEquipamiento == "ADMINISTRADOR"){
		document.getElementById('redireccionEquipamiento').classList.remove("d-none");
	}
  
	// MATERIALES
	if (permisoDeAccesoMaterial == "SIN_PERMISO" || permisoDeAccesoMaterial == "") {
		document.getElementById('formuGenMate').classList.add("d-none");
		document.getElementById('footerBtnMaterial').classList.add("d-none");
		mostrarAvisoMaterial();
	}else{
		obtenerDatosMaterial(id);
	}
	
	// CESIONES
	if (permisoDeAccesoCesion == "SIN_PERMISO" || permisoDeAccesoCesion == "") {
		document.getElementById('formuGenCes').classList.add("d-none");
		document.getElementById('footerBtnCesion').classList.add("d-none");
		mostrarAvisoCesion();
	}else{
		obtenerDatosCesion(id);
    obtenerDatosCesionVehi(id);
	}	
	
  // COMPRUEBA INFORMACION DE PERMISO SOBRE CESIONES
	if(permisoDeAccesoCesion == "EDITOR" || permisoDeAccesoCesion == "ADMINISTRADOR"){
		document.getElementById('redireccionCesion').classList.remove("d-none");
	}
	
	// REPOSTAJES
	if (permisoDeAccesoRepostaje == "SIN_PERMISO" || permisoDeAccesoRepostaje == "") {
		document.getElementById('formuGenRep').classList.add("d-none");
		document.getElementById('footerBtnRepostaje').classList.add("d-none");
		mostrarAvisoRepostaje();
	}else{
		obtenerDatosRepostaje(matricula,id);
	}
	
	// SINIESTRO	
	if (permisoDeAccesoSiniestro == "SIN_PERMISO" || permisoDeAccesoSiniestro == "") {
		document.getElementById('formuGenSini').classList.add("d-none");
		document.getElementById('footerBtnSiniestro').classList.add("d-none");
		mostrarAvisoSiniestro();
	}else{
		obtenerDatosSiniestro(id);
	}
	
	// POLIZA
	if (permisoDeAccesoPoliza == "SIN_PERMISO" || permisoDeAccesoPoliza == "") {
		document.getElementById('formuGenPoli').classList.add("d-none");
		document.getElementById('footerBtnPoliza').classList.add("d-none");
		mostrarAvisoPoliza();
	}else{
		obtenerDatosPoliza(id);
    obtenerDatosPolizaVehi(id);
	}
	
  // COMPRUEBA INFORMACION DE PERMISO SOBRE POLIZAS
	if(permisoDeAccesoPoliza == "EDITOR" || permisoDeAccesoPoliza == "ADMINISTRADOR"){
		document.getElementById('redireccionPoliza').classList.remove("d-none");
	}
	
	// ITV	
	if (permisoDeAccesoItv == "SIN_PERMISO" || permisoDeAccesoItv == "") {
		document.getElementById('formuGenItv').classList.add("d-none");
		document.getElementById('footerBtnItv').classList.add("d-none");
		mostrarAvisoItv();
	}else{
		obtenerDatosItv(id);
	}
	
	// INFRACCION	
	if (permisoDeAccesoInfraccion == "SIN_PERMISO" || permisoDeAccesoInfraccion == "") {
		document.getElementById('formuGenInfra').classList.add("d-none");
		document.getElementById('footerBtnInfraccion').classList.add("d-none");
		mostrarAvisoInfraccion();
	}else{
		obtenerDatosInfraccion(id);
	}
	
	//MANTENIMIENTO
	if (permisoDeAccesoMantenimiento == "SIN_PERMISO" || permisoDeAccesoMantenimiento == "") {
		document.getElementById('formuGenMant').classList.add("d-none");
		document.getElementById('footerBtnMantenimiento').classList.add("d-none");
		mostrarAvisoMantenimiento();
	}else{
		obtenerDatosMantenimiento(id);
	}
		
	// ABRIMOS EL MODAL
	$('#modalGeneral').modal({
		keyboard: false,
		backdrop: 'static'
	});
}

/*** A NIVEL GENERAL ***/
function cabeceraMatriculas(id) {
	$.ajax({
		data: { id : id },
		url: './cabeceraMatriculas',
		type : 'POST',
		dataType: 'json',
		success: function(data)
		{
			document.getElementById("cabeceraMatriculas").innerHTML ="<u><b>Matr&iacute;culas del Veh&iacute;culo:</b></u> " + data.join(', ');		
			document.getElementById("cabeceraMatriculas").style.textAlign = "left";
			document.getElementById("cabeceraMatriculas").style.marginLeft = "25px";
			document.getElementById("cabeceraMatriculas").style.marginRight = "25px";
			document.getElementById("cabeceraMatriculas").style.marginTop = "10px";
		},
		error: function( jqXHR, textStatus, errorThrown ) {
			$("#modalGeneral #alertaGeneralCabeceraMatriculaKO").fadeIn(1500);
			setTimeout(function() {$("#modalGeneral #alertaGeneralCabeceraMatriculaKO").fadeOut(1500);},3000);
		}
	});
}
/*** FIN NIVEL GENERAL ***/

/*** FUNCIONES DE VEHICULO VISUALES GENERALES ***/
function obtenerDatosMatrVehi(id) {
	tablaMatriculaVehi = $('#modalGeneral #dataTablesVehi #tablaMatriculaVehi').DataTable({
	   "order": [[ 0, "desc" ]],
	   destroy: true,
	   ajax : {
			url: './tablaMatricula',
			data : {"idVehiculoMatricula" : id},
			dataSrc: ''
	   },
	   columnDefs: [
	            {
	                "targets": [0],
	                "visible": false
	            },
	            {
	            	"targets":4,
	            	"type":"date-eu"
	            }
	        ],
	   columns : [
	   		{
	   			title: 'id',
	   			data:'id',
	   		},
	   		{
	   			title: 'Matr&#237cula',
	   			data:'nombre',
	   		},
	   		{
	   			title: 'Tarjeta Repostaje',
	   			data:'tarjetaRepostaje', 
	   		},
	   		{
	   			title: 'Tarjeta Peaje',
	   			data:'tarjetaPeaje'
	   		},
	   		{
				  title: 'Fecha de Matriculaci&#243n', 	
          			render: function (data, type, row) { 
          			return moment(row.fechaMatriculacion).format('DD/MM/YYYY')}
        },
        {
	   			title: 'Doblada',
	   			render: function (data, type, row) {
    				return row.doblada ? 'SI' : 'NO';
				  }
	   		},
        {
	   			title: 'Observaciones',
	   			data:'observacionesMat'
	   		},
        {
				   title: 'Acciones',
	               render: function (data, type, row) {
					var visuaoeditMatricula = '';
					if (permisoDeAccesoVehiculo != "VISUALIZADOR") {
						visuaoeditMatricula = '<button type="button" id="ButtonEditarMatrVehi" class="editar edit-modal btn btn-success" onclick="redireccionPestanas(\'matricula\',\'SI\');editarMatriculaGeneral('+row.id+',\''+row.nombre+ '\',\''+(row.tarjetaRepostaje?row.tarjetaRepostaje:'')+ '\',\''+(row.tarjetaPeaje?row.tarjetaPeaje:'')+ '\',\''+(row.pin?row.pin:'')+ '\',\''+row.fechaMatriculacion+ '\','+row.fkVehiculo.id+',\''+(row.doblada?'SI':'NO')+'\',\''+(row.observacionesMat?row.observacionesMat:'')+'\')"><i class="fa fa-edit"></i></button>';
					}else{
						visuaoeditMatricula = '<button type="button" id="ButtonEditarMatrVehi" class="editar edit-modal btn btn-success" onclick="redireccionPestanas(\'matricula\',\'SI\');editarMatriculaGeneral('+row.id+',\''+row.nombre+ '\',\''+(row.tarjetaRepostaje?row.tarjetaRepostaje:'')+ '\',\''+(row.tarjetaPeaje?row.tarjetaPeaje:'')+ '\',\''+(row.pin?row.pin:'')+ '\',\''+row.fechaMatriculacion+ '\','+row.fkVehiculo.id+',\''+(row.doblada?'SI':'NO')+'\',\''+(row.observacionesMat?row.observacionesMat:'')+'\')" ><i class="fa fa-eye"></i></button>';
					}
					return visuaoeditMatricula;
	       }
	   		}]
	});
}

function obtenerDatosVehiculoDocumentoVehi(id) {
    tablaVehiculoDocumentoVehi = $('#modalGeneral #dataTablesVehi #tablaVehiculoDocumentoVehi').DataTable({
       destroy: true,
       ajax : {
            url: './tablaVehiculoDocumento',
            data : {"idVehiculo" : id},
            dataSrc: ''
       },
       columnDefs: [
                {
                    "targets": [0],
                    "visible": false
                }
            ],
       columns : [
            {
                title: 'id',
                data:'id',
            },
            {
                title: 'Nombre',
                data:'nombre'
            },
            {
                title: 'Comentarios',
                data:'comentarios'
            },
            {
                title: 'Acciones',
                render: function (data, type, row) {
					return '&nbsp;' + '<button type="button" id="ButtonDescargarDocumentoVehiculoVehi" class="editar edit-modal btn btn-success" data-toggle="tooltip" data-placement="bottom" title="Descargar" onclick="redireccionPestanas(\'vehiDoc\',\'SI\');descargarDocumentoVehiculo(\''+row.nombre+'\','+row.id+')"><span class="fa fa-file-alt"></span></button>';
				}
            }]
    });
}

function obtenerDatosEquipamientoVehi(id) {
	tablaEquipamientoVehi = $('#modalGeneral #dataTablesVehi #tablaEquipamientoVehi').DataTable({
	   "order": [[ 0, "desc" ]],
	   destroy: true,
	   ajax : {
			url: './tablaEquipamiento',
			data : {"idVehiculoEquipamiento" : id},
			dataSrc: ''
	   },
	   columnDefs: [
	            {
	                "targets": [0],
	                "visible": false
	            }
	        ],
	   columns : [
	   		{
	   			title: 'id',
	   			data:'id',
	   		},
	   		{
	   			title: 'Tipo Equipamiento',
	   			data:'fkTipoEquipamiento.nombre'
	   		},
	   		{
	   			title: 'Datos',
				data: 'fkTipoEquipamiento.literalExtra',
				render: function ( data, type, row ) {
					if(row["fkTipoEquipamiento"]["literalExtra"] != null && row["detalle"]){
						return row["fkTipoEquipamiento"]["literalExtra"] + ': ' + row["detalle"];
					}else{
						return "";
					}
				} 
			},
			{
				title: 'Observaciones',
	   			data:'observaciones'
	   		},
	   		{
	   			title: 'Acciones',
	            render: function (data, type, row) {
					var visuaoeditEquipamiento = '';
					if (permisoDeAccesoEquipamiento != "VISUALIZADOR") {
						visuaoeditEquipamiento = '<button type="button" id="ButtonEditarEquipamientoVehi" class="editar edit-modal btn btn-success" onclick="redireccionPestanas(\'equipamiento\',\'SI\');editarEquipamientoGeneral('+row.id+')"><span class="fa fa-edit"></span></button>';
					}else{
						visuaoeditEquipamiento = '<button type="button" id="ButtonEditarEquipamientoVehi" class="editar edit-modal btn btn-success" onclick="redireccionPestanas(\'equipamiento\',\'SI\');editarEquipamientoGeneral('+row.id+')"><span class="fa fa-eye"></span></button>';
					}
					return visuaoeditEquipamiento;
				}
	   		}]
	});
}

function obtenerDatosCesionVehi(id) {
	tablaCesionVehi = $('#modalGeneral #dataTablesVehi #tablaCesionVehi').DataTable({
	   "order": [[ 0, "desc" ]],
	   destroy: true,
	   ajax : {
			url: './tablaCesion',
			data : {"idVehiculoCesion" : id},
			dataSrc: ''
	   },
	   columnDefs: [
	            {
	                "targets": [0],
	                "visible": false
	            },
				{
	            	"targets":5,
	            	"type":"date-eu"
	            },
				{
	            	"targets":6,
	            	"type":"date-eu"
	            }
	        ],
	   columns : [
	   		{
	   			title: 'id',
	   			data:'id',
	   		},
	   		{
	   			title: 'Motivo',
	   			data:'fkParametroTipoMotivo.nombre'
	   		},
	   		{
				title: 'Servicio Adscrito',
	   			data:'fkServicioAdscrito.nombre'
	   		},
	   		{
				title: 'Km Iniciales',
	   			data:'kmIniciales',
				render: function (data, type, row) { return row.kmIniciales ? row.kmIniciales.replace(".", ",") : ""}
	   		},
	   		{
				title: 'Km Finales',
	   			data:'kmFinales',
				render: function (data, type, row) { return row.kmFinales ? row.kmFinales.replace(".", ",") : ""}
	   		},
	   		{
				title: 'F. Inicio',
				data: 'fechaInicio',
            	render: function (data, type, row) { return row.fechaInicio ? moment(row.fechaInicio).format('DD/MM/YYYY') : ""}

	   		},
	   		{
				title: 'F. Fin',
				data: 'fechaFin',
            	render: function (data, type, row) { return row.fechaFin ? moment(row.fechaFin).format('DD/MM/YYYY') : ""}

	   		},
	   		{
	   			title: 'Observaciones',
	   			data:'observaciones'
	   		},
	   		{
				title: 'Acciones',
	            render: function (data, type, row) {
					var visuaoeditCesion = '';
					if (permisoDeAccesoCesion != "VISUALIZADOR") {
						visuaoeditCesion = '<button type="button" id="ButtonEditarCesionVehi" class="editar edit-modal btn btn-success" onclick="redireccionPestanas(\'cesion\',\'SI\');editarCesionGeneral('+row.id+')" ><span class="fa fa-edit"></span></button>';
					}else{
						visuaoeditCesion = '<button type="button" id="ButtonEditarCesionVehi" class="editar edit-modal btn btn-success" onclick="redireccionPestanas(\'cesion\',\'SI\');editarCesionGeneral('+row.id+')" ><span class="fa fa-eye"></span></button>';
					}
					return visuaoeditCesion;
				}
	   		}]
	});
}

function obtenerDatosPolizaVehi(id) {
	tablaPolizaVehi = $('#modalGeneral #dataTablesVehi #tablaPolizaVehi').DataTable({
	"order": [[ 0, "desc" ]],
	   destroy: true,
	   ajax : {
			url: './tablaPoliza',
			data : {"idVehiculo" : id},
			dataSrc: ''
	   },
	   columnDefs: [
	            {
	                "targets": [0],
	                "visible": false
	            },
				      {
	            	"targets":5,
	            	"type":"date-eu"
	            },
				      {
	            	"targets":6,
	            	"type":"date-eu"
	            }
	        ],
	   columns : [
	   		{
	   			title: 'id',
	   			data:'id',
	   		},
	   		{
	   			title: 'Matr&iacute;cula',
	   			data: 'fkMatricula.nombre', 
	   		},
	   		{
	   			title: 'Compañ&iacute;a',
	   			data:'fkCompania.nombre'
	   		},
	   		{
	   			title: 'P&oacute;liza',
	   			data:'numeroPoliza'
	   		},
	   		{
	   			title: 'NIF',
	   			data:'nif'
	   		},
	   		{
	   			title: 'Fecha Inicio',
	   			render: function (data, type, row) { return moment(row.fechaInicio).format('DD/MM/YYYY')}
	   		},
	   		{
				  title: 'Fecha Fin', 	
            	render: function (data, type, row) { return row.fechaFin ? moment(row.fechaFin).format('DD/MM/YYYY') : ""}
        },
        {
				  title: 'Acciones',
	            render: function (data, type, row) {
					      var visuaoeditPolizaVehi = '';
					      if (permisoDeAccesoPoliza != "VISUALIZADOR") {
						      visuaoeditPolizaVehi = '<button type="button" id="ButtonEditarPolizaVehi" class="editar edit-modal btn btn-success"  onclick="redireccionPestanas(\'poliza\');editarPolizaGeneral('+row.id+','+row.fkVehiculo.id+','+row.fkMatricula.id+',\''+row.fkCompania.id+ '\',\''+(row.nif?row.nif:'')+ '\',\''+row.numeroPoliza+ '\',\''+(row.direccion?row.direccion:'')+ '\',\''+row.fechaInicio+ '\',\''+(row.fechaFin?row.fechaFin:'')+ '\',\''+(row.telefono?row.telefono:'')+ '\',\''+(row.contacto?row.contacto:'')+ '\',\''+(row.observaciones?row.observaciones:'')+ '\')"><i class="fa fa-edit"></i></button>';
					      }else{
						      visuaoeditPolizaVehi = '<button type="button" id="ButtonEditarPolizaVehi" class="editar edit-modal btn btn-success"  onclick="redireccionPestanas(\'poliza\');editarPolizaGeneral('+row.id+','+row.fkVehiculo.id+','+row.fkMatricula.id+',\''+row.fkCompania.id+ '\',\''+(row.nif?row.nif:'')+ '\',\''+row.numeroPoliza+ '\',\''+(row.direccion?row.direccion:'')+ '\',\''+row.fechaInicio+ '\',\''+(row.fechaFin?row.fechaFin:'')+ '\',\''+(row.telefono?row.telefono:'')+ '\',\''+(row.contacto?row.contacto:'')+ '\',\''+(row.observaciones?row.observaciones:'')+ '\')"><i class="fa fa-eye"></i></button>';
					      }
					      return visuaoeditPolizaVehi;
				      }
        }]
	});
}

function obtenerhistoricoServicioAdscritoVehi(id){
	tablaHistoricoVehi = $('#modalGeneral #dataTablesVehi #tablaHistoricoVehi').DataTable({
		"order": [[ 0, "desc" ]],
		destroy: true,
		ajax : {
			url: './tablaHistorico',
			data: {"idVehiculoHistorico" : id},
			dataSrc: ''
		},
		columnDefs: [
		{
			"targets": [0],
			"visible": false
		}
		],
		columns : [
		{
			title: 'id',
			data:'id',
		},
		{
			title: 'Servicio Adscrito',
			data: 'fkServicioAdscrito.nombre',
		},
		{
			title: 'Fecha Adscripci&oacute;n',
			data: 'fechaServicio',
			render: function (data, type, row) { return row.fechaServicio ? moment(row.fechaServicio).format('DD/MM/YYYY') : ""}
		}],
	});
}
/*** HASTA AQUI ***/

/*** INICIO VEHICULO ***/
function deshabilitarDatosVehi(){
	$('#modalGeneral #geneVehiculo input').prop('disabled',true);
	$('#modalGeneral #geneVehiculo select').prop('disabled',true);
	$('#modalGeneral #geneVehiculo textarea').prop('disabled',true);
	$('#modalGeneral #guardarVehiculo').addClass('btn-light');
	$('#modalGeneral #guardarVehiculo').prop('disabled',true);
	$('#modalGeneral #habilitarEdicionVehi').removeClass('btn-light');
	$('#modalGeneral #habilitarEdicionVehi').prop('disabled',false);
	$('#modalGeneral #eliminarVehiculoGeneral').removeClass('btn-light');
	$('#modalGeneral #eliminarVehiculoGeneral').prop('disabled',false);
	// COMPROBAMOS SI EL PERMISO DEL USUARIO ES VISUALIZADOR YA QUE HABRIA QUE DESHABILITAR LOS BOTONES
	if (permisoDeAccesoVehiculo == "VISUALIZADOR") {
		$('#modalGeneral #habilitarEdicionVehi').addClass('btn-light');
		$('#modalGeneral #habilitarEdicionVehi').prop('disabled',true);
		$('#modalGeneral #eliminarVehiculoGeneral').addClass('btn-light');
		$('#modalGeneral #eliminarVehiculoGeneral').prop('disabled',true);
	}
}

function habilitarEdicionVehiculo() {
	$('#modalGeneral #geneVehiculo input').prop('disabled', false);
	$('#modalGeneral #geneVehiculo select').prop('disabled', false);
	$('#modalGeneral #geneVehiculo textarea').prop('disabled', false);
	$('#modalGeneral #guardarVehiculo').removeClass('btn-light');
	$('#modalGeneral #guardarVehiculo').prop('disabled',false);
	$('#modalGeneral #eliminarVehiculoGeneral').removeClass('btn-light');
	$('#modalGeneral #eliminarVehiculoGeneral').prop('disabled',true);
	$('#modalGeneral #habilitarEdicionVehi').addClass('btn-light');
	$('#modalGeneral #habilitarEdicionVehi').prop('disabled',true);
	if($("#modalGeneral #geneVehiculo #situacionOpt option:selected").text() != null){
		if($("#modalGeneral #geneVehiculo #situacionOpt option:selected").text() == "ALTA"){
			$('#modalGeneral #geneVehiculo #baja').prop('disabled', true);
			$('#modalGeneral #geneVehiculo #motivoBaja').prop('disabled', true);
		}
	}
	if($("#modalGeneral #geneVehiculo #adquisicionOpt option:selected").text() != null){
		if($("#modalGeneral #geneVehiculo #adquisicionOpt option:selected").text() != "RENTING"){
			$('#modalGeneral #geneVehiculo #fkOperadora').prop('disabled', true);
		}else{
			$('#modalGeneral #geneVehiculo #operadoraLabel').html('Empresa Operadora (*)');
		}
	}
}

function obtenerDatosVehi(id){
	$.ajax({
		data: { id : id },
		url: './obtenerVehiculo',
		type : 'POST',
		dataType: 'json',
		success: function(data)
		{
			$('#modalGeneral #formuEstadoGeneralVehi #estadoGeneralVehi').val(data.fkParametroTipoSituacion.nombre);
			if(data.fkServicioAdscrito != null){
				$('#modalGeneral #geneVehiculo #servicioOpt').val(data.fkServicioAdscrito.id);
				$('#modalGeneral #geneVehiculo #adscritoActual').val(data.fkServicioAdscrito.id);
			}
			$('#modalGeneral #geneVehiculo #adscripcion').val(data.fechaAdscripcion);
			$('#modalGeneral #geneVehiculo #tipoVehiculo').val(data.fkModelo.fkParametroTipoVehiculo.nombre);
			if(data.fkParametroTipoSituacion != null){
                $('#modalGeneral #geneVehiculo #situacionOpt').val(data.fkParametroTipoSituacion.id);
                $('#modalGeneral #geneVehiculo #baja').val(data.fechaBaja);
                $('#modalGeneral #geneVehiculo input[name="motivoBaja"]').val(data.motivoBaja);
            }
			if(data.fkParametroTipoRepostaje != null){
				$('#modalGeneral #geneVehiculo #repostajeOpt').val(data.fkParametroTipoRepostaje.id);
			}else{
				$('#modalGeneral #geneVehiculo #repostajeOpt').val('0');
			}
			if(data.fkParametroTipoAdquisicion != null){
				$('#modalGeneral #geneVehiculo #adquisicionOpt').val(data.fkParametroTipoAdquisicion.id);
				if(data.fkParametroTipoAdquisicion.nombre == "RENTING"){
					$('#modalGeneral #geneVehiculo #fkOperadora').val(data.fkOperadora.id);
					$('#modalGeneral #geneVehiculo #operadoraLabel').html('Empresa Operadora (*)');
				}else{
					$('#modalGeneral #geneVehiculo #fkOperadora').val('')
				}
			}else{
				$('#modalGeneral #geneVehiculo #adquisicionOpt').val('0');
				$('#modalGeneral #geneVehiculo #fkOperadora').val('');
			}					
			if(data.fkModelo.fkMarca != null){
				var modelos = $("#modalGeneral #geneVehiculo #modeloOpt");
				$('#modalGeneral #geneVehiculo #marcaOpt').val(data.fkModelo.fkMarca.id);
				$.ajax({
						data: { id : data.fkModelo.fkMarca.id },
						url: './rellenaModelosPorMarca',
						type : 'POST',
						dataType: 'json',

						success: function(r)
						{
							modelos.children('option:not(:first)').remove();
								
							$(r).each(function(i,v){
								$('#modalGeneral #geneVehiculo #modeloOpt').append(new Option(v.nombre, v.id, false, false));
							})
							$('#modalGeneral #geneVehiculo #modeloOpt').val(data.fkModelo.id);	
						},
						
					});
			}
			$('#modalGeneral #geneVehiculo #compra').val(data.fechaCompra);
			$('#modalGeneral #geneVehiculo input[name="expedienteCompra"]').val(data.expedienteCompra);
			$('#modalGeneral #geneVehiculo input[name="numeroInventario"]').val(data.numeroInventario);
			$('#modalGeneral #geneVehiculo input[name="color"]').val(data.color);
			$('#modalGeneral #geneVehiculo input[name="numeroBastidor"]').val(data.numeroBastidor);
			if(data.fkParametroTipoUso != null){
				$('#modalGeneral #geneVehiculo #usoOpt').val(data.fkParametroTipoUso.id);
			}else{
				$('#modalGeneral #geneVehiculo #usoOpt').val('0');
			}
			if(data.fkParametroTipoDestino != null){
				$('#modalGeneral #geneVehiculo #destinoOpt').val(data.fkParametroTipoDestino.id);
			}else{
				$('#modalGeneral #geneVehiculo #destinoOpt').val('0');
			}
			$('#modalGeneral #geneVehiculo #baja').val(data.fechaBaja);
			$('#modalGeneral #geneVehiculo input[name="motivoBaja"]').val(data.motivoBaja);
			$('#modalGeneral #geneVehiculo input[name="motivoDestino"]').val(data.motivoDestino);
			$('#modalGeneral #geneVehiculo #observaciones').val(data.observaciones);
			$('#modalGeneral #geneVehiculo #idVehiculoActualiza').val(data.id);
		},
	});
}

// Cuando cambia el modelo del vehiculo
$("#modalGeneral #geneVehiculo #modeloOpt").change(function(){
    var modeloId = $(this).val();
    rellenarTipoVehiculo(modeloId);
});


function crearVehiculoGeneral() {
	if(validaCamposGeneralVehiculos())
	{
		$.ajax({
		    type: 'POST',
		    url: './crearVehiculo',
		    data: $('#modalGeneral #geneVehiculo').serialize() , 
		    success: function (data) {
		    	$('#modalGeneral #formuEstadoGeneralVehi #estadoGeneralVehi').val($('#modalGeneral #geneVehiculo #situacionOpt option:selected').text());
				deshabilitarDatosVehi();
				filtroDobladaVehi();
        var datosIVA = 'NO';
        rellenarDatosMantenimiento($('#modalGeneral #geneVehiculo #idVehiculoActualiza').val(), datosIVA);
        obtenerhistoricoServicioAdscrito($('#modalGeneral #geneVehiculo #idVehiculoActualiza').val());
				$("#modalGeneral #alertaGeneralVehiculoOK").fadeIn(1500);
				setTimeout(function() {$("#modalGeneral #alertaGeneralVehiculoOK").fadeOut(1500);},3000);
				// SE TIENE EN CUENTA LOS BOTONES DEL APARTADO DE MATRICULA, EQUIPAMIENTO, MATERIALES, CESIONES, REPOSTAJE,
				// SINIESTRO, POLIZA, ITV E INFRACCION, PARA HABILITARLOS SI FUESE NECESARIO
				Botones_Matricula();
				Botones_Equipamiento();
				Botones_Materiales();
				Botones_Cesiones();
				Botones_Repostaje();
				Botones_Siniestro();
				Botones_Poliza();
				Botones_Itv();
				Botones_Infraccion();
				Botones_Mantenimiento();
    		},
			 error: function( jqXHR, textStatus, errorThrown ) {
				$("#modalGeneral #alertaGeneralVehiculoKO").fadeIn(1500);
				setTimeout(function() {$("#modalGeneral #alertaGeneralVehiculoKO").fadeOut(1500);},3000);
			 }
		});
	}
}

function validaCamposGeneralVehiculos() {
	var res = true;
	if($('#modalGeneral #geneVehiculo #servicioOpt').val() == "") {
		$('#modalGeneral #geneVehiculo #servicioOpt').addClass("border border-danger");
		$('#modalGeneral #geneVehiculo #sAdsLabel').html('Servicio Adscrito (*) Campo Obligatorio');	
		$('#modalGeneral #geneVehiculo #sAdsLabel').css('color','red');
		res = false;
	}
	if($('#modalGeneral #geneVehiculo #modeloOpt').val() == "") {
		$('#modalGeneral #geneVehiculo #modeloOpt').addClass("border border-danger");	
		$('#modalGeneral #geneVehiculo #modeloLabel').html('Modelo (*) Campo Obligatorio');	
		$('#modalGeneral #geneVehiculo #modeloLabel').css('color','red');
		res = false;
	}	
	if($('#modalGeneral #geneVehiculo #marcaOpt').val() == "") {
		$('#modalGeneral #geneVehiculo #marcaOpt').addClass("border border-danger");	
		$('#modalGeneral #geneVehiculo #marcaLabel').html('Marca (*) Campo Obligatorio');	
		$('#modalGeneral #geneVehiculo #marcaLabel').css('color','red');
		res = false;
	}
	if($('#modalGeneral #geneVehiculo #adquisicionOpt option:selected').text() == "RENTING" && $('#modalGeneral #geneVehiculo #fkOperadora option:selected').val()=="")
	{
		$('#modalGeneral #geneVehiculo #fkOperadora').addClass("border border-danger");	
		$('#modalGeneral #geneVehiculo #operadoraLabel').html('Empresa Operadora (*) Campo Obligatorio');	
		$('#modalGeneral #geneVehiculo #operadoraLabel').css('color','red');
		$('#modalGeneral #geneVehiculo #nuevoVehiculoMatr-tab').addClass("text-danger");
		res = false;
		validV = false;
	}
		
	if(!($('#modalGeneral #geneVehiculo #compra').val()) == "" && !($('#modalGeneral #geneVehiculo #adscripcion').val()) == "") {
		if(ValidateDate($('#modalGeneral #geneVehiculo #compra').val(), $('#modalGeneral #geneVehiculo #adscripcion').val()) == false){
			$('#modalGeneral #geneVehiculo #adscripcion').addClass("border border-danger");	
			$('#modalGeneral #geneVehiculo #lblAdscripcion').html('Fecha Adscripción, La fecha adscripción no puede ser anterior a la fecha compra');	
			$('#modalGeneral #geneVehiculo #lblAdscripcion').css('color','red');
			res = false;
		}
	}
		return res;
}

function modalEliminarVehiculoGeneral(){
	var idVehiAct = $('#modalGeneral #geneVehiculo #idVehiculoActualiza').val();
	$('#eliminarVehiculoGeneral #idModalEliminarVehiculoGeneral').text('Eliminar Vehículo: '+idVehiAct);
	$('#eliminarVehiculoGeneral #idVehiculoEliminarGeneral').val(idVehiAct);
	$('#modalEliminarVehiculoGeneral').modal('show');
}

function eliminarVehiculoGeneral() {
	var parser = new DOMParser();
	var responseDoc = null;
	$.ajax({
		    type: 'POST',
		    url: './eliminarVehiculo',
		    data: $('#modalEliminarVehiculoGeneral #eliminarVehiculoGeneral').serialize() ,
		    success: function (data) {
		    	$('#modalEliminarVehiculoGeneral').modal('hide');
		    	$('#modalGeneral').modal('hide');
				filtroDobladaVehi();
				// PARSEAMOS EL DATA, SACAMOS EL VALOR DEL MENSAJE DE SUCCESS Y LO INCLUIMOS EN EL DIV CORRESPONDIENTE
				responseDoc = parser.parseFromString(data, "text/html");
	    	var msjSuc = responseDoc.getElementById("msjSuccessGeneral").value;
				$("#alertaEliminarVehiculoGeneralOK").html('<strong>'+msjSuc+'</strong>');
				$("#alertaEliminarVehiculoGeneralOK").fadeIn(1500);
				setTimeout(function() {$("#alertaEliminarVehiculoGeneralOK").fadeOut(1500);},3000);		
    		},
			 error: function( jqXHR, textStatus, errorThrown ) {
			 	$('#modalEliminarVehiculoGeneral').modal('hide');
			 	$('#modalGeneral').modal('hide');
				// PARSEAMOS EL ERROR Y LO INCLUIMOS EN EL DIV CORRESPONDIENTE
				responseDoc = parser.parseFromString(jqXHR.responseText, "text/html");
				var myNodeList = responseDoc.body.querySelectorAll("p");
			    var msjErr = myNodeList[1].textContent.split("MsgException"); 
				$("#alertaEliminarVehiculoGeneralKO").html('<strong>Error'+msjErr[1]+'</strong>');
				$("#alertaEliminarVehiculoGeneralKO").fadeIn(1500);
				setTimeout(function() {$("#alertaEliminarVehiculoGeneralKO").fadeOut(1500);},3000);
			 }
		});
}

$("#modalGeneral #geneVehiculo #adquisicionOpt").change(function(){
	$('#modalGeneral #geneVehiculo #operadoraLabel').css('color','black');
	$('#modalGeneral #geneVehiculo #fkOperadora').removeClass("border border-danger");
	if($("#modalGeneral #geneVehiculo #adquisicionOpt").find('option:selected').text() == "RENTING")
	{
		$('#modalGeneral #geneVehiculo #fkOperadora').prop('disabled', false);
		$('#modalGeneral #geneVehiculo #operadoraLabel').html('Empresa Operadora (*)');
	}
	else{
		$('#modalGeneral #geneVehiculo #fkOperadora').prop('disabled', true);
		$('#modalGeneral #geneVehiculo #fkOperadora').val("");
		$('#modalGeneral #geneVehiculo #operadoraLabel').html('Empresa Operadora');	
	}
});

$("#modalGeneral #geneVehiculo #fkOperadora").change(function(){
	$('#modalGeneral #geneVehiculo #fkOperadora').removeClass("border border-danger");
	$('#modalGeneral #geneVehiculo #operadoraLabel').html('Empresa Operadora (*)');	
	$('#modalGeneral #geneVehiculo #operadoraLabel').css('color','black');
	}
);

$("#modalGeneral #geneVehiculo #situacionOpt").change(function(){
	if($("#modalGeneral #geneVehiculo #situacionOpt").find('option:selected').text() == "BAJA")
	{
		$('#modalGeneral #geneVehiculo #baja').prop('disabled', false);
		$('#modalGeneral #geneVehiculo #motivoBaja').prop('disabled', false);
	}
	else{
		$('#modalGeneral #geneVehiculo #baja').prop('disabled', true);
		$('#modalGeneral #geneVehiculo #motivoBaja').prop('disabled', true);
		$('#modalGeneral #geneVehiculo #baja').val("");
		$('#modalGeneral #geneVehiculo #motivoBaja').val("");
	}
});

$("#modalGeneral #geneVehiculo #modeloOpt").change(function() {
	$('#modalGeneral #geneVehiculo #modeloOpt').removeClass("border border-danger");
	$('#modalGeneral #geneVehiculo #modeloLabel').html('Modelo (*)');
	$('#modalGeneral #geneVehiculo #modeloLabel').css('color','black');
});

$("#modalGeneral #geneVehiculo #servicioOpt").change(function() {
	$('#modalGeneral #geneVehiculo #servicioOpt').removeClass("border border-danger");
	$('#modalGeneral #geneVehiculo #sAdsLabel').html('Servicio Adscrito (*)');
	$('#modalGeneral #geneVehiculo #sAdsLabel').css('color','black');
});

$("#modalGeneral #geneVehiculo #adscripcion").change(function() {
	$('#modalGeneral #geneVehiculo #adscripcion').removeClass("border border-danger");
	$('#modalGeneral #geneVehiculo #lblAdscripcion').html('Fecha Adscripción');
	$('#modalGeneral #geneVehiculo #lblAdscripcion').css('color','black');
});

//CUANDO CAMBIA LA MARCA DEL VEHICULO SE RELLENAN LOS MODELOS (EDICION VEHICULO)
$("#modalGeneral #geneVehiculo #marcaOpt").change(function(){
	var modelosE = $("#modalGeneral #geneVehiculo #modeloOpt");
	var marcasE = $(this);
	rellenarTipoVehiculo("");
	if($(this).val() != ''){
		$.ajax({
			data: { id : marcasE.val() },
			url: './rellenaModelosPorMarca',
			type : 'POST',
			dataType: 'json',
			success: function(r){
				modelosE.children('option:not(:first)').remove();
				$(r).each(function(i,v){
					$('#modalGeneral #geneVehiculo #modeloOpt').append(new Option(v.nombre, v.id, false, false));
				})
			},
			
		});
	}else{
		modelosE.children('option:not(:first)').remove();
	}
	
	// LIMPIAMOS LOS ERRORES DE LA MARCA EN CASO DE QUE HAYA ALGUNO
	$('#modalGeneral #geneVehiculo #marcaOpt').removeClass("border border-danger");
	$('#modalGeneral #geneVehiculo #marcaLabel').html('Marca (*)');
	$('#modalGeneral #geneVehiculo #marcaLabel').css('color','black');
});

function resetModalVehiculoGeneral() {
	$('#modalGeneral #geneVehiculo #modeloOpt').removeClass("border border-danger");
	$('#modalGeneral #geneVehiculo #modeloLabel').html('Modelo (*)');
	$('#modalGeneral #geneVehiculo #modeloLabel').css('color','black');
	$('#modalGeneral #geneVehiculo #servicioOpt').removeClass("border border-danger");
	$('#modalGeneral #geneVehiculo #sAdsLabel').html('Servicio Adscrito (*)');
	$('#modalGeneral #geneVehiculo #sAdsLabel').css('color','black');
	$('#modalGeneral #geneVehiculo #marcaOpt').removeClass("border border-danger");
	$('#modalGeneral #geneVehiculo #marcaLabel').html('Marca (*)');
	$('#modalGeneral #geneVehiculo #marcaLabel').css('color','black');
	$('#modalGeneral #geneVehiculo #fkOperadora').removeClass("border border-danger");
	$('#modalGeneral #geneVehiculo #operadoraLabel').html('Empresa Operadora');
	$('#modalGeneral #geneVehiculo #operadoraLabel').css('color','black');
}
/*** FIN VEHICULO ***/

/*** INICIO MATRICULA ***/
function Botones_Matricula(){
	if($('#modalGeneral #formuEstadoGeneralVehi #estadoGeneralVehi').val() == "ALTA" && $('#modalGeneral #habilitarEdicionMatr').prop('disabled')==true)
	{
		$('#modalGeneral #tablaMatricula #ButtonEditarMatr').removeClass('btn-light');
		$('#modalGeneral #tablaMatricula #ButtonEditarMatr').addClass('btn-success');
		$('#modalGeneral #tablaMatricula #ButtonEditarMatr').prop('disabled',false);
    if (permisoDeAccesoVehiculo != "VISUALIZADOR") {
		  $('#modalGeneral #tablaMatricula #ButtonEliminarMatr').removeClass('btn-light');
		  $('#modalGeneral #tablaMatricula #ButtonEliminarMatr').addClass('btn-success');
		  $('#modalGeneral #tablaMatricula #ButtonEliminarMatr').prop('disabled',false);
    }
	}else{
		$('#modalGeneral #tablaMatricula #ButtonEditarMatr').removeClass('btn-success');
		$('#modalGeneral #tablaMatricula #ButtonEditarMatr').addClass('btn-light');
		$('#modalGeneral #tablaMatricula #ButtonEditarMatr').prop('disabled',true);
		$('#modalGeneral #tablaMatricula #ButtonEliminarMatr').removeClass('btn-success');
		$('#modalGeneral #tablaMatricula #ButtonEliminarMatr').addClass('btn-light');
		$('#modalGeneral #tablaMatricula #ButtonEliminarMatr').prop('disabled',true);
	}
}

function deshabilitarDatosMatr(){
	$('#modalGeneral #geneMatricula input').prop('disabled',true);
	$('#modalGeneral #geneMatricula select').prop('disabled',true);
	$('#modalGeneral #geneMatricula textarea').prop('disabled',true);
	$('#modalGeneral #guardaMatricula').addClass('btn-light');
	$('#modalGeneral #guardaMatricula').prop('disabled',true);
	$('#modalGeneral #limpiaMatricula').addClass('btn-light');
	$('#modalGeneral #limpiaMatricula').prop('disabled',true);
	$('#modalGeneral #habilitarEdicionMatr').removeClass('btn-light');
	$('#modalGeneral #habilitarEdicionMatr').prop('disabled',false);
}

function habilitarEdicionMatricula() {
  if(permisoDeAccesoVehiculo=="EDITOR" || permisoDeAccesoVehiculo=="ADMINISTRADOR"){
		$('#modalGeneral #geneMatricula input').prop('disabled', false);
		$('#modalGeneral #geneMatricula select').prop('disabled', false);
		$('#modalGeneral #geneMatricula textarea').prop('disabled',false);
		$('#modalGeneral #guardaMatricula').removeClass('btn-light');
		$('#modalGeneral #guardaMatricula').prop('disabled',false);
		$('#modalGeneral #limpiaMatricula').removeClass('btn-light');
		$('#modalGeneral #limpiaMatricula').prop('disabled',false);
	}
	$('#modalGeneral #habilitarEdicionMatr').addClass('btn-light');
	$('#modalGeneral #habilitarEdicionMatr').prop('disabled',true);
	// SE COMPRUEBA SI ESTA DE BAJA EL VEHICULO PARA HABILITAR BOTONES DE MATRICULA O NO
	Botones_Matricula();
}

// ESTA FUNCION OBTIENE EL ID DEL VEHICULO
function obtenerDatosMatr(id) {
	clearModalGenMatricula();
	$('#modalGeneral #geneMatricula #idVehiculoMatricula').val(id);

	tablaMatricula = $('#modalGeneral #tablaMatricula').DataTable({
	   "order": [[ 0, "desc" ]],
	   destroy: true,
	   ajax : {
			url: './tablaMatricula',
			data : {"idVehiculoMatricula" : id},
			dataSrc: ''
	   },
	   columnDefs: [
	            {
	                "targets": [0],
	                "visible": false
	            },
	            {
	            	"targets":4,
	            	"type":"date-eu"
	            }
	        ],
	   columns : [
	   		{
	   			title: 'id',
	   			data:'id',
	   		},
	   		{
	   			title: 'Matr&#237cula',
	   			data:'nombre',
	   		},
	   		{
	   			title: 'Tarjeta Repostaje',
	   			data:'tarjetaRepostaje', 
	   		},
	   		{
	   			title: 'Tarjeta Peaje',
	   			data:'tarjetaPeaje'
	   		},
	   		{
				  title: 'Fecha de Matriculaci&#243n', 	
          render: function (data, type, row) { return moment(row.fechaMatriculacion).format('DD/MM/YYYY')}
        },
        {
	   			title: 'Doblada',
	   			render: function (data, type, row) {
    				return row.doblada ? 'SI' : 'NO';
				  }
	   		},
        {
	   			title: 'Observaciones',
	   			data:'observacionesMat'
	   		},
            {
				   title: 'Acciones',
	               render: function (data, type, row) {
					var eliminarMatricula = '<button type="button" id="ButtonEliminarMatr" class="editar edit-modal btn btn-light" onclick="modalEliminarMatriculaGeneral('+row.id+',\''+row.nombre+'\')" disabled="true"><i class="fa fa-trash"></i></button>';
					var visuaoeditMatricula = '';
					if (permisoDeAccesoVehiculo != "VISUALIZADOR") {
						visuaoeditMatricula = '<button type="button" id="ButtonEditarMatr" class="editar edit-modal btn btn-light" onclick="editarMatriculaGeneral('+row.id+',\''+row.nombre+ '\',\''+(row.tarjetaRepostaje?row.tarjetaRepostaje:'')+ '\',\''+(row.tarjetaPeaje?row.tarjetaPeaje:'')+ '\',\''+(row.pin?row.pin:'')+ '\',\''+row.fechaMatriculacion+ '\','+row.fkVehiculo.id+',\''+(row.doblada?'SI':'NO')+'\',\''+(row.observacionesMat?row.observacionesMat:'')+'\')" disabled="true"><i class="fa fa-edit"></i></button>';
					}else{
						visuaoeditMatricula = '<button type="button" id="ButtonEditarMatr" class="editar edit-modal btn btn-light" onclick="editarMatriculaGeneral('+row.id+',\''+row.nombre+ '\',\''+(row.tarjetaRepostaje?row.tarjetaRepostaje:'')+ '\',\''+(row.tarjetaPeaje?row.tarjetaPeaje:'')+ '\',\''+(row.pin?row.pin:'')+ '\',\''+row.fechaMatriculacion+ '\','+row.fkVehiculo.id+',\''+(row.doblada?'SI':'NO')+'\',\''+(row.observacionesMat?row.observacionesMat:'')+'\')" disabled="true"><i class="fa fa-eye"></i></button>';
					}
					return visuaoeditMatricula + '&nbsp;' + eliminarMatricula;
	               }
	   		}],
	});
}

$('#tablaMatricula').on( 'draw.dt', function () {
    Botones_Matricula();
} );

function clearModalGenMatricula(nombre) {
	$('#modalGeneral #formuGenMatr').find('form')[0].reset();
	$('#modalGeneral #geneMatricula #idMatricula').val(null);
	if(nombre!="limpiaMatricula"){
		deshabilitarDatosMatr();
		resetModalMatriculaGeneral();
	}else{
		habilitarEdicionMatricula();
	}
}

function resetModalMatriculaGeneral() {
	$('#modalGeneral #geneMatricula #nombre').removeClass("border border-danger");
	$('#modalGeneral #geneMatricula #lblNombre').html('Matrícula (*)');	
	$('#modalGeneral #geneMatricula #lblNombre').css('color','black');
	$('#modalGeneral #geneMatricula #fechaMatriculacion').removeClass("border border-danger");	
	$('#modalGeneral #geneMatricula #lblFechaMatriculacion').html('Fecha Matriculación (*)');	
	$('#modalGeneral #geneMatricula #lblFechaMatriculacion').css('color','black');
}

function crearMatriculaGeneral() {
	if(validaCamposMatriculaGeneral())
	{
		var parser = new DOMParser();
		var responseDoc = null;
		$.ajax({
		    type: 'POST',
		    url: './crearMatricula',
		    data: $('#modalGeneral #geneMatricula').serialize() , 
		    success: function (data) {
				// PARSEAMOS EL DATA, SACAMOS EL VALOR DEL MENSAJE DE SUCCESS Y LO INCLUIMOS EN EL DIV CORRESPONDIENTE
				responseDoc = parser.parseFromString(data, "text/html");
		    	var msjSuc = responseDoc.getElementById("msjSuccessGeneral").value;
				$("#modalGeneral #alertaSuccesGeneral").html('<strong>'+msjSuc+'</strong>');
				filtroDobladaVehi();
				tablaMatricula.ajax.reload();
				tablaMatriculaVehi.ajax.reload();	
				$("#modalGeneral #alertaSuccesGeneral").fadeIn(1500);
				setTimeout(function() {$("#modalGeneral #alertaSuccesGeneral").fadeOut(1500);},3000);
				cabeceraMatriculas($('#modalGeneral #geneMatricula #idVehiculoMatricula').val());
				clearModalGenMatricula();
				// RECARGAMOS EL LISTADO DE MATRICULAS DEL VEHICULO EN LOS DESPLEGABLES CORRESPONDIENTES
				recargarMatriculas($('#modalGeneral #geneVehiculo #idVehiculoActualiza').val(),"geneRepostaje","matriculaRepo");
				recargarMatriculas($('#modalGeneral #geneVehiculo #idVehiculoActualiza').val(),"geneSiniestro","matriculaSini");
				recargarMatriculas($('#modalGeneral #geneVehiculo #idVehiculoActualiza').val(),"genePoliza","matriculaPoli");
				recargarMatriculas($('#modalGeneral #geneVehiculo #idVehiculoActualiza').val(),"geneItv","matriculaItv");
				recargarMatriculas($('#modalGeneral #geneVehiculo #idVehiculoActualiza').val(),"geneInfraccion","matriculaInfr");
				recargarMatriculas($('#modalGeneral #geneVehiculo #idVehiculoActualiza').val(),"geneMantenimiento","matriculaMant");
        // LIMPIAMOS LOS FORMULARIOS EN LOS QUE INTERVIENE LA MATRICULA
        clearModalGenRepostaje();
        clearModalGenSiniestro();
        clearModalGenPoliza();
        clearModalGenItv();
        clearModalGenInfraccion();
        clearModalGenMantenimiento();
        // RECARGAMOS LAS TABLAS EN LAS QUE SE ESPECIFICAN LAS MATRICULAS
				tablaRepostaje.ajax.reload();
				tablaSiniestro.ajax.reload();
        tablaPoliza.ajax.reload();
        tablaItv.ajax.reload();
        tablaInfraccion.ajax.reload();
        tablaMantenimiento.ajax.reload();
    		},
			 error: function( jqXHR, textStatus, errorThrown ) {
				// PARSEAMOS EL DATA, SACAMOS EL VALOR DEL MENSAJE DE SUCCESS Y LO INCLUIMOS EN EL DIV CORRESPONDIENTE
				responseDoc = parser.parseFromString(jqXHR.responseText, "text/html");
				var myNodeList = responseDoc.body.querySelectorAll("p");
			    var msjErr = myNodeList[1].textContent.split("java.lang.Exception"); 
				$("#modalGeneral #alertaErrorGeneral").html('<strong>Error'+msjErr[1]+'</strong>');
				$("#modalGeneral #alertaErrorGeneral").fadeIn(1500);
				setTimeout(function() {$("#modalGeneral #alertaErrorGeneral").fadeOut(1500);},3000);
			 }
		});
	}
}

function validaCamposMatriculaGeneral() {
	var res = true;
	
	if($('#modalGeneral #geneMatricula #nombre').val() == "") {
		$('#modalGeneral #geneMatricula #nombre').addClass("border border-danger");
		$('#modalGeneral #geneMatricula #lblNombre').html('Matrícula (*) Campo Obligatorio');	
		$('#modalGeneral #geneMatricula #lblNombre').css('color','red');
		res = false;
	}
	
	if($('#modalGeneral #geneMatricula #fechaMatriculacion').val() == "") {
		$('#modalGeneral #geneMatricula #fechaMatriculacion').addClass("border border-danger");
		$('#modalGeneral #geneMatricula #lblFechaMatriculacion').html('Fecha Matriculación (*) Campo Obligatorio');	
		$('#modalGeneral #geneMatricula #lblFechaMatriculacion').css('color','red');
		res = false;
	}	
	return res;
}

function editarMatriculaGeneral(id, nombre, tarjetaRepostaje, tarjetaPeaje, pin, fechaMatriculacion, idVehiculo, doblada, observaciones){
	$('#modalGeneral #geneMatricula #idMatricula').val(id);
	$('#modalGeneral #geneMatricula #idVehiculoMatricula').val(idVehiculo);
	$('#modalGeneral #geneMatricula #nombre').val(nombre);
	$('#modalGeneral #geneMatricula #tarjetaRepostaje').val(tarjetaRepostaje);
	$('#modalGeneral #geneMatricula #tarjetaPeaje').val(tarjetaPeaje);
  if(doblada == "SI"){
		$('#modalGeneral #geneMatricula #doblada').prop("checked", true);
	}else{
		$('#modalGeneral #geneMatricula #doblada').prop("checked", false);
	}
	if(pin != null){
		$('#modalGeneral #geneMatricula #pin').val(pin);
	}
	$('#modalGeneral #geneMatricula #fechaMatriculacion').val(fechaMatriculacion);
	$('#modalGeneral #geneMatricula #observacionesMatricula').val(observaciones);
	resetModalMatriculaGeneral();
}

function modalEliminarMatriculaGeneral(id, nombre) {
	$('#modalEliminarMatriculaGeneral #idModalEliminarMatriculaGeneral').text('Eliminar Matrícula: '+nombre);
	$('#modalEliminarMatriculaGeneral #idMatriculaEliminarGeneral').val(id);
	$('#modalEliminarMatriculaGeneral').modal('show');
}

function eliminarMatriculaGeneral() {
	var parser = new DOMParser();
	var responseDoc = null;
	$.ajax({
		type: 'POST',
		url: './eliminarMatricula',
		data: $('#modalEliminarMatriculaGeneral #eliminarMatriculaGeneral').serialize() ,
		success: function (data) {
			// PARSEAMOS EL DATA, SACAMOS EL VALOR DEL MENSAJE DE SUCCESS Y LO INCLUIMOS EN EL DIV CORRESPONDIENTE
			responseDoc = parser.parseFromString(data, "text/html");
	    	var msjSuc = responseDoc.getElementById("msjSuccessGeneral").value;
			$("#modalGeneral #alertaSuccesGeneral").html('<strong>'+msjSuc+'</strong>');
		   	$('#modalEliminarMatriculaGeneral').modal('hide');
			tablaMatricula.ajax.reload();	
			tablaMatriculaVehi.ajax.reload();				
			filtroDobladaVehi();
			$("#modalGeneral #alertaSuccesGeneral").fadeIn(1500);
			setTimeout(function() {$("#modalGeneral #alertaSuccesGeneral").fadeOut(1500);},3000);
			cabeceraMatriculas($('#modalGeneral #geneMatricula #idVehiculoMatricula').val());
			clearModalGenMatricula();
			// RECARGAMOS EL LISTADO DE MATRICULAS DEL VEHICULO EN LOS SELECT CORRESPONDIENTES
			recargarMatriculas($('#modalGeneral #geneVehiculo #idVehiculoActualiza').val(),"geneRepostaje","matriculaRepo");
			recargarMatriculas($('#modalGeneral #geneVehiculo #idVehiculoActualiza').val(),"geneSiniestro","matriculaSini");
			recargarMatriculas($('#modalGeneral #geneVehiculo #idVehiculoActualiza').val(),"genePoliza","matriculaPoli");
			recargarMatriculas($('#modalGeneral #geneVehiculo #idVehiculoActualiza').val(),"geneItv","matriculaItv");
			recargarMatriculas($('#modalGeneral #geneVehiculo #idVehiculoActualiza').val(),"geneInfraccion","matriculaInfr");
      recargarMatriculas($('#modalGeneral #geneVehiculo #idVehiculoActualiza').val(),"geneMantenimiento","matriculaMant");
      // LIMPIAMOS LOS FORMULARIOS EN LOS QUE INTERVIENE LA MATRICULA
      clearModalGenRepostaje();
      clearModalGenSiniestro();
      clearModalGenPoliza();
      clearModalGenItv();
      clearModalGenInfraccion();
      clearModalGenMantenimiento();
    	},
		error: function( jqXHR, textStatus, errorThrown ) {
			// PARSEAMOS EL DATA, SACAMOS EL VALOR DEL MENSAJE DE SUCCESS Y LO INCLUIMOS EN EL DIV CORRESPONDIENTE
			responseDoc = parser.parseFromString(jqXHR.responseText, "text/html");
			var myNodeList = responseDoc.body.querySelectorAll("p");
		    var msjErr = myNodeList[1].textContent.split("java.lang.Exception"); 
			$("#modalGeneral #alertaErrorGeneral").html('<strong>Error'+msjErr[1]+'</strong>');
			$('#modalEliminarMatriculaGeneral').modal('hide');
			$("#modalGeneral #alertaErrorGeneral").fadeIn(1500);
			setTimeout(function() {$("#modalGeneral #alertaErrorGeneral").fadeOut(1500);},3000);
		}
	});
}

$('#modalGeneral #geneMatricula #nombre').keydown(function(event){
	$('#modalGeneral #geneMatricula #nombre').removeClass("border border-danger");
	$('#modalGeneral #geneMatricula #lblNombre').html('Matrícula (*)');	
	$('#modalGeneral #geneMatricula #lblNombre').css('color','black');
});

$('#modalGeneral #geneMatricula #fechaMatriculacion').change(function(event){
	$('#modalGeneral #geneMatricula #fechaMatriculacion').removeClass("border border-danger");
	$('#modalGeneral #geneMatricula #lblFechaMatriculacion').html('Fecha Matriculación (*)');	
	$('#modalGeneral #geneMatricula #lblFechaMatriculacion').css('color','black');
});

function cerrarEliminarMatriculaGeneral(){
	$('#modalEliminarMatriculaGeneral').modal('hide');
}
/*** FIN MATRICULA ***/

/*** INICIO HISTORICO SERVICIOS ADSCRITOS ***/
function obtenerhistoricoServicioAdscrito(id){
	tablaHistorico = $('#modalGeneral #formuGenHistorico #tablaHistorico').DataTable({
		"order": [[ 0, "desc" ]],
		destroy: true,
		ajax : {
			url: './tablaHistorico',
			data: {"idVehiculoHistorico" : id},
			dataSrc: ''
		},
		columnDefs: [
		{
			"targets": [0],
			"visible": false
		},
		{
			"targets":2,
			"type":"date-eu"
		}
		],
		columns : [
		{
			title: 'id',
			data:'id',
		},
		{
			title: 'Servicio Adscrito',
			data: 'fkServicioAdscrito.nombre',
		},
		{
			title: 'Fecha Adscripci&oacute;n',
			data: 'fechaServicio',
			render: function (data, type, row) { return row.fechaServicio ? moment(row.fechaServicio).format('DD/MM/YYYY') : ""}
		}],
	});
}
/*** FIN HISTORICO SERVICIOS ADSCRITOS ***/

/*** INICIO VEHICULO DOCUMENTOS ***/
var habilitadoBotonVehiculoDocumento=false;

function deshabilitarEdicionVehiculoDocumento(){
    $('#modalGeneral #geneVehiculoDocumento input').prop('disabled',true);
    $('#modalGeneral #geneVehiculoDocumento textarea').prop('disabled',true);
    $('#modalGeneral #guardarVehiculoDocumento').addClass('btn-light');
    $('#modalGeneral #guardarVehiculoDocumento').prop('disabled',true);
    $('#modalGeneral #limpiaVehiculoDocumento').addClass('btn-light');
    $('#modalGeneral #limpiaVehiculoDocumento').prop('disabled',true);
    $('#modalGeneral #habilitarEdicionVehiDoc').removeClass('btn-light');
    $('#modalGeneral #habilitarEdicionVehiDoc').prop('disabled',false);
}

function habilitarEdicionVehiculoDocumento() {
	habilitadoBotonVehiculoDocumento=true;
	tablaVehiculoDocumento.rows().invalidate();
  if(permisoDeAccesoVehiculo=="EDITOR" || permisoDeAccesoVehiculo=="ADMINISTRADOR"){    $('#modalGeneral #geneVehiculoDocumento input').prop('disabled', false);
    $('#modalGeneral #geneVehiculoDocumento input').prop('disabled', false);
    $('#modalGeneral #geneVehiculoDocumento textarea').prop('disabled',false);
    $('#modalGeneral #guardarVehiculoDocumento').removeClass('btn-light');
    $('#modalGeneral #guardarVehiculoDocumento').prop('disabled',false);
    $('#modalGeneral #limpiaVehiculoDocumento').removeClass('btn-light');
    $('#modalGeneral #limpiaVehiculoDocumento').prop('disabled',false);
  }
    $('#modalGeneral #habilitarEdicionVehiDoc').addClass('btn-light');
    $('#modalGeneral #habilitarEdicionVehiDoc').prop('disabled',true);
}

function obtenerDatosVehiculoDocumento(id) {
    $('#modalGeneral #geneVehiculoDocumento #idVehiculoDocumento').val(id);
    tablaVehiculoDocumento = $('#modalGeneral #formuGenDocumento #tablaVehiculoDocumento').DataTable({
       destroy: true,
       ajax : {
            url: './tablaVehiculoDocumento',
            data : {"idVehiculo" : id},
            dataSrc: ''
       },
       columnDefs: [
                {
                    "targets": [0],
                    "visible": false
                }
            ],
       columns : [
            {
                title: 'id',
                data:'id',
            },
            {
                title: 'Nombre',
                data:'nombre'
            },
            {
                title: 'Comentarios',
                data:'comentarios'
            },
            {
                title: 'Acciones',
                render: function (data, type, row) {
					if(habilitadoBotonVehiculoDocumento){
						if (permisoDeAccesoVehiculo != "VISUALIZADOR") {
						  return '&nbsp;' + '<button type="button" id="ButtonDescargarDocumentoVehiculo" class="editar edit-modal btn btn-success" data-toggle="tooltip" data-placement="bottom" title="Descargar" onclick="descargarDocumentoVehiculo(\''+row.nombre+'\','+row.id+')"><span class="fa fa-file-alt"></span></button>'
						  + '&nbsp;' + '<button type="button" id="ButtonEliminarDocumento" class="editar edit-modal btn btn-success" onclick="modalEliminarDocumentoVehiculoGeneral('+row.id+')"><i class="fa fa-trash"></i></button>';
						}else{
						  return '&nbsp;' + '<button type="button" id="ButtonDescargarDocumentoVehiculo" class="editar edit-modal btn btn-success" data-toggle="tooltip" data-placement="bottom" title="Descargar" onclick="descargarDocumentoVehiculo(\''+row.nombre+'\','+row.id+')"><span class="fa fa-file-alt"></span></button>'
						  + '&nbsp;' + '<button type="button" id="ButtonEliminarDocumento" class="editar edit-modal btn" disabled="true" onclick="modalEliminarDocumentoVehiculoGeneral('+row.id+')"><i class="fa fa-trash"></i></button>';
						}
					}else{
						return '&nbsp;' + '<button type="button" id="ButtonDescargarDocumentoVehiculo" class="editar edit-modal btn" disabled="true" data-toggle="tooltip" data-placement="bottom" title="Descargar" onclick="descargarDocumentoVehiculo(\''+row.nombre+'\','+row.id+')"><span class="fa fa-file-alt"></span></button>'
						+ '&nbsp;' + '<button type="button" id="ButtonEliminarDocumento" class="editar edit-modal btn" disabled="true" onclick="modalEliminarDocumentoVehiculoGeneral('+row.id+')"><i class="fa fa-trash"></i></button>';
					}
				}
            }],
    });
}

function modalEliminarDocumentoVehiculoGeneral(id) {
    $('#modalEliminarDocumentoVehiculoGeneral #idModalEliminarDocumentoVehiculoGeneral').text('Eliminar Documento Vehiculo');
    $('#modalEliminarDocumentoVehiculoGeneral #idDocumentoVehiculoEliminarGeneral').val(id);
    $('#modalEliminarDocumentoVehiculoGeneral').modal('show');
}

function cerrarEliminarVehiculoDocumentoGeneral(){
    $('#modalEliminarDocumentoVehiculoGeneral').modal('hide');
}

function eliminarDocumentoVehiculoGeneral() {
    $.ajax({
        type: 'POST',
        url: './eliminarDocumentoVehiculo',
        data: $('#modalEliminarDocumentoVehiculoGeneral #eliminarDocumentoVehiculoGeneral').serialize() ,
        success: function (data) {
        	$('#modalEliminarDocumentoVehiculoGeneral').modal('hide');
        	tablaVehiculoDocumento.ajax.reload();
			    tablaVehiculoDocumentoVehi.ajax.reload();
        	clearModalGenVehiculoDocumento();
            $("#alertaEliminarVehiculoDocumentoGeneralOK").fadeIn(1500);
            setTimeout(function() {$("#alertaEliminarVehiculoDocumentoGeneralOK").fadeOut(1500);},3000);        
        },
        error: function( jqXHR, textStatus, errorThrown ) {
            $('#modalEliminarDocumentoVehiculoGeneral').modal('hide');
            $("#alertaEliminarVehiculoDocumentoGeneralKO").fadeIn(1500);
            setTimeout(function() {$("#alertaEliminarVehiculoDocumentoGeneralKO").fadeOut(1500);},3000);
        }
    });
}

function clearModalGenVehiculoDocumento(nombre) {
	$('#modalGeneral #formuGenDocumento').find('form')[0].reset(); 
	if(nombre!="limpiaVehiculoDocumento"){
		deshabilitarEdicionVehiculoDocumento();
		resetModalVehiculoDocumentoGeneral();
	}else{
		habilitarEdicionVehiculoDocumento();
	}
}

function resetModalVehiculoDocumentoGeneral(){
	habilitadoBotonVehiculoDocumento=false;
    $('#modalGeneral #geneVehiculoDocumento #ficheroVehiculo').removeClass("border border-danger");
    $('#modalGeneral #geneVehiculoDocumento #lblFicheroVehiculo').html('Adjunto (*)');   
    $('#modalGeneral #geneVehiculoDocumento #lblFicheroVehiculo').css('color','black');
}

function crearDocumentoVehiculoGeneral() {
    if(validaCamposDocumentoVehiculoGeneral()){
        var formData = new FormData();
        var files = document.getElementById('ficheroVehiculo').files;
        formData.append('fkVehiculo.id', $('#modalGeneral #geneVehiculoDocumento #idVehiculoDocumento').val());
        formData.append('ficheroVehiculo', files[0]);
        formData.append('nombre', files[0].name);
        formData.append('mime', files[0].type);
        formData.append('comentarios', $('#modalGeneral #geneVehiculoDocumento #observacionesVehiculoDocumento').val());
        $.ajax({
                type: 'POST',
                cache: false,
                contentType: false,
                processData: false,
                url: './guardarDocumentoVehiculo',
                data: formData,
                success: function (data) {
                    clearModalGenVehiculoDocumento();
                    tablaVehiculoDocumento.ajax.reload();
					          tablaVehiculoDocumentoVehi.ajax.reload();
                    $("#alertaVehiculoDocumentoGeneralOK").fadeIn(1500);
                    setTimeout(function() {$("#alertaVehiculoDocumentoGeneralOK").fadeOut(1500);},3000);        
                },
                error: function( jqXHR, textStatus, errorThrown ) {
                    $("#alertaVehiculoDocumentoGeneralKO").fadeIn(1500);
                    setTimeout(function() {$("#alertaVehiculoDocumentoGeneralKO").fadeOut(1500);},3000);
                }
            });
    }
}

function validaCamposDocumentoVehiculoGeneral() {
    var res=true;
    if($('#modalGeneral #geneVehiculoDocumento #ficheroVehiculo').val() == "") {
        $('#modalGeneral #geneVehiculoDocumento #ficheroVehiculo').addClass("border border-danger");
        $('#modalGeneral #geneVehiculoDocumento #lblFicheroVehiculo').html('Adjunto (*)');  
        $('#modalGeneral #geneVehiculoDocumento #lblFicheroVehiculo').css('color','red');
        res=false;
    } 
    return res;
}

$("#ficheroVehiculo").change(function() {
    $('#modalGeneral #geneVehiculoDocumento #ficheroVehiculo').removeClass("border border-danger");
    $('#modalGeneral #geneVehiculoDocumento #lblFicheroVehiculo').html('Adjunto (*)'); 
    $('#modalGeneral #geneVehiculoDocumento #lblFicheroVehiculo').css('color','black');
});
/*** FIN VEHICULO DOCUMENTOS ***/

/*** INICIO EQUIPAMIENTO ***/
function Botones_Equipamiento(){
	if($('#modalGeneral #formuEstadoGeneralVehi #estadoGeneralVehi').val() == "ALTA" && $('#modalGeneral #habilitarEdicionEquipamiento').prop('disabled')==true)
	{
		$('#modalGeneral #tablaEquipamiento #ButtonEditarEquipamiento').removeClass('btn-light');
		$('#modalGeneral #tablaEquipamiento #ButtonEditarEquipamiento').addClass('btn-success');
		$('#modalGeneral #tablaEquipamiento #ButtonEditarEquipamiento').prop('disabled',false);
		if (permisoDeAccesoEquipamiento != "VISUALIZADOR") {
		  $('#modalGeneral #tablaEquipamiento #ButtonEliminarEquipamiento').removeClass('btn-light');
		  $('#modalGeneral #tablaEquipamiento #ButtonEliminarEquipamiento').addClass('btn-success');
		  $('#modalGeneral #tablaEquipamiento #ButtonEliminarEquipamiento').prop('disabled',false);
		}
	}else{
		$('#modalGeneral #tablaEquipamiento #ButtonEditarEquipamiento').removeClass('btn-success');
		$('#modalGeneral #tablaEquipamiento #ButtonEditarEquipamiento').addClass('btn-light');
		$('#modalGeneral #tablaEquipamiento #ButtonEditarEquipamiento').prop('disabled',true);
		$('#modalGeneral #tablaEquipamiento #ButtonEliminarEquipamiento').removeClass('btn-success');
		$('#modalGeneral #tablaEquipamiento #ButtonEliminarEquipamiento').addClass('btn-light');
		$('#modalGeneral #tablaEquipamiento #ButtonEliminarEquipamiento').prop('disabled',true);
	}
}

function deshabilitarDatosEquipamiento(){
	$('#modalGeneral #geneEquipamiento input').prop('disabled',true);
	$('#modalGeneral #geneEquipamiento select').prop('disabled',true);
	$('#modalGeneral #geneEquipamiento textarea').prop('disabled',true);
	$('#modalGeneral #guardaEquipamiento').addClass('btn-light');
	$('#modalGeneral #guardaEquipamiento').prop('disabled',true);
	$('#modalGeneral #limpiaEquipamiento').addClass('btn-light');
	$('#modalGeneral #limpiaEquipamiento').prop('disabled',true);
	$('#modalGeneral #habilitarEdicionEquipamiento').removeClass('btn-light');
	$('#modalGeneral #habilitarEdicionEquipamiento').prop('disabled',false);
}

function habilitarEdicionEquipamiento() {
  if(permisoDeAccesoEquipamiento=="EDITOR" || permisoDeAccesoEquipamiento=="ADMINISTRADOR"){
	  $('#modalGeneral #geneEquipamiento input').prop('disabled', false);
	  $('#modalGeneral #geneEquipamiento select').prop('disabled', false);
	  $('#modalGeneral #geneEquipamiento textarea').prop('disabled',false);
	  $('#modalGeneral #guardaEquipamiento').removeClass('btn-light');
	  $('#modalGeneral #guardaEquipamiento').prop('disabled',false);
	  $('#modalGeneral #limpiaEquipamiento').removeClass('btn-light');
	  $('#modalGeneral #limpiaEquipamiento').prop('disabled',false);
  }
	$('#modalGeneral #habilitarEdicionEquipamiento').addClass('btn-light');
	$('#modalGeneral #habilitarEdicionEquipamiento').prop('disabled',true);
	$('#modalGeneral #geneEquipamiento input[name="detalle"]').prop('disabled', true);
	// SE COMPRUEBA SI ESTA DE BAJA EL VEHICULO PARA HABILITAR BOTONES DE EQUIPAMIENTO O NO
	Botones_Equipamiento();
}

// ESTA FUNCION OBTIENE EL ID DEL VEHICULO
function obtenerDatosEquipamiento(id) {
	clearModalGenEquipamiento();
	$('#modalGeneral #geneEquipamiento #idVehiculoEquipamiento').val(id);
	
	tablaEquipamiento = $('#modalGeneral #tablaEquipamiento').DataTable({
	   "order": [[ 0, "desc" ]],
	   destroy: true,
	   ajax : {
			url: './tablaEquipamiento',
			data : {"idVehiculoEquipamiento" : id},
			dataSrc: ''
	   },
	   columnDefs: [
	            {
	                "targets": [0],
	                "visible": false
	            }
	        ],
	   columns : [
	   		{
	   			title: 'id',
	   			data:'id',
	   		},
	   		{
	   			title: 'Tipo Equipamiento',
	   			data:'fkTipoEquipamiento.nombre'
	   		},
	   		{
	   			title: 'Datos',
				data: 'fkTipoEquipamiento.literalExtra',
				render: function ( data, type, row ) {
					if(row["fkTipoEquipamiento"]["literalExtra"] != null && row["detalle"]){
						return row["fkTipoEquipamiento"]["literalExtra"] + ': ' + row["detalle"];
					}else{
						return "";
					}
				} 
			},
			{
				title: 'Observaciones',
	   			data:'observaciones'
	   		},
	   		{
	   			title: 'Acciones',
	            render: function (data, type, row) {
					var eliminarEquipamiento = '<button type="button" id="ButtonEliminarEquipamiento" class="editar edit-modal btn" onclick="modalEliminarEquipamientoGeneral('+row.id+',\''+row.fkTipoEquipamiento.nombre+ '\')" disabled="true"><i class="fa fa-trash"></i></button>';
					var visuaoeditEquipamiento = '';
					if (permisoDeAccesoEquipamiento != "VISUALIZADOR") {
						visuaoeditEquipamiento = '<button type="button" id="ButtonEditarEquipamiento" class="editar edit-modal btn" onclick="editarEquipamientoGeneral('+row.id+')" disabled="true"><span class="fa fa-edit"></span></button>';
					}else{
						visuaoeditEquipamiento = '<button type="button" id="ButtonEditarEquipamiento" class="editar edit-modal btn" onclick="editarEquipamientoGeneral('+row.id+')" disabled="true"><span class="fa fa-eye"></span></button>';
					}
					return visuaoeditEquipamiento + '&nbsp;' + eliminarEquipamiento;
				}
	   		}],
	});
}

$('#tablaEquipamiento').on( 'draw.dt', function () {
    Botones_Equipamiento();
} );

function mostrarAvisoEquipamiento() {
  objetoEquipamiento.classList.remove("d-none");
}

function clearModalGenEquipamiento(nombre) {
	$('#modalGeneral #formuGenEquip').find('form')[0].reset();
	$('#modalGeneral #geneEquipamiento #idEquipamientoActualiza').val(null);
	if(nombre!="limpiaEquipamiento"){
		deshabilitarDatosEquipamiento();
		resetModalEquipamientoGeneral();
	}else{
		habilitarEdicionEquipamiento();
	}
}

function resetModalEquipamientoGeneral() {
	$('#modalGeneral #geneEquipamiento #fkTipoEquipamiento').removeClass("border border-danger");
	$('#modalGeneral #geneEquipamiento #lblEquipamiento').html('Tipo de Equipamiento (*)');	
	$('#modalGeneral #geneEquipamiento #lblEquipamiento').css('color','black');
}

function crearEquipamientoGeneral() {
	if(validaCamposEquipamientoGeneral()){
		$.ajax({
			    type: 'POST',
			    url: './crearEquipamiento',
			    data: $('#modalGeneral #geneEquipamiento').serialize() ,
			    success: function (data) {
					tablaEquipamiento.ajax.reload();
					tablaEquipamientoVehi.ajax.reload();
					$("#modalGeneral #alertaGeneralEquipamientoOK").fadeIn(1500);
					setTimeout(function() {$("#modalGeneral #alertaGeneralEquipamientoOK").fadeOut(1500);},3000);			
					clearModalGenEquipamiento();
	    		},
				 error: function( jqXHR, textStatus, errorThrown ) {
					$("#modalGeneral #alertaGeneralEquipamientoKO").fadeIn(1500);
					setTimeout(function() {$("#modalGeneral #alertaGeneralEquipamientoKO").fadeOut(1500);},3000);			
				 }
			});
	}
}

function validaCamposEquipamientoGeneral() {
	if($('#modalGeneral #geneEquipamiento #fkTipoEquipamiento').val() == "") {
		$('#modalGeneral #geneEquipamiento #fkTipoEquipamiento').addClass("border border-danger");
		$('#modalGeneral #geneEquipamiento #lblEquipamiento').html('Tipo de Equipamiento (*) Campo Obligatorio');	
		$('#modalGeneral #geneEquipamiento #lblEquipamiento').css('color','red');
		return false;
	}else{
		return true;
	}
}

function editarEquipamientoGeneral(id) {
	$.ajax({
		data: { id : id },
		url: './obtenerEquipamiento',
		type : 'POST',
		dataType: 'json',
		success: function(data)
		{
			if(data.fkTipoEquipamiento != null){
				$('#modalGeneral #geneEquipamiento #fkTipoEquipamiento').val(data.fkTipoEquipamiento.id);
			}
			if(data.detalle != null){
				if(permisoDeAccesoEquipamiento=="EDITOR" || permisoDeAccesoEquipamiento=="ADMINISTRADOR"){
				  $('#modalGeneral #geneEquipamiento input[name="detalle"]').prop('disabled', false);
				}
			}else{	
				$('#modalGeneral #geneEquipamiento input[name="detalle"]').prop('disabled', true);
			}
			$('#modalGeneral #geneEquipamiento input[name="detalle"]').val(data.detalle);
			$('#modalGeneral #geneEquipamiento #observacionesEquipamiento').val(data.observaciones);
			$('#modalGeneral #geneEquipamiento #idEquipamientoActualiza').val(data.id);
			resetModalEquipamientoGeneral();
		},
	});
}

function modalEliminarEquipamientoGeneral(id, nombre) {
	$('#modalEliminarEquipamientoGeneral #idModalEliminarEquipamientoGeneral').text('Eliminar Equipamiento: '+nombre);
	$('#modalEliminarEquipamientoGeneral #idEquipamientoEliminarGeneral').val(id);
	$('#modalEliminarEquipamientoGeneral').modal('show');
}

function eliminarEquipamientoGeneral() {
	$.ajax({
		    type: 'POST',
		    url: './eliminarEquipamiento',
		    data: $('#modalEliminarEquipamientoGeneral #eliminarEquipamientoGeneral').serialize() ,
		    success: function (data) {
		    	$('#modalEliminarEquipamientoGeneral').modal('hide');
		    	tablaEquipamiento.ajax.reload();
				tablaEquipamientoVehi.ajax.reload();
				$("#alertaEliminarGeneralEquipamientoOK").fadeIn(1500);
				setTimeout(function() {$("#alertaEliminarGeneralEquipamientoOK").fadeOut(1500);},3000);
				clearModalGenEquipamiento();
    		},
			 error: function( jqXHR, textStatus, errorThrown ) {
				$('#modalEliminarEquipamientoGeneral').modal('hide');
				$("#alertaEliminarGeneralEquipamientoKO").fadeIn(1500);
				setTimeout(function() {$("#alertaEliminarGeneralEquipamientoKO").fadeOut(1500);},3000);
			 }
		});
}

$("#fkTipoEquipamiento").change(function() {
	resetModalEquipamientoGeneral();
	$.ajax({
	    type: 'POST',
	    url: './datosExtraEquipamiento',
	    data: { "idTipoEquipamiento" : $('#modalGeneral #geneEquipamiento #fkTipoEquipamiento').val() } ,
	    
	    success: function (data) {
			if(data == 'si'){
				$('#modalGeneral #geneEquipamiento input[name="detalle"]').prop('disabled', false);
			}
			else{
				$('#modalGeneral #geneEquipamiento input[name="detalle"]').prop('disabled', true);
				$('#modalGeneral #geneEquipamiento input[name="detalle"]').val('');
			}
		}
	});
});

function cerrarEliminarEquipamientoGeneral(){
	$('#modalEliminarEquipamientoGeneral').modal('hide');
}
/*** FIN EQUIPAMIENTO ***/

/*** INICIO MATERIALES ***/
function Botones_Materiales(){
	if($('#modalGeneral #formuEstadoGeneralVehi #estadoGeneralVehi').val() == "ALTA" && $('#modalGeneral #habilitarEdicionMaterial').prop('disabled')==true)
	{
		$('#modalGeneral #tablaMaterial #ButtonEditarMaterial').removeClass('btn-light');
		$('#modalGeneral #tablaMaterial #ButtonEditarMaterial').addClass('btn-success');
		$('#modalGeneral #tablaMaterial #ButtonEditarMaterial').prop('disabled',false);
		if (permisoDeAccesoMaterial != "VISUALIZADOR") {
			$('#modalGeneral #tablaMaterial #ButtonEliminarMaterial').removeClass('btn-light');
			$('#modalGeneral #tablaMaterial #ButtonEliminarMaterial').addClass('btn-success');
			$('#modalGeneral #tablaMaterial #ButtonEliminarMaterial').prop('disabled',false);
		}
	}else{
		$('#modalGeneral #tablaMaterial #ButtonEditarMaterial').removeClass('btn-success');
		$('#modalGeneral #tablaMaterial #ButtonEditarMaterial').addClass('btn-light');
		$('#modalGeneral #tablaMaterial #ButtonEditarMaterial').prop('disabled',true);
		$('#modalGeneral #tablaMaterial #ButtonEliminarMaterial').removeClass('btn-success');
		$('#modalGeneral #tablaMaterial #ButtonEliminarMaterial').addClass('btn-light');
		$('#modalGeneral #tablaMaterial #ButtonEliminarMaterial').prop('disabled',true);
	}
}

function deshabilitarDatosMaterial(){
	$('#modalGeneral #geneMaterial input').prop('disabled',true);
	$('#modalGeneral #geneMaterial select').prop('disabled',true);
	$('#modalGeneral #geneMaterial textarea').prop('disabled',true);
	$('#modalGeneral #guardaMaterial').addClass('btn-light');
	$('#modalGeneral #guardaMaterial').prop('disabled',true);
	$('#modalGeneral #limpiaMaterial').addClass('btn-light');
	$('#modalGeneral #limpiaMaterial').prop('disabled',true);
	$('#modalGeneral #habilitarEdicionMaterial').removeClass('btn-light');
	$('#modalGeneral #habilitarEdicionMaterial').prop('disabled',false);
}

function habilitarEdicionMaterial() {
	if(permisoDeAccesoMaterial=="EDITOR" || permisoDeAccesoMaterial=="ADMINISTRADOR"){
		$('#modalGeneral #geneMaterial input').prop('disabled', false);
		$('#modalGeneral #geneMaterial select').prop('disabled', false);
		$('#modalGeneral #geneMaterial textarea').prop('disabled',false);
		$('#modalGeneral #guardaMaterial').removeClass('btn-light');
		$('#modalGeneral #guardaMaterial').prop('disabled',false);
		$('#modalGeneral #limpiaMaterial').removeClass('btn-light');
		$('#modalGeneral #limpiaMaterial').prop('disabled',false);
	}
	$('#modalGeneral #habilitarEdicionMaterial').addClass('btn-light');
	$('#modalGeneral #habilitarEdicionMaterial').prop('disabled',true);
	$('#modalGeneral #geneMaterial input[name="infoExtraMaterial"]').prop('disabled', true);	
	// SE COMPRUEBA SI ESTA DE BAJA EL VEHICULO PARA HABILITAR BOTONES DE MATERIALES O NO
	Botones_Materiales();
}

//ESTA FUNCION OBTIENE EL ID DEL VEHICULO
function obtenerDatosMaterial(id) {
	clearModalGenMaterial();
	$('#modalGeneral #geneMaterial #idVehiculoMaterial').val(id);
	
	tablaMaterial = $('#modalGeneral #tablaMaterial').DataTable({
	   "order": [[ 0, "desc" ]],
	   destroy: true,
	   ajax : {
			url: './tablaMaterial',
			data : {"idVehiculoMaterial" : id},
			dataSrc: ''
	   },
	   columnDefs: [
	            {
	                "targets": [0],
	                "visible": false
	            }
	        ],
	   columns : [
	   		{
	   			title: 'id',
	   			data:'id',
	   		},
	   		{
	   			title: 'Tipo Material',
	   			data:'fkTipoMaterial.nombre'
	   		},
	   		{
	   			title: 'Datos',
				data: 'fkTipoMaterial.literalExtra',
				render: function ( data, type, row ) {
					if(row["fkTipoMaterial"]["literalExtra"] != null && row["infoExtraMaterial"]){
						return row["fkTipoMaterial"]["literalExtra"] + ': ' + row["infoExtraMaterial"];
					}else{
						return "";
					}
				}
			},
			{
				title: 'Observaciones',
	   			data:'observaciones'
	   		},
	   		{
	   			title: 'Acciones',
	            render: function (data, type, row) {
					var eliminarMaterial = '<button type="button" id="ButtonEliminarMaterial" class="editar edit-modal btn" onclick="modalEliminarMaterialGeneral('+row.id+',\''+row.fkTipoMaterial.nombre+ '\')" disabled="true"><i class="fa fa-trash"></i></button>';
					var visuaoeditMaterial = '';
					if (permisoDeAccesoMaterial != "VISUALIZADOR") {
						visuaoeditMaterial = '<button type="button" id="ButtonEditarMaterial" class="editar edit-modal btn " onclick="editarMaterialGeneral('+row.id+')" disabled="true"><span class="fa fa-edit"></span></button>';
					}else{
						visuaoeditMaterial = '<button type="button" id="ButtonEditarMaterial" class="editar edit-modal btn " onclick="editarMaterialGeneral('+row.id+')" disabled="true"><span class="fa fa-eye"></span></button>';
					}
					return visuaoeditMaterial + '&nbsp;' + eliminarMaterial;
	       	    }
	   		}],
	});
}

$('#tablaMaterial').on( 'draw.dt', function () {
    Botones_Materiales();
} );

function mostrarAvisoMaterial() {
  objetoMaterial.classList.remove("d-none");
}

function clearModalGenMaterial(nombre) {
	$('#modalGeneral #formuGenMate').find('form')[0].reset();
	$('#modalGeneral #geneMaterial #idMaterialActualiza').val(null);
	if(nombre!="limpiaMaterial"){
		deshabilitarDatosMaterial();
		resetModalMaterialGeneral();
	}else{
		habilitarEdicionMaterial();
	}
}

function resetModalMaterialGeneral() {
	$('#modalGeneral #geneMaterial #fkTipoMaterial').removeClass("border border-danger");
	$('#modalGeneral #geneMaterial #lblMaterial').html('Tipo de Material (*)');	
	$('#modalGeneral #geneMaterial #lblMaterial').css('color','black');
}

function crearMaterialGeneral() {
	if(validaCamposMaterialGeneral()){
		$.ajax({
			    type: 'POST',
			    url: './crearMaterial',
			    data: $('#modalGeneral #geneMaterial').serialize() ,
			    success: function (data) {
					tablaMaterial.ajax.reload();
					$("#modalGeneral #alertaMaterialGeneralOK").fadeIn(1500);
					setTimeout(function() {$("#modalGeneral #alertaMaterialGeneralOK").fadeOut(1500);},3000);			
					clearModalGenMaterial();
	    		},
				 error: function( jqXHR, textStatus, errorThrown ) {
					$("#modalGeneral #alertaMaterialGeneralKO").fadeIn(1500);
					setTimeout(function() {$("#modalGeneral #alertaMaterialGeneralKO").fadeOut(1500);},3000);			
				 }
			});
	}
}

function validaCamposMaterialGeneral() {
	if($('#modalGeneral #geneMaterial #fkTipoMaterial').val() == "") {
		$('#modalGeneral #geneMaterial #fkTipoMaterial').addClass("border border-danger");
		$('#modalGeneral #geneMaterial #lblMaterial').html('Tipo de Material (*) Campo Obligatorio');	
		$('#modalGeneral #geneMaterial #lblMaterial').css('color','red');
		return false;
	}else{
		return true;
	}
}

function editarMaterialGeneral(id) {
	$.ajax({
		data: { id : id },
		url: './obtenerMaterial',
		type : 'POST',
		dataType: 'json',
		success: function(data)
		{
			if(data.fkTipoMaterial != null){
				$('#modalGeneral #geneMaterial #fkTipoMaterial').val(data.fkTipoMaterial.id);
			}
			if(data.infoExtraMaterial != null){
				if(permisoDeAccesoMaterial=="EDITOR" || permisoDeAccesoMaterial=="ADMINISTRADOR"){
					$('#modalGeneral #geneMaterial input[name="infoExtraMaterial"]').prop('disabled', false);
				}
			}else{	
				$('#modalGeneral #geneMaterial input[name="infoExtraMaterial"]').prop('disabled', true);
			}	
			$('#modalGeneral #geneMaterial input[name="infoExtraMaterial"]').val(data.infoExtraMaterial);
			$('#modalGeneral #geneMaterial #observacionesMaterial').val(data.observaciones);
			$('#modalGeneral #geneMaterial #idMaterialActualiza').val(data.id);
			resetModalMaterialGeneral();
		},
	});
}

function modalEliminarMaterialGeneral(id, nombre) {
	$('#modalEliminarMaterialGeneral #idModalEliminarMaterialGeneral').text('Eliminar Material: '+nombre);
	$('#modalEliminarMaterialGeneral #idMaterialEliminarGeneral').val(id);
	$('#modalEliminarMaterialGeneral').modal('show');
}

function eliminarMaterialGeneral() {
	$.ajax({
		    type: 'POST',
		    url: './eliminarMaterial',
		    data: $('#modalEliminarMaterialGeneral #eliminarMaterialGeneral').serialize() ,
		    success: function (data) {
		    	$('#modalEliminarMaterialGeneral').modal('hide');
		    	tablaMaterial.ajax.reload();		    
				$("#alertaEliminarMaterialGeneralOK").fadeIn(1500);
				setTimeout(function() {$("#alertaEliminarMaterialGeneralOK").fadeOut(1500);},3000);
				clearModalGenMaterial();
    		},
			 error: function( jqXHR, textStatus, errorThrown ) {
				$('#modalEliminarMaterialGeneral').modal('hide');
				$("#alertaEliminarMaterialGeneralKO").fadeIn(1500);
				setTimeout(function() {$("#alertaEliminarMaterialGeneralKO").fadeOut(1500);},3000);
			 }
		});
}

$("#fkTipoMaterial").change(function(){
	resetModalMaterialGeneral();
	$.ajax({
		    type: 'POST',
		    url: './datosExtra',
		    data: { "idTipoMaterial" : $('#modalGeneral #geneMaterial #fkTipoMaterial').val() } ,
		    
		    success: function (data) {
				if(data == 'si'){
					$('#modalGeneral #geneMaterial input[name="infoExtraMaterial"]').prop('disabled', false);
				}
				else{
					$('#modalGeneral #geneMaterial input[name="infoExtraMaterial"]').prop('disabled', true);
					$('#modalGeneral #geneMaterial input[name="infoExtraMaterial"]').val('');
				}
    		}
	});
});

function cerrarEliminarMaterialGeneral(){
	$('#modalEliminarMaterialGeneral').modal('hide');
}
/*** FIN MATERIALES ***/

/*** INICIO CESIONES ***/
function Botones_Cesiones(){
	if($('#modalGeneral #formuEstadoGeneralVehi #estadoGeneralVehi').val() == "ALTA" && $('#modalGeneral #habilitarEdicionCesion').prop('disabled')==true)
	{
		$('#modalGeneral #tablaCesion #ButtonEditarCesion').removeClass('btn-light');
		$('#modalGeneral #tablaCesion #ButtonEditarCesion').addClass('btn-success');
		$('#modalGeneral #tablaCesion #ButtonEditarCesion').prop('disabled',false);
		if (permisoDeAccesoCesion != "VISUALIZADOR") {
			$('#modalGeneral #tablaCesion #ButtonEliminarCesion').removeClass('btn-light');
			$('#modalGeneral #tablaCesion #ButtonEliminarCesion').addClass('btn-success');
			$('#modalGeneral #tablaCesion #ButtonEliminarCesion').prop('disabled',false);
		}
	}else{
		$('#modalGeneral #tablaCesion #ButtonEditarCesion').removeClass('btn-success');
		$('#modalGeneral #tablaCesion #ButtonEditarCesion').addClass('btn-light');
		$('#modalGeneral #tablaCesion #ButtonEditarCesion').prop('disabled',true);
		$('#modalGeneral #tablaCesion #ButtonEliminarCesion').removeClass('btn-success');
		$('#modalGeneral #tablaCesion #ButtonEliminarCesion').addClass('btn-light');
		$('#modalGeneral #tablaCesion #ButtonEliminarCesion').prop('disabled',true);
	}
}

function deshabilitarDatosCesion(){
	$('#modalGeneral #geneCesion input').prop('disabled',true);
	$('#modalGeneral #geneCesion select').prop('disabled',true);
	$('#modalGeneral #geneCesion textarea').prop('disabled',true);
	$('#modalGeneral #guardaCesion').addClass('btn-light');
	$('#modalGeneral #guardaCesion').prop('disabled',true);
	$('#modalGeneral #limpiaCesion').addClass('btn-light');
	$('#modalGeneral #limpiaCesion').prop('disabled',true);
	$('#modalGeneral #habilitarEdicionCesion').removeClass('btn-light');
	$('#modalGeneral #habilitarEdicionCesion').prop('disabled',false);
}

function habilitarEdicionCesion() {
	if(permisoDeAccesoCesion=="EDITOR" || permisoDeAccesoCesion=="ADMINISTRADOR"){
		$('#modalGeneral #geneCesion input').prop('disabled', false);
		$('#modalGeneral #geneCesion select').prop('disabled', false);
		$('#modalGeneral #geneCesion textarea').prop('disabled',false);
		$('#modalGeneral #guardaCesion').removeClass('btn-light');
		$('#modalGeneral #guardaCesion').prop('disabled',false);
		$('#modalGeneral #limpiaCesion').removeClass('btn-light');
		$('#modalGeneral #limpiaCesion').prop('disabled',false);
	}
	$('#modalGeneral #habilitarEdicionCesion').addClass('btn-light');
	$('#modalGeneral #habilitarEdicionCesion').prop('disabled',true);
	// SE COMPRUEBA SI ESTA DE BAJA EL VEHICULO PARA HABILITAR BOTONES DE CESION O NO
	Botones_Cesiones();
}

//ESTA FUNCION OBTIENE EL ID DEL VEHICULO
function obtenerDatosCesion(id) {
	clearModalGenCesion();
	$('#modalGeneral #geneCesion #idVehiculoCesion').val(id);
	
	tablaCesion = $('#modalGeneral #tablaCesion').DataTable({
	   "order": [[ 0, "desc" ]],
	   destroy: true,
	   ajax : {
			url: './tablaCesion',
			data : {"idVehiculoCesion" : id},
			dataSrc: ''
	   },
	   columnDefs: [
	            {
	                "targets": [0],
	                "visible": false
	            },
	            {
	                "targets":5,
	                "type":"date-eu"
	            },
	            {
	                "targets":6,
	                "type":"date-eu"
	            }
	        ],
	   columns : [
	   		{
	   			title: 'id',
	   			data:'id',
	   		},
	   		{
	   			title: 'Motivo',
	   			data:'fkParametroTipoMotivo.nombre'
	   		},
	   		{
				title: 'Destino',
	   			//data:'fkParametroTipoDestino.nombre'
          data:'fkServicioAdscrito.nombre'
	   		},
	   		{
				title: 'Km Iniciales',
	   			data:'kmIniciales',
				render: function (data, type, row) { return row.kmIniciales ? row.kmIniciales.replace(".", ",") : ""}
	   		},
	   		{
				title: 'Km Finales',
	   			data:'kmFinales',
				render: function (data, type, row) { return row.kmFinales ? row.kmFinales.replace(".", ",") : ""}
	   		},
	   		{
				title: 'F. Inicio',
				data: 'fechaInicio',
            	render: function (data, type, row) { return row.fechaInicio ? moment(row.fechaInicio).format('DD/MM/YYYY') : ""}

	   		},
	   		{
				title: 'F. Fin',
				data: 'fechaFin',
            	render: function (data, type, row) { return row.fechaFin ? moment(row.fechaFin).format('DD/MM/YYYY') : ""}

	   		},
	   		{
	   			title: 'Observaciones',
	   			data:'observaciones'
	   		},
	   		{
				title: 'Acciones',
	            render: function (data, type, row) {
					var eliminarCesion = '<button type="button" id="ButtonEliminarCesion" class="editar edit-modal btn" onclick="modalEliminarCesionGeneral('+row.id+')" disabled="true"><i class="fa fa-trash"></i></button>';
					var visuaoeditCesion = '';
					if (permisoDeAccesoCesion != "VISUALIZADOR") {
						visuaoeditCesion = '<button type="button" id="ButtonEditarCesion" class="editar edit-modal btn " onclick="editarCesionGeneral('+row.id+')" disabled="true"><span class="fa fa-edit"></span></button>';
					}else{
						visuaoeditCesion = '<button type="button" id="ButtonEditarCesion" class="editar edit-modal btn " onclick="editarCesionGeneral('+row.id+')" disabled="true"><span class="fa fa-eye"></span></button>';
					}
					return visuaoeditCesion + '&nbsp;' + eliminarCesion;
				}
	   		}],
	});
}

$('#tablaCesion').on( 'draw.dt', function () {
    Botones_Cesiones();
} );

function mostrarAvisoCesion() {
  objetoCesion.classList.remove("d-none");
}

function clearModalGenCesion(nombre) {
	$('#modalGeneral #formuGenCes').find('form')[0].reset();
	$('#modalGeneral #geneCesion #idCesionActualiza').val(null);
	$("#modalGeneral #geneCesion #inicio").datepicker('option', 'maxDate', null);
	$("#modalGeneral #geneCesion #fin").datepicker('option', 'minDate', null);
	if(nombre!="limpiaCesion"){
		deshabilitarDatosCesion();
		resetModalCesionGeneral();
	}else{
		habilitarEdicionCesion();
	}
}

function resetModalCesionGeneral() {
	$('#modalGeneral #geneCesion #fkParametroTipoMotivo').removeClass("border border-danger");
	$('#modalGeneral #geneCesion #lblMotivo').html('Motivo (*)');	
	$('#modalGeneral #geneCesion #lblMotivo').css('color','black');
	//$('#modalGeneral #geneCesion #fkParametroTipoDestino').removeClass("border border-danger");	
	$('#modalGeneral #geneCesion #cesionDestino').removeClass("border border-danger");
	$('#modalGeneral #geneCesion #lblDestino').html('Destino (*)');	
	$('#modalGeneral #geneCesion #lblDestino').css('color','black');
	$('#modalGeneral #geneCesion #kmIniciales').removeClass("border border-danger");	
	$('#modalGeneral #geneCesion #lblKmIniciales').html('Kilómetros Iniciales');	
	$('#modalGeneral #geneCesion #lblKmIniciales').css('color','black');
	$('#modalGeneral #geneCesion #kmFinales').removeClass("border border-danger");
	$('#modalGeneral #geneCesion #lblKmFinales').html('Kilómetros Finales');	
	$('#modalGeneral #geneCesion #lblKmFinales').css('color','black');
	$('#modalGeneral #geneCesion #inicio').removeClass("border border-danger");
	$('#modalGeneral #geneCesion #lblInicio').html('Fecha Inicio');
	$('#modalGeneral #geneCesion #lblInicio').css('color','black');
	$('#modalGeneral #geneCesion #fin').removeClass("border border-danger");	
	$('#modalGeneral #geneCesion #lblFin').html('Fecha Fin');	
	$('#modalGeneral #geneCesion #lblFin').css('color','black');
	$("#modalGeneral #geneCesion #inicio").datepicker('option', 'maxDate', null);
	$("#modalGeneral #geneCesion #fin").datepicker('option', 'minDate', null);
}

function crearCesionGeneral() {
	if(validaCamposCesionGeneral()){
		$.ajax({
			    type: 'POST',
			    url: './crearCesion',
			    data: $('#modalGeneral #geneCesion').serialize() ,
			    success: function (data) {
					tablaCesion.ajax.reload();
					tablaCesionVehi.ajax.reload();
					$("#modalGeneral #alertaGeneralCesionOK").fadeIn(1500);
					setTimeout(function() {$("#modalGeneral #alertaGeneralCesionOK").fadeOut(1500);},3000);			
					clearModalGenCesion();
	    		},
				 error: function( jqXHR, textStatus, errorThrown ) {
					$("#modalGeneral #alertaGeneralCesionKO").fadeIn(1500);
					setTimeout(function() {$("#modalGeneral #alertaGeneralCesionKO").fadeOut(1500);},3000);			
				 }
			});
	}
}

function validaCamposCesionGeneral() {
	var res = true;
	
	if($('#modalGeneral #geneCesion #fkParametroTipoMotivo').val() == "") {
		$('#modalGeneral #geneCesion #fkParametroTipoMotivo').addClass("border border-danger");
		$('#modalGeneral #geneCesion #lblMotivo').html('Motivo (*) Campo Obligatorio');	
		$('#modalGeneral #geneCesion #lblMotivo').css('color','red');
		res = false;
	}
	//if($('#modalGeneral #geneCesion #fkParametroTipoDestino').val() == "") {
		//$('#modalGeneral #geneCesion #fkParametroTipoDestino').addClass("border border-danger");	
	if($('#modalGeneral #geneCesion #cesionDestino').val() == "") {
		$('#modalGeneral #geneCesion #cesionDestino').addClass("border border-danger");	
		$('#modalGeneral #geneCesion #lblDestino').html('Destino (*) Campo Obligatorio');	
		$('#modalGeneral #geneCesion #lblDestino').css('color','red');
		res = false;
	}	
	if((ValidateKm($('#modalGeneral #geneCesion #kmIniciales').val(), $('#modalGeneral #geneCesion #kmFinales').val()) == false) || !($('#modalGeneral #geneCesion #kmIniciales').val()) == "" && ValidateDecimal($('#modalGeneral #geneCesion #kmIniciales').val()) == false) {
		$('#modalGeneral #geneCesion #kmIniciales').addClass("border border-danger");	
		$('#modalGeneral #geneCesion #lblKmIniciales').html('Solo se permite números enteros, con dos decimales como máximo y que no sea mayor a los kilometros finales');	
		$('#modalGeneral #geneCesion #lblKmIniciales').css('color','red');
		res = false;
	}
	if(!($('#modalGeneral #geneCesion #kmFinales').val()) == "" && ValidateDecimal($('#modalGeneral #geneCesion #kmFinales').val()) == false) {
		$('#modalGeneral #geneCesion #kmFinales').addClass("border border-danger");	
		$('#modalGeneral #geneCesion #lblKmFinales').html('Solo se permite números enteros o con dos decimales como máximo');	
		$('#modalGeneral #geneCesion #lblKmFinales').css('color','red');
		res = false;
	}
	var fechaIni = $('#modalGeneral #geneCesion #inicio').val();
	var fechaFin = $('#modalGeneral #geneCesion #fin').val();
	var fechaIniTmp = $('#modalGeneral #geneCesion #inicio').val();
	var fechaFinTmp = $('#modalGeneral #geneCesion #fin').val();
	if(!(fechaIni) == "" && !(fechaFin) == "") {
		// COMPROBAMOS SI FECHAINI CONTIENE "/" EN CUYO CASO LO TRANSFORMAMOS AL FORMATO YYYY-MM-DD
		if(fechaIni.includes("/")){
		    fechaIniTmp = transformarFormatoFechaCorrecto(fechaIni);
		}
		// COMPROBAMOS SI FECHAFIN CONTIENE "/" EN CUYO CASO LO TRANSFORMAMOS AL FORMATO YYYY-MM-DD
		if(fechaFin.includes("/")){
		    fechaFinTmp = transformarFormatoFechaCorrecto(fechaFin);
		}
		if(!ValidateDate(fechaIniTmp, fechaFinTmp)){
			$('#modalGeneral #geneCesion #fin').addClass("border border-danger");	
			$('#modalGeneral #geneCesion #lblFin').html('Fecha Fin, la fecha fin no puede ser anterior a la fecha inicio (dd/mm/yyyy)');	
			$('#modalGeneral #geneCesion #lblFin').css('color','red');
			res = false;
		}
	}

	// VALIDAMOS LAS FECHAS POR SI NO TIENEN EL FORMATO CORRECTO O NO SON VALIDAS
	if(validarFormatoFecha(fechaIni)){
		if(!existeFecha(fechaIni)){
			$('#modalGeneral #geneCesion #fechaInicio').addClass("border border-danger");	
			$('#modalGeneral #geneCesion #lblInicio').html('Fecha Inicio, la fecha indicada no es valida');	
			$('#modalGeneral #geneCesion #lblInicio').css('color','red');
			res = false;
		}
	}else{
		$('#modalGeneral #geneCesion #fechaInicio').addClass("border border-danger");	
		$('#modalGeneral #geneCesion #lblInicio').html('Fecha Inicio, la fecha indicada no tiene el formato correcto (dd/mm/yyyy)');	
		$('#modalGeneral #geneCesion #lblInicio').css('color','red');
		res = false;
	}
		
	if(validarFormatoFecha(fechaFin)){
		if(!existeFecha(fechaFin)){
			$('#modalGeneral #geneCesion #fin').addClass("border border-danger");	
			$('#modalGeneral #geneCesion #lblFin').html('Fecha Fin, la fecha indicada no es valida');	
			$('#modalGeneral #geneCesion #lblFin').css('color','red');
			res = false;
		}
	}else{
		$('#modalGeneral #geneCesion #fin').addClass("border border-danger");	
		$('#modalGeneral #geneCesion #lblFin').html('Fecha Fin, la fecha indicada no tiene el formato correcto (dd/mm/yyyy)');	
		$('#modalGeneral #geneCesion #lblFin').css('color','red');
		res = false;
	}
	
	return res;
}

function editarCesionGeneral(id) {
	$.ajax({
		data: { id : id },
		url: './obtenerCesion',
		type : 'POST',
		dataType: 'json',
		success: function(data)
		{
			if(data.fkParametroTipoMotivo != null){
				$('#modalGeneral #geneCesion #fkParametroTipoMotivo').val(data.fkParametroTipoMotivo.id);
			}
			/*if(data.fkParametroTipoDestino != null){
				$('#modalGeneral #geneCesion #fkParametroTipoDestino').val(data.fkParametroTipoDestino.id);
			}*/
			if(data.fkServicioAdscrito != null){
				$('#modalGeneral #geneCesion #cesionDestino').val(data.fkServicioAdscrito.id);
			}
      if(data.kmIniciales != null){
				if(data.kmIniciales.includes('.')){
					$('#modalGeneral #geneCesion #kmIniciales').val(data.kmIniciales.replace(".", ","));
				}else{
					$('#modalGeneral #geneCesion #kmIniciales').val(data.kmIniciales);
				}
					}else{
						$('#modalGeneral #geneCesion #kmIniciales').val(data.kmIniciales);
					}
			if(data.kmFinales != null){
				if(data.kmFinales.includes('.')){
					$('#modalGeneral #geneCesion #kmFinales').val(data.kmFinales.replace(".", ","));
				}else{
					$('#modalGeneral #geneCesion #kmFinales').val(data.kmFinales);
				}
					}else{
						$('#modalGeneral #geneCesion #kmFinales').val(data.kmFinales);
					}
			$('#modalGeneral #geneCesion #inicio').val(data.fechaInicio?data.fechaInicio.split('-').reverse().join('/'):'');
			$('#modalGeneral #geneCesion #fin').val(data.fechaFin?data.fechaFin.split('-').reverse().join('/'):'');
			$('#modalGeneral #geneCesion #observacionesCesion').val(data.observaciones);
			$('#modalGeneral #geneCesion #idCesionActualiza').val(data.id);
			resetModalCesionGeneral();
			// DATEPICKER
			if(data.fechaInicio){
				$('#modalGeneral #geneCesion #fin').datepicker('option', 'minDate', data.fechaInicio.split('-').reverse().join('/'));
			}
			if(data.fechaFin){
				$('#modalGeneral #geneCesion #inicio').datepicker('option', 'maxDate', data.fechaFin.split('-').reverse().join('/'));
			}
		},
	});
}

function modalEliminarCesionGeneral(id) {
	$('#modalEliminarCesionGeneral #idModalEliminarCesionGeneral').text('Eliminar Cesion');
	$('#modalEliminarCesionGeneral #idCesionEliminarGeneral').val(id);
	$('#modalEliminarCesionGeneral').modal('show');
}

function eliminarCesionGeneral() {
	$.ajax({
		    type: 'POST',
		    url: './eliminarCesion',
		    data: $('#modalEliminarCesionGeneral #eliminarCesionGeneral').serialize() ,
		    success: function (data) {
		    	$('#modalEliminarCesionGeneral').modal('hide');
		    	tablaCesion.ajax.reload();		    
				tablaCesionVehi.ajax.reload();
				$("#alertaEliminarCesionGeneralOK").fadeIn(1500);
				setTimeout(function() {$("#alertaEliminarCesionGeneralOK").fadeOut(1500);},3000);
				clearModalGenCesion();
    		},
			 error: function( jqXHR, textStatus, errorThrown ) {
				$('#modalEliminarCesionGeneral').modal('hide');
				$("#alertaEliminarCesionGeneralKO").fadeIn(1500);
				setTimeout(function() {$("#alertaEliminarCesionGeneralKO").fadeOut(1500);},3000);
			 }
		});
}

$("#fkParametroTipoMotivo").change(function() {
	$('#modalGeneral #geneCesion #fkParametroTipoMotivo').removeClass("border border-danger");
	$('#modalGeneral #geneCesion #lblMotivo').html('Motivo (*)');	
	$('#modalGeneral #geneCesion #lblMotivo').css('color','black');
});

/*$("#fkParametroTipoDestino").change(function() {
	$('#modalGeneral #geneCesion #fkParametroTipoDestino').removeClass("border border-danger");	
	$('#modalGeneral #geneCesion #lblDestino').html('Destino (*)');	
	$('#modalGeneral #geneCesion #lblDestino').css('color','black');
});*/

$("#cesionDestino").change(function() {
	$('#modalGeneral #geneCesion #cesionDestino').removeClass("border border-danger");	
	$('#modalGeneral #geneCesion #lblDestino').html('Destino (*)');	
	$('#modalGeneral #geneCesion #lblDestino').css('color','black');
});

$("#fin").change(function() {
	$('#modalGeneral #geneCesion #fin').removeClass("border border-danger");	
	$('#modalGeneral #geneCesion #lblFin').html('Fecha Fin');	
	$('#modalGeneral #geneCesion #lblFin').css('color','black');
});

$('#modalGeneral #geneCesion #kmIniciales').keydown(function(event){
	$('#modalGeneral #geneCesion #kmIniciales').removeClass("border border-danger");
	$('#modalGeneral #geneCesion #lblKmIniciales').html('Kilómetros Iniciales');	
	$('#modalGeneral #geneCesion #lblKmIniciales').css('color','black');
});

$('#modalGeneral #geneCesion #kmFinales').keydown(function(event){
	$('#modalGeneral #geneCesion #kmFinales').removeClass("border border-danger");
	$('#modalGeneral #geneCesion #lblKmFinales').html('Kilómetros Finales');	
	$('#modalGeneral #geneCesion #lblKmFinales').css('color','black');
});

function cerrarEliminarCesionGeneral(){
	$('#modalEliminarCesionGeneral').modal('hide');
}
/*** FIN CESIONES ***/

/*** INICIO REPOSTAJES ***/
function Botones_Repostaje(){
	if($('#modalGeneral #formuEstadoGeneralVehi #estadoGeneralVehi').val() == "ALTA" && $('#modalGeneral #habilitarEdicionRepostaje').prop('disabled')==true)
	{
		$('#modalGeneral #tablaRepostaje #ButtonEditarRepostaje').removeClass('btn-light');
		$('#modalGeneral #tablaRepostaje #ButtonEditarRepostaje').addClass('btn-success');
		$('#modalGeneral #tablaRepostaje #ButtonEditarRepostaje').prop('disabled',false);
		if (permisoDeAccesoRepostaje != "VISUALIZADOR") {
			$('#modalGeneral #tablaRepostaje #ButtonEliminarRepostaje').removeClass('btn-light');
			$('#modalGeneral #tablaRepostaje #ButtonEliminarRepostaje').addClass('btn-success');
			$('#modalGeneral #tablaRepostaje #ButtonEliminarRepostaje').prop('disabled',false);
		}
	}else{
		$('#modalGeneral #tablaRepostaje #ButtonEditarRepostaje').removeClass('btn-success');
		$('#modalGeneral #tablaRepostaje #ButtonEditarRepostaje').addClass('btn-light');
		$('#modalGeneral #tablaRepostaje #ButtonEditarRepostaje').prop('disabled',true);
		$('#modalGeneral #tablaRepostaje #ButtonEliminarRepostaje').removeClass('btn-success');
		$('#modalGeneral #tablaRepostaje #ButtonEliminarRepostaje').addClass('btn-light');
		$('#modalGeneral #tablaRepostaje #ButtonEliminarRepostaje').prop('disabled',true);
	}
}

function deshabilitarDatosRepostaje(){
	$('#modalGeneral #geneRepostaje input').prop('disabled',true);
	$('#modalGeneral #geneRepostaje textarea').prop('disabled',true);
	$('#modalGeneral #geneRepostaje select').prop('disabled',true);
	$('#modalGeneral #guardaRepostaje').addClass('btn-light');
	$('#modalGeneral #guardaRepostaje').prop('disabled',true);
	$('#modalGeneral #limpiaRepostaje').addClass('btn-light');
	$('#modalGeneral #limpiaRepostaje').prop('disabled',true);
	$('#modalGeneral #habilitarEdicionRepostaje').removeClass('btn-light');
	$('#modalGeneral #habilitarEdicionRepostaje').prop('disabled',false);
}

function habilitarEdicionRepostaje() {
	if(permisoDeAccesoRepostaje=="EDITOR" || permisoDeAccesoRepostaje=="ADMINISTRADOR"){
		$('#modalGeneral #geneRepostaje input').prop('disabled', false);
		$('#modalGeneral #geneRepostaje textarea').prop('disabled',false);
		$('#modalGeneral #geneRepostaje select').prop('disabled',false);
		$('#modalGeneral #guardaRepostaje').removeClass('btn-light');
		$('#modalGeneral #guardaRepostaje').prop('disabled',false);
		$('#modalGeneral #limpiaRepostaje').removeClass('btn-light');
		$('#modalGeneral #limpiaRepostaje').prop('disabled',false);
	}
	$('#modalGeneral #habilitarEdicionRepostaje').addClass('btn-light');
	$('#modalGeneral #habilitarEdicionRepostaje').prop('disabled',true);
	// LLAMAMOS A LA FUNCION PARA RELLENAR EL LISTADO DE MATRICULAS DEL VEHICULO
	recargarMatriculas($('#modalGeneral #geneVehiculo #idVehiculoActualiza').val(),"geneRepostaje","matriculaRepo");
	// SE COMPRUEBA SI ESTA DE BAJA EL VEHICULO PARA HABILITAR BOTONES DE REPOSTAJE O NO
	Botones_Repostaje();
}

//ESTA FUNCION OBTIENE EL REPOSTAJE DEL VEHICULO
function obtenerDatosRepostaje(matricula,id) {
	var lastChar = matricula[matricula.length - 1];
    if (lastChar == '*') {
        matricula = matricula.substring(0, matricula.length - 1);
    }
	clearModalGenRepostaje();
	$('#modalGeneral #geneRepostaje #nombreMatriculaRepostaje').val(matricula);
	$('#modalGeneral #geneRepostaje #idVehiculoRepostaje').val(id);
	
	tablaRepostaje = $('#modalGeneral #tablaRepostaje').DataTable({
	   "order": [[ 0, "desc" ]],
	   destroy: true,
	   ajax : {
			url: './tablaRepostaje',
			//data : {"matricula" : matricula},
			data : {"idVehiculoRepostaje" : id},
			dataSrc: ''
	   },
	   columnDefs: [
	            {
	                "targets": [0],
	                "visible": false
	            },
	            {
	                "targets":5,
	                "type":"date-eu"
	            }
	        ],
	   columns : [
	   		{
	   			title: 'id',
	   			data:'id',
	   		},
	   		{
	   			title: 'Matr&iacute;cula',
	   			data: 'fkMatricula.nombre', 
	   		},
	   		{
	   			title: 'Nº Kilómetros',
	   			data:'kilometros', 
				render: function (data, type, row) { return row.kilometros ? row.kilometros.replace(".", ",") : ""}
	   		},
	   		{
	   			title: 'Nº Litros',
	   			data:'litros',
				render: function (data, type, row) { return row.litros ? row.litros.replace(".", ",") : ""}
	   		},
	   		{
	   			title: 'Importe',
	   			data:'importe',
				render: function (data, type, row) { return row.importe ? row.importe.replace(".", ",") : ""}
	   		},
	   		{
				title: 'Fecha de Repostaje', 	
            	render: function (data, type, row) { return moment(row.fechaRepostaje).format('DD/MM/YYYY')}
	   		},
	   		{
	   			title: 'Observaciones',
	   			data:'observaciones'
	   		},
	   		{
				title: 'Acciones',
	            render: function (data, type, row) {
					var eliminarRepostaje = '<button type="button" id="ButtonEliminarRepostaje" class="editar edit-modal btn" onclick="modalEliminarRepostajeGeneral('+row.id+')" disabled="true"><i class="fa fa-trash"></i></button>';
					var visuaoeditRepostaje = '';
					if (permisoDeAccesoRepostaje != "VISUALIZADOR") {
						visuaoeditRepostaje = '<button type="button" id="ButtonEditarRepostaje" class="editar edit-modal btn " onclick="editarRepostajeGeneral('+row.id+',\''+(row.kilometros?row.kilometros:'')+ '\',\''+(row.litros?row.litros:'')+ '\',\''+row.importe+ '\',\''+(row.descripcion?row.descripcion:'')+ '\',\''+row.fechaRepostaje+ '\',\''+row.fkMatricula.nombre+ '\','+row.fkMatricula.id+',\''+(row.observaciones?row.observaciones:'')+ '\')" disabled="true"><span class="fa fa-edit"></span></button>';
					}else{
						visuaoeditRepostaje = '<button type="button" id="ButtonEditarRepostaje" class="editar edit-modal btn " onclick="editarRepostajeGeneral('+row.id+',\''+(row.kilometros?row.kilometros:'')+ '\',\''+(row.litros?row.litros:'')+ '\',\''+row.importe+ '\',\''+(row.descripcion?row.descripcion:'')+ '\',\''+row.fechaRepostaje+ '\',\''+row.fkMatricula.nombre+ '\','+row.fkMatricula.id+',\''+(row.observaciones?row.observaciones:'')+ '\')" disabled="true"><span class="fa fa-eye"></span></button>';
					}
					return visuaoeditRepostaje + '&nbsp;' + eliminarRepostaje;
	       	    }
	   		}],
	});
}

$('#tablaRepostaje').on( 'draw.dt', function () {
    Botones_Repostaje();
} );

function mostrarAvisoRepostaje() {
  objetoRepostaje.classList.remove("d-none");
}

function clearModalGenRepostaje(nombre) {
	$('#modalGeneral #formuGenRep').find('form')[0].reset();
	$('#modalGeneral #geneRepostaje #idRepostajeActualiza').val(null);
	if(nombre!="limpiaRepostaje"){
		deshabilitarDatosRepostaje();
		resetModalRepostajeGeneral();
	}else{
		habilitarEdicionRepostaje();
	}
}

function resetModalRepostajeGeneral() {
	$('#modalGeneral #geneRepostaje #matriculaRepo').removeClass("border border-danger");
	$('#modalGeneral #geneRepostaje #lblMatriculaRepo').html('Matr&iacute;cula (*)');
	$('#modalGeneral #geneRepostaje #lblMatriculaRepo').css('color','black');
	$('#modalGeneral #geneRepostaje #importe').removeClass("border border-danger");
	$('#modalGeneral #geneRepostaje #lblImporte').html('Importe (*)');	
	$('#modalGeneral #geneRepostaje #lblImporte').css('color','black');
	$('#modalGeneral #geneRepostaje #fechaRepostaje').removeClass("border border-danger");	
	$('#modalGeneral #geneRepostaje #lblFechaRepostaje').html('Fecha Repostaje (*)');	
	$('#modalGeneral #geneRepostaje #lblFechaRepostaje').css('color','black');
	$('#modalGeneral #geneRepostaje #litros').removeClass("border border-danger");
	$('#modalGeneral #geneRepostaje #lblLitros').html('Nº Litros');	
	$('#modalGeneral #geneRepostaje #lblLitros').css('color','black');
	$('#modalGeneral #geneRepostaje #kilometros').removeClass("border border-danger");
	$('#modalGeneral #geneRepostaje #lblKilometros').html('Nº Kilómetros');	
	$('#modalGeneral #geneRepostaje #lblKilometros').css('color','black');
}

function crearRepostajeGeneral() {
	if(validaCamposRepostajeGeneral()){
		$.ajax({
			    type: 'POST',
			    url: './crearRepostaje',
			    data: $('#modalGeneral #geneRepostaje').serialize() ,
			    success: function (data) {
					tablaRepostaje.ajax.reload();
					$("#modalGeneral #alertaGeneralRepostajeOK").fadeIn(1500);
					setTimeout(function() {$("#modalGeneral #alertaGeneralRepostajeOK").fadeOut(1500);},3000);	
					clearModalGenRepostaje();		    		
	    		},
				error: function( jqXHR, textStatus, errorThrown ) {
					$("#modalGeneral #alertaGeneralRepostajeKO").fadeIn(1500);
					setTimeout(function() {$("#modalGeneral #alertaGeneralRepostajeKO").fadeOut(1500);},3000);
				}
			});
	}
}

function validaCamposRepostajeGeneral() {
	var res = true;
	if($('#modalGeneral #geneRepostaje #matriculaRepo').val() == "") {
		$('#modalGeneral #geneRepostaje #matriculaRepo').addClass("border border-danger");
		$('#modalGeneral #geneRepostaje #lblMatriculaRepo').html('Matrícula (*) Campo Obligatorio');	
		$('#modalGeneral #geneRepostaje #lblMatriculaRepo').css('color','red');
		res = false;
	}
	if($('#modalGeneral #geneRepostaje #importe').val() == "") {
		$('#modalGeneral #geneRepostaje #importe').addClass("border border-danger");
		$('#modalGeneral #geneRepostaje #lblImporte').html('Importe (*) Campo Obligatorio');	
		$('#modalGeneral #geneRepostaje #lblImporte').css('color','red');
		res = false;
	}
	if($('#modalGeneral #geneRepostaje #fechaRepostaje').val() == "") {
		$('#modalGeneral #geneRepostaje #fechaRepostaje').addClass("border border-danger");
		$('#modalGeneral #geneRepostaje #lblFechaRepostaje').html('Fecha Repostaje (*) Campo Obligatorio');	
		$('#modalGeneral #geneRepostaje #lblFechaRepostaje').css('color','red');
		res = false;
	}
	if(!($('#modalGeneral #geneRepostaje #kilometros').val()) == "" && ValidateDecimal($('#modalGeneral #geneRepostaje #kilometros').val()) == false) {
		$('#modalGeneral #geneRepostaje #kilometros').addClass("border border-danger");	
		$('#modalGeneral #geneRepostaje #lblKilometros').html('Solo se permite números enteros o con dos decimales como máximo');	
		$('#modalGeneral #geneRepostaje #lblKilometros').css('color','red');
		res = false;
	}
	if(!($('#modalGeneral #geneRepostaje #litros').val()) == "" && ValidateDecimal($('#modalGeneral #geneRepostaje #litros').val()) == false) {
		$('#modalGeneral #geneRepostaje #litros').addClass("border border-danger");	
		$('#modalGeneral #geneRepostaje #lblLitros').html('Solo se permite números enteros o con dos decimales como máximo');	
		$('#modalGeneral #geneRepostaje #lblLitros').css('color','red');
		res = false;
	}
	if(!($('#modalGeneral #geneRepostaje #importe').val()) == "" && ValidateDecimal($('#modalGeneral #geneRepostaje #importe').val()) == false) {
		$('#modalGeneral #geneRepostaje #importe').addClass("border border-danger");	
		$('#modalGeneral #geneRepostaje #lblImporte').html('Solo se permite números enteros o con dos decimales como máximo');	
		$('#modalGeneral #geneRepostaje #lblImporte').css('color','red');
		res = false;
	}
	return res;
}

function editarRepostajeGeneral(id, kilometros, litros, importe, descripcion, fechaRepostaje, nombreMatricula, idMatricula, observaciones){
	$('#modalGeneral #geneRepostaje #idRepostajeActualiza').val(id);
	$('#modalGeneral #geneRepostaje #nombreMatriculaRepostaje').val(nombreMatricula);
	$('#modalGeneral #geneRepostaje #matriculaRepo').val(idMatricula);
	if(kilometros != null){
		if(kilometros.includes('.')){
			$('#modalGeneral #geneRepostaje #kilometros').val(kilometros.replace(".", ","));
		}else{
			$('#modalGeneral #geneRepostaje #kilometros').val(kilometros);
		}
	}
	if(litros != null){
		if(litros.includes('.')){
			$('#modalGeneral #geneRepostaje #litros').val(litros.replace(".", ","));
		}else{
			$('#modalGeneral #geneRepostaje #litros').val(litros);
		}
	}
	if(importe != null){
		if(importe.includes('.')){
			$('#modalGeneral #geneRepostaje #importe').val(importe.replace(".", ","));
		}else{
			$('#modalGeneral #geneRepostaje #importe').val(importe);
		}
	}
	$('#modalGeneral #geneRepostaje #fechaRepostaje').val(fechaRepostaje);
	$('#modalGeneral #geneRepostaje #descripcion').val(descripcion);
	$('#modalGeneral #geneRepostaje #observacionesRepostaje').val(observaciones);
	resetModalRepostajeGeneral();
}

function modalEliminarRepostajeGeneral(id) {
	$('#modalEliminarRepostajeGeneral #idModalEliminarRepostajeGeneral').text('Eliminar Repostaje');
	$('#modalEliminarRepostajeGeneral #idRepostajeEliminarGeneral').val(id);
	$('#modalEliminarRepostajeGeneral').modal('show');
}

function eliminarRepostajeGeneral() {
	$.ajax({
		    type: 'POST',
		    url: './eliminarRepostaje',
		    data: $('#modalEliminarRepostajeGeneral #eliminarRepostajeGeneral').serialize() ,
		    success: function (data) {
		    	$('#modalEliminarRepostajeGeneral').modal('hide');
				tablaRepostaje.ajax.reload();
				$("#alertaEliminarRepostajeGeneralOK").fadeIn(1500);
				setTimeout(function() {$("#alertaEliminarRepostajeGeneralOK").fadeOut(1500);},3000);
				clearModalGenRepostaje();
    		},
			 error: function( jqXHR, textStatus, errorThrown ) {
				$('#modalEliminarRepostajeGeneral').modal('hide');
				$("#alertaEliminarRepostajeGeneralKO").fadeIn(1500);
				setTimeout(function() {$("#alertaEliminarRepostajeGeneralKO").fadeOut(1500);},3000);
			 }
		});
}

$("#modalGeneral #geneRepostaje #matriculaRepo").change(function() {
	$('#modalGeneral #geneRepostaje #matriculaRepo').removeClass("border border-danger");
	$('#modalGeneral #geneRepostaje #lblMatriculaRepo').html('Matrícula (*)');	
	$('#modalGeneral #geneRepostaje #lblMatriculaRepo').css('color','black');
});

$('#modalGeneral #geneRepostaje #importe').keydown(function(event){
	$('#modalGeneral #geneRepostaje #importe').removeClass("border border-danger");
	$('#modalGeneral #geneRepostaje #lblImporte').html('Importe (*)');	
	$('#modalGeneral #geneRepostaje #lblImporte').css('color','black');
});

$('#modalGeneral #geneRepostaje #litros').keydown(function(event){
	$('#modalGeneral #geneRepostaje #litros').removeClass("border border-danger");
	$('#modalGeneral #geneRepostaje #lblLitros').html('Nº Litros');	
	$('#modalGeneral #geneRepostaje #lblLitros').css('color','black');
});

$('#modalGeneral #geneRepostaje #kilometros').keydown(function(event){
	$('#modalGeneral #geneRepostaje #kilometros').removeClass("border border-danger");
	$('#modalGeneral #geneRepostaje #lblKilometros').html('Nº Kilómetros');	
	$('#modalGeneral #geneRepostaje #lblKilometros').css('color','black');
});

$('#modalGeneral #geneRepostaje #fechaRepostaje').change(function(event){
	$('#modalGeneral #geneRepostaje #fechaRepostaje').removeClass("border border-danger");
	$('#modalGeneral #geneRepostaje #lblFechaRepostaje').html('Fecha Repostaje (*)');	
	$('#modalGeneral #geneRepostaje #lblFechaRepostaje').css('color','black');
});

function cerrarEliminarRepostajeGeneral(){
	$('#modalEliminarRepostajeGeneral').modal('hide');
}
/*** FIN REPOSTAJES ***/

/*** INICIO SINIESTRO ***/
function Botones_Siniestro(){
	if($('#modalGeneral #formuEstadoGeneralVehi #estadoGeneralVehi').val() == "ALTA" && $('#modalGeneral #habilitarEdicionSiniestro').prop('disabled')==true)
	{
		$('#modalGeneral #tablaSiniestro #ButtonEditarSiniestro').removeClass('btn-light');
		$('#modalGeneral #tablaSiniestro #ButtonEditarSiniestro').addClass('btn-success');
		$('#modalGeneral #tablaSiniestro #ButtonEditarSiniestro').prop('disabled',false);
		if (permisoDeAccesoSiniestro != "VISUALIZADOR") {
			$('#modalGeneral #tablaSiniestro #ButtonEliminarSiniestro').removeClass('btn-light');
			$('#modalGeneral #tablaSiniestro #ButtonEliminarSiniestro').addClass('btn-success');
			$('#modalGeneral #tablaSiniestro #ButtonEliminarSiniestro').prop('disabled',false);
		}
		$('#modalGeneral #tablaSiniestro #ButtonAnadirDocumentoSiniestro').removeClass('btn-light');
		$('#modalGeneral #tablaSiniestro #ButtonAnadirDocumentoSiniestro').addClass('btn-success');
		$('#modalGeneral #tablaSiniestro #ButtonAnadirDocumentoSiniestro').prop('disabled',false);
	}else{
		$('#modalGeneral #tablaSiniestro #ButtonEditarSiniestro').removeClass('btn-success');
		$('#modalGeneral #tablaSiniestro #ButtonEditarSiniestro').addClass('btn-light');
		$('#modalGeneral #tablaSiniestro #ButtonEditarSiniestro').prop('disabled',true);
		$('#modalGeneral #tablaSiniestro #ButtonEliminarSiniestro').removeClass('btn-success');
		$('#modalGeneral #tablaSiniestro #ButtonEliminarSiniestro').addClass('btn-light');
		$('#modalGeneral #tablaSiniestro #ButtonEliminarSiniestro').prop('disabled',true);
		$('#modalGeneral #tablaSiniestro #ButtonAnadirDocumentoSiniestro').removeClass('btn-success');
		$('#modalGeneral #tablaSiniestro #ButtonAnadirDocumentoSiniestro').addClass('btn-light');
		$('#modalGeneral #tablaSiniestro #ButtonAnadirDocumentoSiniestro').prop('disabled',true);
	}
}

function deshabilitarDatosSiniestro(){
	$('#modalGeneral #geneSiniestro input').prop('disabled',true);
	$('#modalGeneral #geneSiniestro textarea').prop('disabled',true);
	$('#modalGeneral #geneSiniestro select').prop('disabled',true);
	$('#modalGeneral #guardaSiniestro').addClass('btn-light');
	$('#modalGeneral #guardaSiniestro').prop('disabled',true);
	$('#modalGeneral #limpiaSiniestro').addClass('btn-light');
	$('#modalGeneral #limpiaSiniestro').prop('disabled',true);
	$('#modalGeneral #habilitarEdicionSiniestro').removeClass('btn-light');
	$('#modalGeneral #habilitarEdicionSiniestro').prop('disabled',false);
}

function habilitarEdicionSiniestro() {
	if(permisoDeAccesoSiniestro=="EDITOR" || permisoDeAccesoSiniestro=="ADMINISTRADOR"){
		$('#modalGeneral #geneSiniestro input').prop('disabled', false);
		$('#modalGeneral #geneSiniestro select').prop('disabled', false);
		$('#modalGeneral #geneSiniestro textarea').prop('disabled',false);
		$('#modalGeneral #guardaSiniestro').removeClass('btn-light');
		$('#modalGeneral #guardaSiniestro').prop('disabled',false);
		$('#modalGeneral #limpiaSiniestro').removeClass('btn-light');
		$('#modalGeneral #limpiaSiniestro').prop('disabled',false);
	}
	$('#modalGeneral #habilitarEdicionSiniestro').addClass('btn-light');
	$('#modalGeneral #habilitarEdicionSiniestro').prop('disabled',true);
	// LLAMAMOS A LA FUNCION PARA RELLENAR EL LISTADO DE MATRICULAS DEL VEHICULO
	recargarMatriculas($('#modalGeneral #geneVehiculo #idVehiculoActualiza').val(),"geneSiniestro","matriculaSini");
	// SE COMPRUEBA SI ESTA DE BAJA EL VEHICULO PARA HABILITAR BOTONES DE SINIESTRO O NO
	Botones_Siniestro();
}

//ESTA FUNCION OBTIENE EL ID DEL VEHICULO
function obtenerDatosSiniestro(id) {
	clearModalGenSiniestro();
	$('#modalGeneral #geneSiniestro #idVehiculoSiniestro').val(id);
	
	tablaSiniestro = $('#modalGeneral #tablaSiniestro').DataTable({
	   "order": [[ 0, "desc" ]],
	   destroy: true,
	   ajax : {
			url: './tablaSiniestro',
			data : {"idVehiculoSiniestro" : id},
			dataSrc: ''
	   },
	   columnDefs: [
	            {
	                "targets": [0],
	                "visible": false
	            },
	            {
	                "targets":2,
	                "type":"date-eu"
	            }
	        ],
	   columns : [
	   		{
	   			title: 'id',
	   			data:'id',
	   		},
	   		{
	   			title: 'Matr&iacute;cula',
	   			data: 'fkMatricula.nombre', 
	   		},
	   		{
	   			title: 'Fecha Siniestro',
	   			data: 'fechaSiniestro',
	   			render: function (data) {
					return moment(data).format('DD/MM/YYYY');
				}
	   		},
	   		{
	   			title: 'N&uacute;mero Expediente',
	   			data:'numeroExpediente', 
	   		},
	   		{
	   			title: 'Conductor',
	   			data:'conductor', 
	   		},
	   		{
	   			title: 'P&oacute;liza Contrario',
	   			data:'polizaContrario'
	   		},
            {
				title: 'Acciones',
	            render: function (data, type, row) {
					var eliminarSiniestro = '<button type="button" id="ButtonEliminarSiniestro" class="editar edit-modal btn" disabled="true" onclick="modalEliminarSiniestroGeneral('+row.id+')"><i class="fa fa-trash"></i></button>';
					var visuaoeditSiniestro = '';
					if (permisoDeAccesoSiniestro != "VISUALIZADOR") {
						visuaoeditSiniestro = '<button type="button" id="ButtonEditarSiniestro" class="editar edit-modal btn " disabled="true" onclick="editarSiniestroGeneral('+row.id+')"><span class="fa fa-edit"></span></button>';
					}else{
						visuaoeditSiniestro = '<button type="button" id="ButtonEditarSiniestro" class="editar edit-modal btn " disabled="true" onclick="editarSiniestroGeneral('+row.id+')"><span class="fa fa-eye"></span></button>';
					}
					return visuaoeditSiniestro + '&nbsp;' + eliminarSiniestro;
	       		}
	   		},
			{
				   title: 'Gesti&oacute;n',
	               render: function (data, type, row) {
	       		   			return '<button type="button" id="ButtonAnadirDocumentoSiniestro" class="editar edit-modal btn"  data-toggle="tooltip" data-placement="bottom" title="Gestión documento Siniestro" onclick="nuevoSiniestroDocumentoGeneral('+row.id+')" disabled="true"><span class="fa fa-file-alt"></span></button>';	
	       		   }
	   		}],
	});
}

$('#tablaSiniestro').on( 'draw.dt', function () {
    Botones_Siniestro();
} );

function mostrarAvisoSiniestro() {
  objetoSiniestro.classList.remove("d-none");
}

function clearModalGenSiniestro(nombre) {
	$('#modalGeneral #formuGenSini').find('form')[0].reset();
	$('#modalGeneral #geneSiniestro #idSiniestroActualiza').val(null);
	if(nombre!="limpiaSiniestro"){
		deshabilitarDatosSiniestro();
		resetModalSiniestroGeneral();
	}else{
		habilitarEdicionSiniestro();
	}
}

function resetModalSiniestroGeneral() {
	$('#modalGeneral #geneSiniestro #matriculaSini').removeClass("border border-danger");
	$('#modalGeneral #geneSiniestro #lblMatriculaSini').html('Matr&iacute;cula (*)');	
	$('#modalGeneral #geneSiniestro #lblMatriculaSini').css('color','black');
	$('#modalGeneral #geneSiniestro #fechaSiniestro').removeClass("border border-danger");
	$('#modalGeneral #geneSiniestro #lblFechaSiniestro').html('Fecha Siniestro (*)');	
	$('#modalGeneral #geneSiniestro #lblFechaSiniestro').css('color','black');
	$('#modalGeneral #geneSiniestro #horaSiniestro').removeClass("border border-danger");
	$('#modalGeneral #geneSiniestro #horaLabel').html('Hora');	
	$('#modalGeneral #geneSiniestro #horaLabel').css('color','black');
}

function crearSiniestroGeneral() {
	if(validaCamposSiniestroGeneral()){
		$.ajax({
			    type: 'POST',
			    url: './crearSiniestro',
			    data: $('#modalGeneral #geneSiniestro').serialize() ,
			    success: function (data) {
					tablaSiniestro.ajax.reload();
					$("#alertaSiniestroGeneralOK").fadeIn(1500);
					setTimeout(function() {$("#alertaSiniestroGeneralOK").fadeOut(1500);},3000);		
	    			clearModalGenSiniestro();		
	    		},
				error: function( jqXHR, textStatus, errorThrown ) {
					$("#alertaSiniestroGeneralKO").fadeIn(1500);
					setTimeout(function() {$("#alertaSiniestroGeneralKO").fadeOut(1500);},3000);
				}
			});
	}
}

function validaCamposSiniestroGeneral() {
	var res = true;
	if($('#modalGeneral #geneSiniestro #matriculaSini').val() == "") {
		$('#modalGeneral #geneSiniestro #matriculaSini').addClass("border border-danger");
		$('#modalGeneral #geneSiniestro #lblMatriculaSini').html('Matrícula (*) Campo Obligatorio');	
		$('#modalGeneral #geneSiniestro #lblMatriculaSini').css('color','red');
		res = false;
	}
	if($('#modalGeneral #geneSiniestro #fechaSiniestro').val() == "") {
		$('#modalGeneral #geneSiniestro #fechaSiniestro').addClass("border border-danger");
		$('#modalGeneral #geneSiniestro #lblFechaSiniestro').html('Fecha Siniestro (*) Campo Obligatorio');	
		$('#modalGeneral #geneSiniestro #lblFechaSiniestro').css('color','red');
		res = false;
	} 
	if(!($('#modalGeneral #geneSiniestro #horaSiniestro').val()) == "" && ValidateHora($('#modalGeneral #geneSiniestro #horaSiniestro').val()) == false) {
		$('#modalGeneral #geneSiniestro #horaSiniestro').addClass("border border-danger");
		$('#modalGeneral #geneSiniestro #horaLabel').html('Hora Introduce una hora válida');	
		$('#modalGeneral #geneSiniestro #horaLabel').css('color','red');
		res = false;
	}
	return res;
}

function editarSiniestroGeneral(id) {
	$.ajax({
		data: { id : id },
		url: './obtenerSiniestro',
		type : 'POST',
		dataType: 'json',
		success: function(data)
		{
			$('#modalGeneral #geneSiniestro #matriculaSini').val(data.fkMatricula.id);
			if(data.fechaSiniestro != null){
				$('#modalGeneral #geneSiniestro #fechaSiniestro').val(data.fechaSiniestro);
			}	
			$('#modalGeneral #geneSiniestro #conductor').val(data.conductor);
			$('#modalGeneral #geneSiniestro #conductorContrario').val(data.conductorContrario);
			$('#modalGeneral #geneSiniestro #horaSiniestro').val(data.horaSiniestro);
			$('#modalGeneral #geneSiniestro #numeroExpediente').val(data.numeroExpediente);
			$('#modalGeneral #geneSiniestro #polizaContrario').val(data.polizaContrario);
			$('#modalGeneral #geneSiniestro #lugarSiniestro').val(data.lugarSiniestro);
			$('#modalGeneral #geneSiniestro #danos').val(data.danos);
			$('#modalGeneral #geneSiniestro #companiaContrario').val(data.companiaContrario);
			$('#modalGeneral #geneSiniestro #observacionesSiniestro').val(data.observaciones);
			$('#modalGeneral #geneSiniestro #idSiniestroActualiza').val(data.id);
			resetModalSiniestroGeneral();
		},
	});
}

function modalEliminarSiniestroGeneral(id) {
	$('#modalEliminarSiniestroGeneral #idModalEliminarSiniestroGeneral').text('Eliminar Siniestro');
	$('#modalEliminarSiniestroGeneral #idSiniestroEliminarGeneral').val(id);
	$('#modalEliminarSiniestroGeneral').modal('show');
}

function eliminarSiniestroGeneral() {
	$.ajax({
		    type: 'POST',
		    url: './eliminarSiniestro',
		    data: $('#modalEliminarSiniestroGeneral #eliminarSiniestroGeneral').serialize() ,
		    success: function (data) {
		    	$('#modalEliminarSiniestroGeneral').modal('hide');
				tablaSiniestro.ajax.reload();
				$("#alertaEliminarSiniestroGeneralOK").fadeIn(1500);
				setTimeout(function() {$("#alertaEliminarSiniestroGeneralOK").fadeOut(1500);},3000);
				clearModalGenSiniestro();
    		},
			 error: function( jqXHR, textStatus, errorThrown ) {
			 	$('#modalEliminarSiniestroGeneral').modal('hide');
				$("#alertaEliminarSiniestroGeneralKO").fadeIn(1500);
				setTimeout(function() {$("#alertaEliminarSiniestroGeneralKO").fadeOut(1500);},3000);
			 }
		});
}

$("#modalGeneral #geneSiniestro #matriculaSini").change(function() {
	$('#modalGeneral #geneSiniestro #matriculaSini').removeClass("border border-danger");
	$('#modalGeneral #geneSiniestro #lblMatriculaSini').html('Matrícula (*)');	
	$('#modalGeneral #geneSiniestro #lblMatriculaSini').css('color','black');
});

$("#fechaSiniestro").change(function() {
	$('#modalGeneral #geneSiniestro #fechaSiniestro').removeClass("border border-danger");
	$('#modalGeneral #geneSiniestro #lblFechaSiniestro').html('Fecha Siniestro (*)');	
	$('#modalGeneral #geneSiniestro #lblFechaSiniestro').css('color','black');
});

$("#horaSiniestro").keydown(function() {
	$('#modalGeneral #geneSiniestro #horaSiniestro').removeClass("border border-danger");
	$('#modalGeneral #geneSiniestro #horaLabel').html('Hora');	
	$('#modalGeneral #geneSiniestro #horaLabel').css('color','black');
});

function cerrarEliminarSiniestroGeneral(){
	$('#modalEliminarSiniestroGeneral').modal('hide');
}
/*** FIN SINIESTRO ***/

/*** INICIO DOCUMENTO SINIESTRO ***/
function habilitarEdicionSiniestroDocumento() {
	if (permisoDeAccesoSiniestro != "VISUALIZADOR") {
		$('#modalSiniestroDocumentoGeneral #nuevoSiniestroDocumentoGeneral input').prop('disabled', false);
		$('#modalSiniestroDocumentoGeneral #nuevoSiniestroDocumentoGeneral textarea').prop('disabled',false);
		$('#modalSiniestroDocumentoGeneral #guardarSiniestroDocumento').removeClass('btn-light');
		$('#modalSiniestroDocumentoGeneral #guardarSiniestroDocumento').prop('disabled',false);
		$('#modalSiniestroDocumentoGeneral #limpiaSiniestroDocumento').removeClass('btn-light');
		$('#modalSiniestroDocumentoGeneral #limpiaSiniestroDocumento').prop('disabled',false);
	}else{
		$('#modalSiniestroDocumentoGeneral #nuevoSiniestroDocumentoGeneral input').prop('disabled', true);
		$('#modalSiniestroDocumentoGeneral #nuevoSiniestroDocumentoGeneral textarea').prop('disabled',true);
		$('#modalSiniestroDocumentoGeneral #guardarSiniestroDocumento').addClass('btn-light');
		$('#modalSiniestroDocumentoGeneral #guardarSiniestroDocumento').prop('disabled',true);
		$('#modalSiniestroDocumentoGeneral #limpiaSiniestroDocumento').addClass('btn-light');
		$('#modalSiniestroDocumentoGeneral #limpiaSiniestroDocumento').prop('disabled',true);
	}
}

function nuevoSiniestroDocumentoGeneral(id) {
	$('#modalGeneral').modal('hide');
	$('#modalSiniestroDocumentoGeneral #idSiniestroDocumentoGeneral').val(id);
	$('#modalSiniestroDocumentoGeneral').modal({
		keyboard: false,
		backdrop: 'static'
	});
	habilitarEdicionSiniestroDocumento();
	tablaSiniestroDocumento = $('#modalSiniestroDocumentoGeneral #tablaSiniestroDocumentoGeneral').DataTable({
	   destroy: true,
	   ajax : {
			url: './tablaSiniestroDocumento',
			data : {"idSiniestro" : id},
			dataSrc: ''
	   },
	   columnDefs: [
	            {
	                "targets": [0],
	                "visible": false
	            }
	        ],
	   columns : [
	   		{
	   			title: 'id',
	   			data:'id',
	   		},
	   		{
	   			title: 'Nombre',
	   			data:'nombre'
	   		},
	   		{
	   			title: 'Comentarios',
	   			data:'comentarios'
	   		},
            {
				title: 'Acciones',
	            render: function (data, type, row) {
					var eliminarDocSiniestro = '';
					var visuaoeditDocSiniestro = '<button type="button" id="ButtonDescargarDocumentoSiniestroGeneral" class="editar edit-modal btn btn-success"  data-toggle="tooltip" data-placement="bottom" title="Descargar" onclick="descargarDocumentoSiniestro(\''+row.nombre+'\','+row.id+')"><span class="fa fa-file-alt"></span></button>';
					if (permisoDeAccesoSiniestro != "VISUALIZADOR") {
						eliminarDocSiniestro = '<button type="button" id="ButtonEliminarDocumentoSiniestroGeneral" class="editar edit-modal btn btn-success" onclick="modalEliminarDocumentoSiniestroGeneral('+row.id+')"><i class="fa fa-trash"></i></button>';
					}else{
						eliminarDocSiniestro = '<button type="button" id="ButtonEliminarDocumentoSiniestroGeneral" class="editar edit-modal btn btn-light" disabled="true" onclick="modalEliminarDocumentoSiniestroGeneral('+row.id+')"><i class="fa fa-trash"></i></button>';
					}
					return visuaoeditDocSiniestro + '&nbsp;' + eliminarDocSiniestro;
	            }
	   		}],
	});
}

function modalEliminarDocumentoSiniestroGeneral(id) {
	$('#modalEliminarDocumentoSiniestroGeneral #idModalEliminarDocumentoSiniestroGeneral').text('Eliminar Documento Siniestro');
	$('#modalEliminarDocumentoSiniestroGeneral #eliminarDocumentoSiniestroGeneral #idDocumentoSiniestroEliminarGeneral').val(id);
	$('#modalSiniestroDocumentoGeneral').modal('hide');
	$('#modalEliminarDocumentoSiniestroGeneral').modal('show');
}

function cerrarEliminarSiniestroDocumentoGeneral(){
	$('#modalEliminarDocumentoSiniestroGeneral').modal('hide');
	$('#modalSiniestroDocumentoGeneral').modal('show');
}

function eliminarDocumentoSiniestroGeneral() {
	$.ajax({
		    type: 'POST',
		    url: './eliminarDocumentoSiniestro',
		    data: $('#modalEliminarDocumentoSiniestroGeneral #eliminarDocumentoSiniestroGeneral').serialize() ,
		    success: function (data) {
		    	$('#modalEliminarDocumentoSiniestroGeneral').modal('hide');
		    	$('#modalSiniestroDocumentoGeneral').modal('show');
		    	tablaSiniestroDocumento.ajax.reload();
		    	clearModalGenSiniestroDocumento();
				$("#alertaEliminarSiniestroDocumentoGeneralOK").fadeIn(1500);
				setTimeout(function() {$("#alertaEliminarSiniestroDocumentoGeneralOK").fadeOut(1500);},3000);		
    		},
			 error: function( jqXHR, textStatus, errorThrown ) {
			 	$('#modalEliminarDocumentoSiniestroGeneral').modal('hide');
			 	$('#modalSiniestroDocumentoGeneral').modal('show');
				$("#alertaEliminarSiniestroDocumentoGeneralKO").fadeIn(1500);
				setTimeout(function() {$("#alertaEliminarSiniestroDocumentoGeneralKO").fadeOut(1500);},3000);
			 }
		});
}

function clearModalGenSiniestroDocumento() {
	$('#modalSiniestroDocumentoGeneral').find('form')[0].reset();
	$('#modalSiniestroDocumentoGeneral #ficheroSiniestroGeneral').removeClass("border border-danger");
	$('#modalSiniestroDocumentoGeneral #lblFicheroSiniestroGeneral').html('Adjunto (*)');	
	$('#modalSiniestroDocumentoGeneral #lblFicheroSiniestroGeneral').css('color','black');
}

function guardarDocumentoSiniestroGeneral() {
	if(validaCamposDocumentoSiniestroGeneral()){
		var formData = new FormData();
		var files = document.getElementById('ficheroSiniestroGeneral').files;
		formData.append('fkSiniestro.id', $('#modalSiniestroDocumentoGeneral #nuevoSiniestroDocumentoGeneral #idSiniestroDocumentoGeneral').val());
		formData.append('ficheroSiniestro', files[0]);
		formData.append('nombre', files[0].name);
		formData.append('mime', files[0].type);
		formData.append('comentarios', $('#modalSiniestroDocumentoGeneral #nuevoSiniestroDocumentoGeneral #observacionesSiniestroDocumentoGeneral').val());
		$.ajax({
			    type: 'POST',
			    cache: false,
	    		contentType: false,
	    		processData: false,
			    url: './guardarDocumentoSiniestro',
			    data: formData,
			    success: function (data) {
			    	clearModalGenSiniestroDocumento();
			    	tablaSiniestroDocumento.ajax.reload();
					$("#alertaSiniestroDocumentoGeneralOK").fadeIn(1500);
					setTimeout(function() {$("#alertaSiniestroDocumentoGeneralOK").fadeOut(1500);},3000);		
	    		},
				error: function( jqXHR, textStatus, errorThrown ) {
					$("#alertaSiniestroDocumentoGeneralKO").fadeIn(1500);
					setTimeout(function() {$("#alertaSiniestroDocumentoGeneralKO").fadeOut(1500);},3000);
				}
			});
	}
}

function validaCamposDocumentoSiniestroGeneral() {
	if($('#modalSiniestroDocumentoGeneral #ficheroSiniestroGeneral').val() == "") {
		$('#modalSiniestroDocumentoGeneral #ficheroSiniestroGeneral').addClass("border border-danger");
		$('#modalSiniestroDocumentoGeneral #lblFicheroSiniestroGeneral').html('Adjunto (*)');	
		$('#modalSiniestroDocumentoGeneral #lblFicheroSiniestroGeneral').css('color','red');
		return false;
	} else{
		return true;
	}
}

$("#modalSiniestroDocumentoGeneral #ficheroSiniestroGeneral").change(function() {
	$('#modalSiniestroDocumentoGeneral #ficheroSiniestroGeneral').removeClass("border border-danger");
	$('#modalSiniestroDocumentoGeneral #lblFicheroSiniestroGeneral').html('Adjunto (*)');	
	$('#modalSiniestroDocumentoGeneral #lblFicheroSiniestroGeneral').css('color','black');
});

function cerrarSiniestroDocumentoGeneral(){
	clearModalGenSiniestroDocumento();
	$('#modalSiniestroDocumentoGeneral').modal('hide');
	$('#modalGeneral').modal('show');
}
/*** FIN DOCUMENTO SINIESTRO ***/

/*** INICIO POLIZA ***/
function Botones_Poliza(){
	if($('#modalGeneral #formuEstadoGeneralVehi #estadoGeneralVehi').val() == "ALTA" && $('#modalGeneral #habilitarEdicionPoliza').prop('disabled')==true)
	{
		$('#modalGeneral #tablaPoliza #ButtonEditarPoliza').removeClass('btn-light');
		$('#modalGeneral #tablaPoliza #ButtonEditarPoliza').addClass('btn-success');
		$('#modalGeneral #tablaPoliza #ButtonEditarPoliza').prop('disabled',false);
		if (permisoDeAccesoPoliza != "VISUALIZADOR") {
			$('#modalGeneral #tablaPoliza #ButtonEliminarPoliza').removeClass('btn-light');
			$('#modalGeneral #tablaPoliza #ButtonEliminarPoliza').addClass('btn-success');
			$('#modalGeneral #tablaPoliza #ButtonEliminarPoliza').prop('disabled',false);
		}
		$('#modalGeneral #tablaPoliza #ButtonAnadirDocumentoPoliza').removeClass('btn-light');
		$('#modalGeneral #tablaPoliza #ButtonAnadirDocumentoPoliza').addClass('btn-success');
		$('#modalGeneral #tablaPoliza #ButtonAnadirDocumentoPoliza').prop('disabled',false);
	}else{
		$('#modalGeneral #tablaPoliza #ButtonEditarPoliza').removeClass('btn-success');
		$('#modalGeneral #tablaPoliza #ButtonEditarPoliza').addClass('btn-light');
		$('#modalGeneral #tablaPoliza #ButtonEditarPoliza').prop('disabled',true);
		$('#modalGeneral #tablaPoliza #ButtonEliminarPoliza').removeClass('btn-success');
		$('#modalGeneral #tablaPoliza #ButtonEliminarPoliza').addClass('btn-light');
		$('#modalGeneral #tablaPoliza #ButtonEliminarPoliza').prop('disabled',true);
		$('#modalGeneral #tablaPoliza #ButtonAnadirDocumentoPoliza').removeClass('btn-success');
		$('#modalGeneral #tablaPoliza #ButtonAnadirDocumentoPoliza').addClass('btn-light');
		$('#modalGeneral #tablaPoliza #ButtonAnadirDocumentoPoliza').prop('disabled',true);
	}
}

function deshabilitarDatosPoliza(){
	$('#modalGeneral #genePoliza input').prop('disabled',true);
	$('#modalGeneral #genePoliza select').prop('disabled',true);
	$('#modalGeneral #genePoliza textarea').prop('disabled',true);
	$('#modalGeneral #guardaPoliza').addClass('btn-light');
	$('#modalGeneral #guardaPoliza').prop('disabled',true);
	$('#modalGeneral #limpiaPoliza').addClass('btn-light');
	$('#modalGeneral #limpiaPoliza').prop('disabled',true);
	$('#modalGeneral #habilitarEdicionPoliza').removeClass('btn-light');
	$('#modalGeneral #habilitarEdicionPoliza').prop('disabled',false);
}

function habilitarEdicionPoliza() {
	if(permisoDeAccesoPoliza=="EDITOR" || permisoDeAccesoPoliza=="ADMINISTRADOR"){
		$('#modalGeneral #genePoliza input').prop('disabled', false);
		$('#modalGeneral #genePoliza select').prop('disabled', false);
		$('#modalGeneral #genePoliza textarea').prop('disabled',false);
		$('#modalGeneral #guardaPoliza').removeClass('btn-light');
		$('#modalGeneral #guardaPoliza').prop('disabled',false);
		$('#modalGeneral #limpiaPoliza').removeClass('btn-light');
		$('#modalGeneral #limpiaPoliza').prop('disabled',false);
	}
	$('#modalGeneral #habilitarEdicionPoliza').addClass('btn-light');
	$('#modalGeneral #habilitarEdicionPoliza').prop('disabled',true);
	// LLAMAMOS A LA FUNCION PARA RELLENAR EL LISTADO DE MATRICULAS DEL VEHICULO
	recargarMatriculas($('#modalGeneral #geneVehiculo #idVehiculoActualiza').val(),"genePoliza","matriculaPoli");
	// SE COMPRUEBA SI ESTA DE BAJA EL VEHICULO PARA HABILITAR BOTONES DE POLIZA O NO
	Botones_Poliza();
}

//ESTA FUNCION OBTIENE EL ID DEL VEHICULO
function obtenerDatosPoliza(id) {
	clearModalGenPoliza();
	$('#modalGeneral #genePoliza #idVehiculoPoliza').val(id);
	
	tablaPoliza = $('#modalGeneral #tablaPoliza').DataTable({
	"order": [[ 0, "desc" ]],
	   destroy: true,
	   ajax : {
			url: './tablaPoliza',
			data : {"idVehiculo" : id},
			dataSrc: ''
	   },
	   columnDefs: [
	            {
	                "targets": [0],
	                "visible": false
	            },
	            {
	                "targets":5,
	                "type":"date-eu"
	            },
	            {
	                "targets":6,
	                "type":"date-eu"
	            }
	        ],
	   columns : [
	   		{
	   			title: 'id',
	   			data:'id',
	   		},
	   		{
	   			title: 'Matr&iacute;cula',
	   			data: 'fkMatricula.nombre', 
	   		},
	   		{
	   			title: 'Compañ&iacute;a',
	   			data:'fkCompania.nombre'
	   		},
	   		{
	   			title: 'P&oacute;liza',
	   			data:'numeroPoliza'
	   		},
	   		{
	   			title: 'NIF',
	   			data:'nif'
	   		},
	   		{
	   			title: 'Fecha Inicio',
	   			render: function (data, type, row) { return moment(row.fechaInicio).format('DD/MM/YYYY')}
	   		},
	   		{
				title: 'Fecha Fin', 	
            	render: function (data, type, row) { return row.fechaFin ? moment(row.fechaFin).format('DD/MM/YYYY') : ""}
            },
            {
				title: 'Acciones',
	            render: function (data, type, row) {
					var eliminarPoliza = '<button type="button" id="ButtonEliminarPoliza" class="editar edit-modal btn btn" onclick="modalEliminarPolizaGeneral('+row.id+')"disabled="true"><i class="fa fa-trash"></i></button>';
					var visuaoeditPoliza = '';
					if (permisoDeAccesoPoliza != "VISUALIZADOR") {
						visuaoeditPoliza = '<button type="button" id="ButtonEditarPoliza" class="editar edit-modal btn btn" disabled="true" onclick="editarPolizaGeneral('+row.id+','+row.fkVehiculo.id+','+row.fkMatricula.id+',\''+row.fkCompania.id+ '\',\''+(row.nif?row.nif:'')+ '\',\''+row.numeroPoliza+ '\',\''+(row.direccion?row.direccion:'')+ '\',\''+row.fechaInicio+ '\',\''+(row.fechaFin?row.fechaFin:'')+ '\',\''+(row.telefono?row.telefono:'')+ '\',\''+(row.contacto?row.contacto:'')+ '\',\''+(row.observaciones?row.observaciones:'')+ '\')"><i class="fa fa-edit"></i></button>';
					}else{
						visuaoeditPoliza = '<button type="button" id="ButtonEditarPoliza" class="editar edit-modal btn btn" disabled="true" onclick="editarPolizaGeneral('+row.id+','+row.fkVehiculo.id+','+row.fkMatricula.id+',\''+row.fkCompania.id+ '\',\''+(row.nif?row.nif:'')+ '\',\''+row.numeroPoliza+ '\',\''+(row.direccion?row.direccion:'')+ '\',\''+row.fechaInicio+ '\',\''+(row.fechaFin?row.fechaFin:'')+ '\',\''+(row.telefono?row.telefono:'')+ '\',\''+(row.contacto?row.contacto:'')+ '\',\''+(row.observaciones?row.observaciones:'')+ '\')"><i class="fa fa-eye"></i></button>';
					}
					return visuaoeditPoliza + '&nbsp;' + eliminarPoliza;
				}
	   		},
			{
				title: 'Gesti&oacute;n',
	            render: function (data, type, row) {
					return '<button type="button" id="ButtonAnadirDocumentoPoliza" class="editar edit-modal btn"  data-toggle="tooltip" data-placement="bottom" title="Gestión documento póliza" onclick="nuevaPolizaDocumentoGeneral('+row.id+')" disabled="true"><i class="fa fa-file-alt"></i></button>';
	            }
	   		}],
	});
}

$('#tablaPoliza').on( 'draw.dt', function () {
    Botones_Poliza();
} );

function mostrarAvisoPoliza() {
  objetoPoliza.classList.remove("d-none");
}

function clearModalGenPoliza(nombre) {
	$('#modalGeneral #formuGenPoli').find('form')[0].reset();
	$('#modalGeneral #genePoliza #idPolizaActualiza').val(null);
	$("#modalGeneral #genePoliza #inicioPol").datepicker('option', 'maxDate', null);
	$("#modalGeneral #genePoliza #finPol").datepicker('option', 'minDate', null);
	if(nombre!="limpiaPoliza"){
		deshabilitarDatosPoliza();
		resetModalPolizaGeneral();
	}else{
		habilitarEdicionPoliza();
	}
}

function resetModalPolizaGeneral() {
	$('#modalGeneral #genePoliza #matriculaPoli').removeClass("border border-danger");
	$('#modalGeneral #genePoliza #lblMatriculaPoli').html('Matr&iacute;cula (*)');	
	$('#modalGeneral #genePoliza #lblMatriculaPoli').css('color','black');
	$('#modalGeneral #genePoliza #fkCompania').removeClass("border border-danger");
	$('#modalGeneral #genePoliza #etiquetaCompania').html('Compañía (*)');
	$('#modalGeneral #genePoliza #etiquetaCompania').css('color','black');
	$('#modalGeneral #genePoliza #numeroPoliza').removeClass("border border-danger");	
	$('#modalGeneral #genePoliza #etiquetaPoliza').html('Nº Póliza (*)');	
	$('#modalGeneral #genePoliza #etiquetaPoliza').css('color','black');
	$('#modalGeneral #genePoliza #inicioPol').removeClass("border border-danger");	
	$('#modalGeneral #genePoliza #etiquetaFechaInicio').html('Fecha Inicio (*)');	
	$('#modalGeneral #genePoliza #etiquetaFechaInicio').css('color','black');
	$('#modalGeneral #genePoliza #nif').removeClass("border border-danger");	
	$('#modalGeneral #genePoliza #etiquetaNIF').html('NIF');	
	$('#modalGeneral #genePoliza #etiquetaNIF').css('color','black');
	$('#modalGeneral #genePoliza #finPol').removeClass("border border-danger");	
	$('#modalGeneral #genePoliza #etiquetaFechaFin').html('Fecha Fin');	
	$('#modalGeneral #genePoliza #etiquetaFechaFin').css('color','black');
	$("#modalGeneral #genePoliza #inicioPol").datepicker('option', 'maxDate', null);
	$("#modalGeneral #genePoliza #finPol").datepicker('option', 'minDate', null);
}

function crearPolizaGeneral() {
	if(validaCamposPolizaGeneral()){
		$.ajax({
			    type: 'POST',
			    url: './crearPoliza',
			    data: $('#modalGeneral #genePoliza').serialize() ,
			    success: function (data) {
					tablaPoliza.ajax.reload();
					tablaPolizaVehi.ajax.reload();
					$("#alertaPolizaGeneralOK").fadeIn(1500);
					setTimeout(function() {$("#alertaPolizaGeneralOK").fadeOut(1500);},3000);		
	    			clearModalGenPoliza();		
	    		},
				error: function( jqXHR, textStatus, errorThrown ) {
					$("#alertaPolizaGeneralKO").fadeIn(1500);
					setTimeout(function() {$("#alertaPolizaGeneralKO").fadeOut(1500);},3000);
				}
			});
	}
}

function validaCamposPolizaGeneral() {
	var res = true;
	if($('#modalGeneral #genePoliza #matriculaPoli').val() == "") {
		$('#modalGeneral #genePoliza #matriculaPoli').addClass("border border-danger");
		$('#modalGeneral #genePoliza #lblMatriculaPoli').html('Matrícula (*) Campo Obligatorio');	
		$('#modalGeneral #genePoliza #lblMatriculaPoli').css('color','red');
		res = false;
	}
	
	if($('#modalGeneral #genePoliza #fkCompania').val() == "") {
		$('#modalGeneral #genePoliza #fkCompania').addClass("border border-danger");
		$('#modalGeneral #genePoliza #etiquetaCompania').html('Compañia (*) Campo Obligatorio');	
		$('#modalGeneral #genePoliza #etiquetaCompania').css('color','red');
		res = false;
	}
	
	if($('#modalGeneral #genePoliza #numeroPoliza').val() == "") {
		$('#modalGeneral #genePoliza #numeroPoliza').addClass("border border-danger");
		$('#modalGeneral #genePoliza #etiquetaPoliza').html('Nº Póliza (*) Campo Obligatorio');	
		$('#modalGeneral #genePoliza #etiquetaPoliza').css('color','red');
		res = false;
	}
	
	var fechaIni = $('#modalGeneral #genePoliza #inicioPol').val();
	var fechaFin = $('#modalGeneral #genePoliza #finPol').val();
	var fechaIniTmp = $('#modalGeneral #genePoliza #inicioPol').val();
	var fechaFinTmp = $('#modalGeneral #genePoliza #finPol').val();
	
	if(fechaIni == "") {
		$('#modalGeneral #genePoliza #inicioPol').addClass("border border-danger");
		$('#modalGeneral #genePoliza #etiquetaFechaInicio').html('Fecha Inicio (*) Campo Obligatorio');	
		$('#modalGeneral #genePoliza #etiquetaFechaInicio').css('color','red');
		res = false;
	}else{
		if(validarFormatoFecha(fechaIni)){
			if(!existeFecha(fechaIni)){
				$('#modalGeneral #genePoliza #inicioPol').addClass("border border-danger");	
				$('#modalGeneral #genePoliza #etiquetaFechaInicio').html('Fecha Inicio (*), la fecha indicada no es valida');	
				$('#modalGeneral #genePoliza #etiquetaFechaInicio').css('color','red');
				res = false;
			}
		}else{
			$('#modalGeneral #genePoliza #inicioPol').addClass("border border-danger");	
			$('#modalGeneral #genePoliza #etiquetaFechaInicio').html('Fecha Inicio (*), la fecha indicada no tiene el formato correcto (dd/mm/yyyy)');	
			$('#modalGeneral #genePoliza #etiquetaFechaInicio').css('color','red');
			res = false;
		}
	}

	if(!(fechaIni) == "" && !(fechaFin) == "") {
		// COMPROBAMOS SI FECHAINI CONTIENE "/" EN CUYO CASO LO TRANSFORMAMOS AL FORMATO YYYY-MM-DD
		if(fechaIni.includes("/")){
		    fechaIniTmp = transformarFormatoFechaCorrecto(fechaIni);
		}
		// COMPROBAMOS SI FECHAFIN CONTIENE "/" EN CUYO CASO LO TRANSFORMAMOS AL FORMATO YYYY-MM-DD
		if(fechaFin.includes("/")){
		    fechaFinTmp = transformarFormatoFechaCorrecto(fechaFin);
		}
		if(!ValidateDate(fechaIniTmp, fechaFinTmp)){
			$('#modalGeneral #genePoliza #finPol').addClass("border border-danger");	
			$('#modalGeneral #genePoliza #etiquetaFechaFin').html('Fecha Fin, la fecha fin no puede ser anterior a la fecha inicio');	
			$('#modalGeneral #genePoliza #etiquetaFechaFin').css('color','red');
			res = false;
		}
	}
	
	if($('#modalGeneral #genePoliza #nif').val() != "") {
		if(ValidateNIF($('#modalGeneral #genePoliza #nif').val()) == false) {
			$('#modalGeneral #genePoliza #nif').addClass("border border-danger");
			$('#modalGeneral #genePoliza #etiquetaNIF').html('NIF, Introduce un NIF válido');	
			$('#modalGeneral #genePoliza #etiquetaNIF').css('color','red');
			res = false;
		}
	}
	
	// VALIDAMOS LAS FECHAS POR SI NO TIENEN EL FORMATO CORRECTO O NO SON VALIDAS
	if(validarFormatoFecha(fechaFin)){
		if(!existeFecha(fechaFin)){
			$('#modalGeneral #genePoliza #finPol').addClass("border border-danger");	
			$('#modalGeneral #genePoliza #etiquetaFechaFin').html('Fecha Fin, la fecha indicada no es valida');	
			$('#modalGeneral #genePoliza #etiquetaFechaFin').css('color','red');
			res = false;
		}
	}else{
		$('#modalGeneral #genePoliza #finPol').addClass("border border-danger");	
		$('#modalGeneral #genePoliza #etiquetaFechaFin').html('Fecha Fin, la fecha indicada no tiene el formato correcto (dd/mm/yyyy)');	
		$('#modalGeneral #genePoliza #etiquetaFechaFin').css('color','red');
		res = false;
	}
	
	return res;
}

function editarPolizaGeneral(id, idVehiculo, idMatricula, idCompania, nif, numeroPoliza, direccion, fechaInicio, fechaFin, telefono, contacto, observaciones){
	$('#modalGeneral #genePoliza #matriculaPoli').val(idMatricula);
	$('#modalGeneral #genePoliza #fkCompania').val(idCompania);
	$('#modalGeneral #genePoliza #numeroPoliza').val(numeroPoliza);
	$('#modalGeneral #genePoliza #inicioPol').val(fechaInicio?fechaInicio.split('-').reverse().join('/'):'');
	$('#modalGeneral #genePoliza #finPol').val(fechaFin?fechaFin.split('-').reverse().join('/'):'');
	
	$('#modalGeneral #genePoliza #nif').val(nif);
	$('#modalGeneral #genePoliza #direccion').val(direccion);
	$('#modalGeneral #genePoliza #telefono').val(telefono);
	$('#modalGeneral #genePoliza #contacto').val(contacto);
	$('#modalGeneral #genePoliza #observacionesPoliza').val(observaciones);
	$('#modalGeneral #genePoliza #idPolizaActualiza').val(id);
	resetModalPolizaGeneral();
  // DATEPICKER
	$('#modalGeneral #genePoliza #finPol').datepicker('option', 'minDate', fechaInicio.split('-').reverse().join('/'));
	if(fechaFin){
		$('#modalGeneral #genePoliza #inicioPol').datepicker('option', 'maxDate', fechaFin.split('-').reverse().join('/'));
	}
}

function modalEliminarPolizaGeneral(id) {
	$('#modalEliminarPolizaGeneral #idModalEliminarPolizaGeneral').text('Eliminar Poliza');
	$('#modalEliminarPolizaGeneral #idPolizaEliminarGeneral').val(id);
	$('#modalEliminarPolizaGeneral').modal('show');
}

function eliminarPolizaGeneral() {
	$.ajax({
		    type: 'POST',
		    url: './eliminarPoliza',
		    data: $('#modalEliminarPolizaGeneral #eliminarPolizaGeneral').serialize() ,
		    success: function (data) {
		    	deshabilitarDatosPoliza();
		    	$('#modalEliminarPolizaGeneral').modal('hide');
				tablaPoliza.ajax.reload();
				tablaPolizaVehi.ajax.reload();
				$("#alertaEliminarPolizaGeneralOK").fadeIn(1500);
				setTimeout(function() {$("#alertaEliminarPolizaGeneralOK").fadeOut(1500);},3000);
				clearModalGenPoliza();
    		},
			 error: function( jqXHR, textStatus, errorThrown ) {
			 	$('#modalEliminarPolizaGeneral').modal('hide');
				$("#alertaEliminarPolizaGeneralKO").fadeIn(1500);
				setTimeout(function() {$("#alertaEliminarPolizaGeneralKO").fadeOut(1500);},3000);
			 }
		});
}

$("#modalGeneral #genePoliza #matriculaPoli").change(function() {
	$('#modalGeneral #genePoliza #matriculaPoli').removeClass("border border-danger");
	$('#modalGeneral #genePoliza #lblMatriculaPoli').html('Matrícula (*)');	
	$('#modalGeneral #genePoliza #lblMatriculaPoli').css('color','black');
});

$("#modalGeneral #genePoliza #fkCompania").change(function() {
	$('#modalGeneral #genePoliza #fkCompania').removeClass("border border-danger");
	$('#modalGeneral #genePoliza #etiquetaCompania').html('Compañia (*)');	
	$('#modalGeneral #genePoliza #etiquetaCompania').css('color','black');
});

$('#modalGeneral #genePoliza #numeroPoliza').keydown(function(event){
	$('#modalGeneral #genePoliza #numeroPoliza').removeClass("border border-danger");
	$('#modalGeneral #genePoliza #etiquetaPoliza').html('Nº Póliza (*)');	
	$('#modalGeneral #genePoliza #etiquetaPoliza').css('color','black');
});

$("#modalGeneral #genePoliza #finPol").change(function() {
	$('#modalGeneral #genePoliza #finPol').removeClass("border border-danger");
	$('#modalGeneral #genePoliza #etiquetaFechaFin').html('Fecha Fin');
	$('#modalGeneral #genePoliza #etiquetaFechaFin').css('color','black');
});

// SE DEJA ESTA PRUEBA POR SI SE QUIERE DETECTAR CUANDO CAMBIE UN VALOR DEL INPUT
/***$("#modalGeneral #genePoliza #finPol").on('input',function(e){
    alert('Changed!');
});***/

$('#modalGeneral #genePoliza #nif').keydown(function(event){
	$('#modalGeneral #genePoliza #nif').removeClass("border border-danger");
	$('#modalGeneral #genePoliza #etiquetaNIF').html('NIF');	
	$('#modalGeneral #genePoliza #etiquetaNIF').css('color','black');
});

function cerrarEliminarPolizaGeneral(){
	$('#modalEliminarPolizaGeneral').modal('hide');
}
/*** FIN POLIZA ***/

/*** INICIO DOCUMENTO POLIZA ***/
function habilitarEdicionPolizaDocumento() {
	if (permisoDeAccesoPoliza != "VISUALIZADOR") {
		$('#modalPolizaDocumentoGeneral #nuevaPolizaDocumentoGeneral input').prop('disabled', false);
		$('#modalPolizaDocumentoGeneral #nuevaPolizaDocumentoGeneral select').prop('disabled', false);
		$('#modalPolizaDocumentoGeneral #nuevaPolizaDocumentoGeneral textarea').prop('disabled',false);
		$('#modalPolizaDocumentoGeneral #guardarPolizaDocumento').removeClass('btn-light');
		$('#modalPolizaDocumentoGeneral #guardarPolizaDocumento').prop('disabled',false);
		$('#modalPolizaDocumentoGeneral #limpiaPolizaDocumento').removeClass('btn-light');
		$('#modalPolizaDocumentoGeneral #limpiaPolizaDocumento').prop('disabled',false);
	}else{
		$('#modalPolizaDocumentoGeneral #nuevaPolizaDocumentoGeneral input').prop('disabled', true);
		$('#modalPolizaDocumentoGeneral #nuevaPolizaDocumentoGeneral select').prop('disabled', true);
		$('#modalPolizaDocumentoGeneral #nuevaPolizaDocumentoGeneral textarea').prop('disabled',true);
		$('#modalPolizaDocumentoGeneral #guardarPolizaDocumento').addClass('btn-light');
		$('#modalPolizaDocumentoGeneral #guardarPolizaDocumento').prop('disabled',true);
		$('#modalPolizaDocumentoGeneral #limpiaPolizaDocumento').addClass('btn-light');
		$('#modalPolizaDocumentoGeneral #limpiaPolizaDocumento').prop('disabled',true);
	}
}

function nuevaPolizaDocumentoGeneral(id) {
	$('#modalGeneral').modal('hide');
	$('#modalPolizaDocumentoGeneral #idPolizaDocumentoGeneral').val(id);
	$('#modalPolizaDocumentoGeneral').modal({
		keyboard: false,
		backdrop: 'static'
	});
	habilitarEdicionPolizaDocumento();
	tablaPolizaDocumento = $('#modalPolizaDocumentoGeneral #tablaPolizaDocumentoGeneral').DataTable({
	   destroy: true,
	   ajax : {
			url: './tablaPolizaDocumento',
			data : {"idPoliza" : id},
			dataSrc: ''
	   },
	   columnDefs: [
	            {
	                "targets": [0],
	                "visible": false
	            }
	        ],
	   columns : [
	   		{
	   			title: 'id',
	   			data:'id',
	   		},
	   		{
	   			title: 'Nombre',
	   			data:'nombre'
	   		},
	   		{
	   			title: 'Comentarios',
	   			data:'comentarios'
	   		},
            {
				title: 'Acciones',
	            render: function (data, type, row) {
					var eliminarDocPoliza = '';
					var visuaoeditDocPoliza = '<button type="button" id="ButtonDescargarDocumentoPolizaGeneral" class="editar edit-modal btn btn-success"  data-toggle="tooltip" data-placement="bottom" title="Descargar" onclick="descargarDocumentoPoliza(\''+row.nombre+'\','+row.id+')"><span class="fa fa-file-alt"></span></button>';
					if (permisoDeAccesoPoliza != "VISUALIZADOR") {
						eliminarDocPoliza = '<button type="button" id="ButtonEliminarDocumentoPolizaGeneral" class="editar edit-modal btn btn-success" onclick="modalEliminarDocumentoPolizaGeneral('+row.id+')"><i class="fa fa-trash"></i></button>';
					}else{
						eliminarDocPoliza = '<button type="button" id="ButtonEliminarDocumentoPolizaGeneral" class="editar edit-modal btn btn-light" disabled="true" onclick="modalEliminarDocumentoPolizaGeneral('+row.id+')"><i class="fa fa-trash"></i></button>';
					}
					return visuaoeditDocPoliza + '&nbsp;' + eliminarDocPoliza;
	            }
	   		}],
	});
}

function modalEliminarDocumentoPolizaGeneral(id) {
	$('#modalEliminarDocumentoPolizaGeneral #idModalEliminarDocumentoPolizaGeneral').text('Eliminar Documento Poliza');
	$('#modalEliminarDocumentoPolizaGeneral #eliminarDocumentoPolizaGeneral #idDocumentoPolizaEliminarGeneral').val(id);
	$('#modalPolizaDocumentoGeneral').modal('hide');
	$('#modalEliminarDocumentoPolizaGeneral').modal('show');
}

function cerrarEliminarPolizaDocumentoGeneral(){
	$('#modalEliminarDocumentoPolizaGeneral').modal('hide');
	$('#modalPolizaDocumentoGeneral').modal('show');
}

function eliminarDocumentoPolizaGeneral() {
	$.ajax({
		    type: 'POST',
		    url: './eliminarDocumentoPoliza',
		    data: $('#modalEliminarDocumentoPolizaGeneral #eliminarDocumentoPolizaGeneral').serialize() ,
		    success: function (data) {
		    	$('#modalEliminarDocumentoPolizaGeneral').modal('hide');
		    	$('#modalPolizaDocumentoGeneral').modal('show');
		    	tablaPolizaDocumento.ajax.reload();
		    	clearModalGenPolizaDocumento();
				$("#alertaEliminarPolizaDocumentoGeneralOK").fadeIn(1500);
				setTimeout(function() {$("#alertaEliminarPolizaDocumentoGeneralOK").fadeOut(1500);},3000);		
    		},
			 error: function( jqXHR, textStatus, errorThrown ) {
			 	$('#modalEliminarDocumentoPolizaGeneral').modal('hide');
			 	$('#modalPolizaDocumentoGeneral').modal('show');
				$("#alertaEliminarPolizaDocumentoGeneralKO").fadeIn(1500);
				setTimeout(function() {$("#alertaEliminarPolizaDocumentoGeneralKO").fadeOut(1500);},3000);
			 }
		});
}

function clearModalGenPolizaDocumento() {
	$('#modalPolizaDocumentoGeneral').find('form')[0].reset();
	$('#modalPolizaDocumentoGeneral #ficheroPolizaGeneral').removeClass("border border-danger");
	$('#modalPolizaDocumentoGeneral #lblFicheroPolizaGeneral').html('Adjunto (*)');	
	$('#modalPolizaDocumentoGeneral #lblFicheroPolizaGeneral').css('color','black');
}

function guardarDocumentoPolizaGeneral() {
	if(validaCamposDocumentoPolizaGeneral()){
		var formData = new FormData();
		var files = document.getElementById('ficheroPolizaGeneral').files;
		formData.append('fkPoliza.id', $('#modalPolizaDocumentoGeneral #nuevaPolizaDocumentoGeneral #idPolizaDocumentoGeneral').val());
		formData.append('fichero', files[0]);
		formData.append('nombre', files[0].name);
		formData.append('mime', files[0].type);
		formData.append('comentarios', $('#modalPolizaDocumentoGeneral #nuevaPolizaDocumentoGeneral #observacionesPolizaDocumentoGeneral').val());
		$.ajax({
			    type: 'POST',
			    cache: false,
	    		contentType: false,
	    		processData: false,
			    url: './guardarDocumentoPoliza',
			    data: formData,
			    success: function (data) {
			    	clearModalGenPolizaDocumento();
			    	tablaPolizaDocumento.ajax.reload();
					$("#alertaPolizaDocumentoGeneralOK").fadeIn(1500);
					setTimeout(function() {$("#alertaPolizaDocumentoGeneralOK").fadeOut(1500);},3000);		
	    		},
				error: function( jqXHR, textStatus, errorThrown ) {
					$("#alertaPolizaDocumentoGeneralKO").fadeIn(1500);
					setTimeout(function() {$("#alertaPolizaDocumentoGeneralKO").fadeOut(1500);},3000);
				}
			});
	}
}

function validaCamposDocumentoPolizaGeneral() {
	if($('#modalPolizaDocumentoGeneral #ficheroPolizaGeneral').val() == "") {
		$('#modalPolizaDocumentoGeneral #ficheroPolizaGeneral').addClass("border border-danger");
		$('#modalPolizaDocumentoGeneral #lblFicheroPolizaGeneral').html('Adjunto (*)');	
		$('#modalPolizaDocumentoGeneral #lblFicheroPolizaGeneral').css('color','red');
		return false;
	} else{
		return true;
	}
}

$("#modalPolizaDocumentoGeneral #ficheroPolizaGeneral").change(function() {
	$('#modalPolizaDocumentoGeneral #ficheroPolizaGeneral').removeClass("border border-danger");
	$('#modalPolizaDocumentoGeneral #lblFicheroPolizaGeneral').html('Adjunto (*)');	
	$('#modalPolizaDocumentoGeneral #lblFicheroPolizaGeneral').css('color','black');
});

function cerrarPolizaDocumentoGeneral(){
	clearModalGenPolizaDocumento();
	$('#modalPolizaDocumentoGeneral').modal('hide');
	$('#modalGeneral').modal('show');
}
/*** FIN DOCUMENTO POLIZA ***/

/*** INICIO ITV ***/
function Botones_Itv(){
	if($('#modalGeneral #formuEstadoGeneralVehi #estadoGeneralVehi').val() == "ALTA" && $('#modalGeneral #habilitarEdicionItv').prop('disabled')==true)
	{
		$('#modalGeneral #tablaItv #ButtonEditarItv').removeClass('btn-light');
		$('#modalGeneral #tablaItv #ButtonEditarItv').addClass('btn-success');
		$('#modalGeneral #tablaItv #ButtonEditarItv').prop('disabled',false);
		if (permisoDeAccesoItv != "VISUALIZADOR") {
			$('#modalGeneral #tablaItv #ButtonEliminarItv').removeClass('btn-light');
			$('#modalGeneral #tablaItv #ButtonEliminarItv').addClass('btn-success');
			$('#modalGeneral #tablaItv #ButtonEliminarItv').prop('disabled',false);
		}
		$('#modalGeneral #tablaItv #ButtonAnadirDocumentoItv').removeClass('btn-light');
		$('#modalGeneral #tablaItv #ButtonAnadirDocumentoItv').addClass('btn-success');
		$('#modalGeneral #tablaItv #ButtonAnadirDocumentoItv').prop('disabled',false);
	}else{
		$('#modalGeneral #tablaItv #ButtonEditarItv').removeClass('btn-success');
		$('#modalGeneral #tablaItv #ButtonEditarItv').addClass('btn-light');
		$('#modalGeneral #tablaItv #ButtonEditarItv').prop('disabled',true);
		$('#modalGeneral #tablaItv #ButtonEliminarItv').removeClass('btn-success');
		$('#modalGeneral #tablaItv #ButtonEliminarItv').addClass('btn-light');
		$('#modalGeneral #tablaItv #ButtonEliminarItv').prop('disabled',true);
		$('#modalGeneral #tablaItv #ButtonAnadirDocumentoItv').removeClass('btn-success');
		$('#modalGeneral #tablaItv #ButtonAnadirDocumentoItv').addClass('btn-light');
		$('#modalGeneral #tablaItv #ButtonAnadirDocumentoItv').prop('disabled',true);
	}
}

function deshabilitarDatosItv(){
	$('#modalGeneral #geneItv input').prop('disabled',true);
	$('#modalGeneral #geneItv textarea').prop('disabled',true);
	$('#modalGeneral #geneItv select').prop('disabled',true);
	$('#modalGeneral #guardaItv').addClass('btn-light');
	$('#modalGeneral #guardaItv').prop('disabled',true);
	$('#modalGeneral #limpiaItv').addClass('btn-light');
	$('#modalGeneral #limpiaItv').prop('disabled',true);
	$('#modalGeneral #habilitarEdicionItv').removeClass('btn-light');
	$('#modalGeneral #habilitarEdicionItv').prop('disabled',false);
}

function habilitarEdicionItv() {
	if(permisoDeAccesoItv=="EDITOR" || permisoDeAccesoItv=="ADMINISTRADOR"){
		$('#modalGeneral #geneItv input').prop('disabled', false);
		$('#modalGeneral #geneItv textarea').prop('disabled',false);
		$('#modalGeneral #geneItv select').prop('disabled', false);
		$('#modalGeneral #guardaItv').removeClass('btn-light');
		$('#modalGeneral #guardaItv').prop('disabled',false);
		$('#modalGeneral #limpiaItv').removeClass('btn-light');
		$('#modalGeneral #limpiaItv').prop('disabled',false);
	}
	$('#modalGeneral #habilitarEdicionItv').addClass('btn-light');
	$('#modalGeneral #habilitarEdicionItv').prop('disabled',true);
	// LLAMAMOS A LA FUNCION PARA RELLENAR EL LISTADO DE MATRICULAS DEL VEHICULO
	recargarMatriculas($('#modalGeneral #geneVehiculo #idVehiculoActualiza').val(),"geneItv","matriculaItv");
	// SE COMPRUEBA SI ESTA DE BAJA EL VEHICULO PARA HABILITAR BOTONES DE ITV O NO
	Botones_Itv();
}

//ESTA FUNCION OBTIENE EL ID DEL VEHICULO
function obtenerDatosItv(id) {
	clearModalGenItv();
	$('#modalGeneral #geneItv #idVehiculoItv').val(id);
	
	tablaItv = $('#modalGeneral #tablaItv').DataTable({
	   "order": [[ 0, "desc" ]],
	   destroy: true,
	   ajax : {
			url: './tablaItv',
			data : {"idVehiculoItv" : id},
			dataSrc: ''
	   },
	   columnDefs: [
	            {
	                "targets": [0],
	                "visible": false
	            },
	            {
	                "targets":2,
	                "type":"date-eu"
	            },
	            {
	                "targets":3,
	                "type":"date-eu"
	            }
	        ],
	   columns : [
	   		{
	   			title: 'id',
	   			data:'id',
	   		},
	   		{
	   			title: 'Matr&iacute;cula',
	   			data: 'fkMatricula.nombre', 
	   		},
	   		{
				title: 'Fecha Realizaci&oacute;n',
				data: 'fechaItv',
				render:  function (data) {
					return moment(data).format('DD/MM/YYYY');
				}
	   		},
	   		{
				title: 'Pr&oacute;xima Fecha Realizaci&oacute;n',
				data: 'fechaSiguienteItv',
				render:  function (data) {
					return moment(data).format('DD/MM/YYYY');
				}
	   		},	   		
	   		{
	   			title: 'Superada',
  				render: function (data, type, row) {
    				return row.itvSuperada ? 'SI' : 'NO';
				}	   			
	   		},
	   		{
	            title: 'Leves',
  				render: function (data, type, row) {
    				return row.leves ? 'SI' : 'NO';
				}	   		
	   		},
	   		{
	   			title: 'Observaciones',
	   			data:'observaciones'
	   		},
	   		{
				title: 'Acciones',
	            render: function (data, type, row) {
					var eliminarItv = '<button type="button" id="ButtonEliminarItv" class="editar edit-modal btn" onclick="modalEliminarItvGeneral('+row.id+')" disabled="true"><i class="fa fa-trash"></i></button>';
					var visuaoeditItv = '';
					if (permisoDeAccesoItv != "VISUALIZADOR") {
						visuaoeditItv = '<button type="button" id="ButtonEditarItv" class="editar edit-modal btn" disabled="true" onclick="editarItvGeneral('+row.id+')" disabled="true"><span class="fa fa-edit"></span></button>';
					}else{
						visuaoeditItv = '<button type="button" id="ButtonEditarItv" class="editar edit-modal btn" disabled="true" onclick="editarItvGeneral('+row.id+')" disabled="true"><span class="fa fa-eye"></span></button>';
					}
					return visuaoeditItv + '&nbsp;' + eliminarItv;
	       		}
			},
			{		
					title: 'Gesti&oacute;n',
					render: function (data, type, row) {
	       		   			return '<button type="button" id="ButtonAnadirDocumentoItv" class="editar edit-modal btn"  data-toggle="tooltip" data-placement="bottom" title="Gestión documento Itv" onclick="nuevoItvDocumentoGeneral('+row.id+')" disabled="true"><span class="fa fa-file-alt"></span></button>';	
	       		   }
	        }],
	});
}

$('#tablaItv').on( 'draw.dt', function () {
    Botones_Itv();
} );

function mostrarAvisoItv() {
  objetoItv.classList.remove("d-none");
}

function clearModalGenItv(nombre) {
	$('#modalGeneral #formuGenItv').find('form')[0].reset();
	$('#modalGeneral #geneItv #idItvActualiza').val(null);
	if(nombre!="limpiaItv"){
		deshabilitarDatosItv();
		resetModalItvGeneral();
	}else{
		habilitarEdicionItv();
	}
}

function resetModalItvGeneral() {
	$('#modalGeneral #geneItv #matriculaItv').removeClass("border border-danger");
	$('#modalGeneral #geneItv #lblMatriculaItv').html('Matr&iacute;cula (*)');	
	$('#modalGeneral #geneItv #lblMatriculaItv').css('color','black');
	$('#modalGeneral #geneItv #fechaItv').removeClass("border border-danger");
	$('#modalGeneral #geneItv #lblFechaItv').html('Fecha Realizaci&oacute;n (*)');	
	$('#modalGeneral #geneItv #lblFechaItv').css('color','black');
	$('#modalGeneral #geneItv #fechaSiguienteItv').removeClass("border border-danger");
	$('#modalGeneral #geneItv #lblFechaSiguienteItv').html('Pr&oacute;xima Fecha Realizaci&oacute;n (*)');	
	$('#modalGeneral #geneItv #lblFechaSiguienteItv').css('color','black');
}

function crearItvGeneral() {
	if(validaCamposItvGeneral()){
		$.ajax({
			    type: 'POST',
			    url: './crearItv',
			    data: $('#modalGeneral #geneItv').serialize() ,
			    success: function (data) {
					tablaItv.ajax.reload();
					$("#modalGeneral #alertaGeneralItvOK").fadeIn(1500);
					setTimeout(function() {$("#modalGeneral #alertaGeneralItvOK").fadeOut(1500);},3000);	
					clearModalGenItv();		    		
	    		},
				error: function( jqXHR, textStatus, errorThrown ) {
					$("#modalGeneral #alertaGeneralItvKO").fadeIn(1500);
					setTimeout(function() {$("#modalGeneral #alertaGeneralItvKO").fadeOut(1500);},3000);
				}
			});
	}
}

function validaCamposItvGeneral() {
	var res = true;
	if($('#modalGeneral #geneItv #matriculaItv').val() == "") {
		$('#modalGeneral #geneItv #matriculaItv').addClass("border border-danger");
		$('#modalGeneral #geneItv #lblMatriculaItv').html('Matrícula (*) Campo Obligatorio');	
		$('#modalGeneral #geneItv #lblMatriculaItv').css('color','red');
		res = false;
	}
	if($('#modalGeneral #geneItv #fechaSiguienteItv').val() == "") {
		$('#modalGeneral #geneItv #fechaSiguienteItv').addClass("border border-danger");	
		$('#modalGeneral #geneItv #lblFechaSiguienteItv').html('Pr&oacute;xima Fecha Realizaci&oacute;n (*) Campo Obligatorio');	
		$('#modalGeneral #geneItv #lblFechaSiguienteItv').css('color','red');
		res = false;
	}	
	if($('#modalGeneral #geneItv #fechaItv').val() == "") {
		$('#modalGeneral #geneItv #fechaItv').addClass("border border-danger");	
		$('#modalGeneral #geneItv #lblFechaItv').html('Fecha Realizaci&oacute;n (*) Campo Obligatorio');	
		$('#modalGeneral #geneItv #lblFechaItv').css('color','red');
		res = false;
	}
	if(!($('#modalGeneral #geneItv #fechaItv').val()) == "" && !($('#modalGeneral #geneItv #fechaSiguienteItv').val()) == "") {
		if(ValidateDate($('#modalGeneral #geneItv #fechaItv').val(), $('#modalGeneral #geneItv #fechaSiguienteItv').val()) == false){
			$('#modalGeneral #geneItv #fechaSiguienteItv').addClass("border border-danger");	
			$('#modalGeneral #geneItv #lblFechaSiguienteItv').html('Pr&oacute;xima Fecha Realizaci&oacute;n, la pr&oacute;xima fecha realizaci&oacute;n no puede ser anterior a la fecha realizaci&oacute;n');	
			$('#modalGeneral #geneItv #lblFechaSiguienteItv').css('color','red');
			res = false;
		}
	}
	return res;
}

function editarItvGeneral (id) {
	$.ajax({
		data: { id : id },
		url: './obtenerItv',
		type : 'POST',
		dataType: 'json',
		success: function(data)
		{
			$('#modalGeneral #geneItv #matriculaItv').val(data.fkMatricula.id);
			if(data.fechaItv != null){
				$('#modalGeneral #geneItv #fechaItv').val(data.fechaItv);
			}	
			if(data.fechaSiguienteItv != null){
				$('#modalGeneral #geneItv #fechaSiguienteItv').val(data.fechaSiguienteItv);
			}
			if(data.itvSuperada != null){
				if(data.itvSuperada == true){
					$('#modalGeneral #geneItv #itvSuperada').prop("checked", true);
				}else{
					$('#modalGeneral #geneItv #itvSuperada').prop("checked", false);
				}
			}
			if(permisoDeAccesoItv=="EDITOR" || permisoDeAccesoItv=="ADMINISTRADOR"){
				$('#modalGeneral #geneItv #itvSuperada').prop('disabled', false);
			}else{
				$('#modalGeneral #geneItv #itvSuperada').prop('disabled', true);
			}
			if(data.leves == true){
				$('#modalGeneral #geneItv #leves').prop("checked", true);
			}else{
				$('#modalGeneral #geneItv #leves').prop("checked", false);
			}
			if(permisoDeAccesoItv=="EDITOR" || permisoDeAccesoItv=="ADMINISTRADOR"){
				$('#modalGeneral #geneItv #leves').prop('disabled', false);
			}else{
				$('#modalGeneral #geneItv #leves').prop('disabled', true);
			}
			$('#modalGeneral #geneItv #observacionesItv').val(data.observaciones);
			$('#modalGeneral #geneItv #idItvActualiza').val(data.id);
			resetModalItvGeneral();
		},
	});
}

function modalEliminarItvGeneral(id) {
	$('#modalEliminarItvGeneral #idModalEliminarItvGeneral').text('Eliminar Itv');
	$('#modalEliminarItvGeneral #idItvEliminarGeneral').val(id);
	$('#modalEliminarItvGeneral').modal('show');
}

function eliminarItvGeneral() {
	$.ajax({
		    type: 'POST',
		    url: './eliminarItv',
		    data: $('#modalEliminarItvGeneral #eliminarItvGeneral').serialize() ,
		    success: function (data) {
		    	deshabilitarDatosItv();
		    	$('#modalEliminarItvGeneral').modal('hide');
				tablaItv.ajax.reload();
				$("#alertaEliminarItvGeneralOK").fadeIn(1500);
				setTimeout(function() {$("#alertaEliminarItvGeneralOK").fadeOut(1500);},3000);	
				clearModalGenItv();
    		},
			 error: function( jqXHR, textStatus, errorThrown ) {
				$('#modalEliminarItvGeneral').modal('hide');
				$("#alertaEliminarItvGeneralKO").fadeIn(1500);
				setTimeout(function() {$("#alertaEliminarItvGeneralKO").fadeOut(1500);},3000);
			 }
		});
}

$("#modalGeneral #geneItv #matriculaItv").change(function() {
	$('#modalGeneral #geneItv #matriculaItv').removeClass("border border-danger");
	$('#modalGeneral #geneItv #lblMatriculaItv').html('Matrícula (*)');	
	$('#modalGeneral #geneItv #lblMatriculaItv').css('color','black');
});

$("#fechaItv").change(function() {
	$('#modalGeneral #geneItv #fechaItv').removeClass("border border-danger");	
	$('#modalGeneral #geneItv #lblFechaItv').html('Fecha Realizaci&oacute;n (*)');	
	$('#modalGeneral #geneItv #lblFechaItv').css('color','black');
});

$("#fechaSiguienteItv").change(function() {
	$('#modalGeneral #geneItv #fechaSiguienteItv').removeClass("border border-danger");	
	$('#modalGeneral #geneItv #lblFechaSiguienteItv').html('Pr&oacute;xima Fecha Realizaci&oacute;n (*) ');	
	$('#modalGeneral #geneItv #lblFechaSiguienteItv').css('color','black');
});

function cerrarEliminarItvGeneral(){
	$('#modalEliminarItvGeneral').modal('hide');
}
/*** FIN ITV ***/

/**	INICIO DOCUMENTO ITV */
function habilitarEdicionItvDocumento() {
	if (permisoDeAccesoItv != "VISUALIZADOR") {
		$('#modalItvDocumentoGeneral #nuevoItvDocumentoGeneral input').prop('disabled', false);
		$('#modalItvDocumentoGeneral #nuevoItvDocumentoGeneral textarea').prop('disabled',false);
		$('#modalItvDocumentoGeneral #guardarItvDocumento').removeClass('btn-light');
		$('#modalItvDocumentoGeneral #guardarItvDocumento').prop('disabled',false);
		$('#modalItvDocumentoGeneral #limpiaItvDocumento').removeClass('btn-light');
		$('#modalItvDocumentoGeneral #limpiaItvDocumento').prop('disabled',false);
	}else{
		$('#modalItvDocumentoGeneral #nuevoItvDocumentoGeneral input').prop('disabled', true);
		$('#modalItvDocumentoGeneral #nuevoItvDocumentoGeneral textarea').prop('disabled',true);
		$('#modalItvDocumentoGeneral #guardarItvDocumento').addClass('btn-light');
		$('#modalItvDocumentoGeneral #guardarItvDocumento').prop('disabled',true);
		$('#modalItvDocumentoGeneral #limpiaItvDocumento').addClass('btn-light');
		$('#modalItvDocumentoGeneral #limpiaItvDocumento').prop('disabled',true);
	}
}

function nuevoItvDocumentoGeneral(id) {
	$('#modalGeneral').modal('hide');
	$('#modalItvDocumentoGeneral #idItvDocumentoGeneral').val(id);
	$('#modalItvDocumentoGeneral').modal({
		keyboard: false,
		backdrop: 'static'
	});
	habilitarEdicionItvDocumento();
	tablaItvDocumento = $('#modalItvDocumentoGeneral #tablaItvDocumentoGeneral').DataTable({
	   destroy: true,
	   ajax : {
			url: './tablaItvDocumento',
			data : {"idItv" : id},
			dataSrc: ''
	   },
	   columnDefs: [
	            {
	                "targets": [0],
	                "visible": false
	            }
	        ],
	   columns : [
	   		{
	   			title: 'id',
	   			data:'id',
	   		},
	   		{
	   			title: 'Nombre',
	   			data:'nombre'
	   		},
	   		{
	   			title: 'Comentarios',
	   			data:'comentarios'
	   		},
            {
				title: 'Acciones',
	            render: function (data, type, row) {
					var eliminarDocItv = '';
					var visuaoeditDocItv = '<button type="button" id="ButtonDescargarDocumentoItvGeneral" class="editar edit-modal btn btn-success"  data-toggle="tooltip" data-placement="bottom" title="Descargar" onclick="descargarDocumentoItv(\''+row.nombre+'\','+row.id+')"><span class="fa fa-file-alt"></span></button>';
					if (permisoDeAccesoItv != "VISUALIZADOR") {
						eliminarDocItv = '<button type="button" id="ButtonEliminarDocumentoItvGeneral" class="editar edit-modal btn btn-success" onclick="modalEliminarDocumentoItvGeneral('+row.id+')"><i class="fa fa-trash"></i></button>';
					}else{
						eliminarDocItv = '<button type="button" id="ButtonEliminarDocumentoItvGeneral" class="editar edit-modal btn btn-light" disabled="true" onclick="modalEliminarDocumentoItvGeneral('+row.id+')"><i class="fa fa-trash"></i></button>';
					}
					return visuaoeditDocItv + '&nbsp;' + eliminarDocItv;
	            }
	   		}],
	});
}

function modalEliminarDocumentoItvGeneral(id) {
	$('#modalEliminarDocumentoItvGeneral #idModalEliminarDocumentoItvGeneral').text('Eliminar Documento Itv');
	$('#modalEliminarDocumentoItvGeneral #eliminarDocumentoItvGeneral #idDocumentoItvEliminarGeneral').val(id);
	$('#modalItvDocumentoGeneral').modal('hide');
	$('#modalEliminarDocumentoItvGeneral').modal('show');
}

function cerrarEliminarItvDocumentoGeneral(){
	$('#modalEliminarDocumentoItvGeneral').modal('hide');
	$('#modalItvDocumentoGeneral').modal('show');
}

function eliminarDocumentoItvGeneral() {
	$.ajax({
		    type: 'POST',
		    url: './eliminarDocumentoItv',
		    data: $('#modalEliminarDocumentoItvGeneral #eliminarDocumentoItvGeneral').serialize() ,
		    success: function (data) {
		    	$('#modalEliminarDocumentoItvGeneral').modal('hide');
		    	$('#modalItvDocumentoGeneral').modal('show');
		    	tablaItvDocumento.ajax.reload();
		    	clearModalGenItvDocumento();
		    	$("#alertaEliminarItvDocumentoGeneralOK").fadeIn(1500);
		    	setTimeout(function() {$("#alertaEliminarItvDocumentoGeneralOK").fadeOut(1500);},3000);		
    		},
			 error: function( jqXHR, textStatus, errorThrown ) {
		    	$('#modalEliminarDocumentoItvGeneral').modal('hide');
		    	$('#modalItvDocumentoGeneral').modal('show');
		    	$("#alertaEliminarItvDocumentoGeneralKO").fadeIn(1500);
		    	setTimeout(function() {$("#alertaEliminarItvDocumentoGeneralKO").fadeOut(1500);},3000);
			 }
		});
}

function clearModalGenItvDocumento() {
	$('#modalItvDocumentoGeneral').find('form')[0].reset();
	$('#modalItvDocumentoGeneral #ficheroItvGeneral').removeClass("border border-danger");
	$('#modalItvDocumentoGeneral #lblFicheroItvGeneral').html('Adjunto (*)');	
	$('#modalItvDocumentoGeneral #lblFicheroItvGeneral').css('color','black');
}

function guardarDocumentoItvGeneral() {
	if(validaCamposDocumentoItvGeneral()){
		var formData = new FormData();
		var files = document.getElementById('ficheroItvGeneral').files;
		formData.append('fkItv.id', $('#modalItvDocumentoGeneral #nuevoItvDocumentoGeneral #idItvDocumentoGeneral').val());
		formData.append('ficheroItv', files[0]);
		formData.append('nombre', files[0].name);
		formData.append('mime', files[0].type);
		formData.append('comentarios', $('#modalItvDocumentoGeneral #nuevoItvDocumentoGeneral #observacionesItvDocumentoGeneral').val());
		$.ajax({
			    type: 'POST',
			    cache: false,
	    		contentType: false,
	    		processData: false,
			    url: './guardarDocumentoItv',
			    data: formData,
			    success: function (data) {
			    	clearModalGenItvDocumento();
			    	tablaItvDocumento.ajax.reload();
			    	$("#alertaItvDocumentoGeneralOK").fadeIn(1500);
			    	setTimeout(function() {$("#alertaItvDocumentoGeneralOK").fadeOut(1500);},3000);		
	    		},
				error: function( jqXHR, textStatus, errorThrown ) {
			    	$("#alertaItvDocumentoGeneralKO").fadeIn(1500);
			    	setTimeout(function() {$("#alertaItvDocumentoGeneralKO").fadeOut(1500);},3000);
				}
			});
	}
}

function validaCamposDocumentoItvGeneral() {
	if($('#modalItvDocumentoGeneral #ficheroItvGeneral').val() == "") {
		$('#modalItvDocumentoGeneral #ficheroItvGeneral').addClass("border border-danger");
		$('#modalItvDocumentoGeneral #lblFicheroSiniestroItvGeneral').html('Adjunto (*)');	
		$('#modalItvDocumentoGeneral #lblFicheroItvGeneral').css('color','red');
		return false;
	} else{
		return true;
	}
}

$("#modalItvDocumentoGeneral #ficheroItvGeneral").change(function() {
	$('#modalItvDocumentoGeneral #ficheroItvGeneral').removeClass("border border-danger");
	$('#modalItvDocumentoGeneral #lblFicheroItvGeneral').html('Adjunto (*)');	
	$('#modalItvDocumentoGeneral #lblFicheroItvGeneral').css('color','black');
});

function cerrarItvDocumentoGeneral(){
	clearModalGenItvDocumento();
	$('#modalItvDocumentoGeneral').modal('hide');
	$('#modalGeneral').modal('show');
}
/** FIN DOCUMENTO ITV */

/*** INICIO INFRACCION ***/
function Botones_Infraccion(){
	if($('#modalGeneral #formuEstadoGeneralVehi #estadoGeneralVehi').val() == "ALTA" && $('#modalGeneral #habilitarEdicionInfraccion').prop('disabled')==true)
	{
		$('#modalGeneral #tablaInfraccion #ButtonEditarInfraccion').removeClass('btn-light');
		$('#modalGeneral #tablaInfraccion #ButtonEditarInfraccion').addClass('btn-success');
		$('#modalGeneral #tablaInfraccion #ButtonEditarInfraccion').prop('disabled',false);
		if (permisoDeAccesoInfraccion != "VISUALIZADOR") {
			$('#modalGeneral #tablaInfraccion #ButtonEliminarInfraccion').removeClass('btn-light');
			$('#modalGeneral #tablaInfraccion #ButtonEliminarInfraccion').addClass('btn-success');
			$('#modalGeneral #tablaInfraccion #ButtonEliminarInfraccion').prop('disabled',false);
		}
		$('#modalGeneral #tablaInfraccion #ButtonAnadirDocumentoInfraccion').removeClass('btn-light');
		$('#modalGeneral #tablaInfraccion #ButtonAnadirDocumentoInfraccion').addClass('btn-success');
		$('#modalGeneral #tablaInfraccion #ButtonAnadirDocumentoInfraccion').prop('disabled',false);
	}else{
		$('#modalGeneral #tablaInfraccion #ButtonEditarInfraccion').removeClass('btn-success');
		$('#modalGeneral #tablaInfraccion #ButtonEditarInfraccion').addClass('btn-light');
		$('#modalGeneral #tablaInfraccion #ButtonEditarInfraccion').prop('disabled',true);
		$('#modalGeneral #tablaInfraccion #ButtonEliminarInfraccion').removeClass('btn-success');
		$('#modalGeneral #tablaInfraccion #ButtonEliminarInfraccion').addClass('btn-light');
		$('#modalGeneral #tablaInfraccion #ButtonEliminarInfraccion').prop('disabled',true);
		$('#modalGeneral #tablaInfraccion #ButtonAnadirDocumentoInfraccion').removeClass('btn-success');
		$('#modalGeneral #tablaInfraccion #ButtonAnadirDocumentoInfraccion').addClass('btn-light');
		$('#modalGeneral #tablaInfraccion #ButtonAnadirDocumentoInfraccion').prop('disabled',true);
	}
}

function deshabilitarDatosInfraccion(){
	$('#modalGeneral #geneInfraccion input').prop('disabled',true);
	$('#modalGeneral #geneInfraccion select').prop('disabled',true);
	$('#modalGeneral #geneInfraccion textarea').prop('disabled',true);
	$('#modalGeneral #guardaInfraccion').addClass('btn-light');
	$('#modalGeneral #guardaInfraccion').prop('disabled',true);
	$('#modalGeneral #limpiaInfraccion').addClass('btn-light');
	$('#modalGeneral #limpiaInfraccion').prop('disabled',true);
	$('#modalGeneral #habilitarEdicionInfraccion').removeClass('btn-light');
	$('#modalGeneral #habilitarEdicionInfraccion').prop('disabled',false);
}

function habilitarEdicionInfraccion() {
	if(permisoDeAccesoInfraccion=="EDITOR" || permisoDeAccesoInfraccion=="ADMINISTRADOR"){
		$('#modalGeneral #geneInfraccion input').prop('disabled', false);
		$('#modalGeneral #geneInfraccion select').prop('disabled', false);
		$('#modalGeneral #geneInfraccion textarea').prop('disabled',false);
		$('#modalGeneral #guardaInfraccion').removeClass('btn-light');
		$('#modalGeneral #guardaInfraccion').prop('disabled',false);
		$('#modalGeneral #limpiaInfraccion').removeClass('btn-light');
		$('#modalGeneral #limpiaInfraccion').prop('disabled',false);
	}
	$('#modalGeneral #habilitarEdicionInfraccion').addClass('btn-light');
	$('#modalGeneral #habilitarEdicionInfraccion').prop('disabled',true);
	// LLAMAMOS A LA FUNCION PARA RELLENAR EL LISTADO DE MATRICULAS DEL VEHICULO
	recargarMatriculas($('#modalGeneral #geneVehiculo #idVehiculoActualiza').val(),"geneInfraccion","matriculaInfr");
	// SE COMPRUEBA SI ESTA DE BAJA EL VEHICULO PARA HABILITAR BOTONES DE INFRACCION O NO
	Botones_Infraccion();
}

//ESTA FUNCION OBTIENE EL ID DEL VEHICULO
function obtenerDatosInfraccion(id) {
	clearModalGenInfraccion();
	$('#modalGeneral #geneInfraccion #idVehiculoInfraccion').val(id);
	
	tablaInfraccion = $('#tablaInfraccion').DataTable({
		"order": [[ 0, "desc" ]],
		destroy: true,
		ajax : {
			url: './tablaInfraccion',
			data : {"idVehiculoInfraccion" : id},
			dataSrc: ''
		},
		columnDefs: [
		            {
		                "targets": [0],
		                "visible": false
		            },
		            {
		                "targets":2,
		                "type":"date-eu"
		            }
		        ],
		  columns : [
		   		{
		   			title: 'id',
		   			data:'id',
		   		},
		   		{
		   			title: 'Matr&iacute;cula',
		   			data: 'fkMatricula.nombre', 
		   		},
		   		{
		   			title: 'Fecha Infracci&oacute;n',
		   			data: 'fechaInfraccion',
		   			render: function (data) {
						return moment(data).format('DD/MM/YYYY');
					}
		   		},
		   		{
		   			title: 'N&uacute;mero Expediente',
		   			data:'nexpediente', 
		   		},
		   		{
		   			title: 'Conductor',
		   			data:'conductor', 
		   		},
	            {
					title: 'Acciones',
		            render: function (data, type, row) {
						var eliminarInfraccion = '<button type="button" id="ButtonEliminarInfraccion" class="editar edit-modal btn" onclick="modalEliminarInfraccionGeneral('+row.id+')" disabled="true"><i class="fa fa-trash"></i></button>';
						var visuaoeditInfraccion = '';
						if (permisoDeAccesoInfraccion != "VISUALIZADOR") {
							visuaoeditInfraccion = '<button type="button" id="ButtonEditarInfraccion" class="editar edit-modal btn" onclick="editarInfraccionGeneral('+row.id+')" disabled="true"><span class="fa fa-edit"></span></button>';
						}else{
							visuaoeditInfraccion = '<button type="button" id="ButtonEditarInfraccion" class="editar edit-modal btn" onclick="editarInfraccionGeneral('+row.id+')" disabled="true"><span class="fa fa-eye"></span></button>';
						}
						return visuaoeditInfraccion + '&nbsp;' + eliminarInfraccion;
		       		  }
		   		},
				{
					   title: 'Gesti&oacute;n',
		               render: function (data, type, row) {
							return '<button type="button" id="ButtonAnadirDocumentoInfraccion" class="editar edit-modal btn"  data-toggle="tooltip" data-placement="bottom" title="Gestión documento Infracción" onclick="nuevaInfraccionDocumentoGeneral('+row.id+')" disabled="true"><span class="fa fa-file-alt"></span></button>';
		               }
				}],
	});
}

$('#tablaInfraccion').on( 'draw.dt', function () {
    Botones_Infraccion();
} );

function mostrarAvisoInfraccion() {
  objetoInfraccion.classList.remove("d-none");
}

function clearModalGenInfraccion(nombre) {
	$('#modalGeneral #formuGenInfra').find('form')[0].reset();
	$('#modalGeneral #geneInfraccion #idInfraccionActualiza').val(null);
	if(nombre!="limpiaInfraccion"){
		deshabilitarDatosInfraccion();
		resetModalInfraccionGeneral();
	}else{
		habilitarEdicionInfraccion();
	}
}

function resetModalInfraccionGeneral() {
	$('#modalGeneral #geneInfraccion #matriculaInfr').removeClass("border border-danger");
	$('#modalGeneral #geneInfraccion #lblMatriculaInfr').html('Matr&iacute;cula (*)');	
	$('#modalGeneral #geneInfraccion #lblMatriculaInfr').css('color','black');
	$('#modalGeneral #geneInfraccion #fechaInfraccion').removeClass("border border-danger");
	$('#modalGeneral #geneInfraccion #lblFechaInfraccion').html('Fecha Infracci&oacute;n (*)');	
	$('#modalGeneral #geneInfraccion #lblFechaInfraccion').css('color','black');
	$('#modalGeneral #geneInfraccion #horaInfraccion').removeClass("border border-danger");
	$('#modalGeneral #geneInfraccion #horaLabel').html('Hora');	
	$('#modalGeneral #geneInfraccion #horaLabel').css('color','black');
	$('#modalGeneral #geneInfraccion #importeInfraccion').removeClass("border border-danger");
	$('#modalGeneral #geneInfraccion #lblImporte').html('Importe');	
	$('#modalGeneral #geneInfraccion #lblImporte').css('color','black');
}

function crearInfraccionGeneral() {
	if(validaCamposInfraccionGeneral()){
		$.ajax({
			    type: 'POST',
			    url: './crearInfraccion',
			    data: $('#modalGeneral #geneInfraccion').serialize() ,
			    success: function (data) {
					tablaInfraccion.ajax.reload();
					$("#alertaInfraccionGeneralOK").fadeIn(1500);
					setTimeout(function() {$("#alertaInfraccionGeneralOK").fadeOut(1500);},3000);		
					clearModalGenInfraccion();	    			
	    		},
				error: function( jqXHR, textStatus, errorThrown ) {
					$("#alertaInfraccionGeneralKO").fadeIn(1500);
					setTimeout(function() {$("#alertaInfraccionGeneralKO").fadeOut(1500);},3000);
				}
			});
	}
}

function validaCamposInfraccionGeneral() {
	var res = true;
	if($('#modalGeneral #geneInfraccion #matriculaInfr').val() == "") {
		$('#modalGeneral #geneInfraccion #matriculaInfr').addClass("border border-danger");
		$('#modalGeneral #geneInfraccion #lblMatriculaInfr').html('Matrícula (*) Campo Obligatorio');	
		$('#modalGeneral #geneInfraccion #lblMatriculaInfr').css('color','red');
		res = false;
	}
	if($('#modalGeneral #geneInfraccion #fechaInfraccion').val() == "") {
		$('#modalGeneral #geneInfraccion #fechaInfraccion').addClass("border border-danger");
		$('#modalGeneral #geneInfraccion #lblFechaInfraccion').html('Fecha Infracci&oacute;n (*) Campo Obligatorio');	
		$('#modalGeneral #geneInfraccion #lblFechaInfraccion').css('color','red');
		res = false;
	}
	if(!($('#modalGeneral #geneInfraccion #horaInfraccion').val()) == "" && ValidateHora($('#modalGeneral #geneInfraccion #horaInfraccion').val()) == false) {
		$('#modalGeneral #geneInfraccion #horaInfraccion').addClass("border border-danger");
		$('#modalGeneral #geneInfraccion #horaLabel').html('Hora, Introduce una hora v&aacute;lida');	
		$('#modalGeneral #geneInfraccion #horaLabel').css('color','red');
		res = false;
	}
	if(!($('#modalGeneral #geneInfraccion #importeInfraccion').val()) == "" && ValidateDecimal($('#modalGeneral #geneInfraccion #importeInfraccion').val()) == false) {
		$('#modalGeneral #geneInfraccion #importeInfraccion').addClass("border border-danger");	
		$('#modalGeneral #geneInfraccion #lblImporte').html('Importe, Solo se permite n&uacute;meros enteros o con dos decimales como m&aacute;ximo');	
		$('#modalGeneral #geneInfraccion #lblImporte').css('color','red');
		res = false;
	}
	return res;
}

function editarInfraccionGeneral(id) {	
	$.ajax({
		data: { id : id },
		url: './obtenerInfraccion',
		type : 'POST',
		dataType: 'json',
		success: function(data)
		{
			$('#modalGeneral #geneInfraccion #matriculaInfr').val(data.fkMatricula.id);
			if(data.fechaInfraccion != null){
				$('#modalGeneral #geneInfraccion #fechaInfraccion').val(data.fechaInfraccion);
			}	
			$('#modalGeneral #geneInfraccion #conductor').val(data.conductor);
			$('#modalGeneral #geneInfraccion #horaInfraccion').val(data.horaInfraccion);
			$('#modalGeneral #geneInfraccion #nexpediente').val(data.nexpediente);
			$('#modalGeneral #geneInfraccion #lugarInfraccion').val(data.lugarInfraccion);
			$('#modalGeneral #geneInfraccion #danos').val(data.danos);
			$('#modalGeneral #geneInfraccion #motivo').val(data.motivo);
			if(data.importe != null && data.importe.includes('.')){
				$('#modalGeneral #geneInfraccion #importeInfraccion').val(data.importe.replace(".", ","));
			}else{
				$('#modalGeneral #geneInfraccion #importeInfraccion').val(data.importe);
			}
			$('#modalGeneral #geneInfraccion #observacionesInfraccion').val(data.observaciones);
			$('#modalGeneral #geneInfraccion #idInfraccionActualiza').val(data.id);
			resetModalInfraccionGeneral();
		},
	});
}

function modalEliminarInfraccionGeneral(id) {
	$('#modalEliminarInfraccionGeneral #idModalEliminarInfraccionGeneral').text('Eliminar Infracci\u00F3n');
	$('#modalEliminarInfraccionGeneral #idInfraccionEliminarGeneral').val(id);
	$('#modalEliminarInfraccionGeneral').modal('show');
}

function eliminarInfraccionGeneral() {
	$.ajax({
		    type: 'POST',
		    url: './eliminarInfraccion',
		    data: $('#modalEliminarInfraccionGeneral #eliminarInfraccionGeneral').serialize() ,
		    success: function (data) {
		    	deshabilitarDatosInfraccion();
		    	$('#modalEliminarInfraccionGeneral').modal('hide');
				tablaInfraccion.ajax.reload();
				$("#alertaEliminarInfraccionGeneralOK").fadeIn(1500);
				setTimeout(function() {$("#alertaEliminarInfraccionGeneralOK").fadeOut(1500);},3000);
				clearModalGenInfraccion();
    		},
			 error: function( jqXHR, textStatus, errorThrown ) {
			 	$('#modalEliminarInfraccionGeneral').modal('hide');
				$("#alertaEliminarInfraccionGeneralKO").fadeIn(1500);
				setTimeout(function() {$("#alertaEliminarInfraccionGeneralKO").fadeOut(1500);},3000);
			 }
		});
}

$("#modalGeneral #geneInfraccion #matriculaInfr").change(function() {
	$('#modalGeneral #geneInfraccion #matriculaInfr').removeClass("border border-danger");
	$('#modalGeneral #geneInfraccion #lblMatriculaInfr').html('Matrícula (*)');	
	$('#modalGeneral #geneInfraccion #lblMatriculaInfr').css('color','black');
});

$("#fechaInfraccion").change(function() {
	$('#modalGeneral #geneInfraccion #fechaInfraccion').removeClass("border border-danger");
	$('#modalGeneral #geneInfraccion #lblFechaInfraccion').html('Fecha Infracci&oacute;n (*)');	
	$('#modalGeneral #geneInfraccion #lblFechaInfraccion').css('color','black');
});

$("#horaInfraccion").keydown(function() {
	$('#modalGeneral #geneInfraccion #horaInfraccion').removeClass("border border-danger");
	$('#modalGeneral #geneInfraccion #horaLabel').html('Hora');	
	$('#modalGeneral #geneInfraccion #horaLabel').css('color','black');
});

$("#importeInfraccion").keydown(function() {
	$('#modalGeneral #geneInfraccion #importeInfraccion').removeClass("border border-danger");
	$('#modalGeneral #geneInfraccion #lblImporte').html('Importe');	
	$('#modalGeneral #geneInfraccion #lblImporte').css('color','black');
});

function cerrarEliminarInfraccionGeneral(){
	$('#modalEliminarInfraccionGeneral').modal('hide');
}
/*** FIN INFRACCION ***/

/*** INICIO DOCUMENTO INFRACCION ***/
function habilitarEdicionInfraccionDocumento() {
	if (permisoDeAccesoInfraccion != "VISUALIZADOR") {
		$('#modalInfraccionDocumentoGeneral #nuevaInfraccionDocumentoGeneral input').prop('disabled', false);
		$('#modalInfraccionDocumentoGeneral #nuevaInfraccionDocumentoGeneral textarea').prop('disabled',false);
		$('#modalInfraccionDocumentoGeneral #guardarInfraccionDocumento').removeClass('btn-light');
		$('#modalInfraccionDocumentoGeneral #guardarInfraccionDocumento').prop('disabled',false);
		$('#modalInfraccionDocumentoGeneral #limpiaInfraccionDocumento').removeClass('btn-light');
		$('#modalInfraccionDocumentoGeneral #limpiaInfraccionDocumento').prop('disabled',false);
	}else{
		$('#modalInfraccionDocumentoGeneral #nuevaInfraccionDocumentoGeneral input').prop('disabled', true);
		$('#modalInfraccionDocumentoGeneral #nuevaInfraccionDocumentoGeneral textarea').prop('disabled',true);
		$('#modalInfraccionDocumentoGeneral #guardarInfraccionDocumento').addClass('btn-light');
		$('#modalInfraccionDocumentoGeneral #guardarInfraccionDocumento').prop('disabled',true);
		$('#modalInfraccionDocumentoGeneral #limpiaInfraccionDocumento').addClass('btn-light');
		$('#modalInfraccionDocumentoGeneral #limpiaInfraccionDocumento').prop('disabled',true);
	}
}

function nuevaInfraccionDocumentoGeneral(id) {
	$('#modalGeneral').modal('hide');
	$('#modalInfraccionDocumentoGeneral #idInfraccionDocumentoGeneral').val(id);
	$('#modalInfraccionDocumentoGeneral').modal({
		keyboard: false,
		backdrop: 'static'
	});
	habilitarEdicionInfraccionDocumento();
	tablaInfraccionDocumento = $('#tablaInfraccionDocumentoGeneral').DataTable({
	   destroy: true,
	   ajax : {
			url: './tablaInfraccionDocumento',
			data : {"idInfraccion" : id},
			dataSrc: ''
	   },
	   columnDefs: [
	            {
	                "targets": [0],
	                "visible": false
	            }
	        ],
	   columns : [
	   		{
	   			title: 'id',
	   			data:'id',
	   		},
	   		{
	   			title: 'Nombre',
	   			data:'nombre'
	   		},
	   		{
	   			title: 'Comentarios',
	   			data:'comentarios'
	   		},
            {
				title: 'Acciones',
	            render: function (data, type, row) {
					var eliminarDocInfraccion = '';
					var visuaoeditDocInfraccion = '<button type="button" id="ButtonDescargarDocumentoInfraccionGeneral" class="editar edit-modal btn btn-success"  data-toggle="tooltip" data-placement="bottom" title="Descargar" onclick="descargarDocumentoInfraccion(\''+row.nombre+'\','+row.id+')"><span class="fa fa-file-alt"></span></button>';
					if (permisoDeAccesoInfraccion != "VISUALIZADOR") {
						eliminarDocInfraccion = '<button type="button" id="ButtonEliminarDocumentoInfraccionGeneral" class="editar edit-modal btn btn-success" onclick="modalEliminarDocumentoInfraccionGeneral('+row.id+')"><i class="fa fa-trash"></i></button>';
					}else{
						eliminarDocInfraccion = '<button type="button" id="ButtonEliminarDocumentoInfraccionGeneral" class="editar edit-modal btn btn-light" disabled="true" onclick="modalEliminarDocumentoInfraccionGeneral('+row.id+')"><i class="fa fa-trash"></i></button>';
					}
					return visuaoeditDocInfraccion + '&nbsp;' + eliminarDocInfraccion;
	            }
	   		}],
	});
}

function modalEliminarDocumentoInfraccionGeneral(id) {
	$('#modalEliminarDocumentoInfraccionGeneral #idModalEliminarDocumentoInfraccionGeneral').text('Eliminar Documento Infracci\u00F3n');
	$('#modalEliminarDocumentoInfraccionGeneral #eliminarDocumentoInfraccionGeneral #idDocumentoInfraccionEliminarGeneral').val(id);
	$('#modalInfraccionDocumentoGeneral').modal('hide');
	$('#modalEliminarDocumentoInfraccionGeneral').modal('show');
}

function cerrarEliminarInfraccionDocumentoGeneral(){
	$('#modalEliminarDocumentoInfraccionGeneral').modal('hide');
	$('#modalInfraccionDocumentoGeneral').modal('show');
}

function eliminarDocumentoInfraccionGeneral() {
	$.ajax({
		    type: 'POST',
		    url: './eliminarDocumentoInfraccion',
		    data: $('#modalEliminarDocumentoInfraccionGeneral #eliminarDocumentoInfraccionGeneral').serialize() ,
		    success: function (data) {
		    	$('#modalEliminarDocumentoInfraccionGeneral').modal('hide');
		    	$('#modalInfraccionDocumentoGeneral').modal('show');
		    	tablaInfraccionDocumento.ajax.reload();
		    	clearModalGenInfraccionDocumento();
				$("#alertaEliminarInfraccionDocumentoGeneralOK").fadeIn(1500);
				setTimeout(function() {$("#alertaEliminarInfraccionDocumentoGeneralOK").fadeOut(1500);},3000);		
    		},
			 error: function( jqXHR, textStatus, errorThrown ) {
			 	$('#modalEliminarDocumentoInfraccionGeneral').modal('hide');
			 	$('#modalInfraccionDocumentoGeneral').modal('show');
				$("#alertaEliminarInfraccionDocumentoGeneralKO").fadeIn(1500);
				setTimeout(function() {$("#alertaEliminarInfraccionDocumentoGeneralKO").fadeOut(1500);},3000);
			 }
		});
}

function clearModalGenInfraccionDocumento() {
	$('#modalInfraccionDocumentoGeneral').find('form')[0].reset();
	$('#modalInfraccionDocumentoGeneral #ficheroInfraccionGeneral').removeClass("border border-danger");
	$('#modalInfraccionDocumentoGeneral #lblFicheroInfraccionGeneral').html('Adjunto (*)');	
	$('#modalInfraccionDocumentoGeneral #lblFicheroInfraccionGeneral').css('color','black');
}

function guardarDocumentoInfraccionGeneral() {
	if(validaCamposDocumentoInfraccionGeneral()){
		var formData = new FormData();
		var files = document.getElementById('ficheroInfraccionGeneral').files;
		formData.append('fkInfraccion.id', $('#modalInfraccionDocumentoGeneral #nuevaInfraccionDocumentoGeneral #idInfraccionDocumentoGeneral').val());
		formData.append('ficheroInfraccion', files[0]);
		formData.append('nombre', files[0].name);
		formData.append('mime', files[0].type);
		formData.append('comentarios', $('#modalInfraccionDocumentoGeneral #nuevaInfraccionDocumentoGeneral #observacionesInfraccionDocumentoGeneral').val());
		$.ajax({
			    type: 'POST',
			    cache: false,
	    		contentType: false,
	    		processData: false,
			    url: './guardarDocumentoInfraccion',
			    data: formData,
			    success: function (data) {
			    	clearModalGenInfraccionDocumento();
			    	tablaInfraccionDocumento.ajax.reload();
					$("#alertaInfraccionDocumentoGeneralOK").fadeIn(1500);
					setTimeout(function() {$("#alertaInfraccionDocumentoGeneralOK").fadeOut(1500);},3000);		
	    		},
				error: function( jqXHR, textStatus, errorThrown ) {
					$("#alertaInfraccionDocumentoGeneralKO").fadeIn(1500);
					setTimeout(function() {$("#alertaInfraccionDocumentoGeneralKO").fadeOut(1500);},3000);
				}
			});
	}
}

function validaCamposDocumentoInfraccionGeneral() {
	if($('#modalInfraccionDocumentoGeneral #ficheroInfraccionGeneral').val() == "") {
		$('#modalInfraccionDocumentoGeneral #ficheroInfraccionGeneral').addClass("border border-danger");
		$('#modalInfraccionDocumentoGeneral #lblFicheroInfraccionGeneral').html('Adjunto (*)');	
		$('#modalInfraccionDocumentoGeneral #lblFicheroInfraccionGeneral').css('color','red');
		return false;
	} else{
		return true;
	}
}

$("#modalInfraccionDocumentoGeneral #ficheroInfraccionGeneral").change(function() {
	$('#modalInfraccionDocumentoGeneral #ficheroInfraccionGeneral').removeClass("border border-danger");
	$('#modalInfraccionDocumentoGeneral #lblFicheroInfraccionGeneral').html('Adjunto (*)');	
	$('#modalInfraccionDocumentoGeneral #lblFicheroInfraccionGeneral').css('color','black');
});

function cerrarInfraccionDocumentoGeneral(){
	clearModalGenInfraccionDocumento();
	$('#modalInfraccionDocumentoGeneral').modal('hide');
	$('#modalGeneral').modal('show');
}
/*** FIN DOCUMENTO INFRACCION ***/


/*** INICIO MANTENIMIENTO ***/
function Botones_Mantenimiento(){
	//if($('#modalGeneral #formuEstadoGeneralVehi #estadoGeneralVehi').val() == "ALTA" && $('#modalGeneral #habilitarEdicionMantenimiento').prop('disabled')==true)
	if($('#modalGeneral #habilitarEdicionMantenimiento').prop('disabled')==true)
	{
		$('#modalGeneral #tablaMantenimiento #ButtonEditarMantenimiento').removeClass('btn-light');
		$('#modalGeneral #tablaMantenimiento #ButtonEditarMantenimiento').addClass('btn-success');
		$('#modalGeneral #tablaMantenimiento #ButtonEditarMantenimiento').prop('disabled',false);
		if (permisoDeAccesoMantenimiento != "VISUALIZADOR") {
			$('#modalGeneral #tablaMantenimiento #ButtonEliminarMantenimiento').removeClass('btn-light');
			$('#modalGeneral #tablaMantenimiento #ButtonEliminarMantenimiento').addClass('btn-success');
			$('#modalGeneral #tablaMantenimiento #ButtonEliminarMantenimiento').prop('disabled',false);
		}
		$('#modalGeneral #tablaMantenimiento #ButtonAnadirDocumentoMantenimiento').removeClass('btn-light');
		$('#modalGeneral #tablaMantenimiento #ButtonAnadirDocumentoMantenimiento').addClass('btn-success');
		$('#modalGeneral #tablaMantenimiento #ButtonAnadirDocumentoMantenimiento').prop('disabled',false);
		$('#modalGeneral #tablaMantenimiento #ButtonAnadirConceptoMantenimiento').removeClass('btn-light');
		$('#modalGeneral #tablaMantenimiento #ButtonAnadirConceptoMantenimiento').addClass('btn-success');
		$('#modalGeneral #tablaMantenimiento #ButtonAnadirConceptoMantenimiento').prop('disabled',false);
	}else{
		$('#modalGeneral #tablaMantenimiento #ButtonEditarMantenimiento').removeClass('btn-success');
		$('#modalGeneral #tablaMantenimiento #ButtonEditarMantenimiento').addClass('btn-light');
		$('#modalGeneral #tablaMantenimiento #ButtonEditarMantenimiento').prop('disabled',true);
		$('#modalGeneral #tablaMantenimiento #ButtonEliminarMantenimiento').removeClass('btn-success');
		$('#modalGeneral #tablaMantenimiento #ButtonEliminarMantenimiento').addClass('btn-light');
		$('#modalGeneral #tablaMantenimiento #ButtonEliminarMantenimiento').prop('disabled',true);
		$('#modalGeneral #tablaMantenimiento #ButtonAnadirDocumentoMantenimiento').removeClass('btn-success');
		$('#modalGeneral #tablaMantenimiento #ButtonAnadirDocumentoMantenimiento').addClass('btn-light');
		$('#modalGeneral #tablaMantenimiento #ButtonAnadirDocumentoMantenimiento').prop('disabled',true);
		$('#modalGeneral #tablaMantenimiento #ButtonAnadirConceptoMantenimiento').removeClass('btn-success');
		$('#modalGeneral #tablaMantenimiento #ButtonAnadirConceptoMantenimiento').addClass('btn-light');
		$('#modalGeneral #tablaMantenimiento #ButtonAnadirConceptoMantenimiento').prop('disabled',true);
	}
}

function deshabilitarDatosMantenimiento(){
	$('#modalGeneral #geneMantenimiento #fechaAutorizacion').prop('disabled', true);
	$('#modalGeneral #geneMantenimiento #kmInicial').prop('disabled', true);
	//$('#modalGeneral #geneMantenimiento #reparacion').prop('disabled', true);
	$('#modalGeneral #geneMantenimiento #precioTotal').prop('readonly', true);
	$('#modalGeneral #geneMantenimiento #numeroFactura').prop('disabled', true);
	$('#modalGeneral #geneMantenimiento #fechaFactura').prop('disabled', true);
	$('#modalGeneral #geneMantenimiento #fechaIntervencion').prop('disabled', true);
	$('#modalGeneral #geneMantenimiento #iva').prop('disabled', true);
	$('#modalGeneral #geneMantenimiento #finalizado').prop('disabled', true);
	$('#modalGeneral #geneMantenimiento textarea').prop('disabled',true);
	$('#modalGeneral #geneMantenimiento select').prop('disabled',true);
	$('#modalGeneral #guardaMantenimiento').addClass('btn-light');
	$('#modalGeneral #guardaMantenimiento').prop('disabled',true);
	$('#modalGeneral #limpiaMantenimiento').addClass('btn-light');
	$('#modalGeneral #limpiaMantenimiento').prop('disabled',true);
	$('#modalGeneral #habilitarEdicionMantenimiento').removeClass('btn-light');
	$('#modalGeneral #habilitarEdicionMantenimiento').prop('disabled',false);
}

function habilitarEdicionMantenimiento() {
	if(permisoDeAccesoMantenimiento=="EDITOR" || permisoDeAccesoMantenimiento=="ADMINISTRADOR"){
		$('#modalGeneral #geneMantenimiento #fechaAutorizacion').prop('disabled', false);
		$('#modalGeneral #geneMantenimiento #kmInicial').prop('disabled', false);
		//$('#modalGeneral #geneMantenimiento #reparacion').prop('disabled', false);
		$('#modalGeneral #geneMantenimiento #precioTotal').prop('readonly', false);
		$('#modalGeneral #geneMantenimiento #numeroFactura').prop('disabled', false);
		$('#modalGeneral #geneMantenimiento #fechaFactura').prop('disabled', false);
		$('#modalGeneral #geneMantenimiento #fechaIntervencion').prop('disabled', false);
		$('#modalGeneral #geneMantenimiento #iva').prop('disabled', false);
		$('#modalGeneral #geneMantenimiento #finalizado').prop('disabled', false);
		$('#modalGeneral #geneMantenimiento select').prop('disabled', false);
		$('#modalGeneral #geneMantenimiento textarea').prop('disabled',false);
		$('#modalGeneral #guardaMantenimiento').removeClass('btn-light');
		$('#modalGeneral #guardaMantenimiento').prop('disabled',false);
		$('#modalGeneral #limpiaMantenimiento').removeClass('btn-light');
		$('#modalGeneral #limpiaMantenimiento').prop('disabled',false);
	}
	$('#modalGeneral #habilitarEdicionMantenimiento').addClass('btn-light');
	$('#modalGeneral #habilitarEdicionMantenimiento').prop('disabled',true);
	// LLAMAMOS A LA FUNCION PARA RELLENAR EL LISTADO DE MATRICULAS DEL VEHICULO (SE DEJA POR SI FUERA NECESARIO)
	recargarMatriculas($('#modalGeneral #geneVehiculo #idVehiculoActualiza').val(),"geneMantenimiento","matriculaMant"); 
	// LLAMAMOS A LA FUNCION PARA RELLENAR EL LISTADO DE TALLERES
	rellenarTalleres();
	// SE HABILITAN BOTONES DE MANTENIMIENTO (NO HACE FALTA VER SI EL VEHICULO ESTA DE BAJA O NO)
	Botones_Mantenimiento();
}

function rellenarTalleres(){
	var campoTaller=$('#modalGeneral #geneMantenimiento #tallerMant');
	$.ajax({
		url: './rellenaTalleres',
		type : 'POST',
		dataType: 'json',
		success: function(r){
			campoTaller.children('option:not(:first)').remove();
			$(r).each(function(i,v){
				campoTaller.append(new Option(v.nombre, v.id, false, false));
			})
		}
	});
}


function rellenarDatosMantenimiento(id, datosIVA){
	$.ajax({
		data: { id : id },
		url: './obtenerVehiculo',
		type : 'POST',
		dataType: 'json',
		success: function(data)
		{
			$('#modalGeneral #geneMantenimiento #marcaMant').val(data.fkModelo.fkMarca.nombre);
			$('#modalGeneral #geneMantenimiento #modeloMant').val(data.fkModelo.nombre);
			if(data.fkParametroTipoRepostaje != null){
				$('#modalGeneral #geneMantenimiento #tipoVehiculoMant').val(data.fkModelo.fkParametroTipoVehiculo.nombre);
			}
			$('#modalGeneral #geneMantenimiento #serviciAdsMant').val(data.fkServicioAdscrito.nombre);
			if(data.fkParametroTipoUso != null){
				$('#modalGeneral #geneMantenimiento #usoMant').val(data.fkParametroTipoUso.nombre);
			}else{
				$('#modalGeneral #geneMantenimiento #usoMant').val('');
			}
      if(datosIVA == 'SI'){
			  $('#modalGeneral #geneMantenimiento #baseImponible').val("0");
			  $('#modalGeneral #geneMantenimiento #precioTotal').val("0");
        $('#modalGeneral #geneMantenimiento #iva').val("0");
      }
		}
	});
}

//ESTA FUNCION OBTIENE EL ID DEL VEHICULO
function obtenerDatosMantenimiento(id) {
  var datosIVA = 'SI';
	clearModalGenMantenimiento();
	$('#modalGeneral #geneMantenimiento #idVehiculoMantenimiento').val(id);
	rellenarDatosMantenimiento(id, datosIVA);
	
	tablaMantenimiento = $('#modalGeneral #tablaMantenimiento').DataTable({
	   "order": [[ 0, "desc" ]],
	   destroy: true,
	   ajax : {
			url: './tablaMantenimiento',
      data : {"idVehiculoMantenimiento" : id},
			dataSrc: ''
	   },
	   columnDefs: [
	            {
	                "targets": [0],
	                "visible": false
	            },
	            {
	                "targets":2,
	                "type":"date-eu"
	            }
	        ],
	   columns : [
	   		{
	   			title: 'id',
	   			data:'id',
	   		},
	   		{
	   			title: 'Matr&iacute;cula',
	   			data: 'fkMatricula.nombre'
	   		},
	   		{
	   			title: 'Fecha Autorizaci&oacute;n',
	   			data: 'fechaAutorizacion',
				render: function (data, type, row) { return row.fechaAutorizacion ? moment(row.fechaAutorizacion).format('DD/MM/YYYY') : ""}
	   		},
			{
	   			title: 'Reparaci&oacute;n',
	   			data: 'fkParametroTipoReparacion.nombre'
	   		},
			{
	   			title: 'Taller',
	   			data: 'fkTaller.nombre'
	   		},
	   		{
				title: 'Acciones',
	            render: function (data, type, row) {
					if(row.finalizado == '0'){
						var eliminarMantenimiento = '<button type="button" id="ButtonEliminarMantenimiento" class="editar edit-modal btn" onclick="modalEliminarMantenimientoGeneral('+row.id+')" disabled="false"><i class="fa fa-trash"></i></button>';
						var visuaoeditMantenimiento = '';
						if (permisoDeAccesoMantenimiento != "VISUALIZADOR") {
							visuaoeditMantenimiento = '<button type="button" id="ButtonEditarMantenimiento" class="editar edit-modal btn" disabled="true" onclick="editarMantenimientoGeneral('+row.id+')" disabled="false"><span class="fa fa-edit"></span></button>';
						}else{
							visuaoeditMantenimiento = '<button type="button" id="ButtonEditarMantenimiento" class="editar edit-modal btn" disabled="true" onclick="editarMantenimientoGeneral('+row.id+')" disabled="false"><span class="fa fa-eye"></span></button>';
						}
						return visuaoeditMantenimiento + '&nbsp;' + eliminarMantenimiento;
					}else{
						return '<button type="button" id="ButtonEditarMantenimiento" class="editar edit-modal btn" disabled="true" onclick="mostrarMantenimientoGeneral('+row.id+')" disabled="false"><span class="fa fa-eye"></span></button>'
						+ '&nbsp;' + '<button type="button" id="ButtonEliminarMantenimientoFinalizado" class="editar edit-modal btn" onclick="modalEliminarMantenimientoGeneral('+row.id+')" disabled="false"><i class="fa fa-trash"></i></button>';
					}
	       		  }
			},
			{		
					title: 'Gesti&oacute;n',
					render: function (data, type, row) {
						var anadirConcepto = '<button type="button" id="ButtonAnadirConceptoMantenimientoRep" class="editar edit-modal btn btn-light" data-toggle="tooltip" data-placement="bottom" title="Añadir Conceptos" onclick="nuevoMantenimientoConceptoGeneral('+row.id+',\''+row.fkMatricula.nombre+'\',\''+row.finalizado+'\')" disabled="true"><span class="fa fa-share-alt"></span></button>';
						if(row.fkParametroTipoReparacion.nombre=="CONTROL PERIÓDICO" || row.fkParametroTipoReparacion.nombre=="REVISIÓN Y MANTENIMIENTO"){
							anadirConcepto = '<button type="button" id="ButtonAnadirConceptoMantenimiento" class="editar edit-modal btn btn-success" data-toggle="tooltip" data-placement="bottom" title="Añadir Conceptos" onclick="nuevoMantenimientoConceptoGeneral('+row.id+',\''+row.fkMatricula.nombre+'\',\''+row.finalizado+'\')" disabled="false"><span class="fa fa-share-alt"></span></button>'
						}
	       		   			return '<button type="button" id="ButtonAnadirDocumentoMantenimiento" class="editar edit-modal btn" data-toggle="tooltip" data-placement="bottom" title="Gestión documento Mantenimiento" onclick="nuevoMantenimientoDocumentoGeneral('+row.id+',\''+row.finalizado+'\')" disabled="true"><span class="fa fa-file-alt"></span></button>'
							+ '&nbsp;' + anadirConcepto;	
	       		   }
	        }],
	});
}

$('#tablaMantenimiento').on( 'draw.dt', function () {
    Botones_Mantenimiento();
} );

function mostrarAvisoMantenimiento() {
  objetoMantenimiento.classList.remove("d-none");
}

function clearModalGenMantenimiento(nombre) {
	$('#modalGeneral #geneMantenimiento #idMantenimientoActualiza').val(null);
	$('#modalGeneral #geneMantenimiento #baseImponible').val("0");
	$('#modalGeneral #geneMantenimiento #precioTotal').val("0");
	$('#modalGeneral #geneMantenimiento #tallerMant').val("");
	$('#modalGeneral #geneMantenimiento #matriculaMant').val("");
	$('#modalGeneral #geneMantenimiento #fechaAutorizacion').val(null);
	$('#modalGeneral #geneMantenimiento #fechaIntervencion').val(null);
	$('#modalGeneral #geneMantenimiento #kmInicial').val("");
	//$('#modalGeneral #geneMantenimiento #reparacion').val("");
	$('#modalGeneral #geneMantenimiento #reparacionMant').val("");
	$('#modalGeneral #geneMantenimiento #numeroFactura').val("");
	$('#modalGeneral #geneMantenimiento #fechaFactura').val(null);
	$('#modalGeneral #geneMantenimiento #iva').val("0");
	$('#modalGeneral #geneMantenimiento #finalizado').prop("checked", false);
	$('#modalGeneral #geneMantenimiento #observaciones').val("");
	if(nombre!="limpiaMantenimiento"){
		deshabilitarDatosMantenimiento();
		resetModalMantenimientoGeneral();
	}else{
		habilitarEdicionMantenimiento();
	}
}

function resetModalMantenimientoGeneral() {
	$('#modalGeneral #geneMantenimiento #matriculaMant').removeClass("border border-danger");
	$('#modalGeneral #geneMantenimiento #lblMatriculaMant').html('Matr&iacute;cula (*)');
	$('#modalGeneral #geneMantenimiento #lblMatriculaMant').css('color','black');
	$('#modalGeneral #geneMantenimiento #tallerMant').removeClass("border border-danger");
	$('#modalGeneral #geneMantenimiento #lblTallerMant').html('Taller (*)');
	$('#modalGeneral #geneMantenimiento #lblTallerMant').css('color','black');
	//$('#modalGeneral #geneMantenimiento #reparacion').removeClass("border border-danger");
	$('#modalGeneral #geneMantenimiento #reparacionMant').removeClass("border border-danger");
	$('#modalGeneral #geneMantenimiento #lblReparacionMant').html('Reparaci&oacute;n (*)');
	$('#modalGeneral #geneMantenimiento #lblReparacionMant').css('color','black');
	$('#modalGeneral #geneMantenimiento #iva').removeClass("border border-danger");
	$('#modalGeneral #geneMantenimiento #lblIVAMant').html('IVA');
	$('#modalGeneral #geneMantenimiento #lblIVAMant').css('color','black');
	$('#modalGeneral #geneMantenimiento #precioTotal').removeClass("border border-danger");
	$('#modalGeneral #geneMantenimiento #lblPrecioTotal').html('Precio Total (*)');
	$('#modalGeneral #geneMantenimiento #lblPrecioTotal').css('color','black');
}

function crearMantenimientoGeneral() {
	if(validaCamposMantenimientoGeneral()){
		$.ajax({
			type: 'POST',
			url: './crearMantenimiento',
			data: $('#modalGeneral #geneMantenimiento').serialize(),
			success: function (data) {				
				tablaMantenimiento.ajax.reload();
				$("#alertaMantenimientoGeneralOK").fadeIn(1500);
				setTimeout(function() {$("#alertaMantenimientoGeneralOK").fadeOut(1500);},3000);		
	    		clearModalGenMantenimiento();		
	    	},
			error: function( jqXHR, textStatus, errorThrown ) {
				$("#alertaMantenimientoGeneralKO").fadeIn(1500);
				setTimeout(function() {$("#alertaMantenimientoGeneralKO").fadeOut(1500);},3000);
			}
		});
	}
}

function validaCamposMantenimientoGeneral() {
	var res = true;
	//SVEHI-288. Añadido para que precio total sea obligatorio.
	if($('#modalGeneral #geneMantenimiento #precioTotal').val() == "") {
		$('#modalGeneral #geneMantenimiento #precioTotal').addClass("border border-danger");
		$('#modalGeneral #geneMantenimiento #lblPrecioTotal').html('Precio Total (*) Campo Obligatorio');	
		$('#modalGeneral #geneMantenimiento #lblPrecioTotal').css('color','red');
		res = false;
	}
	
	if($('#modalGeneral #geneMantenimiento #tallerMant').val() == "") {
		$('#modalGeneral #geneMantenimiento #tallerMant').addClass("border border-danger");
		$('#modalGeneral #geneMantenimiento #lblTallerMant').html('Taller (*) Campo Obligatorio');	
		$('#modalGeneral #geneMantenimiento #lblTallerMant').css('color','red');
		res = false;
	}
	
	if($('#modalGeneral #geneMantenimiento #matriculaMant').val() == "") {
		$('#modalGeneral #geneMantenimiento #matriculaMant').addClass("border border-danger");
		$('#modalGeneral #geneMantenimiento #lblMatriculaMant').html('Matr&iacute;cula (*) Campo Obligatorio');	
		$('#modalGeneral #geneMantenimiento #lblMatriculaMant').css('color','red');
		res = false;
	}
	if($('#modalGeneral #geneMantenimiento #reparacionMant').val() == "") {
		$('#modalGeneral #geneMantenimiento #reparacionMant').addClass("border border-danger");
		$('#modalGeneral #geneMantenimiento #lblReparacionMant').html('Reparaci&oacute;n (*) Campo Obligatorio');	
		$('#modalGeneral #geneMantenimiento #lblReparacionMant').css('color','red');
		res = false;
	}
	//SVEHI-288. Comentamos el apartado de IVA ya que deja de ser obligatorio.
	/*if($('#modalGeneral #geneMantenimiento #iva').val() == "") {
		$('#modalGeneral #geneMantenimiento #iva').addClass("border border-danger");
		$('#modalGeneral #geneMantenimiento #lblIVAMant').html('IVA (*) Campo Obligatorio');	
		$('#modalGeneral #geneMantenimiento #lblIVAMant').css('color','red');
		res = false;
	}*/
	if($('#modalGeneral #geneMantenimiento #iva').val() != "" && parseInt($('#modalGeneral #geneMantenimiento #iva').val()) > 100) {
		$('#modalGeneral #geneMantenimiento #iva').addClass("border border-danger");
		$('#modalGeneral #geneMantenimiento #lblIVAMant').html('IVA (*) se ha indicado un valor mayor que 100');	
		$('#modalGeneral #geneMantenimiento #lblIVAMant').css('color','red');
		res = false;
	}
	return res;
}

function editarMantenimientoGeneral(id) {
	$.ajax({
		data: { id : id },
		url: './obtenerMantenimiento',
		type : 'POST',
		dataType: 'json',
		success: function(data)
		{
			if(data.fechaAutorizacion != null){
				$('#modalGeneral #geneMantenimiento #fechaAutorizacion').val(data.fechaAutorizacion);
			}
			if(data.fechaFactura != null){
				$('#modalGeneral #geneMantenimiento #fechaFactura').val(data.fechaFactura);
			}
			if(data.fechaIntervencion != null){
				$('#modalGeneral #geneMantenimiento #fechaIntervencion').val(data.fechaIntervencion);
			}
			if(data.kmInicial != null){
				$('#modalGeneral #geneMantenimiento #kmInicial').val(data.kmInicial.replace(".", ","));
			}else{
				$('#modalGeneral #geneMantenimiento #kmInicial').val(data.kmInicial);
			}
			$('#modalGeneral #geneMantenimiento #matriculaMant').val(data.fkMatricula.id);
			//$('#modalGeneral #geneMantenimiento #reparacion').val(data.reparacion);
			$('#modalGeneral #geneMantenimiento #reparacionMant').val(data.fkParametroTipoReparacion.id);
			$('#modalGeneral #geneMantenimiento #numeroFactura').val(data.numeroFactura);
			$('#modalGeneral #geneMantenimiento #iva').val(data.iva.replace(".", ","));
			$('#modalGeneral #geneMantenimiento #observaciones').val(data.observaciones);
			$('#modalGeneral #geneMantenimiento #tallerMant').val(data.fkTaller.id);
			$('#modalGeneral #geneMantenimiento #baseImponible').val(data.baseImponible.replace(".", ","));
			$('#modalGeneral #geneMantenimiento #precioTotal').val(data.precioTotal.replace(".", ","));
			if(data.finalizado == true){
				$('#modalGeneral #geneMantenimiento #finalizado').prop("checked", true);
			}else{
				$('#modalGeneral #geneMantenimiento #finalizado').prop("checked", false);
			}
			$('#modalGeneral #geneMantenimiento #idMantenimientoActualiza').val(data.id);
			resetModalMantenimientoGeneral();
			habilitarCamposTemporal('SI');
		},
	});
}

function mostrarMantenimientoGeneral(id) {
	$.ajax({
		data: { id : id },
		url: './obtenerMantenimiento',
		type : 'POST',
		dataType: 'json',
		success: function(data)
		{
			if(data.fechaAutorizacion != null){
				$('#modalGeneral #geneMantenimiento #fechaAutorizacion').val(data.fechaAutorizacion);
			}
			if(data.fechaFactura != null){
				$('#modalGeneral #geneMantenimiento #fechaFactura').val(data.fechaFactura);
			}
			if(data.fechaIntervencion != null){
				$('#modalGeneral #geneMantenimiento #fechaIntervencion').val(data.fechaIntervencion);
			}
			if(data.kmInicial != null){
				$('#modalGeneral #geneMantenimiento #kmInicial').val(data.kmInicial.replace(".", ","));
			}else{
				$('#modalGeneral #geneMantenimiento #kmInicial').val(data.kmInicial);
			}
			$('#modalGeneral #geneMantenimiento #matriculaMant').val(data.fkMatricula.id);
			//$('#modalGeneral #geneMantenimiento #reparacion').val(data.reparacion);
			$('#modalGeneral #geneMantenimiento #reparacionMant').val(data.fkParametroTipoReparacion.id);
			$('#modalGeneral #geneMantenimiento #numeroFactura').val(data.numeroFactura);
			$('#modalGeneral #geneMantenimiento #iva').val(data.iva.replace(".", ","));
			$('#modalGeneral #geneMantenimiento #observaciones').val(data.observaciones);
			$('#modalGeneral #geneMantenimiento #tallerMant').val(data.fkTaller.id);
			$('#modalGeneral #geneMantenimiento #baseImponible').val(data.baseImponible.replace(".", ","));
			$('#modalGeneral #geneMantenimiento #precioTotal').val(data.precioTotal.replace(".", ","));
			if(data.finalizado == true){
				$('#modalGeneral #geneMantenimiento #finalizado').prop("checked", true);
			}else{
				$('#modalGeneral #geneMantenimiento #finalizado').prop("checked", false);
			}
			$('#modalGeneral #geneMantenimiento #idMantenimientoActualiza').val(data.id);
			resetModalMantenimientoGeneral();
			habilitarCamposTemporal('NO');
		},
	});
}

function habilitarCamposTemporal(mostrar){
	if(mostrar == 'NO'){
		$('#modalGeneral #geneMantenimiento #precioTotal').prop('readonly', true);
		$('#modalGeneral #geneMantenimiento #fechaAutorizacion').prop('disabled', true);
		$('#modalGeneral #geneMantenimiento #kmInicial').prop('disabled', true);
		//$('#modalGeneral #geneMantenimiento #reparacion').prop('disabled', true);
		$('#modalGeneral #geneMantenimiento #numeroFactura').prop('disabled', true);
		$('#modalGeneral #geneMantenimiento #fechaFactura').prop('disabled', true);
		$('#modalGeneral #geneMantenimiento #fechaIntervencion').prop('disabled', true);
		$('#modalGeneral #geneMantenimiento #iva').prop('disabled', true);
		if(permisoCheckFinalizado=="true" && permisoDeAccesoMantenimiento != "VISUALIZADOR"){
			$('#modalGeneral #geneMantenimiento #finalizado').prop('disabled', false);
		}else{
			$('#modalGeneral #geneMantenimiento #finalizado').prop('disabled', true);
		}
		$('#modalGeneral #geneMantenimiento textarea').prop('disabled',true);
		$('#modalGeneral #geneMantenimiento select').prop('disabled',true);
		if(permisoCheckFinalizado=="true" && permisoDeAccesoMantenimiento != "VISUALIZADOR"){
			$('#modalGeneral #guardaMantenimiento').removeClass('btn-light');
			$('#modalGeneral #guardaMantenimiento').prop('disabled',false);
		}else{
			$('#modalGeneral #guardaMantenimiento').addClass('btn-light');
			$('#modalGeneral #guardaMantenimiento').prop('disabled',true);
		}
	}else{
		if (permisoDeAccesoMantenimiento != "VISUALIZADOR") {
			$('#modalGeneral #geneMantenimiento #precioTotal').prop('readonly', false);
			$('#modalGeneral #geneMantenimiento #fechaAutorizacion').prop('disabled', false);
			$('#modalGeneral #geneMantenimiento #kmInicial').prop('disabled', false);
			//$('#modalGeneral #geneMantenimiento #reparacion').prop('disabled', false);
			$('#modalGeneral #geneMantenimiento #numeroFactura').prop('disabled', false);
			$('#modalGeneral #geneMantenimiento #fechaFactura').prop('disabled', false);
			$('#modalGeneral #geneMantenimiento #fechaIntervencion').prop('disabled', false);
			$('#modalGeneral #geneMantenimiento #iva').prop('disabled', false);
			$('#modalGeneral #geneMantenimiento #finalizado').prop('disabled', false);
			$('#modalGeneral #geneMantenimiento textarea').prop('disabled',false);
			$('#modalGeneral #geneMantenimiento select').prop('disabled',false);
			$('#modalGeneral #guardaMantenimiento').removeClass('btn-light');
			$('#modalGeneral #guardaMantenimiento').prop('disabled',false);
		}else{
			habilitarCamposTemporal('NO');
		}
	}
}

function modalEliminarMantenimientoGeneral(id) {
	$('#modalEliminarMantenimientoGeneral #idModalEliminarMantenimientoGeneral').text('Eliminar Mantenimiento');
	$('#modalEliminarMantenimientoGeneral #idMantenimientoEliminarGeneral').val(id);
	$('#modalEliminarMantenimientoGeneral').modal('show');
}

function eliminarMantenimientoGeneral() {
  var parser = new DOMParser();
	var responseDoc = null;
	$.ajax({
		    type: 'POST',
		    url: './eliminarMantenimiento',
		    data: $('#modalEliminarMantenimientoGeneral #eliminarMantenimientoGeneral').serialize() ,
		    success: function (data) {
		    	$('#modalEliminarMantenimientoGeneral').modal('hide');
				tablaMantenimiento.ajax.reload();
				$("#alertaEliminarMantenimientoGeneralOK").fadeIn(1500);
				setTimeout(function() {$("#alertaEliminarMantenimientoGeneralOK").fadeOut(1500);},3000);
				clearModalGenMantenimiento();
    		},
			error: function( jqXHR, textStatus, errorThrown ) {
			 	$('#modalEliminarMantenimientoGeneral').modal('hide');
        // PARSEAMOS EL ERROR Y LO INCLUIMOS EN EL DIV CORRESPONDIENTE
				responseDoc = parser.parseFromString(jqXHR.responseText, "text/html");
				var myNodeList = responseDoc.body.querySelectorAll("p");
        var msjErr = myNodeList[1].textContent.split("MsgException");
        $("#alertaEliminarMantenimientoGeneralKO").html('<strong>Error'+msjErr[1]+'</strong>');
				$("#alertaEliminarMantenimientoGeneralKO").fadeIn(1500);
				setTimeout(function() {$("#alertaEliminarMantenimientoGeneralKO").fadeOut(1500);},3000);
			}
		});
}

$("#modalGeneral #geneMantenimiento #tallerMant").change(function() {
	$('#modalGeneral #geneMantenimiento #tallerMant').removeClass("border border-danger");
	$('#modalGeneral #geneMantenimiento #lblTallerMant').html('Taller (*)');	
	$('#modalGeneral #geneMantenimiento #lblTallerMant').css('color','black');
});

$("#modalGeneral #geneMantenimiento #matriculaMant").change(function() {
	$('#modalGeneral #geneMantenimiento #matriculaMant').removeClass("border border-danger");
	$('#modalGeneral #geneMantenimiento #lblMatriculaMant').html('Matr&iacute;cula (*)');	
	$('#modalGeneral #geneMantenimiento #lblMatriculaMant').css('color','black');
});

$('#modalGeneral #geneMantenimiento #reparacionMant').change(function(){
	$('#modalGeneral #geneMantenimiento #reparacionMant').removeClass("border border-danger");
	$('#modalGeneral #geneMantenimiento #lblReparacionMant').html('Reparaci&oacute;n (*)');	
	$('#modalGeneral #geneMantenimiento #lblReparacionMant').css('color','black');
});

$('#modalGeneral #geneMantenimiento #iva').keydown(function(event){
	$('#modalGeneral #geneMantenimiento #iva').removeClass("border border-danger");
	$('#modalGeneral #geneMantenimiento #lblIVAMant').html('IVA');	
	$('#modalGeneral #geneMantenimiento #lblIVAMant').css('color','black');
});

$('#modalGeneral #geneMantenimiento #precioTotal').keydown(function(event){
	$('#modalGeneral #geneMantenimiento #precioTotal').removeClass("border border-danger");
	$('#modalGeneral #geneMantenimiento #lblPrecioTotal').html('Precio Total (*)');
	$('#modalGeneral #geneMantenimiento #lblPrecioTotal').css('color','black');
});

function cerrarEliminarMantenimientoGeneral(){
	$('#modalEliminarMantenimientoGeneral').modal('hide');
}
/*** FIN MANTENIMIENTO ***/

/*** INICIO DOCUMENTO MANTENIMIENTO ***/
function habilitarEdicionMantenimientoDocumento(finalizado) {
    if(finalizado == 'false'){
		if (permisoDeAccesoMantenimiento != "VISUALIZADOR") {
			$('#modalMantenimientoDocumentoGeneral #nuevoMantenimientoDocumentoGeneral input').prop('disabled', false);
			$('#modalMantenimientoDocumentoGeneral #nuevoMantenimientoDocumentoGeneral textarea').prop('disabled',false);
			$('#modalMantenimientoDocumentoGeneral #guardarMantenimientoDocumento').removeClass('btn-light');
			$('#modalMantenimientoDocumentoGeneral #guardarMantenimientoDocumento').prop('disabled',false);
			$('#modalMantenimientoDocumentoGeneral #limpiaMantenimientoDocumento').removeClass('btn-light');
			$('#modalMantenimientoDocumentoGeneral #limpiaMantenimientoDocumento').prop('disabled',false);
		}else{
			$('#modalMantenimientoDocumentoGeneral #nuevoMantenimientoDocumentoGeneral input').prop('disabled', true);
			$('#modalMantenimientoDocumentoGeneral #nuevoMantenimientoDocumentoGeneral textarea').prop('disabled',true);
			$('#modalMantenimientoDocumentoGeneral #guardarMantenimientoDocumento').addClass('btn-light');
			$('#modalMantenimientoDocumentoGeneral #guardarMantenimientoDocumento').prop('disabled',true);
			$('#modalMantenimientoDocumentoGeneral #limpiaMantenimientoDocumento').addClass('btn-light');
			$('#modalMantenimientoDocumentoGeneral #limpiaMantenimientoDocumento').prop('disabled',true);
		}
	}else{
		$('#modalMantenimientoDocumentoGeneral #nuevoMantenimientoDocumentoGeneral input').prop('disabled', true);
		$('#modalMantenimientoDocumentoGeneral #nuevoMantenimientoDocumentoGeneral textarea').prop('disabled',true);
		$('#modalMantenimientoDocumentoGeneral #guardarMantenimientoDocumento').addClass('btn-light');
		$('#modalMantenimientoDocumentoGeneral #guardarMantenimientoDocumento').prop('disabled',true);
		$('#modalMantenimientoDocumentoGeneral #limpiaMantenimientoDocumento').addClass('btn-light');
		$('#modalMantenimientoDocumentoGeneral #limpiaMantenimientoDocumento').prop('disabled',true);
	}
}

function nuevoMantenimientoDocumentoGeneral(id,finalizado) {
	$('#modalGeneral').modal('hide');
	$('#modalMantenimientoDocumentoGeneral #idMantenimientoDocumentoGeneral').val(id);
	$('#modalMantenimientoDocumentoGeneral').modal({
		keyboard: false,
		backdrop: 'static'
	});
	habilitarEdicionMantenimientoDocumento(finalizado);
	tablaMantenimientoDocumento = $('#modalMantenimientoDocumentoGeneral #tablaMantenimientoDocumentoGeneral').DataTable({
	   destroy: true,
	   ajax : {
			url: './tablaMantenimientoDocumento',
			data : {"idMantenimiento" : id},
			dataSrc: ''
	   },
	   columnDefs: [
	            {
	                "targets": [0],
	                "visible": false
	            }
	        ],
	   columns : [
	   		{
	   			title: 'id',
	   			data:'id',
	   		},
	   		{
	   			title: 'Nombre',
	   			data:'nombre'
	   		},
	   		{
	   			title: 'Comentarios',
	   			data:'comentarios'
	   		},
            {
				title: 'Acciones',
	            render: function (data, type, row) {
					var eliminarDocMantenimiento = '';
					var visuaoeditDocMantenimiento = '<button type="button" id="ButtonDescargarDocumentoMantenimientoGeneral" class="editar edit-modal btn btn-success"  data-toggle="tooltip" data-placement="bottom" title="Descargar" onclick="descargarDocumentoMantenimiento(\''+row.nombre+'\','+row.id+')"><span class="fa fa-file-alt"></span></button>';
					if (permisoDeAccesoMantenimiento != "VISUALIZADOR") {
						if(finalizado == 'false'){
							eliminarDocMantenimiento = '<button type="button" id="ButtonEliminarDocumentoMantenimientoGeneral" class="editar edit-modal btn btn-success" onclick="modalEliminarDocumentoMantenimientoGeneral('+row.id+')"><i class="fa fa-trash"></i></button>';
						}else{
							eliminarDocMantenimiento = '<button type="button" id="ButtonEliminarDocumentoMantenimientoGeneral" class="editar edit-modal btn btn-light" disabled="true" onclick="modalEliminarDocumentoMantenimientoGeneral('+row.id+')"><i class="fa fa-trash"></i></button>';
						}
					}else{
						eliminarDocMantenimiento = '<button type="button" id="ButtonEliminarDocumentoMantenimientoGeneral" class="editar edit-modal btn btn-light" disabled="true" onclick="modalEliminarDocumentoMantenimientoGeneral('+row.id+')"><i class="fa fa-trash"></i></button>';
					}
					return visuaoeditDocMantenimiento + '&nbsp;' + eliminarDocMantenimiento;
	            }
	   		}],
	});
}

function modalEliminarDocumentoMantenimientoGeneral(id) {
	$('#modalEliminarDocumentoMantenimientoGeneral #idModalEliminarDocumentoMantenimientoGeneral').text('Eliminar Documento Mantenimiento');
	$('#modalEliminarDocumentoMantenimientoGeneral #eliminarDocumentoMantenimientoGeneral #idDocumentoMantenimientoEliminarGeneral').val(id);
	$('#modalMantenimientoDocumentoGeneral').modal('hide');
	$('#modalEliminarDocumentoMantenimientoGeneral').modal('show');
}

function cerrarEliminarMantenimientoDocumentoGeneral(){
	$('#modalEliminarDocumentoMantenimientoGeneral').modal('hide');
	$('#modalMantenimientoDocumentoGeneral').modal('show');
}

function eliminarDocumentoMantenimientoGeneral() {
	$.ajax({
		type: 'POST',
		url: './eliminarDocumentoMantenimiento',
		data: $('#modalEliminarDocumentoMantenimientoGeneral #eliminarDocumentoMantenimientoGeneral').serialize() ,
		success: function (data) {
		    $('#modalEliminarDocumentoMantenimientoGeneral').modal('hide');
		    $('#modalMantenimientoDocumentoGeneral').modal('show');
		    tablaMantenimientoDocumento.ajax.reload();
		    clearModalGenMantenimientoDocumento();
			$("#alertaEliminarMantenimientoDocumentoGeneralOK").fadeIn(1500);
			setTimeout(function() {$("#alertaEliminarMantenimientoDocumentoGeneralOK").fadeOut(1500);},3000);		
    	},
		error: function( jqXHR, textStatus, errorThrown ) {
			$('#modalEliminarDocumentoMantenimientoGeneral').modal('hide');
			$('#modalMantenimientoDocumentoGeneral').modal('show');
			$("#alertaEliminarMantenimientoDocumentoGeneralKO").fadeIn(1500);
			setTimeout(function() {$("#alertaEliminarMantenimientoDocumentoGeneralKO").fadeOut(1500);},3000);
		}
	});
}

function clearModalGenMantenimientoDocumento() {
	$('#modalMantenimientoDocumentoGeneral').find('form')[0].reset();
	$('#modalMantenimientoDocumentoGeneral #ficheroMantenimientoGeneral').removeClass("border border-danger");
	$('#modalMantenimientoDocumentoGeneral #lblFicheroMantenimientoGeneral').html('Adjunto (*)');	
	$('#modalMantenimientoDocumentoGeneral #lblFicheroMantenimientoGeneral').css('color','black');
}

function guardarDocumentoMantenimientoGeneral() {
	if(validaCamposDocumentoMantenimientoGeneral()){
		var formData = new FormData();
		var files = document.getElementById('ficheroMantenimientoGeneral').files;
		formData.append('fkMantenimiento.id', $('#modalMantenimientoDocumentoGeneral #nuevoMantenimientoDocumentoGeneral #idMantenimientoDocumentoGeneral').val());
		formData.append('ficheroMantenimiento', files[0]);
		formData.append('nombre', files[0].name);
		formData.append('mime', files[0].type);
		formData.append('comentarios', $('#modalMantenimientoDocumentoGeneral #nuevoMantenimientoDocumentoGeneral #observacionesMantenimientoDocumentoGeneral').val());
		$.ajax({
			type: 'POST',
			cache: false,
			contentType: false,
	    	processData: false,
			url: './guardarDocumentoMantenimiento',
			data: formData,
			success: function (data) {
				clearModalGenMantenimientoDocumento();
			    tablaMantenimientoDocumento.ajax.reload();
				$("#alertaMantenimientoDocumentoGeneralOK").fadeIn(1500);
				setTimeout(function() {$("#alertaMantenimientoDocumentoGeneralOK").fadeOut(1500);},3000);		
	    	},
			error: function( jqXHR, textStatus, errorThrown ) {
				$("#alertaMantenimientoDocumentoGeneralKO").fadeIn(1500);
				setTimeout(function() {$("#alertaMantenimientoDocumentoGeneralKO").fadeOut(1500);},3000);
			}
		});
	}
}

function validaCamposDocumentoMantenimientoGeneral() {
	if($('#modalMantenimientoDocumentoGeneral #ficheroMantenimientoGeneral').val() == "") {
		$('#modalMantenimientoDocumentoGeneral #ficheroMantenimientoGeneral').addClass("border border-danger");
		$('#modalMantenimientoDocumentoGeneral #lblFicheroMantenimientoGeneral').html('Adjunto (*)');	
		$('#modalMantenimientoDocumentoGeneral #lblFicheroMantenimientoGeneral').css('color','red');
		return false;
	} else{
		return true;
	}
}

$("#modalMantenimientoDocumentoGeneral #ficheroMantenimientoGeneral").change(function() {
	$('#modalMantenimientoDocumentoGeneral #ficheroMantenimientoGeneral').removeClass("border border-danger");
	$('#modalMantenimientoDocumentoGeneral #lblFicheroMantenimientoGeneral').html('Adjunto (*)');	
	$('#modalMantenimientoDocumentoGeneral #lblFicheroMantenimientoGeneral').css('color','black');
});

function cerrarMantenimientoDocumentoGeneral(){
	clearModalGenMantenimientoDocumento();
	$('#modalMantenimientoDocumentoGeneral').modal('hide');
	$('#modalGeneral').modal('show');
}
/*** FIN DOCUMENTO MANTENIMIENTO ***/

/*** INICIO CONCEPTOS DE MANTENIMIENTO ***/
function habilitarMantenimientoConceptosGeneral(finalizado) {
	if(finalizado == 'false'){
		if (permisoDeAccesoMantenimiento != "VISUALIZADOR") {
			$('#modalMantenimientoConceptoGeneral #nuevoMantenimientoConceptoGeneral select').prop('disabled', false);
			$('#modalMantenimientoConceptoGeneral #nuevoMantenimientoConceptoGeneral input').prop('disabled', false);
			$('#modalMantenimientoConceptoGeneral #nuevoMantenimientoConceptoGeneral textarea').prop('disabled',false);
			$('#modalMantenimientoConceptoGeneral #guardarMantenimientoConcepto').removeClass('btn-light');
			$('#modalMantenimientoConceptoGeneral #guardarMantenimientoConcepto').prop('disabled',false);
			$('#modalMantenimientoConceptoGeneral #limpiaMantenimientoConcepto').removeClass('btn-light');
			$('#modalMantenimientoConceptoGeneral #limpiaMantenimientoConcepto').prop('disabled',false);
			$('#modalMantenimientoConceptoGeneral #nuevoMantenimientoConceptoGeneral #cantidad').prop('disabled',false);
			$('#modalMantenimientoConceptoGeneral #nuevoMantenimientoConceptoGeneral #cantidad').prop('readonly',true);
		}else{
			$('#modalMantenimientoConceptoGeneral #nuevoMantenimientoConceptoGeneral select').prop('disabled', true);
			$('#modalMantenimientoConceptoGeneral #nuevoMantenimientoConceptoGeneral input').prop('disabled', true);
			$('#modalMantenimientoConceptoGeneral #nuevoMantenimientoConceptoGeneral textarea').prop('disabled',true);
			$('#modalMantenimientoConceptoGeneral #guardarMantenimientoConcepto').addClass('btn-light');
			$('#modalMantenimientoConceptoGeneral #guardarMantenimientoConcepto').prop('disabled',true);
			$('#modalMantenimientoConceptoGeneral #limpiaMantenimientoConcepto').addClass('btn-light');
			$('#modalMantenimientoConceptoGeneral #limpiaMantenimientoConcepto').prop('disabled',true);
		}
	}else{
		$('#modalMantenimientoConceptoGeneral #nuevoMantenimientoConceptoGeneral select').prop('disabled', true);
		$('#modalMantenimientoConceptoGeneral #nuevoMantenimientoConceptoGeneral input').prop('disabled', true);
		$('#modalMantenimientoConceptoGeneral #nuevoMantenimientoConceptoGeneral textarea').prop('disabled',true);
		$('#modalMantenimientoConceptoGeneral #guardarMantenimientoConcepto').addClass('btn-light');
		$('#modalMantenimientoConceptoGeneral #guardarMantenimientoConcepto').prop('disabled',true);
		$('#modalMantenimientoConceptoGeneral #limpiaMantenimientoConcepto').addClass('btn-light');
		$('#modalMantenimientoConceptoGeneral #limpiaMantenimientoConcepto').prop('disabled',true);
	}
}

function nuevoMantenimientoConceptoGeneral(id,matricula,finalizado) {
	$('#modalGeneral').modal('hide');
	$('#modalMantenimientoConceptoGeneral #idManteGeneral').val(id);
	$('#modalMantenimientoConceptoGeneral #spMantConc').html("<b>Matr&iacute;cula:</b> "+matricula);
	$('#modalMantenimientoConceptoGeneral').modal({
		keyboard: false,
		backdrop: 'static'
	});
	rellenarConceptos();
	habilitarMantenimientoConceptosGeneral(finalizado);
	tablaMantenimientoConcepto = $('#modalMantenimientoConceptoGeneral #tablaMantenimientoConcepto').DataTable({
		destroy: true,
		ajax : {
			url: './tablaMantenimientoConceptos',
			data : {"idMantenimiento" : id},
			dataSrc: ''
		},
		columnDefs: [
	            {
	                "targets": [0],
	                "visible": false
	            },
	            {
	                "targets":4,
	                "type":"date-eu"
	            }
	        ],
		columns : [
	   		{
	   			title: 'id',
	   			data:'id',
	   		},
	   		{
	   			title: 'Concepto',
	   			data:'fkConcepto.nombre'
	   		},
	   		{
	   			title: 'Cantidad',
	   			data:'cantidad',
				render: function (data, type, row) { return row.cantidad ? row.cantidad.replace(".", ",") : ""}
	   		},
	   		{
	   			title: 'Precio Unitario',
	   			data:'precioUnitario',
				render: function (data, type, row) { return row.precioUnitario ? row.precioUnitario.replace(".", ",") : ""}
	   		},
			{
	   			title: 'F. Prox. Revisi&oacute;n',
	   			data:'fechaProximaRevision',
				render: function (data, type, row) { return row.fechaProximaRevision ? moment(row.fechaProximaRevision).format('DD/MM/YYYY') : ""}
	   		},
	   		{
	   			title: 'Num. Km',
	   			data:'numKilometros',
				render: function (data, type, row) { return row.numKilometros ? row.numKilometros.replace(".", ",") : ""}
	   		},
            {
				title: 'Acciones',
	            render: function (data, type, row) {
					var eliminarConcMantenimiento = '';
					var visuaoeditConcMantenimiento = '';
					if (permisoDeAccesoMantenimiento != "VISUALIZADOR") {
						if(finalizado == 'false'){
							eliminarConcMantenimiento = '<button type="button" id="ButtonEliminarConceptoMantenimientoGeneral" class="editar edit-modal btn btn-success" onclick="modalEliminarMantenimientoConceptoGeneral('+row.id+')"><i class="fa fa-trash"></i></button>';
							visuaoeditConcMantenimiento = '<button type="button" id="ButtonEditarMantenimientoConcepto" class="editar edit-modal btn btn-success" onclick="editarMantenimientoConceptoGeneral('+row.id+')"><span class="fa fa-edit"></span></button>';
						}else{
							eliminarConcMantenimiento = '<button type="button" id="ButtonEliminarConceptoMantenimientoGeneral" class="editar edit-modal btn btn-light" disabled="true" onclick="modalEliminarMantenimientoConceptoGeneral('+row.id+')"><i class="fa fa-trash"></i></button>';
							visuaoeditConcMantenimiento = '<button type="button" id="ButtonEditarMantenimientoConcepto" class="editar edit-modal btn btn-success" onclick="editarMantenimientoConceptoGeneral('+row.id+')"><span class="fa fa-eye"></span></button>';
						}
					}else{
						eliminarConcMantenimiento = '<button type="button" id="ButtonEliminarConceptoMantenimientoGeneral" class="editar edit-modal btn btn-light" disabled="true" onclick="modalEliminarMantenimientoConceptoGeneral('+row.id+')"><i class="fa fa-trash"></i></button>';
						visuaoeditConcMantenimiento = '<button type="button" id="ButtonEditarMantenimientoConcepto" class="editar edit-modal btn btn-success" onclick="editarMantenimientoConceptoGeneral('+row.id+')"><span class="fa fa-eye"></span></button>';
					}
					return visuaoeditConcMantenimiento + '&nbsp;' + eliminarConcMantenimiento;
	            }
	   		}],
	});
}

function rellenarConceptos(){
	var campoConcepto=$('#modalMantenimientoConceptoGeneral #nuevoMantenimientoConceptoGeneral #mantConcepto');
	$.ajax({
		url: './rellenaConceptos',
		type : 'POST',
		dataType: 'json',
		success: function(r){
			campoConcepto.children('option:not(:first)').remove();
			$(r).each(function(i,v){
				campoConcepto.append(new Option(v.nombre, v.id, false, false));
			})
		}
	});
}

function guardarMantenimientoConceptoGeneral() {
	if(validaCamposMantenimientoConceptoGeneral()){
		$.ajax({
			type: 'POST',
			url: './crearMantenimientoConcepto',
			data: $('#modalMantenimientoConceptoGeneral #nuevoMantenimientoConceptoGeneral').serialize() ,
			success: function (data) {
				tablaMantenimientoConcepto.ajax.reload();
        // SE RECARGAN LOS DATOS DEL MANTENIMIENTO TRAS GUARDAR EL CONCEPTO PARA QUE
        // SE VEAN REFLEJADOS LA BASE IMPONIBLE Y EL PRECIO TOTAL
        var idMantTemp = $('#modalMantenimientoConceptoGeneral #idManteGeneral').val();
				editarMantenimientoGeneral(idMantTemp);					
				$("#alertaMantenimientoConceptoGeneralOK").fadeIn(1500);
				setTimeout(function() {$("#alertaMantenimientoConceptoGeneralOK").fadeOut(1500);},3000);		
	    		clearModalGenMantenimientoConcepto();		
	    	},
			error: function( jqXHR, textStatus, errorThrown ) {
				$("#alertaMantenimientoConceptoGeneralKO").fadeIn(1500);
				setTimeout(function() {$("#alertaMantenimientoConceptoGeneralKO").fadeOut(1500);},3000);
			}
		});
	}
}

function validaCamposMantenimientoConceptoGeneral() {
	var res = true;
	if($('#modalMantenimientoConceptoGeneral #nuevoMantenimientoConceptoGeneral #mantConcepto').val() == "") {
		$('#modalMantenimientoConceptoGeneral #nuevoMantenimientoConceptoGeneral #mantConcepto').addClass("border border-danger");
		$('#modalMantenimientoConceptoGeneral #nuevoMantenimientoConceptoGeneral #lblMantConcepto').html('Concepto (*) Campo Obligatorio');	
		$('#modalMantenimientoConceptoGeneral #nuevoMantenimientoConceptoGeneral #lblMantConcepto').css('color','red');
		res = false;
	}
	if($('#modalMantenimientoConceptoGeneral #nuevoMantenimientoConceptoGeneral #cantidad').val() == "" || $('#modalMantenimientoConceptoGeneral #nuevoMantenimientoConceptoGeneral #cantidad').val() == "0") {
		$('#modalMantenimientoConceptoGeneral #nuevoMantenimientoConceptoGeneral #cantidad').addClass("border border-danger");
		$('#modalMantenimientoConceptoGeneral #nuevoMantenimientoConceptoGeneral #lblCantidad').html('Cantidad (*) Campo Obligatorio y mayor que "0"');	
		$('#modalMantenimientoConceptoGeneral #nuevoMantenimientoConceptoGeneral #lblCantidad').css('color','red');
		res = false;
	}
	if($('#modalMantenimientoConceptoGeneral #nuevoMantenimientoConceptoGeneral #precioUnitario').val() == "") {
		$('#modalMantenimientoConceptoGeneral #nuevoMantenimientoConceptoGeneral #precioUnitario').addClass("border border-danger");
		$('#modalMantenimientoConceptoGeneral #nuevoMantenimientoConceptoGeneral #lblPrecionUnitario').html('Precio Uni.(*) Campo Obligatorio');
		$('#modalMantenimientoConceptoGeneral #nuevoMantenimientoConceptoGeneral #lblPrecionUnitario').css('color','red');
		res = false;
	}
	return res;
}

function editarMantenimientoConceptoGeneral(id) {
	$.ajax({
		data: { id : id },
		url: './obtenerMantenimientoConcepto',
		type : 'POST',
		dataType: 'json',
		success: function(data)
		{
			clearModalGenMantenimientoConcepto();
			$('#modalMantenimientoConceptoGeneral #nuevoMantenimientoConceptoGeneral #idManteGeneral').val(data.fkMantenimiento.id);
			$('#modalMantenimientoConceptoGeneral #nuevoMantenimientoConceptoGeneral #mantConcepto').val(data.fkConcepto.id);
			if(data.fechaProximaRevision != null){
				$('#modalMantenimientoConceptoGeneral #nuevoMantenimientoConceptoGeneral #fechaProximaRevision').val(data.fechaProximaRevision);
			}	
			$('#modalMantenimientoConceptoGeneral #nuevoMantenimientoConceptoGeneral #numKilometros').val(data.numKilometros?data.numKilometros.replace(".", ","):"");
			$('#modalMantenimientoConceptoGeneral #nuevoMantenimientoConceptoGeneral #precioUnitario').val(data.precioUnitario.replace(".", ","));
			$('#modalMantenimientoConceptoGeneral #nuevoMantenimientoConceptoGeneral #cantidad').val(data.cantidad);
			$('#modalMantenimientoConceptoGeneral #nuevoMantenimientoConceptoGeneral #observaciones').val(data.observaciones);
			$('#modalMantenimientoConceptoGeneral #nuevoMantenimientoConceptoGeneral #idMantenimientoConceptoActualiza').val(data.id);
		},
	});
}

function modalEliminarMantenimientoConceptoGeneral(id) {
	$('#modalEliminarMantenimientoConceptoGeneral #idModalEliminarMantenimientoConceptoGeneral').text('Eliminar Concepto del Mantenimiento');
	$('#modalEliminarMantenimientoConceptoGeneral #eliminarMantenimientoConceptoGeneral #idMantenimientoConceptoEliminarGeneral').val(id);
	$('#modalMantenimientoConceptoGeneral').modal('hide');
	$('#modalEliminarMantenimientoConceptoGeneral').modal('show');
}

function cerrarEliminarMantenimientoConcepto(){
	$('#modalEliminarMantenimientoConceptoGeneral').modal('hide');
	$('#modalMantenimientoConceptoGeneral').modal('show');
}

function eliminarMantenimientoConcepto() {
	$.ajax({
		type: 'POST',
		url: './eliminarMantenimientoConcepto',
		data: $('#modalEliminarMantenimientoConceptoGeneral #eliminarMantenimientoConceptoGeneral').serialize() ,
		success: function (data) {
			$('#modalEliminarMantenimientoConceptoGeneral').modal('hide');
		    $('#modalMantenimientoConceptoGeneral').modal('show');
		    tablaMantenimientoConcepto.ajax.reload();
        // SE RECARGAN LOS DATOS DEL MANTENIMIENTO TRAS ELIMINAR EL CONCEPTO PARA QUE
        // SE VEAN REFLEJADOS LA BASE IMPONIBLE Y EL PRECIO TOTAL
        var idMantTemp = $('#modalMantenimientoConceptoGeneral #idManteGeneral').val();
				editarMantenimientoGeneral(idMantTemp);
		    clearModalGenMantenimientoConcepto();
			$("#alertaEliminarMantenimientoConceptoGeneralOK").fadeIn(1500);
			setTimeout(function() {$("#alertaEliminarMantenimientoConceptoGeneralOK").fadeOut(1500);},3000);		
    	},
		error: function( jqXHR, textStatus, errorThrown ) {
			$('#modalEliminarMantenimientoConceptoGeneral').modal('hide');
			$('#modalMantenimientoConceptoGeneral').modal('show');
			$("#alertaEliminarMantenimientoConceptoGeneralKO").fadeIn(1500);
			setTimeout(function() {$("#alertaEliminarMantenimientoConceptoGeneralKO").fadeOut(1500);},3000);
		}
	});
}

function clearModalGenMantenimientoConcepto() {
	$('#modalMantenimientoConceptoGeneral').find('form')[0].reset();
	$('#modalMantenimientoConceptoGeneral #nuevoMantenimientoConceptoGeneral #idMantenimientoConceptoActualiza').val("");
	$('#modalMantenimientoConceptoGeneral #mantConcepto').removeClass("border border-danger");
	$('#modalMantenimientoConceptoGeneral #lblMantConcepto').html('Concepto (*)');	
	$('#modalMantenimientoConceptoGeneral #lblMantConcepto').css('color','black');
	$('#modalMantenimientoConceptoGeneral #cantidad').removeClass("border border-danger");
	$('#modalMantenimientoConceptoGeneral #lblCantidad').html('Cantidad (*)');	
	$('#modalMantenimientoConceptoGeneral #lblCantidad').css('color','black');
	$('#modalMantenimientoConceptoGeneral #precioUnitario').removeClass("border border-danger");
	$('#modalMantenimientoConceptoGeneral #lblPrecionUnitario').html('Precio Unitario (*)');	
	$('#modalMantenimientoConceptoGeneral #lblPrecionUnitario').css('color','black');
}

$("#modalMantenimientoConceptoGeneral #nuevoMantenimientoConceptoGeneral #mantConcepto").change(function() {
	$('#modalMantenimientoConceptoGeneral #nuevoMantenimientoConceptoGeneral #mantConcepto').removeClass("border border-danger");
	$('#modalMantenimientoConceptoGeneral #nuevoMantenimientoConceptoGeneral #lblMantConcepto').html('Concepto (*)');	
	$('#modalMantenimientoConceptoGeneral #nuevoMantenimientoConceptoGeneral #lblMantConcepto').css('color','black');
	if($('#modalMantenimientoConceptoGeneral #nuevoMantenimientoConceptoGeneral #mantConcepto').val() == ""){
		$('#modalMantenimientoConceptoGeneral #nuevoMantenimientoConceptoGeneral #precioUnitario').val("0");
		$('#modalMantenimientoConceptoGeneral #nuevoMantenimientoConceptoGeneral #precioUnitario').removeClass("border border-danger");
		$('#modalMantenimientoConceptoGeneral #nuevoMantenimientoConceptoGeneral #lblPrecionUnitario').html('Precio Unitario (*)');	
		$('#modalMantenimientoConceptoGeneral #nuevoMantenimientoConceptoGeneral #lblPrecionUnitario').css('color','black');
	}else{
		var conceptoE = $(this);
		// OBTENEMOS EL CONCEPTO (DEL CONCEPTOCONTROLLER) PARA SACAR EL PRECIO UNITARIO
		$.ajax({
			data: { id : conceptoE.val() },
			url: './obtenerConcepto',
			type : 'POST',
			dataType: 'json',
			success: function(datoConc){
				$('#modalMantenimientoConceptoGeneral #nuevoMantenimientoConceptoGeneral #precioUnitario').val(datoConc.precioUnitario.replace(".", ","));
			},
		});
	}
});

$("#modalMantenimientoConceptoGeneral #nuevoMantenimientoConceptoGeneral #cantidad").keydown(function() {
	$('#modalMantenimientoConceptoGeneral #nuevoMantenimientoConceptoGeneral #cantidad').removeClass("border border-danger");
	$('#modalMantenimientoConceptoGeneral #nuevoMantenimientoConceptoGeneral #lblCantidad').html('Cantidad (*)');	
	$('#modalMantenimientoConceptoGeneral #nuevoMantenimientoConceptoGeneral #lblCantidad').css('color','black');
});

$("#modalMantenimientoConceptoGeneral #nuevoMantenimientoConceptoGeneral #precioUnitario").keydown(function() {
	$('#modalMantenimientoConceptoGeneral #nuevoMantenimientoConceptoGeneral #precioUnitario').removeClass("border border-danger");
	$('#modalMantenimientoConceptoGeneral #nuevoMantenimientoConceptoGeneral #lblPrecionUnitario').html('Precio Unitario (*)');	
	$('#modalMantenimientoConceptoGeneral #nuevoMantenimientoConceptoGeneral #lblPrecionUnitario').css('color','black');
});

function cerrarMantenimientoConceptoGeneral(){
	clearModalGenMantenimientoConcepto();
	$('#modalMantenimientoConceptoGeneral').modal('hide');
	$('#modalGeneral').modal('show');
}
/*** FIN CONCEPTOS DE MANTENIMIENTO ***/

function resetModalGeneral() {
	resetModalVehiculoGeneral();
	resetModalMatriculaGeneral();
	resetModalVehiculoDocumentoGeneral();
	resetModalEquipamientoGeneral();
	resetModalMaterialGeneral();
	resetModalCesionGeneral();
	resetModalRepostajeGeneral();
	resetModalSiniestroGeneral();
	resetModalPolizaGeneral();
	resetModalItvGeneral();
	resetModalInfraccionGeneral();
	resetModalMantenimientoGeneral();
}