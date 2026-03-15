import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'catalogos/marcas',
        loadComponent: () => import('./presentation/marcas/marca-list.component').then(m => m.MarcaListComponent)
    },
    { path: '', redirectTo: 'catalogos/marcas', pathMatch: 'full' }
];
