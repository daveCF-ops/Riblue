import React, { useState, useEffect } from 'react'; // Importa React y las funciones para manejar estados y efectos.
import { X, Plus, Trash2 } from 'lucide-react'; // Importa los iconos de cerrar, agregar y eliminar.

function FormularioVenta({ mostrarModal, onClose, onSave, clientes = [], categorias = [], productos = [] }) { // Recibe los datos y funciones necesarios para registrar una venta.
  const [idCliente, setIdCliente] = useState(''); // Guarda el ID del cliente seleccionado.
  const [metodoPago, setMetodoPago] = useState('Efectivo'); // Guarda el método de pago seleccionado.

  const [categoriaFiltro, setCategoriaFiltro] = useState(''); // Guarda la categoría utilizada para filtrar productos.
  const [productoId, setProductoId] = useState(''); // Guarda el ID del producto seleccionado.
  const [cantidad, setCantidad] = useState(1); // Guarda la cantidad de productos.
  const [precioUnitario, setPrecioUnitario] = useState(''); // Guarda el precio por unidad.

  const [itemsVenta, setItemsVenta] = useState([]); // Almacena los productos agregados a la venta.

  useEffect(() => { // Ejecuta acciones cuando cambia la visibilidad del modal.
    if (!mostrarModal) { // Comprueba si el formulario está cerrado.
      setIdCliente(''); // Limpia el cliente seleccionado.
      setMetodoPago('Efectivo'); // Restablece el método de pago.
      setCategoriaFiltro(''); // Limpia el filtro de categorías.
      setProductoId(''); // Limpia el producto seleccionado.
      setCantidad(1); // Restablece la cantidad a uno.
      setPrecioUnitario(''); // Limpia el precio.
      setItemsVenta([]); // Elimina los productos de la venta anterior.
    }
  }, [mostrarModal]); // Se ejecuta cuando cambia el estado del modal.

  if (!mostrarModal) return null; // Si el modal no está visible, no muestra nada.

  const productosFiltrados = categoriaFiltro // Comprueba si se seleccionó una categoría.
    ? productos.filter((p) => String(p.id_categoria) === String(categoriaFiltro)) // Muestra solamente los productos de esa categoría.
    : productos; // Si no hay categoría seleccionada, muestra todos los productos.

  const handleSeleccionarProducto = (id) => { // Función que se ejecuta al seleccionar un producto.
    setProductoId(id); // Guarda el ID del producto seleccionado.
    const prod = productos.find((p) => String(p.id_producto) === String(id)); // Busca el producto en la lista.
    if (prod) { // Comprueba si encontró el producto.
      setPrecioUnitario(prod.precio); // Coloca automáticamente el precio del producto.
    } else {
      setPrecioUnitario(''); // Limpia el precio si no encuentra el producto.
    }
  };

  const handleAgregarItem = () => { // Función para agregar un producto a la venta.
    if (!productoId || cantidad <= 0 || precioUnitario <= 0) return; // Comprueba que exista producto, cantidad y precio válidos.

    const prodInfo = productos.find((p) => String(p.id_producto) === String(productoId)); // Busca los datos del producto seleccionado.

    const nuevoItem = { // Crea un objeto con la información del producto agregado.
      id_item: Date.now(), // Genera un identificador para el producto dentro de la venta.
      id_producto: prodInfo.id_producto, // Guarda el ID del producto.
      nombre: prodInfo.nombre, // Guarda el nombre del producto.
      categoria: prodInfo.categoria_nombre || 'General', // Guarda la categoría o utiliza General si está vacía.
      tipo: prodInfo.tipo || 'Bebida', // Guarda el tipo o utiliza Bebida si está vacío.
      cantidad: Number(cantidad), // Convierte la cantidad a número.
      precio: Number(precioUnitario), // Convierte el precio a número.
      subtotal: Number(cantidad) * Number(precioUnitario) // Calcula el subtotal multiplicando cantidad por precio.
    };

    setItemsVenta([...itemsVenta, nuevoItem]); // Agrega el nuevo producto a la lista de la venta.

    setProductoId(''); // Limpia el producto seleccionado.
    setPrecioUnitario(''); // Limpia el precio.
    setCantidad(1); // Restablece la cantidad a uno.
  };

  const handleEliminarItem = (id_item) => { // Recibe el ID del producto que se desea eliminar de la venta.
    setItemsVenta(itemsVenta.filter((item) => item.id_item !== id_item)); // Conserva los productos con un ID diferente.
  };

  const calcularTotal = () => itemsVenta.reduce((acc, item) => acc + item.subtotal, 0); // Suma los subtotales para obtener el total de la venta.

  const handleSubmit = (e) => { // Función que se ejecuta al enviar el formulario.
    e.preventDefault(); // Evita que la página se recargue.
    if (!idCliente || itemsVenta.length === 0) return; // Comprueba que exista un cliente y al menos un producto.

    const clienteObj = clientes.find((c) => String(c.id_cliente) === String(idCliente)); // Busca los datos del cliente seleccionado.

    onSave({ // Envía la información de la venta para guardarla.
      id_cliente: idCliente, // Guarda el ID del cliente.
      cliente_nombre: clienteObj ? clienteObj.nombre : 'Cliente General', // Guarda el nombre del cliente o utiliza Cliente General.
      metodo_pago: metodoPago, // Guarda el método de pago.
      items: itemsVenta, // Envía la lista de productos de la venta.
      total: calcularTotal(), // Envía el total calculado.
      fecha: new Date().toLocaleString('es-MX') // Obtiene la fecha y hora actual con formato de México.
    });

    onClose(); // Cierra el formulario después de registrar la venta.
  };

  return (
    <div className="modal-overlay"> {/* Fondo que cubre la página detrás del modal. */}
      <div className="modal-content modal-venta-content"> {/* Contenedor principal del formulario de venta. */}
        <div className="modal-header">
          <h3>Registrar Nueva Venta</h3>
          <button className="btn-cerrar" onClick={onClose}> {/* Botón para cerrar el formulario. */}
            <X size={20} /> {/* Muestra el icono de cerrar. */}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="venta-form"> {/* Formulario que ejecuta handleSubmit al enviarse. */}
          {/* Cliente y Método de Pago homologados */}
          <div className="form-row"> {/* Organiza los campos en una misma fila. */}
            <div className="form-group">
              <label>Cliente *</label>
              <select value={idCliente} onChange={(e) => setIdCliente(e.target.value)} required> {/* Permite seleccionar un cliente y guarda su ID. */}
                <option value="">Seleccionar cliente...</option>
                {clientes.map((cli) => ( // Recorre la lista de clientes.
                  <option key={cli.id_cliente} value={cli.id_cliente}> {/* Crea una opción por cada cliente. */}
                    {cli.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Método de Pago *</label>
              <select value={metodoPago} onChange={(e) => setMetodoPago(e.target.value)}> {/* Permite seleccionar y guardar el método de pago. */}
                <option value="Efectivo">Efectivo</option>
                <option value="Tarjeta">Tarjeta</option>
                <option value="Transferencia">Transferencia</option>
              </select>
            </div>
          </div>

          <hr className="divider" /> {/* Línea divisoria entre las secciones. */}

          {/* Buscador de Productos reorganizado */}
          <div className="agregar-producto-box">
            <h4>Buscador de Productos</h4>
            
            <div className="form-row-items-v2"> {/* Contenedor de los selectores de categoría y producto. */}
              <select
                value={categoriaFiltro} // Muestra la categoría seleccionada.
                onChange={(e) => { // Detecta cuando cambia la categoría.
                  setCategoriaFiltro(e.target.value); // Guarda la categoría seleccionada.
                  setProductoId(''); // Limpia el producto seleccionado.
                  setPrecioUnitario(''); // Limpia el precio anterior.
                }}
              >
                <option value="">Todas las categorías</option>
                {categorias.map((cat) => ( // Recorre las categorías disponibles.
                  <option key={cat.id_categoria} value={cat.id_categoria}> {/* Crea una opción por cada categoría. */}
                    {cat.nombre}
                  </option>
                ))}
              </select>

              <select
                value={productoId} // Muestra el producto seleccionado.
                onChange={(e) => handleSeleccionarProducto(e.target.value)} // Ejecuta la función para seleccionar el producto.
              >
                <option value="">Seleccionar producto...</option>
                {productosFiltrados.map((prod) => ( // Recorre los productos filtrados.
                  <option key={prod.id_producto} value={prod.id_producto}> {/* Crea una opción por cada producto. */}
                    {prod.nombre} ({prod.tipo})
                  </option>
                ))}
              </select>
            </div>

            <div className="form-row-items-v2" style={{ marginTop: '10px' }}> {/* Contenedor de los campos de cantidad y precio. */}
              <input
                type="number"
                min="1" // Establece uno como cantidad mínima.
                placeholder="Cantidad"
                value={cantidad} // Muestra la cantidad actual.
                onChange={(e) => setCantidad(e.target.value)} // Actualiza la cantidad cuando cambia.
              />

              <input
                type="number"
                placeholder="Precio ($)"
                value={precioUnitario} // Muestra el precio unitario.
                onChange={(e) => setPrecioUnitario(e.target.value)} // Actualiza el precio cuando cambia.
              />
            </div>

            {/* Contenedor del botón verde centrado */}
            <div className="btn-agregar-wrapper">
              <button type="button" className="btn-agregar-item" onClick={handleAgregarItem}> {/* Ejecuta la función para agregar el producto. */}
                <Plus size={16} /> Agregar al ticket
              </button>
            </div>
          </div>

          {/* Tabla de Productos Agregados */}
          <div className="items-tabla-wrapper">
            <table className="tabla-items"> {/* Tabla donde se muestran los productos de la venta. */}
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Categoría</th>
                  <th>Tipo</th>
                  <th>Cant.</th>
                  <th>Subtotal</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {itemsVenta.length === 0 ? ( // Comprueba si todavía no se agregaron productos.
                  <tr>
                    <td colSpan="6" className="sin-items"> {/* Ocupa las seis columnas de la tabla. */}
                      No has añadido productos a esta venta.
                    </td>
                  </tr>
                ) : (
                  itemsVenta.map((item) => ( // Recorre los productos agregados a la venta.
                    <tr key={item.id_item}> {/* Crea una fila identificada por el ID del producto en la venta. */}
                      <td>{item.nombre}</td> {/* Muestra el nombre del producto. */}
                      <td>{item.categoria}</td> {/* Muestra la categoría. */}
                      <td>{item.tipo}</td> {/* Muestra el tipo de producto. */}
                      <td>{item.cantidad}</td> {/* Muestra la cantidad. */}
                      <td>${item.subtotal.toFixed(2)}</td> {/* Muestra el subtotal con dos decimales. */}
                      <td>
                        <button
                          type="button"
                          className="btn-accion btn-eliminar"
                          onClick={() => handleEliminarItem(item.id_item)} // Elimina el producto de la venta.
                        >
                          <Trash2 size={14} /> {/* Muestra el icono de eliminar. */}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="venta-summary"> {/* Contenedor que muestra el total de la venta. */}
            <span className="total-label">Total a Pagar:</span>
            <span className="total-monto">${calcularTotal().toFixed(2)}</span> {/* Muestra el total con dos decimales. */}
          </div>

          <div className="modal-footer"> {/* Contenedor de los botones finales. */}
            <button type="button" className="btn-cancelar" onClick={onClose}> {/* Cierra el formulario sin registrar la venta. */}
              Cancelar
            </button>
            <button
              type="submit"
              className="btn-guardar"
              disabled={itemsVenta.length === 0 || !idCliente} // Desactiva el botón si no hay productos o cliente seleccionado.
            >
              Registrar Venta
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormularioVenta; // Exporta el componente para utilizarlo en otros archivos.