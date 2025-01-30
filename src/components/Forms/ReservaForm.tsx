import React, { useState, useEffect } from 'react';
import { Cliente } from '../../types/Cliente';
import { Habitacion } from '../../types/Habitacion';

const ReservaForm = () => {
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [habitaciones, setHabitaciones] = useState<Habitacion[]>([]);
    const [selectedCliente, setSelectedCliente] = useState<string>('');
    const [selectedHabitaciones, setSelectedHabitaciones] = useState<string[]>([]);
    const [fechaInicio, setFechaInicio] = useState<string>('');
    const [fechaFin, setFechaFin] = useState<string>('');

    useEffect(() => {
        // Cargar clientes
        const storedClientes = localStorage.getItem('clientes');
        setClientes(storedClientes ? JSON.parse(storedClientes) : []);

        // Cargar habitaciones
        const storedHabitaciones = localStorage.getItem('habitaciones');
        setHabitaciones(storedHabitaciones ? JSON.parse(storedHabitaciones) : []);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validación de fechas
        if (new Date(fechaInicio) >= new Date(fechaFin)) {
            alert('⚠️ La fecha de inicio debe ser anterior a la fecha de fin.');
            return;
        }

        // Cargar reservas existentes
        const reservas = JSON.parse(localStorage.getItem('reservas') || '[]');

        // Validar disponibilidad de habitaciones
        for (let reserva of reservas) {
            if (selectedHabitaciones.some(h => reserva.habitaciones.includes(h))) {
                if (
                    (new Date(fechaInicio) >= new Date(reserva.fechaInicio) && new Date(fechaInicio) <= new Date(reserva.fechaFin)) ||
                    (new Date(fechaFin) >= new Date(reserva.fechaInicio) && new Date(fechaFin) <= new Date(reserva.fechaFin))
                ) {
                    alert(`⚠️ Una o más habitaciones ya están reservadas del ${reserva.fechaInicio} al ${reserva.fechaFin}.`);
                    return;
                }
            }
        }

        // Crear nueva reserva
        const newReserva = {
            id: Date.now().toString(),
            clienteId: selectedCliente,
            habitaciones: selectedHabitaciones,
            fechaInicio,
            fechaFin,
        };

        // Guardar reserva en localStorage
        const updatedReservas = [...reservas, newReserva];
        localStorage.setItem('reservas', JSON.stringify(updatedReservas));

        alert('✅ Reserva registrada con éxito.');

        // Limpiar formulario
        setSelectedCliente('');
        setSelectedHabitaciones([]);
        setFechaInicio('');
        setFechaFin('');
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
            <h3>📝 Agregar Nueva Reserva</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Cliente:</label>
                    <select value={selectedCliente} onChange={(e) => setSelectedCliente(e.target.value)} required>
                        <option value="">Selecciona un cliente</option>
                        {clientes.length === 0 ? (
                            <option disabled>Cargando clientes...</option>
                        ) : (
                            clientes.map(cliente => (
                                <option key={cliente.id} value={cliente.id}>{cliente.nombreCompleto}</option>
                            ))
                        )}
                    </select>
                </div>

                <div>
                    <label>Habitaciones:</label>
                    <select multiple value={selectedHabitaciones} onChange={(e) => setSelectedHabitaciones([...e.target.selectedOptions].map(option => option.value))} required>
                        {habitaciones.length === 0 ? (
                            <option disabled>Cargando habitaciones...</option>
                        ) : (
                            habitaciones
                                .filter(habitacion => !habitacion.ocupada)
                                .map(habitacion => (
                                    <option key={habitacion.id} value={habitacion.id}>
                                        {habitacion.tipo}
                                    </option>
                                ))
                        )}
                    </select>
                </div>

                <div>
                    <label>Fecha Inicio:</label>
                    <input type="date" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} required />
                </div>

                <div>
                    <label>Fecha Fin:</label>
                    <input type="date" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} required />
                </div>

                <button type="submit">Registrar Reserva</button>
            </form>
        </div>
    );
};

export default ReservaForm;
