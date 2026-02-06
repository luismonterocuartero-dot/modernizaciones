import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Perfil } from '../domain/usuario.model';
import { Marca } from '../domain/vehiculo.model';
import { Compania, Concepto, Modelo, Operadora, Parametro } from '../domain/maestros.model';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class MaestrosHttpService {
    private readonly apiUrl = `${environment.apiUrl}/v1/maestros`;

    constructor(private http: HttpClient) { }

    getPerfiles(): Observable<Perfil[]> {
        return this.http.get<Perfil[]>(`${this.apiUrl}/perfiles`);
    }

    getMarcas(): Observable<Marca[]> {
        return this.http.get<Marca[]>(`${this.apiUrl}/marcas`);
    }

    getCompanias(): Observable<Compania[]> { return this.http.get<Compania[]>(`${this.apiUrl}/companias`); }
    createCompania(d: Compania): Observable<Compania> { return this.http.post<Compania>(`${this.apiUrl}/companias`, d); }
    updateCompania(id: number, d: Compania): Observable<Compania> { return this.http.put<Compania>(`${this.apiUrl}/companias/${id}`, d); }
    deleteCompania(id: number): Observable<void> { return this.http.delete<void>(`${this.apiUrl}/companias/${id}`); }

    getConceptos(): Observable<Concepto[]> { return this.http.get<Concepto[]>(`${this.apiUrl}/conceptos`); }
    createConcepto(d: Concepto): Observable<Concepto> { return this.http.post<Concepto>(`${this.apiUrl}/conceptos`, d); }

    getModelos(): Observable<Modelo[]> { return this.http.get<Modelo[]>(`${this.apiUrl}/modelos`); }
    createModelo(d: Modelo): Observable<Modelo> { return this.http.post<Modelo>(`${this.apiUrl}/modelos`, d); }

    getOperadoras(): Observable<Operadora[]> { return this.http.get<Operadora[]>(`${this.apiUrl}/operadoras`); }
    createOperadora(d: Operadora): Observable<Operadora> { return this.http.post<Operadora>(`${this.apiUrl}/operadoras`, d); }

    getParametros(): Observable<Parametro[]> { return this.http.get<Parametro[]>(`${this.apiUrl}/parametros`); }
    createParametro(d: Parametro): Observable<Parametro> { return this.http.post<Parametro>(`${this.apiUrl}/parametros`, d); }
}
