import React from 'react';
import ListaClientes from '../components/Lists/ListaClientes';
import ClienteForm from '../components/Forms/ClienteForm'; // Importar el formulario para agregar nuevos clientes
import { useParams } from 'react-router-dom';

const Clientes = () => {
    const { id } = useParams();

    // Si hay un id en la URL, significa que estamos editando un cliente
    const clienteEditar = id ? JSON.parse(localStorage.getItem('clientes') || '[]').find((cliente: { id: string }) => cliente.id === id) : undefined;

    return (
        <div>
            {id ? (
                <ClienteForm clienteEditar={clienteEditar} /> // Mostrar formulario de edición
            ) : (
                <div>
                    <h2>Clientes</h2>
                    <ClienteForm /> {/* Formulario para agregar nuevos clientes */}
                    <ListaClientes /> {/* Mostrar la lista de clientes */}
                </div>
            )}
        </div>
    );
};

export default Clientes;
