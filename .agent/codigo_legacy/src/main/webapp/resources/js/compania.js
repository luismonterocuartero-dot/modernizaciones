var tablaCompanias;
var objetoAviso = document.getElementById('avisoPermisoCompania');
var permisoDeAcceso = $('#modalCompania #permisoActual').val();
$(document).ready(function() {
if(permisoDeAcceso == "EDITOR" || permisoDeAcceso == "ADMINISTRADOR")
{	
	muestraBotonNuevo();
}
if(permisoDeAcceso != "SIN_PERMISO" && permisoDeAcceso != "" ) {
   tablaCompanias = $('#tablaCompanias').DataTable({
   	   "order": [[ 0, "desc" ]],
       ajax : {
			url: './tablaCompanias',
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
	                var visualizador = '<button type="button" id="ButtonMostrar" class="edit-modal btn btn-success" data-toggle="tooltip" data-placement="bottom" title="Mostrar datos de la Compañia de seguro" onclick="muestraCompania('+row.id+')"><i class="fa fa-eye"></i></button>';
                  var editor = '<button type="button" id="ButtonEditar" class="edit-modal btn btn-success" data-toggle="tooltip" data-placement="bottom" title="Editar Compañía de seguro" onclick="editarCompania('+row.id+')"><i class="fa fa-edit"></i></button>'
            		        + '&nbsp;' + '<button type="button" id="ButtonBorrar" class="edit-modal btn btn-success botonBorrar" data-toggle="tooltip" data-placement="bottom" title="Eliminar Compañía de seguro" onclick="modalEliminarCompania('+row.id+')"><span class="fa fa-times"></span></button>';

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
	var myButton = document.getElementById('botonNuevaCompania');
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

function nuevaCompania(){
	$('#modalCompania #cabecera').html('Nueva Compañía de seguro');
	$('#modalCompania #idCompania').val("");
	$('#modalCompania input').prop('disabled', false);
	$('#modalCompania').find('form')[0].reset();
	$('#modalCompania #guardarCompania').removeClass('btn-light');
	$('#modalCompania #guardarCompania').prop('disabled',false);
	$('#modalCompania').modal({
		keyboard: false,
		backdrop: 'static'
	});
}

function crearCompania() {
	if(validaCampos()){
		$.ajax({
			    type: 'POST',
			    url: './crearCompania',
			    data: $('#nuevaCompania').serialize() ,
			    success: function (data) {
			    	$('#modalCompania').modal('hide');
					tablaCompanias.ajax.reload();
					$("#alertaCompaniaOK").fadeIn(1500);
					setTimeout(function() {$("#alertaCompaniaOK").fadeOut(1500);},3000);
	    		},
				 error: function( jqXHR, textStatus, errorThrown ) {
					$('#modalCompania').modal('hide');
					$("#alertaCompaniaKO").fadeIn(1500);
					setTimeout(function() {$("#alertaCompaniaKO").fadeOut(1500);},3000);
				}
		});
	}
}

function modalEliminarCompania(id) {
	$('#modalEliminarCompania #idModalEliminarCompania').text('Eliminar Compañía');
	$('#idCompaniaEliminar').val(id);
	$('#modalEliminarCompania').modal('show'); 
}

function eliminarCompania() {
	$.ajax({
		    type: 'POST',
		    url: './eliminarCompania',
		    data: $('#eliminarCompania').serialize() ,
		    success: function (data) {
		   		$('#modalEliminarCompania').modal('hide');
				tablaCompanias.ajax.reload();
				$("#alertaEliminarCompaniaOK").fadeIn(1500);
				setTimeout(function() {$("#alertaEliminarCompaniaOK").fadeOut(1500);},3000);
    		},
			 error: function( jqXHR, textStatus, errorThrown ) {
				$('#modalEliminarCompania').modal('hide');
				$("#alertaEliminarCompaniaKO").fadeIn(1500);
				setTimeout(function() {$("#alertaEliminarCompaniaKO").fadeOut(1500);},3000);
			}
	});
}

function editarCompania(id){
	$.ajax({
	    type: 'POST',
	    url: './obtenerCompania',
	    data: { id : id },
	    dataType: 'json',
	    success: function (data) {
			$('#modalCompania #cabecera').html('Edici&oacute;n Compa&ntilde;&iacute;a de seguro');
			$('#modalCompania #idCompania').val(data.id);
	    	$('#modalCompania #nombre').val(data.nombre);
			$('#modalCompania #contacto').val(data.contacto);
			$('#modalCompania #telefono').val(data.telefono);
			$('#modalCompania #direccion').val(data.direccion);
	    	if(data.activo == true){
				$('#modalCompania #activo').prop("checked", true);
			}else{
				$('#modalCompania #activo').prop("checked", false);
			}
			$('#modalCompania input').prop('disabled', false);
	    	$('#modalCompania #guardarCompania').removeClass('btn-light');
	    	$('#modalCompania #guardarCompania').prop('disabled',false);
			$('#modalCompania').modal({
				keyboard: false,
				backdrop: 'static'
			});
		}
	});
}

function muestraCompania(id){
	$.ajax({
	    type: 'POST',
	    url: './obtenerCompania',
	    data: { id : id },
	    dataType: 'json',
	    success: function (data) {
			$('#modalCompania #cabecera').html('Datos de la Compa&ntilde;&iacute;a de seguro');
	    	$('#modalCompania #nombre').val(data.nombre);
			$('#modalCompania #contacto').val(data.contacto);
			$('#modalCompania #telefono').val(data.telefono);
			$('#modalCompania #direccion').val(data.direccion);
	    	if(data.activo == true){
				$('#modalCompania #activo').prop("checked", true);
			}else{
				$('#modalCompania #activo').prop("checked", false);
			}
			$('#modalCompania input').prop('disabled', true);
	    	$('#modalCompania #guardarCompania').addClass('btn-light');
			$('#modalCompania #guardarCompania').prop('disabled',true);
			$('#modalCompania').modal({
				keyboard: false,
				backdrop: 'static'
			});
		}
	});
}

$('#modalCompania #nombre').keydown(function(event){
	$('#modalCompania #nombre').removeClass("border border-danger");
	$('#modalCompania #labelNombre').html('Nombre (*)');	
	$('#modalCompania #labelNombre').css('color','black');
});

function validaCampos() {
	if($('#modalCompania #nombre').val().trim() == "") {
		$('#modalCompania #nombre').addClass("border border-danger");
		$('#modalCompania #labelNombre').html('Nombre (*) Campo Obligatorio');	
		$('#modalCompania #labelNombre').css('color','red');

		return false;
	}else{
		return true;
	}
	
}

function resetModal() {
	$('#modalCompania #nombre').removeClass("border border-danger");
	$('#modalCompania #labelNombre').html('Nombre (*)');	
	$('#modalCompania #labelNombre').css('color','black');
}