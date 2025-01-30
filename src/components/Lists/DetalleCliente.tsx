import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const DetalleCliente: React.FC = () => {
    const { id } = useParams();
    const [cliente, setCliente] = useState<any>({});

    useEffect(() => {
        // Lógica para obtener el cliente por ID
        setCliente({ id, nombre: 'Juan Pérez', email: 'juan@ejemplo.com' });
    }, [id]);

    return (
        <div>
            <h1>Detalle del Cliente</h1>
            <p>Nombre: {cliente.nombre}</p>
            <p>Email: {cliente.email}</p>
        </div>
    );
};

export default DetalleCliente;
