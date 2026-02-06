import { createAction, props } from '@ngrx/store';
import { Compania, Concepto, Modelo, Operadora, Parametro, Perfil } from '../../domain/maestros.model';
import { Marca } from '../../domain/vehiculo.model';

export const loadCompanias = createAction('[Maestros] Load Companias');
export const loadCompaniasSuccess = createAction('[Maestros] Load Companias Success', props<{ companias: Compania[] }>());
export const loadCompaniasFailure = createAction('[Maestros] Load Companias Failure', props<{ error: any }>());

export const loadConceptos = createAction('[Maestros] Load Conceptos');
export const loadConceptosSuccess = createAction('[Maestros] Load Conceptos Success', props<{ conceptos: Concepto[] }>());
export const loadConceptosFailure = createAction('[Maestros] Load Conceptos Failure', props<{ error: any }>());

export const loadModelos = createAction('[Maestros] Load Modelos');
export const loadModelosSuccess = createAction('[Maestros] Load Modelos Success', props<{ modelos: Modelo[] }>());
export const loadModelosFailure = createAction('[Maestros] Load Modelos Failure', props<{ error: any }>());

export const loadOperadoras = createAction('[Maestros] Load Operadoras');
export const loadOperadorasSuccess = createAction('[Maestros] Load Operadoras Success', props<{ operadoras: Operadora[] }>());
export const loadOperadorasFailure = createAction('[Maestros] Load Operadoras Failure', props<{ error: any }>());

export const loadParametros = createAction('[Maestros] Load Parametros');
export const loadParametrosSuccess = createAction('[Maestros] Load Parametros Success', props<{ parametros: Parametro[] }>());
export const loadParametrosFailure = createAction('[Maestros] Load Parametros Failure', props<{ error: any }>());

export const loadPerfiles = createAction('[Maestros] Load Perfiles');
export const loadPerfilesSuccess = createAction('[Maestros] Load Perfiles Success', props<{ perfiles: Perfil[] }>());
export const loadPerfilesFailure = createAction('[Maestros] Load Perfiles Failure', props<{ error: any }>());

export const loadMarcas = createAction('[Maestros] Load Marcas');
export const loadMarcasSuccess = createAction('[Maestros] Load Marcas Success', props<{ marcas: Marca[] }>());
export const loadMarcasFailure = createAction('[Maestros] Load Marcas Failure', props<{ error: any }>());
