export interface Usuario {
    id: number;
    nif: string;
    nombre: string;
    apellido1: string;
    apellido2?: string;
    email?: string;
    activo: boolean;
    perfilId: number;
    perfil?: Perfil;
    servicioAdscrito?: string;
    ultimoAcceso?: string; // ISO date string
}

export interface Perfil {
    id?: number;
    nombre: string;
    activo: boolean;
}

export interface UsuarioPage {
    content: Usuario[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
}

export interface Permiso {
    id: number;
    nombre: string;
    objeto: string;
    tipoPermiso: 'VISUALIZACION' | 'EDICION';
}
