import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Marca, Modelo } from '../../../../domain/gestion.model';
import * as GestionActions from '../../../../state/gestion/gestion.actions';
import { selectMarcas, selectModelos } from '../../../../state/gestion/gestion.selectors';

@Component({
    selector: 'app-marca-list',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    template: `
    <div class="d-flex justify-content-between mb-4">
        <h3>Marcas y Modelos</h3>
        <button class="btn btn-primary" (click)="showMarcaForm = !showMarcaForm">Nueva Marca</button>
    </div>

    <!-- MARCA FORM -->
    <div *ngIf="showMarcaForm" class="card mb-3 bg-light">
        <div class="card-body">
            <h5>Nueva Marca</h5>
            <form [formGroup]="marcaForm" (ngSubmit)="addMarca()">
                <div class="input-group">
                    <input type="text" class="form-control" formControlName="nombre" placeholder="Nombre de la Marca">
                    <button class="btn btn-success" [disabled]="marcaForm.invalid">Guardar</button>
                </div>
            </form>
        </div>
    </div>

    <div class="row">
        <!-- LISTA DE MARCAS -->
        <div class="col-md-5">
            <div class="list-group">
                <button *ngFor="let m of marcas$ | async" 
                        type="button" 
                        class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                        [class.active]="selectedMarca?.id === m.id"
                        (click)="selectMarca(m)">
                    {{ m.nombre }}
                    <span class="badge bg-secondary" *ngIf="!m.activo">Inactivo</span>
                </button>
            </div>
        </div>

        <!-- LISTA DE MODELOS (Detalle de Marca) -->
        <div class="col-md-7" *ngIf="selectedMarca">
            <div class="card">
                <div class="card-header bg-success text-white d-flex justify-content-between align-items-center">
                    <span>Modelos de {{ selectedMarca.nombre }}</span>
                    <button class="btn btn-sm btn-light" (click)="showModeloForm = !showModeloForm">Nuevo Modelo</button>
                </div>
                <div class="card-body">
                    
                    <!-- MODELO FORM -->
                    <div *ngIf="showModeloForm" class="mb-3 p-2 border rounded bg-light">
                         <form [formGroup]="modeloForm" (ngSubmit)="addModelo()">
                            <div class="row g-2">
                                <div class="col-6">
                                    <input type="text" class="form-control" formControlName="nombre" placeholder="Nombre Modelo">
                                </div>
                                <div class="col-4">
                                    <select class="form-select" formControlName="tipoVehiculo">
                                        <option value="TURISMO">Turismo</option>
                                        <option value="FURNOGETA">Furgoneta</option>
                                        <option value="TODOTERRENO">Todoterreno</option>
                                        <option value="MOTOCICLETA">Motocicleta</option>
                                        <option value="CAMION">Camión</option>
                                    </select>
                                </div>
                                <div class="col-2">
                                     <button class="btn btn-success w-100" [disabled]="modeloForm.invalid">OK</button>
                                </div>
                            </div>
                         </form>
                    </div>

                    <table class="table table-sm table-striped">
                        <thead><tr><th>Nombre</th><th>Tipo</th><th>Estado</th></tr></thead>
                        <tbody>
                            <tr *ngFor="let mod of modelos$ | async">
                                <td>{{ mod.nombre }}</td>
                                <td>{{ mod.tipoVehiculo }}</td>
                                <td>
                                    <span class="badge" [class.bg-success]="mod.activo" [class.bg-danger]="!mod.activo">
                                        {{ mod.activo ? 'Activo' : 'Inactivo' }}
                                    </span>
                                </td>
                            </tr>
                            <tr *ngIf="(modelos$ | async)?.length === 0">
                                <td colspan="3" class="text-center text-muted">No hay modelos registrados</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <div class="col-md-7" *ngIf="!selectedMarca">
            <div class="alert alert-info">Seleccione una marca para ver sus modelos</div>
        </div>
    </div>
    `
})
export class MarcaListComponent implements OnInit {
    private store = inject(Store);
    private fb = inject(FormBuilder);

    marcas$ = this.store.select(selectMarcas);
    modelos$ = this.store.select(selectModelos);

    selectedMarca: Marca | null = null;
    showMarcaForm = false;
    showModeloForm = false;

    marcaForm = this.fb.group({ nombre: ['', Validators.required], activo: [true] });
    modeloForm = this.fb.group({ nombre: ['', Validators.required], tipoVehiculo: ['TURISMO', Validators.required], activo: [true] });

    ngOnInit() {
        this.store.dispatch(GestionActions.loadMarcas());
    }

    selectMarca(marca: Marca) {
        this.selectedMarca = marca;
        this.store.dispatch(GestionActions.selectMarca({ id: marca.id! }));
    }

    addMarca() {
        if (this.marcaForm.valid) {
            const val = this.marcaForm.value as any;
            this.store.dispatch(GestionActions.addMarca({ marca: val }));
            this.showMarcaForm = false;
            this.marcaForm.reset({ activo: true });
        }
    }

    addModelo() {
        if (this.modeloForm.valid && this.selectedMarca) {
            const val = { ...this.modeloForm.value as any, marcaId: this.selectedMarca.id };
            this.store.dispatch(GestionActions.addModelo({ modelo: val }));
            this.showModeloForm = false;
            this.modeloForm.reset({ tipoVehiculo: 'TURISMO', activo: true });
        }
    }
}
