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

    <div class="container-junta">
      <nav class="breadcrumb-junta">
        <a routerLink="/">Inicio</a>
        <span>/</span>
        <a routerLink="/talleres">Talleres</a>
        <span>/</span>
      </nav>

      <div class="d-flex justify-content-between align-items-center mb-4">
        <h1 class="mb-0">Gestión de Talleres</h1>
        <button class="btn-junta btn-junta-primary" routerLink="new">
          <i class="fa fa-plus pe-2"></i> NUEVO TALLER
        </button>
      </div>

      <div class="table-container-junta">
        <h3 *ngIf="talleres$ | async as talleres">{{ talleres.length }} talleres registrados</h3>
        
        <table class="table-junta mt-3">
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
                <button class="btn btn-link p-0 mx-1" style="color: #007A33;" title="Ver">
                    <i class="fa fa-eye"></i>
                </button>
                <button class="btn btn-link p-0 mx-1" style="color: #007A33;" title="Editar">
                    <i class="fa fa-pencil-alt"></i>
                </button>
                <button class="btn btn-link p-0 mx-1" style="color: #D32F2F;" title="Borrar">
                    <i class="fa fa-trash"></i>
                </button>
              </td>
              <td class="text-center">
                 <button class="btn btn-link p-0 mx-1" style="color: #007A33;" 
                         [routerLink]="[t.id]" title="Gestionar Servicios">
                     <i class="fa fa-cogs fa-lg"></i>
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
export class TalleresListComponent implements OnInit {
  talleres$: Observable<Taller[]>;

  constructor(private store: Store) {
    this.talleres$ = this.store.select(selectAllTalleres);
  }

  ngOnInit(): void {
    this.store.dispatch(TalleresActions.loadTalleres());
  }
}
