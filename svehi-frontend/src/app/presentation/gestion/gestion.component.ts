import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-gestion',
    standalone: true,
    imports: [CommonModule, RouterModule],
    template: `
    <div class="container-junta">
        <nav class="breadcrumb-junta">
            <a routerLink="/">Inicio</a>
            <span>/</span>
            <span>Gestión</span>
        </nav>

        <h1 class="mb-4">Gestión del Sistema</h1>
        
        <div class="row g-4">
            <div class="col-md-3">
                <div class="card-junta">
                    <div class="card-junta-header">
                        <h3><i class="fa fa-cog me-2"></i>Configuración</h3>
                    </div>
                    <div class="card-junta-body p-0">
                        <nav class="nav-junta-vertical">
                            <a routerLink="marcas" routerLinkActive="active" class="nav-item-junta">
                                <i class="fa fa-car me-2"></i> Marcas y Modelos
                            </a>
                            <a routerLink="companias" routerLinkActive="active" class="nav-item-junta">
                                <i class="fa fa-shield-alt me-2"></i> Compañías de Seguros
                            </a>
                            <a routerLink="operadoras" routerLinkActive="active" class="nav-item-junta">
                                <i class="fa fa-building me-2"></i> Operadoras de Renting
                            </a>
                            <a routerLink="conceptos" routerLinkActive="active" class="nav-item-junta">
                                <i class="fa fa-euro-sign me-2"></i> Conceptos de Gasto
                            </a>
                            <a routerLink="parametros" routerLinkActive="active" class="nav-item-junta">
                                <i class="fa fa-sliders-h me-2"></i> Parámetros Globales
                            </a>
                        </nav>
                    </div>
                </div>
            </div>
            
            <div class="col-md-9">
                <router-outlet></router-outlet>
            </div>
        </div>
    </div>
    `,
    styles: [`
    :host { display: block; min-height: 100vh; background-color: var(--junta-bg-light); padding: var(--spacing-lg) 0; }
    
    .nav-junta-vertical {
        display: flex;
        flex-direction: column;
    }
    
    .nav-item-junta {
        padding: var(--spacing-md);
        color: var(--junta-text-dark);
        text-decoration: none;
        border-left: 3px solid transparent;
        transition: all var(--transition-base);
        display: flex;
        align-items: center;
    }
    
    .nav-item-junta:hover {
        background-color: var(--junta-primary-light);
        border-left-color: var(--junta-primary);
    }
    
    .nav-item-junta.active {
        background-color: var(--junta-primary);
        color: var(--junta-white);
        border-left-color: var(--junta-primary-dark);
        font-weight: 500;
    }
    
    .nav-item-junta + .nav-item-junta {
        border-top: 1px solid var(--junta-stroke-light);
    }
    `]
})
export class GestionComponent { }
