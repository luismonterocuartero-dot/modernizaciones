var tablaMarcas;
var objetoAviso = document.getElementById('avisoPermisoMarca');
var permisoDeAcceso = $('#modalMarca #permisoActual').val();
$(document).ready(function() {
if(permisoDeAcceso == "EDITOR" || permisoDeAcceso == "ADMINISTRADOR")
{	
	muestraBotonNuevo();
}
if(permisoDeAcceso != "SIN_PERMISO" && permisoDeAcceso != "" ) {
   tablaMarcas = $('#tablaMarcas').DataTable({
   	   "order": [[ 0, "desc" ]],
       ajax : {
			url: './tablaMarcas',
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
				   title: 'Acciones',
				   render: function (data, type, row) {
				   	
				   	var visualizador= '<button type="button" id="ButtonMostrar" class="edit-modal btn btn-success" data-toggle="tooltip" data-placement="bottom" title="Mostrar datos de Marca" onclick="muestraMarca('+row.id+')"><i class="fa fa-eye"></i></button>';
				   	var editor = '<button type="button" id="ButtonEditar" class="edit-modal btn btn-success" data-toggle="tooltip" data-placement="bottom" title="Editar Marca" onclick="editarMarca('+row.id+')"><i class="fa fa-edit"></i></button>'
            		+ '&nbsp;' + '<button type="button" id="ButtonBorrar" class="edit-modal btn btn-success botonBorrar" data-toggle="tooltip" data-placement="bottom" title="Eliminar Marca" onclick="modalEliminarMarca('+row.id+')"><span class="fa fa-times"></span></button>';

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
	var myButton = document.getElementById('botonNuevaMarca');
  myButton.hidden = false;
}

function nuevaMarca(){
	$('#modalMarca #cabecera').html('Nueva Marca');
	$('#modalMarca #idMarca').val("");
	$('#modalMarca').find('form')[0].reset();
	$('#modalMarca #nombre').prop('disabled', false);
	$('#modalMarca #activo').prop('disabled', false);
	$('#modalMarca #guardarMarca').removeClass('btn-light');
	$('#modalMarca #guardarMarca').prop('disabled',false);
	$('#modalMarca').modal({
		keyboard: false,
		backdrop: 'static'
	});
}

// Maneja el evento "keypress" en cualquier parte del formulario
$('#modalMarca #nuevaMarca').keypress(function(event) {
    if (event.which === 13) { // Verifica si la tecla presionada es "Enter"
        event.preventDefault(); // Previene el comportamiento predeterminado del evento "Enter"
        // No hace nada al presionar "Enter" en cualquier parte del formulario
    }
});

function crearMarca() {
	if(validaCampos()){
		$.ajax({
			    type: 'POST',
			    url: './crearMarca',
			    data: $('#nuevaMarca').serialize() ,
			    success: function (data) {
			    	$('#modalMarca').modal('hide');
					tablaMarcas.ajax.reload();
					$("#alertaMarcaOK").fadeIn(1500);
					setTimeout(function() {$("#alertaMarcaOK").fadeOut(1500);},3000);
	    		},
				 error: function( jqXHR, textStatus, errorThrown ) {
					$('#modalMarca').modal('hide');
					$("#alertaMarcaKO").fadeIn(1500);
					setTimeout(function() {$("#alertaMarcaKO").fadeOut(1500);},3000);
				}
		});
	}
}

function modalEliminarMarca(id) {
	$('#modalEliminarMarca #idModalEliminarMarca').text('Eliminar Marca');
	$('#idMarcaEliminar').val(id);
	$('#modalEliminarMarca').modal('show'); 
}

function eliminarMarca() {
	$.ajax({
		    type: 'POST',
		    url: './eliminarMarca',
		    data: $('#eliminarMarca').serialize() ,
		    success: function (data) {
		   		$('#modalEliminarMarca').modal('hide');
				tablaMarcas.ajax.reload();
				$("#alertaEliminarMarcaOK").fadeIn(1500);
				setTimeout(function() {$("#alertaEliminarMarcaOK").fadeOut(1500);},3000);
    		},
			 error: function( jqXHR, textStatus, errorThrown ) {
				$('#modalEliminarMarca').modal('hide');
				$("#alertaEliminarMarcaKO").fadeIn(1500);
				setTimeout(function() {$("#alertaEliminarMarcaKO").fadeOut(1500);},3000);
			}
	});
}

function editarMarca(id){
	$.ajax({
	    type: 'POST',
	    url: './obtenerMarca',
	    data: { id : id },
	    dataType: 'json',
	    success: function (data) {
	    	$('#modalMarca #nombre').val(data.nombre);
	    	$('#modalMarca #nombre').prop('disabled', false);
	    	if(data.activo == true){
				$('#modalMarca #activo').prop("checked", true);
			}else{
				$('#modalMarca #activo').prop("checked", false);
			}
			$('#modalMarca #activo').prop('disabled', false);
	    	$('#modalMarca #idMarca').val(data.id);
	    	$('#modalMarca #cabecera').html('Edici&oacute;n Marca');
	    	$('#modalMarca #guardarMarca').removeClass('btn-light');
	    	$('#modalMarca #guardarMarca').prop('disabled',false);
			$('#modalMarca').modal({
				keyboard: false,
				backdrop: 'static'
			});
		}
	});
}

function muestraMarca(id){
	$.ajax({
	    type: 'POST',
	    url: './obtenerMarca',
	    data: { id : id },
	    dataType: 'json',
	    success: function (data) {
	    	$('#modalMarca #nombre').val(data.nombre);
	    	$('#modalMarca #nombre').prop('disabled', true);
	    	if(data.activo == true){
				$('#modalMarca #activo').prop("checked", true);
			}else{
				$('#modalMarca #activo').prop("checked", false);
			}
			$('#modalMarca #activo').prop('disabled', true);
	    	$('#modalMarca #idMarca').val(data.id);
	    	$('#modalMarca #cabecera').html('Datos de la Marca');
	    	$('#modalMarca #guardarMarca').addClass('btn-light');
			$('#modalMarca #guardarMarca').prop('disabled',true);
			$('#modalMarca').modal('show');
		}
	});
}

$('#modalMarca #nombre').keydown(function(event){
	$('#modalMarca #nombre').removeClass("border border-danger");
	$('#modalMarca #nombreLabel').html('Nombre (*)');	
	$('#modalMarca #nombreLabel').css('color','black');
});

function validaCampos() {
	if($('#modalMarca #nombre').val().trim() == "") {
		$('#modalMarca #nombre').addClass("border border-danger");
		$('#modalMarca #nombreLabel').html('Nombre (*) Campo Obligatorio');	
		$('#modalMarca #nombreLabel').css('color','red');
		
		return false;
	}else{
		return true;
	}
	
}

function resetModal() {
	$('#modalMarca #nombre').removeClass("border border-danger");
	$('#modalMarca #nombreLabel').html('Nombre (*)');	
	$('#modalMarca #nombreLabel').css('color','black');
}