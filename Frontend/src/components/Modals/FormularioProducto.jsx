/* eslint-disable */
import React, { useState, useEffect } from 'react';
import '../Categorias.css';

export default function FormularioProducto({ mostrarModal, onClose, onSave, productoEditando }) {
  const [formData, setFormData] = useState({
    nombre: '', categoria: '', precio: '', stock: ''
  });

  useEffect(() => {
    if (productoEditando) {
      setFormData(productoEditando);
    } else {
      setFormData({ nombre: '', categoria: '', precio: '', stock: '' });
    }
  }, [productoEditando, mostrarModal]);

  if (!mostrarModal) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="modal-overlay" style={{ alignItems: 'flex-start', overflowY: 'auto', padding: '20px' }}>
      <div className="modal-content" style={{ maxWidth: '550px', padding: '32px', margin: 'auto' }}>
        
        <div className="modal-header" style={{ marginBottom: '24px' }}>
          <h3 style={{ margin: 0 }}>{productoEditando ? 'Editar Producto' : 'Nuevo Producto'}</h3>
        </div>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="form-group">
            <label>Nombre del Producto</label>
            <input name="nombre" value={formData.nombre} onChange={handleChange} required placeholder="Ej. Tequila Centenario" />
          </div>
          
          <div className="form-group">
            <label>Categoría</label>
            <input name="categoria" value={formData.categoria} onChange={handleChange} required placeholder="Ej. Tequila" />
          </div>
          
          <div style={{ display: 'flex', gap: '12px' }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label>Precio de Venta ($)</label>
              <input name="precio" type="number" value={formData.precio} onChange={handleChange} required placeholder="0.00" />
            </div>

            <div className="form-group" style={{ flex: 1 }}>
              <label>Stock Inicial</label>
              <input name="stock" type="number" value={formData.stock} onChange={handleChange} required placeholder="0" />
            </div>
          </div>
          
          <div className="modal-footer" style={{ marginTop: '16px' }}>
            <button type="button" className="btn-cancelar" onClick={onClose}>Cancelar</button>
            <button type="submit" className="btn-guardar">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
}