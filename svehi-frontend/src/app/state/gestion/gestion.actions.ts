import { createAction, props } from '@ngrx/store';
import { Compania, Concepto, Marca, Modelo, Operadora, Parametro, Perfil, Permiso, Usuario } from '../../domain/gestion.model';

// --- COMPANIAS ---
export const loadCompanias = createAction('[Gestion] Load Companias');
export const loadCompaniasSuccess = createAction('[Gestion] Load Companias Success', props<{ companias: Compania[] }>());
export const addCompania = createAction('[Gestion] Add Compania', props<{ compania: Compania }>());

// --- CONCEPTOS ---
export const loadConceptos = createAction('[Gestion] Load Conceptos');
export const loadConceptosSuccess = createAction('[Gestion] Load Conceptos Success', props<{ concepts: Concepto[] }>());
export const addConcepto = createAction('[Gestion] Add Concepto', props<{ concepto: Concepto }>());

// --- MARCAS ---
export const loadMarcas = createAction('[Gestion] Load Marcas');
export const loadMarcasSuccess = createAction('[Gestion] Load Marcas Success', props<{ marcas: Marca[] }>());
export const selectMarca = createAction('[Gestion] Select Marca', props<{ id: number }>());
export const addMarca = createAction('[Gestion] Add Marca', props<{ marca: Marca }>());

// --- MODELOS ---
export const loadModelos = createAction('[Gestion] Load Modelos', props<{ marcaId: number }>());
export const loadModelosSuccess = createAction('[Gestion] Load Modelos Success', props<{ modelos: Modelo[] }>());
export const addModelo = createAction('[Gestion] Add Modelo', props<{ modelo: Modelo }>());

// --- OPERADORAS ---
export const loadOperadoras = createAction('[Gestion] Load Operadoras');
export const loadOperadorasSuccess = createAction('[Gestion] Load Operadoras Success', props<{ operadoras: Operadora[] }>());
export const addOperadora = createAction('[Gestion] Add Operadora', props<{ operadora: Operadora }>());

// --- PARAMETROS ---
export const loadParametros = createAction('[Gestion] Load Parametros');
export const loadParametrosSuccess = createAction('[Gestion] Load Parametros Success', props<{ parametros: Parametro[] }>());
export const addParametro = createAction('[Gestion] Add Parametro', props<{ parametro: Parametro }>());

// --- PERFILES ---
export const loadPerfiles = createAction('[Gestion] Load Perfiles');
export const loadPerfilesSuccess = createAction('[Gestion] Load Perfiles Success', props<{ perfiles: Perfil[] }>());
export const addPerfil = createAction('[Gestion] Add Perfil', props<{ perfil: Perfil }>());

// --- PERMISOS ---
export const loadPermisos = createAction('[Gestion] Load Permisos');
export const loadPermisosSuccess = createAction('[Gestion] Load Permisos Success', props<{ permisos: Permiso[] }>());

export const loadFailure = createAction('[Gestion] Load Failure', props<{ error: any }>());
