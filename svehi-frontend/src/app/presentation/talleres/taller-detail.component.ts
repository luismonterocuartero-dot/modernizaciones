import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, combineLatest } from 'rxjs';
import { ServicioTaller, Taller } from '../../domain/talleres.model';
import * as TalleresActions from '../../state/talleres/talleres.actions';
import { selectAllTalleres, selectTallerServicios } from '../../state/talleres/talleres.selectors';
import { map } from 'rxjs/operators';
import { HeaderJuntaComponent } from '../components/header-junta/header-junta.component';

@Component({
    selector: 'app-taller-detail',
    standalone: true,
    imports: [CommonModule, RouterModule, ReactiveFormsModule, HeaderJuntaComponent],
    template: `
    <app-header-junta></app-header-junta>

    <div class="container-junta">
        <nav class="breadcrumb-junta">
            <a routerLink="/">Inicio</a>
            <span>/</span>
            <a routerLink="/talleres">Talleres</a>
            <span>/</span>
            <span class="current">Detalle Taller</span>
        </nav>

        <div class="card-junta mb-4" *ngIf="taller$ | async as taller">
            <div class="card-header-junta">
                <div class="d-flex justify-content-between align-items-center">
                    <h3 class="mb-0 text-white">{{ taller.nombre }}</h3>
                    <span class="badge bg-white text-primary">{{ taller.cif }}</span>
                </div>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-md-4">
                        <p class="mb-1 text-muted">Dirección</p>
                        <p class="fw-bold">{{ taller.direccion || 'No disponible' }}</p>
                    </div>
                    <div class="col-md-4">
                        <p class="mb-1 text-muted">Teléfono</p>
                        <p class="fw-bold">{{ taller.telefono || 'No disponible' }}</p>
                    </div>
                    <div class="col-md-4">
                        <p class="mb-1 text-muted">Email</p>
                        <p class="fw-bold">{{ taller.email || 'No disponible' }}</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="d-flex justify-content-between align-items-center mb-3">
            <h2 class="h4 text-primary border-bottom border-primary pb-2 mb-0">
                <i class="fa fa-list-alt me-2"></i>Histórico de Servicios
            </h2>
            <button class="btn-junta btn-junta-primary" (click)="toggleAddService()">
                <i class="fa" [class.fa-plus]="!isAddingService" [class.fa-times]="isAddingService"></i>
                {{ isAddingService ? 'CANCELAR' : 'NUEVO SERVICIO' }}
            </button>
        </div>

        <!-- Formulario de Nuevo Servicio -->
        <div *ngIf="isAddingService" class="card shadow-sm border-0 mb-4 bg-light">
             <div class="card-body p-4">
                <h5 class="card-title text-primary mb-4">Alta de Nuevo Servicio</h5>
                
                <form [formGroup]="serviceForm" (ngSubmit)="onAddService()">
                    <!-- Sección 1: Datos Generales -->
                    <div class="row mb-4">
                        <div class="col-12 mb-2"><h6 class="text-secondary border-bottom pb-1">Datos Adscripción</h6></div>
                        
                        <div class="col-md-6 mb-3">
                            <label class="form-label fw-bold">Centro Directivo <span class="text-danger">*</span></label>
                            <input type="text" class="form-control" formControlName="centroDirectivo" placeholder="Ej. Consejería de Hacienda">
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label fw-bold">Servicio Adscrito</label>
                            <input type="text" class="form-control" formControlName="servicioAdscrito" placeholder="Ej. Servicio de Automovilismo">
                        </div>
                        <div class="col-md-4 mb-3">
                            <label class="form-label fw-bold">Número Expediente</label>
                            <input type="text" class="form-control" formControlName="numeroExpediente">
                        </div>
                    </div>

                    <!-- Sección 2: Contacto -->
                    <div class="row mb-4">
                        <div class="col-12 mb-2"><h6 class="text-secondary border-bottom pb-1">Datos de Contacto</h6></div>
                        
                        <div class="col-md-4 mb-3">
                            <label class="form-label fw-bold">Nombre Contacto</label>
                            <input type="text" class="form-control" formControlName="nombreContacto">
                        </div>
                        <div class="col-md-4 mb-3">
                            <label class="form-label fw-bold">Teléfono Contacto</label>
                            <input type="text" class="form-control" formControlName="telefonoContacto">
                        </div>
                        <div class="col-md-4 mb-3">
                            <label class="form-label fw-bold">Email Contacto</label>
                            <input type="email" class="form-control" formControlName="emailContacto">
                        </div>
                    </div>

                    <!-- Sección 3: Fechas y Estado -->
                    <div class="row mb-4">
                        <div class="col-12 mb-2"><h6 class="text-secondary border-bottom pb-1">Vigencia y Estado</h6></div>

                        <div class="col-md-3 mb-3">
                            <label class="form-label fw-bold">Fecha Inicio <span class="text-danger">*</span></label>
                            <input type="date" class="form-control" formControlName="fechaInicio">
                        </div>
                        <div class="col-md-3 mb-3">
                            <label class="form-label fw-bold">Fecha Fin</label>
                            <input type="date" class="form-control" formControlName="fechaFin">
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label fw-bold">Motivo Fin</label>
                            <input type="text" class="form-control" formControlName="motivoFin" placeholder="Solo si ha finalizado">
                        </div>
                    </div>

                    <!-- Sección 4: Clasificación -->
                    <div class="row mb-4">
                        <div class="col-12 mb-2"><h6 class="text-secondary border-bottom pb-1">Clasificación y Observaciones</h6></div>

                        <div class="col-md-4 mb-3">
                            <label class="form-label fw-bold">Tipos de Vehículos</label>
                            <select multiple class="form-select" formControlName="tiposVehiculos" style="height: 120px">
                                <option value="TURISMO">Turismo</option>
                                <option value="MOTOCICLETA">Motocicleta</option>
                                <option value="FURGONETA">Furgoneta</option>
                                <option value="TODOTERRENO">Todoterreno</option>
                                <option value="INDUSTRIAL">Industrial</option>
                            </select>
                            <small class="text-muted">Use Ctrl para seleccionar varios</small>
                        </div>
                        
                        <div class="col-md-4 mb-3">
                            <label class="form-label fw-bold">Conceptos</label>
                            <select multiple class="form-select" formControlName="conceptos" style="height: 120px">
                                <option value="MANTENIMIENTO">Mantenimiento</option>
                                <option value="REPARACION">Reparación</option>
                                <option value="NEUMATICOS">Neumáticos</option>
                                <option value="ITV">ITV</option>
                                <option value="LAVADO">Lavado</option>
                            </select>
                            <small class="text-muted">Use Ctrl para seleccionar varios</small>
                        </div>

                        <div class="col-md-4 mb-3">
                            <div class="form-check mt-4">
                                <input class="form-check-input" type="checkbox" id="licitacionCheck" formControlName="licitacion">
                                <label class="form-check-label fw-bold" for="licitacionCheck">
                                    Licitación / Concurso Público
                                </label>
                            </div>
                            <div class="mt-3">
                                <label class="form-label fw-bold">Observaciones</label>
                                <textarea class="form-control" formControlName="observaciones" rows="3"></textarea>
                            </div>
                        </div>
                    </div>

                    <div class="d-flex justify-content-end gap-2 border-top pt-3">
                        <button type="button" class="btn btn-secondary" (click)="toggleAddService()">Cancelar</button>
                        <button type="submit" class="btn btn-success px-4" [disabled]="serviceForm.invalid">
                            <i class="fa fa-save me-2"></i>GUARDAR
                        </button>
                    </div>
                </form>
             </div>
        </div>

        <div class="table-container-junta">
            <table class="table-junta">
                <thead>
                    <tr>
                        <th>EXPEDIENTE</th>
                        <th>CENTRO DIRECTIVO</th>
                        <th>CONTACTO</th>
                        <th>FECHAS</th>
                        <th>TIPOS</th>
                        <th>LICITACIÓN</th>
                        <th class="text-center">ESTADO</th>
                    </tr>
                </thead>
                <tbody>
                    <tr *ngFor="let s of servicios$ | async">
                        <td>{{ s.numeroExpediente || 'S/N' }}</td>
                        <td>
                            <strong>{{ s.centroDirectivo }}</strong><br>
                            <small class="text-muted">{{ s.servicioAdscrito }}</small>
                        </td>
                        <td>
                            {{ s.nombreContacto }}<br>
                            <small><i class="fa fa-phone me-1"></i>{{ s.telefonoContacto }}</small>
                        </td>
                        <td>
                            <span class="text-success">{{ s.fechaInicio | date:'dd/MM/yyyy' }}</span>
                            <span *ngIf="s.fechaFin"> - <span class="text-danger">{{ s.fechaFin | date:'dd/MM/yyyy' }}</span></span>
                        </td>
                        <td>
                            <span class="badge bg-secondary me-1" *ngFor="let tipo of s.tiposVehiculos">{{ tipo }}</span>
                            <span class="badge bg-info text-dark me-1" *ngFor="let conc of s.conceptos">{{ conc }}</span>
                        </td>
                        <td class="text-center">
                            <i *ngIf="s.licitacion" class="fa fa-check-circle text-success fa-lg"></i>
                            <i *ngIf="!s.licitacion" class="fa fa-times-circle text-muted fa-lg"></i>
                        </td>
                        <td class="text-center">
                            <span class="badge" [class.bg-success]="!s.fechaFin" [class.bg-secondary]="s.fechaFin">
                                {{ s.fechaFin ? 'Finalizado' : 'Vigente' }}
                            </span>
                        </td>
                    </tr>
                    <tr *ngIf="(servicios$ | async)?.length === 0">
                        <td colspan="7" class="text-center py-4">
                            <i class="fa fa-info-circle text-muted me-2"></i>No hay servicios registrados para este taller.
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  `,
    styles: [`
    :host { display: block; min-height: 100vh; background-color: var(--junta-bg-light); }
    .card-header-junta {
        background-color: var(--junta-primary);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 4px 4px 0 0;
    }
    .card-junta {
        border: 1px solid #ddd;
        border-radius: 4px;
        background: white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }
    .current { color: var(--junta-text-muted); font-weight: 600; }
  `]
})
export class TallerDetailComponent implements OnInit {
    taller$: Observable<Taller | undefined>;
    servicios$: Observable<ServicioTaller[]>;
    serviceForm: FormGroup;
    isAddingService = false;
    tallerId!: number;

    constructor(
        private store: Store,
        private route: ActivatedRoute,
        private fb: FormBuilder
    ) {
        this.serviceForm = this.fb.group({
            centroDirectivo: ['', Validators.required],
            servicioAdscrito: [''],
            nombreContacto: [''],
            telefonoContacto: [''],
            emailContacto: ['', Validators.email],
            fechaInicio: [new Date().toISOString().substring(0, 10), Validators.required],
            fechaFin: [''],
            motivoFin: [''],
            numeroExpediente: [''],
            tiposVehiculos: [[]],
            conceptos: [[]],
            licitacion: [false],
            observaciones: ['']
        });

        this.taller$ = combineLatest([
            this.store.select(selectAllTalleres),
            this.route.paramMap
        ]).pipe(
            map(([talleres, params]) => {
                const id = Number(params.get('id'));
                this.tallerId = id;
                return talleres.find(t => t.id === id);
            })
        );

        this.servicios$ = this.store.select(selectTallerServicios);
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            const id = Number(params.get('id'));
            if (id) {
                this.store.dispatch(TalleresActions.selectTaller({ id }));
                this.store.dispatch(TalleresActions.loadTallerServicios({ tallerId: id }));
                // Ensure talleres are loaded if navigating directly
                this.store.dispatch(TalleresActions.loadTalleres());
            }
        });
    }

    toggleAddService(): void {
        this.isAddingService = !this.isAddingService;
        if (!this.isAddingService) {
            this.serviceForm.reset({
                fechaInicio: new Date().toISOString().substring(0, 10),
                licitacion: false
            });
        }
    }

    onAddService(): void {
        if (this.serviceForm.valid) {
            const formValue = this.serviceForm.value;
            const servicio: ServicioTaller = {
                id: 0,
                centroDirectivo: formValue.centroDirectivo,
                servicioAdscrito: formValue.servicioAdscrito,
                nombreContacto: formValue.nombreContacto,
                telefonoContacto: formValue.telefonoContacto,
                emailContacto: formValue.emailContacto,
                fechaInicio: formValue.fechaInicio,
                fechaFin: formValue.fechaFin || undefined,
                motivoFin: formValue.motivoFin,
                numeroExpediente: formValue.numeroExpediente,
                tiposVehiculos: formValue.tiposVehiculos,
                conceptos: formValue.conceptos,
                licitacion: formValue.licitacion,
                observaciones: formValue.observaciones
            };

            this.store.dispatch(TalleresActions.addServicio({ tallerId: this.tallerId, servicio }));

            this.isAddingService = false;
            this.serviceForm.reset({
                fechaInicio: new Date().toISOString().substring(0, 10),
                licitacion: false
            });

            // Trigger reload after a short delay
            setTimeout(() => {
                this.store.dispatch(TalleresActions.loadTallerServicios({ tallerId: this.tallerId }));
            }, 500);
        }
    }
}
