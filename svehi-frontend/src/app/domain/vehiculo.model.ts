export interface Vehiculo {
    id: number;
    matricula: string;
    marcaId: number;
    marcaNombre: string;
    modelo: string;
    tipoVehiculo: string;
    bastidor: string;
    fechaMatriculacion: string;
    activo: boolean;
}

export interface PageVehiculo {
    content: Vehiculo[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
}

export interface Marca {
    id: number;
    nombre: string;
    activo: boolean;
}


export interface Matricula {
    id: number;
    numero: string;
    fecha?: string;
    actual: boolean;
}

export interface Equipamiento {
    id: number;
    descripcion: string;
    fechaInstalacion?: string;
}

export interface Mantenimiento {
    id?: number;
    descripcion: string;
    fecha: string; // date YYYY-MM-DD
    importe: number;
    finalizado: boolean;
}

export interface Cesion {
    id?: number;
    fechaInicio: string;
    fechaFin?: string;
    conductor: string;
    departamento: string;
}

export interface Repostaje {
    id?: number;
    fecha: string;
    litros: number;
    importe: number;
    kilometros: number;
}

export interface Siniestro {
    id?: number;
    fecha: string;
    descripcion: string;
    importe: number;
    culpabilidad: boolean;
}

export interface Poliza {
    id?: number;
    compania: string;
    numero: string;
    fechaInicio: string;
    fechaFin: string;
    importe: number;
}

export interface Itv {
    id?: number;
    fecha: string;
    resultado: 'FAVORABLE' | 'DESFAVORABLE' | 'NEGATIVA';
    fechaProxima: string;
    estacion: string;
}

export interface Infraccion {
    id?: number;
    fecha: string;
    descripcion: string;
    importe: number;
    puntos: number;
    estado: string;
}
