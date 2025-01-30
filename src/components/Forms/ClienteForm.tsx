import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Cliente } from '../../types/Cliente';

const ClienteForm = ({ clienteEditar }: { clienteEditar?: Cliente }) => {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [id, setId] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (clienteEditar) {
            setNombre(clienteEditar.nombreCompleto);
            setEmail(clienteEditar.email);
            setId(clienteEditar.id); // Cargar el ID si estamos editando
        }
    }, [clienteEditar]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validación de formulario
        if (!id || !/^\d+$/.test(id)) { // Validar que el ID sea numérico (solo cédulas)
            alert('Por favor, ingresa un ID válido (solo números).');
            return;
        }
        if (!nombre || !/\S+@\S+\.\S+/.test(email)) {
            alert('Por favor, completa todos los campos con un correo válido.');
            return;
        }

        const newCliente = {
            id, // Usar el ID ingresado por el usuario
            nombreCompleto: nombre,
            email,
        };

        // Obtener clientes de localStorage
        const storedClientes = JSON.parse(localStorage.getItem('clientes') || '[]');

        if (clienteEditar) {
            // Editar cliente existente
            const updatedClientes = storedClientes.map((cliente: Cliente) =>
                cliente.id === newCliente.id ? newCliente : cliente
            );
            localStorage.setItem('clientes', JSON.stringify(updatedClientes));
        } else {
            // Agregar nuevo cliente
            storedClientes.push(newCliente);
            localStorage.setItem('clientes', JSON.stringify(storedClientes));
        }

        // Limpiar formulario y redirigir
        setNombre('');
        setEmail('');
        setId('');
        navigate('/clientes');
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
            <h3>{clienteEditar ? 'Editar Cliente' : 'Registrar Nuevo Cliente'}</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        ID (Cédula):
                        <input
                            type="text"
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                            required
                            disabled={clienteEditar ? true : false} // Deshabilitar si estamos editando
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Nombre Completo:
                        <input
                            type="text"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Email:
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div>
                    <button type="submit">{clienteEditar ? 'Actualizar Cliente' : 'Ingresar Nuevo Cliente'}</button>
                </div>
            </form>
        </div>
    );
};

export default ClienteForm;
