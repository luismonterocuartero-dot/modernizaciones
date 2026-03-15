import { createAction, props } from '@ngrx/store';
import { Marca } from '../../domain/catalogos.models';

export const loadMarcas = createAction('[Catalogos] Load Marcas');
export const loadMarcasSuccess = createAction('[Catalogos] Load Marcas Success', props<{ marcas: Marca[] }>());
export const loadMarcasError = createAction('[Catalogos] Load Marcas Error', props<{ error: any }>());
