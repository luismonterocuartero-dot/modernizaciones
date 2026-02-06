var tablaOperadoras;
var objetoAviso = document.getElementById('avisoPermisoOperadora');
var permisoDeAcceso = $('#modalOperadora #permisoActual').val();
$(document).ready(function() {
if(permisoDeAcceso == "EDITOR" || permisoDeAcceso == "ADMINISTRADOR")
{	
	muestraBotonNuevo();
}
if(permisoDeAcceso != "SIN_PERMISO" && permisoDeAcceso != "" ) {
   tablaOperadoras = $('#tablaOperadoras').DataTable({
   	   "order": [[ 0, "desc" ]],
       ajax : {
			url: './tablaOperadoras',
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
	               title: 'Teléfono',
	               data:'telefono'
	           	},
				{
	               title: 'Dirección',
	               data:'direccion'
	           	},
				{
	               title: 'Contacto',
	               data:'contacto'
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
				   	
				   	var visualizador= '<button type="button" id="ButtonMostrar" class="edit-modal btn btn-success" data-toggle="tooltip" data-placement="bottom" title="Mostrar datos de Operadora" onclick="muestraOperadora('+row.id+')"><i class="fa fa-eye"></i></button>';
				   	var editor = '<button type="button" id="ButtonEditar" class="edit-modal btn btn-success" data-toggle="tooltip" data-placement="bottom" title="Editar Operadora" onclick="editarOperadora('+row.id+')"><i class="fa fa-edit"></i></button>'
            		+ '&nbsp;' + '<button type="button" id="ButtonBorrar" class="edit-modal btn btn-success botonBorrar" data-toggle="tooltip" data-placement="bottom" title="Eliminar Operadora" onclick="modalEliminarOperadora('+row.id+')"><span class="fa fa-times"></span></button>';

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
	var myButton = document.getElementById('botonNuevaOperadora');
  myButton.hidden = false;
}

function soloNumeros(event){
  var regex = new RegExp("^[0-9,]+$");
  var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
  if (!regex.test(key)) {
    event.preventDefault();
    return false;
  }
}

function nuevaOperadora(){
	$('#modalOperadora #cabecera').html('Nueva Operadora');
	$('#modalOperadora #idOperadora').val("");
	$('#modalOperadora').find('form')[0].reset();
	$('#modalOperadora input').prop('disabled', false);
	$('#modalOperadora #guardarOperadora').removeClass('btn-light');
	$('#modalOperadora #guardarOperadora').prop('disabled',false);
	$('#modalOperadora').modal({
		keyboard: false,
		backdrop: 'static'
	});
}

// Maneja el evento "keypress" en cualquier parte del formulario
$('#modalOperadora #nuevaOperadora').keypress(function(event) {
    if (event.which === 13) { // Verifica si la tecla presionada es "Enter"
        event.preventDefault(); // Previene el comportamiento predeterminado del evento "Enter"
        // No hace nada al presionar "Enter" en cualquier parte del formulario
    }
});

function crearOperadora() {
	if(validaCampos()){
		$.ajax({
			    type: 'POST',
			    url: './crearOperadora',
			    data: $('#nuevaOperadora').serialize() ,
			    success: function (data) {
			    	$('#modalOperadora').modal('hide');
					tablaOperadoras.ajax.reload();
					$("#alertaOperadoraOK").fadeIn(1500);
					setTimeout(function() {$("#alertaOperadoraOK").fadeOut(1500);},3000);
	    		},
				 error: function( jqXHR, textStatus, errorThrown ) {
					$('#modalOperadora').modal('hide');
					$("#alertaOperadoraKO").fadeIn(1500);
					setTimeout(function() {$("#alertaOperadoraKO").fadeOut(1500);},3000);
				}
		});
	}
}

function modalEliminarOperadora(id) {
	$('#modalEliminarOperadora #idModalEliminarOperadora').text('Eliminar Operadora');
	$('#idOperadoraEliminar').val(id);
	$('#modalEliminarOperadora').modal('show'); 
}

function eliminarOperadora() {
	$.ajax({
		    type: 'POST',
		    url: './eliminarOperadora',
		    data: $('#eliminarOperadora').serialize() ,
		    success: function (data) {
		   		$('#modalEliminarOperadora').modal('hide');
				tablaOperadoras.ajax.reload();
				$("#alertaEliminarOperadoraOK").fadeIn(1500);
				setTimeout(function() {$("#alertaEliminarOperadoraOK").fadeOut(1500);},3000);
    		},
			 error: function( jqXHR, textStatus, errorThrown ) {
				$('#modalEliminarOperadora').modal('hide');
				$("#alertaEliminarOperadoraKO").fadeIn(1500);
				setTimeout(function() {$("#alertaEliminarOperadoraKO").fadeOut(1500);},3000);
			}
	});
}

function editarOperadora(id){
	$.ajax({
	    type: 'POST',
	    url: './obtenerOperadora',
	    data: { id : id },
	    dataType: 'json',
	    success: function (data) {
	    	$('#modalOperadora input').prop('disabled', false);
	    	$('#modalOperadora #nombre').val(data.nombre);
	    	$('#modalOperadora #contacto').val(data.contacto);
			$('#modalOperadora #telefono').val(data.telefono);
			$('#modalOperadora #direccion').val(data.direccion);
	    	if(data.activo == true){
				$('#modalOperadora #activo').prop("checked", true);
			}else{
				$('#modalOperadora #activo').prop("checked", false);
			}
			$('#modalOperadora #activo').prop('disabled', false);
	    	$('#modalOperadora #idOperadora').val(data.id);
	    	$('#modalOperadora #cabecera').html('Edici&oacute;n Operadora');
	    	$('#modalOperadora #guardarOperadora').removeClass('btn-light');
	    	$('#modalOperadora #guardarOperadora').prop('disabled',false);
			$('#modalOperadora').modal({
				keyboard: false,
				backdrop: 'static'
			});
		}
	});
}

function muestraOperadora(id){
	$.ajax({
	    type: 'POST',
	    url: './obtenerOperadora',
	    data: { id : id },
	    dataType: 'json',
	    success: function (data) {
	    	$('#modalOperadora #nombre').val(data.nombre);
	    	$('#modalOperadora input').prop('disabled', true);
	    	$('#modalOperadora #contacto').val(data.contacto);
			$('#modalOperadora #telefono').val(data.telefono);
			$('#modalOperadora #direccion').val(data.direccion);
	    	if(data.activo == true){
				$('#modalOperadora #activo').prop("checked", true);
			}else{
				$('#modalOperadora #activo').prop("checked", false);
			}
			$('#modalOperadora #activo').prop('disabled', true);
	    	$('#modalOperadora #idOperadora').val(data.id);
	    	$('#modalOperadora #cabecera').html('Datos de la Operadora');
	    	$('#modalOperadora #guardarOperadora').addClass('btn-light');
			$('#modalOperadora #guardarOperadora').prop('disabled',true);
			$('#modalOperadora').modal('show');
		}
	});
}

$('#modalOperadora #nombre').keydown(function(event){
	$('#modalOperadora #nombre').removeClass("border border-danger");
	$('#modalOperadora #labelNombre').html('Nombre (*)');	
	$('#modalOperadora #labelNombre').css('color','black');
});

function validaCampos() {
	if($('#modalOperadora #nombre').val().trim() == "") {
		$('#modalOperadora #nombre').addClass("border border-danger");
		$('#modalOperadora #labelNombre').html('Nombre (*) Campo Obligatorio');	
		$('#modalOperadora #labelNombre').css('color','red');
		
		return false;
	}else{
		return true;
	}
	
}

function resetModal() {
	$('#modalOperadora #nombre').removeClass("border border-danger");
	$('#modalOperadora #labelNombre').html('Nombre (*)');	
	$('#modalOperadora #labelNombre').css('color','black');
}