import React, { useState, useEffect } from 'react';
import { Cliente } from '../../types/Cliente';
import { Habitacion } from '../../types/Habitacion';
import { getLocalStorageItem, setLocalStorageItem } from '../../utils/localStorage';

const ReservaForm = () => {
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [habitaciones, setHabitaciones] = useState<Habitacion[]>([]);
    const [selectedCliente, setSelectedCliente] = useState<string>('');
    const [selectedHabitacion, setSelectedHabitacion] = useState<string>('');
    const [fechaInicio, setFechaInicio] = useState<string>('');
    const [fechaFin, setFechaFin] = useState<string>('');
    const [precioTotal, setPrecioTotal] = useState<number>(0);
    const [diasHospedaje, setDiasHospedaje] = useState<number>(0);

    useEffect(() => {
        setClientes(getLocalStorageItem('clientes', []));
        const habitacionesGuardadas = getLocalStorageItem('habitaciones', []);

        // Asegurar que haya habitaciones de todos los tipos
        const tiposHabitacion = ["Matrimonial", "Doble", "Suite", "Individual"];

        if (habitacionesGuardadas.length === 0) {
            const habitacionesIniciales = tiposHabitacion.map((tipo, index) => ({
                id: (index + 1).toString(),
                tipo,
                precio: (50 + index * 20) // Precios ficticios por tipo
            }));
            setLocalStorageItem('habitaciones', habitacionesIniciales);
            setHabitaciones(habitacionesIniciales);
        } else {
            setHabitaciones(habitacionesGuardadas);
        }
    }, []);

    const validarFechas = () => {
        if (!fechaInicio || !fechaFin) return false;
        return new Date(fechaInicio) < new Date(fechaFin);
    };

    const calcularPrecioTotal = () => {
        if (!validarFechas() || !selectedHabitacion) return;

        const fechaInicioDate = new Date(fechaInicio);
        const fechaFinDate = new Date(fechaFin);
        const diferencia = (fechaFinDate.getTime() - fechaInicioDate.getTime()) / (1000 * 3600 * 24);

        const habitacionSeleccionada = habitaciones.find(h => h.id === selectedHabitacion);
        if (habitacionSeleccionada) {
            setDiasHospedaje(diferencia); // Actualizamos los días de hospedaje
            setPrecioTotal(diferencia * habitacionSeleccionada.precio); // Calculamos el precio total
        }
    };

    useEffect(() => {
        calcularPrecioTotal(); // Llamamos la función cuando se cambian las fechas o la habitación seleccionada
    }, [fechaInicio, fechaFin, selectedHabitacion]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedCliente || !selectedHabitacion || !fechaInicio || !fechaFin) {
            alert('⚠️ Todos los campos son obligatorios.');
            return;
        }

        if (!validarFechas()) {
            alert('⚠️ La fecha de inicio debe ser antes de la fecha de fin.');
            return;
        }

        const reservas = getLocalStorageItem('reservas', []);

        const habitacionReservada = reservas.some((reserva: any) =>
            reserva.habitacionId === selectedHabitacion &&
            ((new Date(fechaInicio) >= new Date(reserva.fechaInicio) && new Date(fechaInicio) <= new Date(reserva.fechaFin)) ||
                (new Date(fechaFin) >= new Date(reserva.fechaInicio) && new Date(fechaFin) <= new Date(reserva.fechaFin)))
        );

        if (habitacionReservada) {
            alert('⚠️ La habitación ya está reservada en las fechas seleccionadas.');
            return;
        }

        const newReserva = {
            id: Date.now().toString(),
            clienteId: selectedCliente,
            habitacionId: selectedHabitacion,
            fechaInicio,
            fechaFin,
            diasHospedaje,
            precioTotal
        };

        setLocalStorageItem('reservas', [...reservas, newReserva]);
        alert('✅ Reserva registrada con éxito.');

        setSelectedCliente('');
        setSelectedHabitacion('');
        setFechaInicio('');
        setFechaFin('');
        setPrecioTotal(0);
        setDiasHospedaje(0);
    };

    return (
        <div className="container">
            <h3>📝 Agregar Nueva Reserva</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Cliente:</label>
                    <select value={selectedCliente} onChange={(e) => setSelectedCliente(e.target.value)} required>
                        <option value="">Selecciona un cliente</option>
                        {clientes.map(cliente => (
                            <option key={cliente.id} value={cliente.id}>{cliente.nombreCompleto}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Habitación:</label>
                    <select value={selectedHabitacion} onChange={(e) => setSelectedHabitacion(e.target.value)} required>
                        <option value="">Selecciona una habitación</option>
                        {habitaciones.map(habitacion => (
                            <option key={habitacion.id} value={habitacion.id}>
                                {habitacion.tipo} - ${habitacion.precio} por noche
                            </option>
                        ))}
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
                <div>
                    <label>Total de días hospedados:</label>
                    <input type="number" value={diasHospedaje} disabled />
                </div>
                <div>
                    <label>Precio Total:</label>
                    <input type="number" value={precioTotal} disabled />
                </div>
                <button type="submit">Registrar Reserva</button>
            </form>
        </div>
    );
};

export default ReservaForm;
