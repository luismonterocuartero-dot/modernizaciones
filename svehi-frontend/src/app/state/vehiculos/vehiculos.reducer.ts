import { createReducer, on } from '@ngrx/store';
import { Vehiculo, Matricula, Equipamiento, Mantenimiento, Cesion, Repostaje, Siniestro, Poliza, Itv, Infraccion } from '../../domain/vehiculo.model';
import * as VehiculosActions from './vehiculos.actions';

export interface VehiculosState {
    list: Vehiculo[];
    selectedVehiculo: Vehiculo | null;
    matriculas: Matricula[];
    equipamiento: Equipamiento[];
    mantenimientos: Mantenimiento[];
    cesiones: Cesion[];
    repostajes: Repostaje[];
    siniestros: Siniestro[];
    polizas: Poliza[];
    itvs: Itv[];
    infracciones: Infraccion[];
    loading: boolean;
    error: any;
    totalElements: number;
}

export const initialState: VehiculosState = {
    list: [],
    selectedVehiculo: null,
    matriculas: [],
    equipamiento: [],
    mantenimientos: [],
    cesiones: [],
    repostajes: [],
    siniestros: [],
    polizas: [],
    itvs: [],
    infracciones: [],
    loading: false,
    error: null,
    totalElements: 0
};

export const vehiculosReducer = createReducer(
    initialState,
    on(VehiculosActions.loadVehiculos, (state) => ({ ...state, loading: true })),
    on(VehiculosActions.loadVehiculosSuccess, (state, { pageVehiculo }) => ({
        ...state,
        list: pageVehiculo.content,
        totalElements: pageVehiculo.totalElements,
        loading: false,
        error: null
    })),
    on(VehiculosActions.loadVehiculosFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(VehiculosActions.loadVehiculoDetail, state => ({ ...state, loading: true })),
    on(VehiculosActions.loadVehiculoDetailSuccess, (state, { vehiculo }) => ({ ...state, loading: false, selectedVehiculo: vehiculo })),
    on(VehiculosActions.loadVehiculoDetailFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(VehiculosActions.loadMatriculasSuccess, (state, { matriculas }) => ({ ...state, matriculas })),
    on(VehiculosActions.loadEquipamientoSuccess, (state, { equipamiento }) => ({ ...state, equipamiento })),
    on(VehiculosActions.loadMantenimientosSuccess, (state, { mantenimientos }) => ({ ...state, mantenimientos })),

    on(VehiculosActions.loadCesionesSuccess, (state, { cesiones }) => ({ ...state, cesiones })),
    on(VehiculosActions.loadRepostajesSuccess, (state, { repostajes }) => ({ ...state, repostajes })),
    on(VehiculosActions.loadSiniestrosSuccess, (state, { siniestros }) => ({ ...state, siniestros })),
    on(VehiculosActions.loadPolizasSuccess, (state, { polizas }) => ({ ...state, polizas })),
    on(VehiculosActions.loadItvsSuccess, (state, { itvs }) => ({ ...state, itvs })),
    on(VehiculosActions.loadInfraccionesSuccess, (state, { infracciones }) => ({ ...state, infracciones }))
);
