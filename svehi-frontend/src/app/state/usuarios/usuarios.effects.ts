import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as UsuariosActions from './usuarios.actions';
import { UsuarioHttpService } from '../../infrastructure/usuario.http.service';

@Injectable()
export class UsuariosEffects {
    private actions$ = inject(Actions);
    private usuarioService = inject(UsuarioHttpService);

    loadUsuarios$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UsuariosActions.loadUsuarios),
            concatMap(action =>
                this.usuarioService.getUsuarios(action.page, action.size, action.nif, action.nombre).pipe(
                    map(response => UsuariosActions.loadUsuariosSuccess({ response })),
                    catchError(error => of(UsuariosActions.loadUsuariosFailure({ error })))
                )
            )
        )
    );

    createUsuario$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UsuariosActions.createUsuario),
            mergeMap(({ usuario }) =>
                this.usuarioService.createUsuario(usuario).pipe(
                    map((saved) => UsuariosActions.createUsuarioSuccess({ usuario: saved })),
                    catchError((error) => of(UsuariosActions.loadUsuariosFailure({ error })))
                )
            )
        )
    );

    updateUsuario$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UsuariosActions.updateUsuario),
            mergeMap(({ id, usuario }) =>
                this.usuarioService.updateUsuario(id, usuario).pipe(
                    map((saved) => UsuariosActions.updateUsuarioSuccess({ usuario: saved })),
                    catchError((error) => of(UsuariosActions.loadUsuariosFailure({ error })))
                )
            )
        )
    );

    deleteUsuario$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UsuariosActions.deleteUsuario),
            mergeMap(({ id }) =>
                this.usuarioService.deleteUsuario(id).pipe(
                    map(() => UsuariosActions.deleteUsuarioSuccess({ id })),
                    catchError((error) => of(UsuariosActions.loadUsuariosFailure({ error })))
                )
            )
        )
    );

    // Refresh after success
    refresh$ = createEffect(() =>
        this.actions$.pipe(
            ofType(
                UsuariosActions.createUsuarioSuccess,
                UsuariosActions.updateUsuarioSuccess,
                UsuariosActions.deleteUsuarioSuccess
            ),
            map(() => UsuariosActions.loadUsuarios({ page: 0, size: 10 }))
        )
    );
}
