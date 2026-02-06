var tablaParametros;
var objetoAviso = document.getElementById('avisoPermisoParametro');
var permisoDeAcceso = $('#modalParametro #permisoActual').val();
$(document).ready(function() {
if(permisoDeAcceso == "EDITOR" || permisoDeAcceso == "ADMINISTRADOR")
{
	muestraBotonNuevo();
}
if(permisoDeAcceso != "SIN_PERMISO" && permisoDeAcceso != "" ) {
   tablaParametros = $('#tablaParametros').DataTable({
   	   "order": [[ 0, "desc" ]],
       ajax : {
			url: './tablaParametros',
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
	               title: 'Centro Directivo',
	               render: function (data, type, row) { return row.centroDirectivo?row.centroDirectivo.nombre:""}	               
	           	},
	           	{
	               title: 'Tipo Par&aacute;metro',
	               data:'tipoParametro.nombre'
	           	},
	           	{
	               title: 'Informaci&oacute;n Extra',
	               data:'literalExtra'
	           	},	         	
	           	{
	               title: 'Activo',
  				   render: function (data, type, row) {
    					return row.activo ? 'SI' : 'NO';
					}
	           	},
	           	{
				   title: 'Acciones',
				   render: function (data, type, row) {
				    var visualizador = '<button type="button" id="ButtonMostrar" class="edit-modal btn btn-success" data-toggle="tooltip" data-placement="bottom" title="Mostrar datos de Parametro" onclick="muestraParametro('+row.id+')"><i class="fa fa-eye"></i></button>';
				   	var editor = '<button type="button" id="ButtonEditar" class="edit-modal btn btn-success" data-toggle="tooltip" data-placement="bottom" title="Editar Parametro" onclick="editarParametro('+row.id+')"><i class="fa fa-edit"></i></button>'                          
            		+ '&nbsp;' + '<button type="button" id="ButtonBorrar" class="edit-modal btn btn-success botonBorrar" data-toggle="tooltip" data-placement="bottom" title="Eliminar Parametro" onclick="modalEliminarParametro('+row.id+')"><span class="fa fa-times"></span></button>';

					//IIM SVEHI-391
	               	if (permisoDeAcceso == "VISUALIZADOR" || ((permisoDeAcceso == "ADMINISTRADOR" || permisoDeAcceso == "EDITOR") && row.tipoParametro.modif == false)) {
								return visualizador;
					//IIM SVEHI-391
					} else if ((permisoDeAcceso == "ADMINISTRADOR" || permisoDeAcceso == "EDITOR") && row.tipoParametro.modif == true) {
					//IIM SVEHI-391
								return visualizador + '&nbsp;' + editor;
					} else {
								return '';
					}
	               }
	           }],
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
	var myButton = document.getElementById('botonNuevoParametro');
  myButton.hidden = false;
}

$("#datosExtra").change(function(){
	if($('#datosExtra').is(':checked'))
	{
		$('#modalParametro #literalExtra').prop('disabled', false);
		$('#modalParametro #LblLiteralExtra').html('Informaci&oacute;n Extra (*)');
	}
	else{
		$('#modalParametro #literalExtra').prop('disabled', true);
		$('#modalParametro #literalExtra').val("");
		$('#modalParametro #literalExtra').removeClass("border border-danger");
		$('#modalParametro #LblLiteralExtra').html('Informaci&oacute;n Extra');	
		$('#modalParametro #LblLiteralExtra').css('color','black');
	}
});

function nuevoParametro(){
	//IIM SVEHI-391
	$('#modalParametro #selectorTipoParametro option[value="temp"]').prop('hidden',true);
	//IIM SVEHI-391
	$('#modalParametro #cabecera').html('Nuevo Par&aacute;metro');
	$('#modalParametro #idParametro').val("");	
	$('#modalParametro input').prop('disabled', false);
	$('#modalParametro select').prop('disabled', false);
	$('#modalParametro #guardarParametro').removeClass('btn-light');
	$('#modalParametro #guardarParametro').prop('disabled',false);
	$('#modalParametro #LblLiteralExtra').html('Informaci&oacute;n Extra (*)');
	$('#modalParametro').find('form')[0].reset();
	$('#modalParametro').modal({
		keyboard: false,
		backdrop: 'static'
	});
}

function crearParametro() {
	if(validaCampos()){
		$.ajax({
			    type: 'POST',
			    url: './crearParametro',
			    data: $('#nuevoParametro').serialize(),
			    success: function (data) {
			    	$('#modalParametro').modal('hide');
					tablaParametros.ajax.reload();
					$("#alertaParametroOK").fadeIn(1500);
					setTimeout(function() {$("#alertaParametroOK").fadeOut(1500);},3000);
	    		},
				 error: function( jqXHR, textStatus, errorThrown ) {
					$('#modalParametro').modal('hide');
					$("#alertaParametroKO").fadeIn(1500);
					setTimeout(function() {$("#alertaParametroKO").fadeOut(1500);},3000);
				}
		});
	}
}

function modalEliminarParametro(id) {
	$('#modalEliminarParametro #idModalEliminarParametro').text('Eliminar Par\u00e1metro');
	$('#modalEliminarParametro #idParametroEliminar').val(id);
	$('#modalEliminarParametro').modal('show'); 
}

function eliminarParametro() {
	$.ajax({
		    type: 'POST',
		    url: './eliminarParametro',
		    data: $('#eliminarParametro').serialize() ,
		    success: function (data) {
		   		$('#modalEliminarParametro').modal('hide');
				tablaParametros.ajax.reload();
				$("#alertaEliminarParametroOK").fadeIn(1500);
				setTimeout(function() {$("#alertaEliminarParametroOK").fadeOut(1500);},3000);
    		},
			 error: function( jqXHR, textStatus, errorThrown ) {
				$('#modalEliminarParametro').modal('hide');
				$("#alertaEliminarParametroKO").fadeIn(1500);
				setTimeout(function() {$("#alertaEliminarParametroKO").fadeOut(1500);},3000);
			}
	});
}

function editarParametro(id){
	$.ajax({
	    type: 'POST',
	    url: './obtenerParametro',
	    data: { id : id },
	    dataType: 'json',
	    success: function (data) {
			$('#modalParametro #cabecera').html('Editar Par&aacute;metro');
			$('#modalParametro #idParametro').val(data.id);
			$('#modalParametro #nombre').val(data.nombre);
			$('#modalParametro #literalExtra').val(data.literalExtra);
			if(data.activo == true){
				$('#modalParametro #activo').prop("checked", true);
			}else{
				$('#modalParametro #activo').prop("checked", false);
			}
			if(data.datosExtra == true){
				$('#modalParametro #datosExtra').prop("checked", true);
				$('#modalParametro #literalExtra').prop('disabled', false);
				$('#modalParametro #LblLiteralExtra').html('Informaci&oacute;n Extra (*)');
			}else{
				$('#modalParametro #datosExtra').prop("checked", false);
				$('#modalParametro #literalExtra').prop('disabled', true);
				$('#modalParametro #LblLiteralExtra').html('Informaci&oacute;n Extra');
			}
			if(data.tipoParametro != null){
				$('#modalParametro #selectorTipoParametro').val(data.tipoParametro.id);
			}
			if(data.centroDirectivo != null && data.centroDirectivo!=""){
				$('#modalParametro #selectorCentroDirectivo').val(data.centroDirectivo.id);
			}
			else
			{
				$('#modalParametro #selectorCentroDirectivo').val("");
			}
			
			$('#modalParametro #activo').prop('disabled', false);
			$('#modalParametro #datosExtra').prop('disabled', false);
			$('#modalParametro #idParametro').prop('disabled', false);
			$('#modalParametro #nombre').prop('disabled', false);
			$('#modalParametro select').prop('disabled', false);
	    	$('#modalParametro #guardarParametro').removeClass('btn-light');
			$('#modalParametro #guardarParametro').prop('disabled',false);
			$('#modalParametro').modal({
				keyboard: false,
				backdrop: 'static'
			});
		}
	});
}

function muestraParametro(id){
	$.ajax({
	    type: 'POST',
	    url: './obtenerParametro',
	    data: { id : id },
	    dataType: 'json',
	    success: function (data) {
	    	$('#modalParametro #cabecera').html('Datos del Par&aacute;metro');
	    	$('#modalParametro #nombre').val(data.nombre);
	    	$('#modalParametro #idParametro').val(data.id);
	    	$('#modalParametro #literalExtra').val(data.literalExtra);   	
	    	if(data.activo == true){
				$('#modalParametro #activo').prop("checked", true);
			}else{
				$('#modalParametro #activo').prop("checked", false);
			}
			if(data.datosExtra == true){
				$('#modalParametro #datosExtra').prop("checked", true);
				$('#modalParametro #LblLiteralExtra').html('Informaci&oacute;n Extra (*)');
			}else{
				$('#modalParametro #datosExtra').prop("checked", false);
				$('#modalParametro #LblLiteralExtra').html('Informaci&oacute;n Extra');
			}
			if(data.tipoParametro != null){
				//IIM SVEHI-391
				if (data.tipoParametro.modif == false){
					$('#modalParametro #selectorTipoParametro option[value="temp"]').prop('hidden',false);
					$('#modalParametro #selectorTipoParametro option[value="temp"]').text(data.tipoParametro.nombre);
					$('#modalParametro #selectorTipoParametro').val('temp');
				} else{
					$('#modalParametro #selectorTipoParametro').val(data.tipoParametro.id);
				}
				//IIM SVEHI-391
			}

			if(data.centroDirectivo != null && data.centroDirectivo!=""){
				$('#modalParametro #selectorCentroDirectivo').val(data.centroDirectivo.id);
			}
			else
			{
				$('#modalParametro #selectorCentroDirectivo').val("");
			}

			$('#modalParametro #activo').prop('disabled', true);
			$('#modalParametro #datosExtra').prop('disabled', true);
	    	$('#modalParametro input').prop('disabled', true);
			$('#modalParametro select').prop('disabled', true);
	    	$('#modalParametro #guardarParametro').addClass('btn-light');
			$('#modalParametro #guardarParametro').prop('disabled',true);
			$('#modalParametro').modal({
				keyboard: false,
				backdrop: 'static'
			});
		}
	});
}

$('#modalParametro #nombre').keydown(function(event){
	$('#modalParametro #nombre').removeClass("border border-danger");
	$('#modalParametro #Lblnombre').html('Nombre (*)');	
	$('#modalParametro #Lblnombre').css('color','black');
});

$("#selectorTipoParametro").change(function() {
	$('#modalParametro #selectorTipoParametro').removeClass("border border-danger");
	$('#modalParametro #LblTipoParametro').html('Tipo Par&aacute;metro (*)');	
	$('#modalParametro #LblTipoParametro').css('color','black');
});

if($('#datosExtra').prop("checked")==true){
$('#modalParametro #literalExtra').keydown(function(event){
	$('#modalParametro #literalExtra').removeClass("border border-danger");
	$('#modalParametro #LblLiteralExtra').html('Informaci&oacute;n Extra (*)');	
	$('#modalParametro #LblLiteralExtra').css('color','black');
});
}	

function validaCampos() {
	var valido = true;
	if($('#modalParametro #nombre').val().trim() == "") {
		valido = false;
		$('#modalParametro #nombre').addClass("border border-danger");
		$('#modalParametro #Lblnombre').html('Nombre (*) Campo Obligatorio');	
		$('#modalParametro #Lblnombre').css('color','red');
	}
	if($('#modalParametro #selectorTipoParametro').val() == "") {
		valido = false;
		$('#modalParametro #selectorTipoParametro').addClass("border border-danger");
		$('#modalParametro #LblTipoParametro').html('Tipo Par&aacute;metro (*) Campo Obligatorio');	
		$('#modalParametro #LblTipoParametro').css('color','red');
	}
	if($('#datosExtra').is(':checked') && $('#modalParametro #literalExtra').val().trim() == ""){
		valido = false;
		$('#modalParametro #literalExtra').addClass("border border-danger");
		$('#modalParametro #LblLiteralExtra').html('Informaci&oacute;n Extra (*) Campo Obligatorio');	
		$('#modalParametro #LblLiteralExtra').css('color','red');
	}
	
	return valido;
}

function resetModal() {
	$('#modalParametro #nombre').removeClass("border border-danger");
	$('#modalParametro #Lblnombre').html('Nombre (*)');	
	$('#modalParametro #Lblnombre').css('color','black');
	$('#modalParametro #selectorTipoParametro').removeClass("border border-danger");
	$('#modalParametro #LblTipoParametro').html('Tipo Par&aacute;metro (*)');	
	$('#modalParametro #LblTipoParametro').css('color','black');
	$('#modalParametro #literalExtra').removeClass("border border-danger");
	$('#modalParametro #LblLiteralExtra').html('Informaci&oacute;n Extra');	
	$('#modalParametro #LblLiteralExtra').css('color','black');
}
