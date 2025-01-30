import React, { useEffect, useState } from 'react';
import { Cliente } from '../../types/Cliente';
import { Link } from 'react-router-dom';

const ListaClientes = () => {
    const [clientes, setClientes] = useState<Cliente[]>([]);

    useEffect(() => {
        // Cargar los clientes desde localStorage
        const storedClientes = JSON.parse(localStorage.getItem('clientes') || '[]');
        setClientes(storedClientes);
    }, []);

    const handleDelete = (id: string) => {
        const confirmDelete = window.confirm('¿Estás seguro de que quieres eliminar este cliente?');
        if (confirmDelete) {
            const storedClientes = JSON.parse(localStorage.getItem('clientes') || '[]');
            const updatedClientes = storedClientes.filter((cliente: Cliente) => cliente.id !== id);
            localStorage.setItem('clientes', JSON.stringify(updatedClientes));
            setClientes(updatedClientes);
        }
    };

    return (
        <div style={{ marginTop: '30px', textAlign: 'center' }}>
            <h3>Listado de Clientes</h3>
            {clientes.length === 0 ? (
                <p>No hay clientes registrados.</p>
            ) : (
                <table style={{
                    width: '80%',
                    margin: '20px auto',
                    borderCollapse: 'collapse',
                    textAlign: 'center'
                }}>
                    <thead>
                        <tr>
                            <th>ID (Cédula)</th>
                            <th>Nombre Completo</th>
                            <th>Email</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientes.map((cliente) => (
                            <tr key={cliente.id} style={{ borderBottom: '1px solid #ddd' }}>
                                <td>{cliente.id}</td>
                                <td>{cliente.nombreCompleto}</td>
                                <td>{cliente.email}</td>
                                <td>
                                    <Link to={`/clientes/editar/${cliente.id}`}>
                                        <button>Editar</button>
                                    </Link>
                                    <button onClick={() => handleDelete(cliente.id)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ListaClientes;
