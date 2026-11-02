/* eslint-disable */
import { useState, useEffect } from 'react';
import Migas from './Migas';
import FormularioCliente from './Modals/FormularioCliente';
import { leerDatos, guardarDatos } from '../services/datos';

export default function Clientes({ irA }) {
  const [clientes, setClientes] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  // Cargar clientes al abrir la pantalla
  useEffect(() => {
    // Nos aseguramos de que siempre sea un array
    const datosGuardados = leerDatos('clientes');
    setClientes(Array.isArray(datosGuardados) ? datosGuardados : []);
  }, []);

  // Función que recibe el cliente del formulario
  const agregarCliente = (nuevoCliente) => {
    const listaActualizada = [...clientes, nuevoCliente];
    setClientes(listaActualizada);
    guardarDatos('clientes', listaActualizada);
    setMostrarFormulario(false);
  };

  return (
    <>
      <Migas partes={[{ texto: 'Inicio', onClick: () => irA('inicio') }, { texto: 'Clientes' }]} />
      
      {/* Encabezado de la pantalla */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
        <div>
          <h2 className="titulo" style={{ marginBottom: '4px' }}>Clientes</h2>
          <p className="subtitulo" style={{ margin: 0 }}>Contacto y dirección de entrega</p>
        </div>
        <button className="boton" onClick={() => setMostrarFormulario(true)}>
          + Agregar Cliente
        </button>
      </div>

      {/* Tabla */}
      <div style={{ overflowX: 'auto', marginTop: '24px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
          <thead style={{ background: 'var(--fondo-pagina)', textAlign: 'left', borderBottom: '2px solid var(--borde)' }}>
            <tr>
              <th style={{ padding: '14px 16px', fontWeight: '600' }}>Nombre</th>
              <th style={{ padding: '14px 16px', fontWeight: '600' }}>Teléfono</th>
              <th style={{ padding: '14px 16px', fontWeight: '600' }}>Email</th>
              <th style={{ padding: '14px 16px', fontWeight: '600' }}>Ciudad</th>
            </tr>
          </thead>
          <tbody>
            {clientes.length > 0 ? (
              clientes.map((c) => (
                <tr key={c.id} style={{ borderTop: '1px solid var(--borde)', transition: 'background 0.2s' }}>
                  <td style={{ padding: '12px 16px', fontWeight: '500' }}>{c.nombre}</td>
                  <td style={{ padding: '12px 16px', color: 'var(--tinta-suave)' }}>{c.telefono || '-'}</td>
                  <td style={{ padding: '12px 16px', color: 'var(--tinta-suave)' }}>{c.email || '-'}</td>
                  <td style={{ padding: '12px 16px', color: 'var(--tinta-suave)' }}>{c.ciudad || '-'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ padding: '30px', textAlign: 'center', color: 'var(--tinta-suave)' }}>
                  No hay clientes registrados aún.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* El modal se muestra solo si mostrarFormulario es true */}
      {mostrarFormulario && (
        <FormularioCliente 
          onGuardar={agregarCliente} 
          onCerrar={() => setMostrarFormulario(false)} 
        />
      )}
    </>
  );
}