import React from 'react';
import ListaReservas from '../components/Lists/ListaReservas';
import ReservaForm from '../components/Forms/ReservaForm';

const Reservas = () => {
    return (
        <div>
            <h2>Reservas</h2>
            <ReservaForm />
            <ListaReservas />
        </div>
    );
};

export default Reservas;
