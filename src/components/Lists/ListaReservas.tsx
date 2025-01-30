import React, { useEffect, useState } from 'react';
import { Reserva } from '../../types/Reserva';
import { Cliente } from '../../types/Cliente';
import { Habitacion } from '../../types/Habitacion';

const ListaReservas = () => {
    const [reservas, setReservas] = useState<Reserva[]>([]);
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [habitaciones, setHabitaciones] = useState<Habitacion[]>([]);

    useEffect(() => {
        setReservas(JSON.parse(localStorage.getItem('reservas') || '[]'));
        setClientes(JSON.parse(localStorage.getItem('clientes') || '[]'));
        setHabitaciones(JSON.parse(localStorage.getItem('habitaciones') || '[]'));
    }, []);

    return (
        <div style={{ marginTop: '30px', textAlign: 'center' }}>
            <h3>📋 Listado de Reservas</h3>
            {reservas.length === 0 ? (
                <p>No hay reservas registradas.</p>
            ) : (
                <table style={{ width: '100%', margin: '20px auto', borderCollapse: 'collapse', textAlign: 'center', border: '1px solid #ddd' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f2f2f2' }}>
                            <th>Cliente</th>
                            <th>Habitaciones</th>
                            <th>Fecha Inicio</th>
                            <th>Fecha Fin</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservas.map((reserva) => (
                            <tr key={reserva.id} style={{ borderBottom: '1px solid #ddd' }}>
                                <td>{clientes.find(cliente => cliente.id === reserva.clienteId)?.nombreCompleto || 'Desconocido'}</td>
                                <td>{reserva.habitaciones.map(h => habitaciones.find(habitacion => habitacion.id === h)?.tipo || 'N/A').join(', ')}</td>
                                <td>{new Date(reserva.fechaInicio).toLocaleDateString()}</td>
                                <td>{new Date(reserva.fechaFin).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ListaReservas;
