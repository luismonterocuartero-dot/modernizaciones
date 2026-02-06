import { createAction, props } from '@ngrx/store';
import { Usuario, UsuarioPage } from '../../domain/usuario.model';

export const loadUsuarios = createAction(
    '[Usuarios Page] Load Usuarios',
    props<{ page: number; size: number; nif?: string; nombre?: string }>()
);

export const loadUsuariosSuccess = createAction(
    '[Usuarios API] Load Usuarios Success',
    props<{ response: UsuarioPage }>()
);

export const loadUsuariosFailure = createAction(
    '[Usuarios API] Load Usuarios Failure',
    props<{ error: any }>()
);

export const createUsuario = createAction(
    '[Usuarios] Create Usuario',
    props<{ usuario: Partial<Usuario> }>()
);

export const createUsuarioSuccess = createAction(
    '[Usuarios] Create Usuario Success',
    props<{ usuario: Usuario }>()
);

export const updateUsuario = createAction(
    '[Usuarios] Update Usuario',
    props<{ id: number, usuario: Partial<Usuario> }>()
);

export const updateUsuarioSuccess = createAction(
    '[Usuarios] Update Usuario Success',
    props<{ usuario: Usuario }>()
);

export const deleteUsuario = createAction(
    '[Usuarios] Delete Usuario',
    props<{ id: number }>()
);

export const deleteUsuarioSuccess = createAction(
    '[Usuarios] Delete Usuario Success',
    props<{ id: number }>()
);
