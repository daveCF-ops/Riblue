/* eslint-disable */
import React, { useState } from 'react';
import { Edit, Plus, Trash2 } from 'lucide-react';
import FormularioProveedor from './Modals/FormularioProveedor';
import FormularioPedido from './Modals/FormularioPedido';
import DetallePedido from './Modals/DetallePedido'; // Importa el modal de detalles
import './Proveedores.css';

function Proveedores() {
  const [proveedores, setProveedores] = useState([
    { id: 1, empresa: 'Distribuidora La Europea', contacto: 'Carlos Ruiz', telefono: '555-999-888' }
  ]);
  
  const [mostrarModal, setMostrarModal] = useState(false);
  const [proveedorEditando, setProveedorEditando] = useState(null);
  const [pedidoDetalle, setPedidoDetalle] = useState(null);

  // Pedido de ejemplo predeterminado
  const [pedidos, setPedidos] = useState([
    {
      id: 1,
      proveedor: 'Distribuidora La Europea',
      fechaPedido: '03/11/2026 a las 10:00 a.m.',
      fechaEntrega: '05/11/2026 a las 12:00 p.m.',
      productos: [
        { id: 101, nombre: 'TEQUILA CENTENARIO', costo: 4444.00, unidad: '1 Caja(s) de 12 Botella(s) (750 ml c/u)' },
        { id: 102, nombre: 'OSO VERDE', costo: 6670.00, unidad: '1 Caja(s) de 12 Botella(s) (1.750 ml c/u)' }
      ],
      costoTotal: 11114.00,
      estado: 'En tránsito'
    }
  ]);
  
  const [mostrarModalPedido, setMostrarModalPedido] = useState(false);

  const abrirModalCrear = () => { setProveedorEditando(null); setMostrarModal(true); };
  const abrirModalEditar = (prov) => { setProveedorEditando(prov); setMostrarModal(true); };

  const handleGuardar = (data) => {
    if (proveedorEditando) {
      setProveedores(proveedores.map(p => p.id === proveedorEditando.id ? { ...p, ...data } : p));
    } else {
      setProveedores([...proveedores, { id: Date.now(), ...data }]);
    }
    setMostrarModal(false);
  };

  const handleEliminar = (id) => {
    if (window.confirm('¿Eliminar este proveedor?')) {
      setProveedores(proveedores.filter(p => p.id !== id));
    }
  };

  const handleGuardarPedido = (nuevoPedido) => {
    setPedidos([...pedidos, nuevoPedido]);
    setMostrarModalPedido(false);
  };

  return (
    <div className="proveedor-container">
      {/* ENCABEZADO CON DOS BOTONES */}
      <div className="proveedor-header">
        <h2>Gestión de Proveedores</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn-agregar" onClick={abrirModalCrear} style={{ background: '#fff', color: '#2563eb', border: '1px solid #2563eb' }}>
            <Plus size={18} /> Nuevo Proveedor
          </button>
          <button className="btn-agregar" onClick={() => setMostrarModalPedido(true)}>
            <Plus size={18} /> Registrar Pedido
          </button>
        </div>
      </div>

      {/* TABLA DE PROVEEDORES */}
      <div className="tabla-container">
        <table className="tabla-proveedores">
          <thead>
            <tr><th>Empresa</th><th>Contacto</th><th>Teléfono</th><th>Acciones</th></tr>
          </thead>
          <tbody>
            {proveedores.map((p) => (
              <tr key={p.id}>
                <td>{p.empresa}</td>
                <td>{p.contacto}</td>
                <td>{p.telefono}</td>
                <td className="acciones">
                  <button className="btn-accion btn-editar" onClick={() => abrirModalEditar(p)}><Edit size={16} /></button>
                  <button className="btn-accion btn-eliminar" onClick={() => handleEliminar(p.id)}><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* SECCIÓN DE PEDIDOS AGENDADOS */}
      <div style={{ marginTop: '40px' }}>
        <h3 style={{ color: '#1e293b', marginBottom: '16px' }}>Pedidos Agendados</h3>
        {pedidos.length === 0 ? (
          <p style={{ color: '#64748b' }}>No hay pedidos agendados.</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
            {pedidos.map(pedido => (
              <div key={pedido.id} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <strong style={{ color: '#1e293b' }}>Pedido a {pedido.proveedor}</strong>
                  <span style={{ fontSize: '0.75rem', background: '#fef3c7', color: '#92400e', padding: '2px 8px', borderRadius: '12px', fontWeight: '600' }}>
                    {pedido.estado}
                  </span>
                </div>

                <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '8px' }}>
                  <span>Llega: <strong>{pedido.fechaEntrega}</strong></span>
                </div>

                <ul style={{ listStyle: 'none', padding: '0', margin: '0 0 8px 0', borderTop: '1px solid #e2e8f0', paddingTop: '8px' }}>
                  {pedido.productos && pedido.productos.map(prod => (
                    <li key={prod.id} style={{ fontSize: '0.8rem', color: '#475569', marginBottom: '4px' }}>
                      • {prod.nombre} <span style={{ color: '#94a3b8' }}>({prod.unidad})</span>
                    </li>
                  ))}
                </ul>

                <div style={{ textAlign: 'right', fontWeight: 'bold', fontSize: '0.9rem', color: '#1e293b', borderTop: '1px solid #e2e8f0', paddingTop: '8px' }}>
                  Total: ${pedido.costoTotal ? pedido.costoTotal.toFixed(2) : '0.00'}
                </div>

                {/* BOTÓN DE VER DETALLES */}
                <button 
                  onClick={() => setPedidoDetalle(pedido)}
                  style={{ width: '100%', marginTop: '12px', padding: '8px', background: '#f1f5f9', color: '#1e293b', border: '1px solid #cbd5e1', borderRadius: '6px', cursor: 'pointer', fontWeight: '500', fontSize: '0.85rem' }}
                >
                  Ver detalles
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MODAL DE PROVEEDOR */}
      <FormularioProveedor 
        mostrarModal={mostrarModal} 
        onClose={() => setMostrarModal(false)} 
        onSave={handleGuardar} 
        proveedorEditando={proveedorEditando} 
      />

      {/* MODAL DE PEDIDO */}
      <FormularioPedido 
        mostrarModal={mostrarModalPedido}
        onClose={() => setMostrarModalPedido(false)}
        onSave={handleGuardarPedido}
        proveedores={proveedores}
      />

      {/* MODAL DE DETALLES DEL PEDIDO */}
      <DetallePedido 
        mostrarModal={!!pedidoDetalle}
        onClose={() => setPedidoDetalle(null)}
        pedido={pedidoDetalle}
      />
    </div>
  );
}
export default Proveedores;
