import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Usuario, Perfil } from '../../../domain/usuario.model';
import { MaestrosHttpService } from '../../../infrastructure/maestros.http.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
    selector: 'app-usuario-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    template: `
    <div class="card-junta">
      <div class="card-junta-header">
        <h3 class="mb-0">{{ usuario ? 'Editar Usuario' : 'Nuevo Usuario' }}</h3>
      </div>
      <div class="card-junta-body">
        <form [formGroup]="userForm" (ngSubmit)="onSubmit()" class="row g-3">
          <div class="col-md-6 form-group-junta">
            <label>NIF (*)</label>
            <input type="text" formControlName="nif" placeholder="12345678A" [readonly]="!!usuario">
          </div>
          <div class="col-md-6 form-group-junta">
            <label>Nombre (*)</label>
            <input type="text" formControlName="nombre" placeholder="Nombre">
          </div>
          <div class="col-md-6 form-group-junta">
            <label>Primer Apellido (*)</label>
            <input type="text" formControlName="apellido1" placeholder="Apellido 1">
          </div>
          <div class="col-md-6 form-group-junta">
            <label>Segundo Apellido</label>
            <input type="text" formControlName="apellido2" placeholder="Apellido 2">
          </div>
          <div class="col-md-6 form-group-junta">
            <label>Email</label>
            <input type="email" formControlName="email" placeholder="usuario@ejemplo.com">
          </div>
          <div class="col-md-6 form-group-junta">
            <label>Perfil (*)</label>
            <select formControlName="perfilId">
              <option [value]="null">Seleccione un perfil</option>
              <option *ngFor="let p of perfiles$ | async" [value]="p.id">{{ p.nombre }}</option>
            </select>
          </div>
          <div class="col-md-12 form-group-junta">
            <label>Servicio Adscrito (*)</label>
            <input type="text" formControlName="servicioAdscrito" placeholder="Nombre del servicio">
          </div>
          
          <div class="col-md-12 mt-4 d-flex justify-content-end gap-2">
            <button type="button" class="btn-junta btn-junta-outline" (click)="cancel.emit()">
              CANCELAR
            </button>
            <button type="submit" class="btn-junta btn-junta-primary" [disabled]="userForm.invalid">
              {{ usuario ? 'ACTUALIZAR' : 'GUARDAR' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
    styles: [`
    .mt-4 { margin-top: 1.5rem !important; }
  `]
})
export class UsuarioFormComponent implements OnInit {
    @Input() usuario?: Usuario;
    @Output() save = new EventEmitter<Partial<Usuario>>();
    @Output() cancel = new EventEmitter<void>();

    private fb = inject(FormBuilder);
    private maestrosService = inject(MaestrosHttpService);

    perfiles$: Observable<Perfil[]> = this.maestrosService.getPerfiles().pipe(
        catchError(() => of([]))
    );

    userForm: FormGroup = this.fb.group({
        nif: ['', [Validators.required, Validators.pattern('^[0-9]{8}[A-Z]$')]],
        nombre: ['', Validators.required],
        apellido1: ['', Validators.required],
        apellido2: [''],
        email: ['', [Validators.email]],
        perfilId: [null, Validators.required],
        servicioAdscrito: ['', Validators.required],
        activo: [true]
    });

    ngOnInit() {
        if (this.usuario) {
            this.userForm.patchValue({
                ...this.usuario,
                perfilId: this.usuario.perfil?.id || this.usuario.perfilId
            });
        }
    }

    onSubmit() {
        if (this.userForm.valid) {
            this.save.emit(this.userForm.value);
        }
    }
}
