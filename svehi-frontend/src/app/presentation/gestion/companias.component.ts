import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Compania } from '../../domain/maestros.model';
import * as MaestrosActions from '../../state/maestros/maestros.actions';
import { selectCompanias } from '../../state/maestros/maestros.selectors';

@Component({
    selector: 'app-companias',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    template: `
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h3>Compañías</h3>
      <button class="btn btn-primary" (click)="isCreating = !isCreating">
        {{ isCreating ? 'Cancelar' : 'Nueva Compañía' }}
      </button>
    </div>

    <!-- Formulario Crear/Editar -->
    <div *ngIf="isCreating" class="card mb-3">
      <div class="card-body">
        <form [formGroup]="form" (ngSubmit)="onSubmit()">
            <div class="mb-3">
                <label class="form-label">Nombre</label>
                <input type="text" class="form-control" formControlName="nombre">
            </div>
            <div class="mb-3">
                <label class="form-label">Contacto</label>
                <input type="text" class="form-control" formControlName="contacto">
            </div>
             <div class="mb-3">
                <label class="form-label">Teléfono</label>
                <input type="text" class="form-control" formControlName="telefono">
            </div>
             <div class="mb-3">
                <label class="form-label">Dirección</label>
                <input type="text" class="form-control" formControlName="direccion">
            </div>
            <button type="submit" class="btn btn-success" [disabled]="form.invalid">Guardar</button>
        </form>
      </div>
    </div>

    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Contacto</th>
          <th>Teléfono</th>
          <th>Dirección</th>
          <th>Activo</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let c of companias$ | async">
          <td>{{ c.id }}</td>
          <td>{{ c.nombre }}</td>
          <td>{{ c.contacto }}</td>
          <td>{{ c.telefono }}</td>
          <td>{{ c.direccion }}</td>
          <td>
            <span [class.badge]="true" [class.bg-success]="c.activo" [class.bg-secondary]="!c.activo">
                {{ c.activo ? 'Sí' : 'No' }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  `
})
export class CompaniasComponent implements OnInit {
    companias$: Observable<Compania[]>;
    form: FormGroup;
    isCreating = false;

    constructor(private store: Store, private fb: FormBuilder) {
        this.companias$ = this.store.select(selectCompanias);
        this.form = this.fb.group({
            nombre: ['', Validators.required],
            contacto: [''],
            telefono: [''],
            direccion: ['']
        });
    }

    ngOnInit(): void {
        this.store.dispatch(MaestrosActions.loadCompanias());
    }

    onSubmit(): void {
        if (this.form.valid) {
            // Not implemented create action dispatch fully in this example yet, assuming I had createCompania
            // But I created load actions.
            console.log('Crear compania:', this.form.value);
            // this.store.dispatch(MaestrosActions.createCompania({ compania: this.form.value }));
            this.isCreating = false;
            this.form.reset();
        }
    }
}
