import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { loadVehiculos } from '../../../state/vehiculos/vehiculos.actions';
import { selectVehiculosList, selectVehiculosLoading, selectVehiculosTotal, selectVehiculosPage, selectVehiculosSize, selectVehiculosTotalPages } from '../../../state/vehiculos/vehiculos.selectors';
import { HeaderJuntaComponent } from '../../components/header-junta/header-junta.component';
import { MaestrosHttpService } from '../../../infrastructure/maestros.http.service';
import { combineLatest, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-vehiculos-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, HeaderJuntaComponent],
  template: `
    <app-header-junta></app-header-junta>

    <div class="container-fluid px-4 py-4" style="background-color: var(--junta-bg-light); min-height: 100vh;">
      <nav class="breadcrumb-junta ps-0">
        <a routerLink="/">Inicio</a>
        <span>/</span>
        <span class="text-muted">Vehículos</span>
      </nav>

      <div class="d-flex justify-content-between align-items-center mb-4">
        <h1 class="h3 mb-0" style="color: var(--junta-text-dark);">Gestión de Vehículos</h1>
        <button class="btn-junta btn-junta-primary">
          <i class="fa fa-plus"></i> NUEVO VEHÍCULO
        </button>
      </div>

      <!-- Filtros -->
      <div class="card-junta mb-4">
        <div class="card-junta-header">
            Filtrar Vehículos
        </div>
        <div class="card-junta-body">
            <form [formGroup]="filterForm" (ngSubmit)="onSearch()" class="row align-items-end g-3">
            <div class="col-md-3 form-group-junta">
                <label>Matrícula</label>
                <input type="text" formControlName="matricula" placeholder="Ej: 1234ABC">
            </div>
            <div class="col-md-3 form-group-junta">
                <label>Marca</label>
                <select formControlName="marcaId">
                <option [value]="null">Todas las marcas</option>
                <option *ngFor="let m of marcas$ | async" [value]="m.id">{{ m.nombre }}</option>
                </select>
            </div>
            <div class="col-md-6 d-flex gap-2 justify-content-end">
                <button type="button" class="btn-junta btn-junta-secondary" (click)="onClear()">
                <i class="fa fa-times"></i> LIMPIAR
                </button>
                <button type="submit" class="btn-junta btn-junta-primary">
                <i class="fa fa-search"></i> BUSCAR
                </button>
            </div>
            </form>
        </div>
      </div>

      <ng-container *ngIf="vm$ | async as vm">
        <div *ngIf="vm.loading" class="text-center py-5">
            <div class="spinner">
                <i class="fa fa-spinner fa-spin"></i>
            </div>
        </div>

        <div *ngIf="!vm.loading" class="card-junta">
            <div class="card-junta-body p-0">
                <!-- Info de resultados arriba -->
                <div class="p-3 border-bottom d-flex justify-content-between align-items-center">
                    <h3 class="h5 mb-0 font-weight-bold">
                        Mostrando {{ (vm.page * vm.size) + 1 }} - {{ getEndRecord(vm.page, vm.size, vm.total) }} de {{ vm.total }} hitos
                    </h3>
                </div>
                
                <div class="table-responsive">
                    <table class="table-junta mb-0">
                    <thead>
                        <tr>
                        <th>MATRÍCULA</th>
                        <th>MARCA - MODELO</th>
                        <th>ADSCRIPCIÓN</th>
                        <th>TIPO VEHÍCULO</th>
                        <th>USO</th>
                        <th>ESTADO</th>
                        <th class="text-center">ACCIONES</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr *ngFor="let v of vm.vehiculos">
                        <td><strong>{{ v.matricula }}</strong></td>
                        <td>{{ v.marcaNombre }} - {{ v.modelo }}</td>
                        <td>{{ v.adscripcion || 'S/D' }}</td>
                        <td>{{ v.tipoVehiculo }}</td>
                        <td>{{ v.uso || 'S/D' }}</td>
                        <td>
                            <span class="badge-junta" [class.badge-junta-success]="v.activo">
                            {{ v.activo ? 'ACTIVO' : 'INACTIVO' }}
                            </span>
                        </td>
                        <td class="text-center">
                            <button class="btn btn-link text-primary p-0 mx-1" title="Editar">
                                <i class="fa fa-pencil-alt fa-lg"></i>
                            </button>
                            <button class="btn btn-link text-danger p-0 mx-1" title="Desactivar">
                                <i class="fa fa-ban fa-lg"></i>
                            </button>
                        </td>
                        </tr>
                        <tr *ngIf="vm.vehiculos.length === 0">
                            <td colspan="7" class="text-center py-4">No se encontraron vehículos.</td>
                        </tr>
                    </tbody>
                    </table>
                </div>
                
                <!-- Paginación Footer -->
                <div class="card-footer bg-light p-3 border-top" *ngIf="vm.total > 0">
                    <div class="row align-items-center">
                        <!-- Spacer Left -->
                        <div class="col-4"></div>
                        
                        <!-- Botones Paginación (Centrado) -->
                        <div class="col-4 d-flex justify-content-center">
                            <div class="d-flex align-items-center gap-2">
                                <button class="btn btn-sm btn-outline-success font-weight-bold" 
                                        [disabled]="(vm.page === 0)"
                                        (click)="onPageChange(vm.page - 1)"
                                        [class.disabled]="vm.page === 0">
                                    <i class="fa fa-chevron-left me-1"></i> ANTERIOR
                                </button>

                                <!-- Páginas -->
                                <div class="d-flex gap-1">
                                    <ng-container *ngFor="let p of getPages(vm.page, vm.totalPages)">
                                        <button class="btn btn-sm" 
                                                [class.btn-success]="p === vm.page"
                                                [class.btn-outline-success]="p !== vm.page"
                                                (click)="onPageChange(p)">
                                            {{ p + 1 }}
                                        </button>
                                    </ng-container>
                                </div>

                                <button class="btn btn-sm btn-success font-weight-bold" 
                                        [disabled]="(vm.page >= vm.totalPages - 1)"
                                        (click)="onPageChange(vm.page + 1)">
                                    SIGUIENTE <i class="fa fa-chevron-right ms-1"></i>
                                </button>
                            </div>
                        </div>

                        <!-- Selector de Tamaño (Derecha) -->
                        <div class="col-4 d-flex justify-content-end align-items-center gap-2">
                            <span class="text-success font-weight-bold">Mostrar</span>
                            <select class="form-select form-select-sm" style="width: auto; border-color: var(--junta-primary);"
                                    [ngModel]="vm.size" (ngModelChange)="onSizeChange($event)">
                                <option [ngValue]="10">10</option>
                                <option [ngValue]="20">20</option>
                                <option [ngValue]="50">50</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </ng-container>
    </div>
  `,
  styles: [`
    .btn-success {
        background-color: var(--junta-primary) !important;
        border-color: var(--junta-primary) !important;
        color: white !important;
    }
    .btn-outline-success {
        color: var(--junta-primary) !important;
        border-color: var(--junta-primary) !important;
        background: white;
    }
    .btn-outline-success:hover {
        background-color: #f0fdf4;
    }
    .btn-outline-success.disabled, .btn-outline-success:disabled {
        color: #ccc !important;
        border-color: #ccc !important;
        background: #f8f9fa;
        cursor: not-allowed;
    }
  `]
})
export class VehiculosPageComponent implements OnInit {
  private store = inject(Store);
  private fb = inject(FormBuilder);
  private maestrosService = inject(MaestrosHttpService);

  // ViewModel Pattern
  vm$ = combineLatest({
    vehiculos: this.store.select(selectVehiculosList),
    loading: this.store.select(selectVehiculosLoading),
    total: this.store.select(selectVehiculosTotal),
    page: this.store.select(selectVehiculosPage),
    size: this.store.select(selectVehiculosSize),
    totalPages: this.store.select(selectVehiculosTotalPages)
  });

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

  onPageChange(page: number) {
    const filters = this.filterForm.value;
    this.store.dispatch(loadVehiculos({
      page,
      size: 10, // Idealmente leer del state, pero por ahora fixed a 10 o implementar listener
      matricula: filters.matricula || undefined,
      marcaId: filters.marcaId ? Number(filters.marcaId) : undefined
    }));
  }

  onSizeChange(size: any) {
    // Cast explícito ya que el template puede enviar string si no se usa ngValue correctamente
    // Aunque con [ngValue] debería ser number.
    const newSize = Number(size);

    const filters = this.filterForm.value;
    this.store.dispatch(loadVehiculos({
      page: 0,
      size: newSize,
      matricula: filters.matricula || undefined,
      marcaId: filters.marcaId ? Number(filters.marcaId) : undefined
    }));
  }

  onClear() { this.filterForm.reset(); this.onSearch(); }

  getEndRecord(page: number, size: number, total: number): number {
    return Math.min((page + 1) * size, total);
  }

  getPages(current: number, total: number): number[] {
    // Logica simple: Mostrar siempre 1 2 3 ... o ventana movil
    // Aquí devolvemos un array simple de páginas para iterar
    // Si son muchas, habría que recortar
    const pages = [];
    const start = Math.max(0, current - 2);
    const end = Math.min(total - 1, current + 2);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }
}
