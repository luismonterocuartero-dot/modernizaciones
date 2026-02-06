<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<div class="modal fade" id="modalFiltroVehiculo" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog modal-xl" role="document">
    <div class="modal-content">
      <div class="modal-header">
       <h4 id="cabecera" class="modal-title" class="close float-left" id="myModalLabel">Filtro Veh&iacute;culo</h4>
       <button type="button" class="close " data-dismiss="modal" aria-label="Close" onclick="resetModalFilter()" ><span aria-hidden="true">&times;</span></button>
      </div>
      <div class="modal-body">
       <!-- DEFINIMOS LAS PESTANAS -->
       <ul class="nav nav-tabs" id="tabsVehiNuevo" role="tablist">
			<li class="nav-item"><a class="nav-link active" id="vehiculo-tab" data-toggle="tab" href="#nuevoVehi" role="tab" aria-controls="nuevoVehi" aria-selected="true">Veh&iacute;culo</a></li>
			<li class="nav-item"><a class="nav-link" id="matriculaVehi-tab" data-toggle="tab" href="#matriculaVehi" role="tab" aria-controls="matricula" aria-selected="false">Matr&iacute;culas</a></li>
			<li class="nav-item"><a class="nav-link" id="equipamiento-tab" data-toggle="tab" href="#equipamientoVehi" role="tab" aria-controls="equipamiento" aria-selected="false">Equip.</a></li>
			<li class="nav-item"><a class="nav-link" id="cesion-tab" data-toggle="tab" href="#cesionVehi" role="tab" aria-controls="cesion" aria-selected="false">Cesi&oacute;n</a></li>
			<li class="nav-item"><a class="nav-link" id="repostaje-tab" data-toggle="tab" href="#repostajeVehi" role="tab" aria-controls="repostaje" aria-selected="false">Repostaje</a></li>
			<li class="nav-item"><a class="nav-link" id="siniestro-tab" data-toggle="tab" href="#siniestroVehi" role="tab" aria-controls="siniestro" aria-selected="false">Siniestro</a></li>
			<li class="nav-item"><a class="nav-link" id="poliza-tab" data-toggle="tab" href="#polizaVehi" role="tab" aria-controls="poliza" aria-selected="false">P&oacute;liza</a></li>
			<li class="nav-item"><a class="nav-link" id="itv-tab" data-toggle="tab" href="#itvVehi" role="tab" aria-controls="itv" aria-selected="false">Itv</a></li>
			<li class="nav-item"><a class="nav-link" id="infraccion-tab" data-toggle="tab" href="#infraccionVehi" role="tab" aria-controls="infraccion" aria-selected="false">Infracci&oacute;n</a></li>
			<li class="nav-item"><a class="nav-link" id="infraccion-tab" data-toggle="tab" href="#mantenimientoVehi" role="tab" aria-controls="mantenimiento" aria-selected="false">Mantenimiento</a></li>
		 </ul>
       <!-- DEFINIMOS EL CONTENIDO -->
       <form id="filtroVehiculo" action="./filtrarVehiculo" method="POST">
       	<div class="tab-content" id="tabsNewVehiContent">
       	
       		<!-- VEHICULO -->
       		<div id="nuevoVehi" class="tab-pane fade show active" role="tabpanel" aria-labelledby="vehiculo-tab">
				<div id="formuGenVehi">
					<br />
					<h4>Datos del Veh&iacute;culo</h4>
					 	
					<br />
					<div class="form-row">
					<!-- Columna 1 -->
					<div class="col">
						<!-- Servicio Adscrito -->
						<label id="sAdsLabel" class="float-left">Servicio Adscrito </label>
						<select class="form-control" id="servicioOpt" name="fkServicioAdscrito" class="float-left"  required>
				            <option value="">-- Seleccione --</option>
				            <c:forEach items="${servicios}" var="servicio">
				            	<c:choose>
						            <c:when test="${servicio.nombre eq filtraProv}">
						                <option value="${servicio.id}" selected>${servicio.nombre}</option>
						            </c:when>
						            <c:otherwise>
						                <option value="${servicio.id}">${servicio.nombre}</option>
						            </c:otherwise>
						        </c:choose>
				            </c:forEach>
				        </select>
						<hr>
						<!-- Fecha Adscripcion Desde-->
						<label for="adscripcion" id="lblAdscripcionDesde" class="float-left">Fecha Adscripci&oacute;n Desde</label>
						<input type="date" id="fechaAdscripcionDesde" name="fechaAdscripcionDesde" class="form-control" pattern="dd-MM-yyyy" max='9999-12-31'/>
						<hr>
						<!-- Fecha Baja Desde-->
						<label for="baja" class="float-left">Fecha Baja Desde</label>
						<input type="date" id="fechaBajaDesde" name="fechaBajaDesde" class="form-control" pattern="dd-MM-yyyy" max='9999-12-31'/>
						<hr>
									
						<!-- Tipo Vehiculo -->
						<label for="tipoVehiculo" id="lblTipoVehiculo" class="float-left">Tipo Vehiculo</label>
						<select class="form-control" id="tipoVehiculo" name="tipoVehiculo" class="float-left"  required>
				          <option value="">-- Seleccione --</option>				           				     
						    <c:forEach items="${paramVehiculo}" var="parametroVehi">
						        <option value="${parametroVehi.id}">${parametroVehi.nombre}</option>
						    </c:forEach>
						</select>
				           
				           
						
						<hr>
						<!-- Tipo Uso -->
						<label class="float-left">Uso</label>
						<select class="form-control" id="usoOpt" name="fkParametroTipoUso" class="float-left">
							<option value="">-- Seleccione --</option>
							<c:forEach items="${parametros}" var="parametro">
								<c:if test = "${parametro.tipoParametro.codigo == 'US'}">
									<option value="${parametro.id}">${parametro.nombre}</option>
								</c:if>		
							</c:forEach>
						</select>
						<hr>
						<!-- Bastidor -->
						<label for="lname" class="float-left">Bastidor</label>
						<input type="text" id="bastidor" name="numeroBastidor" class="form-control" maxlength="150">
					
					</div>
					<!-- Columna 2 -->
					<div class="col">
						<!-- Tipo Repostaje -->
						<label class="float-left">Tipo Repostaje</label>
						<select class="form-control" id="repostajeOpt" name="fkParametroTipoRepostaje" class="float-left">
							<option value="">-- Seleccione --</option>
							<c:forEach items="${parametros}" var="parametro">
								<c:if test = "${parametro.tipoParametro.codigo == 'AL'}">
									<option value="${parametro.id}">${parametro.nombre}</option>
								</c:if>		
							</c:forEach>
						</select>
						<hr>
						<!-- Fecha Adscripcion Fin-->
						<label for="adscripcion" id="lblAdscripcionFin" class="float-left">Fecha Adscripci&oacute;n Hasta</label>
						<input type="date" id="fechaAdscripcionHasta" name="fechaAdscripcionHasta" class="form-control" pattern="dd-MM-yyyy" max='9999-12-31'/>
						<hr>
						<!-- Fecha Baja Hasta-->
						<label for="baja" class="float-left">Fecha Baja Hasta</label>
						<input type="date" id="fechaBajaHasta" name="fechaBajaHasta" class="form-control" pattern="dd-MM-yyyy" max='9999-12-31'/>
						<hr>						
						<!-- Tipo Adquisición -->
						<label class="float-left">Tipo Adquisici&oacute;n</label>
						<select class="form-control" id="adquisicionOpt" name="fkParametroTipoAdquisicion" class="float-left">
						<option value="">-- Seleccione --</option>
						<c:forEach items="${parametros}" var="parametro">
						<c:if test="${parametro.tipoParametro.codigo == 'TA'}">
						<option value="${parametro.id}">${parametro.nombre}</option>
						</c:if>
						</c:forEach>
						</select>
						<hr>
						<!-- Fecha Compra Desde -->
						<label for="compra" id="lblCompraDesde" class="float-left">Fecha Compra Desde</label>
						<input type="date" id="fechaCompraDesde" name="fechaCompraDesde" class="form-control" pattern="dd-MM-yyyy" max='9999-12-31'/>
						
						</div>
					<!-- Columna 3 -->
					<div class="col">
						
						<!-- Situacion -->
						<label class="float-left">Situaci&oacute;n</label>
						<select class="form-control" id="situacionOpt" name="fkParametroTipoSituacion" class="float-left">
							<option value="">-- Seleccione --</option>
							<c:forEach items="${parametros}" var="parametro">
								<c:if test = "${parametro.tipoParametro.codigo == 'SI'}">
									<option value="${parametro.id}">${parametro.nombre}</option>
								</c:if>		
							</c:forEach>
						</select>
						<hr>
						<!-- Marca -->
						<label id="marcaLabel" class="float-left">Marca</label>
						<select class="form-control" id="marcaOpt" name="marca" class="float-left" >    		
							<option value="">-- Seleccione --</option>
							<c:forEach items="${marcas}" var="marca">
								<option value="${marca.id}">${marca.nombre}</option>
							</c:forEach>
						</select>
						<hr>
						<!-- Modelo -->
						<label id="modeloLabel" class="float-left">Modelo </label>
						<select class="form-control" id="modeloOpt" name="fkModelo" class="float-left" >
							<option value="">-- Seleccione --</option>
							<c:forEach items="${modelos}" var="modelo">
								<option value="${modelo.id}">${modelo.nombre}</option>
							</c:forEach>
						</select>
						<hr>
						<!-- Operadoras -->
						<label id="operadoraLabel" class="float-left">Empresa Operadora </label>
						<select class="form-control" id="fkOperadora" name="fkOperadora" class="float-left" disabled="true">
						<option value="">-- Seleccione --</option>
						<c:forEach items="${operadoras}" var="operadora">
						<option value="${operadora.id}">${operadora.nombre}</option>
						</c:forEach>
						</select>
						<hr>
						<!-- Fecha Compra Fin-->
						<label for="compra" id="lblCompraFin" class="float-left">Fecha Compra Hasta</label>
						<input type="date" id="fechaCompraHasta" name="fechaCompraHasta" class="form-control" pattern="dd-MM-yyyy" max='9999-12-31'/>
					</div>
				</div>

			  </div>

			</div>
			
		<!-- MATRICULA -->
        <div class="tab-pane fade" id="matriculaVehi" role="tabpanel" aria-labelledby="matriculaVehi-tab">
         <br />
         <h4>Datos de la Matr&iacute;cula</h4>
         <br />
	        <div class="form-row">
	          <div class="float-left">

	           <div class="row">
	            <div class="col">
	             <!-- Matricula -->
	             <label id="lblNombre" for="lname" class="float-left">Matr&iacute;cula</label>
	             <input type="text" id="nombreMatricula" name="nombreMatricula" maxlength="50" class="form-control">
	             <hr>
	             <!-- Fecha Matriculacion Desde-->
	             <label id="lblFechaMatriculacionDesde" for="fname" class="float-left">Fecha Matriculaci&oacute;n Desde</label>
	             <input type="date" id="fechaMatriculacionDesde" name="fechaMatriculacionDesde" class="form-control" pattern="dd-MM-yyyy" max='9999-12-31'/>
	            </div>
	            <div class="col">
	              <!-- Tarjeta Repostaje -->
	             <label for="lname" class="float-left">Tarjeta Repostaje</label>
	             <input type="text" id="tarjetaRepostaje" name="tarjetaRepostaje" maxlength="50" class="form-control">
	             <hr>
	             <!-- Fecha Matriculacion Desde-->
	             <label id="lblFechaMatriculacionHasta" for="fname" class="float-left">Fecha Matriculaci&oacute;n Hasta</label>
	             <input type="date" id="fechaMatriculacionHasta" name="fechaMatriculacionHasta" class="form-control" pattern="dd-MM-yyyy" max='9999-12-31'/>
	             </div>
	           </div>
	          </div>
	        </div>
         </div>
        
       <!-- EQUIPAMIENTO -->
			<div class="tab-pane fade" id="equipamientoVehi" role="tabpanel" aria-labelledby="equipamiento-tab">
				<div id="avisoPermisoEquipamiento" class="classAviso d-none">Actualmente no dispone de permisos suficientes para acceder a &eacute;sta pantalla, por favor contacte con el Administrador</div>
				<div id="formuGenEquip">
					<br />
					<h4>Datos del Equipamiento</h4>
					<br/>
					<div class="form-row">
			          <div class="float-left">
			           <div class="col">
						<!-- Tipo Equipamiento -->
						<label id="lblEquipamiento" class="float-left">Tipo de Equipamiento</label>
						<select class="form-control" id="fkTipoEquipamiento" name="fkTipoEquipamiento" class="float-left">
							<option value="">-- Seleccione --</option>
							<c:forEach items="${parametros}" var="parametro">
								<c:if test="${parametro.tipoParametro.codigo == 'EQ'}">
									<option value="${parametro.id}">${parametro.nombre}</option>
								</c:if>
							</c:forEach>
						</select>
						
			          </div>
			        </div>
						
				</div>

			</div>
			
			
		</div>
		
		<!-- CESION -->
			<div class="tab-pane fade" id="cesionVehi" role="tabpanel" aria-labelledby="cesion-tab">
				<div id="avisoPermisoCesion" class="classAviso d-none">Actualmente no dispone de permisos suficientes para acceder a &eacute;sta pantalla, por favor contacte con el Administrador</div>
				<div id="formuGenCes">
					<br />
					<h4>Datos de la Cesi&oacute;n</h4>
					<br />
	
						<div class="form-row">
							<div class="col">
								<!-- Tipo Motivo -->
								<label id="lblMotivo" class="float-left">Motivo</label>
								<select class="form-control" id="fkParametroTipoMotivo" name="fkParametroTipoMotivo" class="float-left">
									<option value="">-- Seleccione --</option>
									<c:forEach items="${parametros}" var="parametro">
										<c:if test = "${parametro.tipoParametro.codigo == 'MO'}">
											<option value="${parametro.id}">${parametro.nombre}</option>
										</c:if>		
									</c:forEach>
								</select>
								<hr>
								<!-- Fecha Inicio Desde -->
								<label for="inicio" id="lblInicio" class="float-left">Fecha Inicio Desde</label>
								<input type="date" id="fechaInicioDesde" name="fechaInicioDesde" maxlength="10" class="form-control"/>
								<hr>
								<!-- Fecha Fin Desde -->
								<label for="fin" id="lblFin" class="float-left">Fecha Fin Desde</label>
								<input type="date" id="fechaFinDesde" name="fechaFinDesde" maxlength="10" class="form-control"/>
							</div>
							<div class="col">
								<!-- Destino -->
								<label id="lblDestino" class="float-left">Destino </label>
								<select class="form-control" id="cesionDestino" name="fkServicioAdscritoCesiones" class="float-left">
									<option value="">-- Seleccione --</option>
									<c:forEach items="${servicios}" var="servicio">
											<option value="${servicio.id}">${servicio.nombre}</option>	
									</c:forEach>
								</select>
								<hr>
								<!-- Fecha Inicio Hasta -->
								<label for="inicio" id="lblInicio" class="float-left">Fecha Inicio Hasta</label>
								<input type="date" id="fechaInicioHasta" name="fechaInicioHasta" maxlength="10" class="form-control"/>
								<hr>
								<!-- Fecha Fin Hasta -->
								<label for="fin" id="lblFin" class="float-left">Fecha Fin Hasta</label>
								<input type="date" id="fechaFinHasta" name="fechaFinHasta" maxlength="10" class="form-control"/>
							</div>
						</div>
				</div>
			</div>
			
		<!-- REPOSTAJE -->
			<div class="tab-pane fade" id="repostajeVehi" role="tabpanel" aria-labelledby="repostaje-tab">
				<div id="avisoPermisoRepostaje" class="classAviso d-none">Actualmente no dispone de permisos suficientes para acceder a &eacute;sta pantalla, por favor contacte con el Administrador</div>
				<div id="formuGenRep">
					<br />
					<h4>Datos del Repostaje</h4>
					<br />

						<div class="form-row">

							<div class="col">
								<!-- Fecha Repostaje Desde-->
								<label id="lblFechaRepostajeDesde" for="fname" class="float-left">Fecha Repostaje Desde</label>
								<input type="date" id="fechaRepostajeDesde" name="fechaRepostajeDesde" class="form-control" pattern="dd-MM-yyyy" max='9999-12-31'/>
							</div>
							<div class="col">
								<!-- Fecha Repostaje Hasta-->
								<label id="lblFechaRepostajeHasta" for="fname" class="float-left">Fecha Repostaje Hasta</label>
								<input type="date" id="fechaRepostajeHasta" name="fechaRepostajeHasta" class="form-control" pattern="dd-MM-yyyy" max='9999-12-31'/>
							</div>
							<div class="col">
								<!-- Descripción -->
								<label id="lblDescripcion" for="ldesrepo" class="float-left">Descripci&oacute;n</label>
								<input type="text" id="descripcionRepo" name="descripcionRepo" class="form-control" maxlength="100">
							</div>
						</div>
				
					</div>

			</div>
			
			<!-- SINIESTRO -->
			<div class="tab-pane fade" id="siniestroVehi" role="tabpanel" aria-labelledby="siniestro-tab">
				<div id="avisoPermisoSiniestro" class="classAviso d-none">Actualmente no dispone de permisos suficientes para acceder a &eacute;sta pantalla, por favor contacte con el Administrador</div>
				<div id="formuGenSini">
					<br />
					<h4>Datos del Siniestro</h4>
					<br />
	
						<div class="form-row">
							<!-- Columna 1 -->
							<div class="col">
								<!-- Fecha Siniestro Desde-->
								<label id="lblFechaSiniestroDesde" class="float-left">Fecha Siniestro Desde</label>
								<input type="date" id="fechaSiniestroDesde" name="fechaSiniestroDesde" class="form-control" pattern="dd-MM-yyyy" max='9999-12-31'/>

							</div>
							<!-- Columna 2 -->
							<div class="col">
								<!-- Fecha Siniestro Hasta-->
								<label id="lblFechaSiniestroHasta" class="float-left">Fecha Siniestro Hasta</label>
								<input type="date" id="fechaSiniestroHasta" name="fechaSiniestroHasta" class="form-control" pattern="dd-MM-yyyy" max='9999-12-31'/>

							</div>
						</div>
					</div>
				</div>
			<!-- POLIZA -->
			<div class="tab-pane fade" id="polizaVehi" role="tabpanel" aria-labelledby="poliza-tab">
				<div id="avisoPermisoPoliza" class="classAviso d-none">Actualmente no dispone de permisos suficientes para acceder a &eacute;sta pantalla, por favor contacte con el Administrador</div>
				<div id="formuGenPoli">
					<br />
					<h4>Datos de la P&oacute;liza</h4>
					<br />
	
						<div class="form-row">
							<!-- Columna 1 -->
							<div class="col">
								<!-- Compania -->
								<label id="etiquetaCompania" class="float-left">Compa&ntilde;&iacute;a</label>
								<select class="form-control" id="fkCompania" name="fkCompania" class="float-left">
									<option value="">-- Seleccione --</option>
									<c:forEach items="${companias}" var="compania">
										<option value="${compania.id}">${compania.nombre}</option>
									</c:forEach>
								</select>
								<hr>
								<!-- Fecha Inicio Desde -->
								<label id="etiquetaFechaInicioDesde" for="fname" class="float-left">Fecha Inicio P&oacute;liza Desde</label>
								<input type="date" id="fechaInicioPolizaDesde" name="fechaInicioPolizaDesde" maxlength="10" class="form-control">
								<hr>
								<!-- Fecha Fin Desde-->
								<label id="etiquetaFechaFinDesde" for="fname" class="float-left">Fecha Fin P&oacute;liza Desde</label>
								<input type="date" id="fechaFinPolizaDesde" name="fechaFinPolizaDesde" maxlength="10" class="form-control">
						
							</div>
							<!-- Columna 2 -->
							<div class="col">
								<!-- N Poliza -->
								<label id="etiquetaPoliza" for="fname" class="float-left">N&ordm; P&oacute;liza</label>
								<input type="text" id="numeroPoliza" name="numeroPoliza" maxlength="50" class="form-control">
								<hr>
								<!-- Fecha Inicio Hasta -->
								<label id="etiquetaFechaInicioHasta" for="fname" class="float-left">Fecha Inicio P&oacute;liza Hasta </label>
								<input type="date" id="fechaInicioPolizaHasta" name="fechaInicioPolizaHasta" maxlength="10" class="form-control">
								<hr>
								<!-- Fecha Fin Hasta-->
								<label id="etiquetaFechaFinHasta" for="fname" class="float-left">Fecha Fin P&oacute;liza Hasta</label>
								<input type="date" id="fechaFinPolizaHasta" name="fechaFinPolizaHasta" maxlength="10" class="form-control">

							</div>

						</div>
				</div>

			</div>
			<!-- ITV -->
			<div class="tab-pane fade" id="itvVehi" role="tabpanel" aria-labelledby="itv-tab">
				<div id="avisoPermisoItv" class="classAviso d-none">Actualmente no dispone de permisos suficientes para acceder a &eacute;sta pantalla, por favor contacte con el Administrador</div>
				<div id="formuGenItv">
					<br />
					<h4>Datos de la Itv</h4>
					<br />
						<div class="form-row">
							<div class="float-left">

								<div class="row">
									<div class="col">
										<!-- Fecha Itv -->
										<label id="lblFechaItvDesde" for="fechaItv" class="float-left">Fecha	Realizaci&oacute;n ITV Desde</label>
										<input type="date" id="fechaItvDesde" name="fechaItvDesde" class="form-control" pattern="dd-MM-yyyy" max='9999-12-31'/>
										<hr>
										<!-- Fecha Siguiente -->
										<label id="lblFechaSiguienteItvDesde" for="fechaSiguienteItv" class="float-left"> Fecha Pr&oacute;xima ITV Realizaci&oacute;n Desde</label>
										<input type="date" id="fechaSiguienteItvDesde" name="fechaSiguienteItvDesde" class="form-control" pattern="dd-MM-yyyy" max='9999-12-31'/>
									
									</div>
									
									<div class="col">
										<!-- Fecha Itv -->
										<label id="lblFechaItvHasta" for="fechaItv" class="float-left">Fecha	Realizaci&oacute;n ITV Hasta</label>
										<input type="date" id="fechaItvHasta" name="fechaItvHasta" class="form-control" pattern="dd-MM-yyyy" max='9999-12-31'/>
										<hr>
										<!-- Fecha Siguiente -->
										<label id="lblFechaSiguienteItvHasta" for="fechaSiguienteItv" class="float-left"> Fecha Pr&oacute;xima Realizaci&oacute;n ITV Hasta</label>
										<input type="date" id="fechaSiguienteItvHasta" name="fechaSiguienteItvHasta" class="form-control" pattern="dd-MM-yyyy" max='9999-12-31'/>
									
									</div>
						
								</div>
							</div>
						</div>
					</div>
				</div>
				
				<!-- INFRACCION -->
			<div class="tab-pane fade" id="infraccionVehi" role="tabpanel" aria-labelledby="infraccion-tab">
				<div id="avisoPermisoInfraccion" class="classAviso d-none">Actualmente no dispone de permisos suficientes para acceder a &eacute;sta pantalla, por favor contacte con el Administrador</div>
				<div id="formuGenInfra">
					<br />
					<h4>Datos de la Infracci&oacute;n</h4>
					<br />
	
						<div class="form-row">
							<!-- Columna 1 -->
							<div class="col">
								<!-- Fecha Infraccion Desde-->
								<label id="lblFechaInfraccionDesde" class="float-left">Fecha Infracci&oacute;n Desde</label>
								<input type="date" id="fechaInfraccionDesde" name="fechaInfraccionDesde" class="form-control" pattern="dd-MM-yyyy" max='9999-12-31'/>
								
							</div>
							<!-- Columna 2 -->
							<div class="col">
								<!-- Fecha Infraccion Hasta-->
								<label id="lblFechaInfraccionHasta" class="float-left">Fecha Infracci&oacute;n Hasta</label>
								<input type="date" id="fechaInfraccionHasta" name="fechaInfraccionHasta" class="form-control" pattern="dd-MM-yyyy" max='9999-12-31'/>
								
							</div>
							
						</div>
						
					
				</div>

			</div>
			<!-- Mantenimiento -->
			<div class="tab-pane fade" id="mantenimientoVehi" role="tabpanel" aria-labelledby="mantenimiento-tab">
				<div id="avisoPermisoMantenimiento" class="classAviso d-none">Actualmente no dispone de permisos suficientes para acceder a &eacute;sta pantalla, por favor contacte con el Administrador</div>
				<div id="formuGenMant">
					<br />
					<h4>Datos del Mantenimiento</h4>
					<br />
					<div class="form-row">
							<div class="float-left">
								<div class="row">
									<!-- Columna 1 -->
									<div class="col">
										<!-- Taller -->
										<label for="fname" id="lblTallerMant" class="float-left">Taller</label>
										<select class="form-control" id="tallerMant" name="fkTaller" class="float-left">
											<option value="">-- Seleccione --</option>
											<c:forEach items="${talleres}" var="taller">
												<option value="${taller.id}">${taller.nombre}</option>
											</c:forEach>
										</select>
									<hr>
									<!-- Concepto -->
									<label for="fname" class="float-left">Concepto</label>
						  			<select class="form-control" id="concepto" name="fkConcepto" class="float-left">
										<option value="">-- Seleccione --</option>
										<c:forEach items="${conceptos}" var="concepto">
												<option value="${concepto.id}">${concepto.nombre}</option>
											</c:forEach>
									</select>
									<hr>
									<!-- Reparacion -->
									<label for="fname" id="lblReparacionMant" class="float-left">Reparaci&oacute;n</label>
									<select class="form-control" id=reparacionMant name="fkParametroTipoReparacion" class="float-left">
										<option value="">-- Seleccione --</option>
								            	<c:forEach items="${parametros}" var="parametro">
				                            				<c:if test="${parametro.tipoParametro.codigo == 'TR'}">
				                            					<option value="${parametro.id}">${parametro.nombre}</option>
				                            				</c:if>
				                            			</c:forEach>
								    	</select> 

									</div>
									<!-- Columna 2 -->
									<div class="col">
										<!-- Fecha Autorizacion Desde-->
										<label id="lblFechaAutorizacionMantDesde" class="float-left">Fecha Autorizaci&oacute;n Desde</label>
										<input type="date" id="fechaAutorizacionDesde" name="fechaAutorizacionDesde" class="form-control" pattern="dd-MM-yyyy" max='9999-12-31'/>
										<hr>
										<!-- Fecha Factura Desde-->
										<label id="lblFechaFacturaMantDesde" class="float-left">Fecha de Factura Desde</label>
										<input type="date" id="fechaFacturaDesde" name="fechaFacturaDesde" class="form-control" pattern="dd-MM-yyyy" max='9999-12-31'/>
										<hr>
										<!-- Fecha Intervencion Desde -->
										<label id="lblFechaIntervervencionDesde" class="float-left">Fecha de intervenci&oacute;n Desde</label>
										<input type="date" id="fechaIntervencionDesde" name="fechaIntervencionDesde" class="form-control" pattern="dd-MM-yyyy" max='9999-12-31'>
									</div>
									<!-- Columna 3 -->
									<div class="col">
										<!-- Fecha Autorizacion Hasta-->
										<label id="lblFechaAutorizacionMantHasta" class="float-left">Fecha Autorizaci&oacute;n Hasta</label>
										<input type="date" id="fechaAutorizacionHasta" name="fechaAutorizacionHasta" class="form-control" pattern="dd-MM-yyyy" max='9999-12-31'/>
										<hr>
										<!-- Fecha Factura Hasta-->
										<label id="lblFechaFacturaMantHasta" class="float-left">Fecha de Factura Hasta</label>
										<input type="date" id="fechaFacturaHasta" name="fechaFacturaHasta" class="form-control" pattern="dd-MM-yyyy" max='9999-12-31'/>
										<hr>
										<!-- Fecha Intervencion Hasta -->
										<label id="lblFechaIntervervencionHasta" class="float-left">Fecha de intervenci&oacute;n Hasta</label>
										<input type="date" id="fechaIntervencionHasta" name="fechaIntervencionHasta" class="form-control" pattern="dd-MM-yyyy" max='9999-12-31'>
									</div>
								</div>

							</div>
						</div>
					</div>

			</div>
			
		</div>
       </form>
      </div>
      <div class="modal-footer">
       <button type="button" class="btn btn-default" data-dismiss="modal" onclick="resetModalFilter()">Cerrar</button>
       <button type="button" id="filtrarVehiculo" class="btn btn-primary" onclick="filtrarTablaVehiculo()">Filtrar</button>
	   <button type="button" id="limpiaroDatosForm" class="btn btn-primary" onclick="limpiarFormFiltroVehiculo()">Limpiar datos formulario</button>
      </div>
    </div>
  </div>
</div>



<script src="resources/js/date-eu.js" charset="utf-8"></script>