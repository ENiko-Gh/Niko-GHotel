import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home";
import ListaHabitaciones from "./components/Lists/ListaHabitaciones";
import ListaReservas from "./components/Lists/ListaReservas";
import Clientes from "./pages/Clientes";
import ReservaForm from "./components/Forms/ReservaForm";
import Reservas from "./pages/Reservas";

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Página de lista de habitaciones */}
          <Route path="/habitaciones" element={<ListaHabitaciones />} />

          {/* Página de lista de reservas */}
          <Route path="/reservas" element={<Reservas />} />

          {/* Página de gestión de clientes */}
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/clientes/editar/:id" element={<Clientes />} />

          {/* Página para agregar nuevas reservas */}
          <Route path="/nueva-reserva" element={<ReservaForm />} />

          {/* Fallback en caso de error */}
          <Route path="*" element={<h2 style={{ textAlign: "center", color: "red" }}>Página no encontrada</h2>} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
