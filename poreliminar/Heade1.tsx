// src/components/Layout/Header.tsx
import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../../styles/header.css";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className="header">
            {/* Logo */}
            <div className="logo">
                <img src="/logo.png" alt="Hotel Logo" />
            </div>

            {/* Título y Eslogan */}
            <div className="header-text">
                <h1 className="header-title">Niko&GHOTEL</h1>
                <p className="header-slogan">Confort y lujo en cada estancia</p>
            </div>

            {/* Botón de Hamburguesa */}
            <button className="hamburger" onClick={toggleMenu}>
                <FaBars />
            </button>

            {/* Menú de Navegación */}
            <nav className={`menu ${isOpen ? "open" : ""}`}>
                <ul>
                    <li><Link to="/">Inicio</Link></li>
                    <li><Link to="/habitaciones">Habitaciones</Link></li>
                    <li><Link to="/reservas">Reservas</Link></li>
                    <li><Link to="/clientes">Clientes</Link></li> {/* Enlace a la página de Clientes */}
                </ul>
            </nav>
        </header>
    );
};

const Body = () => {
    return (
        <main className="body">
            {/* Sección de Bienvenida */}
            <section className="welcome">
                <h2>Bienvenido a Niko&GHOTEL</h2>
                <p>
                    Hotel Elite es tu lugar ideal para disfrutar de confort y lujo. Nos especializamos en hacer de tu estadía una experiencia inolvidable.
                </p>
            </section>

            {/* Sección de Servicios */}
            <section className="services">
                <h2>Conoce nuestros servicios</h2>
                <div className="services-container">
                    {/* Contenedor 1 */}
                    <div className="service-item">
                        <img src="/Img1.png" alt="Servicio 1" />
                        <p>Habitaciones cómodas y elegantes para tu descanso.</p>
                        <button><Link to="/habitaciones">Ver más</Link></button>
                    </div>
                    {/* Contenedor 2 */}
                    <div className="service-item">
                        <img src="/Img2.png" alt="Servicio 2" />
                        <p>Disfruta de nuestra gastronomía de clase mundial.</p>
                        <button><Link to="/habitaciones">Ver más</Link></button>
                    </div>
                    {/* Contenedor 3 */}
                    <div className="service-item">
                        <img src="/Img3.png" alt="Servicio 3" />
                        <p>Spa y servicios para tu relajación.</p>
                        <button><Link to="/habitaciones">Ver más</Link></button>
                    </div>
                    {/* Contenedor 4 */}
                    <div className="service-item">
                        <img src="/Img4.png" alt="Servicio 4" />
                        <p>Salones para eventos y reuniones.</p>
                        <button><Link to="/habitaciones">Ver más</Link></button>
                    </div>
                </div>
            </section>

            {/* Sección de Reserva */}
            <section className="reservation">
                <h2>Reserva tu lugar</h2>
                <p>¿Estás listo para disfrutar de una experiencia inolvidable? Asegura tu lugar ahora.</p>
                <button><Link to="/reservas">Reservar ahora</Link></button>
            </section>
        </main>
    );
};

export default Header;
export { Body };
