
import React, { useState, useEffect } from 'react'; // Importa React y las funciones para manejar estados y efectos.
import { X } from 'lucide-react'; // Importa el icono para cerrar el formulario.

function FormularioCliente({ mostrarModal, onClose, onSave, clienteEditando }) { // Recibe las propiedades del componente.
  const [formData, setFormData] = useState({ // Estado que almacena los datos del formulario.
    nombre: '',
    email: '',
    telefono: '',
    empresa: ''
  });

  useEffect(() => { // Ejecuta acciones cuando cambia el cliente o se abre el modal.
    if (clienteEditando) { // Comprueba si se está editando un cliente.
      setFormData({
        nombre: clienteEditando.nombre || '', // Carga el nombre del cliente.
        email: clienteEditando.email || '', // Carga el correo electrónico.
        telefono: clienteEditando.telefono || '', // Carga el teléfono.
        empresa: clienteEditando.empresa || '' // Carga el nombre de la empresa.
      });
    } else {
      setFormData({ nombre: '', email: '', telefono: '', empresa: '' }); // Limpia los campos para crear un cliente nuevo.
    }
  }, [clienteEditando, mostrarModal]); // Se ejecuta cuando cambia alguna de estas propiedades.

  if (!mostrarModal) return null; // Si el modal no está visible, no muestra nada.

  const handleChange = (e) => { // Función que detecta los cambios en los campos.
    const { name, value } = e.target; // Obtiene el nombre y el valor del campo modificado.
    setFormData((prev) => ({ // Actualiza los datos del formulario.
      ...prev, // Conserva los valores anteriores.
      [name]: value // Actualiza el campo que cambió.
    }));
  };

  const handleSubmit = (e) => { // Función que se ejecuta al enviar el formulario.
    e.preventDefault(); // Evita que la página se recargue.
    if (!formData.nombre.trim()) return; // Evita guardar si el nombre está vacío.

    onSave(formData); // Envía los datos para guardarlos.
    onClose(); // Cierra el formulario después de guardar.
  };

  return (
    <div className="modal-overlay"> {/* Fondo que cubre la página detrás del modal. */}
      <div className="modal-content"> {/* Contenedor principal del formulario. */}
        <div className="modal-header">
          <h3>{clienteEditando ? 'Editar Cliente' : 'Nuevo Cliente'}</h3> {/* Cambia el título según la acción. */}
          <button className="btn-cerrar" onClick={onClose}> {/* Botón para cerrar el modal. */}
            <X size={20} /> {/* Muestra el icono de cerrar. */}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="cliente-form"> {/* Formulario que ejecuta handleSubmit al enviarse. */}
          <div className="form-group">
            <label htmlFor="nombre">Nombre *</label> {/* Etiqueta del campo nombre. */}
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre} // Muestra el nombre almacenado en el estado.
              onChange={handleChange} // Detecta cuando el usuario escribe.
              required // Hace obligatorio este campo.
              placeholder="Ej. Carlos Mendoza" // Muestra un ejemplo dentro del campo.
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label> {/* Etiqueta del campo correo electrónico. */}
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email} // Muestra el correo almacenado en el estado.
              onChange={handleChange} // Detecta los cambios en el campo.
              required // Hace obligatorio este campo.
              placeholder="cliente@ejemplo.com" // Muestra un ejemplo de correo.
            />
          </div>

          <div className="form-group">
            <label htmlFor="telefono">Teléfono</label> {/* Etiqueta del campo teléfono. */}
            <input
              type="tel"
              id="telefono"
              name="telefono"
              value={formData.telefono} // Muestra el teléfono almacenado.
              onChange={handleChange} // Detecta los cambios en el campo.
              placeholder="555-0100" // Muestra un ejemplo de teléfono.
            />
          </div>

          <div className="form-group">
            <label htmlFor="empresa">Empresa</label> {/* Etiqueta del campo empresa. */}
            <input
              type="text"
              id="empresa"
              name="empresa"
              value={formData.empresa} // Muestra la empresa almacenada.
              onChange={handleChange} // Detecta los cambios en el campo.
              placeholder="Ej. Distribuidora del Norte" // Muestra un ejemplo de empresa.
            />
          </div>

          <div className="modal-footer"> {/* Contenedor de los botones del formulario. */}
            <button type="button" className="btn-cancelar" onClick={onClose}> {/* Cierra el formulario sin guardar. */}
              Cancelar
            </button>
            <button type="submit" className="btn-guardar"> {/* Envía el formulario para guardar. */}
              {clienteEditando ? 'Guardar Cambios' : 'Crear Cliente'} {/* Cambia el texto según la acción. */}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormularioCliente; // Exporta el componente para utilizarlo en otros archivos.
