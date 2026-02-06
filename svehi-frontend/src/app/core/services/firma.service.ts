import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class FirmaService {

    constructor() { }

    async seleccionarCertificado(): Promise<string> {
        // Mock implementation
        return new Promise((resolve, reject) => {
            // In a real scenario, this would call MiniApplet/AutoFirma
            const nif = prompt('SIMULACIÓN @FIRMA: Introduce el NIF del certificado:', '12345678Z');
            if (nif) {
                resolve(nif);
            } else {
                reject('Selección cancelada');
            }
        });
    }
}
