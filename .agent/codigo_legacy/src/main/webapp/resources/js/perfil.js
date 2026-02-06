var tablaPerfil;
var objetoAviso = document.getElementById('avisoPermisoPerfil');
var permisoDeAcceso = $('#modalEditarPerfil #permisoActual').val();
$(document).ready(function() {
if(permisoDeAcceso == "EDITOR" || permisoDeAcceso == "ADMINISTRADOR")
{
	muestraBotonNuevo();
}
if(permisoDeAcceso != "SIN_PERMISO" && permisoDeAcceso != "" ) {
   tablaPerfil = $('#tablaPerfil').DataTable({
       "order": [[ 0, "desc" ]],
       ajax : {
			url: './tablaPerfiles',
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
	               title: 'Activo',
	               render: function (data, type, row) {
   					return row.activo ? 'SI' : 'NO';
					}
	           },
			   {
	               title: 'Perf. por defecto',
	               render: function (data, type, row) {
   					return row.defecto ? 'SI' : 'NO';
					}
	           },
	           {
				   title: 'Acciones',
	               render: function (data, type, row) {
	               var visualizador = '<button type="button" id="ButtonMostrar" class="editar edit-modal btn btn-success" data-toggle="tooltip" data-placement="bottom" title="Mostrar datos de perfil" onclick="muestraPerfil('+row.id+')"><i class="fa fa-eye"></i></button>';
	               var editor = '<button type="button" id="ButtonEditar" class="editar edit-modal btn btn-success" data-toggle="tooltip" data-placement="bottom" title="Editar perfil" onclick="editarPerfil('+row.id+')"><i class="fa fa-edit"></i></button>'                          
            			 + '&nbsp;' + '<button type="button" id="ButtonBorrar" class="editar edit-modal btn btn-success botonBorrar" data-toggle="tooltip" data-placement="bottom" title="Eliminar perfil" onclick="modalEliminarPerfil('+row.id+',\''+row.nombre+ '\')"><span class="fa fa-times"></span></button>';
	               
	               	if (permisoDeAcceso == "VISUALIZADOR") {
								return visualizador;
					} else if (permisoDeAcceso == "ADMINISTRADOR" || permisoDeAcceso == "EDITOR") {
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
	var myButton = document.getElementById('botonNuevoPerfil');
  	myButton.hidden = false;
}

function soloLetras(event){
  var regex = new RegExp("^[a-zA-Z]+$");
  var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);

  if (!regex.test(key)) {
    event.preventDefault();
    return false;
  }
}

function muestraPerfil(id){
	editarPerfil(id);
	$('#modalEditarPerfil input').prop('disabled', true);
	$('#modalEditarPerfil select').prop('disabled', true);
	$('#modalEditarPerfil textarea').prop('disabled', true);
	$('#modalEditarPerfil #cabecera').html('Datos del Perfil');
	$('#modalEditarPerfil #guardarPerfil').addClass('btn-light');
	$('#modalEditarPerfil #guardarPerfil').prop('disabled',true);
}

function editarPerfil(id){
	$('#modalEditarPerfil input').prop('disabled', false);
	$('#modalEditarPerfil select').prop('disabled', false);
	$('#modalEditarPerfil textarea').prop('disabled', false);
	$('#modalEditarPerfil #cabecera').html('Edici&oacute;n Perfil');
	$('#modalEditarPerfil #guardarPerfil').removeClass('btn-light');
	$('#modalEditarPerfil #guardarPerfil').prop('disabled',false);
	$.ajax({
		data: { id : id },
		url: './obtenerPerfil',
		type : 'POST',
		dataType: 'json',
		success: function(data)
		{
			$('#modalEditarPerfil input[name="nombre"]').val(data.nombre);
			if(data.activo == true)
				$('#modalEditarPerfil #activo').prop("checked", true);
			else
				$('#modalEditarPerfil #activo').prop("checked", false);
			if(data.defecto == true)
				$('#modalEditarPerfil #defecto').prop("checked", true);
			else
				$('#modalEditarPerfil #defecto').prop("checked", false);
			$('#modalEditarPerfil #idPerfilActualiza').val(data.id);
			$('#modalEditarPerfil').modal({
				keyboard: false,
				backdrop: 'static'
			});
		},
	});
}


function nuevoPerfil() {
	$('#modalEditarPerfil #cabecera').html('Nuevo Perfil');
	$('#modalEditarPerfil #idPerfilActualiza').val("");
	$('#modalEditarPerfil input').prop('disabled', false);
	$('#modalEditarPerfil select').prop('disabled', false);
	$('#modalEditarPerfil textarea').prop('disabled', false);
	$('#modalEditarPerfil #guardarPerfil').removeClass('btn-light');
	$('#modalEditarPerfil #guardarPerfil').prop('disabled',false);
	$('#modalEditarPerfil').find('form')[0].reset();
	$('#modalEditarPerfil').modal({
		keyboard: false,
		backdrop: 'static'
	});
}

$('#modalEditarPerfil #nombre').keydown(function(event){
	$('#modalEditarPerfil #nombre').removeClass("border border-danger");
	$('#modalEditarPerfil #labelNombre').html('Nombre (*)');	
	$('#modalEditarPerfil #labelNombre').css('color','black');
});

function validaCampos() {
	if($('#modalEditarPerfil #nombre').val().trim() == "") {
		$('#modalEditarPerfil #nombre').addClass("border border-danger");
		$('#modalEditarPerfil #labelNombre').html('Nombre (*) Campo Obligatorio');	
		$('#modalEditarPerfil #labelNombre').css('color','red');
	
		return false;
	}else{
		return true;
	}
}

function crearPerfil() {
	if(validaCampos())
	{
		$.ajax({
		    type: 'POST',
		    url: './crearPerfil',
		    data: $('#nuevoPerfil').serialize() ,
		    success: function (data) {
				$('#modalEditarPerfil').modal('hide');
				tablaPerfil.ajax.reload();
				$("#alertaPerfilOK").fadeIn(1500);
				setTimeout(function() {$("#alertaPerfilOK").fadeOut(1500);},3000);			
    		},
			 error: function( jqXHR, textStatus, errorThrown ) {
				$('#modalEditarPerfil').modal('hide');
				$("#alertaPerfilKO").fadeIn(1500);
				setTimeout(function() {$("#alertaPerfilKO").fadeOut(1500);},3000);
			 }
		});
	}
}

function modalEliminarPerfil(id, nombre){
	$('#modalEliminarPerfil #idModalEliminarPerfil').text('Eliminar Perfil: '+nombre);
	$('#eliminarPerfil #idPerfilEliminar').val(id);
	$('#modalEliminarPerfil').modal('show');
}

function eliminarPerfil() {
	$.ajax({
		    type: 'POST',
		    url: './eliminarPerfil',
		    data: $('#eliminarPerfil').serialize() ,
		    success: function (data) {
		    	$('#modalEliminarPerfil').modal('hide');
				tablaPerfil.ajax.reload();
				$("#alertaEliminarPerfilOK").fadeIn(1500);
				setTimeout(function() {$("#alertaEliminarPerfilOK").fadeOut(1500);},3000);		
    		},
			 error: function( jqXHR, textStatus, errorThrown ) {
			 	$('#modalEliminarPerfil').modal('hide');
				$("#alertaEliminarPerfilKO").fadeIn(1500);
				setTimeout(function() {$("#alertaEliminarPerfilKO").fadeOut(1500);},3000);
			 }
		});
}

function resetModal() {
	$('#modalEditarPerfil #nombre').removeClass("border border-danger");
	$('#modalEditarPerfil #labelNombre').html('Nombre (*)');	
	$('#modalEditarPerfil #labelNombre').css('color','black');
}