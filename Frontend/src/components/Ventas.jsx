import React, { useState } from 'react';
import { Edit, Plus } from 'lucide-react';
import './Ventas.css';

function Ventas() {
  const [ventas] = useState([
    { id: 1, cliente: 'Juan Pérez', producto: 'Laptop', cantidad: 1, total: 1500 },
    { id: 2, cliente: 'María García', producto: 'Smartphone', cantidad: 2, total: 2000 },
    { id: 3, cliente: 'Carlos López', producto: 'Tablet', cantidad: 1, total: 800 }
  ]);
  return (
    <div className="venta-container">
      <h2>Ventas</h2>
      <div className="venta-list">
        {ventas.map((venta) => (
          <div key={venta.id} className="venta-item">
            <h3>{venta.cliente}</h3>
            <p>Producto: {venta.producto}</p>
            <p>Cantidad: {venta.cantidad}</p>
            <p>Total: ${venta.total.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Ventas;