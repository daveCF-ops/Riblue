
import React, { useState } from 'react'; // Importa React y useState para manejar estados.
import { Edit, Plus, Trash2 } from 'lucide-react'; // Importa los iconos de editar, agregar y eliminar.
import FormularioCategoria from './Modals/FormularioCategoria'; // Importa el formulario de categorías.
import './Categorias.css'; // Importa los estilos CSS.

function Categorias() {
  const [categorias, setCategorias] = useState([ // Estado que almacena las categorías.
    {
      id_categoria: 1,
      nombre: 'Helados La Cascarie',
      descripcion: 'Categoría por defecto'
    }
  ]);

  const [mostrarModal, setMostrarModal] = useState(false); // Controla si se muestra el formulario.
  const [categoriaEditando, setCategoriaEditando] = useState(null); // Guarda la categoría que se está editando.

  const abrirModalCrear = () => { // Abre el formulario para crear una categoría.
    setCategoriaEditando(null); // Limpia la categoría seleccionada.
    setMostrarModal(true); // Muestra el formulario.
  };

  const abrirModalEditar = (categoria) => { // Abre el formulario para editar una categoría.
    setCategoriaEditando(categoria); // Guarda la categoría seleccionada.
    setMostrarModal(true); // Muestra el formulario.
  };

  const handleGuardar = (data) => { // Recibe los datos del formulario.
    if (categoriaEditando) { // Comprueba si se está editando una categoría.
      setCategorias(
        categorias.map((cat) => // Recorre todas las categorías.
          cat.id_categoria === categoriaEditando.id_categoria // Comprueba si coincide el ID.
            ? { ...cat, ...data } // Actualiza los datos de la categoría.
            : cat // Conserva las demás categorías.
        )
      );
    } else {
      const nuevaCategoria = { // Crea una nueva categoría.
        id_categoria: Date.now(), // Genera un identificador único basado en la hora.
        ...data // Agrega los datos recibidos del formulario.
      };
      setCategorias([...categorias, nuevaCategoria]); // Agrega la nueva categoría al arreglo.
    }
  };

  const handleEliminar = (id_categoria) => { // Recibe el ID de la categoría que se eliminará.
    setCategorias(categorias.filter((cat) => cat.id_categoria !== id_categoria)); // Conserva las categorías con un ID diferente.
  };

  return (
    <div className="categoria-container">
      <div className="categoria-header">
        <h2>Gestión de Categorías</h2>
        <button className="btn-agregar" onClick={abrirModalCrear}> {/* Botón para agregar una categoría. */}
          <Plus size={18} /> Nueva Categoría
        </button>
      </div>

      <div className="categoria-grid">
        {categorias.map((categoria) => ( // Recorre las categorías para mostrar sus tarjetas.
          <div key={categoria.id_categoria} className="categoria-card">
            <div className="categoria-card-content">
              <span className="categoria-id">ID: #{categoria.id_categoria}</span>
              <h3>{categoria.nombre}</h3>
              <p>{categoria.descripcion || 'Sin descripción'}</p> {/* Muestra la descripción o un texto alternativo. */}
            </div>
            <div className="categoria-card-actions">
              <button
                className="btn-accion btn-editar"
                onClick={() => abrirModalEditar(categoria)} // Abre el formulario para editar.
                title="Editar"
              >
                <Edit size={16} />
              </button>
              <button
                className="btn-accion btn-eliminar"
                onClick={() => handleEliminar(categoria.id_categoria)} // Elimina la categoría seleccionada.
                title="Eliminar"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <FormularioCategoria
        mostrarModal={mostrarModal} // Indica si el modal está visible.
        onClose={() => setMostrarModal(false)} // Cierra el formulario.
        onSave={handleGuardar} // Ejecuta la función para guardar.
        categoriaEditando={categoriaEditando} // Envía la categoría que se está editando.
      />
    </div>
  );
}

export default Categorias; // Exporta el componente para utilizarlo en otros archivos.
