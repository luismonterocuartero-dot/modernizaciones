var tablaPermisos;
var objetoAviso = document.getElementById('avisoPermisoUsuario');
var permisoDeAcceso = $('#modalUsuario #permisoActual').val();
var idSesionActual = $('#modalUsuario #idSesionActual').val();
$(document).ready(function() {
	if(permisoDeAcceso == "EDITOR" || permisoDeAcceso == "ADMINISTRADOR")
	{
		muestraBotonNuevo();
	}
	if(permisoDeAcceso != "SIN_PERMISO" && permisoDeAcceso != "" ) {
	   tablaUsuarios = $('#tablaUsuarios').DataTable({
	       "order": [[ 0, "desc" ]],
	       ajax : {
				url: './tablaUsuarios',
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
		           	   title: 'Apellido 1',
		           	   data:'apellido1'
		           },
		           {
		           	   title: 'Apellido 2',
		           	   data:'apellido2'
		           },
		           {
		               title: 'DNI',
		               data:'nif'
		           },
		           {
		               title: 'Servicio Adscrito',
		               data:'fkServicioAdscrito.nombre'
		           },
		           {
		               title: 'Perfil',
		               data:'fkPerfil.nombre'
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
			                var visualizador ='<button type="button" id="ButtonMostrar" class="edit-modal btn btn-success" data-toggle="tooltip" data-placement="bottom" title="Ver Usuario" onclick="muestraUsuario('+row.id+')"><i class="fa fa-eye"></i></button>';
			                var editor = '<button type="button" id="ButtonEditar" class="edit-modal btn btn-success" data-toggle="tooltip" data-placement="bottom" title="Editar Usuario" onclick="editarUsuario('+row.id+')"><i class="fa fa-edit"></i></button>';
							var administrador = '<button type="button" id="ButtonAsignarPerm" class="edit-modal btn btn-info" data-toggle="tooltip" data-placement="bottom" title="Permisos Usuario" onclick="asignarPermisoUsuario('+row.id+')"><i class="fa fa-cog"></i></button>';
		            		//+ '&nbsp;' + '<button type="button" id="ButtonBorrar" class="edit-modal btn btn-success botonBorrar" data-toggle="tooltip" data-placement="bottom" title="Eliminar Usuario" onclick="modalEliminarUsuario('+row.id+',\''+row.nombre+ '\',\''+row.apellido1+ '\',\''+row.apellido2+ '\')"><span class="fa fa-times"></span></button>';

			                if (permisoDeAcceso == "VISUALIZADOR") {
								return visualizador;
							} else if (permisoDeAcceso == "ADMINISTRADOR" || permisoDeAcceso == "EDITOR") {
								if (row.fkPerfil.nombre == "ADMINISTRADOR") {
									return visualizador + '&nbsp;' + editor;
								}else{
									return visualizador + '&nbsp;' + editor + '&nbsp;' + administrador;
								}
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

function muestraBotonNuevo(){
	var myButton = document.getElementById('botonNuevoUsuario');
	myButton.hidden = false;
}

function soloLetras(event){
  var regex = new RegExp("^[a-zA-Z-ñÑáéíóúÁÉÍÓÚ ]+$");
  var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);

  if (!regex.test(key)) {
    event.preventDefault();
    return false;
  }
}

var ValidateSpanishID = (function() {
  'use strict';
  
  var DNI_REGEX = /^(\d{8})([A-Z])$/;
  var CIF_REGEX = /^([ABCDEFGHJKLMNPQRSUVW])(\d{7})([0-9A-J])$/;
  var NIE_REGEX = /^[XYZ]\d{7,8}[A-Z]$/;

  var ValidateSpanishID2 = function( str ) {

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
      case 'cif':
        valid = validCIF( str );
        break;
    }

    return valid;
    

  };

  var spainIdType = function( str ) {
    if ( str.match( DNI_REGEX ) ) {
      return 'dni';
    }
    if ( str.match( CIF_REGEX ) ) {
      return 'cif';
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

  return ValidateSpanishID2;
})();


function validaCampos() {
	var res = true;
	
	if($('#modalUsuario #nombre').val().trim() == "") {
		$('#modalUsuario #nombre').addClass("border border-danger");
		$('#modalUsuario #nombreLabel').html('Nombre (*) Campo Obligatorio');	
		$('#modalUsuario #nombreLabel').css('color','red');
		res = false;
	}
	if($('#modalUsuario #apellido1').val().trim() == "") {
		$('#modalUsuario #apellido1').addClass("border border-danger");
		$('#modalUsuario #apellido1Label').html('Apellido 1 (*) Campo Obligatorio');	
		$('#modalUsuario #apellido1Label').css('color','red');
		res = false;
	}
	if($('#modalUsuario #apellido2').val().trim() == "") {
		$('#modalUsuario #apellido2').addClass("border border-danger");
		$('#modalUsuario #apellido2Label').html('Apellido 2 (*) Campo Obligatorio');	
		$('#modalUsuario #apellido2Label').css('color','red');
		res = false;
	}
	if($('#modalUsuario #nif').val().trim() == "") {
		$('#modalUsuario #nif').addClass("border border-danger");
		$('#modalUsuario #dniLabel').html('DNI/NIF/CIF (*) Campo Obligatorio');	
		$('#modalUsuario #dniLabel').css('color','red');
		res = false;
	}
	else if(ValidateSpanishID($('#modalUsuario #nif').val().trim()) == false) {
		$('#modalUsuario #nif').addClass("border border-danger");
		$('#modalUsuario #dniLabel').html('DNI/NIF/CIF (*) Introduce un dato válido');	
		$('#modalUsuario #dniLabel').css('color','red');
		res = false;
	}
	if($('#modalUsuario #selectorPerfil').val() == "") {
		$('#modalUsuario #selectorPerfil').addClass("border border-danger");
		$('#modalUsuario #etiquetaPerfil').html('Perfil (*) Campo Obligatorio');	
		$('#modalUsuario #etiquetaPerfil').css('color','red');
		res = false;
	}
	if($('#modalUsuario #selectorServicioAdscrito').val() == "") {
		$('#modalUsuario #selectorServicioAdscrito').addClass("border border-danger");
		$('#modalUsuario #etiquetaServicioAdscrito').html('Servicio Adscrito (*) Campo Obligatorio');	
		$('#modalUsuario #etiquetaServicioAdscrito').css('color','red');
		res = false;
	}
		return res;
}

function nuevoUsuario(){
	$('#modalUsuario #cabecera').html('Nuevo Usuario');
	$('#modalUsuario input').prop('disabled', false);
	$('#modalUsuario select').prop('disabled', false);
	$('#modalUsuario #idUsuario').val("");
	$('#modalUsuario').find('form')[0].reset();
	$('#modalUsuario #guardarUsuario').removeClass('btn-light');
	$('#modalUsuario #guardarUsuario').prop('disabled',false);
	$('#modalUsuario').modal({
		keyboard: false,
		backdrop: 'static'
	});
}

function crearUsuario() {
	if(validaCampos()){
		$.ajax({
			    type: 'POST',
			    url: './crearUsuario',
			    data: $('#nuevoUsuario').serialize() ,
			    success: function (data) {
			    	$('#modalUsuario').modal('hide');
					$('#modalAvisoEdicionUsuario').modal('hide');
					tablaUsuarios.ajax.reload();
					$("#alertaUsuarioOK").fadeIn(1500);
					setTimeout(function() {$("#alertaUsuarioOK").fadeOut(1500);},3000);
	    		},
				 error: function( jqXHR, textStatus, errorThrown ) {
				 	$('#modalUsuario').modal('hide');
					$('#modalAvisoEdicionUsuario').modal('hide');
					$("#alertaUsuarioKO").fadeIn(1500);
					setTimeout(function() {$("#alertaUsuarioKO").fadeOut(1500);},3000);
				}
		});
	}
}

function muestraUsuario(id){
	$.ajax({
	    type: 'POST',
	    url: './obtenerUsuario',
	    data: { id : id },
	    dataType: 'json',
	    success: function (data) {
	    	$('#modalUsuario #cabecera').html('Datos del Usuario');
	    	$('#modalUsuario #nombre').val(data.nombre);
	    	$('#modalUsuario #apellido1').val(data.apellido1);
	    	$('#modalUsuario #apellido2').val(data.apellido2);
	    	$('#modalUsuario #nif').val(data.nif); 
	    	if(data.fkPerfil != null){
				$('#modalUsuario #selectorPerfil').val(data.fkPerfil.id);
			}
			if(data.fkServicioAdscrito != null){
				$('#modalUsuario #selectorServicioAdscrito').val(data.fkServicioAdscrito.id);
			}
			if(data.activo == true){
				$('#modalUsuario #activo').prop("checked", true);
			}else{
				$('#modalUsuario #activo').prop("checked", false);
			}
			
			if(data.filtraserv == true){
				$('#modalUsuario #filtraserv').prop("checked", true);
			}else{
				$('#modalUsuario #filtraserv').prop("checked", false);
			}
			
			if(data.checkFinalizado == true){
				$('#modalUsuario #checkFinalizado').prop("checked", true);
			}else{
				$('#modalUsuario #checkFinalizado').prop("checked", false);
			}
			
	    	$('#modalUsuario input').prop('disabled', true);
			$('#modalUsuario select').prop('disabled', true);
	    	$('#modalUsuario #guardarUsuario').addClass('btn-light');
			$('#modalUsuario #guardarUsuario').prop('disabled',true);
			$('#modalUsuario').modal({
				keyboard: false,
				backdrop: 'static'
			});
		}
	});
}

function editarUsuario(id){
	$.ajax({
	    type: 'POST',
	    url: './obtenerUsuario',
	    data: { id : id },
	    dataType: 'json',
	    success: function (data) {
	    	$('#modalUsuario #cabecera').html('Editar Usuario');
	    	$('#modalUsuario #idUsuario').val(data.id);
	    	$('#modalUsuario #nombre').val(data.nombre);
	    	$('#modalUsuario #apellido1').val(data.apellido1);
	    	$('#modalUsuario #apellido2').val(data.apellido2);
	    	$('#modalUsuario #nif').val(data.nif); 
	    	if(data.fkPerfil != null){
				$('#modalUsuario #selectorPerfil').val(data.fkPerfil.id);
			}
			if(data.fkServicioAdscrito != null){
				$('#modalUsuario #selectorServicioAdscrito').val(data.fkServicioAdscrito.id);
			}
			if(data.activo == true){
				$('#modalUsuario #activo').prop("checked", true);
			}else{
				$('#modalUsuario #activo').prop("checked", false);
			}
			if(data.filtraserv == true){
				$('#modalUsuario #filtraserv').prop("checked", true);
			}else{
				$('#modalUsuario #filtraserv').prop("checked", false);
			}
			if(data.checkFinalizado == true){
				$('#modalUsuario #checkFinalizado').prop("checked", true);
			}else{
				$('#modalUsuario #checkFinalizado').prop("checked", false);
			}
	    	$('#modalUsuario input').prop('disabled', false);
			$('#modalUsuario select').prop('disabled', false);
				$('#modalUsuario #selectorPerfil').prop('disabled', false);
	    	$('#modalUsuario #guardarUsuario').removeClass('btn-light');
			$('#modalUsuario #guardarUsuario').prop('disabled',false);
			$('#modalUsuario').modal({
				keyboard: false,
				backdrop: 'static'
			});
		}
	});
}

function modalEliminarUsuario(id, nombre, apellido1, apellido2) {
	$('#modalEliminarUsuario #idModalEliminarUsuario').text('Eliminar Usuario: '+nombre+' '+apellido1+' '+apellido2);
	$('#eliminarUsuario #idUsuarioEliminar').val(id);
	$('#modalEliminarUsuario').modal('show'); 
}

function modalAvisoEdicionUsuario() {

  var idUsuario = $('#modalUsuario #idUsuario').val();
	var idSesionActual = $('#modalUsuario #idSesionActual').val();
  
    if (idUsuario==idSesionActual) {
        $('#modalAvisoEdicionUsuario').modal('show');
    } else {
        crearUsuario();
    }
}

function eliminarUsuario() {
	$.ajax({
		    type: 'POST',
		    url: './eliminarUsuario',
		    data: $('#eliminarUsuario').serialize() ,
		    success: function (data) {
		   		$('#modalEliminarUsuario').modal('hide');
				tablaUsuarios.ajax.reload();
				$("#alertaEliminarUsuarioOK").fadeIn(1500);
				setTimeout(function() {$("#alertaEliminarUsuarioOK").fadeOut(1500);},3000);
    		},
			 error: function( jqXHR, textStatus, errorThrown ) {
				$('#modalEliminarUsuario').modal('hide');
				$("#alertaEliminarUsuarioKO").fadeIn(1500);
				setTimeout(function() {$("#alertaEliminarUsuarioKO").fadeOut(1500);},3000);
			}
	});
}



$('#modalUsuario #nombre').keydown(function(event){
	$('#modalUsuario #nombre').removeClass("border border-danger");
	$('#modalUsuario #nombreLabel').html('Nombre (*)');	
	$('#modalUsuario #nombreLabel').css('color','black');
});

$('#modalUsuario #apellido1').keydown(function(event){
	$('#modalUsuario #apellido1').removeClass("border border-danger");
	$('#modalUsuario #apellido1Label').html('Apellido 1 (*)');	
	$('#modalUsuario #apellido1Label').css('color','black');
});

$('#modalUsuario #apellido2').keydown(function(event){
	$('#modalUsuario #apellido2').removeClass("border border-danger");
	$('#modalUsuario #apellido2Label').html('Apellido 2 (*)');	
	$('#modalUsuario #apellido2Label').css('color','black');
});

$('#modalUsuario #nif').keydown(function(event){
	$('#modalUsuario #nif').removeClass("border border-danger");
	$('#modalUsuario #dniLabel').html('DNI/NIF/CIF (*)');	
	$('#modalUsuario #dniLabel').css('color','black');
});

$('#modalUsuario #selectorPerfil').keydown(function(event){
	$('#modalUsuario #selectorPerfil').removeClass("border border-danger");
	$('#modalUsuario #etiquetaPerfil').html('Perfil (*)');	
	$('#modalUsuario #etiquetaPerfil').css('color','black');
});

$('#modalUsuario #selectorServicioAdscrito').keydown(function(event){
	$('#modalUsuario #selectorServicioAdscrito').removeClass("border border-danger");
	$('#modalUsuario #etiquetaServicioAdscrito').html('Servicio Adscrito (*)');	
	$('#modalUsuario #etiquetaServicioAdscrito').css('color','black');
});

$("#selectorPerfil").change(function() {
	$('#modalUsuario #selectorPerfil').removeClass("border border-danger");
	$('#modalUsuario #etiquetaPerfil').html('Perfil (*)');	
	$('#modalUsuario #etiquetaPerfil').css('color','black');
});

$("#selectorServicioAdscrito").change(function() {
	$('#modalUsuario #selectorServicioAdscrito').removeClass("border border-danger");
	$('#modalUsuario #etiquetaServicioAdscrito').html('Servicio Adscrito (*)');	
	$('#modalUsuario #etiquetaServicioAdscrito').css('color','black');
});

function resetModal() {
	$('#modalUsuario #nombre').removeClass("border border-danger");
	$('#modalUsuario #nombreLabel').html('Nombre (*)');	
	$('#modalUsuario #nombreLabel').css('color','black');
	$('#modalUsuario #apellido1').removeClass("border border-danger");
	$('#modalUsuario #apellido1Label').html('Apellido 1 (*)');	
	$('#modalUsuario #apellido1Label').css('color','black');
	$('#modalUsuario #apellido2').removeClass("border border-danger");
	$('#modalUsuario #apellido2Label').html('Apellido 2 (*)');	
	$('#modalUsuario #apellido2Label').css('color','black');
	$('#modalUsuario #nif').removeClass("border border-danger");
	$('#modalUsuario #dniLabel').html('DNI/NIF/CIF (*)');	
	$('#modalUsuario #dniLabel').css('color','black');
	$('#modalUsuario #selectorServicioAdscrito').removeClass("border border-danger");
	$('#modalUsuario #etiquetaServicioAdscrito').html('Servicio Adscrito (*)');	
	$('#modalUsuario #etiquetaServicioAdscrito').css('color','black');
	$('#modalUsuario #selectorPerfil').removeClass("border border-danger");
	$('#modalUsuario #etiquetaPerfil').html('Perfil (*)');	
	$('#modalUsuario #etiquetaPerfil').css('color','black');
}

/** A CONTINUACION SE MUESTRAN LAS FUNCIONES NECESARIAS PARA LA RELACION ENTRE LOS PERMISOS Y LOS USUARIOS **/

function asignarPermisoUsuario(id) {
	$('#modalUsuario').modal('hide');
	$('#modalPermisoUsuario #idUsuarioPerm').val(id);
	$('#modalPermisoUsuario').modal({
		keyboard: false,
		backdrop: 'static'
	});
	rellenarDatosPermisosUsuarios(id);
	rellenarPermisosUsuario(id);
	rellenarPermisosUsuarioObtenidos(id);
}

// FUNCION QUE SACA DEL USUARIOCONTROLLER DATOS REFERENTES AL NOMBRE Y EL PERFIL ACTUAL DEL USUARIO
function rellenarDatosPermisosUsuarios(id){
	$.ajax({
		data: { id : id },
		url: './obtenerUsuario',
		type : 'POST',
		dataType: 'json',
		success: function(data){
	    	$('#modalPermisoUsuario #nombre').val(data.nombre + " " + data.apellido1 + " " + data.apellido2);
	    	$('#modalPermisoUsuario #perfil').val(data.fkPerfil.nombre);
		}
	});
}

// FUNCION QUE SACA DEL PERMISOUSUARIOCONTROLLER EL LISTADO DE TODOS LOS PERMISOS DISPONIBLES (NO ASIGNADOS)
function rellenarPermisosUsuario(id){
	var campoPermisosUsu=$('#modalPermisoUsuario #permisoUsuario');
	$.ajax({
		data: { id : id },
		url: './rellenaPermisoUsuario',
		type : 'POST',
		dataType: 'json',
		success: function(r){
			campoPermisosUsu.children('option:not(:first)').remove();
			$(r).each(function(i,v){
				campoPermisosUsu.append(new Option(v.at(1), v.at(0), false, false));
			});
		}
	});
}
// FUNCION QUE SACA DEL PERMISOUSUARIOCONTROLLER EL LISTADO DE TODOS LOS PERMISOS DISPONIBLES (ASIGNADOS)
function rellenarPermisosUsuarioObtenidos(id){
	var campoPermisosUsu=$('#modalPermisoUsuario #permisoUsuarioObtenidos');
	$.ajax({
		data: { id : id },
		url: './rellenaPermisoUsuarioObtenidos',
		type : 'POST',
		dataType: 'json',
		success: function(r){
			campoPermisosUsu.children('option:not(:first)').remove();
			$(r).each(function(i,v){
				campoPermisosUsu.append(new Option(v.at(1), v.at(0), false, false));
			});
		}
	});
}

// Anadir todos los elementos de la lista de permisos disponibles a la lista de permisos asignados
$("#modalPermisoUsuario #anadirTodos").click(function() {
	$("#modalPermisoUsuario #permisoUsuario option").appendTo("#permisoUsuarioObtenidos");
	$("#modalPermisoUsuario #permisoUsuario").val("");
	$("#modalPermisoUsuario #permisoUsuarioObtenidos").val("");
});

// Anadir los elementos seleccionados de la lista de permisos disponibles a la lista de permisos asignados
$("#modalPermisoUsuario #anadirPermisos").click(function() {
	$("#modalPermisoUsuario #permisoUsuario option:selected").appendTo("#permisoUsuarioObtenidos");
	$("#modalPermisoUsuario #permisoUsuario").val("");
	$("#modalPermisoUsuario #permisoUsuarioObtenidos").val("");
});

// Quitar los elementos seleccionados de la lista de permisos asignados a la lista de permisos disponibles
$("#modalPermisoUsuario #quitarPermisos").click(function() {
	$("#modalPermisoUsuario #permisoUsuarioObtenidos option:selected").appendTo("#permisoUsuario");
	$("#modalPermisoUsuario #permisoUsuario").val("");
	$("#modalPermisoUsuario #permisoUsuarioObtenidos").val("");
});
	
// Quitar todos los elementos de la lista de permisos asignados a la lista de permisos disponibles
$("#modalPermisoUsuario #quitarTodos").click(function() {
	$("#modalPermisoUsuario #permisoUsuarioObtenidos option").appendTo("#permisoUsuario");
	$("#modalPermisoUsuario #permisoUsuario").val("");
	$("#modalPermisoUsuario #permisoUsuarioObtenidos").val("");
});

$("#modalPermisoUsuario #permisoUsuario").click(function() {
    $("#modalPermisoUsuario #permisoUsuarioObtenidos option:selected").prop("selected", false);
});

$("#modalPermisoUsuario #permisoUsuarioObtenidos").click(function() {
    $("#modalPermisoUsuario #permisoUsuario option:selected").prop("selected", false);
});

function crearPermisoUsuario() {
		$("#modalPermisoUsuario #permisoUsuario option").prop("selected", true);
		$("#modalPermisoUsuario #permisoUsuarioObtenidos option").prop("selected", true);
		$.ajax({
			data: $('#nuevoPermisoUsuario').serialize(),
			type: 'POST',
			url: './crearPermisoUsuario',
			success: function (data) {
				$("#modalPermisoUsuario #permisoUsuario option").prop("selected", false);
				$("#modalPermisoUsuario #permisoUsuarioObtenidos option").prop("selected", false);
				$("#modalPermisoUsuario #alertaPermisoUsuarioOK").fadeIn(1500);
				setTimeout(function() {	$("#modalPermisoUsuario #alertaPermisoUsuarioOK").fadeOut(1500); },3000);
				tablaUsuarios.ajax.reload();
			},
			error: function( jqXHR, textStatus, errorThrown ) {
				$("#modalPermisoUsuario #alertaPermisoUsuarioKO").fadeIn(1500);
				setTimeout(function() { $("#modalPermisoUsuario #alertaPermisoUsuarioKO").fadeOut(1500); },3000);
			}
		});
}

function resetModalPermisos() {
	$('#modalPermisoUsuario #formuPermUsua').find('form')[0].reset();
	$('#modalPermisoUsuario #nuevoPermisoUsuario #idUsuarioPerm').val("");
	$('#modalPermisoUsuario #nuevoPermisoUsuario #permisoUsuario').empty();
	$('#modalPermisoUsuario #nuevoPermisoUsuario #permisoUsuarioObtenidos').empty();
}
