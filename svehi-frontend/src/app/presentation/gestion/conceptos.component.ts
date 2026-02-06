import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Concepto } from '../../domain/maestros.model';
import * as MaestrosActions from '../../state/maestros/maestros.actions';
import { selectConceptos } from '../../state/maestros/maestros.selectors';

@Component({
    selector: 'app-conceptos',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    template: `
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h3>Conceptos</h3>
      <button class="btn btn-primary" (click)="isCreating = !isCreating">
        {{ isCreating ? 'Cancelar' : 'Nuevo Concepto' }}
      </button>
    </div>

    <div *ngIf="isCreating" class="card mb-3">
      <div class="card-body">
        <form [formGroup]="form" (ngSubmit)="onSubmit()">
            <div class="mb-3">
                <label class="form-label">Nombre</label>
                <input type="text" class="form-control" formControlName="nombre">
            </div>
            <div class="mb-3">
                <label class="form-label">Precio</label>
                <input type="number" class="form-control" formControlName="precioUnitario">
            </div>
             <div class="mb-3">
                <label class="form-label">Kms</label>
                <input type="number" class="form-control" formControlName="kilometros">
            </div>
             <div class="mb-3">
                <label class="form-label">Días</label>
                <input type="number" class="form-control" formControlName="dias">
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
          <th>Precio</th>
          <th>Kms</th>
          <th>Días</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let c of conceptos$ | async">
          <td>{{ c.id }}</td>
          <td>{{ c.nombre }}</td>
          <td>{{ c.precioUnitario }}</td>
          <td>{{ c.kilometros }}</td>
          <td>{{ c.dias }}</td>
        </tr>
      </tbody>
    </table>
  `
})
export class ConceptosComponent implements OnInit {
    conceptos$: Observable<Concepto[]>;
    form: FormGroup;
    isCreating = false;

    constructor(private store: Store, private fb: FormBuilder) {
        this.conceptos$ = this.store.select(selectConceptos);
        this.form = this.fb.group({
            nombre: ['', Validators.required],
            precioUnitario: [0],
            kilometros: [0],
            dias: [0]
        });
    }

    ngOnInit(): void {
        this.store.dispatch(MaestrosActions.loadConceptos());
    }

    onSubmit(): void {
        if (this.form.valid) {
            console.log('Crear concepto:', this.form.value);
            this.isCreating = false;
            this.form.reset();
        }
    }
}
