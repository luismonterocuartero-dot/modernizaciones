<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<div class="modal fade" data-backdrop="static" id="modalPermisoUsuario" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog modal-xl" role="document">
    <div class="modal-content">
      <div class="modal-header">
		<h4 id="cabecera" class="modal-title" class="close float-left" id="myModalLabel">Gesti&oacute;n Permisos de Usuario</h4>
        <button type="button" class="close " data-dismiss="modal" aria-label="Close" onclick="resetModalPermisos()" ><span aria-hidden="true">&times;</span></button>
      </div>
      <div id="alertaPermisoUsuarioOK" style="display: none;" class="alert alert-success" role="alert">
		<strong>La asignaci&oacute;n de permisos al usuario se ha realizado correctamente.</strong>
	  </div>
	  <div id="alertaPermisoUsuarioKO" style="display: none;" class="alert alert-danger" role="alert">
		<strong>Se ha producido un error al asignar los permisos al usuario.</strong>
	  </div>
      <div id="formuPermUsua" class="modal-body">     
     	<form id="nuevoPermisoUsuario" action="./crearPermisoUsuario" method="POST">
     		<input id="idUsuarioPerm" name="usuarioId" value="" type="hidden">
			<div class="form-row">
				<!-- Columna 1 -->
				<div class="col">
					<!-- Usuario -->
					<label for="fname" id="nombreLabel" class="float-left">Usuario</label>
		  			<input readonly type="text" id="nombre" name="nombre" class="form-control">
				</div>
				<!-- Columna 2 -->
				<div class="col">
					<!-- Perfil -->
					<label for="fname" id="perfilLabel" class="float-left">Perfil</label>
		  			<input readonly type="text" id="perfil" name="perfil" class="form-control">
				</div>
			</div>
			<div class="form-row">
				<br/>
			</div>
			<div id="titulos" class="form-row" >
				<div class="col-sm-6 text-center mt-3"style="text-align: center;">
					<h6>Permisos Disponibles</h6>
				</div>
				<div class="col-sm-6 text-center mt-3"style="text-align: center;">
					<h6>Permisos Asignados</h6>
				</div>
			</div>
			<div class="form-row">			
				<div class="col">	
					<!-- PERMISOS DISPONIBLES -->
					<select class="form-control" id="permisoUsuario" name="permisoUsuario" multiple style="width: 100%;height: 250px;"></select>
				</div>
				<div class="col">
					<!-- PERMISOS ASIGNADOS -->
					<select class="form-control" id="permisoUsuarioObtenidos" name="permisoUsuarioObtenidos" multiple style="width: 100%;height: 250px;"></select>
				</div>	
			</div>
			<div class="form-row">
				<br/>
			</div>
			<div class="form-row">
				<div class="col align-self-center mt-3">
						<h3>Botones de Gestión</h3>
				</div>			
			</div>
			<div id="botonera" class="form-row" >
					<div class="col-sm-1">
					</div>
					<div id="botones" class="col-sm-10">				  
						<button type="button" id="anadirPermisos" class="btnaddperm">
							Añadir
						</button>
						
						<button type="button" id="anadirTodos" class="btnaddall">
							Añadir Todos
						</button>
						  
						<button type="button" id="quitarPermisos" class="btndelperm">
							Quitar
						</button>
						  
						<button  type="button" id="quitarTodos" class="btndelall">
		    				Quitar Todo
		    			</button>
					<div class="col-sm-1">
					</div>
				</div>
			</div>					
	  	</form>
      </div>
      <div class="modal-footer">
		<button type="button" class="btn btn-default" data-dismiss="modal" onclick="resetModalPermisos()">Cerrar</button>
        <button type="button" id="guardarPermisoUsuario" class="btn btn-primary" onclick="crearPermisoUsuario()">Guardar</button>
      </div>
     </div>
    </div>
  </div>