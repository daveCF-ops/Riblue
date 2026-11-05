import { useState } from 'react'; // Importa el hook de estado (no usa React explícito porque no se requiere con el JSX runtime moderno).

export default function FormularioSurtir({ onGuardar, onCerrar, inventarioAlmacen }) {
  // --- Campos del formulario ---
  const [insumoSeleccionado, setInsumoSeleccionado] = useState(''); // Nombre del insumo elegido del almacén.
  const [cantidadASurtir, setCantidadASurtir] = useState('1'); // Cantidad que se manda a la barra.
  const [precioVenta, setPrecioVenta] = useState(''); // Precio al que se venderá en el punto de venta.

  const manejarSubmit = (e) => {
    e.preventDefault();
    // Valida que exista un insumo seleccionado y un precio antes de continuar.
    if (!insumoSeleccionado || !precioVenta) return alert('Selecciona un insumo y pon el precio de venta');

    // Busca la información del insumo en el inventario para heredar tipo y unidad.
    const insumoInfo = inventarioAlmacen.find(i => i.nombre === insumoSeleccionado);

    // Creamos el producto para la barra
    const nuevoProductoBarra = {
      id: Date.now(),
      nombre: insumoSeleccionado,
      precio: parseFloat(precioVenta), // Convierte el precio de string a número.
      stock: parseInt(cantidadASurtir) || 1, // Usa 1 como fallback si la cantidad no es válida.
      stockMinimo: 2,
      categoria: insumoInfo.tipo, // Hereda la categoría desde el insumo del almacén.
      unidad: insumoInfo.unidad // Hereda la unidad de medida del insumo.
    };

    onGuardar(nuevoProductoBarra);
  };

  return (
    // Overlay fijo que cubre toda la pantalla y centra el modal.
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
      <div style={{ background: 'white', padding: '28px', borderRadius: '12px', width: '100%', maxWidth: '450px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
        {/* Encabezado del modal con título y breve descripción de la acción. */}
        <h3 style={{ marginTop: 0, color: 'var(--azul-oscuro)' }}>Surtir a la Barra</h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--tinta-suave)', marginBottom: '20px' }}>
          Saca producto del almacén para venderlo en el punto de venta.
        </p>

        <form onSubmit={manejarSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Selección del insumo desde el inventario del almacén. */}
          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: '600' }}>Selecciona del Almacén:</label>
            <select value={insumoSeleccionado} onChange={(e) => setInsumoSeleccionado(e.target.value)} style={inputStyle} required>
              <option value="">-- Selecciona --</option>
              {/* Cada opción muestra el nombre del insumo junto con su unidad. */}
              {inventarioAlmacen.map(item => (
                <option key={item.id} value={item.nombre}>{item.nombre} ({item.unidad})</option>
              ))}
            </select>
          </div>

          {/* Cantidad a surtir y precio de venta, en una fila. */}
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
          
          {/* Acciones del formulario: cancelar o confirmar el surtido. */}
          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <button type="button" onClick={onCerrar} style={{ flex: 1, padding: '12px', background: '#e0e0e0', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>Cancelar</button>
            <button type="submit" className="boton" style={{ flex: 1, padding: '12px' }}>Surtir a Barra</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Estilo compartido por los inputs y el select para no repetirlo en cada uno.
const inputStyle = { padding: '10px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '1rem', width: '100%', boxSizing: 'border-box' };