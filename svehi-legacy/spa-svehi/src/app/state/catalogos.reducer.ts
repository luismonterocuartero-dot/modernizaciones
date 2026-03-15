import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Marca } from '../domain/catalogos.models';
import * as CatalogosActions from './catalogos.actions';

export interface CatalogosState extends EntityState<Marca> {
    loading: boolean;
    error: any;
}

export const adapter: EntityAdapter<Marca> = createEntityAdapter<Marca>();

export const initialState: CatalogosState = adapter.getInitialState({
    loading: false,
    error: null
});

export const catalogosReducer = createReducer(
    initialState,
    on(CatalogosActions.loadMarcas, state => ({ ...state, loading: true })),
    on(CatalogosActions.loadMarcasSuccess, (state, { marcas }) => adapter.setAll(marcas, { ...state, loading: false })),
    on(CatalogosActions.loadMarcasError, (state, { error }) => ({ ...state, error, loading: false }))
);
