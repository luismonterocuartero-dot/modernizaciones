import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Taller } from '../../domain/talleres.model';
import * as TalleresActions from '../../state/talleres/talleres.actions';
import { selectAllTalleres } from '../../state/talleres/talleres.selectors';
import { HeaderJuntaComponent } from '../components/header-junta/header-junta.component';

@Component({
  selector: 'app-talleres-list',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderJuntaComponent],
  template: `
    <app-header-junta></app-header-junta>

    <div class="container-fluid px-4 py-4" style="background-color: var(--junta-bg-light); min-height: 100vh;">
      <nav class="breadcrumb-junta ps-0">
        <a routerLink="/">Inicio</a>
        <span>/</span>
        <span class="text-muted">Talleres</span>
      </nav>

      <div class="d-flex justify-content-between align-items-center mb-4">
        <h1 class="h3 mb-0" style="color: var(--junta-text-dark);">Gestión de Talleres</h1>
        <button class="btn-junta btn-junta-primary" routerLink="new">
          <i class="fa fa-plus"></i> NUEVO TALLER
        </button>
      </div>

      <div class="card-junta">
        <div class="card-junta-body p-0">
            <div class="p-3 border-bottom">
                <h3 class="h5 mb-0" *ngIf="talleres$ | async as talleres">{{ talleres.length }} talleres registrados</h3>
            </div>

            <div class="table-responsive">
                <table class="table-junta mb-0">
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>NOMBRE</th>
                    <th>CIF</th>
                    <th>EMAIL</th>
                    <th>DIRECCIÓN</th>
                    <th>TELÉFONO</th>
                    <th class="text-center">ACCIONES</th>
                    <th class="text-center">GESTIÓN</th>
                    </tr>
                </thead>
                <tbody>
                    <tr *ngFor="let t of talleres$ | async">
                    <td>{{ t.id }}</td>
                    <td><strong>{{ t.nombre }}</strong></td>
                    <td>{{ t.cif }}</td>
                    <td>{{ t.email || 'N/A' }}</td>
                    <td>{{ t.direccion }}</td>
                    <td>{{ t.telefono }}</td>
                    <td class="text-center">
                        <button class="btn btn-link text-primary p-0 mx-1" title="Ver">
                            <i class="fa fa-eye"></i>
                        </button>
                        <button class="btn btn-link text-primary p-0 mx-1" title="Editar">
                            <i class="fa fa-pencil-alt"></i>
                        </button>
                        <button class="btn btn-link text-danger p-0 mx-1" title="Borrar">
                            <i class="fa fa-trash"></i>
                        </button>
                    </td>
                    <td class="text-center">
                        <button class="btn btn-link text-primary p-0 mx-1" 
                                [routerLink]="[t.id]" title="Gestionar Servicios">
                            <i class="fa fa-cogs fa-lg"></i>
                        </button>
                    </td>
                    </tr>
                </tbody>
                </table>
            </div>
        </div>
      </div>
    </div>
  `,
  styles: [] // Styles moved to global SCSS
})
export class TalleresListComponent implements OnInit {
  talleres$: Observable<Taller[]>;

  constructor(private store: Store) {
    this.talleres$ = this.store.select(selectAllTalleres);
  }

  ngOnInit(): void {
    this.store.dispatch(TalleresActions.loadTalleres());
  }
}
