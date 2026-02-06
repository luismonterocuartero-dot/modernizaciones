import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { HeaderJuntaComponent } from '../../components/header-junta/header-junta.component';
import { Perfil, Permiso } from '../../../domain/gestion.model';
import * as GestionActions from '../../../state/gestion/gestion.actions';
import { selectPerfiles, selectPermisos } from '../../../state/gestion/gestion.selectors';

@Component({
  selector: 'app-perfiles-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HeaderJuntaComponent],
  template: `
    <app-header-junta></app-header-junta>

    <div class="container-junta">
      <nav class="breadcrumb-junta">
        <a routerLink="/">Inicio</a>
        <span>/</span>
        <a routerLink="/perfiles">Perfiles</a>
        <span>/</span>
      </nav>

      <div class="d-flex justify-content-between align-items-center mb-4">
        <h1 class="mb-0">Gestión de Perfiles</h1>
        <button class="btn-junta btn-junta-primary" (click)="onCreate()">
          <i class="fa fa-plus pe-2"></i> NUEVO PERFIL
        </button>
      </div>

       <!-- FORMULARIO DE PERFIL -->
       <div *ngIf="showForm" class="card mb-4 bg-light">
          <div class="card-body">
              <h5 class="card-title">{{ editingPerfil ? 'Editar Perfil' : 'Nuevo Perfil' }}</h5>
              <form [formGroup]="form" (ngSubmit)="save()">
                  <div class="mb-3">
                      <label class="form-label">Nombre del Perfil</label>
                      <input type="text" class="form-control" formControlName="nombre">
                  </div>
                  
                  <div class="mb-3">
                    <label class="form-label">Permisos Asociados</label>
                    <div class="border p-3 rounded bg-white" style="max-height: 200px; overflow-y: auto;">
                        <div *ngFor="let perm of permisos$ | async" class="form-check">
                            <input class="form-check-input" type="checkbox" 
                                   [value]="perm.id"
                                   (change)="onPermisoChange($event, perm)"
                                   [checked]="isPermisoSelected(perm)">
                            <label class="form-check-label">
                                {{ perm.nombre }} ({{ perm.objeto }} - {{ perm.tipoPermiso }})
                            </label>
                        </div>
                    </div>
                  </div>

                  <div class="d-flex gap-2 justify-content-end">
                      <button type="button" class="btn btn-secondary" (click)="cancel()">Cancelar</button>
                      <button type="submit" class="btn btn-success" [disabled]="form.invalid">Guardar</button>
                  </div>
              </form>
          </div>
       </div>

      <div class="table-container-junta">
        <h3 *ngIf="perfiles$ | async as perfiles">{{ perfiles.length }} perfiles configurados</h3>
        
        <table class="table-junta mt-3">
          <thead>
            <tr>
              <th style="width: 5%">ID</th>
              <th>NOMBRE</th>
              <th style="width: 15%">ESTADO</th>
              <th class="text-center" style="width: 15%">ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let p of perfiles$ | async">
              <td>{{ p.id }}</td>
              <td><strong>{{ p.nombre }}</strong></td>
              <td>
                <span class="badge-junta" [class.badge-junta-success]="p.activo">
                  {{ p.activo ? 'Activo' : 'Inactivo' }}
                </span>
              </td>
              <td class="text-center">
                <button class="btn btn-link p-0 mx-1" style="color: #007A33;" title="Editar" (click)="onEdit(p)">
                    <i class="fa fa-pencil-alt fa-lg"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; min-height: 100vh; background-color: var(--junta-bg-light); }
    .btn-link:hover { color: var(--junta-primary) !important; }
  `]
})
export class PerfilesPageComponent implements OnInit {
  private store = inject(Store);
  private fb = inject(FormBuilder);

  perfiles$ = this.store.select(selectPerfiles);
  permisos$ = this.store.select(selectPermisos);

  showForm = false;
  editingPerfil: Perfil | null = null;
  selectedPermisos: number[] = [];

  form = this.fb.group({
    nombre: ['', Validators.required],
    activo: [true]
  });

  ngOnInit() {
    this.store.dispatch(GestionActions.loadPerfiles());
    this.store.dispatch(GestionActions.loadPermisos());
  }

  onCreate() {
    this.editingPerfil = null;
    this.selectedPermisos = [];
    this.form.reset({ activo: true });
    this.showForm = true;
  }

  onEdit(perfil: Perfil) {
    this.editingPerfil = perfil;
    // In a real app we'd load the profile details including permissions if not present in the list
    // For now assuming we might fetching them or they are not in the Perfil object from list
    // TODO: Handle permissions loading for the profile if needed
    this.selectedPermisos = []; // Reset or load logic
    this.form.patchValue({
      nombre: perfil.nombre,
      activo: perfil.activo
    });
    this.showForm = true;
  }

  isPermisoSelected(permiso: Permiso): boolean {
    return this.selectedPermisos.includes(permiso.id!);
  }

  onPermisoChange(event: any, permiso: Permiso) {
    if (event.target.checked) {
      this.selectedPermisos.push(permiso.id!);
    } else {
      this.selectedPermisos = this.selectedPermisos.filter(id => id !== permiso.id);
    }
  }

  save() {
    if (this.form.valid) {
      const perfilData: Perfil = {
        ...this.editingPerfil, // Preserve ID if editing
        nombre: this.form.value.nombre!,
        activo: this.form.value.activo!,
        // TODO: Add selectedPermisos to payload if the backend supports it in the same call
        // Assuming simplistic add for now as placeholder
      };

      this.store.dispatch(GestionActions.addPerfil({ perfil: perfilData }));
      this.showForm = false;
    }
  }

  cancel() {
    this.showForm = false;
  }
}
