/* eslint-disable */
import { useState, useEffect } from 'react';

export default function FormularioProducto({ onGuardar, onCerrar, catalogo, productosActuales }) {
  const [nombreSeleccionado, setNombreSeleccionado] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');
  const [stockMinimo, setStockMinimo] = useState('5');
  
  const [infoInsumo, setInfoInsumo] = useState(null);
  const [costoPorPieza, setCostoPorPieza] = useState(0);

  useEffect(() => {
    if (nombreSeleccionado) {
      const insumoEncontrado = catalogo.find(c => c.nombre === nombreSeleccionado);
      setInfoInsumo(insumoEncontrado);
      
      if (insumoEncontrado) {
        let costoPieza = insumoEncontrado.costo || 0;
        let piezasTotales = 0;

        if (insumoEncontrado.unidad.includes('Caja(s) de')) {
          const match = insumoEncontrado.unidad.match(/de (\d+) (?:Botella|Lata)\(s\)/);
          const piezasPorCaja = match ? parseInt(match[1]) : 1;
          
          const matchCajas = insumoEncontrado.unidad.match(/^(\d+) Caja/);
          const cantidadCajas = matchCajas ? parseInt(matchCajas[1]) : 1;
          
          piezasTotales = piezasPorCaja * cantidadCajas;
          costoPieza = costoPieza / piezasTotales;
        } else {
          piezasTotales = 1; 
        }

        setCostoPorPieza(costoPieza);
        setStock(piezasTotales.toString());
      }
    } else {
      setInfoInsumo(null);
      setCostoPorPieza(0);
      setStock('');
    }
  }, [nombreSeleccionado, catalogo]);

  const calcularPrecioSugerido = () => {
    const sugerido = costoPorPieza * 1.35;
    setPrecio(sugerido.toFixed(2));
  };

  const manejarSubmit = (e) => {
    e.preventDefault();
    if (!nombreSeleccionado || !precio) return alert('El producto y el precio son obligatorios');
    
    // 1. Eliminamos el insumo del almacén
    const almacenActual = JSON.parse(localStorage.getItem('catalogo')) || [];
    const almacenActualizado = almacenActual.filter(item => item.nombre !== nombreSeleccionado);
    localStorage.setItem('catalogo', JSON.stringify(almacenActualizado));

    // 2. Lógica de agrupación en la barra
    const precioNum = parseFloat(precio);
    const stockNum = parseInt(stock) || 0;
    const unidadStr = infoInsumo ? infoInsumo.unidad : 'uds';

    // Buscamos si ya existe uno idéntico (mismo nombre, misma unidad, mismo precio)
    const productoExistente = productosActuales.find(
      (p) => p.nombre === nombreSeleccionado && p.unidad === unidadStr && p.precio === precioNum
    );

    let productoParaGuardar;

    if (productoExistente) {
      // Si existe, sumamos el stock
      productoParaGuardar = {
        ...productoExistente,
        stock: productoExistente.stock + stockNum
      };
    } else {
      // Si no existe (o tiene diferente precio), lo creamos nuevo
      productoParaGuardar = {
        id: Date.now(),
        nombre: nombreSeleccionado,
        precio: precioNum,
        stock: stockNum,
        stockMinimo: parseInt(stockMinimo) || 0,
        categoria: infoInsumo ? infoInsumo.tipo : 'General', 
        unidad: unidadStr,
        proveedor: infoInsumo ? infoInsumo.proveedor : ''
      };
    }

    onGuardar(productoParaGuardar, !!productoExistente); // Mandamos si fue actualización o nuevo
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
      <div style={{ background: 'white', padding: '28px', borderRadius: '12px', width: '100%', maxWidth: '450px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
        <h3 style={{ marginTop: 0, color: 'var(--azul-oscuro)', marginBottom: '20px' }}>Surtir a la Barra</h3>
        
        <form onSubmit={manejarSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div>
            <label style={{ fontSize: '0.9rem', fontWeight: '600' }}>Selecciona un insumo del almacén:</label>
            <select value={nombreSeleccionado} onChange={(e) => setNombreSeleccionado(e.target.value)} style={inputStyle} required>
              <option value="">-- Selecciona --</option>
              {catalogo.length > 0 ? (
                catalogo.map(c => (
                  <option key={c.id} value={c.nombre}>{c.nombre} ({c.unidad})</option>
                ))
              ) : (
                <option value="" disabled>No hay insumos registrados.</option>
              )}
            </select>
          </div>

          {infoInsumo && (
            <div style={{ background: 'var(--fondo-pagina)', padding: '12px', borderRadius: '8px', border: '1px solid var(--borde)', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: 'var(--tinta-suave)' }}>Costo por pieza:</span>
                <strong style={{ color: 'var(--azul-oscuro)' }}>${costoPorPieza.toFixed(2)}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--tinta-suave)' }}>Proveedor:</span>
                <span>{infoInsumo.proveedor || '-'}</span>
              </div>
            </div>
          )}
          
          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <label style={{ fontSize: '0.85rem', color: 'var(--tinta-suave)' }}>Precio Venta ($)</label>
                {costoPorPieza > 0 && (
                  <button 
                    type="button" 
                    onClick={calcularPrecioSugerido}
                    style={{ fontSize: '0.75rem', background: 'none', border: 'none', color: '#1e8e3e', cursor: 'pointer', fontWeight: 'bold' }}
                  >
                    Sugerido (35%): ${(costoPorPieza * 1.35).toFixed(2)}
                  </button>
                )}
              </div>
              <input type="number" placeholder="0.00" value={precio} onChange={(e) => setPrecio(e.target.value)} style={inputStyle} step="0.01" required />
            </div>
            
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: '0.85rem', color: 'var(--tinta-suave)' }}>Stock a surtir</label>
              <input type="number" placeholder="0" value={stock} onChange={(e) => setStock(e.target.value)} style={inputStyle} />
            </div>
          </div>

          <div>
            <label style={{ fontSize: '0.85rem', color: 'var(--tinta-suave)' }}>Alerta de stock mínimo</label>
            <input type="number" value={stockMinimo} onChange={(e) => setStockMinimo(e.target.value)} style={inputStyle} />
          </div>
          
          <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
            <button type="button" onClick={onCerrar} style={{ flex: 1, padding: '12px', background: '#e0e0e0', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>Cancelar</button>
            <button type="submit" className="boton" style={{ flex: 1, padding: '12px' }}>Surtir Producto</button>
          </div>
        </form>
      </div>
    </div>
  );
}

const inputStyle = { padding: '10px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '1rem', width: '100%', boxSizing: 'border-box' };