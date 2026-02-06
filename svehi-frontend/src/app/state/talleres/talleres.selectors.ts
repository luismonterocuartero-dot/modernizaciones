import { createSelector, createFeatureSelector } from '@ngrx/store';
import { TalleresState } from './talleres.reducer';

export const selectTalleresState = createFeatureSelector<TalleresState>('talleres');

export const selectAllTalleres = createSelector(selectTalleresState, state => state.talleres);
export const selectSelectedTallerId = createSelector(selectTalleresState, state => state.selectedTallerId);
export const selectTallerServicios = createSelector(selectTalleresState, state => state.servicios);

export const selectSelectedTaller = createSelector(
    selectAllTalleres,
    selectSelectedTallerId,
    (talleres, id) => talleres.find(t => t.id === id) || null
);
