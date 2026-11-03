import React, { useState } from 'react'; // Importa React y useState para manejar estados.
import { Plus, Trash2 } from 'lucide-react'; // Importa los iconos de agregar y eliminar.
import FormularioVenta from './Modals/FormularioVenta'; // Importa el formulario para registrar ventas.
import './Ventas.css'; // Importa los estilos CSS.

function Ventas() {
  // Lista de clientes por defecto
  const [clientes] = useState([ // Estado que almacena los clientes disponibles.
    { id_cliente: 1, nombre: 'Cliente Ejemplo' }
  ]);

  // Lista de categorías por defecto
  const [categorias] = useState([ // Estado que almacena las categorías disponibles.
    { id_categoria: 1, nombre: 'Helados La Cascarie' },
    { id_categoria: 2, nombre: 'Cócteles de Autor' }
  ]);

  // Lista de productos por defecto
  const [productos] = useState([ // Estado que almacena los productos disponibles.
    { id_producto: 101, id_categoria: 1, categoria_nombre: 'Helados La Cascarie', nombre: 'Helado de Mojito', tipo: 'Postre', precio: 65 },
    { id_producto: 102, id_categoria: 2, categoria_nombre: 'Cócteles de Autor', nombre: 'Margarita Clásica', tipo: 'Bebida', precio: 90 }
  ]);

  // Historial con 1 VENTA por defecto
  const [ventas, setVentas] = useState([ // Estado que almacena el historial de ventas.
    {
      id_venta: 1,
      id_cliente: 1,
      cliente_nombre: 'Cliente Ejemplo',
      metodo_pago: 'Efectivo',
      fecha: new Date().toLocaleString('es-MX'), // Obtiene la fecha y hora actual con formato de México.
      total: 180.0,
      items: [
        { id_item: 1, id_producto: 102, nombre: 'Margarita Clásica', categoria: 'Cócteles de Autor', tipo: 'Bebida', cantidad: 2, precio: 90, subtotal: 180 }
      ]
    }
  ]);

  const [mostrarModal, setMostrarModal] = useState(false); // Controla si se muestra el formulario de venta.

  const handleGuardarVenta = (nuevaVenta) => { // Recibe los datos de la nueva venta.
    const ventaCompleta = { // Crea el objeto con toda la información de la venta.
      id_venta: Date.now(), // Genera un identificador basado en la fecha y hora actual.
      ...nuevaVenta // Agrega los datos recibidos del formulario.
    };
    setVentas([ventaCompleta, ...ventas]); // Agrega la nueva venta al inicio del historial.
  };

  const handleEliminarVenta = (id_venta) => { // Recibe el ID de la venta que se desea eliminar.
    setVentas(ventas.filter((v) => v.id_venta !== id_venta)); // Conserva las ventas con un ID diferente.
  };

  return (
    <div className="venta-container"> {/* Contenedor principal de la sección de ventas. */}
      <div className="venta-header">
        <h2>Gestión de Ventas</h2>
        <button className="btn-agregar" onClick={() => setMostrarModal(true)}> {/* Abre el formulario para registrar una venta. */}
          <Plus size={18} /> Nueva Venta
        </button>
      </div>

      <div className="venta-tabla-wrapper"> {/* Contenedor de la tabla de ventas. */}
        <table className="tabla-ventas"> {/* Tabla donde se muestra el historial de ventas. */}
          <thead> {/* Encabezado de la tabla. */}
            <tr>
              <th>Folio</th>
              <th>Fecha</th>
              <th>Cliente</th>
              <th>Método de Pago</th>
              <th>Total</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody> {/* Contenido de la tabla. */}
            {ventas.map((venta) => ( // Recorre el historial para mostrar cada venta.
              <tr key={venta.id_venta}> {/* Crea una fila identificada por el ID de la venta. */}
                <td>#{venta.id_venta}</td> {/* Muestra el folio de la venta. */}
                <td>{venta.fecha}</td> {/* Muestra la fecha de la venta. */}
                <td>{venta.cliente_nombre}</td> {/* Muestra el nombre del cliente. */}
                <td>
                  <span className={`badge-pago ${venta.metodo_pago.toLowerCase()}`}> {/* Aplica una clase CSS según el método de pago. */}
                    {venta.metodo_pago} {/* Muestra el método de pago utilizado. */}
                  </span>
                </td>
                <td><strong>${venta.total.toFixed(2)}</strong></td> {/* Muestra el total de la venta con dos decimales. */}
                <td>
                  <div className="tabla-acciones"> {/* Contenedor del botón de acciones. */}
                    <button
                      className="btn-accion btn-eliminar"
                      onClick={() => handleEliminarVenta(venta.id_venta)} // Elimina la venta seleccionada.
                      title="Eliminar venta"
                    >
                      <Trash2 size={16} /> {/* Muestra el icono de eliminar. */}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <FormularioVenta
        mostrarModal={mostrarModal} // Indica si el formulario está visible.
        onClose={() => setMostrarModal(false)} // Cierra el formulario.
        onSave={handleGuardarVenta} // Ejecuta la función para guardar la venta.
        clientes={clientes} // Envía la lista de clientes al formulario.
        categorias={categorias} // Envía la lista de categorías al formulario.
        productos={productos} // Envía la lista de productos al formulario.
      />
    </div>
  );
}

export default Ventas; // Exporta el componente para utilizarlo en otros archivos.