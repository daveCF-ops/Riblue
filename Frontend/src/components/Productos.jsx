import React, { useState } from 'react';
import { Edit, Plus, Trash2 } from 'lucide-react';
import FormularioProducto from './Modals/FormularioProducto';
import './Productos.css';

function Productos() {
  // Estado que almacena la lista de productos (inicia con uno de ejemplo)
  const [productos, setProductos] = useState([
    { id: 1, nombre: 'Tequila Centenario', categoria: 'Tequila', precio: 500, stock: 12 }
  ]);
  
  // Estados para controlar el modal
  const [mostrarModal, setMostrarModal] = useState(false);
  const [productoEditando, setProductoEditando] = useState(null);

  // Abre el modal para crear un producto nuevo
  const abrirModalCrear = () => { 
    setProductoEditando(null); 
    setMostrarModal(true); 
  };

  // Abre el modal para editar un producto existente
  const abrirModalEditar = (prod) => { 
    setProductoEditando(prod); 
    setMostrarModal(true); 
  };

  // Guarda los datos (crea o actualiza)
  const handleGuardar = (data) => {
    if (productoEditando) {
      setProductos(productos.map(p => p.id === productoEditando.id ? { ...p, ...data } : p));
    } else {
      setProductos([...productos, { id: Date.now(), ...data }]);
    }
    setMostrarModal(false);
  };

  // Elimina un producto con confirmación
  const handleEliminar = (id) => {
    if (window.confirm('¿Eliminar este producto?')) {
      setProductos(productos.filter(p => p.id !== id));
    }
  };

  return (
    <div className="producto-container">
      
      {/* Encabezado de la pantalla */}
      <div className="producto-header">
        <h2>Gestión de Productos</h2>
        <button className="btn-agregar" onClick={abrirModalCrear}>
          <Plus size={18} /> Nuevo Producto
        </button>
      </div>

      {/* Tabla de productos */}
      <div className="tabla-container">
        <table className="tabla-productos">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.length > 0 ? (
              productos.map((p) => (
                <tr key={p.id}>
                  <td>{p.nombre}</td>
                  <td>{p.categoria}</td>
                  <td>${p.precio}</td>
                  <td>{p.stock}</td>
                  <td className="acciones">
                    <button className="btn-accion btn-editar" onClick={() => abrirModalEditar(p)}><Edit size={16} /></button>
                    <button className="btn-accion btn-eliminar" onClick={() => handleEliminar(p.id)}><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '20px', color: '#64748b' }}>
                  No hay productos registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal de Producto */}
      <FormularioProducto 
        mostrarModal={mostrarModal}
        onClose={() => setMostrarModal(false)}
        onSave={handleGuardar}
        productoEditando={productoEditando}
      />

    </div>
  );
}

export default Productos;
