import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { loadVehiculos } from '../../../state/vehiculos/vehiculos.actions';
import { selectVehiculosList, selectVehiculosLoading, selectVehiculosError, selectVehiculosTotal } from '../../../state/vehiculos/vehiculos.selectors';
import { HeaderJuntaComponent } from '../../components/header-junta/header-junta.component';
import { MaestrosHttpService } from '../../../infrastructure/maestros.http.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-vehiculos-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HeaderJuntaComponent],
  template: `
    <app-header-junta></app-header-junta>

    <div class="container-junta">
      <nav class="breadcrumb-junta">
        <a routerLink="/">Inicio</a>
        <span>/</span>
        <a routerLink="/vehiculos">Vehículos</a>
        <span>/</span>
      </nav>

      <div class="d-flex justify-content-between align-items-center mb-4">
        <h1 class="mb-0">Gestión de Vehículos</h1>
        <button class="btn-junta btn-junta-primary">
          <i class="fa fa-plus pe-2"></i> NUEVO VEHÍCULO
        </button>
      </div>

      <!-- Filtros -->
      <div class="search-box-junta">
        <form [formGroup]="filterForm" (ngSubmit)="onSearch()" class="row align-items-end g-3">
          <div class="col-md-3 form-group-junta">
            <label>Matrícula</label>
            <input type="text" formControlName="matricula" placeholder="Filtrar por matrícula">
          </div>
          <div class="col-md-3 form-group-junta">
            <label>Marca</label>
            <select formControlName="marcaId">
              <option [value]="null">Todas las marcas</option>
              <option *ngFor="let m of marcas$ | async" [value]="m.id">{{ m.nombre }}</option>
            </select>
          </div>
          <div class="col-md-6 d-flex gap-2 justify-content-end">
            <button type="button" class="btn-clear" (click)="onClear()">
              <i class="fa fa-filter-circle-xmark"></i> LIMPIAR
            </button>
            <button type="submit" class="btn-search">
              <i class="fa fa-search"></i> BUSCAR
            </button>
          </div>
        </form>
      </div>

      <div *ngIf="loading$ | async" class="text-center py-5">
        <i class="fa fa-spinner fa-spin fa-3x text-junta-green"></i>
      </div>

      <div *ngIf="!(loading$ | async)" class="table-container-junta">
        <h3 *ngIf="total$ | async as total">{{ total }} vehículos registrados</h3>
        
        <table class="table-junta mt-3">
          <thead>
            <tr>
              <th>MATRÍCULA</th>
              <th>MARCA</th>
              <th>MODELO</th>
              <th>TIPO</th>
              <th>ESTADO</th>
              <th class="text-center">ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let v of vehiculos$ | async">
              <td><strong>{{ v.matricula }}</strong></td>
              <td>{{ v.marcaNombre }}</td>
              <td>{{ v.modelo }}</td>
              <td>{{ v.tipoVehiculo }}</td>
              <td>
                <span class="badge-junta" [class.badge-junta-success]="v.activo">
                  {{ v.activo ? 'Activo' : 'Inactivo' }}
                </span>
              </td>
              <td class="text-center">
                <button class="btn btn-link p-0 mx-1" style="color: #007A33;" title="Editar">
                    <i class="fa fa-pencil-alt fa-lg"></i>
                </button>
                <button class="btn btn-link p-0 mx-1" style="color: #D32F2F;" title="Desactivar">
                    <i class="fa fa-ban fa-lg"></i>
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
    .btn-link:hover { opacity: 0.8; transform: scale(1.1); transition: all 0.2s; }
    td.text-center { vertical-align: middle; }
  `]
})
export class VehiculosPageComponent implements OnInit {
  private store = inject(Store);
  private fb = inject(FormBuilder);
  private maestrosService = inject(MaestrosHttpService);

  vehiculos$ = this.store.select(selectVehiculosList);
  loading$ = this.store.select(selectVehiculosLoading);
  total$ = this.store.select(selectVehiculosTotal);
  marcas$ = this.maestrosService.getMarcas().pipe(catchError(() => of([])));

  filterForm = this.fb.group({
    matricula: [null],
    marcaId: [null]
  });

  ngOnInit() { this.onSearch(); }

  onSearch() {
    const filters = this.filterForm.value;
    this.store.dispatch(loadVehiculos({
      page: 0,
      size: 10,
      matricula: filters.matricula || undefined,
      marcaId: filters.marcaId ? Number(filters.marcaId) : undefined
    }));
  }

  onClear() { this.filterForm.reset(); this.onSearch(); }
}
