import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Router, RouterModule } from '@angular/router';
import * as TalleresActions from '../../state/talleres/talleres.actions';
import { Taller } from '../../domain/talleres.model';
import { HeaderJuntaComponent } from '../components/header-junta/header-junta.component';

@Component({
    selector: 'app-taller-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule, HeaderJuntaComponent],
    template: `
    <app-header-junta></app-header-junta>
    <div class="container-junta">
         <!-- Breadcrumb -->
      <nav class="breadcrumb-junta">
        <a routerLink="/">Inicio</a>
        <span>/</span>
        <a routerLink="/talleres">Talleres</a>
        <span>/</span>
        <span class="text-muted">Nuevo Taller</span>
      </nav>

      <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card shadow-sm">
                <div class="card-header bg-junta-green text-white">
                    <h4 class="mb-0">Nuevo Taller</h4>
                </div>
                <div class="card-body">
                    <form [formGroup]="form" (ngSubmit)="onSubmit()">
                        <div class="mb-3">
                            <label class="form-label required">Nombre</label>
                            <input type="text" class="form-control" formControlName="nombre">
                        </div>
                        <div class="mb-3">
                            <label class="form-label">CIF</label>
                            <input type="text" class="form-control" formControlName="cif">
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Dirección</label>
                            <input type="text" class="form-control" formControlName="direccion">
                        </div>
                         <div class="mb-3">
                            <label class="form-label">Teléfono</label>
                            <input type="text" class="form-control" formControlName="telefono">
                        </div>

                        <div class="d-flex justify-content-end gap-2">
                             <button type="button" class="btn btn-secondary" routerLink="/talleres">Cancelar</button>
                             <button type="submit" class="btn btn-junta-primary" [disabled]="form.invalid">Guardar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
      </div>
    </div>
  `
})
export class TallerFormComponent {
    private fb = inject(FormBuilder);
    private store = inject(Store);
    private router = inject(Router);

    form = this.fb.group({
        nombre: ['', Validators.required],
        cif: [''],
        direccion: [''],
        telefono: ['']
    });

    onSubmit() {
        if (this.form.valid) {
            const taller: Taller = {
                id: 0, // Backend assigns ID
                nombre: this.form.value.nombre!,
                cif: this.form.value.cif || undefined,
                direccion: this.form.value.direccion || undefined,
                telefono: this.form.value.telefono || undefined,
                servicios: []
            };
            this.store.dispatch(TalleresActions.createTaller({ taller }));
        }
    }
}
