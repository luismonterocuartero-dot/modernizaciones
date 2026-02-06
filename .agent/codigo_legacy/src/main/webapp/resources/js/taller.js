var tablaTaller;
var objetoAviso = document.getElementById('avisoPermisoTaller');
var permisoDeAcceso = $('#modalEditarTaller #permisoActual').val();
var permisoDeAccesoServ = $('#modalEditarTaller #permisoActualServ').val();
$(document).ready(function() {
//   $("#servicioAdscritoOpt").children('option:not(:first)').remove();
if(permisoDeAcceso == "EDITOR" || permisoDeAcceso == "ADMINISTRADOR")
{
	muestraBotonNuevo();
}
if(permisoDeAcceso != "SIN_PERMISO" && permisoDeAcceso != "" ) {	
   tablaTaller = $('#tablaTaller').DataTable({
   	   "order": [[ 0, "desc" ]],
       ajax : {
			url: './tablaTalleres',
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
	               title: 'Id',
	               data:'id'
	           },
	   			{
	               title: 'Nombre',
	               data:'nombre'
	           },
	           {
	               title: 'CIF/NIF',
	               data:'cif'
	           },
	           {
	               title: 'Email',
	               data:'email'
	           },
	           {
	               title: 'Tel&eacute;fono',
	               data: 'telefono'
				   
	           },
	           {
				   title: 'Acciones',
	               render: function (data, type, row) {
                  var visualizador = '<button type="button" id="ButtonMostrar" class="editar edit-modal btn btn-success" data-toggle="tooltip" data-placement="bottom" title="Mostrar datos de taller" onclick="muestraTaller('+row.id+')"><i class="fa fa-eye"></i></button>';
                  var editor = '<button type="button" id="ButtonEditar" class="editar edit-modal btn btn-success" data-toggle="tooltip" data-placement="bottom" title="Editar taller" onclick="editarTaller('+row.id+')"><i class="fa fa-edit"></i></button>'
            			+ '&nbsp;' + '<button type="button" id="ButtonBorrar" class="editar edit-modal btn btn-success botonBorrar" data-toggle="tooltip" data-placement="bottom" title="Eliminar taller" onclick="modalEliminarTaller('+row.id+',\''+row.nombre+ '\')"><span class="fa fa-times"></span></button>';
				   	
	               	if (permisoDeAcceso == "VISUALIZADOR") {
								    return visualizador;
					        } else if (permisoDeAcceso == "ADMINISTRADOR" || permisoDeAcceso == "EDITOR") {
								    return visualizador + '&nbsp;' + editor;
					        } else {
								    return '';
					        }
				}
	           },
			   {
				   title: 'Gesti&oacute;n',
	               render: function (data, type, row) {
                  if (permisoDeAccesoServ == "SIN_PERMISO") {
	                  return '<button type="button" id="ButtonMostrarServicioTaller" class="editar edit-modal btn btn-light" data-toggle="tooltip" data-placement="bottom" title="Gestion del servicio" disabled="true" onclick="muestraServicioTaller('+row.id+')"><i class="fa fa-file-alt"></i></button>';
                  }else{
                    return '<button type="button" id="ButtonMostrarServicioTaller" class="editar edit-modal btn btn-success" data-toggle="tooltip" data-placement="bottom" title="Gestion del servicio" onclick="muestraServicioTaller('+row.id+')"><i class="fa fa-file-alt"></i></button>';
                  }

	               }
	           }
],
	});
	}else{
		mostrarAviso();		
	}
});

function mostrarAviso() {
  objetoAviso.classList.remove("d-none");
}

function muestraBotonNuevo()
{
	var myButton = document.getElementById('botonNuevoTaller');
 	myButton.hidden = false;
}


$("#centroDirectivoOpt").change(function(){
		
	var servicios = $("#servicioAdscritoOpt");
	var centros = $(this);
	
	if($(this).val() != '')
	{
		$.ajax({
			data: { id : centros.val() },
			url: './rellenaServicioPorCentro',
			type : 'POST',
			dataType: 'json',

			success: function(r)
			{
				servicios.children('option:not(:first)').remove();
					
				$(r).each(function(i,v){
					$('#servicioAdscritoOpt').append(new Option(v.nombre, v.id, false, false));
				})
			},
			
		});
	}
	else
	{
		servicios.children('option:not(:first)').remove();
	}
});

function habilitarDatosServicioTaller() {
	if(permisoDeAccesoServ=="EDITOR" || permisoDeAccesoServ=="ADMINISTRADOR") {
		$('#modalServicioTaller #muestraServicioTaller select').prop('disabled', false);
		$('#modalServicioTaller #muestraServicioTaller input').prop('disabled', false);
		$('#modalServicioTaller #muestraServicioTaller textarea').prop('disabled',false);
	  $('#modalServicioTaller #guardaServicioTaller').prop('disabled',false);
		$('#modalServicioTaller #guardaServicioTaller').removeClass('btn-light');
	  $('#modalServicioTaller #limpiaServicioTaller').prop('disabled',false);
		$('#modalServicioTaller #limpiaServicioTaller').removeClass('btn-light');
	}else{
		$('#modalServicioTaller #muestraServicioTaller select').prop('disabled', true);
		$('#modalServicioTaller #muestraServicioTaller input').prop('disabled', true);
		$('#modalServicioTaller #muestraServicioTaller textarea').prop('disabled',true);
		$('#modalServicioTaller #guardaServicioTaller').prop('disabled',true);
		$('#modalServicioTaller #guardaServicioTaller').removeClass('btn-primary');		
		$('#modalServicioTaller #limpiaServicioTaller').prop('disabled',true);
		$('#modalServicioTaller #limpiaServicioTaller').removeClass('btn-primary ');		
	}
}

var tablaServicio;
function muestraServicioTaller(id){
	habilitarDatosServicioTaller();
	clearModalServicioTaller();
	$('#idTallerServicio').val(id);
	$('#modalServicioTaller').modal({
		keyboard: false,
		backdrop: 'static'
	});
	
	tablaServicio = $('#tablaServicio').DataTable({
	    "order": [[ 0, "desc" ]],
		destroy: true,
		ajax : {
			url: './tablaServicio',
			data : {"idTallerServicio" : id},
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
				title: 'Servicio',
				data: 'fkTipoServicio.nombre',
			},
			{
				title: 'Nombre Contacto',
				data: 'contacto',
			},
			{
				title: 'Tlf Contacto',
				data: 'telefono',
			},
			{
				title: 'F. Inicio',
				data: 'fechaInicio',
				render:  function (data) {
					return moment(data).format('DD/MM/YYYY');
				}
			},
			{
				title: 'F. Fin',
                data: 'fechaFin',
				render:  function (data) {
					return data ? moment(data).format('DD/MM/YYYY') : "";
				}
			},
			{
				title: 'Observaciones',
				data: 'observaciones',
			},
			{
				   title: 'Acciones',
	               render: function (data, type, row) {
                 var eliminarServTall = '';
                 var visuaoeditServTall = '';
                 if (permisoDeAccesoServ != "VISUALIZADOR") {
                  visuaoeditServTall = '<button type="button" id="ButtonMostrar" class="editar edit-modal btn btn-success" onclick="editarServicio('+row.id+')"><i class="fa fa-edit"></i></button>';
                  eliminarServTall = '<button type="button" id="ButtonEliminar" class="editar edit-modal btn btn-success" onclick="modalEliminarServicio('+row.id+')"><i class="fa fa-trash"></i></button>';
                 }else{
                  visuaoeditServTall = '<button type="button" id="ButtonMostrar" class="editar edit-modal btn btn-success" onclick="editarServicio('+row.id+')"><i class="fa fa-eye"></i></button>';
                  eliminarServTall = '<button type="button" id="ButtonEliminar" class="editar edit-modal btn btn-light" disabled="true" onclick="modalEliminarServicio('+row.id+')"><i class="fa fa-trash"></i></button>';
                 }
                 return visuaoeditServTall + '&nbsp;' + eliminarServTall;
						//return '<button type="button" id="ButtonMostrar" class="editar edit-modal btn btn-success" onclick="editarServicio('+row.id+')"><i class="fa fa-edit"></i></button>'
						//+ '&nbsp;' + '<button type="button" id="ButtonEliminar" class="editar edit-modal btn btn-success" onclick="modalEliminarServicio('+row.id+')"><i class="fa fa-trash"></i></button>';
	        }
		}],
	});
}

function modalEliminarServicio(id) {
	$('#idModalEliminarServicioTaller').text('Eliminar Servicio Taller');
	$('#idServicioEliminar').val(id);
	$('#modalServicioTaller').modal('hide');
	$('#modalEliminarServicioTaller').modal('show');
}

function eliminarServicioTaller() {
	$.ajax({
		    type: 'POST',
		    url: './eliminarServicioTaller',
		    data: $('#eliminarServicioTaller').serialize() ,
		    success: function (data) {
		    	clearModalServicioTaller();
		    	$('#modalEliminarServicioTaller').modal('hide');
		    	$('#modalServicioTaller').modal('show');
				tablaServicio.ajax.reload();
				$("#alertaEliminarServicioOK").fadeIn(1500);
				setTimeout(function() {$("#alertaEliminarServicioOK").fadeOut(1500);},3000);		
    		},
			 error: function( jqXHR, textStatus, errorThrown ) {
			 	$('#modalEliminarServicioTaller').modal('hide');
		    	$('#modalServicioTaller').modal('show');
				$("#alertaEliminarServicioKO").fadeIn(1500);
				setTimeout(function() {$("#alertaEliminarServicioKO").fadeOut(1500);},3000);
			 }
		});
}




function crearServicioTaller() {
	if(validaCamposServicio())
	{
		$.ajax({
			    type: 'POST',
			    url: './crearServicioTaller',
			    data: $('#muestraServicioTaller').serialize() ,
			    success: function (data) {
			    	tablaServicio.ajax.reload();
					$("#alertaServicioOK").fadeIn(1500);
					setTimeout(function() {$("#alertaServicioOK").fadeOut(1500);},3000);	
					clearModalServicioTaller();	
	    		},
				 error: function( jqXHR, textStatus, errorThrown ) {
					$("#alertaServicioKO").fadeIn(1500);
					setTimeout(function() {$("#alertaServicioKO").fadeOut(1500);},3000);
				 }
	
		});
	}
}

function editarServicio(id) {
	$.ajax({
		data: { id : id },
		url: './obtenerServicioTaller',
		type : 'POST',
		dataType: 'json',
		success: function(data)
		{
			$('#modalServicioTaller #idServicio').val(data.id);
			$('#modalServicioTaller #servicioAdscritoOpt').val(data.fkServicioAdscrito.id);
			$('#modalServicioTaller input[name="contacto"]').val(data.contacto);
			$('#modalServicioTaller #fechaInicio').val(data.fechaInicio.split('-').reverse().join('/'));
			$('#modalServicioTaller #fechaFin').val(data.fechaFin?data.fechaFin.split('-').reverse().join('/'):'');
			// DATEPICKER
			$('#modalServicioTaller #fechaFin').datepicker('option', 'minDate', data.fechaInicio.split('-').reverse().join('/'));
			if(data.fechaFin){
				$('#modalServicioTaller #fechaInicio').datepicker('option', 'maxDate', data.fechaFin.split('-').reverse().join('/'));
			}
			$('#modalServicioTaller input[name="expediente"]').val(data.expediente);
			$('#modalServicioTaller input[name="telefono"]').val(data.telefono);
			$('#modalServicioTaller #fkTipoServicio').val(data.fkTipoServicio.id);
			$('#modalServicioTaller input[name="email"]').val(data.email);
			$('#modalServicioTaller input[name="motivoFin"]').val(data.motivoFin);
			$('#modalServicioTaller #observacionesServicioTaller').val(data.observaciones);
			if(data.licitacion == true){
				$('#modalServicioTaller #licitacion').prop("checked", true);
			}else{
				$('#modalServicioTaller #licitacion').prop("checked", false);
			}
			if(data.tiposVehiculos){
				$.each(data.tiposVehiculos.split(","), function(i,e){
					$("#modalServicioTaller #tiposVehiculosOpt option[value='" + e + "']").prop("selected", true);
				});
			}
			if(data.conceptos){
				$.each(data.conceptos.split(","), function(i,e){
					$("#modalServicioTaller #conceptosOpt option[value='" + e + "']").prop("selected", true);
				});
			}
			//$('#modalServicioTaller #centroDirectivoOpt').val(data.fkCentroDirectivo.id);
		},
	});
}


function cerrarEliminarServicioTaller(){
	$('#modalEliminarServicioTaller').modal('hide');
	$('#modalServicioTaller').modal('show');
}

function clearModalServicioTaller() {
	$('#modalServicioTaller').find('form')[0].reset();
	$('#modalServicioTaller #idServicio').val(null);
	$("#fechaInicio").datepicker('option', 'maxDate', null);
	$("#fechaFin").datepicker('option', 'minDate', null);
}

$('#modalServicioTaller #centroDirectivoOpt').change(function(event){
	$('#modalServicioTaller #centroDirectivoOpt').removeClass("border border-danger");
	$('#modalServicioTaller #lblCentroDirectivo').html('Centro Directivo (*)');	
	$('#modalServicioTaller #lblCentroDirectivo').css('color','black');
});

$('#modalServicioTaller #fechaInicio').change(function(event){
	$('#modalServicioTaller #fechaInicio').removeClass("border border-danger");
	$('#modalServicioTaller #lblFechaInicioServicio').html('Fecha Inicio (*)');	
	$('#modalServicioTaller #lblFechaInicioServicio').css('color','black');
});

$('#modalServicioTaller #servicioAdscritoOpt').change(function(event){
	$('#modalServicioTaller #servicioAdscritoOpt').removeClass("border border-danger");
	$('#modalServicioTaller #lblServicioAdscrito').html('Servicio Adscrito (*)');	
	$('#modalServicioTaller #lblServicioAdscrito').css('color','black');
});

$('#modalServicioTaller #fkTipoServicio').change(function(event){
	$('#modalServicioTaller #fkTipoServicio').removeClass("border border-danger");
	$('#modalServicioTaller #lblServicio').html('Servicio (*)');	
	$('#modalServicioTaller #lblServicio').css('color','black');
});

$('#modalServicioTaller #fechaFin').change(function(event){
	$('#modalServicioTaller #fechaFin').removeClass("border border-danger");
	$('#modalServicioTaller #lblFechaFinServicio').html('Fecha Fin');	
	$('#modalServicioTaller #lblFechaFinServicio').css('color','black');
});

$('#modalServicioTaller #email').keydown(function(event){
	$('#modalServicioTaller #email').removeClass("border border-danger");
	$('#modalServicioTaller #lblEmailContacto').html('Email de contacto');	
	$('#modalServicioTaller #lblEmailContacto').css('color','black');
});

function resetModalServicioTaller() {
	$('#modalServicioTaller #centroDirectivoOpt').removeClass("border border-danger");
	$('#modalServicioTaller #lblCentroDirectivo').html('Centro Directivo (*)');	
	$('#modalServicioTaller #lblCentroDirectivo').css('color','black');
	$('#modalServicioTaller #fechaInicio').removeClass("border border-danger");
	$('#modalServicioTaller #lblFechaInicioServicio').html('Fecha Inicio (*)');	
	$('#modalServicioTaller #lblFechaInicioServicio').css('color','black');
	$('#modalServicioTaller #servicioAdscritoOpt').removeClass("border border-danger");
	$('#modalServicioTaller #lblServicioAdscrito').html('Servicio Adscrito (*)');	
	$('#modalServicioTaller #lblServicioAdscrito').css('color','black');
	$('#modalServicioTaller #fkTipoServicio').removeClass("border border-danger");
	$('#modalServicioTaller #lblServicio').html('Servicio (*)');	
	$('#modalServicioTaller #lblServicio').css('color','black');
	$('#modalServicioTaller #email').removeClass("border border-danger");
	$('#modalServicioTaller #lblEmailContacto').html('Email de contacto');	
	$('#modalServicioTaller #lblEmailContacto').css('color','black');
	$('#modalServicioTaller #fechaFin').removeClass("border border-danger");
	$('#modalServicioTaller #lblFechaFinServicio').html('Fecha Fin');	
	$('#modalServicioTaller #lblFechaFinServicio').css('color','black');
	$("#fechaInicio").datepicker('option', 'maxDate', null);
	$("#fechaFin").datepicker('option', 'minDate', null);
}

// FUNCION QUE TRANSFORMA UNA FECHA CON FORMATO DD/MM/YYYY EN YYYY-MM-DD
function transformarFormatoFechaCorrecto(fecha) {
	var dateParts = fecha.replaceAll("/", "-").split("-");
	return dateParts[2] + "-" + dateParts[1] + "-" + dateParts[0];
}

var ValidateDate = (function (date1, date2) {
	var res = true;
    if (date2 <= date1) {
   		res = false;
    }
	return res;
});

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

function validaCamposServicio() {
	var res = true;
	if($('#modalServicioTaller #servicioAdscritoOpt').val() == "") {
		$('#modalServicioTaller #servicioAdscritoOpt').addClass("border border-danger");
		$('#modalServicioTaller #lblServicioAdscrito').html('Servicio Adscrito (*) Campo Obligatorio');	
		$('#modalServicioTaller #lblServicioAdscrito').css('color','red');
		res = false;
	}
	if($('#modalServicioTaller #centroDirectivoOpt').val() == "") {
		$('#modalServicioTaller #centroDirectivoOpt').addClass("border border-danger");
		$('#modalServicioTaller #lblCentroDirectivo').html('Centro Directivo (*) Campo Obligatorio');	
		$('#modalServicioTaller #lblCentroDirectivo').css('color','red');
		res = false;
	}
	if($('#modalServicioTaller #fkTipoServicio').val() == "") {
		$('#modalServicioTaller #fkTipoServicio').addClass("border border-danger");
		$('#modalServicioTaller #lblServicio').html('Servicio (*) Campo Obligatorio');	
		$('#modalServicioTaller #lblServicio').css('color','red');
		res = false;
	}
	
	var fechaIni = $('#modalServicioTaller #fechaInicio').val();
	var fechaFin = $('#modalServicioTaller #fechaFin').val();
	var fechaIniTmp = $('#modalServicioTaller #fechaInicio').val();
	var fechaFinTmp = $('#modalServicioTaller #fechaFin').val();
	
	if(fechaIni == "") {
		$('#modalServicioTaller #fechaInicio').addClass("border border-danger");
		$('#modalServicioTaller #lblFechaInicioServicio').html('Fecha Inicio (*) Campo Obligatorio');	
		$('#modalServicioTaller #lblFechaInicioServicio').css('color','red');
		res = false;
	}else{
		if(validarFormatoFecha(fechaIni)){
			if(!existeFecha(fechaIni)){
				$('#modalServicioTaller #fechaInicio').addClass("border border-danger");	
				$('#modalServicioTaller #lblFechaInicioServicio').html('Fecha Inicio (*), la fecha indicada no es valida');	
				$('#modalServicioTaller #lblFechaInicioServicio').css('color','red');
				res = false;
			}
		}else{
			$('#modalServicioTaller #fechaInicio').addClass("border border-danger");	
			$('#modalServicioTaller #lblFechaInicioServicio').html('Fecha Inicio (*), la fecha indicada no tiene el formato correcto (dd/mm/yyyy)');	
			$('#modalServicioTaller #lblFechaInicioServicio').css('color','red');
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
			$('#modalServicioTaller #fechaFin').addClass("border border-danger");	
			$('#modalServicioTaller #lblFechaFinServicio').html('Fecha Fin, la fecha fin no puede ser anterior a la fecha inicio');	
			$('#modalServicioTaller #lblFechaFinServicio').css('color','red');
			res = false;
		}
	}
	if(!($('#modalServicioTaller #email').val()) == "" && validateEmail($('#modalServicioTaller #email').val()) == false) {
		$('#modalServicioTaller #email').addClass("border border-danger");
		$('#modalServicioTaller #lblEmailContacto').html('Email de contacto Introduce un email v&aacutelido');	
		$('#modalServicioTaller #lblEmailContacto').css('color','red');
		res = false;
	}
	
	// VALIDAMOS LAS FECHAS POR SI NO TIENEN EL FORMATO CORRECTO O NO SON VALIDAS
	if(validarFormatoFecha(fechaFin)){
		if(!existeFecha(fechaFin)){
			$('#modalServicioTaller #fechaFin').addClass("border border-danger");	
			$('#modalServicioTaller #lblFechaFinServicio').html('Fecha Fin, la fecha indicada no es valida');	
			$('#modalServicioTaller #lblFechaFinServicio').css('color','red');
			res = false;
		}
	}else{
		$('#modalServicioTaller #fechaFin').addClass("border border-danger");	
		$('#modalServicioTaller #lblFechaFinServicio').html('Fecha Fin, la fecha indicada no tiene el formato correcto (dd/mm/yyyy)');	
		$('#modalServicioTaller #lblFechaFinServicio').css('color','red');
		res = false;
	}
		return res;
}



function muestraTaller(id){
	editarTaller(id);
	$('#modalEditarTaller input').prop('disabled', true);
	$('#modalEditarTaller select').prop('disabled', true);
	$('#modalEditarTaller textarea').prop('disabled', true);
	$('#modalEditarTaller #cabecera').html('Datos del Taller');
	$('#modalEditarTaller #guardarTaller').addClass('btn-light');
	$('#modalEditarTaller #guardarTaller').prop('disabled',true);
}

function editarTaller(id){
	$('#modalEditarTaller input').prop('disabled', false);
	$('#modalEditarTaller select').prop('disabled', false);
	$('#modalEditarTaller textarea').prop('disabled', false);
	$('#modalEditarTaller #cabecera').html('Edici&oacute;n Taller');
	$('#modalEditarTaller #guardarTaller').removeClass('btn-light');
	$('#modalEditarTaller #guardarTaller').prop('disabled',false);
	$.ajax({
		data: { id : id },
		url: './obtenerTaller',
		type : 'POST',
		dataType: 'json',
		success: function(data)
		{
			$('#modalEditarTaller input[name="nombre"]').val(data.nombre);
			$('#modalEditarTaller input[name="direccion"]').val(data.direccion);
			$('#modalEditarTaller input[name="cif"]').val(data.cif);
			$('#modalEditarTaller input[name="telefono"]').val(data.telefono);
			$('#modalEditarTaller input[name="email"]').val(data.email);
			$('#modalEditarTaller #observaciones').val(data.observaciones);
			$('#modalEditarTaller #selectorProvincia').val(data.provincia);
			if(data.provincia != "" && data.provincia != null){
				var municipios = $("#modalEditarTaller #selectorMunicipio");
				$.ajax({
						data: { provinciaId : data.provincia },
						url: './rellenaMunicipiosPorProvincia',
						type : 'POST',
						dataType: 'json',

						success: function(r)
						{
							municipios.children('option:not(:first)').remove();
								
							$(r).each(function(i,v){
								$('#modalEditarTaller #selectorMunicipio').append(new Option(v.nombre, v.id, false, false));
							})
							$('#modalEditarTaller #selectorMunicipio').val(data.municipio);	
						},
						
					});
			}else{
				$('#modalEditarTaller #selectorMunicipio').val(data.municipio);
				$("#modalEditarTaller #selectorMunicipio").prop('disabled', true);
			}
			$('#modalEditarTaller #codigoPostal').val(data.codigoPostal);
			$('#modalEditarTaller #idTallerActualiza').val(data.id);
			$('#modalEditarTaller').modal({
				keyboard: false,
				backdrop: 'static'
			});
		},
	});
}


function nuevoTaller() {
	$('#modalEditarTaller #cabecera').html('Nuevo Taller');
	$('#modalEditarTaller #idTallerActualiza').val("");
	$('#modalEditarTaller input').prop('disabled', false);
	$('#modalEditarTaller select').prop('disabled', false);
	$("#modalEditarTaller #selectorMunicipio").prop('disabled', true);
	$('#modalEditarTaller textarea').prop('disabled', false);
	$('#modalEditarTaller #guardarTaller').removeClass('btn-light');
	$('#modalEditarTaller #guardarTaller').prop('disabled',false);
	$('#modalEditarTaller').find('form')[0].reset();
	$('#modalEditarTaller').modal({
		keyboard: false,
		backdrop: 'static'
	});
}

$('#modalEditarTaller #nombre').keydown(function(event){
	$('#modalEditarTaller #nombre').removeClass("border border-danger");
	$('#modalEditarTaller #labelNombre').html('Nombre (*)');	
	$('#modalEditarTaller #labelNombre').css('color','black');
});

$('#modalEditarTaller #cif').keydown(function(event){
	$('#modalEditarTaller #cif').removeClass("border border-danger");
	$('#modalEditarTaller #lblCif').html('CIF/NIF (*)');	
	$('#modalEditarTaller #lblCif').css('color','black');
});

$('#modalEditarTaller #email').keydown(function(event){
	$('#modalEditarTaller #email').removeClass("border border-danger");
	$('#modalEditarTaller #lblEmail').html('Email');	
	$('#modalEditarTaller #lblEmail').css('color','black');
});

function soloNumeros(event){
  var regex = new RegExp("^[0-9]+$");
  var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
  if (!regex.test(key)) {
    event.preventDefault();
    return false;
  }
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// FUNCION QUE VALIDA UN NIF
var ValidateNIF = (function() {
	  'use strict';
	  
	  var DNI_REGEX = /^(\d{8})([A-Z])$/;

	  var ValidateNIF2 = function( str ) {

	    // Ensure upcase and remove whitespace
	    str = str.toUpperCase();

	    var valid = false;
	    var type = spainIdType( str );

	    switch (type) {
	      case 'dni':
	        valid = validDNI( str );
	        break;
	    }

	    return valid;
	    

	  };

	  var spainIdType = function( str ) {
	    if ( str.match( DNI_REGEX ) ) {
	      return 'dni';
	    }
	  };

	  var validDNI = function( dni ) {
	    var dni_letters = "TRWAGMYFPDXBNJZSQVHLCKE";
	    var letter = dni_letters.charAt( parseInt( dni, 10 ) % 23 );
	    
	    return letter == dni.charAt(8);
	  };

	  return ValidateNIF2;
	})();

var ValidateCIF = (function() {
  'use strict';
  
  var CIF_REGEX = /^([ABCDEFGHJKLMNPQRSUVW])(\d{7})([0-9A-J])$/;

  var ValidateCIF2 = function( str ) {

    // Ensure upcase and remove whitespace
    str = str.toUpperCase();
    var valid = false;

if ( str.match( CIF_REGEX ) ) {
	valid = validCIF( str );
 }
return valid;
}

  var validCIF = function( cif ) {

    var match = cif.match( CIF_REGEX );
    var letter  = match[1],
        number  = match[2],
        control = match[3];

    var even_sum = 0;
    var odd_sum = 0;
    var n;

    for ( var i = 0; i < number.length; i++) {
      n = parseInt( number[i], 10 );

      // Odd positions (Even index equals to odd position. i=0 equals first position)
      if ( i % 2 === 0 ) {
        // Odd positions are multiplied first.
        n *= 2;

        // If the multiplication is bigger than 10 we need to adjust
        odd_sum += n < 10 ? n : n - 9;

      // Even positions
      // Just sum them
      } else {
        even_sum += n;
      }

    }

    var control_digit = (10 - (even_sum + odd_sum).toString().substr(-1)).toString().substr(-1) ;
    var control_letter = 'JABCDEFGHI'.substr( control_digit, 1 );

    // Control must be a digit
    if ( letter.match( /[ABEH]/ ) ) {
      return control == control_digit;

    // Control must be a letter
    } else if ( letter.match( /[KPQS]/ ) ) {
      return control == control_letter;

    // Can be either
    } else {
      return control == control_digit || control == control_letter;
    }

  };

  return ValidateCIF2;
})();


function validaCampos() {
	var res = true;
	if($('#modalEditarTaller #nombre').val().trim() == "") {
		$('#modalEditarTaller #nombre').addClass("border border-danger");
		$('#modalEditarTaller #labelNombre').html('Nombre (*) Campo Obligatorio');	
		$('#modalEditarTaller #labelNombre').css('color','red');
		res = false;
	}
	if($('#modalEditarTaller #cif').val().trim() == "") {
		$('#modalEditarTaller #cif').addClass("border border-danger");
		$('#modalEditarTaller #lblCif').html('CIF/NIF (*) Campo Obligatorio');	
		$('#modalEditarTaller #lblCif').css('color','red');
		res = false;
	}
	else if(ValidateCIF($('#modalEditarTaller #cif').val().trim()) == false && ValidateNIF($('#modalEditarTaller #cif').val().trim()) == false){
			$('#modalEditarTaller #cif').addClass("border border-danger");
			$('#modalEditarTaller #lblCif').html('CIF/NIF (*) Introduce un CIF/NIF v&aacutelido');	
			$('#modalEditarTaller #lblCif').css('color','red');
			res = false;
	}
	if(!($('#modalEditarTaller #email').val().trim()) == "" && validateEmail($('#modalEditarTaller #email').val().trim()) == false) {
		$('#modalEditarTaller #email').addClass("border border-danger");
		$('#modalEditarTaller #lblEmail').html('Email Introduce un email v&aacutelido');	
		$('#modalEditarTaller #lblEmail').css('color','red');
		res = false;
	}
	if($('#modalEditarTaller #codigoPostal').val().trim() != "") {
		var codPostalDosDig = $('#modalEditarTaller #codigoPostal').val().trim().substr(0, 2);
		var provDosDig = $('#modalEditarTaller #selectorProvincia').val();
		if($('#modalEditarTaller #codigoPostal').val().trim().length != 5) {
			$('#modalEditarTaller #codigoPostal').addClass("border border-danger");
			$('#modalEditarTaller #lblCodigoPostal').html('C&oacute;digo Postal: Debe tener 5 d&iacute;gitos');	
			$('#modalEditarTaller #lblCodigoPostal').css('color','red');
			res = false;
		}else{
			if(codPostalDosDig != provDosDig) {
				$('#modalEditarTaller #codigoPostal').addClass("border border-danger");
				$('#modalEditarTaller #lblCodigoPostal').html('C&oacute;digo Postal: No corresponde con la provincia');	
				$('#modalEditarTaller #lblCodigoPostal').css('color','red');
				$('#modalEditarTaller #selectorProvincia').addClass("border border-danger");
				$('#modalEditarTaller #lblProvincia').css('color','red');
				res = false;
			}
		}
	}
		return res;
}

function crearTaller() {
	if(validaCampos())
	{
		$.ajax({
		    type: 'POST',
		    url: './crearTaller',
		    data: $('#nuevoTaller').serialize() ,
		    success: function (data) {
				$('#modalEditarTaller').modal('hide');
				tablaTaller.ajax.reload();
				$("#alertaTallerOK").fadeIn(1500);
				setTimeout(function() {$("#alertaTallerOK").fadeOut(1500);},3000);			
    		},
			 error: function( jqXHR, textStatus, errorThrown ) {
				$('#modalEditarTaller').modal('hide');
				$("#alertaTallerKO").fadeIn(1500);
				setTimeout(function() {$("#alertaTallerKO").fadeOut(1500);},3000);
			 }
		});
	}
}

function modalEliminarTaller(id, nombre){
	$('#eliminarTaller #idModalEliminarTaller').text('Eliminar Taller: '+nombre);
	$('#eliminarTaller #idTallerEliminar').val(id);
	$('#modalEliminarTaller').modal('show');
}

function eliminarTaller() {
	$.ajax({
		    type: 'POST',
		    url: './eliminarTaller',
		    data: $('#eliminarTaller').serialize() ,
		    success: function (data) {
		    	$('#modalEliminarTaller').modal('hide');
				tablaTaller.ajax.reload();
				$("#alertaEliminarTallerOK").fadeIn(1500);
				setTimeout(function() {$("#alertaEliminarTallerOK").fadeOut(1500);},3000);		
    		},
			 error: function( jqXHR, textStatus, errorThrown ) {
			 	$('#modalEliminarTaller').modal('hide');
				$("#alertaEliminarTallerKO").fadeIn(1500);
				setTimeout(function() {$("#alertaEliminarTallerKO").fadeOut(1500);},3000);
			 }
		});
}

function resetModal() {
	$('#modalEditarTaller #nombre').removeClass("border border-danger");
	$('#modalEditarTaller #labelNombre').html('Nombre (*)');	
	$('#modalEditarTaller #labelNombre').css('color','black');
	$('#modalEditarTaller #cif').removeClass("border border-danger");
	$('#modalEditarTaller #lblCif').html('CIF/NIF (*)');	
	$('#modalEditarTaller #lblCif').css('color','black');
	$('#modalEditarTaller #email').removeClass("border border-danger");
	$('#modalEditarTaller #lblEmail').html('Email');	
	$('#modalEditarTaller #lblEmail').css('color','black');
}

//DATEPICKER
$(function() {
  $( "#fechaInicio" ).datepicker({
		dateFormat: 'dd/mm/yy',
		firstDay: 1,
		monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
		dayNamesMin: [ "Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
		onSelect: function(dateText){
			$("#fechaFin").datepicker('option', 'minDate', dateText);
			$('#modalServicioTaller #fechaInicio').removeClass("border border-danger");
			$('#modalServicioTaller #lblFechaInicioServicio').html('Fecha Inicio (*)');	
			$('#modalServicioTaller #lblFechaInicioServicio').css('color','black');
		}
	});
	
	$('#modalServicioTaller #fechaInicio').keydown(function(event){
		$('#modalServicioTaller #fechaInicio').removeClass("border border-danger");
		$('#modalServicioTaller #lblFechaInicioServicio').html('Fecha Inicio (*)');
		$('#modalServicioTaller #lblFechaInicioServicio').css('color','black');
	});
	
	$( "#fechaFin" ).datepicker({
		dateFormat: 'dd/mm/yy',
		firstDay: 1,
		monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
		dayNamesMin: [ "Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
		onSelect: function(dateText){
			$("#fechaInicio").datepicker('option', 'maxDate', dateText);
			$('#modalServicioTaller #fechaFin').removeClass("border border-danger");
			$('#modalServicioTaller #lblFechaFinServicio').html('Fecha Fin');	
			$('#modalServicioTaller #lblFechaFinServicio').css('color','black');
		}
	});
	
	$('#modalServicioTaller #fechaFin').keydown(function(event){
		$('#modalServicioTaller #fechaFin').removeClass("border border-danger");
		$('#modalServicioTaller #lblFechaFinServicio').html('Fecha Fin');
		$('#modalServicioTaller #lblFechaFinServicio').css('color','black');
	});	
	
	$('#modalEditarTaller #selectorProvincia').change(function() {
		// LIMPIAMOS LOS LABELS PARA PONERLOS COMO CORRESPONDE
		$('#modalEditarTaller #selectorProvincia').removeClass("border border-danger");
		$('#modalEditarTaller #lblProvincia').html('Provincia');
		$('#modalEditarTaller #lblProvincia').css('color','black');
		$('#modalEditarTaller #codigoPostal').removeClass("border border-danger");
		$('#modalEditarTaller #lblCodigoPostal').html('C&oacute;digo Postal');
		$('#modalEditarTaller #lblCodigoPostal').css('color','black');
    
		// INICIALIZAMOS EL SELECT DE MUNICIPIOS EN BASE A LA PROVINCIA SELECCIONADA
		var municipiosE = $("#modalEditarTaller #selectorMunicipio");
		var provinciasE = $("#modalEditarTaller #selectorProvincia").val();
		if (provinciasE !== '') {
			$("#modalEditarTaller #selectorMunicipio").prop('disabled', false);
			$.ajax({
				data: { provinciaId: provinciasE },
				url: './rellenaMunicipiosPorProvincia',
				type: 'POST',
				dataType: 'json',
				success: function(r) {
					municipiosE.children('option:not(:first)').remove();
					$(r).each(function(i, v) {
						municipiosE.append(new Option(v.nombre, v.id, false, false));
					});
				},
				error: function() {
					console.error('Error al cargar los municipios.');
				}
			});
		} else {
			$("#modalEditarTaller #selectorMunicipio").prop('disabled', true);
		}	 

	});
	
	$('#modalEditarTaller #codigoPostal').keydown(function(event) {
		$('#modalEditarTaller #selectorProvincia').removeClass("border border-danger");
		$('#modalEditarTaller #lblProvincia').html('Provincia');
		$('#modalEditarTaller #lblProvincia').css('color','black');
		$('#modalEditarTaller #codigoPostal').removeClass("border border-danger");
		$('#modalEditarTaller #lblCodigoPostal').html('C&oacute;digo Postal');
		$('#modalEditarTaller #lblCodigoPostal').css('color','black');	 
	});
});