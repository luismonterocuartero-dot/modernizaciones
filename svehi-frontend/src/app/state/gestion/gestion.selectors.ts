import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GestionState } from './gestion.reducer';

export const selectGestionState = createFeatureSelector<GestionState>('gestion');

export const selectCompanias = createSelector(selectGestionState, (state) => state.companias);
export const selectConceptos = createSelector(selectGestionState, (state) => state.conceptos);
export const selectMarcas = createSelector(selectGestionState, (state) => state.marcas);
export const selectSelectedMarcaId = createSelector(selectGestionState, (state) => state.selectedMarcaId);
export const selectModelos = createSelector(selectGestionState, (state) => state.modelos);
export const selectOperadoras = createSelector(selectGestionState, (state) => state.operadoras);
export const selectParametros = createSelector(selectGestionState, (state) => state.parametros);
export const selectPerfiles = createSelector(selectGestionState, (state) => state.perfiles);
export const selectPermisos = createSelector(selectGestionState, (state) => state.permisos);

export const selectLoading = createSelector(selectGestionState, (state) => state.loading);
export const selectError = createSelector(selectGestionState, (state) => state.error);
