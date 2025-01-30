import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/header.css"; // Importación corregida

const Layout: React.FC = ({ children }) => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div>
            <header className="header">
                <div className="logo">
                    <img src="/Logo.png" alt="Hotel Logo" />
                </div>

                {/* Título y Eslogan */}
                <div className="header-text">
                    <h1 className="header-title">Niko&GHOTEL</h1>
                    <p className="header-slogan">El mejor confort y calidad para tu estadía</p>
                </div>

                {/* Botón Hamburguesa */}
                <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
                    ☰
                </button>

                {/* Menú de Navegación */}
                <nav className={`menu ${menuOpen ? "open" : ""}`}>
                    <ul>
                        <li><Link to="/" onClick={() => setMenuOpen(false)}>Inicio</Link></li>
                        <li><Link to="/habitaciones" onClick={() => setMenuOpen(false)}>Habitaciones</Link></li>
                        <li><Link to="/reservas" onClick={() => setMenuOpen(false)}>Reservas</Link></li>
                        <li><Link to="/clientes" onClick={() => setMenuOpen(false)}>Clientes</Link></li>
                    </ul>
                </nav>
            </header>

            <main>
                {children}
            </main>
        </div>
    );
};

export default Layout;
