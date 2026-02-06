export interface ServicioTaller {
    id: number;
    tallerId?: number;
    servicioAdscrito?: string;
    centroDirectivo?: string;
    nombreContacto?: string;
    telefonoContacto?: string;
    emailContacto?: string;
    fechaInicio: string;
    fechaFin?: string;
    motivoFin?: string;
    numeroExpediente?: string;
    tiposVehiculos?: string[]; // Multi-select
    conceptos?: string[]; // Multi-select
    licitacion?: boolean;
    observaciones?: string;
    tipoVehiculo?: string; // Legacy field, keeping for compatibility if needed
}

export interface Taller {
    id: number;
    nombre: string;
    cif?: string;
    direccion?: string;
    telefono?: string;
    email?: string; // New field
    servicios?: ServicioTaller[];
}
