import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./presentation/pages/login-page/login-page.component').then(m => m.LoginPageComponent)
    },
    {
        path: 'usuarios',
        canActivate: [authGuard],
        loadComponent: () => import('./presentation/pages/usuarios-page/usuarios-page.component').then(m => m.UsuariosPageComponent)
    },
    {
        path: 'vehiculos',
        canActivate: [authGuard],
        loadComponent: () => import('./presentation/pages/vehiculos-page/vehiculos-page.component').then(m => m.VehiculosPageComponent)
    },
    {
        path: 'vehiculos/:id',
        canActivate: [authGuard],
        loadComponent: () => import('./presentation/pages/vehiculo-detail/vehiculo-detail.component').then(m => m.VehiculoDetailComponent)
    },
    {
        path: 'perfiles',
        canActivate: [authGuard],
        loadComponent: () => import('./presentation/pages/perfiles-page/perfiles-page.component').then(m => m.PerfilesPageComponent)
    },
    {
        path: 'proyectos',
        canActivate: [authGuard],
        loadComponent: () => import('./presentation/pages/usuarios-page/usuarios-page.component').then(m => m.UsuariosPageComponent) // Placeholder
    },
    {
        path: 'gestion',
        canActivate: [authGuard],
        loadComponent: () => import('./presentation/gestion/gestion.component').then(m => m.GestionComponent),
        children: [
            { path: 'companias', loadComponent: () => import('./presentation/gestion/pages/compania/compania-list.component').then(m => m.CompaniaListComponent) },
            { path: 'conceptos', loadComponent: () => import('./presentation/gestion/pages/concepto/concepto-list.component').then(m => m.ConceptoListComponent) },
            { path: 'marcas', loadComponent: () => import('./presentation/gestion/pages/marca-modelo/marca-list.component').then(m => m.MarcaListComponent) },
            { path: 'operadoras', loadComponent: () => import('./presentation/gestion/pages/operadora/operadora-list.component').then(m => m.OperadoraListComponent) },
            { path: 'parametros', loadComponent: () => import('./presentation/gestion/pages/parametro/parametro-list.component').then(m => m.ParametroListComponent) },
            { path: '', redirectTo: 'marcas', pathMatch: 'full' }
        ]
    },
    {
        path: 'talleres',
        canActivate: [authGuard],
        children: [
            { path: '', loadComponent: () => import('./presentation/talleres/talleres-list.component').then(m => m.TalleresListComponent) },
            { path: 'new', loadComponent: () => import('./presentation/talleres/taller-form.component').then(m => m.TallerFormComponent) },
            { path: ':id', loadComponent: () => import('./presentation/talleres/taller-detail.component').then(m => m.TallerDetailComponent) }
        ]
    },
    {
        path: 'dashboard',
        canActivate: [authGuard],
        loadComponent: () => import('./presentation/pages/dashboard-page/dashboard-page.component').then(m => m.DashboardPageComponent)
    },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: '**', redirectTo: 'dashboard' }
];
