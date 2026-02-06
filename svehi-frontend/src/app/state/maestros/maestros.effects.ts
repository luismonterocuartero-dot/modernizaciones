import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MaestrosHttpService } from '../../infrastructure/maestros.http.service';
import * as MaestrosActions from './maestros.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class MaestrosEffects {
    private actions$ = inject(Actions);
    private maestrosService = inject(MaestrosHttpService);

    loadCompanias$ = createEffect(() => this.actions$.pipe(
        ofType(MaestrosActions.loadCompanias),
        mergeMap(() => this.maestrosService.getCompanias().pipe(
            map(companias => MaestrosActions.loadCompaniasSuccess({ companias })),
            catchError(error => of(MaestrosActions.loadCompaniasFailure({ error })))
        ))
    ));

    loadConceptos$ = createEffect(() => this.actions$.pipe(
        ofType(MaestrosActions.loadConceptos),
        mergeMap(() => this.maestrosService.getConceptos().pipe(
            map(conceptos => MaestrosActions.loadConceptosSuccess({ conceptos })),
            catchError(error => of(MaestrosActions.loadConceptosFailure({ error })))
        ))
    ));

    loadModelos$ = createEffect(() => this.actions$.pipe(
        ofType(MaestrosActions.loadModelos),
        mergeMap(() => this.maestrosService.getModelos().pipe(
            map(modelos => MaestrosActions.loadModelosSuccess({ modelos })),
            catchError(error => of(MaestrosActions.loadModelosFailure({ error })))
        ))
    ));

    loadOperadoras$ = createEffect(() => this.actions$.pipe(
        ofType(MaestrosActions.loadOperadoras),
        mergeMap(() => this.maestrosService.getOperadoras().pipe(
            map(operadoras => MaestrosActions.loadOperadorasSuccess({ operadoras })),
            catchError(error => of(MaestrosActions.loadOperadorasFailure({ error })))
        ))
    ));

    loadParametros$ = createEffect(() => this.actions$.pipe(
        ofType(MaestrosActions.loadParametros),
        mergeMap(() => this.maestrosService.getParametros().pipe(
            map(parametros => MaestrosActions.loadParametrosSuccess({ parametros })),
            catchError(error => of(MaestrosActions.loadParametrosFailure({ error })))
        ))
    ));

    loadPerfiles$ = createEffect(() => this.actions$.pipe(
        ofType(MaestrosActions.loadPerfiles),
        mergeMap(() => this.maestrosService.getPerfiles().pipe(
            map(perfiles => MaestrosActions.loadPerfilesSuccess({ perfiles })),
            catchError(error => of(MaestrosActions.loadPerfilesFailure({ error })))
        ))
    ));

    loadMarcas$ = createEffect(() => this.actions$.pipe(
        ofType(MaestrosActions.loadMarcas),
        mergeMap(() => this.maestrosService.getMarcas().pipe(
            map(marcas => MaestrosActions.loadMarcasSuccess({ marcas })),
            catchError(error => of(MaestrosActions.loadMarcasFailure({ error })))
        ))
    ));
}
