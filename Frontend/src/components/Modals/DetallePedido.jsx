
import React from 'react'; // Importa React para poder usar JSX.
import { X } from 'lucide-react'; // Importa el icono de cierre del modal.
import '../Categorias.css'; // Reutilizamos los estilos de Categorias.

export default function DetallePedido({ mostrarModal, onClose, pedido }) {
  // Si el modal no debe mostrarse o no hay pedido, no renderiza nada.
  if (!mostrarModal || !pedido) return null;

  return (
    // Overlay del modal: permite scroll si el contenido es alto.
    <div className="modal-overlay" style={{ alignItems: 'flex-start', overflowY: 'auto', padding: '20px' }}>
      {/* Contenedor principal del modal, con ancho máximo y sin padding interno para controlar secciones. */}
      <div className="modal-content" style={{ maxWidth: '600px', padding: '0', margin: 'auto' }}>
        
        {/* Encabezado del Modal: título, ID del pedido y botón de cierre. */}
        <div className="modal-header" style={{ padding: '20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ margin: 0, color: '#1e293b' }}>Detalles del Pedido</h3>
            <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: '#64748b' }}>ID: #{pedido.id}</p>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#64748b' }}>
            <X size={24} />
          </button>
        </div>

        {/* Cuerpo del Modal */}
        <div style={{ padding: '20px' }}>
          
          {/* Información general del pedido: proveedor, estado y fechas. */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
            <div>
              <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '600', textTransform: 'uppercase' }}>Proveedor</span>
              <p style={{ margin: '4px 0 0 0', fontWeight: '500', color: '#1e293b' }}>{pedido.proveedor}</p>
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '600', textTransform: 'uppercase' }}>Estado</span>
              <p style={{ margin: '4px 0 0 0' }}>
                {/* Etiqueta visual del estado del pedido. */}
                <span style={{ background: '#fef3c7', color: '#92400e', padding: '4px 10px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: '600' }}>
                  {pedido.estado}
                </span>
              </p>
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '600', textTransform: 'uppercase' }}>Fecha del Pedido</span>
              <p style={{ margin: '4px 0 0 0', fontSize: '0.9rem', color: '#475569' }}>{pedido.fechaPedido}</p>
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '600', textTransform: 'uppercase' }}>Fecha de Entrega</span>
              <p style={{ margin: '4px 0 0 0', fontSize: '0.9rem', color: '#475569' }}><strong>{pedido.fechaEntrega}</strong></p>
            </div>
          </div>

          {/* Tabla de Productos: muestra los insumos solicitados en el pedido. */}
          <h4 style={{ margin: '0 0 12px 0', fontSize: '1rem', color: '#1e293b', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px' }}>Productos solicitados</h4>
          <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead style={{ background: '#f8fafc' }}>
                <tr>
                  <th style={{ padding: '10px', fontSize: '0.8rem', color: '#64748b' }}>Insumo</th>
                  <th style={{ padding: '10px', fontSize: '0.8rem', color: '#64748b' }}>Formato</th>
                  <th style={{ padding: '10px', fontSize: '0.8rem', color: '#64748b', textAlign: 'right' }}>Costo</th>
                </tr>
              </thead>
              <tbody>
                {/* Renderiza los productos solo si existen; cada costo se formatea a dos decimales. */}
                {pedido.productos && pedido.productos.map(prod => (
                  <tr key={prod.id} style={{ borderTop: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '12px 10px', fontWeight: '500', color: '#1e293b' }}>{prod.nombre}</td>
                    <td style={{ padding: '12px 10px', fontSize: '0.85rem', color: '#64748b' }}>{prod.unidad}</td>
                    <td style={{ padding: '12px 10px', textAlign: 'right', fontWeight: '600', color: '#2563eb' }}>${prod.costo.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Total del pedido: usa 0.00 como valor por defecto si no existe costoTotal. */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', paddingTop: '16px', borderTop: '2px solid #e2e8f0' }}>
            <span style={{ fontSize: '1.1rem', fontWeight: '600', color: '#64748b' }}>Total del Pedido</span>
            <span style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1e293b' }}>
              ${pedido.costoTotal ? pedido.costoTotal.toFixed(2) : '0.00'}
            </span>
          </div>
        </div>

        {/* Footer del Modal: botón para cerrar el detalle. */}
        <div className="modal-footer" style={{ padding: '16px 20px', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end' }}>
          <button type="button" className="btn-cancelar" onClick={onClose} style={{ padding: '10px 20px' }}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}