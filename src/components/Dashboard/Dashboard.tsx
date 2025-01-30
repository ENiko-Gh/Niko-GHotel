import React from "react";

const Dashboard: React.FC = () => {
    return (
        <div className="p-6 bg-white shadow rounded">
            <h1 className="text-2xl font-bold text-gray-800">Bienvenido al Dashboard</h1>
            <p className="mt-4 text-gray-600">
                Aquí encontrarás una visión general del sistema de gestión del hotel.
            </p>
        </div>
    );
};

export default Dashboard;
