import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginRequest } from '../domain/auth.model';
import { Usuario } from '../domain/usuario.model';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthHttpService {
    private readonly apiUrl = `${environment.apiUrl}/v1/auth`;

    constructor(private http: HttpClient) { }

    login(credentials: LoginRequest): Observable<Usuario> {
        return this.http.post<Usuario>(`${this.apiUrl}/login`, credentials);
    }

    loginWithCertificate(nif: string): Observable<Usuario> {
        return this.http.post<Usuario>(`${this.apiUrl}/login-cert`, { nif });
    }
}
