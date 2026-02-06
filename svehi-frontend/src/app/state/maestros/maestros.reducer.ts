import { createReducer, on } from '@ngrx/store';
import * as MaestrosActions from './maestros.actions';
import { Compania, Concepto, Modelo, Operadora, Parametro, Perfil } from '../../domain/maestros.model';
import { Marca } from '../../domain/vehiculo.model';

export interface MaestrosState {
    companias: Compania[];
    conceptos: Concepto[];
    modelos: Modelo[];
    operadoras: Operadora[];
    parametros: Parametro[];
    perfiles: Perfil[];
    marcas: Marca[];
    loading: boolean;
    error: any;
}

export const initialState: MaestrosState = {
    companias: [],
    conceptos: [],
    modelos: [],
    operadoras: [],
    parametros: [],
    perfiles: [],
    marcas: [],
    loading: false,
    error: null
};

export const maestrosReducer = createReducer(
    initialState,
    on(MaestrosActions.loadCompanias, state => ({ ...state, loading: true })),
    on(MaestrosActions.loadCompaniasSuccess, (state, { companias }) => ({ ...state, loading: false, companias })),
    on(MaestrosActions.loadCompaniasFailure, (state, { error }) => ({ ...state, loading: false, error })),

    // Repeat for others implicitly or explicitly
    on(MaestrosActions.loadConceptosSuccess, (state, { conceptos }) => ({ ...state, conceptos })),
    on(MaestrosActions.loadModelosSuccess, (state, { modelos }) => ({ ...state, modelos })),
    on(MaestrosActions.loadOperadorasSuccess, (state, { operadoras }) => ({ ...state, operadoras })),
    on(MaestrosActions.loadParametrosSuccess, (state, { parametros }) => ({ ...state, parametros })),
    on(MaestrosActions.loadPerfilesSuccess, (state, { perfiles }) => ({ ...state, perfiles })),
    on(MaestrosActions.loadMarcasSuccess, (state, { marcas }) => ({ ...state, marcas }))
);
