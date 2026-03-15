import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Marca, Modelo } from '../domain/catalogos.models';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CatalogosService {
    private http = inject(HttpClient);
    // Nota: El orquestador GPT 5.4 ordena el uso de UtilsService para la URL base.
    // Aquí se implementa la lógica base de infraestructura.

    private baseUrl = 'http://localhost:8081/ms-svehi-gestion/api/v1'; // Placeholder hasta tener UtilsService real

    getMarcas(): Observable<Marca[]> {
        return this.http.get<Marca[]>(`${this.baseUrl}/marcas`);
    }

    getModelos(marcaId: number): Observable<Modelo[]> {
        return this.http.get<Modelo[]>(`${this.baseUrl}/modelos?marcaId=${marcaId}`);
    }
}
