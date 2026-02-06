import { createReducer, on } from '@ngrx/store';
import { AuthState } from '../../domain/auth.model';
import * as AuthActions from './auth.actions';

export const initialState: AuthState = {
    user: null,
    loading: false,
    error: null,
    isAuthenticated: false
};

export const authReducer = createReducer(
    initialState,
    on(AuthActions.login, (state) => ({
        ...state,
        loading: true,
        error: null
    })),
    on(AuthActions.loginSuccess, (state, { user }) => ({
        ...state,
        user,
        loading: false,
        isAuthenticated: true,
        error: null
    })),
    on(AuthActions.loginFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
        isAuthenticated: false
    })),
    on(AuthActions.logout, () => initialState)
);
