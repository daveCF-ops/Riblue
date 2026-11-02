import { useState } from 'react';

export default function FormularioSurtir({ onGuardar, onCerrar, inventarioAlmacen }) {
  const [insumoSeleccionado, setInsumoSeleccionado] = useState('');
  const [cantidadASurtir, setCantidadASurtir] = useState('1');
  const [precioVenta, setPrecioVenta] = useState('');

  const manejarSubmit = (e) => {
    e.preventDefault();
    if (!insumoSeleccionado || !precioVenta) return alert('Selecciona un insumo y pon el precio de venta');

    const insumoInfo = inventarioAlmacen.find(i => i.nombre === insumoSeleccionado);

    // Creamos el producto para la barra
    const nuevoProductoBarra = {
      id: Date.now(),
      nombre: insumoSeleccionado,
      precio: parseFloat(precioVenta),
      stock: parseInt(cantidadASurtir) || 1,
      stockMinimo: 2,
      categoria: insumoInfo.tipo,
      unidad: insumoInfo.unidad
    };

    onGuardar(nuevoProductoBarra);
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
      <div style={{ background: 'white', padding: '28px', borderRadius: '12px', width: '100%', maxWidth: '450px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
        <h3 style={{ marginTop: 0, color: 'var(--azul-oscuro)' }}>Surtir a la Barra</h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--tinta-suave)', marginBottom: '20px' }}>
          Saca producto del almacén para venderlo en el punto de venta.
        </p>

        <form onSubmit={manejarSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: '600' }}>Selecciona del Almacén:</label>
            <select value={insumoSeleccionado} onChange={(e) => setInsumoSeleccionado(e.target.value)} style={inputStyle} required>
              <option value="">-- Selecciona --</option>
              {inventarioAlmacen.map(item => (
                <option key={item.id} value={item.nombre}>{item.nombre} ({item.unidad})</option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: '0.85rem', color: 'var(--tinta-suave)' }}>Cantidad a surtir</label>
              <input type="number" min="1" value={cantidadASurtir} onChange={(e) => setCantidadASurtir(e.target.value)} style={inputStyle} required />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: '0.85rem', color: 'var(--tinta-suave)' }}>Precio de Venta ($)</label>
              <input type="number" step="0.01" value={precioVenta} onChange={(e) => setPrecioVenta(e.target.value)} style={inputStyle} required />
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <button type="button" onClick={onCerrar} style={{ flex: 1, padding: '12px', background: '#e0e0e0', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>Cancelar</button>
            <button type="submit" className="boton" style={{ flex: 1, padding: '12px' }}>Surtir a Barra</button>
          </div>
        </form>
      </div>
    </div>
  );
}

const inputStyle = { padding: '10px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '1rem', width: '100%', boxSizing: 'border-box' };