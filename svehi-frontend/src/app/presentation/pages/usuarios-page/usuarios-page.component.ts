import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { loadUsuarios, createUsuario, updateUsuario, deleteUsuario } from '../../../state/usuarios/usuarios.actions';
import { selectUsuariosList, selectUsuariosLoading, selectUsuariosError } from '../../../state/usuarios/usuarios.selectors';
import * as GestionActions from '../../../state/gestion/gestion.actions';
import { selectPerfiles } from '../../../state/gestion/gestion.selectors';
import { UsuariosListComponent } from '../../components/usuarios-list/usuarios-list.component';
import { HeaderJuntaComponent } from '../../components/header-junta/header-junta.component';
import { UsuarioFormComponent } from '../../components/usuario-form/usuario-form.component';
// import { MaestrosHttpService } from '../../../infrastructure/maestros.http.service'; // Removed in favor of Store
import { Perfil, Usuario } from '../../../domain/usuario.model';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { UsuarioHttpService } from '../../../infrastructure/usuario.http.service';

@Component({
  selector: 'app-usuarios-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, UsuariosListComponent, HeaderJuntaComponent, UsuarioFormComponent],
  template: `
    <app-header-junta></app-header-junta>

    <div class="container-junta">
      <!-- Breadcrumb -->
      <nav class="breadcrumb-junta">
        <a routerLink="/">Inicio</a>
        <span>/</span>
        <a routerLink="/usuarios">Usuarios</a>
        <span>/</span>
      </nav>

      <!-- View List -->
      <ng-container *ngIf="!showForm">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h1 class="mb-0">Gestión de Usuarios</h1>
          <button class="btn-junta btn-junta-primary" (click)="onCreate()">
            <i class="fa fa-plus pe-2"></i> NUEVO USUARIO
          </button>
        </div>

        <!-- Filtros -->
        <div class="search-box-junta">
          <form [formGroup]="filterForm" (ngSubmit)="onSearch()" class="row align-items-end g-3">
            <div class="col-md-3 form-group-junta">
              <label>Nombre</label>
              <input type="text" formControlName="nombre" placeholder="Todos los usuarios">
            </div>
            <div class="col-md-3 form-group-junta">
              <label>NIF</label>
              <input type="text" formControlName="nif" placeholder="Filtrar por NIF">
            </div>
            <div class="col-md-3 form-group-junta">
              <label>Perfil</label>
              <select formControlName="perfilId">
                <option [value]="null">Todos los perfiles</option>
                <option *ngFor="let p of perfiles$ | async" [value]="p.id">{{ p.nombre }}</option>
              </select>
            </div>
            <div class="col-md-3 d-flex gap-2 justify-content-end">
              <button type="button" class="btn-clear" (click)="onClear()">
                <i class="fa fa-filter-circle-xmark"></i> LIMPIAR
              </button>
              <button type="submit" class="btn-search">
                <i class="fa fa-search"></i> BUSCAR
              </button>
            </div>
          </form>
        </div>

        <!-- Loading / Error / Table -->
        <div *ngIf="loading$ | async" class="text-center py-5">
          <i class="fa fa-spinner fa-spin fa-3x mb-3 text-junta-green"></i>
          <p class="text-muted">Cargando usuarios...</p>
        </div>

        <div *ngIf="error$ | async as error" class="alert alert-danger mb-4">
          <strong>Error:</strong> {{ error.message }}
        </div>

        <div *ngIf="!(loading$ | async)" class="table-container-junta">
          <h3 *ngIf="usuarios$ | async as usuarios">{{ usuarios.length }} usuarios registrados</h3>
          <app-usuarios-list
            *ngIf="usuarios$ | async as usuarios"
            [usuarios]="usuarios"
            (edit)="onEdit($event)"
            (delete)="onDelete($event)">
          </app-usuarios-list>
        </div>
      </ng-container>

      <!-- View Form -->
      <div *ngIf="showForm" class="py-4">
        <app-usuario-form
          [usuario]="selectedUsuario"
          (save)="onSave($event)"
          (cancel)="onCancel()">
        </app-usuario-form>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; min-height: 100vh; background-color: var(--junta-bg-light); }
  `]
})
export class UsuariosPageComponent implements OnInit {
  private store = inject(Store);
  private fb = inject(FormBuilder);
  // private maestrosService = inject(MaestrosHttpService);
  private usuarioHttpService = inject(UsuarioHttpService);

  usuarios$ = this.store.select(selectUsuariosList);
  loading$ = this.store.select(selectUsuariosLoading);
  error$ = this.store.select(selectUsuariosError);
  perfiles$: Observable<Perfil[]> = this.store.select(selectPerfiles);

  filterForm = this.fb.group({
    nombre: [null],
    nif: [null],
    perfilId: [null]
  });

  showForm = false;
  selectedUsuario?: Usuario;

  ngOnInit() {
    this.onSearch();
    this.store.dispatch(GestionActions.loadPerfiles());
  }

  onSearch() {
    const filters = this.filterForm.value;
    this.store.dispatch(loadUsuarios({
      page: 0,
      size: 10,
      nombre: filters.nombre || undefined,
      nif: filters.nif || undefined
    }));
  }

  onClear() { this.filterForm.reset(); this.onSearch(); }

  onCreate() {
    this.selectedUsuario = undefined;
    this.showForm = true;
  }

  onEdit(id: number) {
    this.usuarioHttpService.getUsuarioById(id).pipe(take(1)).subscribe(usuario => {
      this.selectedUsuario = usuario;
      this.showForm = true;
    });
  }

  onDelete(id: number) {
    if (confirm('¿Está seguro de que desea desactivar este usuario?')) {
      this.store.dispatch(deleteUsuario({ id }));
    }
  }

  onSave(usuario: Partial<Usuario>) {
    if (this.selectedUsuario) {
      this.store.dispatch(updateUsuario({ id: this.selectedUsuario.id, usuario }));
    } else {
      this.store.dispatch(createUsuario({ usuario }));
    }
    this.showForm = false;
  }

  onCancel() { this.showForm = false; }
}
