function acciona() {
	$('#botonsyncroDoc').addClass('btn-light');
	$('#botonsyncroDoc').prop('disabled',true);
	document.getElementById('spinner').style.display = 'block';
    $.ajax({
        type: 'GET',
        url: './acciona',
        success: function(data) {
        	$('#botonsyncroDoc').removeClass('btn-light');
        	$('#botonsyncroDoc').prop('disabled',false);
			document.getElementById('spinner').style.display = 'none';
			mostrarDiv();
            // Actualizar el contenido de los elementos HTML con los números recibidos
			$('#numero1').text(data[0]); 
            $('#numero2').text(data[1]); 
            $('#numero3').text(data[2]); 
            $('#numero4').text(data[3]); 
            $('#numero5').text(data[4]); 
            $('#numero6').text(data[5]); 
            $('#numero7').text(data[6]); 
            $('#numero8').text(data[7]); 
			// Muestra el mensaje de éxito
            
           var total = parseInt($('#numero1').text()) + parseInt($('#numero2').text()) + parseInt($('#numero3').text()) + parseInt($('#numero4').text()) +
           parseInt($('#numero5').text()) + parseInt($('#numero6').text()) + parseInt($('#numero7').text()) + parseInt($('#numero8').text());
           
           var noSinc = parseInt($('#numero2').text()) + parseInt($('#numero4').text()) + parseInt($('#numero6').text()) + parseInt($('#numero8').text());
           
           if (total == 0){
        	   $("#sincronizadoVacio").fadeIn(1500);
        	   setTimeout(function() {$(" #sincronizadoVacio").fadeOut(1500);},3000);
           } else if (noSinc != 0){
        	   $("#sincronizadoAviso").fadeIn(1500);
        	   setTimeout(function() {$(" #sincronizadoAviso").fadeOut(1500);},3000);
           } else{
        	   $("#sincronizado").fadeIn(1500);
        	   setTimeout(function() {$(" #sincronizado").fadeOut(1500);},3000);
           }
            
        },
		error: function( jqXHR, textStatus, errorThrown ) {
            // Si hay un error, mostrar el mensaje de advertencia durante 5 segundos y luego el mensaje de fallo
			$(" #sincronizadoFallo").fadeIn(1500);
				setTimeout(function() {$(" #sincronizadoFallo").fadeOut(1500);},3000);
        } 
    });
}

//Podria crear una funcion para ocultar el cuadrado
function mostrarDiv() {
    var cuadroSincro = document.getElementById("cuadroSincro");
    cuadroSincro.classList.remove("d-none");
}