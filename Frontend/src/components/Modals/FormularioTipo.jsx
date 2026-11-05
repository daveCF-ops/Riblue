
import React, { useState, useEffect } from 'react'; // Importa React y los hooks necesarios.
import '../Categorias.css'; // Reutiliza los estilos de Categorias.

export default function FormularioTipo({ mostrarModal, onClose, onSave, tipoEditando }) {
  // Estado único que agrupa los campos del tipo.
  const [formData, setFormData] = useState({
    nombre: '', descripcion: ''
  });

  // Al abrir el modal, carga los datos del tipo si se está editando; si no, limpia el formulario.
  useEffect(() => {
    if (tipoEditando) {
      setFormData(tipoEditando);
    } else {
      setFormData({ nombre: '', descripcion: '' });
    }
  }, [tipoEditando, mostrarModal]);

  // Si el modal no debe mostrarse, no renderiza nada.
  if (!mostrarModal) return null;

  // Actualiza dinámicamente el campo correspondiente usando el atributo `name` del input o textarea.
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Envía los datos del formulario al componente padre al hacer submit.
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    // Overlay con scroll activado para evitar que el contenido se corte en pantallas pequeñas.
    <div className="modal-overlay" style={{ alignItems: 'flex-start', overflowY: 'auto', padding: '20px' }}>
      <div className="modal-content" style={{ maxWidth: '550px', padding: '32px', margin: 'auto' }}>
        
        {/* Título dinámico según si se está editando o creando un tipo. */}
        <div className="modal-header" style={{ marginBottom: '24px' }}>
          <h3 style={{ margin: 0 }}>{tipoEditando ? 'Editar Tipo' : 'Nuevo Tipo'}</h3>
        </div>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Campo de texto: nombre del tipo. */}
          <div className="form-group">
            <label>Nombre</label>
            <input name="nombre" value={formData.nombre} onChange={handleChange} required placeholder="Ej. Servicio" />
          </div>
          
          {/* Descripción con textarea redimensionable verticalmente. */}
          <div className="form-group">
            <label>Descripción</label>
            <textarea 
              name="descripcion" 
              value={formData.descripcion} 
              onChange={handleChange} 
              required 
              rows="3"
              style={{ resize: 'vertical', fontFamily: 'inherit' }} // Permite ajustar la altura y hereda la tipografía.
            />
          </div>
          
          {/* Acciones del formulario: cancelar o guardar. */}
          <div className="modal-footer" style={{ marginTop: '16px' }}>
            <button type="button" className="btn-cancelar" onClick={onClose}>Cancelar</button>
            <button type="submit" className="btn-guardar">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
}