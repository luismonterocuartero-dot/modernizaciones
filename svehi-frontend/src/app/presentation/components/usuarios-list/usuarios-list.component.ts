import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Usuario } from '../../../domain/usuario.model';

@Component({
  selector: 'app-usuarios-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card-junta-table shadow-sm">
      <table class="table-junta">
        <thead>
          <tr>
            <th>
              NIF 
              <span class="sort-icon"><i class="fa fa-caret-up"></i><i class="fa fa-caret-down"></i></span>
            </th>
            <th>
              NOMBRE
              <span class="sort-icon active"><i class="fa fa-caret-up"></i><i class="fa fa-caret-down"></i></span>
            </th>
            <th>APELLIDOS</th>
            <th>PERFIL</th>
            <th>ESTADO</th>
            <th style="text-align: center;">ACCIONES</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let u of usuarios">
            <td>{{ u.nif }}</td>
            <td>{{ u.nombre }}</td>
            <td>{{ u.apellido1 }} {{ u.apellido2 }}</td>
            <td>
              <span class="badge-junta badge-junta-info">
                {{ u.perfil?.nombre || 'Sin perfil' }}
              </span>
            </td>
            <td>
              <span class="badge-junta" [ngClass]="u.activo ? 'badge-junta-success' : 'badge-junta-error'">
                {{ u.activo ? 'Activo' : 'Inactivo' }}
              </span>
            </td>
            <td style="text-align: center;">
              <button 
                class="btn-icon me-2" 
                (click)="edit.emit(u.id)"
                title="Editar usuario">
                <i class="fa fa-pencil text-junta-green"></i>
              </button>
              <button 
                class="btn-icon" 
                (click)="toggleActive(u)"
                [title]="u.activo ? 'Desactivar usuario' : 'Activar usuario'">
                <i [class]="u.activo ? 'fa fa-ban text-danger' : 'fa fa-check text-success'"></i>
              </button>
            </td>
          </tr>
          <tr *ngIf="usuarios.length === 0">
            <td colspan="6" class="text-center py-5">
              <p class="mb-0 text-muted">No hay usuarios registrados con los filtros seleccionados.</p>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination -->
      <div class="pagination-junta p-3 border-top">
        <div class="page-info">Mostrando 1 - {{ usuarios.length }} de {{ usuarios.length }} usuarios</div>
        
        <div class="page-btn inactive nav-btn">
          <i class="fa fa-chevron-left"></i> ANTERIOR
        </div>
        <div class="page-btn number active">1</div>
        <div class="page-btn nav-btn">
          SIGUIENTE <i class="fa fa-chevron-right"></i>
        </div>

        <div class="rows-selector">
          <span>Mostrar</span>
          <select>
            <option>10</option>
            <option>20</option>
            <option>50</option>
          </select>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .card-junta-table {
      background: white;
      border-radius: 8px;
      overflow: hidden;
      border: 1px solid #eee;
    }
    .btn-icon {
      background: none;
      border: none;
      padding: 4px 8px;
      cursor: pointer;
      font-size: 1.1rem;
      transition: transform 0.2s;
      &:hover {
        transform: scale(1.1);
      }
    }
  `]
})
export class UsuariosListComponent {
  @Input() usuarios: Usuario[] = [];
  @Output() edit = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();

  toggleActive(usuario: Usuario) {
    this.delete.emit(usuario.id);
  }
}
