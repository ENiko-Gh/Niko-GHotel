import React, { useState, useEffect } from 'react';
import { Habitacion } from '../../types/Habitacion';

interface HabitacionFormProps {
    habitacionEdit?: Habitacion;
    onSave: () => void;
}

const HabitacionForm: React.FC<HabitacionFormProps> = ({ habitacionEdit, onSave }) => {
    // Definir tipos de habitación y precios
    const tiposDeHabitacion = [
        { tipo: 'Individual', precio: 50 },
        { tipo: 'Doble', precio: 80 },
        { tipo: 'Suite', precio: 150 },
        { tipo: 'Matrimonial', precio: 100 } // Añadido el tipo matrimonial
    ];

    const [tipo, setTipo] = useState(habitacionEdit?.tipo || '');
    const [precio, setPrecio] = useState(habitacionEdit?.precio || 0);

    // Actualizar precio según tipo de habitación
    useEffect(() => {
        if (tipo) {
            const habitacionSeleccionada = tiposDeHabitacion.find(h => h.tipo === tipo);
            if (habitacionSeleccionada) {
                setPrecio(habitacionSeleccionada.precio);
            }
        }
    }, [tipo]);  // Dependencia en tipo, para actualizar el precio

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validación del formulario
        if (!tipo || precio <= 0) {
            alert('Por favor, completa todos los campos correctamente.');
            return;
        }

        const newHabitacion: Habitacion = {
            id: habitacionEdit ? habitacionEdit.id : Date.now().toString(),
            tipo,
            precio,
        };

        // Obtener las habitaciones de localStorage
        const storedHabitaciones = JSON.parse(localStorage.getItem('habitaciones') || '[]');

        if (habitacionEdit) {
            // Actualizar habitación
            const updatedHabitaciones = storedHabitaciones.map((habitacion: Habitacion) =>
                habitacion.id === habitacionEdit.id ? newHabitacion : habitacion
            );
            localStorage.setItem('habitaciones', JSON.stringify(updatedHabitaciones));
        } else {
            // Agregar nueva habitación
            storedHabitaciones.push(newHabitacion);
            localStorage.setItem('habitaciones', JSON.stringify(storedHabitaciones));
        }

        onSave(); // Llamar al callback para actualizar la lista
        setTipo(''); // Resetear el tipo
        setPrecio(0); // Resetear el precio
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
            <h3>{habitacionEdit ? 'Editar habitación' : 'Agregar nueva habitación'}</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Tipo de habitación:
                        <select
                            value={tipo}
                            onChange={(e) => {
                                console.log("Tipo seleccionado:", e.target.value); // Depuración
                                setTipo(e.target.value);  // Actualizar tipo de habitación
                            }}
                            required
                        >
                            <option value="">Selecciona un tipo</option>
                            {tiposDeHabitacion.map((habitacion) => (
                                <option key={habitacion.tipo} value={habitacion.tipo}>
                                    {habitacion.tipo}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
                <div>
                    <label>
                        Precio por noche:
                        <input
                            type="number"
                            value={precio}
                            onChange={(e) => setPrecio(Number(e.target.value))}
                            required
                            readOnly  // El precio no debe ser editable manualmente
                        />
                    </label>
                </div>
                <div>
                    <button type="submit">
                        {habitacionEdit ? 'Actualizar habitación' : 'Agregar habitación'}
                    </button>
                </div>
            </form>

            <div>
                <h3>Galería de habitaciones</h3>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    {tiposDeHabitacion.map((habitacion) => (
                        <div key={habitacion.tipo} style={{ width: '200px', textAlign: 'center' }}>
                            <img
                                src={`https://via.placeholder.com/200?text=${habitacion.tipo}`}
                                alt={habitacion.tipo}
                                style={{ width: '100%' }}
                            />
                            <p>{habitacion.tipo}</p>
                            <p>${habitacion.precio} por noche</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HabitacionForm;
