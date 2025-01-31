import React, { useEffect, useState } from 'react';
import { Reserva } from '../../types/Reserva';
import { Cliente } from '../../types/Cliente';
import { Habitacion } from '../../types/Habitacion';

const ListaReservas = () => {
    const [reservas, setReservas] = useState<Reserva[]>([]);
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [habitaciones, setHabitaciones] = useState<Habitacion[]>([]);

    useEffect(() => {
        const storedClientes = JSON.parse(localStorage.getItem('clientes') || '[]');
        const storedHabitaciones = JSON.parse(localStorage.getItem('habitaciones') || '[]');
        const storedReservas = JSON.parse(localStorage.getItem('reservas') || '[]');

        if (storedClientes.length === 0) {
            const defaultClientes = [
                { id: '1', nombreCompleto: 'Juan Pérez', correo: 'juan@example.com' },
                { id: '2', nombreCompleto: 'Ana García', correo: 'ana@example.com' },
                { id: '3', nombreCompleto: 'Carlos Ramírez', correo: 'carlos@example.com' },
                { id: '4', nombreCompleto: 'Lucía Fernández', correo: 'lucia@example.com' }
            ];
            localStorage.setItem('clientes', JSON.stringify(defaultClientes));
            setClientes(defaultClientes);
        } else {
            setClientes(storedClientes);
        }

        setHabitaciones(storedHabitaciones);
        setReservas(storedReservas);
    }, []);

    return (
        <div style={{ marginTop: '30px', textAlign: 'center', padding: '20px' }}>
            <h3 style={{ color: '#f5b921', fontSize: '22px', marginBottom: '15px' }}>📋 Listado de Reservas</h3>

            {reservas.length === 0 ? (
                <p style={{ fontSize: '18px', color: '#fff' }}>No hay reservas registradas.</p>
            ) : (
                <table style={{
                    width: '90%',
                    margin: '20px auto',
                    borderCollapse: 'collapse',
                    textAlign: 'center',
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '10px',
                    overflow: 'hidden'
                }}>
                    <thead>
                        <tr style={{ backgroundColor: '#333', color: '#f5b921' }}>
                            <th style={tableHeaderStyle}>Cliente</th>
                            <th style={tableHeaderStyle}>Habitación</th>
                            <th style={tableHeaderStyle}>Fecha Inicio</th>
                            <th style={tableHeaderStyle}>Fecha Fin</th>
                            <th style={tableHeaderStyle}>Total de Días Hospedado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservas.map((reserva) => {
                            const cliente = clientes.find(cliente => cliente.id === reserva.clienteId);
                            const habitacion = habitaciones.find(habitacion => habitacion.id === reserva.habitacionId);
                            return (
                                <tr key={reserva.id} style={{ borderBottom: '1px solid #555', color: 'white' }}>
                                    <td style={tableCellStyle}>
                                        {cliente?.nombreCompleto || 'Desconocido'}<br />
                                        <span>{cliente?.correo}</span>
                                    </td>
                                    <td style={tableCellStyle}>
                                        {habitacion?.tipo || 'N/A'}<br />
                                        ${habitacion?.precio || '0'} por noche
                                    </td>
                                    <td style={tableCellStyle}>{new Date(reserva.fechaInicio).toLocaleDateString()}</td>
                                    <td style={tableCellStyle}>{new Date(reserva.fechaFin).toLocaleDateString()}</td>
                                    <td style={tableCellStyle}>{reserva.diasHospedaje} días</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}
        </div>
    );
};

const tableHeaderStyle: React.CSSProperties = {
    padding: '12px',
    fontSize: '18px',
    borderBottom: '2px solid #f5b921'
};

const tableCellStyle: React.CSSProperties = {
    padding: '10px',
    fontSize: '16px',
    backgroundColor: 'rgba(255, 255, 255, 0.05)'
};

export default ListaReservas;
