import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Taller, ServicioTaller } from '../domain/talleres.model';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class TalleresHttpService {
    private readonly apiUrl = `${environment.apiUrl}/v1/talleres`;

    constructor(private http: HttpClient) { }

    getTalleres(): Observable<Taller[]> {
        return this.http.get<Taller[]>(this.apiUrl);
    }

    createTaller(taller: Taller): Observable<Taller> {
        return this.http.post<Taller>(this.apiUrl, taller);
    }

    getServicios(tallerId: number): Observable<ServicioTaller[]> {
        return this.http.get<ServicioTaller[]>(`${this.apiUrl}/${tallerId}/servicios`);
    }

    addServicio(tallerId: number, servicio: ServicioTaller): Observable<ServicioTaller> {
        return this.http.post<ServicioTaller>(`${this.apiUrl}/${tallerId}/servicios`, servicio);
    }
}
