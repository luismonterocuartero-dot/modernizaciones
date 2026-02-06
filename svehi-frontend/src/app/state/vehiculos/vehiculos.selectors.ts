import { createFeatureSelector, createSelector } from '@ngrx/store';
import { VehiculosState } from './vehiculos.reducer';

export const selectVehiculosState = createFeatureSelector<VehiculosState>('vehiculos');

export const selectVehiculosList = createSelector(
    selectVehiculosState,
    (state) => state.list
);

export const selectVehiculosLoading = createSelector(
    selectVehiculosState,
    (state) => state.loading
);

export const selectVehiculosError = createSelector(
    selectVehiculosState,
    (state) => state.error
);

export const selectVehiculosTotal = createSelector(
    selectVehiculosState,

    (state) => state.totalElements
);

export const selectSelectedVehiculo = createSelector(selectVehiculosState, (state) => state.selectedVehiculo);
export const selectVehiculoMatriculas = createSelector(selectVehiculosState, (state) => state.matriculas);
export const selectVehiculoEquipamiento = createSelector(selectVehiculosState, (state) => state.equipamiento);
export const selectVehiculoMantenimientos = createSelector(selectVehiculosState, (state) => state.mantenimientos);
export const selectVehiculoCesiones = createSelector(selectVehiculosState, (state) => state.cesiones);
export const selectVehiculoRepostajes = createSelector(selectVehiculosState, (state) => state.repostajes);
export const selectVehiculoSiniestros = createSelector(selectVehiculosState, (state) => state.siniestros);
export const selectVehiculoPolizas = createSelector(selectVehiculosState, (state) => state.polizas);
export const selectVehiculoItvs = createSelector(selectVehiculosState, (state) => state.itvs);
export const selectVehiculoInfracciones = createSelector(selectVehiculosState, (state) => state.infracciones);
