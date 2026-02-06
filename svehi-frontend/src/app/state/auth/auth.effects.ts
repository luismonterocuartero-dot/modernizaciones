import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthHttpService } from '../../infrastructure/auth.http.service';
import * as AuthActions from './auth.actions';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
    private actions$ = inject(Actions);
    private authService = inject(AuthHttpService);
    private router = inject(Router);

    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.login),
            mergeMap(({ credentials }) =>
                this.authService.login(credentials).pipe(
                    map((user) => AuthActions.loginSuccess({ user })),
                    catchError((error) => of(AuthActions.loginFailure({ error })))
                )
            )
        )
    );

    loginWithCertificate$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.loginWithCertificate),
            mergeMap(({ nif }) =>
                this.authService.loginWithCertificate(nif).pipe(
                    map((user) => AuthActions.loginSuccess({ user })),
                    catchError((error) => of(AuthActions.loginFailure({ error })))
                )
            )
        )
    );

    loginSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(AuthActions.loginSuccess),
                tap(() => this.router.navigate(['/usuarios']))
            ),
        { dispatch: false }
    );

    logout$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(AuthActions.logout),
                tap(() => this.router.navigate(['/login']))
            ),
        { dispatch: false }
    );
}
