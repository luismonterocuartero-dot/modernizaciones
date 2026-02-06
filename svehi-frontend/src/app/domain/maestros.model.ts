export interface Compania {
    id?: number;
    nombre: string;
    contacto?: string;
    telefono?: string;
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

export interface Modelo {
    id?: number;
    nombre: string;
    marcaId: number;
    marcaNombre: string;
    potencia?: string;
    cilindrada?: string;
    tipoVehiculo?: string;
    infoExtraTipoVehiculo?: string;
    alimentacion?: string;
    infoExtraTipoAlimentacion?: string;
    activo: boolean;
}

export interface Operadora {
    id?: number;
    nombre: string;
    contacto?: string;
    telefono?: string;
    direccion?: string;
    activo: boolean;
}

export interface Parametro {
    id?: number;
    nombre: string;
    centroDirectivo?: string;
    tipoParametro?: string;
    infoExtra?: string;
    datosExtra: boolean;
    activo: boolean;
}

export interface Perfil {
    id?: number;
    nombre: string;
    activo: boolean;
    porDefecto?: boolean;
}
