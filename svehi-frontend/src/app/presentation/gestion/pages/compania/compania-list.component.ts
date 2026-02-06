import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as GestionActions from '../../../../state/gestion/gestion.actions';
import { selectCompanias } from '../../../../state/gestion/gestion.selectors';

@Component({
    selector: 'app-compania-list',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    template: `
    <div class="d-flex justify-content-between mb-4">
        <h3>Compañías de Seguros</h3>
        <button class="btn btn-primary" (click)="showForm = !showForm">Nueva Compañía</button>
    </div>

    <div *ngIf="showForm" class="card mb-3 bg-light">
        <div class="card-body">
            <form [formGroup]="form" (ngSubmit)="save()">
                <div class="row g-3">
                    <div class="col-md-4">
                        <input type="text" class="form-control" formControlName="nombre" placeholder="Nombre Compañía">
                    </div>
                    <div class="col-md-4">
                        <input type="text" class="form-control" formControlName="telefono" placeholder="Teléfono">
                    </div>
                    <div class="col-md-4">
                        <input type="text" class="form-control" formControlName="contacto" placeholder="Persona de Contacto">
                    </div>
                     <div class="col-md-12">
                        <input type="text" class="form-control" formControlName="direccion" placeholder="Dirección">
                    </div>
                    <div class="col-md-12 text-end">
                        <button class="btn btn-success" [disabled]="form.invalid">Guardar</button>
                    </div>
                </div>
            </form>
        </div>
    </div>

    <table class="table table-striped table-hover">
        <thead>
            <tr>
                <th>Nombre</th>
                <th>Teléfono</th>
                <th>Contacto</th>
                <th>Estado</th>
            </tr>
        </thead>
        <tbody>
            <tr *ngFor="let c of companias$ | async">
                <td>{{ c.nombre }}</td>
                <td>{{ c.telefono }}</td>
                <td>{{ c.contacto }}</td>
                <td><span class="badge" [class.bg-success]="c.activo" [class.bg-danger]="!c.activo">{{ c.activo ? 'Activo' : 'Inactivo'}}</span></td>
            </tr>
             <tr *ngIf="(companias$ | async)?.length === 0">
                <td colspan="4" class="text-center text-muted">No hay compañías registradas</td>
            </tr>
        </tbody>
    </table>
    `
})
export class CompaniaListComponent implements OnInit {
    private store = inject(Store);
    private fb = inject(FormBuilder);

    companias$ = this.store.select(selectCompanias);
    showForm = false;

    form = this.fb.group({
        nombre: ['', Validators.required],
        telefono: ['', Validators.required],
        contacto: [''],
        direccion: [''],
        activo: [true]
    });

    ngOnInit() {
        this.store.dispatch(GestionActions.loadCompanias());
    }

    save() {
        if (this.form.valid) {
            this.store.dispatch(GestionActions.addCompania({ compania: this.form.value as any }));
            this.showForm = false;
            this.form.reset({ activo: true });
        }
    }
}
