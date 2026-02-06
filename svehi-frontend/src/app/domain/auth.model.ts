import { Usuario } from './usuario.model';

export interface AuthState {
    user: Usuario | null;
    loading: boolean;
    error: any;
    isAuthenticated: boolean;
}

export interface LoginRequest {
    username: string;
    password: string;
}
