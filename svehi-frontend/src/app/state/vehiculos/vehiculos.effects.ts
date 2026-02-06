import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { VehiculoHttpService } from '../../infrastructure/vehiculo.http.service';
import * as VehiculosActions from './vehiculos.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class VehiculosEffects {
    private actions$ = inject(Actions);
    private vehiculoService = inject(VehiculoHttpService);

    loadVehiculos$ = createEffect(() =>
        this.actions$.pipe(
            ofType(VehiculosActions.loadVehiculos),
            mergeMap(({ page, size, matricula, marcaId }) =>
                this.vehiculoService.getVehiculos(page, size, matricula, marcaId).pipe(
                    map((pageVehiculo) => VehiculosActions.loadVehiculosSuccess({ pageVehiculo })),
                    catchError((error) => of(VehiculosActions.loadVehiculosFailure({ error })))
                )
            )
        )
    );

    loadVehiculoDetail$ = createEffect(() =>
        this.actions$.pipe(
            ofType(VehiculosActions.loadVehiculoDetail),
            mergeMap(({ id }) =>
                this.vehiculoService.getVehiculo(id).pipe(
                    map((vehiculo) => VehiculosActions.loadVehiculoDetailSuccess({ vehiculo })),
                    catchError((error) => of(VehiculosActions.loadVehiculoDetailFailure({ error })))
                )
            )
        )
    );

    loadMatriculas$ = createEffect(() =>
        this.actions$.pipe(
            ofType(VehiculosActions.loadMatriculas),
            mergeMap(({ id }) =>
                this.vehiculoService.getMatriculas(id).pipe(
                    map((matriculas) => VehiculosActions.loadMatriculasSuccess({ matriculas })),
                    catchError((error) => of(VehiculosActions.loadVehiculoDetailFailure({ error })))
                )
            )
        )
    );

    addMatricula$ = createEffect(() =>
        this.actions$.pipe(
            ofType(VehiculosActions.addMatricula),
            mergeMap(({ id, matricula }) =>
                this.vehiculoService.addMatricula(id, matricula).pipe(
                    map(() => VehiculosActions.loadMatriculas({ id })),
                    catchError((error) => of(VehiculosActions.loadVehiculoDetailFailure({ error })))
                )
            )
        )
    );

    loadEquipamiento$ = createEffect(() =>
        this.actions$.pipe(
            ofType(VehiculosActions.loadEquipamiento),
            mergeMap(({ id }) =>
                this.vehiculoService.getEquipamiento(id).pipe(
                    map((equipamiento) => VehiculosActions.loadEquipamientoSuccess({ equipamiento })),
                    catchError((error) => of(VehiculosActions.loadVehiculoDetailFailure({ error })))
                )
            )
        )
    );

    addEquipamiento$ = createEffect(() =>
        this.actions$.pipe(
            ofType(VehiculosActions.addEquipamiento),
            mergeMap(({ id, equipamiento }) =>
                this.vehiculoService.addEquipamiento(id, equipamiento).pipe(
                    map(() => VehiculosActions.loadEquipamiento({ id })),
                    catchError((error) => of(VehiculosActions.loadVehiculoDetailFailure({ error })))
                )
            )
        )
    );

    loadMantenimientos$ = createEffect(() =>
        this.actions$.pipe(
            ofType(VehiculosActions.loadMantenimientos),
            mergeMap(({ id }) =>
                this.vehiculoService.getMantenimientos(id).pipe(
                    map((mantenimientos) => VehiculosActions.loadMantenimientosSuccess({ mantenimientos })),
                    catchError((error) => of(VehiculosActions.loadVehiculoDetailFailure({ error })))
                )
            )
        )
    );

    addMantenimiento$ = createEffect(() =>
        this.actions$.pipe(
            ofType(VehiculosActions.addMantenimiento),
            mergeMap(({ id, mantenimiento }) =>
                this.vehiculoService.addMantenimiento(id, mantenimiento).pipe(
                    map(() => VehiculosActions.loadMantenimientos({ id })),
                    catchError((error) => of(VehiculosActions.loadVehiculoDetailFailure({ error })))
                )
            )
        )
    );

    loadCesiones$ = createEffect(() => this.actions$.pipe(
        ofType(VehiculosActions.loadCesiones),
        mergeMap(({ id }) => this.vehiculoService.getCesiones(id).pipe(
            map(cesiones => VehiculosActions.loadCesionesSuccess({ cesiones })),
            catchError(error => of(VehiculosActions.loadVehiculoDetailFailure({ error })))
        ))
    ));
    addCesion$ = createEffect(() => this.actions$.pipe(
        ofType(VehiculosActions.addCesion),
        mergeMap(({ id, cesion }) => this.vehiculoService.addCesion(id, cesion).pipe(
            map(() => VehiculosActions.loadCesiones({ id })),
            catchError(error => of(VehiculosActions.loadVehiculoDetailFailure({ error })))
        ))
    ));

    loadRepostajes$ = createEffect(() => this.actions$.pipe(
        ofType(VehiculosActions.loadRepostajes),
        mergeMap(({ id }) => this.vehiculoService.getRepostajes(id).pipe(
            map(repostajes => VehiculosActions.loadRepostajesSuccess({ repostajes })),
            catchError(error => of(VehiculosActions.loadVehiculoDetailFailure({ error })))
        ))
    ));
    addRepostaje$ = createEffect(() => this.actions$.pipe(
        ofType(VehiculosActions.addRepostaje),
        mergeMap(({ id, repostaje }) => this.vehiculoService.addRepostaje(id, repostaje).pipe(
            map(() => VehiculosActions.loadRepostajes({ id })),
            catchError(error => of(VehiculosActions.loadVehiculoDetailFailure({ error })))
        ))
    ));

    loadSiniestros$ = createEffect(() => this.actions$.pipe(
        ofType(VehiculosActions.loadSiniestros),
        mergeMap(({ id }) => this.vehiculoService.getSiniestros(id).pipe(
            map(siniestros => VehiculosActions.loadSiniestrosSuccess({ siniestros })),
            catchError(error => of(VehiculosActions.loadVehiculoDetailFailure({ error })))
        ))
    ));
    addSiniestro$ = createEffect(() => this.actions$.pipe(
        ofType(VehiculosActions.addSiniestro),
        mergeMap(({ id, siniestro }) => this.vehiculoService.addSiniestro(id, siniestro).pipe(
            map(() => VehiculosActions.loadSiniestros({ id })),
            catchError(error => of(VehiculosActions.loadVehiculoDetailFailure({ error })))
        ))
    ));

    loadPolizas$ = createEffect(() => this.actions$.pipe(
        ofType(VehiculosActions.loadPolizas),
        mergeMap(({ id }) => this.vehiculoService.getPolizas(id).pipe(
            map(polizas => VehiculosActions.loadPolizasSuccess({ polizas })),
            catchError(error => of(VehiculosActions.loadVehiculoDetailFailure({ error })))
        ))
    ));
    addPoliza$ = createEffect(() => this.actions$.pipe(
        ofType(VehiculosActions.addPoliza),
        mergeMap(({ id, poliza }) => this.vehiculoService.addPoliza(id, poliza).pipe(
            map(() => VehiculosActions.loadPolizas({ id })),
            catchError(error => of(VehiculosActions.loadVehiculoDetailFailure({ error })))
        ))
    ));

    loadItvs$ = createEffect(() => this.actions$.pipe(
        ofType(VehiculosActions.loadItvs),
        mergeMap(({ id }) => this.vehiculoService.getItvs(id).pipe(
            map(itvs => VehiculosActions.loadItvsSuccess({ itvs })),
            catchError(error => of(VehiculosActions.loadVehiculoDetailFailure({ error })))
        ))
    ));
    addItv$ = createEffect(() => this.actions$.pipe(
        ofType(VehiculosActions.addItv),
        mergeMap(({ id, itv }) => this.vehiculoService.addItv(id, itv).pipe(
            map(() => VehiculosActions.loadItvs({ id })),
            catchError(error => of(VehiculosActions.loadVehiculoDetailFailure({ error })))
        ))
    ));

    loadInfracciones$ = createEffect(() => this.actions$.pipe(
        ofType(VehiculosActions.loadInfracciones),
        mergeMap(({ id }) => this.vehiculoService.getInfracciones(id).pipe(
            map(infracciones => VehiculosActions.loadInfraccionesSuccess({ infracciones })),
            catchError(error => of(VehiculosActions.loadVehiculoDetailFailure({ error })))
        ))
    ));
    addInfraccion$ = createEffect(() => this.actions$.pipe(
        ofType(VehiculosActions.addInfraccion),
        mergeMap(({ id, infraccion }) => this.vehiculoService.addInfraccion(id, infraccion).pipe(
            map(() => VehiculosActions.loadInfracciones({ id })),
            catchError(error => of(VehiculosActions.loadVehiculoDetailFailure({ error })))
        ))
    ));
}
