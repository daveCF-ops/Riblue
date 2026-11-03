/* eslint-disable */
import React, { useState, useEffect } from 'react';
import '../Categorias.css';
import { Trash2, Plus } from 'lucide-react';

export default function FormularioPedido({ mostrarModal, onClose, onSave, proveedores }) {
  const [proveedor, setProveedor] = useState('');
  const [fechaEntrega, setFechaEntrega] = useState('');
  const [horaEntrega, setHoraEntrega] = useState('12:00');
  
  const [nombreInsumo, setNombreInsumo] = useState('');
  const [costoTotal, setCostoTotal] = useState('');
  const [tipoEmpaque, setTipoEmpaque] = useState('Caja');
  const [cantidadCajas, setCantidadCajas] = useState('1');
  const [piezasPorCaja, setPiezasPorCaja] = useState('12');
  const [contenidoCaja, setContenidoCaja] = useState('Botella');
  const [medida, setMedida] = useState('750 ml');
  const [cantidadPiezas, setCantidadPiezas] = useState('1');
  const [carrito, setCarrito] = useState([]);

  const fechaPedidoAuto = new Date().toLocaleDateString('es-MX') + ' a las ' + new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' });

  // GENERAMOS LAS HORAS CERRADAS
  const opcionesHoras = [];
  for (let i = 6; i <= 23; i++) {
    opcionesHoras.push(i.toString().padStart(2, '0') + ':00');
  }

  useEffect(() => {
    if (proveedores && proveedores.length > 0) setProveedor(proveedores[0].empresa);
  }, [proveedores, mostrarModal]);

  if (!mostrarModal) return null;

  const agregarAlCarrito = () => {
    if (!nombreInsumo || !costoTotal) return alert('Escribe el nombre y el costo del insumo');

    let textoUnidadFinal = '';
    if (tipoEmpaque === 'Caja') {
      textoUnidadFinal = `${cantidadCajas} Caja(s) de ${piezasPorCaja} ${contenidoCaja}(s) (${medida} c/u)`;
    } else {
      textoUnidadFinal = `${cantidadPiezas} ${tipoEmpaque}(s) suelta(s) - ${medida}`;
    }

    const nuevoItem = {
      id: Date.now(),
      nombre: nombreInsumo,
      costo: parseFloat(costoTotal),
      unidad: textoUnidadFinal
    };

    setCarrito([...carrito, nuevoItem]);
    setNombreInsumo('');
    setCostoTotal('');
    setCantidadCajas('1');
    setCantidadPiezas('1');
  };

  const eliminarDelCarrito = (id) => {
    setCarrito(carrito.filter(item => item.id !== id));
  };

  const manejarSubmit = (e) => {
    e.preventDefault();
    if (carrito.length === 0) return alert('Agrega al menos un producto al pedido');

    const costoTotalPedido = carrito.reduce((sum, item) => sum + item.costo, 0);

    const nuevoPedido = {
      id: Date.now(),
      proveedor,
      fechaPedido: fechaPedidoAuto,
      fechaEntrega: fechaEntrega ? `${fechaEntrega} a las ${horaEntrega}` : 'Pendiente',
      productos: carrito,
      costoTotal: costoTotalPedido,
      estado: 'En tránsito'
    };

    onSave(nuevoPedido);
  };

  return (
    <div className="modal-overlay" style={{ alignItems: 'flex-start', overflowY: 'auto', padding: '20px' }}>
      <div className="modal-content" style={{ maxWidth: '700px', padding: '32px', margin: 'auto' }}>
        
        <div className="modal-header" style={{ marginBottom: '24px' }}>
          <h3 style={{ margin: 0 }}>Agendar Pedido a Proveedor</h3>
        </div>
        
        <form onSubmit={manejarSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <div className="form-group" style={{ flex: 1, minWidth: '200px' }}>
              <label>Proveedor</label>
              <select value={proveedor} onChange={(e) => setProveedor(e.target.value)} required>
                {proveedores && proveedores.map(p => <option key={p.id} value={p.empresa}>{p.empresa}</option>)}
              </select>
            </div>
            <div className="form-group" style={{ flex: 1, minWidth: '150px' }}>
              <label>Fecha de entrega</label>
              <input type="date" value={fechaEntrega} onChange={(e) => setFechaEntrega(e.target.value)} required />
            </div>
            
            {/* SELECT DE HORAS CERRADAS */}
            <div className="form-group" style={{ flex: 1, minWidth: '100px' }}>
              <label>Hora de entrega</label>
              <select value={horaEntrega} onChange={(e) => setHoraEntrega(e.target.value)} required>
                {opcionesHoras.map(h => <option key={h} value={h}>{h} hrs</option>)}
              </select>
            </div>
          </div>

          <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <h4 style={{ margin: '0 0 12px 0', fontSize: '0.9rem', color: '#1e293b' }}>Agregar producto al pedido</h4>
            
            <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
              <div className="form-group" style={{ flex: 2 }}>
                <label>Nombre del insumo</label>
                <input type="text" placeholder="Ej. Tequila Reposado..." value={nombreInsumo} onChange={(e) => setNombreInsumo(e.target.value.toUpperCase())} />
              </div>
              <div className="form-group" style={{ flex: 1 }}>
                <label>Costo ($)</label>
                <input type="number" step="0.01" placeholder="0.00" value={costoTotal} onChange={(e) => setCostoTotal(e.target.value)} />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '12px' }}>
              <label>¿Cómo lo pediste?</label>
              <select value={tipoEmpaque} onChange={(e) => setTipoEmpaque(e.target.value)}>
                <option value="Caja">Por Caja / Empaque</option>
                <option value="Botella">piezas sueltas</option>
              </select>
            </div>

            {tipoEmpaque === 'Caja' ? (
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '12px' }}>
                <div className="form-group" style={{ flex: 1 }}>
                  <label>Cantidad de cajas</label>
                  <input type="number" min="1" value={cantidadCajas} onChange={(e) => setCantidadCajas(e.target.value)} />
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <label>Piezas por caja</label>
                  <select value={piezasPorCaja} onChange={(e) => setPiezasPorCaja(e.target.value)}>
                    <option value="3">3 piezas</option>
                    <option value="4">4 piezas</option>
                    <option value="6">6 piezas</option>
                    <option value="12">12 piezas</option>
                    <option value="24">24 piezas</option>
                  </select>
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <label>¿Qué contiene?</label>
                  <select value={contenidoCaja} onChange={(e) => setContenidoCaja(e.target.value)}>
                    <option value="Botella">Botellas</option>
                    <option value="Lata">Latas</option>
                  </select>
                </div>
              </div>
            ) : (
              <div className="form-group" style={{ marginBottom: '12px' }}>
                <label>Cantidad de {tipoEmpaque.toLowerCase()}s sueltas</label>
                <input type="number" min="1" value={cantidadPiezas} onChange={(e) => setCantidadPiezas(e.target.value)} />
              </div>
            )}

            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end' }}>
              <div className="form-group" style={{ flex: 1 }}>
                <label>Medida</label>
                <input type="text" value={medida} onChange={(e) => setMedida(e.target.value)} placeholder="Ej. 750 ml" />
              </div>
              <button type="button" onClick={agregarAlCarrito} className="btn-agregar" style={{ padding: '10px 16px', height: 'fit-content' }}>
                <Plus size={18} /> Agregar
              </button>
            </div>
          </div>

          {carrito.length > 0 && (
            <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead style={{ background: '#f8fafc' }}>
                  <tr>
                    <th style={{ padding: '10px', fontSize: '0.85rem', color: '#475569' }}>Insumo</th>
                    <th style={{ padding: '10px', fontSize: '0.85rem', color: '#475569' }}>Formato</th>
                    <th style={{ padding: '10px', fontSize: '0.85rem', color: '#475569' }}>Costo</th>
                    <th style={{ padding: '10px', fontSize: '0.85rem', color: '#475569' }}>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {carrito.map(item => (
                    <tr key={item.id} style={{ borderTop: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '10px', fontSize: '0.9rem', fontWeight: '500' }}>{item.nombre}</td>
                      <td style={{ padding: '10px', fontSize: '0.85rem', color: '#64748b' }}>{item.unidad}</td>
                      <td style={{ padding: '10px', fontSize: '0.9rem' }}>${item.costo.toFixed(2)}</td>
                      <td style={{ padding: '10px' }}>
                        <button type="button" onClick={() => eliminarDelCarrito(item.id)} style={{ background: '#fee2e2', border: 'none', borderRadius: '4px', padding: '6px', cursor: 'pointer', color: '#ef4444' }}>
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div style={{ padding: '12px', background: '#f8fafc', textAlign: 'right', fontWeight: 'bold', color: '#1e293b' }}>
                Total del Pedido: ${carrito.reduce((sum, item) => sum + item.costo, 0).toFixed(2)}
              </div>
            </div>
          )}

          <div className="modal-footer" style={{ marginTop: '16px' }}>
            <button type="button" className="btn-cancelar" onClick={onClose}>Cancelar</button>
            <button type="submit" className="btn-guardar" disabled={carrito.length === 0}>Agendar Pedido</button>
          </div>
        </form>
      </div>
    </div>
  );
}