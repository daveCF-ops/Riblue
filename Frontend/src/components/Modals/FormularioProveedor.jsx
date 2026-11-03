/* eslint-disable */
import React, { useState, useEffect } from 'react';
import '../Categorias.css';

export default function FormularioProveedor({ mostrarModal, onClose, onSave, proveedorEditando }) {
  const [formData, setFormData] = useState({
    empresa: '', contacto: '', telefono: '', email: '', ciudad: ''
  });

  useEffect(() => {
    if (proveedorEditando) {
      setFormData(proveedorEditando);
    } else {
      setFormData({ empresa: '', contacto: '', telefono: '', email: '', ciudad: '' });
    }
  }, [proveedorEditando, mostrarModal]);

  // ⚠️ ESTA LÍNEA ES LA CLAVE: Si el modal no debe mostrarse, no renderiza nada.
  if (!mostrarModal) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.empresa) return alert('El nombre de la empresa es obligatorio');
    onSave(formData);
  };

  return (
    <div className="modal-overlay" style={{ alignItems: 'flex-start', overflowY: 'auto', padding: '20px' }}>
      <div className="modal-content" style={{ maxWidth: '550px', padding: '32px', margin: 'auto' }}>
        
        <div className="modal-header" style={{ marginBottom: '24px' }}>
          <h3 style={{ margin: 0 }}>{proveedorEditando ? 'Editar Proveedor' : 'Registrar Proveedor'}</h3>
        </div>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="form-group">
            <label>Nombre de la empresa *</label>
            <input name="empresa" value={formData.empresa} onChange={handleChange} required placeholder="Ej. Distribuidora La Europea" />
          </div>
          
          <div className="form-group">
            <label>Nombre del contacto</label>
            <input name="contacto" value={formData.contacto} onChange={handleChange} placeholder="Ej. Carlos Ruiz" />
          </div>
          
          <div className="form-group">
            <label>Teléfono</label>
            <input name="telefono" value={formData.telefono} onChange={handleChange} placeholder="Ej. 555-999-888" />
          </div>

          <div className="form-group">
            <label>Correo electrónico</label>
            <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Ej. ventas@laeuropea.com" />
          </div>

          <div className="form-group">
            <label>Ciudad</label>
            <input name="ciudad" value={formData.ciudad} onChange={handleChange} placeholder="Ej. CDMX" />
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