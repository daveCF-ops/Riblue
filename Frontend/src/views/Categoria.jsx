import React, { useState } from 'react';
import { Edit, Plus } from 'lucide-react';
import './Categoria.css';

function Categoria() {
  const [categorias] = useState([
    { id: 1, nombre: 'Electrónica', descripcion: 'Dispositivos electrónicos y gadgets' },
    { id: 2, nombre: 'Ropa', descripcion: 'Prendas de vestir y accesorios' },
    { id: 3, nombre: 'Hogar', descripcion: 'Artículos para el hogar y decoración' }
  ]);
  return (
    <div className="categoria-container">
      <h2>Categorías</h2>
      <div className="categoria-list">
        {categorias.map((categoria) => (
          <div key={categoria.id} className="categoria-item">
            <h3>{categoria.nombre}</h3>
            <p>{categoria.descripcion}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categoria;