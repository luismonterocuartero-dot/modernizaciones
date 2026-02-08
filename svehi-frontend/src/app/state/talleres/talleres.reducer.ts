import { createReducer, on } from '@ngrx/store';
import * as TalleresActions from './talleres.actions';
import { Taller, ServicioTaller } from '../../domain/talleres.model';

export interface TalleresState {
    talleres: Taller[];
    selectedTallerId: number | null;
    servicios: ServicioTaller[];
    loading: boolean;
    error: any;
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
}

export const initialState: TalleresState = {
    talleres: [],
    selectedTallerId: null,
    servicios: [],
    loading: false,
    error: null,
    page: 0,
    size: 10,
    totalElements: 0,
    totalPages: 0
};

export const talleresReducer = createReducer(
    initialState,
    on(TalleresActions.loadTalleres, state => ({ ...state, loading: true })),
    on(TalleresActions.loadTalleresSuccess, (state, { talleres }) => ({
        ...state,
        loading: false,
        talleres: talleres, // Asumiendo que talleres viene ahora paginado, ajustaremos actions después si es necesario
        // Por ahora, si talleres es array plano, simularemos paginación o backend debe cambiar
    })),
    on(TalleresActions.loadTalleresFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(TalleresActions.selectTaller, (state, { id }) => ({ ...state, selectedTallerId: id })),

    on(TalleresActions.loadTallerServicios, state => ({ ...state, loading: true })),
    on(TalleresActions.loadTallerServiciosSuccess, (state, { services }) => ({ ...state, loading: false, servicios: services })),
    on(TalleresActions.loadTallerServiciosFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(TalleresActions.createTallerSuccess, (state, { taller }) => ({ ...state, talleres: [...state.talleres, taller] }))
);
