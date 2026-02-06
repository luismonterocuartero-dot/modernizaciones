var tablaConceptos;
var objetoAviso = document.getElementById('avisoPermisoConcepto');
var permisoDeAcceso = $('#modalConcepto #permisoActual').val();
$(document).ready(function() {
if(permisoDeAcceso == "EDITOR" || permisoDeAcceso == "ADMINISTRADOR")
{	
	muestraBotonNuevo();
}
if(permisoDeAcceso != "SIN_PERMISO" && permisoDeAcceso != "" ) {
   tablaConceptos = $('#tablaConceptos').DataTable({
   	   "order": [[ 0, "desc" ]],
       ajax : {
			url: './tablaConceptos',
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
	               title: 'Precio Unitario',
	               data:'precioUnitario',
				   render: function (data, type, row) { return row.precioUnitario ? row.precioUnitario.replace(".", ",") : ""}
	           	},
	           	{
	               title: 'Kil&oacute;metros',
	               data:'kilometros',
				   render: function (data, type, row) { return row.kilometros ? row.kilometros.replace(".", ",") : ""}
	           	},
	           	{
	               title: 'D&iacute;as',
	               data:'dias'
	           	},
	           	{
				   title: 'Acciones',
				   render: function (data, type, row) {
				   
				   var visualizador = '<button type="button" id="ButtonMostrar" class="edit-modal btn btn-success" data-toggle="tooltip" data-placement="bottom" title="Mostrar datos de Concepto" onclick="muestraConcepto('+row.id+')"><i class="fa fa-eye"></i></button>';
				   var editor ='<button type="button" id="ButtonEditar" class="edit-modal btn btn-success" data-toggle="tooltip" data-placement="bottom" title="Editar Concepto" onclick="editarConcepto('+row.id+')"><i class="fa fa-edit"></i></button>'
	                + '&nbsp;' + '<button type="button" id="ButtonBorrar" class="edit-modal btn btn-success botonBorrar" data-toggle="tooltip" data-placement="bottom" title="Eliminar Concepto" onclick="modalEliminarConcepto('+row.id+')"><span class="fa fa-times"></span></button>';
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
	var myButton = document.getElementById('botonNuevoConcepto');
  myButton.hidden = false;
}


function nuevoConcepto(){
	$('#modalConcepto #cabecera').html('Nuevo Concepto');
	$('#modalConcepto #idConcepto').val("");
	$('#modalConcepto').find('form')[0].reset();
	$('#modalConcepto #nombreConcepto').prop('disabled', false);
	$('#modalConcepto #precioConcepto').prop('disabled', false);
	$('#modalConcepto #kilometrosConcepto').prop('disabled', false);
	$('#modalConcepto #diasConcepto').prop('disabled', false);
	$('#modalConcepto #guardarConcepto').removeClass('btn-light');
	$('#modalConcepto #guardarConcepto').prop('disabled',false);
	$('#modalConcepto').modal({
		keyboard: false,
		backdrop: 'static'
	});
}

function crearConcepto() {
	if(validaCampos()){
		$.ajax({
			    type: 'POST',
			    url: './crearConcepto',
			    data: $('#nuevoConcepto').serialize() ,
			    success: function (data) {
			    	$('#modalConcepto').modal('hide');
					tablaConceptos.ajax.reload();
					$("#alertaConceptoOK").fadeIn(1500);
					setTimeout(function() {$("#alertaConceptoOK").fadeOut(1500);},3000);
	    		},
				 error: function( jqXHR, textStatus, errorThrown ) {
					$('#modalConcepto').modal('hide');
					$("#alertaConceptoKO").fadeIn(1500);
					setTimeout(function() {$("#alertaConceptoKO").fadeOut(1500);},3000);
				}
		});
	}
}

function modalEliminarConcepto(id) {
	$('#modalEliminarConcepto #idModalEliminarConcepto').text('Eliminar Concepto');
	$('#idConceptoEliminar').val(id);
	$('#modalEliminarConcepto').modal('show'); 
}

function eliminarConcepto() {
	$.ajax({
		    type: 'POST',
		    url: './eliminarConcepto',
		    data: $('#eliminarConcepto').serialize() ,
		    success: function (data) {
		   		$('#modalEliminarConcepto').modal('hide');
				tablaConceptos.ajax.reload();
				$("#alertaEliminarConceptoOK").fadeIn(1500);
				setTimeout(function() {$("#alertaEliminarConceptoOK").fadeOut(1500);},3000);
    		},
			 error: function( jqXHR, textStatus, errorThrown ) {
				$('#modalEliminarConcepto').modal('hide');
				$("#alertaEliminarConceptoKO").fadeIn(1500);
				setTimeout(function() {$("#alertaEliminarConceptoKO").fadeOut(1500);},3000);
			}
	});
}

function editarConcepto(id){
	$.ajax({
	    type: 'POST',
	    url: './obtenerConcepto',
	    data: { id : id },
	    dataType: 'json',
	    success: function (data) {
			$('#modalConcepto #idConcepto').val(data.id);
	    	$('#modalConcepto #nombreConcepto').val(data.nombre);
	    	$('#modalConcepto #nombreConcepto').prop('disabled', false);
	    	if(data.precioUnitario != null && data.precioUnitario.includes('.')){
				$('#modalConcepto #precioConcepto').val(data.precioUnitario.replace(".", ","));
			}else{
				$('#modalConcepto #precioConcepto').val(data.precioUnitario);
			}
	    	$('#modalConcepto #precioConcepto').prop('disabled', false);
			if(data.kilometros != null && data.kilometros.includes('.')){
				$('#modalConcepto #kilometrosConcepto').val(data.kilometros.replace(".", ","));
			}else{
				$('#modalConcepto #kilometrosConcepto').val(data.kilometros);
			}
	    	$('#modalConcepto #kilometrosConcepto').prop('disabled', false);
	    	$('#modalConcepto #diasConcepto').val(data.dias);
	    	$('#modalConcepto #diasConcepto').prop('disabled', false);
	    	$('#modalConcepto #cabecera').html('Edici&oacute;n Concepto');
	    	$('#modalConcepto #guardarConcepto').removeClass('btn-light');
	    	$('#modalConcepto #guardarConcepto').prop('disabled',false);
			$('#modalConcepto').modal({
				keyboard: false,
				backdrop: 'static'
			});
		}
	});
}

function muestraConcepto(id){
	$.ajax({
	    type: 'POST',
	    url: './obtenerConcepto',
	    data: { id : id },
	    dataType: 'json',
	    success: function (data) {
	    	$('#modalConcepto #idConcepto').val(data.id);
			$('#modalConcepto #nombreConcepto').val(data.nombre);
	    	$('#modalConcepto #nombreConcepto').prop('disabled', true);
			if(data.precioUnitario != null && data.precioUnitario.includes('.')){
				$('#modalConcepto #precioConcepto').val(data.precioUnitario.replace(".", ","));
			}else{
				$('#modalConcepto #precioConcepto').val(data.precioUnitario);
			}
	    	$('#modalConcepto #precioConcepto').prop('disabled', true);
			if(data.kilometros != null && data.kilometros.includes('.')){
				$('#modalConcepto #kilometrosConcepto').val(data.kilometros.replace(".", ","));
			}else{
				$('#modalConcepto #kilometrosConcepto').val(data.kilometros);
			}
	    	$('#modalConcepto #kilometrosConcepto').prop('disabled', true);
			$('#modalConcepto #diasConcepto').val(data.dias);
	    	$('#modalConcepto #diasConcepto').prop('disabled', true);
	    	$('#modalConcepto #cabecera').html('Datos del Concepto');
	    	$('#modalConcepto #guardarConcepto').addClass('btn-light');
			$('#modalConcepto #guardarConcepto').prop('disabled',true);
			$('#modalConcepto').modal('show');
		}
	});
}

$('#modalConcepto #nombreConcepto').keydown(function(event){
	$('#modalConcepto #nombreConcepto').removeClass("border border-danger");
	$('#modalConcepto #nombreLabel').html('Nombre (*)');	
	$('#modalConcepto #nombreLabel').css('color','black');
});

$('#modalConcepto #precioConcepto').keydown(function(event){
	$('#modalConcepto #precioConcepto').removeClass("border border-danger");
	$('#modalConcepto #precioLabel').html('Precio Unitario (*)');	
	$('#modalConcepto #precioLabel').css('color','black');
});

$('#modalConcepto #kilometrosConcepto').keydown(function(event){
	$('#modalConcepto #kilometrosConcepto').removeClass("border border-danger");
	$('#modalConcepto #kilometroLabel').html('Kil&oacute;metros');	
	$('#modalConcepto #kilometroLabel').css('color','black');
});

$('#modalConcepto #diasConcepto').keydown(function(event){
	$('#modalConcepto #diasConcepto').removeClass("border border-danger");
	$('#modalConcepto #diaLabel').html('D&iacute;as');	
	$('#modalConcepto #diaLabel').css('color','black');
});

function validaCampos() {
	var valido = true;
	if($('#modalConcepto #nombreConcepto').val().trim() == "") {
		$('#modalConcepto #nombreConcepto').addClass("border border-danger");
		$('#modalConcepto #nombreLabel').html('Nombre (*) Campo Obligatorio');	
		$('#modalConcepto #nombreLabel').css('color','red');
		valido = false;
	}
	if($('#modalConcepto #precioConcepto').val().trim() == "") {
		$('#modalConcepto #precioConcepto').addClass("border border-danger");
		$('#modalConcepto #precioLabel').html('Precio Unitario (*) Campo Obligatorio');	
		$('#modalConcepto #precioLabel').css('color','red');
		valido = false;
	}
	if(!($('#modalConcepto #precioConcepto').val()) == "" && ValidateDecimal($('#modalConcepto #precioConcepto').val()) == false) {
		$('#modalConcepto #precioConcepto').addClass("border border-danger");	
		$('#modalConcepto #precioLabel').html('Solo se permite números enteros o con dos decimales como máximo');	
		$('#modalConcepto #precioLabel').css('color','red');
		valido = false;
	}
	if(!($('#modalConcepto #kilometrosConcepto').val()) == "" && ValidateDecimal($('#modalConcepto #kilometrosConcepto').val()) == false) {
		$('#modalConcepto #kilometrosConcepto').addClass("border border-danger");	
		$('#modalConcepto #kilometroLabel').html('Solo se permite números enteros o con dos decimales como máximo');	
		$('#modalConcepto #kilometroLabel').css('color','red');
		valido = false;
	}
	if(!($('#modalConcepto #diasConcepto').val()) == "" && ValidateEntero($('#modalConcepto #diasConcepto').val()) == false) {
		$('#modalConcepto #diasConcepto').addClass("border border-danger");	
		$('#modalConcepto #diaLabel').html('Solo se permite números enteros');	
		$('#modalConcepto #diaLabel').css('color','red');
		valido = false;
	}
	
	return valido;
}

// FUNCION QUE SOLO PERMITE NUMEROS ENTEROS O CON DOS DECIMALES
function ValidateDecimal(str) {
	var REGEX = /^\-?[0-9]+(?:\,[0-9]{1,2})?$/;
    var valid = false;
	if ( str.match( REGEX ) ) {
      valid = true;
    }
    return valid;
}

// FUNCION QUE SOLO PERMITE NUMEROS ENTEROS
function ValidateEntero(str) {
	var REGEX = /^[0-9]+$/;
    var valid = false;
	if ( str.match( REGEX ) ) {
      valid = true;
    }
    return valid;
}

// FUNCION QUE SOLO PERMITE INTRODUCIR CARACTERES NUMERICOS Y EL CARACTER ","
function soloNumerosDecimales(event){
	var regex = new RegExp("^[0-9,]+$");
	var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
	if (!regex.test(key)) {
		event.preventDefault();
		return false;
	}
}

// FUNCION QUE SOLO PERMITE INTRODUCIR CARACTERES NUMERICOS
function soloNumeros(event){
	var regex = new RegExp("^[0-9]+$");
	var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
	if (!regex.test(key)) {
		event.preventDefault();
		return false;
	}
}

function resetModal() {
	$('#modalConcepto #nombreConcepto').removeClass("border border-danger");
	$('#modalConcepto #nombreLabel').html('Nombre (*)');	
	$('#modalConcepto #nombreLabel').css('color','black');
	$('#modalConcepto #precioConcepto').removeClass("border border-danger");
	$('#modalConcepto #precioLabel').html('Precio Unitario (*)');	
	$('#modalConcepto #precioLabel').css('color','black');
	$('#modalConcepto #kilometrosConcepto').removeClass("border border-danger");
	$('#modalConcepto #kilometroLabel').html('Kil&oacute;metros');	
	$('#modalConcepto #kilometroLabel').css('color','black');
	$('#modalConcepto #diasConcepto').removeClass("border border-danger");
	$('#modalConcepto #diaLabel').html('D&iacute;as');	
	$('#modalConcepto #diaLabel').css('color','black');
}