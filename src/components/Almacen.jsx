/* eslint-disable */
import { useState, useEffect } from 'react';
import Migas from './Migas';
import { leerDatos, guardarDatos } from '../services/datos';

export default function Almacen({ irA }) {
  const [inventario, setInventario] = useState([]);
  const [itemAEliminar, setItemAEliminar] = useState(null); 

  useEffect(() => {
    const datos = leerDatos('catalogo');
    setInventario(Array.isArray(datos) ? datos : []);
  }, []);

  const confirmarEliminar = () => {
    if (itemAEliminar) {
      const listaFiltrada = inventario.filter(item => item.id !== itemAEliminar.id);
      setInventario(listaFiltrada);
      guardarDatos('catalogo', listaFiltrada); 
      setItemAEliminar(null); 
    }
  };

  // --- FUNCIÓN PARA CALCULAR EL STOCK TOTAL ---
  const calcularStockTotal = (unidad) => {
    if (!unidad) return 1;
    
    // Si es una caja, buscamos cuántas cajas y cuántas piezas trae cada una
    if (unidad.includes('Caja(s) de')) {
      // Expresión regular para extraer la cantidad de cajas y piezas
      // Busca algo como "2 Caja(s) de 12 Botella(s)"
      const matchCajas = unidad.match(/^(\d+)\s+Caja/);
      const matchPiezas = unidad.match(/de\s+(\d+)\s+(?:Botella|Lata)/);
      
      const cajas = matchCajas ? parseInt(matchCajas[1]) : 1;
      const piezasPorCaja = matchPiezas ? parseInt(matchPiezas[1]) : 1;
      
      return cajas * piezasPorCaja;
    }
    
    // Si es botella o lata suelta, busca el número al inicio
    const matchSuelto = unidad.match(/^(\d+)/);
    return matchSuelto ? parseInt(matchSuelto[1]) : 1;
  };

  return (
    <>
      <Migas partes={[{ texto: 'Inicio', onClick: () => irA('inicio') }, { texto: 'Almacén' }]} />
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
        <div>
          <h2 className="titulo" style={{ marginBottom: '4px' }}>Almacén Central</h2>
          <p className="subtitulo" style={{ margin: 0 }}>Inventario recibido de proveedores (Cajas y botellas cerradas)</p>
        </div>
      </div>

      <div style={{ overflowX: 'auto', marginTop: '24px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
          <thead style={{ background: 'var(--fondo-pagina)', textAlign: 'left', borderBottom: '2px solid var(--borde)' }}>
            <tr>
              <th style={{ padding: '14px 16px', fontWeight: '600' }}>Insumo</th>
              <th style={{ padding: '14px 16px', fontWeight: '600' }}>Proveedor</th>
              <th style={{ padding: '14px 16px', fontWeight: '600' }}>Formato de Compra</th>
              <th style={{ padding: '14px 16px', fontWeight: '600' }}>Stock Total</th> {/* NUEVA COLUMNA */}
              <th style={{ padding: '14px 16px', fontWeight: '600' }}>Costo</th>
              <th style={{ padding: '14px 16px', fontWeight: '600', textAlign: 'center' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {inventario.length > 0 ? (
              inventario.map((item) => (
                <tr key={item.id} style={{ borderTop: '1px solid var(--borde)' }}>
                  <td style={{ padding: '12px 16px', fontWeight: '500' }}>{item.nombre}</td>
                  <td style={{ padding: '12px 16px', color: 'var(--tinta-suave)' }}>{item.proveedor}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ background: '#e0f2fe', color: '#0369a1', padding: '4px 10px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '600' }}>
                      {item.unidad}
                    </span>
                  </td>
                  
                  {/* CELDA DEL STOCK TOTAL CALCULADO */}
                  <td style={{ padding: '12px 16px', fontWeight: '700', color: '#1e8e3e' }}>
                    {calcularStockTotal(item.unidad)} uds
                  </td>

                  <td style={{ padding: '12px 16px', fontWeight: '600', color: 'var(--azul-oscuro)' }}>
                    ${item.costo ? item.costo.toFixed(2) : '0.00'}
                  </td>
                  
                  <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                    <button 
                      onClick={() => setItemAEliminar(item)}
                      title="Eliminar del almacén"
                      style={{ background: '#fee2e2', border: 'none', cursor: 'pointer', padding: '6px 10px', borderRadius: '8px', transition: 'background 0.2s' }}
                      onMouseOver={(e) => e.currentTarget.style.background = '#fca5a5'}
                      onMouseOut={(e) => e.currentTarget.style.background = '#fee2e2'}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ padding: '30px', textAlign: 'center', color: 'var(--tinta-suave)' }}>El almacén está vacío. Registra insumos primero.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* --- VENTANA DE CONFIRMACIÓN PERSONALIZADA --- */}
      {itemAEliminar && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ background: 'white', padding: '24px', borderRadius: '12px', width: '100%', maxWidth: '400px', textAlign: 'center', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
            
            <div style={{ fontSize: '3rem', marginBottom: '10px' }}>⚠️</div>
            
            <h3 style={{ marginTop: 0, color: 'var(--azul-oscuro)' }}>¿Estás seguro?</h3>
            <p style={{ color: 'var(--tinta-suave)', marginBottom: '24px' }}>
              Estás a punto de eliminar <strong>"{itemAEliminar.nombre}"</strong> del almacén. Esta acción no se puede deshacer.
            </p>
            
            <div style={{ display: 'flex', gap: '10px' }}>
              <button 
                onClick={() => setItemAEliminar(null)} 
                style={{ flex: 1, padding: '12px', background: '#e0e0e0', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', color: '#333' }}
              >
                Deshacer
              </button>
              <button 
                onClick={confirmarEliminar} 
                style={{ flex: 1, padding: '12px', background: '#b91c1c', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', color: 'white' }}
              >
                Eliminar
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}