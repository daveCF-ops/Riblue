
import React, { useState, useEffect } from 'react'; // Importa React y los hooks necesarios.
import '../Categorias.css'; // Reutiliza los estilos de Categorias.

export default function FormularioProducto({ mostrarModal, onClose, onSave, productoEditando }) {
  // Estado único que agrupa todos los campos del formulario.
  const [formData, setFormData] = useState({
    nombre: '', categoria: '', precio: '', stock: ''
  });

  // Al abrir el modal, carga los datos del producto si se está editando; si no, limpia el formulario.
  useEffect(() => {
    if (productoEditando) {
      setFormData(productoEditando);
    } else {
      setFormData({ nombre: '', categoria: '', precio: '', stock: '' });
    }
  }, [productoEditando, mostrarModal]);

  // Si el modal no debe mostrarse, no renderiza nada.
  if (!mostrarModal) return null;

  // Actualiza dinámicamente el campo correspondiente usando el atributo `name` del input.
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Envía los datos del formulario al componente padre al hacer submit.
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    // Overlay con scroll por si el contenido del formulario es alto.
    <div className="modal-overlay" style={{ alignItems: 'flex-start', overflowY: 'auto', padding: '20px' }}>
      <div className="modal-content" style={{ maxWidth: '550px', padding: '32px', margin: 'auto' }}>
        
        {/* Título dinámico según si se está editando o creando un producto. */}
        <div className="modal-header" style={{ marginBottom: '24px' }}>
          <h3 style={{ margin: 0 }}>{productoEditando ? 'Editar Producto' : 'Nuevo Producto'}</h3>
        </div>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Campos de texto: nombre y categoría. */}
          <div className="form-group">
            <label>Nombre del Producto</label>
            <input name="nombre" value={formData.nombre} onChange={handleChange} required placeholder="Ej. Tequila Centenario" />
          </div>
          
          <div className="form-group">
            <label>Categoría</label>
            <input name="categoria" value={formData.categoria} onChange={handleChange} required placeholder="Ej. Tequila" />
          </div>
          
          {/* Campos numéricos: precio y stock, en una fila. */}
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
