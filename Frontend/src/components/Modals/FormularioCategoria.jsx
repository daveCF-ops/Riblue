
import React, { useState, useEffect } from 'react'; // Importa React y las funciones para manejar estados y efectos.
import { X } from 'lucide-react'; // Importa el icono para cerrar el formulario.

function FormularioCategoria({ mostrarModal, onClose, onSave, categoriaEditando }) { // Recibe las propiedades del componente.
  const [formData, setFormData] = useState({ // Estado que almacena los datos del formulario.
    nombre: '',
    descripcion: ''
  });

  useEffect(() => { // Ejecuta acciones cuando cambia la categoría o se abre el modal.
    if (categoriaEditando) { // Comprueba si se está editando una categoría.
      setFormData({
        nombre: categoriaEditando.nombre || '', // Carga el nombre de la categoría.
        descripcion: categoriaEditando.descripcion || '' // Carga su descripción.
      });
    } else {
      setFormData({ nombre: '', descripcion: '' }); // Limpia los campos si se crea una categoría nueva.
    }
  }, [categoriaEditando, mostrarModal]); // Se ejecuta cuando cambia alguna de estas propiedades.

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
          <h3>{categoriaEditando ? 'Editar Categoría' : 'Nueva Categoría'}</h3> {/* Cambia el título según la acción. */}
          <button className="btn-cerrar" onClick={onClose}> {/* Botón para cerrar el modal. */}
            <X size={20} /> {/* Muestra el icono de cerrar. */}
          </button>
        </div>
        <form onSubmit={handleSubmit} className="categoria-form"> {/* Formulario que ejecuta handleSubmit al enviarse. */}
          <div className="form-group">
            <label htmlFor="nombre">Nombre de Categoría *</label> {/* Etiqueta del campo nombre. */}
            <input
              type="text"
              id="nombre"
              name="nombre"
              maxLength={50} // Limita el nombre a 50 caracteres.
              value={formData.nombre} // Muestra el nombre almacenado en el estado.
              onChange={handleChange} // Detecta cuando el usuario escribe.
              required // Hace obligatorio este campo.
              placeholder="Ej. Helados La Cascarie" // Muestra un ejemplo dentro del campo.
            />
          </div>

          <div className="form-group">
            <label htmlFor="descripcion">Descripción</label> {/* Etiqueta del campo descripción. */}
            <textarea
              id="descripcion"
              name="descripcion"
              maxLength={200} // Limita la descripción a 200 caracteres.
              rows="3" // Establece tres filas visibles.
              value={formData.descripcion} // Muestra la descripción almacenada.
              onChange={handleChange} // Detecta los cambios en el campo.
              placeholder="Descripción breve de la categoría" // Muestra un texto de ejemplo.
            ></textarea>
          </div>

          <div className="modal-footer"> {/* Contenedor de los botones del formulario. */}
            <button
              type="button"
              className="btn-cancelar"
              onClick={onClose} // Cierra el formulario sin guardar.
            >
              Cancelar
            </button>
            <button type="submit" className="btn-guardar"> {/* Envía el formulario para guardar. */}
              {categoriaEditando ? 'Guardar Cambios' : 'Crear Categoría'} {/* Cambia el texto según la acción. */}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormularioCategoria; // Exporta el componente para utilizarlo en otros archivos.
