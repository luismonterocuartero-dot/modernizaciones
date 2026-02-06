var tablaModelos;
var objetoAviso = document.getElementById('avisoPermisoModelo');
var permisoDeAcceso = $('#modalModelo #permisoActual').val();
$(document).ready(function() {
if(permisoDeAcceso == "EDITOR" || permisoDeAcceso == "ADMINISTRADOR")
{
	muestraBotonNuevo();
}
if(permisoDeAcceso != "SIN_PERMISO" && permisoDeAcceso != "" ) {
   tablaModelos = $('#tablaModelos').DataTable({
   	   "order": [[ 0, "desc" ]],
       ajax : {
			url: './tablaModelos',
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
	               title: 'Marca',
	               data:'nombreMarca'
	           },
	           {
	               title: 'Tipo de vehículo',
	               data:'nombreTipoVehiculo'
	           },
	           {
	               title: 'Alimentación',
	               data:'nombreAlimentacion'
	           },
	           {
				   title: 'Acciones',
				   render: function (data, type, row) {
				   	var visualizador= '<button type="button" id="ButtonMostrar" class="edit-modal btn btn-success" data-toggle="tooltip" data-placement="bottom" title="Mostrar datos de Modelo" onclick="muestraModelo('+row.id+')"><i class="fa fa-eye"></i></button>';
				   	var editor = '<button type="button" id="ButtonEditar" class="edit-modal btn btn-success" data-toggle="tooltip" data-placement="bottom" title="Editar Modelo" onclick="editarModelo('+row.id+')"><i class="fa fa-edit"></i></button>'
            		+ '&nbsp;' + '<button type="button" id="ButtonBorrar" class="edit-modal btn btn-success botonBorrar" data-toggle="tooltip" data-placement="bottom" title="Eliminar Modelo" onclick="modalEliminarModelo('+row.id+',\''+row.nombre+ '\')"><span class="fa fa-times"></span></button>';

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
	var myButton = document.getElementById('botonNuevoModelo');
  myButton.hidden = false;
}

function validaCampos() {
	var valido = true;
	if($('#modalModelo #selectorMarca').val() == "") {
		$('#modalModelo #selectorMarca').addClass("border border-danger");
		$('#modalModelo #etiquetaMarca').html('Marca (*) Campo Obligatorio');	
		$('#modalModelo #etiquetaMarca').css('color','red');
		valido = false;
	}
	if($('#modalModelo #selectorTipoVehiculo').val() == "") {
		$('#modalModelo #selectorTipoVehiculo').addClass("border border-danger");
		$('#modalModelo #etiquetaTipoVehiculo').html('Tipo Vehículo (*) Campo Obligatorio');	
		$('#modalModelo #etiquetaTipoVehiculo').css('color','red');
		valido = false;
	}
	if($('#modalModelo #selectorTipoAlimentacion').val() == "") {
		$('#modalModelo #selectorTipoAlimentacion').addClass("border border-danger");
		$('#modalModelo #etiquetaAlimentacion').html('Alimentación (*) Campo Obligatorio');	
		$('#modalModelo #etiquetaAlimentacion').css('color','red');
		valido = false;
	}
	if($('#modalModelo #nombre').val().trim() == "") {
		$('#modalModelo #nombre').addClass("border border-danger");
		$('#modalModelo #nombreLabel').html('Nombre (*) Campo Obligatorio');	
		$('#modalModelo #nombreLabel').css('color','red');
		valido = false;
	}

	return valido;
	
}

function nuevoModelo(){
	$('#modalModelo #cabecera').html('Nuevo Modelo');
	$('#modalModelo input').prop('disabled', false);
	$('#modalModelo select').prop('disabled', false);
	$('#modalModelo #idModelo').val("");
	$('#modalModelo').find('form')[0].reset();
	$('#modalModelo #guardarModelo').removeClass('btn-light');
	$('#modalModelo #guardarModelo').prop('disabled',false);
	$('#modalModelo').modal({
		keyboard: false,
		backdrop: 'static'
	});
}

function crearModelo() {
	if(validaCampos()){
		$.ajax({
			    type: 'POST',
			    url: './crearModelo',
			    data: $('#nuevoModelo').serialize() ,
			    success: function (data) {
			    	$('#modalModelo').modal('hide');
					tablaModelos.ajax.reload();
					$("#alertaModeloOK").fadeIn(1500);
					setTimeout(function() {$("#alertaModeloOK").fadeOut(1500);},3000);
	    		},
				 error: function( jqXHR, textStatus, errorThrown ) {
				 	$('#modalModelo').modal('hide');
					$("#alertaModeloKO").fadeIn(1500);
					setTimeout(function() {$("#alertaModeloKO").fadeOut(1500);},3000);
				}
		});
	}
}

function muestraModelo(id){
	$.ajax({
	    type: 'POST',
	    url: './obtenerModelo',
	    data: { id : id },
	    dataType: 'json',
	    success: function (data) {
	    	$('#modalModelo #cabecera').html('Datos del Modelo');
	    	$('#modalModelo #nombre').val(data.nombre);
	    	$('#modalModelo #cilindrada').val(data.cilindrada);
	    	$('#modalModelo #potencia').val(data.potencia); 
	    	$('#modalModelo #infoExtraTipoVehiculo').val(data.infoExtraTipoVehiculo);
	    	$('#modalModelo #infoExtraAlimentacion').val(data.infoExtraAlimentacion);
	    	if(data.fkParametroTipoVehiculo != null){
				$('#modalModelo #selectorTipoVehiculo').val(data.fkParametroTipoVehiculo.id);
			}
			if(data.fkParametroAlimentacion != null){
				$('#modalModelo #selectorTipoAlimentacion').val(data.fkParametroAlimentacion.id);
			}
			if(data.fkMarca != null){
				$('#modalModelo #selectorMarca').val(data.fkMarca.id);
			}
	    	$('#modalModelo input').prop('disabled', true);
			$('#modalModelo select').prop('disabled', true);
	    	$('#modalModelo #guardarModelo').addClass('btn-light');
			$('#modalModelo #guardarModelo').prop('disabled',true);
			$('#modalModelo').modal({
				keyboard: false,
				backdrop: 'static'
			});
		}
	});
}

function editarModelo(id){
	$.ajax({
	    type: 'POST',
	    url: './obtenerModelo',
	    data: { id : id },
	    dataType: 'json',
	    success: function (data) {
	    	$('#modalModelo #cabecera').html('Editar Modelo');
	    	$('#modalModelo #idModelo').val(data.id);
	    	$('#modalModelo #nombre').val(data.nombre);
	    	$('#modalModelo #cilindrada').val(data.cilindrada);
	    	$('#modalModelo #potencia').val(data.potencia);
	    	$('#modalModelo #infoExtraTipoVehiculo').val(data.infoExtraTipoVehiculo);
	    	$('#modalModelo #infoExtraAlimentacion').val(data.infoExtraAlimentacion);
	    	if(data.fkParametroTipoVehiculo != null){
				$('#modalModelo #selectorTipoVehiculo').val(data.fkParametroTipoVehiculo.id);
			}
			if(data.fkParametroAlimentacion != null){
				$('#modalModelo #selectorTipoAlimentacion').val(data.fkParametroAlimentacion.id);
			}
			if(data.fkMarca != null){
				$('#modalModelo #selectorMarca').val(data.fkMarca.id);
			}
	    	$('#modalModelo input').prop('disabled', false);
			$('#modalModelo select').prop('disabled', false);
	    	$('#modalModelo #guardarModelo').removeClass('btn-light');
			$('#modalModelo #guardarModelo').prop('disabled',false);
			$('#modalModelo').modal({
				keyboard: false,
				backdrop: 'static'
			});
		}
	});
}

function modalEliminarModelo(id, nombre) {
  $('#modalEliminarModelo #idModalEliminarModelo').text('Eliminar Modelo: '+nombre);
	$('#idModeloEliminar').val(id);
	$('#modalEliminarModelo').modal('show'); 
}

function eliminarModelo() {
	$.ajax({
		    type: 'POST',
		    url: './eliminarModelo',
		    data: $('#eliminarModelo').serialize() ,
		    success: function (data) {
		   		$('#modalEliminarModelo').modal('hide');
				tablaModelos.ajax.reload();
				$("#alertaEliminarModeloOK").fadeIn(1500);
				setTimeout(function() {$("#alertaEliminarModeloOK").fadeOut(1500);},3000);
    		},
			 error: function( jqXHR, textStatus, errorThrown ) {
				$('#modalEliminarModelo').modal('hide');
				$("#alertaEliminarModeloKO").fadeIn(1500);
				setTimeout(function() {$("#alertaEliminarModeloKO").fadeOut(1500);},3000);
			}
	});
}

$('#modalModelo #nombre').keydown(function(event){
	$('#modalModelo #nombre').removeClass("border border-danger");
	$('#modalModelo #nombreLabel').html('Nombre (*)');	
	$('#modalModelo #nombreLabel').css('color','black');
});

$('#modalModelo #selectorMarca').keydown(function(event){
	$('#modalModelo #selectorMarca').removeClass("border border-danger");
	$('#modalModelo #etiquetaMarca').html('Marca (*)');	
	$('#modalModelo #etiquetaMarca').css('color','black');
});

$('#modalModelo #selectorTipoVehiculo').keydown(function(event){
	$('#modalModelo #selectorTipoVehiculo').removeClass("border border-danger");
	$('#modalModelo #etiquetaTipoVehiculo').html('Tipo Vehículo (*)');	
	$('#modalModelo #etiquetaTipoVehiculo').css('color','black');
});

$('#modalModelo #selectorTipoAlimentacion').keydown(function(event){
	$('#modalModelo #selectorTipoAlimentacion').removeClass("border border-danger");
	$('#modalModelo #etiquetaAlimentacion').html('Alimentación (*)');	
	$('#modalModelo #etiquetaAlimentacion').css('color','black');
});
function resetModal() {
	$('#modalModelo #nombre').removeClass("border border-danger");
	$('#modalModelo #nombreLabel').html('Nombre (*)');	
	$('#modalModelo #nombreLabel').css('color','black');
	$('#modalModelo #selectorMarca').removeClass("border border-danger");
	$('#modalModelo #etiquetaMarca').html('Marca (*)');	
	$('#modalModelo #etiquetaMarca').css('color','black');
	$('#modalModelo #selectorTipoVehiculo').removeClass("border border-danger");
	$('#modalModelo #etiquetaTipoVehiculo').html('Tipo Vehículo (*)');	
	$('#modalModelo #etiquetaTipoVehiculo').css('color','black');
	$('#modalModelo #selectorTipoAlimentacion').removeClass("border border-danger");
	$('#modalModelo #etiquetaAlimentacion').html('Alimentación (*)');	
	$('#modalModelo #etiquetaAlimentacion').css('color','black');
}