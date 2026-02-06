<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<div class="modal fade" id="modalEditarVehiculo" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog modal-xl" role="document">
    <div class="modal-content">
      <div class="modal-header">
       <h4 id="cabecera" class="modal-title" class="close float-left" id="myModalLabel">Nuevo Veh&iacute;culo</h4>
       <button type="button" class="close " data-dismiss="modal" aria-label="Close" onclick="resetModal()" ><span aria-hidden="true">&times;</span></button>
      </div>
      <div class="modal-body">
       <!-- DEFINIMOS LAS PESTANAS -->
       <ul class="nav nav-tabs" id="tabsVehiNuevo" role="tablist">
        <li class="nav-item"><a class="nav-link active" id="nuevoVehiculoMatr-tab" data-toggle="tab" href="#nuevoVehiculoMatr" role="tab" aria-controls="nuevoVehiculoMatr" aria-selected="true">Veh&iacute;culo</a></li>
        <li class="nav-item"><a class="nav-link" id="nuevaMatriculaVehi-tab" data-toggle="tab" href="#nuevaMatriculaVehi" role="tab" aria-controls="nuevaMatriculaVehi" aria-selected="false">Matr&iacute;cula</a></li>
       </ul>
       <!-- DEFINIMOS EL CONTENIDO -->
       <form id="nuevoVehiculo" action="./crearVehiculo" method="POST">
       <div class="tab-content" id="tabsNewVehiContent">
        <div id="nuevoVehiculoMatr" class="tab-pane fade show active" role="tabpanel" aria-labelledby="nuevoVehiculoMatr-tab">
         <br />
         <h4>Datos del Veh&iacute;culo</h4>
         <br />
         <div class="form-row">
          <!-- Columna 1 -->
          <div class="col">
           <!-- Servicio Adscrito -->
           <label id="sAdsLabel" class="float-left">Servicio Adscrito (*) </label>
           <select class="form-control" id="servicioOpt" name="fkServicioAdscrito.id" class="float-left"  required>
            <option value="">-- Seleccione --</option>
            <c:forEach items="${servicios}" var="servicio">
             <option value="${servicio.id}">${servicio.nombre}</option>
            </c:forEach>
           </select>
           <!-- Tipo Repostaje -->
           <label class="float-left">Tipo Repostaje</label>
           <select class="form-control" id="repostajeOpt" name="fkParametroTipoRepostaje.id" class="float-left">
            <option value="0">-- Seleccione --</option>
            <c:forEach items="${parametros}" var="parametro">
             <c:if test = "${parametro.tipoParametro.codigo == 'AL'}">
              <option value="${parametro.id}">${parametro.nombre}</option>
             </c:if>		
            </c:forEach>
           </select>
           <!-- Fecha Compra -->
           <label for="compra" id="lblCompra" class="float-left">Fecha Compra</label>
           <input type="date" id="compra" name="fechaCompra" class="form-control" pattern="dd-MM-yyyy" max='9999-12-31'/>
           <!-- Tipo Adquisición -->
           <label class="float-left">Tipo Adquisici&oacute;n</label>
           <select class="form-control" id="adquisicionOpt" name="fkParametroTipoAdquisicion.id" class="float-left">
            <option value="0">-- Seleccione --</option>
            <c:forEach items="${parametros}" var="parametro">
             <c:if test="${parametro.tipoParametro.codigo == 'TA'}">
              <option value="${parametro.id}">${parametro.nombre}</option>
             </c:if>
            </c:forEach>
           </select>
           <!-- Color -->
           <label for="fname" class="float-left">Color</label>
           <input type="text" id="color" name="color" class="form-control" maxlength="150">
           <hr>
           <!-- Situacion -->
           <label class="float-left">Situaci&oacute;n</label>
           <select class="form-control" id="situacionOpt" name="fkParametroTipoSituacion.id" class="float-left">
            <option value="0">-- Seleccione --</option>
            <c:forEach items="${parametros}" var="parametro">
             <c:if test = "${parametro.tipoParametro.codigo == 'SI'}">
              <option value="${parametro.id}">${parametro.nombre}</option>
             </c:if>		
            </c:forEach>
           </select>
           <!-- Destino Baja -->
           <label class="float-left">Destino</label>
           <select class="form-control" id="destinoOpt" name="fkParametroTipoDestino.id" class="float-left">
            <option value="0">-- Seleccione --</option>
            <c:forEach items="${parametros}" var="parametro">
             <c:if test = "${parametro.tipoParametro.codigo == 'DT'}">
              <option value="${parametro.id}">${parametro.nombre}</option>
             </c:if>		
            </c:forEach>
           </select>
          </div>
          <!-- Columna 2 -->
          <div class="col">
           <!-- Fecha Adscripcion -->
           <label for="adscripcion" id="lblAdscripcion" class="float-left">Fecha Adscripci&oacute;n</label>
           <input type="date" id="adscripcion" name="fechaAdscripcion" class="form-control" pattern="dd-MM-yyyy" max='9999-12-31'/>
           <!-- Marca -->
           <label id="marcaLabel" class="float-left">Marca (*)</label>
           <select class="form-control" id="marcaOpt" name="marca.id" class="float-left" required>
            <option value="">-- Seleccione --</option>
            <c:forEach items="${marcas}" var="marca">
             <option value="${marca.id}">${marca.nombre}</option>
            </c:forEach>
           </select>
           <!-- Expediente -->
           <label for="lname" class="float-left">Expediente</label>
           <input type="text" id="expediente" name="expedienteCompra" class="form-control" maxlength="150">
           <!-- Operadoras -->
           <label id="operadoraLabel" class="float-left">Empresa Operadora </label>
           <select class="form-control" id="fkOperadora" name="fkOperadora.id" class="float-left" disabled="true">
            <option value="">-- Seleccione --</option>
            <c:forEach items="${operadoras}" var="operadora">
             <option value="${operadora.id}">${operadora.nombre}</option>
            </c:forEach>
           </select>
		 <!-- espacio -->
           <label class="text-white" for="fname" class="float-left">&nbsp;</label>
           <input type="text" id="espacio" name="espacio" class="form-control bg-white border-0" readonly>
           <hr>
           <!-- Fecha Baja -->
           <label for="baja" class="float-left">Fecha Baja</label>
           <input type="date" id="baja" name="fechaBaja" class="form-control" disabled="true" pattern="dd-MM-yyyy" max='9999-12-31'/>
           <!-- Motivo Destino -->
           <label for="fname" class="float-left">Motivo Destino</label>
           <input type="text" id="motivoDestino" name="motivoDestino" class="form-control" maxlength="1500">
          </div>
          <!-- Columna 3 -->
          <div class="col">
           <!-- Tipo Uso -->
           <label class="float-left">Uso</label>
           <select class="form-control" id="usoOpt" name="fkParametroTipoUso.id" class="float-left">
            <option value="0">-- Seleccione --</option>
            <c:forEach items="${parametros}" var="parametro">
             <c:if test="${parametro.tipoParametro.codigo == 'US'}">
              <option value="${parametro.id}">${parametro.nombre}</option>
             </c:if>
            </c:forEach>
           </select>
           <!-- Modelo -->
           <label id="modeloLabel" class="float-left">Modelo (*) </label>
           <select class="form-control" id="modeloOpt" name="fkModelo.id" class="float-left" required>
            <option value="">-- Seleccione --</option>
            <c:forEach items="${modelos}" var="modelo">
             <option value="${modelo.id}">${modelo.nombre}</option>
            </c:forEach>
           </select>
           <!-- Inventario -->
           <label for="fname" class="float-left">Inventario</label>
           <input type="text" id="inventario" name="numeroInventario" onkeypress="return soloNumeros(event)" class="form-control" maxlength="150">
          <!-- Bastidor -->
           <label for="lname" class="float-left">Bastidor</label>
           <input type="text" id="bastidor" name="numeroBastidor" class="form-control" maxlength="150">
		 <!-- espacio -->
           <label class="text-white" for="fname" class="float-left">&nbsp;</label>
           <input type="text" id="espacio" name="espacio" class="form-control bg-white border-0" readonly>	
           <hr>
           <!-- Motivo Baja -->
           <label for="fname" class="float-left">Motivo Baja</label>
           <input type="text" id="motivoBaja" name="motivoBaja" maxlength="1500" class="form-control" disabled="true">
          </div>
         </div>
         <!-- Observaciones -->
         <label for="fname" class="float-left">Observaciones</label>
         <textarea id="observaciones" rows="4" cols="150" wrap="soft" class="form-control" name="observaciones" maxlength="4000"></textarea>
         <input type="hidden" id="idVehiculoActualiza" name="id" class="form-control">
        </div>
        <!-- MATRICULA -->
        <div class="tab-pane fade" id="nuevaMatriculaVehi" role="tabpanel" aria-labelledby="nuevaMatriculaVehi-tab">
         <br />
         <h4>Datos de la Matr&iacute;cula</h4>
         <br />
         <div class="form-row">
          <div class="float-left">
           <div class="col">
            <div class="row">
             <!-- Doblada -->
             <div class="custom-control custom-switch">
              <input type="checkbox" id="doblada" name="doblada" value="true" class="custom-control-input">
              <label id="lblDoblada" class="custom-control-label" for="doblada">Doblada</label>
             </div>
            </div>
           </div>
           <div class="row">
            <div class="col">
             <!-- Matricula -->
             <label id="lblNombre" for="lname" class="float-left">Matr&iacute;cula (*)</label>
             <input type="text" id="nombre" name="nombre" maxlength="50" class="form-control" onkeypress="return validaMatricula(event)">
             <!-- Fecha Matriculacion -->
             <label id="lblFechaMatriculacion" for="fname" class="float-left">Fecha Matriculaci&oacute;n (*)</label>
             <input type="date" id="fechaMatriculacion" name="fechaMatriculacion" class="form-control" pattern="dd-MM-yyyy" max='9999-12-31'/>
            </div>
            <div class="col">
             <!-- Tarjeta Repostaje -->
             <label for="lname" class="float-left">Tarjeta Repostaje</label>
             <input type="text" id="tarjetaRepostaje" name="tarjetaRepostaje" maxlength="50" class="form-control">
             <!-- Num Pin -->
             <label id="lblPin" for="lname" class="float-left">Pin</label>
             <input type="text" id="pin" name="pin" class="form-control"  maxlength="4" onkeypress="return soloNumeros(event)">
            </div>
            <div class="col">
             <!-- Tarjeta Peaje -->
             <label for="lname" class="float-left">Tarjeta Peaje</label>
             <input type="text" id="tarjetaPeaje" name="tarjetaPeaje" maxlength="50" class="form-control">
            </div>
           </div>
          </div>
         </div>
         <!-- Observaciones -->
         <label for="fname" class="float-left">Observaciones</label>
         <textarea id="observacionesMat" rows="4" cols="150" wrap="soft" class="form-control" name="observacionesMat" maxlength="1500"></textarea>
        </div>
       </div>
       </form>
      </div>
      <div class="modal-footer">
       <button type="button" class="btn btn-default" data-dismiss="modal" onclick="resetModal()">Cerrar</button>
       <button type="button" id="guardarVehiculo" class="btn btn-primary" onclick="crearVehiculo()">Guardar</button>
      </div>
    </div>
  </div>
</div>