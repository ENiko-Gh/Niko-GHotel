import React, { useState, useEffect } from 'react';
import { Habitacion } from '../../types/Habitacion';
import { getLocalStorageItem, setLocalStorageItem } from '../../utils/localStorage';

const tiposDeHabitacion = [
    { tipo: 'Individual', cantidadTotal: 10, ocupadas: 5, precio: 50 },
    { tipo: 'Doble', cantidadTotal: 15, ocupadas: 10, precio: 80 },
    { tipo: 'Suite', cantidadTotal: 15, ocupadas: 10, precio: 150 },
    { tipo: 'Matrimonial', cantidadTotal: 5, ocupadas: 3, precio: 100 }
];

const ListaHabitaciones = () => {
    const [habitaciones, setHabitaciones] = useState<Habitacion[]>([]);
    const [nuevoTipo, setNuevoTipo] = useState('');
    const [nuevoPrecio, setNuevoPrecio] = useState<number>(0);
    const [imagenesVisibles, setImagenesVisibles] = useState<{ [key: string]: number }>({
        Matrimonial: 0,
        Suite: 0,
        Doble: 0,
        Individual: 0,
    });

    // Obtener habitaciones de LocalStorage o inicializar con los valores predeterminados
    useEffect(() => {
        const habitacionesGuardadas = getLocalStorageItem<Habitacion[]>('habitaciones', []);
        if (habitacionesGuardadas.length === 0) {
            const habitacionesIniciales = tiposDeHabitacion.map(habitacion => ({
                tipo: habitacion.tipo,
                cantidadTotal: habitacion.cantidadTotal,
                ocupadas: habitacion.ocupadas,
                disponibles: habitacion.cantidadTotal - habitacion.ocupadas,
            }));
            setHabitaciones(habitacionesIniciales);
            setLocalStorageItem('habitaciones', habitacionesIniciales);
        } else {
            setHabitaciones(habitacionesGuardadas);
        }
    }, []);

    const actualizarHabitaciones = (nuevasHabitaciones: Habitacion[]) => {
        setHabitaciones(nuevasHabitaciones);
        setLocalStorageItem('habitaciones', nuevasHabitaciones);
    };

    // Agregar una nueva habitación
    const agregarHabitacion = () => {
        if (!nuevoTipo) return alert('Selecciona un tipo de habitación.');

        const habitacionesActualizadas = habitaciones.map(habitacion => {
            if (habitacion.tipo === nuevoTipo && habitacion.disponibles > 0) {
                return {
                    ...habitacion,
                    ocupadas: habitacion.ocupadas + 1,
                    disponibles: habitacion.disponibles - 1
                };
            }
            return habitacion;
        });

        actualizarHabitaciones(habitacionesActualizadas);
        setNuevoTipo('');
        setNuevoPrecio(0);
    };

    // Declinar (desocupar) una habitación
    const declinarHabitacion = (tipo: string) => {
        const habitacionesActualizadas = habitaciones.map(habitacion => {
            if (habitacion.tipo === tipo && habitacion.ocupadas > 0) {
                return {
                    ...habitacion,
                    ocupadas: habitacion.ocupadas - 1,
                    disponibles: habitacion.disponibles + 1
                };
            }
            return habitacion;
        });

        actualizarHabitaciones(habitacionesActualizadas);
    };

    // Manejar cambio de tipo de habitación
    const manejarCambioTipo = (tipo: string) => {
        setNuevoTipo(tipo);
        const habitacionSeleccionada = tiposDeHabitacion.find(h => h.tipo === tipo);
        setNuevoPrecio(habitacionSeleccionada ? habitacionSeleccionada.precio : 0);
    };

    // Manejadores para navegar entre imágenes
    const cambiarImagen = (tipo: string, direccion: 'adelante' | 'atras') => {
        setImagenesVisibles(prevState => {
            const imagenesActuales = prevState[tipo];
            let nuevoIndice = direccion === 'adelante' ? imagenesActuales + 1 : imagenesActuales - 1;

            if (nuevoIndice < 0) nuevoIndice = 0;
            if (nuevoIndice > 2) nuevoIndice = 2; // 3 imágenes visibles

            return { ...prevState, [tipo]: nuevoIndice };
        });
    };

    return (
        <div>
            {/* Sección Lista de Habitaciones */}
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <h3>Lista de Habitaciones</h3>
                <table style={{ width: '80%', margin: '0 auto', borderCollapse: 'collapse', textAlign: 'center' }}>
                    <thead>
                        <tr>
                            <th>Tipo de habitación</th>
                            <th>Total</th>
                            <th>Ocupadas</th>
                            <th>Disponibles</th>
                        </tr>
                    </thead>
                    <tbody>
                        {habitaciones.map((habitacion, index) => (
                            <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
                                <td>{habitacion.tipo}</td>
                                <td>{habitacion.cantidadTotal}</td>
                                <td>{habitacion.ocupadas}</td>
                                <td>{habitacion.disponibles}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Sección Gestión de Habitaciones */}
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <h3>Gestión de Habitaciones</h3>
                <div>
                    <label>
                        Tipo de habitación:
                        <select value={nuevoTipo} onChange={(e) => manejarCambioTipo(e.target.value)}>
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
                        <input type="number" value={nuevoPrecio} readOnly />
                    </label>
                </div>
                <div>
                    <button onClick={agregarHabitacion}>Agregar habitación</button>
                    <button onClick={() => declinarHabitacion(nuevoTipo)}>Declinar habitación</button>
                </div>
            </div>

            {/* Sección Contenedores con galería de imágenes */}
            <div style={{ display: 'flex', justifyContent: 'space-around', flexDirection: 'column', marginTop: '20px' }}>
                {tiposDeHabitacion.map((habitacion, index) => (
                    <div key={index} style={{ width: '80%', textAlign: 'center', marginBottom: '40px' }}>
                        <h4>{habitacion.tipo}</h4>
                        <div style={{ position: 'relative' }}>
                            <div style={{ display: 'flex', overflow: 'hidden', height: '200px' }}>
                                {/* Cinta con imágenes */}
                                <div style={{ display: 'flex', transition: 'transform 1s ease' }}>
                                    {[...Array(5)].map((_, idx) => (
                                        <img
                                            key={idx}
                                            src={`https://via.placeholder.com/150?text=Imagen+${idx + 1}`}
                                            alt={`Imagen ${idx + 1}`}
                                            style={{
                                                flex: '0 0 auto',
                                                width: '100%',
                                                height: 'auto',
                                                marginRight: '10px',
                                                display: idx >= imagenesVisibles[habitacion.tipo] && idx < imagenesVisibles[habitacion.tipo] + 3 ? 'block' : 'none',
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                            <button onClick={() => cambiarImagen(habitacion.tipo, 'atras')}>&lt; Atrás</button>
                            <button onClick={() => cambiarImagen(habitacion.tipo, 'adelante')}>Adelante &gt;</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListaHabitaciones;
