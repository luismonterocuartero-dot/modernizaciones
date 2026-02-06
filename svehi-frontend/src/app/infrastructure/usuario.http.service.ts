import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario, UsuarioPage } from '../domain/usuario.model';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UsuarioHttpService {
    private readonly apiUrl = `${environment.apiUrl}/v1/usuarios`;

    constructor(private http: HttpClient) { }

    getUsuarios(page: number, size: number, nif?: string, nombre?: string): Observable<UsuarioPage> {
        let params = new HttpParams()
            .set('page', page.toString())
            .set('size', size.toString());

        if (nif) params = params.set('nif', nif);
        if (nombre) params = params.set('nombre', nombre);

        return this.http.get<UsuarioPage>(this.apiUrl, { params });
    }

    getUsuarioById(id: number): Observable<Usuario> {
        return this.http.get<Usuario>(`${this.apiUrl}/${id}`);
    }

    createUsuario(usuario: Partial<Usuario>): Observable<Usuario> {
        return this.http.post<Usuario>(this.apiUrl, usuario);
    }

    updateUsuario(id: number, usuario: Partial<Usuario>): Observable<Usuario> {
        return this.http.put<Usuario>(`${this.apiUrl}/${id}`, usuario);
    }

    deleteUsuario(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
