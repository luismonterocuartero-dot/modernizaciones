import { ApplicationConfig, isDevMode, LOCALE_ID } from '@angular/core';
import { provideRouter, withInMemoryScrolling, InMemoryScrollingOptions, InMemoryScrollingFeature } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore } from '@ngrx/router-store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { usuariosReducer } from './state/usuarios/usuarios.reducer';
import { UsuariosEffects } from './state/usuarios/usuarios.effects';
import { authReducer } from './state/auth/auth.reducer';
import { AuthEffects } from './state/auth/auth.effects';
import { vehiculosReducer } from './state/vehiculos/vehiculos.reducer';
import { VehiculosEffects } from './state/vehiculos/vehiculos.effects';
import { maestrosReducer } from './state/maestros/maestros.reducer';
import { MaestrosEffects } from './state/maestros/maestros.effects';
import { talleresReducer } from './state/talleres/talleres.reducer';
import { TalleresEffects } from './state/talleres/talleres.effects';
import { gestionReducer } from './state/gestion/gestion.reducer';
import { GestionEffects } from './state/gestion/gestion.effects';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEs);

const scrollConfig: InMemoryScrollingOptions = {
  scrollPositionRestoration: 'top',
  anchorScrolling: 'enabled',
};

const inMemoryScrollingFeature: InMemoryScrollingFeature =
  withInMemoryScrolling(scrollConfig);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, inMemoryScrollingFeature),
    provideHttpClient(withInterceptorsFromDi()),
    provideStore({
      usuarios: usuariosReducer,
      auth: authReducer,
      vehiculos: vehiculosReducer,
      maestros: maestrosReducer,
      talleres: talleresReducer,
      gestion: gestionReducer
    }),
    provideEffects([UsuariosEffects, AuthEffects, VehiculosEffects, MaestrosEffects, TalleresEffects, GestionEffects]),
    provideRouterStore(),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideAnimationsAsync(),
    { provide: LOCALE_ID, useValue: 'es-ES' }
  ]
};
