/* eslint-disable */
import React, { useState, useEffect } from 'react';
import '../Categorias.css';

export default function FormularioTipo({ mostrarModal, onClose, onSave, tipoEditando }) {
  const [formData, setFormData] = useState({
    nombre: '', descripcion: ''
  });

  useEffect(() => {
    if (tipoEditando) {
      setFormData(tipoEditando);
    } else {
      setFormData({ nombre: '', descripcion: '' });
    }
  }, [tipoEditando, mostrarModal]);

  if (!mostrarModal) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    // AQUÍ APLICAMOS EL SCROLL AL OVERLAY
    <div className="modal-overlay" style={{ alignItems: 'flex-start', overflowY: 'auto', padding: '20px' }}>
      <div className="modal-content" style={{ maxWidth: '550px', padding: '32px', margin: 'auto' }}>
        
        <div className="modal-header" style={{ marginBottom: '24px' }}>
          <h3 style={{ margin: 0 }}>{tipoEditando ? 'Editar Tipo' : 'Nuevo Tipo'}</h3>
        </div>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="form-group">
            <label>Nombre</label>
            <input name="nombre" value={formData.nombre} onChange={handleChange} required placeholder="Ej. Servicio" />
          </div>
          
          <div className="form-group">
            <label>Descripción</label>
            <textarea 
              name="descripcion" 
              value={formData.descripcion} 
              onChange={handleChange} 
              required 
              rows="3"
              style={{ resize: 'vertical', fontFamily: 'inherit' }}
            />
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