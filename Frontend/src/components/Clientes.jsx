import React, { useState } from 'react';
import { Edit, Plus } from 'lucide-react';
import './Clientes.css';

export default function Cliente() {
  const [clientes] = useState([
    { id: 1, nombre: 'Benja Pérez', telefono: '3131555555', email: 'benja@demo.com', direccion: 'Colima' }
  ]);

  return (
    <div>
      <div className="breadcrumbs">Inicio / <span>CLIENTES</span></div>
      
      <div className="actions-bar">
        <span>Fila seleccionada</span>
        <div className="buttons-group">
          <button className="btn-secondary"><Edit size={16} /> Modificar</button>
          <button className="btn-primary"><Plus size={16} /> Agregar</button>
        </div>
      </div>

      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Teléfono</th>
              <th>E-Mail</th>
              <th>Dirección</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((c) => (
              <tr key={c.id}>
                <td>{c.nombre}</td>
                <td>{c.telefono}</td>
                <td>{c.email}</td>
                <td>{c.direccion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}