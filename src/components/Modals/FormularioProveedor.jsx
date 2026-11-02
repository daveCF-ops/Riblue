import { useState } from 'react';

export default function FormularioProveedor({ onGuardar, onCerrar }) {
  const [empresa, setEmpresa] = useState('');
  const [contacto, setContacto] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [ciudad, setCiudad] = useState('');

  const manejarSubmit = (e) => {
    e.preventDefault();
    if (!empresa) return alert('El nombre de la empresa es obligatorio');
    
    onGuardar({ id: Date.now(), empresa, contacto, telefono, email, ciudad });
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
      <div style={{ background: 'white', padding: '24px', borderRadius: '12px', width: '100%', maxWidth: '450px' }}>
        <h3 style={{ marginTop: 0 }}>Registrar Proveedor</h3>
        <form onSubmit={manejarSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <input type="text" placeholder="Nombre de la empresa *" value={empresa} onChange={(e) => setEmpresa(e.target.value)} style={inputStyle} required />
          <input type="text" placeholder="Nombre del contacto" value={contacto} onChange={(e) => setContacto(e.target.value)} style={inputStyle} />
          <input type="text" placeholder="Teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)} style={inputStyle} />
          <input type="email" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} />
          <input type="text" placeholder="Ciudad" value={ciudad} onChange={(e) => setCiudad(e.target.value)} style={inputStyle} />
          
          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <button type="button" onClick={onCerrar} style={{ flex: 1, padding: '10px', background: '#e0e0e0', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Cancelar</button>
            <button type="submit" className="boton" style={{ flex: 1 }}>Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

const inputStyle = { padding: '10px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '1rem', width: '100%', boxSizing: 'border-box' };