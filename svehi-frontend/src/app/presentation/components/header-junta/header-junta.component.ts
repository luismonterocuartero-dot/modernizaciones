import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectAuthUser } from '../../../state/auth/auth.selectors';
import { logout } from '../../../state/auth/auth.actions';

@Component({
  selector: 'app-header-junta',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="header-junta">
      <div class="header-top">
        <div class="logo-container">
          <!-- Logo Junta Simplified as per image -->
          <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" class="logo-svg">
            <path d="M20 80L50 20L80 80H65L50 50L35 80H20Z" fill="#007A33"/>
          </svg>
          <div class="divider"></div>
          <div class="branding">
            <span class="site-title">Parque móvil UPA</span>
          </div>
        </div>

        <nav *ngIf="showNav" class="main-nav">
          <a routerLink="/vehiculos" routerLinkActive="active" class="nav-item">
            <i class="fa fa-car"></i>
            <span>Vehículos</span>
          </a>

          <a routerLink="/talleres" routerLinkActive="active" class="nav-item">
            <i class="fa fa-wrench"></i>
            <span>Talleres</span>
          </a>
          
          <div class="nav-item nav-item-dropdown" (click)="toggleGestionMenu()" [class.active]="showGestionMenu">
            <i class="fa fa-cogs"></i>
            <span>Gestión</span>
            
            <div *ngIf="showGestionMenu" class="dropdown-menu-junta" (click)="$event.stopPropagation()">
                <div class="dropdown-header">ADMINISTRACIÓN</div>
                <a routerLink="/usuarios" class="dropdown-item" (click)="closeGestionMenu()">
                    <i class="fa fa-users"></i> Usuarios
                </a>
                <a routerLink="/perfiles" class="dropdown-item" (click)="closeGestionMenu()">
                    <i class="fa fa-id-badge"></i> Perfiles
                </a>
                <div class="dropdown-divider"></div>
                <div class="dropdown-header">MAESTROS</div>
                <a routerLink="/gestion/marcas" class="dropdown-item" (click)="closeGestionMenu()">
                    <i class="fa fa-tags"></i> Marcas y Modelos
                </a>
                <a routerLink="/gestion/companias" class="dropdown-item" (click)="closeGestionMenu()">
                    <i class="fa fa-building"></i> Compañías
                </a>
                <!-- Add more maestro links as needed -->
            </div>
          </div>
        </nav>

        <div *ngIf="showUser && (user$ | async) as user" class="user-profile">
          <div class="user-info">
            <span class="user-name">{{ user.nombre }} {{ user.apellido1 }}</span>
            <span class="user-role">{{ user.perfil?.nombre }}</span>
          </div>
          <div class="user-avatar">
            <i class="fa fa-user"></i>
          </div>
          <button class="btn-logout" (click)="onLogout()" title="Cerrar sesión">
            <i class="fa fa-sign-out-alt"></i>
          </button>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .header-junta {
      background: white;
      border-bottom: 2px solid var(--junta-primary);
      padding: 0 40px;
      height: 72px;
      display: flex;
      align-items: center;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }

    .header-top {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .logo-container {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .divider {
      width: 1px;
      height: 40px;
      background-color: #D6D6D6;
    }

    .branding {
      display: flex;
      flex-direction: column;
    }

    .site-subtitle {
      font-size: 13px;
      color: #666;
    }

    .site-title {
      font-size: 18px;
      font-weight: 700;
      color: var(--junta-primary);
    }

    .main-nav {
      display: flex;
      gap: 32px;
      margin-left: 40px;
    }

    .nav-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      text-decoration: none;
      color: #666;
      font-size: 13px;
      padding: 8px 0;
      border-bottom: 3px solid transparent;
      transition: all 0.2s;

      i { font-size: 18px; }
      
      &:hover { color: var(--junta-primary); }
      &.active {
        color: var(--junta-primary);
        border-bottom-color: var(--junta-primary);
        font-weight: 600;
      }
    }

    .user-profile {
      display: flex;
      align-items: center;
      gap: 12px;
      padding-left: 20px;
      border-left: 1px solid #EEE;
    }

    .user-info {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }

    .user-name {
      font-size: 14px;
      font-weight: 600;
      color: #333;
    }

    .user-role {
      font-size: 12px;
      color: #666;
    }

    .user-avatar {
      width: 40px;
      height: 40px;
      background: #F5F5F5;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #999;
      font-size: 20px;
    }

    .btn-logout {
      background: none;
      border: none;
      color: #999;
      font-size: 18px;
      cursor: pointer;
      padding: 8px;
      border-radius: 4px;
      transition: all 0.2s;

      &:hover {
        background: #F5F5F5;
        color: #d32f2f;
      }
    }

    /* Submenu Styles */
    .nav-item-dropdown {
      position: relative;
      cursor: pointer;
    }
    
    .dropdown-menu-junta {
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      background: white;
      border-radius: 4px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      border: 1px solid #EEE;
      padding: 8px 0;
      min-width: 180px;
      z-index: 1000;
      margin-top: 10px;
      display: flex;
      flex-direction: column;
    }

    /* Triangle caret */
    .dropdown-menu-junta::before {
        content: '';
        position: absolute;
        top: -6px;
        left: 50%;
        transform: translateX(-50%);
        width: 0; 
        height: 0; 
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-bottom: 6px solid white;
    }

    .dropdown-item {
      padding: 10px 16px;
      color: #333;
      text-decoration: none;
      font-size: 14px;
      display: flex;
      align-items: center;
      gap: 10px;
      transition: background 0.2s;

      &:hover {
        background-color: #F9F9F9;
        color: var(--junta-primary);
      }

      i { width: 20px; text-align: center; color: #666; }
      &:hover i { color: var(--junta-primary); }
    }

    .dropdown-header {
        font-size: 11px;
        font-weight: 700;
        color: #999;
        padding: 8px 16px 4px 16px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    .dropdown-divider {
        height: 1px;
        background-color: #EEE;
        margin: 4px 0;
    }
  `]
})
export class HeaderJuntaComponent {
  @Input() showNav: boolean = true;
  @Input() showUser: boolean = true;

  private store = inject(Store);
  user$ = this.store.select(selectAuthUser);

  showGestionMenu = false;

  toggleGestionMenu() {
    this.showGestionMenu = !this.showGestionMenu;
  }

  closeGestionMenu() {
    this.showGestionMenu = false;
  }

  onLogout() {
    this.store.dispatch(logout());
  }
}
