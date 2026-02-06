import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Compania, Concepto, Marca, Modelo, Operadora, Parametro, Perfil, Permiso } from '../domain/gestion.model';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class GestionHttpService {
    private readonly apiUrl = `${environment.apiUrl}/v1/maestros`;

    constructor(private http: HttpClient) { }

    // --- COMPANIAS ---
    getCompanias(): Observable<Compania[]> {
        return this.http.get<Compania[]>(`${this.apiUrl}/companias`);
    }
    addCompania(compania: Compania): Observable<void> {
        return this.http.post<void>(`${this.apiUrl}/companias`, compania);
    }

    // --- CONCEPTOS ---
    getConceptos(): Observable<Concepto[]> {
        return this.http.get<Concepto[]>(`${this.apiUrl}/conceptos`);
    }
    addConcepto(concepto: Concepto): Observable<void> {
        return this.http.post<void>(`${this.apiUrl}/conceptos`, concepto);
    }

    // --- MARCAS ---
    getMarcas(): Observable<Marca[]> {
        return this.http.get<Marca[]>(`${this.apiUrl}/marcas`);
    }
    addMarca(marca: Marca): Observable<void> {
        return this.http.post<void>(`${this.apiUrl}/marcas`, marca);
    }

    // --- MODELOS ---
    getModelos(marcaId: number): Observable<Modelo[]> {
        return this.http.get<Modelo[]>(`${this.apiUrl}/marcas/${marcaId}/modelos`);
    }
    addModelo(modelo: Modelo): Observable<void> {
        return this.http.post<void>(`${this.apiUrl}/marcas/${modelo.marcaId}/modelos`, modelo);
    }

    // --- OPERADORAS ---
    getOperadoras(): Observable<Operadora[]> {
        return this.http.get<Operadora[]>(`${this.apiUrl}/operadoras`);
    }
    addOperadora(operadora: Operadora): Observable<void> {
        return this.http.post<void>(`${this.apiUrl}/operadoras`, operadora);
    }

    // --- PARAMETROS ---
    getParametros(): Observable<Parametro[]> {
        return this.http.get<Parametro[]>(`${this.apiUrl}/parametros`);
    }
    addParametro(parametro: Parametro): Observable<void> {
        return this.http.post<void>(`${this.apiUrl}/parametros`, parametro);
    }

    // --- PERFILES ---
    getPerfiles(): Observable<Perfil[]> {
        return this.http.get<Perfil[]>(`${this.apiUrl}/perfiles`);
    }
    addPerfil(perfil: Perfil): Observable<void> {
        return this.http.post<void>(`${this.apiUrl}/perfiles`, perfil);
    }

    // --- PERMISOS ---
    getPermisos(): Observable<Permiso[]> {
        // Permisos is under /usuarios/permisos, not /maestros/permisos
        return this.http.get<Permiso[]>(`${environment.apiUrl}/v1/usuarios/permisos`);
    }
}
