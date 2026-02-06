import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as GestionActions from '../../../../state/gestion/gestion.actions';
import { selectOperadoras } from '../../../../state/gestion/gestion.selectors';

@Component({
    selector: 'app-operadora-list',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    template: `
    <div class="d-flex justify-content-between mb-4">
        <h3>Operadoras de Renting</h3>
        <button class="btn btn-primary" (click)="showForm = !showForm">Nueva Operadora</button>
    </div>

    <div *ngIf="showForm" class="card mb-3 bg-light">
        <div class="card-body">
            <form [formGroup]="form" (ngSubmit)="save()">
                <div class="row g-3">
                    <div class="col-md-6">
                        <input type="text" class="form-control" formControlName="nombre" placeholder="Nombre Operadora">
                    </div>
                    <div class="col-md-4">
                        <input type="text" class="form-control" formControlName="telefono" placeholder="Teléfono">
                    </div>
                    <div class="col-md-2">
                        <button class="btn btn-success w-100" [disabled]="form.invalid">Guardar</button>
                    </div>
                </div>
            </form>
        </div>
    </div>

    <table class="table table-striped">
        <thead>
            <tr>
                <th>Nombre</th>
                <th>Teléfono</th>
                <th>Estado</th>
            </tr>
        </thead>
        <tbody>
            <tr *ngFor="let o of operadoras$ | async">
                <td>{{ o.nombre }}</td>
                <td>{{ o.telefono }}</td>
                <td><span class="badge" [class.bg-success]="o.activo" [class.bg-danger]="!o.activo">{{ o.activo ? 'Activo' : 'Inactivo'}}</span></td>
            </tr>
            <tr *ngIf="(operadoras$ | async)?.length === 0">
                <td colspan="3" class="text-center text-muted">No hay operadoras registradas</td>
            </tr>
        </tbody>
    </table>
    `
})
export class OperadoraListComponent implements OnInit {
    private store = inject(Store);
    private fb = inject(FormBuilder);

    operadoras$ = this.store.select(selectOperadoras);
    showForm = false;

    form = this.fb.group({
        nombre: ['', Validators.required],
        telefono: ['', Validators.required],
        activo: [true]
    });

    ngOnInit() {
        this.store.dispatch(GestionActions.loadOperadoras());
    }

    save() {
        if (this.form.valid) {
            this.store.dispatch(GestionActions.addOperadora({ operadora: this.form.value as any }));
            this.showForm = false;
            this.form.reset({ activo: true });
        }
    }
}
