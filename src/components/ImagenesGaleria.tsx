// src/components/ImagenesGaleria.tsx

import React, { useState, useEffect } from 'react';

interface GaleriaProps {
    imagenes: string[];
}

const Galeria: React.FC<GaleriaProps> = ({ imagenes }) => {
    const [indice, setIndice] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndice((prev) => (prev + 1) % imagenes.length);
        }, 3000); // Cambia cada 3 segundos
        return () => clearInterval(interval);
    }, [imagenes.length]);

    return (
        <div>
            <img src={imagenes[indice]} alt="Galería habitación" />
        </div>
    );
};

export default Galeria;
