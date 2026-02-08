import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { AuthHttpService } from './auth.http.service';
import { LoginRequest } from '../domain/auth.model';
import { Usuario } from '../domain/usuario.model';
import { environment } from '../../environments/environment';
import { provideHttpClient } from '@angular/common/http';

describe('AuthHttpService', () => {
    let service: AuthHttpService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                AuthHttpService,
                provideHttpClient(),
                provideHttpClientTesting()
            ]
        });
        service = TestBed.inject(AuthHttpService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should send a POST request to login', () => {
        const mockCredentials: LoginRequest = { username: 'testuser', password: 'password' };
        const mockUser: Usuario = { id: 1, nif: '12345678Z', nombre: 'Test User', email: 'test@test.com', activo: true, roles: [] };

        service.login(mockCredentials).subscribe(user => {
            expect(user).toEqual(mockUser);
        });

        const req = httpMock.expectOne(`${environment.apiUrl}/v1/auth/login`);
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual(mockCredentials);
        req.flush(mockUser);
    });

    it('should send a POST request to loginWithCertificate', () => {
        const nif = '12345678Z';
        const mockUser: Usuario = { id: 1, nif: '12345678Z', nombre: 'Test User', email: 'test@test.com', activo: true, roles: [] };

        service.loginWithCertificate(nif).subscribe(user => {
            expect(user).toEqual(mockUser);
        });

        const req = httpMock.expectOne(`${environment.apiUrl}/v1/auth/login-cert`);
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual({ nif });
        req.flush(mockUser);
    });
});
