import { createReducer, on } from '@ngrx/store';
import * as UsuariosActions from './usuarios.actions';
import { Usuario } from '../../domain/usuario.model';

export interface UsuariosState {
    usuarios: Usuario[];
    totalElements: number;
    loading: boolean;
    error: any;
}

export const initialState: UsuariosState = {
    usuarios: [],
    totalElements: 0,
    loading: false,
    error: null
};

export const usuariosReducer = createReducer(
    initialState,
    on(UsuariosActions.loadUsuarios, state => ({ ...state, loading: true, error: null })),
    on(UsuariosActions.loadUsuariosSuccess, (state, { response }) => ({
        ...state,
        loading: false,
        usuarios: response.content,
        totalElements: response.totalElements
    })),
    on(UsuariosActions.loadUsuariosFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    }))
);
