import React from 'react';
import '../styles/home.css';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="home-container">
            {/* Sección de Bienvenida */}
            <section className="welcome-section">
                <h2>Bienvenido a Niko&GHOTEL</h2>
                <p>Disfruta del máximo confort y lujo en cada estadía. ¡Haz de tu experiencia algo inolvidable!</p>
            </section>

            {/* Sección de Servicios / Habitaciones */}
            <section className="services-section">
                <h2>Explora nuestras habitaciones</h2>
                <div className="image-gallery">
                    {/* Contenedor 1 */}
                    <div className="image-item">
                        <img src="/Img1.png" alt="Habitación 1" />
                        <p>Habitaciones Dobles .</p>
                        <button><Link to="/habitaciones">Ver más</Link></button>
                    </div>
                    {/* Contenedor 2 */}
                    <div className="image-item">
                        <img src="/Img2.png" alt="Habitación 2" />
                        <p>Habitaciones Individaules.</p>
                        <button><Link to="/habitaciones">Ver más</Link></button>
                    </div>
                    {/* Contenedor 3 */}
                    <div className="image-item">
                        <img src="/Img3.png" alt="Habitación 3" />
                        <p>Suits.</p>
                        <button><Link to="/habitaciones">Ver más</Link></button>
                    </div>
                    {/* Contenedor 4 */}
                    <div className="image-item">
                        <img src="/Img4.png" alt="Habitación 4" />
                        <p>Habitaciones Matrimoniales.</p>
                        <button><Link to="/habitaciones">Ver más</Link></button>
                    </div>
                </div>
            </section>

            {/* Sección de Reservas */}
            <section className="reservation-section">
                <h2>Reserva tu estadía</h2>
                <p>No esperes más. Reserva tu lugar en el paraíso ahora mismo.</p>
                <button><Link to="/reservas">Reservar ahora</Link></button>
            </section>
        </div>
    );
};

export default Home;
