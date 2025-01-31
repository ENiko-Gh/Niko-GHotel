import React, { useState, useEffect } from 'react';
import { Habitacion } from '../types/Habitacion';
import HabitacionForm from '../components/Forms/HabitacionForm';
import ListaHabitaciones from '../components/Lists/ListaHabitaciones';

const Habitaciones = () => {
    const [habitaciones, setHabitaciones] = useState<Habitacion[]>([]);
    const [precio, setPrecio] = useState(0);
    const [totales, setTotales] = useState({
        matrimonial: 10,
        doble: 15,
        suite: 10,
        individual: 15
    });
    const [ocupadas, setOcupadas] = useState({
        matrimonial: 3,
        doble: 8,
        suite: 5,
        individual: 10
    });

    // Cargar habitaciones desde localStorage
    useEffect(() => {
        const storedHabitaciones = JSON.parse(localStorage.getItem('habitaciones') || '[]');
        setHabitaciones(storedHabitaciones);
    }, []);

    const handlePrecioChange = (tipo: string) => {
        const precios: Record<string, number> = {
            matrimonial: 100,
            doble: 80,
            suite: 120,
            individual: 60,
        };
        setPrecio(precios[tipo] || 0);
    };

    const handleAgregarHabitacion = (tipo: string) => {
        const nuevaHabitacion: Habitacion = {
            tipo: tipo,
            precio: precio,
        };
        const updatedHabitaciones = [...habitaciones, nuevaHabitacion];
        setHabitaciones(updatedHabitaciones);
        localStorage.setItem('habitaciones', JSON.stringify(updatedHabitaciones));

        // Actualizar el total de habitaciones disponibles
        const nuevasOcupadas = { ...ocupadas };
        nuevasOcupadas[tipo] += 1;
        setOcupadas(nuevasOcupadas);
    };

    const handleDeclinarHabitacion = (tipo: string) => {
        const nuevasOcupadas = { ...ocupadas };
        nuevasOcupadas[tipo] -= 1;
        setOcupadas(nuevasOcupadas);
    };

    return (
        <div>
            <h2>Gestión de Habitaciones</h2>
            <HabitacionForm onPrecioChange={handlePrecioChange} onAgregarHabitacion={handleAgregarHabitacion} />
            <div>
                <h3>Habitaciones Disponibles</h3>
                {habitaciones.length === 0 ? (
                    <p>No hay habitaciones disponibles.</p>
                ) : (
                    <ListaHabitaciones habitaciones={habitaciones} totales={totales} ocupadas={ocupadas} onDeclinar={handleDeclinarHabitacion} />
                )}
            </div>
            <div className="contenedores">
                <div className="contenedor-matrimonial">
                    <h4>Matrimonial ({totales.matrimonial - ocupadas.matrimonial})</h4>
                    <div className="galeria">
                        <Galeria tipo="matrimonial" />
                    </div>
                </div>
                <div className="contenedor-doble">
                    <h4>Doble ({totales.doble - ocupadas.doble})</h4>
                    <div className="galeria">
                        <Galeria tipo="doble" />
                    </div>
                </div>
                <div className="contenedor-suite">
                    <h4>Suite ({totales.suite - ocupadas.suite})</h4>
                    <div className="galeria">
                        <Galeria tipo="suite" />
                    </div>
                </div>
                <div className="contenedor-individual">
                    <h4>Habitaciones Individuales ({totales.individual - ocupadas.individual})</h4>
                    <div className="galeria">
                        <Galeria tipo="individual" />
                    </div>
                </div>
            </div>
        </div>
    );
};

// Componente Galería
const Galeria = ({ tipo }: { tipo: string }) => {
    // Mapeo de imágenes para cada tipo de habitación
    const imagenesPorTipo: Record<string, string[]> = {
        matrimonial: ['Dob1.jpg', 'Dob2.jpg', 'Dob3.jpg', 'Dob4.jpg', 'Dob5.jpg'],
        doble: ['Dob1.jpg', 'Dob2.jpg', 'Dob3.jpg', 'Dob4.jpg', 'Dob5.jpg'],
        suite: ['Dob1.jpg', 'Dob2.jpg', 'Dob3.jpg', 'Dob4.jpg', 'Dob5.jpg'],
        individual: ['Dob1.jpg', 'Dob2.jpg', 'Dob3.jpg', 'Dob4.jpg', 'Dob5.jpg']
    };

    const fotos = imagenesPorTipo[tipo] || [];

    return (
        <div className="cinta-galeria">
            {fotos.map((src, index) => (
                <div key={index} className="foto">
                    {/* Ruta de la imagen desde la carpeta 'public' */}
                    <img src={`/${src}`} alt={`Foto ${index + 1}`} />
                    <p>Foto {index + 1}</p>
                </div>
            ))}
        </div>
    );
};

export default Habitaciones;
