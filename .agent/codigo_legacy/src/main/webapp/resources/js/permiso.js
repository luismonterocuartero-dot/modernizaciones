var tablaPermisos;
var objetoAviso = document.getElementById('avisoPermiso');
var permisoDeAcceso = $('#modalPermiso #permisoActual').val();
$(document).ready(function() {
	if(permisoDeAcceso == "EDITOR" || permisoDeAcceso == "ADMINISTRADOR")
	{
		muestraBotonNuevo();
	}
	if(permisoDeAcceso != "SIN_PERMISO" && permisoDeAcceso != "" ) {
	    tablaPermisos = $('#tablaPermisos').DataTable({
	       "order": [[ 0, "desc" ]],
	       ajax : {
				url: './tablaPermisos',
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
		           	   title: 'Objeto',
		           	   data:'fkParametroObjeto.nombre'
		           },
		           {
					  title: 'Permiso',
					  render: function(data, type, row) {
					    var permisos = '';
					    if (row.edicion) {
					      permisos += 'Visualización y Edición';
					    }
					    if (row.visualizacion) {
					      permisos += 'Solo Visualización';
					    }
					    return permisos;
					  }
					},
		           {
					    title: 'Acciones',
					    render: function (data, type, row) {
						    var visualizador = '<button type="button" id="ButtonMostrar" class="edit-modal btn btn-success" data-toggle="tooltip" data-placement="bottom" title="Ver Permiso" onclick="muestraPermiso('+row.id+')"><i class="fa fa-eye"></i></button>';
							var editor = '<button type="button" id="ButtonEditar" class="edit-modal btn btn-success" data-toggle="tooltip" data-placement="bottom" title="Editar Permiso" onclick="editarPermiso('+row.id+')"><i class="fa fa-edit"></i></button>' +
								'&nbsp;' +
								'<button type="button" id="ButtonBorrar" class="edit-modal btn btn-success botonBorrar" data-toggle="tooltip" data-placement="bottom" title="Eliminar Permiso" onclick="modalEliminarPermiso('+row.id+')"><span class="fa fa-times"></span></button>';
							
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
	var myButton = document.getElementById('botonNuevoPermiso');
  	myButton.hidden = false;
}

function validaCampos() {
	var res = true;
	
	if($('#modalPermiso #nombre').val().trim() == "") {
		$('#modalPermiso #nombre').addClass("border border-danger");
		$('#modalPermiso #nombreLabel').html('Nombre (*) Campo Obligatorio');	
		$('#modalPermiso #nombreLabel').css('color','red');
		res = false;
	}
	if($('#modalPermiso #selectorObjeto').val() == "") {
		$('#modalPermiso #selectorObjeto').addClass("border border-danger");	
		$('#modalPermiso #etiquetaObjeto').html('Objeto (*) Campo Obligatorio');	
		$('#modalPermiso #etiquetaObjeto').css('color','red');
		res = false;
	}
	return res;
}

$("#modalPermiso #edicion").change(function() {
	if($('#modalPermiso #edicion').prop("checked"))	{
		$('#modalPermiso #visualizacion').prop("checked", false);
	}else{
		$('#modalPermiso #visualizacion').prop("checked", true);
	}
});

$("#modalPermiso #visualizacion").change(function() {
	if($('#modalPermiso #visualizacion').prop("checked")) {
		$('#modalPermiso #edicion').prop("checked", false);
	}else{
		$('#modalPermiso #edicion').prop("checked", true);
	}
	
});


function nuevoPermiso(){
	$('#modalPermiso #cabecera').html('Nuevo Permiso');
	$('#modalPermiso input').prop('disabled', false);
	$('#modalPermiso select').prop('disabled', false);
	$('#modalPermiso #idPermiso').val("");
	$('#modalPermiso').find('form')[0].reset();
	$('#modalPermiso #guardarPermiso').removeClass('btn-light');
	$('#modalPermiso #guardarPermiso').prop('disabled',false);
	$('#modalPermiso').modal({
		keyboard: false,
		backdrop: 'static'
	});
}

function crearPermiso() {
	if(validaCampos()){
		$.ajax({
			type: 'POST',
			url: './crearPermiso/',
			data: $('#nuevoPermiso').serialize() ,
			success: function (data) {
				$('#modalPermiso').modal('hide');
				tablaPermisos.ajax.reload();
				$("#alertaPermisoOK").fadeIn(1500);
				setTimeout(function() {$("#alertaPermisoOK").fadeOut(1500);},3000);
			},
			error: function( jqXHR, textStatus, errorThrown ) {
			 	$('#modalPermiso').modal('hide');
				$("#alertaPermisoKO").fadeIn(1500);
				setTimeout(function() {$("#alertaPermisoKO").fadeOut(1500);},3000);
			}
		});
	}
}

function muestraPermiso(id){
	$.ajax({
	    type: 'POST',
	    url: './obtenerPermiso',
	    data: { id : id },
	    dataType: 'json',
	    success: function (data) {
	    	$('#modalPermiso #cabecera').html('Datos del Permiso');
	    	$('#modalPermiso #nombre').val(data.nombre);
			if(data.fkParametroObjeto != null){
				$('#modalPermiso #selectorObjeto').val(data.fkParametroObjeto.id);
			}
	    	if(data.edicion == true){
				$('#modalPermiso #edicion').prop("checked", true);
			}else{
				$('#modalPermiso #edicion').prop("checked", false);
			}
			if(data.visualizacion == true){
				$('#modalPermiso #visualizacion').prop("checked", true);
			}else{
				$('#modalPermiso #visualizacion').prop("checked", false);
			}
			if(data.activo == true){
				$('#modalPermiso #activo').prop("checked", true);
			}else{
				$('#modalPermiso #activo').prop("checked", false);
			}
	    	$('#modalPermiso input').prop('disabled', true);
			$('#modalPermiso select').prop('disabled', true);
	    	$('#modalPermiso #guardarPermiso').addClass('btn-light');
			$('#modalPermiso #guardarPermiso').prop('disabled',true);
			$('#modalPermiso').modal({
				keyboard: false,
				backdrop: 'static'
			});
		}
	});
}

function editarPermiso(id){
	$.ajax({
	    type: 'POST',
	    url: './obtenerPermiso',
	    data: { id : id },
	    dataType: 'json',
	    success: function (data) {
	    	$('#modalPermiso #cabecera').html('Editar Permiso');
	    	$('#modalPermiso #idPermiso').val(data.id);
	    	$('#modalPermiso #nombre').val(data.nombre);
			if(data.fkParametroObjeto != null){
				$('#modalPermiso #selectorObjeto').val(data.fkParametroObjeto.id);
			}
	    	if(data.edicion == true){
				$('#modalPermiso #edicion').prop("checked", true);
			}else{
				$('#modalPermiso #edicion').prop("checked", false);
			}
			if(data.visualizacion == true){
				$('#modalPermiso #visualizacion').prop("checked", true);
			}else{
				$('#modalPermiso #visualizacion').prop("checked", false);
			}
			if(data.activo == true){
				$('#modalPermiso #activo').prop("checked", true);
			}else{
				$('#modalPermiso #activo').prop("checked", false);
			}
	    	$('#modalPermiso input').prop('disabled', false);
			$('#modalPermiso select').prop('disabled', false);
	    	$('#modalPermiso #guardarPermiso').removeClass('btn-light');
			$('#modalPermiso #guardarPermiso').prop('disabled',false);
			$('#modalPermiso').modal({
				keyboard: false,
				backdrop: 'static'
			});
		}
	});
}

function modalEliminarPermiso(id) {
	$('#modalEliminarPermiso #idModalEliminarPermiso').text('Eliminar Permiso');
	$('#idPermisoEliminar').val(id);
	$('#modalEliminarPermiso').modal('show'); 
}

function eliminarPermiso() {
	$.ajax({
		type: 'POST',
		url: './eliminarPermiso',
		data: $('#eliminarPermiso').serialize() ,
		success: function (data) {
			$('#modalEliminarPermiso').modal('hide');
			tablaPermisos.ajax.reload();
			$("#alertaEliminarPermisoOK").fadeIn(1500);
			setTimeout(function() {$("#alertaEliminarPermisoOK").fadeOut(1500);},3000);
    	},
		error: function( jqXHR, textStatus, errorThrown ) {
			$('#modalEliminarPermiso').modal('hide');
			$("#alertaEliminarPermisoKO").fadeIn(1500);
			setTimeout(function() {$("#alertaEliminarPermisoKO").fadeOut(1500);},3000);
		}
	});
}

$('#modalPermiso #nombre').keydown(function(event){
	$('#modalPermiso #nombre').removeClass("border border-danger");
	$('#modalPermiso #nombreLabel').html('Nombre (*)');	
	$('#modalPermiso #nombreLabel').css('color','black');
});

$('#modalPermiso #selectorObjeto').change(function(){
	$('#modalPermiso #selectorObjeto').removeClass("border border-danger");
	$('#modalPermiso #etiquetaObjeto').html('Objeto (*)');	
	$('#modalPermiso #etiquetaObjeto').css('color','black');
});

function resetModal() {
	$('#modalPermiso #nombre').removeClass("border border-danger");
	$('#modalPermiso #nombreLabel').html('Nombre (*)');	
	$('#modalPermiso #nombreLabel').css('color','black');
	$('#modalPermiso #selectorObjeto').removeClass("border border-danger");
	$('#modalPermiso #etiquetaObjeto').html('Objeto (*)');	
	$('#modalPermiso #etiquetaObjeto').css('color','black');
	$('#modalPermiso #edicion').removeClass("border border-danger");
	$('#modalPermiso #edicionLabel').html('Visualizacion y Edicion');	
	$('#modalPermiso #edicionLabel').css('color','black');
	$('#modalPermiso #visualizacion').removeClass("border border-danger");
	$('#modalPermiso #visualizacionLabel').html('Solo Visualizacion');	
	$('#modalPermiso #visualizacionLabel').css('color','black');
}