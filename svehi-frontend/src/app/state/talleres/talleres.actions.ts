import { createAction, props } from '@ngrx/store';
import { Taller, ServicioTaller } from '../../domain/talleres.model';

export const loadTalleres = createAction('[Talleres] Load Talleres');
export const loadTalleresSuccess = createAction('[Talleres] Load Talleres Success', props<{ talleres: Taller[] }>());
export const loadTalleresFailure = createAction('[Talleres] Load Talleres Failure', props<{ error: any }>());

export const selectTaller = createAction('[Talleres] Select Taller', props<{ id: number }>());

export const loadTallerServicios = createAction('[Talleres] Load Taller Servicios', props<{ tallerId: number }>());
export const loadTallerServiciosSuccess = createAction('[Talleres] Load Taller Servicios Success', props<{ services: ServicioTaller[] }>());
export const loadTallerServiciosFailure = createAction('[Talleres] Load Taller Servicios Failure', props<{ error: any }>());

export const createTaller = createAction('[Talleres] Create Taller', props<{ taller: Taller }>());
export const createTallerSuccess = createAction('[Talleres] Create Taller Success', props<{ taller: Taller }>());
export const createTallerFailure = createAction('[Talleres] Create Taller Failure', props<{ error: any }>());
export const createTallerSuccessRedirect = createAction('[Talleres] Create Taller Success Redirect');

export const addServicio = createAction('[Talleres] Add Servicio', props<{ tallerId: number, servicio: ServicioTaller }>());
export const addServicioSuccess = createAction('[Talleres] Add Servicio Success');
export const addServicioFailure = createAction('[Talleres] Add Servicio Failure', props<{ error: any }>());
