import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { loadMarcas } from '../../state/catalogos.actions';
import { adapter } from '../../state/catalogos.reducer';
import { createSelector, createFeatureSelector } from '@ngrx/store';

const selectCatalogosState = createFeatureSelector<any>('catalogos');
const { selectAll } = adapter.getSelectors(selectCatalogosState);

@Component({
    selector: 'app-marca-list',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="container mt-4">
      <h2 class="mb-4">Gestión de Marcas</h2>
      
      <div *ngIf="loading$ | async" class="text-center">
        <div class="spinner-border text-primary" role="status"></div>
      </div>

      <table class="table table-hover table-striped shadow-sm">
        <thead class="table-dark">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let marca of marcas$ | async">
            <td>{{ marca.id }}</td>
            <td>{{ marca.nombre }}</td>
            <td>
              <span class="badge" [ngClass]="marca.activo ? 'bg-success' : 'bg-secondary'">
                {{ marca.activo ? 'Activo' : 'Inactivo' }}
              </span>
            </td>
            <td>
              <button class="btn btn-sm btn-outline-primary me-2">Editar</button>
              <button class="btn btn-sm btn-outline-danger">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
      
      <div class="mt-3">
        <button class="btn btn-primary">Añadir Nueva Marca</button>
      </div>
    </div>
  `,
    styles: [`
    .table { border-radius: 8px; overflow: hidden; }
  `]
})
export class MarcaListComponent implements OnInit {
    private store = inject(Store);

    marcas$ = this.store.select(selectAll);
    loading$ = this.store.select(state => state.catalogos?.loading);

    ngOnInit() {
        this.store.dispatch(loadMarcas());
    }
}
