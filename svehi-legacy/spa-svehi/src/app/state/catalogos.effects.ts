import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CatalogosService } from '../infrastructure/catalogos.service';
import * as CatalogosActions from './catalogos.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class CatalogosEffects {
    private actions$ = inject(Actions);
    private catalogosService = inject(CatalogosService);

    loadMarcas$ = createEffect(() => this.actions$.pipe(
        ofType(CatalogosActions.loadMarcas),
        mergeMap(() => this.catalogosService.getMarcas().pipe(
            map(marcas => CatalogosActions.loadMarcasSuccess({ marcas })),
            catchError(error => of(CatalogosActions.loadMarcasError({ error })))
        ))
    ));
}
