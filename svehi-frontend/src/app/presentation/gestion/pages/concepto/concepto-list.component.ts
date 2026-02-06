import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as GestionActions from '../../../../state/gestion/gestion.actions';
import { selectConceptos } from '../../../../state/gestion/gestion.selectors';

@Component({
    selector: 'app-concepto-list',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    template: `
    <div class="d-flex justify-content-between mb-4">
        <h3>Conceptos de Gasto</h3>
        <button class="btn btn-primary" (click)="showForm = !showForm">Nuevo Concepto</button>
    </div>

    <div *ngIf="showForm" class="card mb-3 bg-light">
        <div class="card-body">
            <form [formGroup]="form" (ngSubmit)="save()">
                <div class="row g-3">
                    <div class="col-md-4">
                        <input type="text" class="form-control" formControlName="nombre" placeholder="Nombre Concepto">
                    </div>
                    <div class="col-md-2">
                        <input type="number" class="form-control" formControlName="precioUnitario" placeholder="Precio Unit.">
                    </div>
                    <div class="col-md-2">
                        <input type="number" class="form-control" formControlName="kilometros" placeholder="Kms">
                    </div>
                    <div class="col-md-2">
                        <input type="number" class="form-control" formControlName="dias" placeholder="Días">
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
                <th>Concepto</th>
                <th>Precio Unitario</th>
                <th>Kms</th>
                <th>Días</th>
            </tr>
        </thead>
        <tbody>
            <tr *ngFor="let c of conceptos$ | async">
                <td>{{ c.nombre }}</td>
                <td>{{ c.precioUnitario | currency:'EUR' }}</td>
                <td>{{ c.kilometros }}</td>
                <td>{{ c.dias }}</td>
            </tr>
             <tr *ngIf="(conceptos$ | async)?.length === 0">
                <td colspan="4" class="text-center text-muted">No hay conceptos registrados</td>
            </tr>
        </tbody>
    </table>
    `
})
export class ConceptoListComponent implements OnInit {
    private store = inject(Store);
    private fb = inject(FormBuilder);

    conceptos$ = this.store.select(selectConceptos);
    showForm = false;

    form = this.fb.group({
        nombre: ['', Validators.required],
        precioUnitario: [0],
        kilometros: [0],
        dias: [0]
    });

    ngOnInit() {
        this.store.dispatch(GestionActions.loadConceptos());
    }

    save() {
        if (this.form.valid) {
            this.store.dispatch(GestionActions.addConcepto({ concepto: this.form.value as any }));
            this.showForm = false;
            this.form.reset();
        }
    }
}
