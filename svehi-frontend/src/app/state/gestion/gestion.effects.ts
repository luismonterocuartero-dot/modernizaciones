import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { GestionHttpService } from '../../infrastructure/gestion.http.service';
import * as GestionActions from './gestion.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class GestionEffects {
    private actions$ = inject(Actions);
    private service = inject(GestionHttpService);

    // --- COMPANIAS ---
    loadCompanias$ = createEffect(() => this.actions$.pipe(
        ofType(GestionActions.loadCompanias),
        mergeMap(() => this.service.getCompanias().pipe(
            map(companias => GestionActions.loadCompaniasSuccess({ companias })),
            catchError(error => of(GestionActions.loadFailure({ error })))
        ))
    ));
    addCompania$ = createEffect(() => this.actions$.pipe(
        ofType(GestionActions.addCompania),
        mergeMap(({ compania }) => this.service.addCompania(compania).pipe(
            map(() => GestionActions.loadCompanias()),
            catchError(error => of(GestionActions.loadFailure({ error })))
        ))
    ));

    // --- CONCEPTOS ---
    loadConceptos$ = createEffect(() => this.actions$.pipe(
        ofType(GestionActions.loadConceptos),
        mergeMap(() => this.service.getConceptos().pipe(
            map(concepts => GestionActions.loadConceptosSuccess({ concepts })),
            catchError(error => of(GestionActions.loadFailure({ error })))
        ))
    ));
    addConcepto$ = createEffect(() => this.actions$.pipe(
        ofType(GestionActions.addConcepto),
        mergeMap(({ concepto }) => this.service.addConcepto(concepto).pipe(
            map(() => GestionActions.loadConceptos()),
            catchError(error => of(GestionActions.loadFailure({ error })))
        ))
    ));

    // --- MARCAS ---
    loadMarcas$ = createEffect(() => this.actions$.pipe(
        ofType(GestionActions.loadMarcas),
        mergeMap(() => this.service.getMarcas().pipe(
            map(marcas => GestionActions.loadMarcasSuccess({ marcas })),
            catchError(error => of(GestionActions.loadFailure({ error })))
        ))
    ));
    addMarca$ = createEffect(() => this.actions$.pipe(
        ofType(GestionActions.addMarca),
        mergeMap(({ marca }) => this.service.addMarca(marca).pipe(
            map(() => GestionActions.loadMarcas()),
            catchError(error => of(GestionActions.loadFailure({ error })))
        ))
    ));

    // --- MODELOS ---
    selectMarca$ = createEffect(() => this.actions$.pipe(
        ofType(GestionActions.selectMarca),
        map(({ id }) => GestionActions.loadModelos({ marcaId: id }))
    ));

    loadModelos$ = createEffect(() => this.actions$.pipe(
        ofType(GestionActions.loadModelos),
        mergeMap(({ marcaId }) => this.service.getModelos(marcaId).pipe(
            map(modelos => GestionActions.loadModelosSuccess({ modelos })),
            catchError(error => of(GestionActions.loadFailure({ error })))
        ))
    ));
    addModelo$ = createEffect(() => this.actions$.pipe(
        ofType(GestionActions.addModelo),
        mergeMap(({ modelo }) => this.service.addModelo(modelo).pipe(
            map(() => GestionActions.loadModelos({ marcaId: modelo.marcaId! })),
            catchError(error => of(GestionActions.loadFailure({ error })))
        ))
    ));

    // --- OPERADORAS ---
    loadOperadoras$ = createEffect(() => this.actions$.pipe(
        ofType(GestionActions.loadOperadoras),
        mergeMap(() => this.service.getOperadoras().pipe(
            map(operadoras => GestionActions.loadOperadorasSuccess({ operadoras })),
            catchError(error => of(GestionActions.loadFailure({ error })))
        ))
    ));
    addOperadora$ = createEffect(() => this.actions$.pipe(
        ofType(GestionActions.addOperadora),
        mergeMap(({ operadora }) => this.service.addOperadora(operadora).pipe(
            map(() => GestionActions.loadOperadoras()),
            catchError(error => of(GestionActions.loadFailure({ error })))
        ))
    ));

    // --- PARAMETROS ---
    loadParametros$ = createEffect(() => this.actions$.pipe(
        ofType(GestionActions.loadParametros),
        mergeMap(() => this.service.getParametros().pipe(
            map(parametros => GestionActions.loadParametrosSuccess({ parametros })),
            catchError(error => of(GestionActions.loadFailure({ error })))
        ))
    ));
    addParametro$ = createEffect(() => this.actions$.pipe(
        ofType(GestionActions.addParametro),
        mergeMap(({ parametro }) => this.service.addParametro(parametro).pipe(
            map(() => GestionActions.loadParametros()),
            catchError(error => of(GestionActions.loadFailure({ error })))
        ))
    ));

    // --- PERFILES ---
    loadPerfiles$ = createEffect(() => this.actions$.pipe(
        ofType(GestionActions.loadPerfiles),
        mergeMap(() => this.service.getPerfiles().pipe(
            map(perfiles => GestionActions.loadPerfilesSuccess({ perfiles })),
            catchError(error => of(GestionActions.loadFailure({ error })))
        ))
    ));
    addPerfil$ = createEffect(() => this.actions$.pipe(
        ofType(GestionActions.addPerfil),
        mergeMap(({ perfil }) => this.service.addPerfil(perfil).pipe(
            map(() => GestionActions.loadPerfiles()),
            catchError(error => of(GestionActions.loadFailure({ error })))
        ))
    ));

    // --- PERMISOS ---
    loadPermisos$ = createEffect(() => this.actions$.pipe(
        ofType(GestionActions.loadPermisos),
        mergeMap(() => this.service.getPermisos().pipe(
            map(permisos => GestionActions.loadPermisosSuccess({ permisos })),
            catchError(error => of(GestionActions.loadFailure({ error })))
        ))
    ));
}
