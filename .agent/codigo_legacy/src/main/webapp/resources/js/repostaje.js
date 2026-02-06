var objetoAviso = document.getElementById('avisoPermisoCargaRepostaje');
var objetoAvisoCargar = document.getElementById('avisoCargaRepostaje');
var permisoDeAcceso = $('#permisoActual').val();

$(document).ready(function() {
	if (permisoDeAcceso == "EDITOR" || permisoDeAcceso == "ADMINISTRADOR") {
		muestraBotonNuevo();
	} else {
		mostrarAviso();
	}



});

function mostrarAviso() {
	objetoAviso.classList.remove("d-none");
}

function muestraBotonNuevo() {
	$("#inputCargarRepostaje").removeAttr("disabled");
	$("#botonCargarRepostaje").removeClass("disabled");
	$("#uploadform").removeAttr("hidden");
	initEvent();

}

function initEvent() {
	$("#botonCargarRepostaje").on("click", function() {
		// Obtener el formulario
		var form = $('#uploadform');

		// Obtener el input del archivo
		var fileInput = $('#inputCargarRepostaje');

		// Verificar si se ha seleccionado un archivo
		if (fileInput.val() != "") {
			var formData = new FormData($('#uploadform')[0]);
			var nombrefichero = fileInput[0].files[0].name;
			$.ajax({
					type: 'POST',
					url: './cargaFicheroRepostajes',
					data: formData,
		          	contentType: false,
		           	processData: false,
					success: function(data) {
						
						cargarModal(data);
						$('#inputCargarRepostaje').prop('disabled', false);
						$('#botonCargarRepostaje').prop('disabled', false);
						$('#inputCargarRepostaje').val('');
						objetoAvisoCargar.classList.add("d-none");
					},
					beforeSend: function() {
					  sessionStorage.setItem("isModalVisible",false);
					  $('#inputCargarRepostaje').prop('disabled', true);
					  $('#botonCargarRepostaje').prop('disabled', true);
					  objetoAvisoCargar.classList.remove("d-none");
					  
					},
					error: function(jqXHR, textStatus, errorThrown) {
					    console.error('Error:', textStatus, errorThrown);
					}
				});
		} else {
			// Mostrar alerta si no hay archivo seleccionado
			alert('Por favor, seleccione un archivo para cargar.');
		}
	})
}
