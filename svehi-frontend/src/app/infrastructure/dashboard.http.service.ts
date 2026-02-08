import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DashboardIndicators } from '../domain/dashboard.model';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class DashboardHttpService {
    private readonly apiUrl = `${environment.apiUrl}/v1/dashboard`;

    constructor(private http: HttpClient) { }

    getIndicators(): Observable<DashboardIndicators> {
        return this.http.get<DashboardIndicators>(`${this.apiUrl}/indicators`);
    }
}
