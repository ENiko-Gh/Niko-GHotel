// types.ts

export interface Habitacion {
    id: string;
    numero: string;
    tipo: string;
    precioPorNoche: number;
}

export interface Reserva {
    id: string;
    cliente: string;
    habitacion: string;
    fecha: string;
}
