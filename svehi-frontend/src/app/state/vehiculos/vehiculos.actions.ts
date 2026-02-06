import { createAction, props } from '@ngrx/store';
import { PageVehiculo, Vehiculo, Matricula, Equipamiento, Mantenimiento, Cesion, Repostaje, Siniestro, Poliza, Itv, Infraccion } from '../../domain/vehiculo.model';

export const loadVehiculos = createAction(
    '[Vehiculos] Load Vehiculos',
    props<{ page: number, size: number, matricula?: string, marcaId?: number }>()
);

export const loadVehiculosSuccess = createAction(
    '[Vehiculos] Load Vehiculos Success',
    props<{ pageVehiculo: PageVehiculo }>()
);

export const loadVehiculosFailure = createAction(
    '[Vehiculos] Load Vehiculos Failure',
    props<{ error: any }>()
);

export const loadVehiculoDetail = createAction('[Vehiculos] Load Detail', props<{ id: number }>());
export const loadVehiculoDetailSuccess = createAction('[Vehiculos] Load Detail Success', props<{ vehiculo: Vehiculo }>());
export const loadVehiculoDetailFailure = createAction('[Vehiculos] Load Detail Failure', props<{ error: any }>());

export const loadMatriculas = createAction('[Vehiculos] Load Matriculas', props<{ id: number }>());
export const loadMatriculasSuccess = createAction('[Vehiculos] Load Matriculas Success', props<{ matriculas: Matricula[] }>());
export const addMatricula = createAction('[Vehiculos] Add Matricula', props<{ id: number, matricula: Matricula }>());

export const loadEquipamiento = createAction('[Vehiculos] Load Equipamiento', props<{ id: number }>());
export const loadEquipamientoSuccess = createAction('[Vehiculos] Load Equipamiento Success', props<{ equipamiento: Equipamiento[] }>());
export const addEquipamiento = createAction('[Vehiculos] Add Equipamiento', props<{ id: number, equipamiento: Equipamiento }>());

export const loadMantenimientos = createAction('[Vehiculos] Load Mantenimientos', props<{ id: number }>());
export const loadMantenimientosSuccess = createAction('[Vehiculos] Load Mantenimientos Success', props<{ mantenimientos: Mantenimiento[] }>());
export const addMantenimiento = createAction('[Vehiculos] Add Mantenimiento', props<{ id: number, mantenimiento: Mantenimiento }>());

export const loadCesiones = createAction('[Vehiculos] Load Cesiones', props<{ id: number }>());
export const loadCesionesSuccess = createAction('[Vehiculos] Load Cesiones Success', props<{ cesiones: Cesion[] }>());
export const addCesion = createAction('[Vehiculos] Add Cesion', props<{ id: number, cesion: Cesion }>());

export const loadRepostajes = createAction('[Vehiculos] Load Repostajes', props<{ id: number }>());
export const loadRepostajesSuccess = createAction('[Vehiculos] Load Repostajes Success', props<{ repostajes: Repostaje[] }>());
export const addRepostaje = createAction('[Vehiculos] Add Repostaje', props<{ id: number, repostaje: Repostaje }>());

export const loadSiniestros = createAction('[Vehiculos] Load Siniestros', props<{ id: number }>());
export const loadSiniestrosSuccess = createAction('[Vehiculos] Load Siniestros Success', props<{ siniestros: Siniestro[] }>());
export const addSiniestro = createAction('[Vehiculos] Add Siniestro', props<{ id: number, siniestro: Siniestro }>());

export const loadPolizas = createAction('[Vehiculos] Load Polizas', props<{ id: number }>());
export const loadPolizasSuccess = createAction('[Vehiculos] Load Polizas Success', props<{ polizas: Poliza[] }>());
export const addPoliza = createAction('[Vehiculos] Add Poliza', props<{ id: number, poliza: Poliza }>());

export const loadItvs = createAction('[Vehiculos] Load Itvs', props<{ id: number }>());
export const loadItvsSuccess = createAction('[Vehiculos] Load Itvs Success', props<{ itvs: Itv[] }>());
export const addItv = createAction('[Vehiculos] Add Itv', props<{ id: number, itv: Itv }>());

export const loadInfracciones = createAction('[Vehiculos] Load Infracciones', props<{ id: number }>());
export const loadInfraccionesSuccess = createAction('[Vehiculos] Load Infracciones Success', props<{ infracciones: Infraccion[] }>());
export const addInfraccion = createAction('[Vehiculos] Add Infraccion', props<{ id: number, infraccion: Infraccion }>());
