import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderJuntaComponent } from '../../components/header-junta/header-junta.component';
import { DashboardHttpService } from '../../../infrastructure/dashboard.http.service';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-dashboard-page',
    standalone: true,
    imports: [CommonModule, HeaderJuntaComponent, RouterLink],
    template: `
    <app-header-junta></app-header-junta>

    <div class="container-junta">
        <nav class="breadcrumb-junta">
            <a routerLink="/">Inicio</a>
            <span>/</span>
            <span>Cuadro de Mando</span>
        </nav>

        <h1 class="mb-4">Cuadro de Mando del Parque Móvil</h1>

        <div *ngIf="indicators$ | async as kpi; else loading" class="row">
            
            <!-- Vehículos -->
            <div class="col-md-4 mb-4">
                <div class="card-junta">
                    <div class="card-body">
                        <h5 class="card-title text-junta-green">
                            <i class="fa fa-car me-2"></i> Parque de Vehículos
                        </h5>
                        <div class="d-flex justify-content-between align-items-end mt-3">
                            <div>
                                <h2 class="display-4 text-dark mp-0">{{ kpi.totalVehiculos }}</h2>
                                <small class="text-muted">Vehículos totales</small>
                            </div>
                            <div class="text-end">
                                <!-- Placeholder for actives if I had added it to VO but I didn't in the partial edit -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Servicios -->
            <div class="col-md-4 mb-4">
                <div class="card-junta">
                    <div class="card-body">
                        <h5 class="card-title text-junta-green">
                            <i class="fa fa-wrench me-2"></i> Servicios / Mantenimiento
                        </h5>
                        <div class="mt-3">
                            <div class="d-flex justify-content-between mb-2">
                                <span>Total Servicios Realizados</span>
                                <span class="fw-bold fs-5">{{ kpi.totalServicios }}</span>
                            </div>
                            <div class="d-flex justify-content-between border-top pt-2">
                                <span>Media por vehículo</span>
                                <span class="fw-bold">{{ kpi.mediaServiciosPorVehiculo | number:'1.1-2' }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Inspecciones -->
            <div class="col-md-4 mb-4">
                <div class="card-junta">
                    <div class="card-body">
                        <h5 class="card-title text-junta-green">
                            <i class="fa fa-clipboard-check me-2"></i> Inspecciones (ITV)
                        </h5>
                        <div class="mt-3">
                            <div class="d-flex justify-content-between mb-2">
                                <span>Total Inspecciones</span>
                                <span class="fw-bold fs-5">{{ kpi.totalInspecciones }}</span>
                            </div>
                            <div class="d-flex justify-content-between border-top pt-2">
                                <span>Media por vehículo</span>
                                <span class="fw-bold">{{ kpi.mediaInspeccionesPorVehiculo | number:'1.1-2' }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <ng-template #loading>
            <div class="text-center py-5">
                <i class="fa fa-spinner fa-spin fa-3x text-junta-green"></i>
                <p class="mt-3 text-muted">Cargando indicadores...</p>
            </div>
        </ng-template>
    </div>
  `,
    styles: [`
    :host { display: block; min-height: 100vh; background-color: var(--junta-bg-light); }
    .card-junta {
        background: #fff;
        border: 1px solid #ddd;
        border-radius: 4px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        height: 100%;
        transition: transform 0.2s;
    }
    .card-junta:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }
    .text-junta-green { color: #007A33; }
    .display-4 { font-size: 2.5rem; font-weight: 300; }
  `]
})
export class DashboardPageComponent {
    private dashboardService = inject(DashboardHttpService);

    indicators$ = this.dashboardService.getIndicators();
}
