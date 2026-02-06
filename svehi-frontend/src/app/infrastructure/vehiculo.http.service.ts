import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PageVehiculo, Vehiculo, Matricula, Equipamiento, Mantenimiento, Cesion, Repostaje, Siniestro, Poliza, Itv, Infraccion } from '../domain/vehiculo.model';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class VehiculoHttpService {
    private readonly apiUrl = `${environment.apiUrl}/v1/vehiculos`;

    constructor(private http: HttpClient) { }

    getVehiculos(page: number = 0, size: number = 10, matricula?: string, marcaId?: number): Observable<PageVehiculo> {
        let params = new HttpParams()
            .set('page', page.toString())
            .set('size', size.toString());

        if (matricula) params = params.set('matricula', matricula);
        if (marcaId) params = params.set('marcaId', marcaId.toString());

        return this.http.get<PageVehiculo>(this.apiUrl, { params });
    }

    createVehiculo(vehiculo: Partial<Vehiculo>): Observable<Vehiculo> {
        return this.http.post<Vehiculo>(this.apiUrl, vehiculo);
    }

    getVehiculo(id: number): Observable<Vehiculo> {
        return this.http.get<Vehiculo>(`${this.apiUrl}/${id}`);
    }

    getMatriculas(id: number): Observable<Matricula[]> {
        return this.http.get<Matricula[]>(`${this.apiUrl}/${id}/matriculas`);
    }

    addMatricula(id: number, matricula: Matricula): Observable<void> {
        return this.http.post<void>(`${this.apiUrl}/${id}/matriculas`, matricula);
    }

    getEquipamiento(id: number): Observable<Equipamiento[]> {
        return this.http.get<Equipamiento[]>(`${this.apiUrl}/${id}/equipamiento`);
    }

    addEquipamiento(id: number, equipamiento: Equipamiento): Observable<void> {
        return this.http.post<void>(`${this.apiUrl}/${id}/equipamiento`, equipamiento);
    }

    getMantenimientos(id: number): Observable<Mantenimiento[]> {
        return this.http.get<Mantenimiento[]>(`${this.apiUrl}/${id}/mantenimientos`);
    }

    addMantenimiento(id: number, mantenimiento: Mantenimiento): Observable<void> {
        return this.http.post<void>(`${this.apiUrl}/${id}/mantenimientos`, mantenimiento);
    }

    getCesiones(id: number): Observable<Cesion[]> {
        return this.http.get<Cesion[]>(`${this.apiUrl}/${id}/cesiones`);
    }

    addCesion(id: number, cesion: Cesion): Observable<void> {
        return this.http.post<void>(`${this.apiUrl}/${id}/cesiones`, cesion);
    }

    getRepostajes(id: number): Observable<Repostaje[]> {
        return this.http.get<Repostaje[]>(`${this.apiUrl}/${id}/repostajes`);
    }

    addRepostaje(id: number, repostaje: Repostaje): Observable<void> {
        return this.http.post<void>(`${this.apiUrl}/${id}/repostajes`, repostaje);
    }

    getSiniestros(id: number): Observable<Siniestro[]> {
        return this.http.get<Siniestro[]>(`${this.apiUrl}/${id}/siniestros`);
    }

    addSiniestro(id: number, siniestro: Siniestro): Observable<void> {
        return this.http.post<void>(`${this.apiUrl}/${id}/siniestros`, siniestro);
    }

    getPolizas(id: number): Observable<Poliza[]> {
        return this.http.get<Poliza[]>(`${this.apiUrl}/${id}/polizas`);
    }

    addPoliza(id: number, poliza: Poliza): Observable<void> {
        return this.http.post<void>(`${this.apiUrl}/${id}/polizas`, poliza);
    }

    getItvs(id: number): Observable<Itv[]> {
        return this.http.get<Itv[]>(`${this.apiUrl}/${id}/itvs`);
    }

    addItv(id: number, itv: Itv): Observable<void> {
        return this.http.post<void>(`${this.apiUrl}/${id}/itvs`, itv);
    }

    getInfracciones(id: number): Observable<Infraccion[]> {
        return this.http.get<Infraccion[]>(`${this.apiUrl}/${id}/infracciones`);
    }

    addInfraccion(id: number, infraccion: Infraccion): Observable<void> {
        return this.http.post<void>(`${this.apiUrl}/${id}/infracciones`, infraccion);
    }
}
