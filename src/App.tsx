import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home";
import ListaHabitaciones from "./components/Lists/ListaHabitaciones";
import ListaReservas from "./components/Lists/ListaReservas";
import Clientes from "./pages/Clientes"; // Página de gestionar clientes
import ReservaForm from "./components/Forms/ReservaForm"; // Página para agregar reservas
import Reservas from "./pages/Reservas"; // Página para listar reservas

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Página de lista de habitaciones */}
          <Route path="/habitaciones" element={<ListaHabitaciones />} />

          {/* Página de lista de reservas */}
          <Route path="/reservas" element={<Reservas />} />  {/* Nueva página para reservas */}

          {/* Página de gestión de clientes */}
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/clientes/editar/:id" element={<Clientes />} /> {/* Ruta para editar clientes */}

          {/* Página para agregar nuevas reservas */}
          <Route path="/nueva-reserva" element={<ReservaForm />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
