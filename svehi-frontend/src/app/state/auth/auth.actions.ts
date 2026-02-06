import { createAction, props } from '@ngrx/store';
import { LoginRequest } from '../../domain/auth.model';
import { Usuario } from '../../domain/usuario.model';

export const login = createAction(
    '[Auth] Login',
    props<{ credentials: LoginRequest }>()
);

export const loginWithCertificate = createAction(
    '[Auth] Login With Certificate',
    props<{ nif: string }>()
);

export const loginSuccess = createAction(
    '[Auth] Login Success',
    props<{ user: Usuario }>()
);

export const loginFailure = createAction(
    '[Auth] Login Failure',
    props<{ error: any }>()
);

export const logout = createAction('[Auth] Logout');
