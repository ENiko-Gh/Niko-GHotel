// src/pages/Habitaciones.tsx
import React, { useState, useEffect } from 'react';
import { Habitacion } from '../types/Habitacion';
import HabitacionForm from '../components/Forms/HabitacionForm';
import ListaHabitaciones from '../components/Lists/ListaHabitaciones';

const Habitaciones = () => {
    const [habitaciones, setHabitaciones] = useState<Habitacion[]>([]);
    const [precio, setPrecio] = useState(0);

    // Cargar habitaciones desde localStorage
    useEffect(() => {
        const storedHabitaciones = JSON.parse(localStorage.getItem('habitaciones') || '[]');
        setHabitaciones(storedHabitaciones);
    }, []);

    const handlePrecioChange = (tipo: string) => {
        const precios = {
            matrimonial: 100,
            doble: 80,
            suite: 120,
            individual: 60,
        };
        setPrecio(precios[tipo] || 0);
    };

    return (
        <div>
            <h2>Gestión de Habitaciones</h2>
            <HabitacionForm onPrecioChange={handlePrecioChange} />
            <div>
                <h3>Habitaciones Disponibles</h3>
                {habitaciones.length === 0 ? (
                    <p>No hay habitaciones disponibles.</p>
                ) : (
                    <ListaHabitaciones habitaciones={habitaciones} />
                )}
            </div>
            <div className="contenedores">
                <div className="contenedor-matrimonial">
                    <h4>Matrimonial</h4>
                    <div className="galeria">
                        <Galeria tipo="matrimonial" />
                    </div>
                </div>
                <div className="contenedor-doble">
                    <h4>Doble</h4>
                    <div className="galeria">
                        <Galeria tipo="doble" />
                    </div>
                </div>
                <div className="contenedor-suite">
                    <h4>Suite</h4>
                    <div className="galeria">
                        <Galeria tipo="suite" />
                    </div>
                </div>
                <div className="contenedor-individual">
                    <h4>Individual</h4>
                    <div className="galeria">
                        <Galeria tipo="individual" />
                    </div>
                </div>
            </div>
        </div>
    );
};

const Galeria = ({ tipo }: { tipo: string }) => {
    const fotos = [
        { src: `/images/${tipo}-1.jpg`, descripcion: 'Foto 1' },
        { src: `/images/${tipo}-2.jpg`, descripcion: 'Foto 2' },
        { src: `/images/${tipo}-3.jpg`, descripcion: 'Foto 3' },
        { src: `/images/${tipo}-4.jpg`, descripcion: 'Foto 4' },
        { src: `/images/${tipo}-5.jpg`, descripcion: 'Foto 5' },
    ];

    return (
        <div className="cinta-galeria">
            {fotos.map((foto, index) => (
                <div key={index} className="foto">
                    <img src={foto.src} alt={foto.descripcion} />
                    <p>{foto.descripcion}</p>
                </div>
            ))}
        </div>
    );
};

export default Habitaciones;
