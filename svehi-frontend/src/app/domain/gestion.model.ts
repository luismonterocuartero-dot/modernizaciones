
export interface Compania {
    id?: number;
    nombre: string;
    telefono: string;
    contacto?: string;
    direccion?: string;
    activo: boolean;
}

export interface Concepto {
    id?: number;
    nombre: string;
    precioUnitario: number;
    kilometros: number;
    dias: number;
}

export interface Marca {
    id?: number;
    nombre: string;
    activo: boolean;
}

export interface Modelo {
    id?: number;
    marcaId: number;
    marcaNombre?: string;
    nombre: string;
    tipoVehiculo: 'TURISMO' | 'FURNOGETA' | 'TODOTERRENO' | 'MOTOCICLETA' | 'CAMION';
    activo: boolean;
}

export interface Operadora {
    id?: number;
    nombre: string;
    telefono: string;
    activo: boolean;
}

export interface Parametro {
    id?: number;
    nombre: string;
    tipoParametro: string;
    activo: boolean;
}

// Re-export specific interfaces from usuario.model to avoid duplication but keep module self-contained
export type { Usuario, Perfil, Permiso } from '../domain/usuario.model';

