import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Vehiculo, Matricula, Equipamiento, Mantenimiento, Cesion, Repostaje, Siniestro, Poliza, Itv, Infraccion } from '../../../domain/vehiculo.model';
import * as VehiculosActions from '../../../state/vehiculos/vehiculos.actions';
import {
    selectSelectedVehiculo,
    selectVehiculoMatriculas,
    selectVehiculoEquipamiento,
    selectVehiculoMantenimientos,
    selectVehiculoCesiones,
    selectVehiculoRepostajes,
    selectVehiculoSiniestros,
    selectVehiculoPolizas,
    selectVehiculoItvs,
    selectVehiculoInfracciones
} from '../../../state/vehiculos/vehiculos.selectors';

@Component({
    selector: 'app-vehiculo-detail',
    standalone: true,
    imports: [CommonModule, RouterModule, ReactiveFormsModule],
    template: `
    <div class="container-junta mt-4">
         <nav class="breadcrumb-junta mb-3">
            <a routerLink="/">Inicio</a> <span>/</span>
            <a routerLink="/vehiculos">Vehículos</a> <span>/</span>
            <span *ngIf="vehiculo$ | async as v">{{ v.matricula }}</span>
          </nav>

        <div class="card mb-4 shadow-sm" *ngIf="vehiculo$ | async as vehiculo">
            <div class="card-header bg-success text-white">
                <h3 class="mb-0">Vehículo: {{ vehiculo.matricula }}</h3>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-md-4"><strong>Marca:</strong> {{ vehiculo.marcaNombre }}</div>
                    <div class="col-md-4"><strong>Modelo:</strong> {{ vehiculo.modelo }}</div>
                    <div class="col-md-4"><strong>Tipo:</strong> {{ vehiculo.tipoVehiculo }}</div>
                    <div class="col-md-4"><strong>Bastidor:</strong> {{ vehiculo.bastidor }}</div>
                    <div class="col-md-4"><strong>F. Matriculación:</strong> {{ vehiculo.fechaMatriculacion }}</div>
                    <div class="col-md-4"><strong>Estado:</strong> {{ vehiculo.activo ? 'Activo' : 'Inactivo' }}</div>
                </div>
            </div>
        </div>

        <ul class="nav nav-tabs">
            <li class="nav-item">
                <a class="nav-link" [class.active]="activeTab === 'matriculas'" (click)="activeTab = 'matriculas'" role="button">Matrículas</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" [class.active]="activeTab === 'equipamiento'" (click)="activeTab = 'equipamiento'" role="button">Equipamiento</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" [class.active]="activeTab === 'mantenimientos'" (click)="activeTab = 'mantenimientos'" role="button">Mantenimientos</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" [class.active]="activeTab === 'cesiones'" (click)="activeTab = 'cesiones'" role="button">Cesiones</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" [class.active]="activeTab === 'repostajes'" (click)="activeTab = 'repostajes'" role="button">Repostajes</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" [class.active]="activeTab === 'siniestros'" (click)="activeTab = 'siniestros'" role="button">Siniestros</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" [class.active]="activeTab === 'polizas'" (click)="activeTab = 'polizas'" role="button">Pólizas</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" [class.active]="activeTab === 'itvs'" (click)="activeTab = 'itvs'" role="button">ITVs</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" [class.active]="activeTab === 'infracciones'" (click)="activeTab = 'infracciones'" role="button">Infracciones</a>
            </li>
        </ul>

        <div class="tab-content mt-3 p-3 bg-white border border-top-0">
            <!-- MATRICULAS -->
            <div *ngIf="activeTab === 'matriculas'">
                 <div class="d-flex justify-content-between mb-3">
                    <h4>Histórico de Matrículas</h4>
                    <button class="btn btn-primary btn-sm" (click)="showMatriculaForm = !showMatriculaForm">Nueva Matrícula</button>
                 </div>
                 <div *ngIf="showMatriculaForm" class="card mb-3 bg-light"><div class="card-body">
                    <form [formGroup]="matriculaForm" (ngSubmit)="addMatricula()">
                        <div class="row">
                            <div class="col-md-4"><input type="text" class="form-control" formControlName="numero" placeholder="Número"></div>
                            <div class="col-md-4"><input type="date" class="form-control" formControlName="fecha"></div>
                            <div class="col-md-4"><button class="btn btn-success" [disabled]="matriculaForm.invalid">Guardar</button></div>
                        </div>
                    </form>
                 </div></div>
                 <table class="table table-sm">
                    <thead><tr><th>Número</th><th>Fecha</th><th>Actual</th></tr></thead>
                    <tbody><tr *ngFor="let m of matriculas$ | async"><td>{{ m.numero }}</td><td>{{ m.fecha }}</td><td>{{ m.actual ? 'Sí' : 'No' }}</td></tr></tbody>
                 </table>
            </div>

            <!-- EQUIPAMIENTO -->
            <div *ngIf="activeTab === 'equipamiento'">
                 <div class="d-flex justify-content-between mb-3">
                    <h4>Equipamiento Instalado</h4>
                    <button class="btn btn-primary btn-sm" (click)="showEquipForm = !showEquipForm">Nuevo Equipamiento</button>
                 </div>
                 <div *ngIf="showEquipForm" class="card mb-3 bg-light"><div class="card-body">
                    <form [formGroup]="equipForm" (ngSubmit)="addEquipamiento()">
                        <div class="row">
                            <div class="col-md-6"><input type="text" class="form-control" formControlName="descripcion" placeholder="Descripción"></div>
                            <div class="col-md-4"><input type="date" class="form-control" formControlName="fechaInstalacion"></div>
                            <div class="col-md-2"><button class="btn btn-success" [disabled]="equipForm.invalid">Guardar</button></div>
                        </div>
                    </form>
                 </div></div>
                 <ul class="list-group">
                    <li class="list-group-item" *ngFor="let e of equipamiento$ | async"><strong>{{ e.descripcion }}</strong> ({{ e.fechaInstalacion }})</li>
                 </ul>
            </div>

            <!-- MANTENIMIENTOS -->
            <div *ngIf="activeTab === 'mantenimientos'">
                <div class="d-flex justify-content-between mb-3">
                    <h4>Historial de Mantenimientos</h4>
                    <button class="btn btn-primary btn-sm" (click)="showMantForm = !showMantForm">Registrar Mantenimiento</button>
                 </div>
                 <div *ngIf="showMantForm" class="card mb-3 bg-light"><div class="card-body">
                    <form [formGroup]="mantForm" (ngSubmit)="addMantenimiento()">
                        <div class="row">
                            <div class="col-md-6"><input type="text" class="form-control" formControlName="descripcion" placeholder="Descripción"></div>
                            <div class="col-md-3"><input type="date" class="form-control" formControlName="fecha"></div>
                            <div class="col-md-3"><button class="btn btn-success" [disabled]="mantForm.invalid">Guardar</button></div>
                        </div>
                    </form>
                 </div></div>
                 <table class="table table-bordered">
                    <thead><tr><th>Fecha</th><th>Descripción</th><th>Importe</th><th>Estado</th></tr></thead>
                    <tbody>
                        <tr *ngFor="let man of mantenimientos$ | async">
                            <td>{{ man.fecha }}</td><td>{{ man.descripcion }}</td><td>{{ man.importe | currency:'EUR' }}</td><td>{{ man.finalizado ? 'Finalizado' : 'En Curso' }}</td>
                        </tr>
                    </tbody>
                 </table>
            </div>

            <!-- CESIONES -->
            <div *ngIf="activeTab === 'cesiones'">
                <div class="d-flex justify-content-between mb-3">
                    <h4>Cesiones</h4>
                    <button class="btn btn-primary btn-sm" (click)="showCesionForm = !showCesionForm">Nueva Cesión</button>
                </div>
                <div *ngIf="showCesionForm" class="card mb-3 bg-light"><div class="card-body">
                    <form [formGroup]="cesionForm" (ngSubmit)="addCesion()">
                        <div class="row">
                            <div class="col-md-3"><input type="text" class="form-control" formControlName="conductor" placeholder="Conductor"></div>
                            <div class="col-md-3"><input type="text" class="form-control" formControlName="departamento" placeholder="Departamento"></div>
                            <div class="col-md-2"><input type="date" class="form-control" formControlName="fechaInicio"></div>
                            <div class="col-md-2"><input type="date" class="form-control" formControlName="fechaFin"></div>
                            <div class="col-md-2"><button class="btn btn-success" [disabled]="cesionForm.invalid">Guardar</button></div>
                        </div>
                    </form>
                </div></div>
                <table class="table table-sm">
                    <thead><tr><th>Conductor</th><th>Departamento</th><th>Inicio</th><th>Fin</th></tr></thead>
                    <tbody><tr *ngFor="let c of cesiones$ | async"><td>{{ c.conductor }}</td><td>{{ c.departamento }}</td><td>{{ c.fechaInicio }}</td><td>{{ c.fechaFin }}</td></tr></tbody>
                </table>
            </div>

            <!-- REPOSTAJES -->
            <div *ngIf="activeTab === 'repostajes'">
                <div class="d-flex justify-content-between mb-3">
                    <h4>Repostajes</h4>
                    <button class="btn btn-primary btn-sm" (click)="showRepostajeForm = !showRepostajeForm">Nuevo Repostaje</button>
                </div>
                <div *ngIf="showRepostajeForm" class="card mb-3 bg-light"><div class="card-body">
                    <form [formGroup]="repostajeForm" (ngSubmit)="addRepostaje()">
                        <div class="row">
                            <div class="col-md-3"><input type="date" class="form-control" formControlName="fecha"></div>
                            <div class="col-md-3"><input type="number" class="form-control" formControlName="litros" placeholder="Litros"></div>
                            <div class="col-md-3"><input type="number" class="form-control" formControlName="importe" placeholder="Importe"></div>
                            <div class="col-md-3"><button class="btn btn-success" [disabled]="repostajeForm.invalid">Guardar</button></div>
                        </div>
                    </form>
                </div></div>
                <table class="table table-sm">
                    <thead><tr><th>Fecha</th><th>Litros</th><th>Importe</th><th>Kms</th></tr></thead>
                    <tbody><tr *ngFor="let r of repostajes$ | async"><td>{{ r.fecha }}</td><td>{{ r.litros }}</td><td>{{ r.importe | currency:'EUR' }}</td><td>{{ r.kilometros }}</td></tr></tbody>
                </table>
            </div>

            <!-- SINIESTROS -->
            <div *ngIf="activeTab === 'siniestros'">
                 <div class="d-flex justify-content-between mb-3">
                    <h4>Siniestros</h4>
                    <button class="btn btn-primary btn-sm" (click)="showSiniestroForm = !showSiniestroForm">Nuevo Siniestro</button>
                </div>
                <div *ngIf="showSiniestroForm" class="card mb-3 bg-light"><div class="card-body">
                    <form [formGroup]="siniestroForm" (ngSubmit)="addSiniestro()">
                        <div class="row">
                            <div class="col-md-3"><input type="date" class="form-control" formControlName="fecha"></div>
                            <div class="col-md-5"><input type="text" class="form-control" formControlName="descripcion" placeholder="Descripción"></div>
                            <div class="col-md-2"><input type="checkbox" formControlName="culpabilidad"> Culpable</div>
                            <div class="col-md-2"><button class="btn btn-success" [disabled]="siniestroForm.invalid">Guardar</button></div>
                        </div>
                    </form>
                </div></div>
                <table class="table table-sm">
                    <thead><tr><th>Fecha</th><th>Descripción</th><th>Importe</th><th>Culpable</th></tr></thead>
                    <tbody><tr *ngFor="let s of siniestros$ | async"><td>{{ s.fecha }}</td><td>{{ s.descripcion }}</td><td>{{ s.importe | currency:'EUR' }}</td><td>{{ s.culpabilidad ? 'Sí' : 'No' }}</td></tr></tbody>
                </table>
            </div>

            <!-- POLIZAS -->
            <div *ngIf="activeTab === 'polizas'">
                 <div class="d-flex justify-content-between mb-3">
                    <h4>Pólizas de Seguro</h4>
                    <button class="btn btn-primary btn-sm" (click)="showPolizaForm = !showPolizaForm">Nueva Póliza</button>
                </div>
                 <div *ngIf="showPolizaForm" class="card mb-3 bg-light"><div class="card-body">
                    <form [formGroup]="polizaForm" (ngSubmit)="addPoliza()">
                        <div class="row">
                            <div class="col-md-3"><input type="text" class="form-control" formControlName="compania" placeholder="Compañía"></div>
                            <div class="col-md-3"><input type="text" class="form-control" formControlName="numero" placeholder="Número"></div>
                             <div class="col-md-2"><input type="date" class="form-control" formControlName="fechaInicio"></div>
                             <div class="col-md-2"><input type="date" class="form-control" formControlName="fechaFin"></div>
                            <div class="col-md-2"><button class="btn btn-success" [disabled]="polizaForm.invalid">Guardar</button></div>
                        </div>
                    </form>
                </div></div>
                <table class="table table-sm">
                    <thead><tr><th>Compañía</th><th>Número</th><th>Inicio</th><th>Fin</th><th>Importe</th></tr></thead>
                    <tbody><tr *ngFor="let p of polizas$ | async"><td>{{ p.compania }}</td><td>{{ p.numero }}</td><td>{{ p.fechaInicio }}</td><td>{{ p.fechaFin }}</td><td>{{ p.importe | currency:'EUR' }}</td></tr></tbody>
                </table>
            </div>

            <!-- ITVS -->
            <div *ngIf="activeTab === 'itvs'">
                 <div class="d-flex justify-content-between mb-3">
                    <h4>Inspecciones Técnicas (ITV)</h4>
                    <button class="btn btn-primary btn-sm" (click)="showItvForm = !showItvForm">Nueva ITV</button>
                </div>
                <div *ngIf="showItvForm" class="card mb-3 bg-light"><div class="card-body">
                    <form [formGroup]="itvForm" (ngSubmit)="addItv()">
                        <div class="row">
                            <div class="col-md-3"><input type="date" class="form-control" formControlName="fecha"></div>
                            <div class="col-md-3">
                                <select class="form-select" formControlName="resultado">
                                    <option value="FAVORABLE">Favorable</option>
                                    <option value="DESFAVORABLE">Desfavorable</option>
                                    <option value="NEGATIVA">Negativa</option>
                                </select>
                            </div>
                             <div class="col-md-3"><input type="text" class="form-control" formControlName="estacion" placeholder="Estación"></div>
                            <div class="col-md-3"><button class="btn btn-success" [disabled]="itvForm.invalid">Guardar</button></div>
                        </div>
                    </form>
                </div></div>
                 <table class="table table-sm">
                    <thead><tr><th>Fecha</th><th>Resultado</th><th>Estación</th><th>Próxima</th></tr></thead>
                    <tbody><tr *ngFor="let i of itvs$ | async"><td>{{ i.fecha }}</td><td>{{ i.resultado }}</td><td>{{ i.estacion }}</td><td>{{ i.fechaProxima }}</td></tr></tbody>
                </table>
            </div>

            <!-- INFRACCIONES -->
            <div *ngIf="activeTab === 'infracciones'">
                 <div class="d-flex justify-content-between mb-3">
                    <h4>Infracciones</h4>
                    <button class="btn btn-primary btn-sm" (click)="showInfraccionForm = !showInfraccionForm">Nueva Infracción</button>
                </div>
                <div *ngIf="showInfraccionForm" class="card mb-3 bg-light"><div class="card-body">
                    <form [formGroup]="infraccionForm" (ngSubmit)="addInfraccion()">
                        <div class="row">
                            <div class="col-md-2"><input type="date" class="form-control" formControlName="fecha"></div>
                            <div class="col-md-4"><input type="text" class="form-control" formControlName="descripcion" placeholder="Descripción"></div>
                            <div class="col-md-2"><input type="number" class="form-control" formControlName="importe" placeholder="Importe"></div>
                             <div class="col-md-2"><input type="number" class="form-control" formControlName="puntos" placeholder="Puntos"></div>
                            <div class="col-md-2"><button class="btn btn-success" [disabled]="infraccionForm.invalid">Guardar</button></div>
                        </div>
                    </form>
                </div></div>
                 <table class="table table-sm">
                    <thead><tr><th>Fecha</th><th>Descripción</th><th>Importe</th><th>Puntos</th><th>Estado</th></tr></thead>
                    <tbody><tr *ngFor="let ifr of infracciones$ | async"><td>{{ ifr.fecha }}</td><td>{{ ifr.descripcion }}</td><td>{{ ifr.importe | currency:'EUR' }}</td><td>{{ ifr.puntos }}</td><td>{{ ifr.estado }}</td></tr></tbody>
                </table>
            </div>

        </div>
    </div>
    `,
    styles: [`
    .nav-link { cursor: pointer; }
    .container-junta { padding: 20px; }
    .breadcrumb-junta a { text-decoration: none; color: #009640; }
  `]
})
export class VehiculoDetailComponent implements OnInit {
    private store = inject(Store);
    private route = inject(ActivatedRoute);
    private fb = inject(FormBuilder);

    activeTab = 'matriculas';
    vehiculoId!: number;

    vehiculo$ = this.store.select(selectSelectedVehiculo);
    matriculas$ = this.store.select(selectVehiculoMatriculas);
    equipamiento$ = this.store.select(selectVehiculoEquipamiento);
    mantenimientos$ = this.store.select(selectVehiculoMantenimientos);
    cesiones$ = this.store.select(selectVehiculoCesiones);
    repostajes$ = this.store.select(selectVehiculoRepostajes);
    siniestros$ = this.store.select(selectVehiculoSiniestros);
    polizas$ = this.store.select(selectVehiculoPolizas);
    itvs$ = this.store.select(selectVehiculoItvs);
    infracciones$ = this.store.select(selectVehiculoInfracciones);

    showMatriculaForm = false;
    showEquipForm = false;
    showMantForm = false;
    showCesionForm = false;
    showRepostajeForm = false;
    showSiniestroForm = false;
    showPolizaForm = false;
    showItvForm = false;
    showInfraccionForm = false;

    matriculaForm = this.fb.group({ number: ['', Validators.required], fecha: ['', Validators.required], actual: [true] });
    equipForm = this.fb.group({ descripcion: ['', Validators.required], fechaInstalacion: ['', Validators.required] });
    mantForm = this.fb.group({ descripcion: ['', Validators.required], fecha: ['', Validators.required], importe: [0], finalizado: [false] });

    cesionForm = this.fb.group({
        conductor: ['', Validators.required],
        departamento: ['', Validators.required],
        fechaInicio: ['', Validators.required],
        fechaFin: ['']
    });

    repostajeForm = this.fb.group({
        fecha: ['', Validators.required],
        litros: [0, Validators.required],
        importe: [0, Validators.required],
        kilometros: [0, Validators.required]
    });

    siniestroForm = this.fb.group({
        fecha: ['', Validators.required],
        descripcion: ['', Validators.required],
        importe: [0],
        culpabilidad: [false]
    });

    polizaForm = this.fb.group({
        compania: ['', Validators.required],
        numero: ['', Validators.required],
        fechaInicio: ['', Validators.required],
        fechaFin: ['', Validators.required],
        importe: [0]
    });

    itvForm = this.fb.group({
        fecha: ['', Validators.required],
        resultado: ['FAVORABLE', Validators.required],
        estacion: ['', Validators.required],
        fechaProxima: ['']
    });

    infraccionForm = this.fb.group({
        fecha: ['', Validators.required],
        descripcion: ['', Validators.required],
        importe: [0],
        puntos: [0],
        estado: ['']
    });

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            const id = Number(params.get('id'));
            if (id) {
                this.vehiculoId = id;
                this.store.dispatch(VehiculosActions.loadVehiculoDetail({ id }));
                this.store.dispatch(VehiculosActions.loadMatriculas({ id }));
                this.store.dispatch(VehiculosActions.loadEquipamiento({ id }));
                this.store.dispatch(VehiculosActions.loadMantenimientos({ id }));
                this.store.dispatch(VehiculosActions.loadCesiones({ id }));
                this.store.dispatch(VehiculosActions.loadRepostajes({ id }));
                this.store.dispatch(VehiculosActions.loadSiniestros({ id }));
                this.store.dispatch(VehiculosActions.loadPolizas({ id }));
                this.store.dispatch(VehiculosActions.loadItvs({ id }));
                this.store.dispatch(VehiculosActions.loadInfracciones({ id }));
            }
        });
    }

    addMatricula() { if (this.matriculaForm.valid) { this.store.dispatch(VehiculosActions.addMatricula({ id: this.vehiculoId, matricula: this.matriculaForm.value as any })); this.showMatriculaForm = false; this.matriculaForm.reset(); } }
    addEquipamiento() { if (this.equipForm.valid) { this.store.dispatch(VehiculosActions.addEquipamiento({ id: this.vehiculoId, equipamiento: this.equipForm.value as any })); this.showEquipForm = false; this.equipForm.reset(); } }
    addMantenimiento() { if (this.mantForm.valid) { this.store.dispatch(VehiculosActions.addMantenimiento({ id: this.vehiculoId, mantenimiento: this.mantForm.value as any })); this.showMantForm = false; this.mantForm.reset(); } }
    addCesion() { if (this.cesionForm.valid) { this.store.dispatch(VehiculosActions.addCesion({ id: this.vehiculoId, cesion: this.cesionForm.value as any })); this.showCesionForm = false; this.cesionForm.reset(); } }
    addRepostaje() { if (this.repostajeForm.valid) { this.store.dispatch(VehiculosActions.addRepostaje({ id: this.vehiculoId, repostaje: this.repostajeForm.value as any })); this.showRepostajeForm = false; this.repostajeForm.reset(); } }
    addSiniestro() { if (this.siniestroForm.valid) { this.store.dispatch(VehiculosActions.addSiniestro({ id: this.vehiculoId, siniestro: this.siniestroForm.value as any })); this.showSiniestroForm = false; this.siniestroForm.reset(); } }
    addPoliza() { if (this.polizaForm.valid) { this.store.dispatch(VehiculosActions.addPoliza({ id: this.vehiculoId, poliza: this.polizaForm.value as any })); this.showPolizaForm = false; this.polizaForm.reset(); } }
    addItv() { if (this.itvForm.valid) { this.store.dispatch(VehiculosActions.addItv({ id: this.vehiculoId, itv: this.itvForm.value as any })); this.showItvForm = false; this.itvForm.reset(); } }
    addInfraccion() { if (this.infraccionForm.valid) { this.store.dispatch(VehiculosActions.addInfraccion({ id: this.vehiculoId, infraccion: this.infraccionForm.value as any })); this.showInfraccionForm = false; this.infraccionForm.reset(); } }
}
