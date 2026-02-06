import { createReducer, on } from '@ngrx/store';
import { Compania, Concepto, Marca, Modelo, Operadora, Parametro, Perfil, Permiso } from '../../domain/gestion.model';
import * as GestionActions from './gestion.actions';

export interface GestionState {
    companias: Compania[];
    conceptos: Concepto[];
    marcas: Marca[];
    selectedMarcaId: number | null;
    modelos: Modelo[];
    operadoras: Operadora[];
    parametros: Parametro[];
    perfiles: Perfil[];
    permisos: Permiso[];
    loading: boolean;
    error: any;
}

export const initialState: GestionState = {
    companias: [],
    conceptos: [],
    marcas: [],
    selectedMarcaId: null,
    modelos: [],
    operadoras: [],
    parametros: [],
    perfiles: [],
    permisos: [],
    loading: false,
    error: null
};

export const gestionReducer = createReducer(
    initialState,
    on(GestionActions.loadCompanias, GestionActions.loadConceptos, GestionActions.loadMarcas, GestionActions.loadOperadoras, GestionActions.loadParametros, GestionActions.loadPerfiles, GestionActions.loadPermisos, (state) => ({ ...state, loading: true })),
    on(GestionActions.loadFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(GestionActions.loadCompaniasSuccess, (state, { companias }) => ({ ...state, loading: false, companias })),
    on(GestionActions.loadConceptosSuccess, (state, { concepts }) => ({ ...state, loading: false, conceptos: concepts })),

    on(GestionActions.loadMarcasSuccess, (state, { marcas }) => ({ ...state, loading: false, marcas })),
    on(GestionActions.selectMarca, (state, { id }) => ({ ...state, selectedMarcaId: id, modelos: [] })), // Clear modelos on change

    on(GestionActions.loadModelos, (state) => ({ ...state, loading: true })),
    on(GestionActions.loadModelosSuccess, (state, { modelos }) => ({ ...state, loading: false, modelos })),

    on(GestionActions.loadOperadorasSuccess, (state, { operadoras }) => ({ ...state, loading: false, operadoras })),
    on(GestionActions.loadParametrosSuccess, (state, { parametros }) => ({ ...state, loading: false, parametros })),

    on(GestionActions.loadPerfilesSuccess, (state, { perfiles }) => ({ ...state, loading: false, perfiles })),
    on(GestionActions.loadPermisosSuccess, (state, { permisos }) => ({ ...state, loading: false, permisos }))
);
