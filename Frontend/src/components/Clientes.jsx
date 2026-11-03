
import React, { useState } from 'react'; // Importa React y useState para manejar estados.
import { Edit, Plus, Trash2 } from 'lucide-react'; // Importa los iconos de editar, agregar y eliminar.
import FormularioCliente from './Modals/FormularioCliente'; // Importa el formulario de clientes.
import './Clientes.css'; // Importa los estilos CSS.

function Clientes() {
  // Estado inicial con UN SOLO cliente por defecto
  const [clientes, setClientes] = useState([ // Estado que almacena la lista de clientes.
    {
      id_cliente: 1,
      nombre: 'Cliente Ejemplo',
      email: 'cliente@ejemplo.com',
      telefono: '555-0100',
      empresa: 'Empresa Base S.A.'
    }
  ]);

  const [mostrarModal, setMostrarModal] = useState(false); // Controla si se muestra el formulario.
  const [clienteEditando, setClienteEditando] = useState(null); // Guarda el cliente que se está editando.

  const abrirModalCrear = () => { // Abre el formulario para crear un cliente.
    setClienteEditando(null); // Limpia el cliente seleccionado.
    setMostrarModal(true); // Muestra el formulario.
  };

  const abrirModalEditar = (cliente) => { // Abre el formulario para editar un cliente.
    setClienteEditando(cliente); // Guarda el cliente seleccionado.
    setMostrarModal(true); // Muestra el formulario.
  };

  const handleGuardar = (data) => { // Recibe los datos del formulario.
    if (clienteEditando) { // Comprueba si se está editando un cliente.
      setClientes(
        clientes.map((cli) => // Recorre todos los clientes.
          cli.id_cliente === clienteEditando.id_cliente // Comprueba si coincide el ID.
            ? { ...cli, ...data } // Actualiza los datos del cliente seleccionado.
            : cli // Conserva los demás clientes.
        )
      );
    } else {
      const nuevoCliente = { // Crea un nuevo objeto de cliente.
        id_cliente: Date.now(), // Genera un identificador basado en la fecha y hora actual.
        ...data // Agrega los datos recibidos del formulario.
      };
      setClientes([...clientes, nuevoCliente]); // Agrega el nuevo cliente a la lista.
    }
  };

  const handleEliminar = (id_cliente) => { // Recibe el ID del cliente que se eliminará.
    setClientes(clientes.filter((cli) => cli.id_cliente !== id_cliente)); // Conserva los clientes con un ID diferente.
  };

  return (
    <div className="cliente-container"> {/* Contenedor principal de la sección. */}
      <div className="cliente-header">
        <h2>Gestión de Clientes</h2>
        <button className="btn-agregar" onClick={abrirModalCrear}> {/* Botón para agregar un cliente. */}
          <Plus size={18} /> Nuevo Cliente
        </button>
      </div>

      <div className="cliente-tabla-wrapper"> {/* Contenedor de la tabla de clientes. */}
        <table className="tabla-clientes"> {/* Tabla donde se muestran los clientes. */}
          <thead> {/* Encabezado de la tabla. */}
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Empresa</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody> {/* Contenido de la tabla. */}
            {clientes.map((cliente) => ( // Recorre la lista para mostrar cada cliente.
              <tr key={cliente.id_cliente}> {/* Crea una fila identificada por el ID del cliente. */}
                <td>#{cliente.id_cliente}</td> {/* Muestra el identificador. */}
                <td>{cliente.nombre}</td> {/* Muestra el nombre. */}
                <td>{cliente.email}</td> {/* Muestra el correo electrónico. */}
                <td>{cliente.telefono || '-'}</td> {/* Muestra el teléfono o un guion si está vacío. */}
                <td>{cliente.empresa || '-'}</td> {/* Muestra la empresa o un guion si está vacía. */}
                <td>
                  <div className="tabla-acciones"> {/* Contenedor de los botones de acciones. */}
                    <button
                      className="btn-accion btn-editar"
                      onClick={() => abrirModalEditar(cliente)} // Abre el formulario con los datos del cliente.
                      title="Editar"
                    >
                      <Edit size={16} /> {/* Muestra el icono de editar. */}
                    </button>
                    <button
                      className="btn-accion btn-eliminar"
                      onClick={() => handleEliminar(cliente.id_cliente)} // Elimina el cliente seleccionado.
                      title="Eliminar"
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

      <FormularioCliente
        mostrarModal={mostrarModal} // Indica si el formulario está visible.
        onClose={() => setMostrarModal(false)} // Cierra el formulario.
        onSave={handleGuardar} // Ejecuta la función para guardar los datos.
        clienteEditando={clienteEditando} // Envía el cliente seleccionado o null si es nuevo.
      />
    </div>
  );
}

export default Clientes; // Exporta el componente para utilizarlo en otros archivos.
