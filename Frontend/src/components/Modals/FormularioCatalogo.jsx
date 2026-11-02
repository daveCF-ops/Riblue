/* eslint-disable */
import { useState } from 'react';

export default function FormularioCatalogo({ onGuardar, onCerrar }) {
  const [nombre, setNombre] = useState('');
  
  // --- CATEGORÍA ---
  const [familia, setFamilia] = useState('Espirituoso Base');
  const [subcategoria, setSubcategoria] = useState('Vodka');
  const [subcategoriaManual, setSubcategoriaManual] = useState('');
  const [mostrarSubcategoriaManual, setMostrarSubcategoriaManual] = useState(false);

  const subcategoriasPorFamilia = {
    'Espirituoso Base': ['Vodka', 'Tequila', 'Ron', 'Gin', 'Whisky', 'Mezcal'],
    'Licor / Modificador': ['Triple Sec', 'Campari', 'Aperol', 'Kahlúa', 'Amaretto', 'Vermut'],
    'Mezclador': ['Agua Tónica', 'Ginger Beer', 'Jugo de Naranja', 'Jugo de Arándano', 'Refresco de Cola'],
    'Bitters': ['Angostura', 'Peychauds', 'Orange Bitters'],
    'Jarabe / Perecedero': ['Jarabe Simple', 'Jarabe de Agave', 'Limón', 'Hielo']
  };

  const cambiarFamilia = (e) => {
    const nuevaFamilia = e.target.value;
    setFamilia(nuevaFamilia);
    setSubcategoria(subcategoriasPorFamilia[nuevaFamilia][0]);
    setMostrarSubcategoriaManual(false);
  };

  const manejarSubmit = (e) => {
    e.preventDefault();
    if (!nombre) return alert('El nombre del producto es obligatorio');
    
    const categoriaFinal = mostrarSubcategoriaManual && subcategoriaManual.trim() !== ''
      ? subcategoriaManual
      : subcategoria;

    const nuevoProducto = {
      id: Date.now(),
      nombre: nombre.toUpperCase(),
      tipo: categoriaFinal,
      familia: familia
    };

    onGuardar(nuevoProducto);
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
      
      <div style={{ background: 'white', padding: '32px', borderRadius: '12px', width: '100%', maxWidth: '500px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
        <h3 style={{ marginTop: 0, marginBottom: '24px', color: 'var(--azul-oscuro)', fontSize: '1.5rem' }}>Registrar Producto</h3>
        
        <form onSubmit={manejarSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div>
            <label style={{ fontSize: '0.9rem', fontWeight: '600' }}>Nombre del producto</label>
            <input type="text" placeholder="Ej. TEQUILA REPOSADO..." value={nombre} onChange={(e) => setNombre(e.target.value.toUpperCase())} style={inputStyle} required />
          </div>
          
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 200px' }}>
              <label style={{ fontSize: '0.9rem', fontWeight: '600' }}>Familia</label>
              <select value={familia} onChange={cambiarFamilia} style={inputStyle}>
                <option value="Espirituoso Base">Espirituoso Base</option>
                <option value="Licor / Modificador">Licor / Modificador</option>
                <option value="Mezclador">Mezclador</option>
                <option value="Bitters">Bitters / Amargos</option>
                <option value="Jarabe / Perecedero">Jarabe / Perecedero</option>
              </select>
            </div>
            <div style={{ flex: '1 1 200px' }}>
              <label style={{ fontSize: '0.9rem', fontWeight: '600' }}>Tipo Específico</label>
              {!mostrarSubcategoriaManual ? (
                <div style={{ display: 'flex', gap: '8px' }}>
                  <select value={subcategoria} onChange={(e) => setSubcategoria(e.target.value)} style={inputStyle}>
                    {subcategoriasPorFamilia[familia].map((sub) => <option key={sub} value={sub}>{sub}</option>)}
                  </select>
                  <button type="button" onClick={() => setMostrarSubcategoriaManual(true)} style={btnMasStyle}>+</button>
                </div>
              ) : (
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input type="text" placeholder="Ej. Sake" value={subcategoriaManual} onChange={(e) => setSubcategoriaManual(e.target.value)} style={{...inputStyle, border: '2px solid var(--azul-barra)'}} autoFocus />
                  <button type="button" onClick={() => { setMostrarSubcategoriaManual(false); setSubcategoriaManual(''); }} style={btnCancelarMiniStyle}>✕</button>
                </div>
              )}
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
            <button type="button" onClick={onCerrar} style={{ flex: 1, padding: '14px', background: '#e0e0e0', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>Cancelar</button>
            <button type="submit" className="boton" style={{ flex: 1, padding: '14px' }}>Guardar Producto</button>
          </div>
        </form>
      </div>
    </div>
  );
}

const inputStyle = { padding: '10px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '1rem', width: '100%', boxSizing: 'border-box', background: 'white' };
const btnMasStyle = { padding: '0 18px', background: 'var(--azul-barra)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1.2rem' };
const btnCancelarMiniStyle = { padding: '0 16px', background: '#e0e0e0', color: '#333', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' };