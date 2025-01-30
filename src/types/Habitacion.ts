// src/types/Habitacion.ts
export interface Habitacion {
    id: string;
    tipo: string;
    precio: number;
    ocupada?: boolean; // Indica si la habitación está ocupada o no
    nombre?: string; // Nombre del ocupante
}
