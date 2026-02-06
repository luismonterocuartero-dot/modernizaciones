import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { login, loginWithCertificate } from '../../../state/auth/auth.actions';
import { selectAuthLoading, selectAuthError } from '../../../state/auth/auth.selectors';
import { HeaderJuntaComponent } from '../../components/header-junta/header-junta.component';
import { FirmaService } from '../../../core/services/firma.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HeaderJuntaComponent],
  template: `
    <app-header-junta [showNav]="false" [showUser]="false"></app-header-junta>

    <div class="login-page-container">
      <nav class="container-junta">
        <div class="breadcrumb-custom">
          <a href="#">Inicio</a> <span class="separator">/</span>
        </div>
      </nav>

      <div class="login-card-wrapper">
        <h1 class="login-main-title">Inicio de sesion</h1>

        <div class="login-card-junta">
          <h2 class="login-subtitle">Introduce tus datos de usuario</h2>

          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="login-form">
            <div class="form-group-junta mb-4">
              <label class="label-login">Usuario</label>
              <input type="text" formControlName="username" placeholder="Ingrese su usuario" 
                     class="input-login"
                     [class.is-invalid]="submitted && f['username'].errors">
            </div>

            <div class="form-group-junta mb-4">
              <label class="label-login">Contraseña</label>
              <div class="password-input-wrapper">
                <input [type]="showPassword ? 'text' : 'password'" formControlName="password" 
                       placeholder="Ingrese su contraseña"
                       class="input-login"
                       [class.is-invalid]="submitted && f['password'].errors">
                <button type="button" class="btn-password-toggle" (click)="showPassword = !showPassword">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                       stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
                       class="eye-icon">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                </button>
              </div>
            </div>

            <div *ngIf="error$ | async as error" class="alert-custom mb-4">
              Credenciales incorrectas. Inténtelo de nuevo.
            </div>

            <div class="text-center button-container">
              <button type="submit" class="btn-login-modern" [disabled]="loading$ | async">
                <span *ngIf="loading$ | async" class="spinner-border spinner-border-sm me-2"></span>
                INICIAR SESIÓN
              </button>
            </div>

            <div class="text-center mt-3">
              <button type="button" class="btn-cert-modern" (click)="onCertificateLogin()">
                ACCEDER CON CERTIFICADO
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-page-container {
      min-height: calc(100vh - 72px);
      background-color: white;
    }

    .breadcrumb-custom {
      font-size: 14px;
      color: var(--junta-primary);
      font-weight: 500;
      padding-top: 20px;
      
      a {
        color: var(--junta-primary);
        text-decoration: none;
        &:hover { text-decoration: underline; }
      }
      .separator {
        color: #999;
        margin-left: 10px;
      }
    }

    .login-card-wrapper {
      max-width: 550px;
      margin: 20px auto 60px;
      padding: 0 20px;
    }

    .login-main-title {
      font-size: 32px;
      font-weight: 800;
      color: black;
      margin-bottom: 25px;
      text-align: left;
    }

    .login-card-junta {
      background: white;
      border: 1px solid #ced4da;
      border-radius: 8px;
      padding: 35px;
      box-shadow: 0 2px 15px rgba(0,0,0,0.08);
    }

    .login-subtitle {
      font-size: 22px;
      font-weight: 700;
      color: black;
      margin-bottom: 30px;
    }

    .label-login {
      display: block;
      font-weight: 700;
      color: #333;
      margin-bottom: 8px;
      font-size: 15px;
    }

    .input-login {
      width: 100%;
      height: 48px;
      padding: 10px 15px;
      border: 1.5px solid #ced4da;
      border-radius: 8px;
      font-size: 16px;
      transition: all 0.2s;
      
      &::placeholder {
        color: #adb5bd;
      }
      
      &:focus {
        outline: none;
        border-color: var(--junta-primary);
        box-shadow: 0 0 0 3px rgba(0, 122, 51, 0.1);
      }
      
      &.is-invalid {
        border-color: #dc3545;
      }
    }

    .password-input-wrapper {
      position: relative;
    }

    .btn-password-toggle {
      position: absolute;
      right: 15px;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      color: var(--junta-primary);
      cursor: pointer;
      display: flex;
      align-items: center;
    }

    .button-container {
      margin-top: 40px;
      display: flex;
      justify-content: center;
    }

    .btn-login-modern {
      background-color: white;
      color: #ced4da;
      border: 1.5px solid #ced4da;
      border-radius: 4px;
      padding: 12px 35px;
      font-weight: 700;
      font-size: 15px;
      transition: all 0.2s;
      cursor: pointer;
      
      &:hover:not(:disabled) {
        border-color: #adb5bd;
        color: #adb5bd;
      }
      
      &:disabled {
        opacity: 0.6;
      }
    }

    .btn-cert-modern {
      background-color: #007a33;
      color: white;
      border: none;
      border-radius: 4px;
      padding: 12px 35px;
      font-weight: 700;
      font-size: 15px;
      transition: all 0.2s;
      cursor: pointer;
      width: 100%;
      margin-top: 10px;

      &:hover {
        background-color: #005a26;
      }
    }

    .alert-custom {
      background-color: #f82a2a1a;
      color: #dc3545;
      padding: 12px;
      border-radius: 4px;
      font-size: 14px;
      font-weight: 500;
      border-left: 4px solid #dc3545;
    }
  `]
})
export class LoginPageComponent {
  private store = inject(Store);
  private fb = inject(FormBuilder);
  private firmaService = inject(FirmaService);

  loading$ = this.store.select(selectAuthLoading);
  error$ = this.store.select(selectAuthError);

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  submitted = false;
  showPassword = false;

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) return;

    const credentials = {
      username: this.loginForm.value.username!,
      password: this.loginForm.value.password!
    };

    this.store.dispatch(login({ credentials }));
  }

  async onCertificateLogin() {
    try {
      const nif = await this.firmaService.seleccionarCertificado();
      this.store.dispatch(loginWithCertificate({ nif }));
    } catch (error) {
      console.log('Certificado cancelado o error:', error);
    }
  }
}
