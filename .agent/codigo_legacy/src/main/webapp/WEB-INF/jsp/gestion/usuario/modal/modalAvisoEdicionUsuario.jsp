<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<div class="modal fade" id="modalAvisoEdicionUsuario" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog modal-xl modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
		<h4 id="idModalAvisoEdicionUsuario" class="modal-title" class="close float-left">Aviso Edicion Usuario</h4>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
      </div>
      <div class="modal-body">
      	<form class="float-left" id="avisoEdicionUsuario">
      		<h5 id="mensajeModalAvisoEdicionUsuario">Está modificando sus propios datos, le recomendamos cerrar sesión tras dichos cambios para evitar posibles problemas funcionales en la aplicación</h5>
      	</form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
        <button type="button" class="btn btn-danger" onclick="crearUsuario()">Aceptar</button>
      </div>
    </div>
  </div>
</div>