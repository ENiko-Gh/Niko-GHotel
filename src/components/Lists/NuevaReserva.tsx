// src/components/Lists/NuevaReserva.tsx

import React, { useState } from 'react';

const NuevaReserva = () => {
    const [nombreCliente, setNombreCliente] = useState('');
    const [fechaReserva, setFechaReserva] = useState('');
    const [habitacion, setHabitacion] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`Reserva creada para ${nombreCliente} en la habitación ${habitacion} para la fecha ${fechaReserva}`);
    };

    return (
        <div>
            <h2>Nueva Reserva</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre del Cliente:</label>
                    <input
                        type="text"
                        value={nombreCliente}
                        onChange={(e) => setNombreCliente(e.target.value)}
                    />
                </div>
                <div>
                    <label>Fecha de Reserva:</label>
                    <input
                        type="date"
                        value={fechaReserva}
                        onChange={(e) => setFechaReserva(e.target.value)}
                    />
                </div>
                <div>
                    <label>Habitación:</label>
                    <select value={habitacion} onChange={(e) => setHabitacion(e.target.value)}>
                        <option value="101">Habitación 101</option>
                        <option value="102">Habitación 102</option>
                        <option value="103">Habitación 103</option>
                    </select>
                </div>
                <button type="submit">Crear Reserva</button>
            </form>
        </div>
    );
};

export default NuevaReserva;
