export interface Marca {
    id?: number;
    nombre: string;
    activo: boolean;
}

export interface Modelo {
    id?: number;
    nombre: string;
    marcaId: number;
    cilindrada?: string;
    potencia?: string;
}
