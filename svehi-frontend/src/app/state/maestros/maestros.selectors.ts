import { createSelector, createFeatureSelector } from '@ngrx/store';
import { MaestrosState } from './maestros.reducer';

export const selectMaestrosState = createFeatureSelector<MaestrosState>('maestros');

export const selectCompanias = createSelector(selectMaestrosState, state => state.companias);
export const selectConceptos = createSelector(selectMaestrosState, state => state.conceptos);
export const selectModelos = createSelector(selectMaestrosState, state => state.modelos);
export const selectOperadoras = createSelector(selectMaestrosState, state => state.operadoras);
export const selectParametros = createSelector(selectMaestrosState, state => state.parametros);
export const selectPerfiles = createSelector(selectMaestrosState, state => state.perfiles);
export const selectMarcas = createSelector(selectMaestrosState, state => state.marcas);
