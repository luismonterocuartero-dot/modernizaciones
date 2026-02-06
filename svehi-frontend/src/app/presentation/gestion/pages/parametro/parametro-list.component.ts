import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as GestionActions from '../../../../state/gestion/gestion.actions';
import { selectParametros } from '../../../../state/gestion/gestion.selectors';

@Component({
    selector: 'app-parametro-list',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    template: `
    <div class="d-flex justify-content-between mb-4">
        <h3>Parámetros del Sistema</h3>
        <button class="btn btn-primary" (click)="showForm = !showForm">Nuevo Parámetro</button>
    </div>

    <div *ngIf="showForm" class="card mb-3 bg-light">
        <div class="card-body">
            <form [formGroup]="form" (ngSubmit)="save()">
                <div class="row g-3">
                    <div class="col-md-5">
                        <input type="text" class="form-control" formControlName="nombre" placeholder="Nombre/Clave">
                    </div>
                     <div class="col-md-5">
                        <input type="text" class="form-control" formControlName="tipoParametro" placeholder="Tipo/Valor">
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
                <th>Tipo/Valor</th>
                <th>Estado</th>
            </tr>
        </thead>
        <tbody>
            <tr *ngFor="let p of parametros$ | async">
                <td>{{ p.nombre }}</td>
                <td>{{ p.tipoParametro }}</td>
                <td><span class="badge" [class.bg-success]="p.activo" [class.bg-danger]="!p.activo">{{ p.activo ? 'Activo' : 'Inactivo'}}</span></td>
            </tr>
             <tr *ngIf="(parametros$ | async)?.length === 0">
                <td colspan="3" class="text-center text-muted">No hay parámetros registrados</td>
            </tr>
        </tbody>
    </table>
    `
})
export class ParametroListComponent implements OnInit {
    private store = inject(Store);
    private fb = inject(FormBuilder);

    parametros$ = this.store.select(selectParametros);
    showForm = false;

    form = this.fb.group({
        nombre: ['', Validators.required],
        tipoParametro: ['', Validators.required],
        activo: [true]
    });

    ngOnInit() {
        this.store.dispatch(GestionActions.loadParametros());
    }

    save() {
        if (this.form.valid) {
            this.store.dispatch(GestionActions.addParametro({ parametro: this.form.value as any }));
            this.showForm = false;
            this.form.reset({ activo: true });
        }
    }
}
