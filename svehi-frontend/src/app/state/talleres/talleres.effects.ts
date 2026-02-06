import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TalleresHttpService } from '../../infrastructure/talleres.http.service';
import * as TalleresActions from './talleres.actions';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class TalleresEffects {
    private actions$ = inject(Actions);
    private talleresService = inject(TalleresHttpService);
    private router = inject(Router);

    loadTalleres$ = createEffect(() => this.actions$.pipe(
        ofType(TalleresActions.loadTalleres),
        mergeMap(() => this.talleresService.getTalleres().pipe(
            map(talleres => TalleresActions.loadTalleresSuccess({ talleres })),
            catchError(error => of(TalleresActions.loadTalleresFailure({ error })))
        ))
    ));

    loadServices$ = createEffect(() => this.actions$.pipe(
        ofType(TalleresActions.loadTallerServicios),
        mergeMap(({ tallerId }) => this.talleresService.getServicios(tallerId).pipe(
            map(services => TalleresActions.loadTallerServiciosSuccess({ services })),
            catchError(error => of(TalleresActions.loadTallerServiciosFailure({ error })))
        ))
    ));

    createTaller$ = createEffect(() => this.actions$.pipe(
        ofType(TalleresActions.createTaller),
        mergeMap(({ taller }) => this.talleresService.createTaller(taller).pipe(
            map(newTaller => TalleresActions.createTallerSuccess({ taller: newTaller })),
            catchError(error => of(TalleresActions.createTallerFailure({ error })))
        ))
    ));

    createTallerSuccessRedirect$ = createEffect(() => this.actions$.pipe(
        ofType(TalleresActions.createTallerSuccessRedirect),
        tap(() => this.router.navigate(['/talleres']))
    ), { dispatch: false });

    // Redirect trigger
    createTallerSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(TalleresActions.createTallerSuccess),
        map(() => TalleresActions.createTallerSuccessRedirect())
    ));

    addService$ = createEffect(() => this.actions$.pipe(
        ofType(TalleresActions.addServicio),
        mergeMap(({ tallerId, servicio }) => this.talleresService.addServicio(tallerId, servicio).pipe(
            map(() => TalleresActions.addServicioSuccess()),
            catchError(error => of(TalleresActions.addServicioFailure({ error })))
        ))
    ));

    // Reload services after adding
    addServiceSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(TalleresActions.addServicioSuccess),
        // Since we don't have the ID, we assume the component will reload or we can do nothing here
        // and let component handle it via subscription or separate action.
        // For simplicity, we just complete.
        map(() => { return { type: 'NO_OP' }; })
    ), { dispatch: false });
}
