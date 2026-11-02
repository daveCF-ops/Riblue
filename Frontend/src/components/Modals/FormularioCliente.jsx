import { useState } from 'react';

export default function FormularioCliente({ onGuardar, onCerrar }) {
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [ciudad, setCiudad] = useState('');

  const manejarSubmit = (e) => {
    e.preventDefault();
    if (!nombre) return alert('El nombre es obligatorio');
    
    // Creamos el objeto cliente
    const nuevoCliente = {
      id: Date.now(), // Genera un ID único basado en la hora
      nombre,
      telefono,
      email,
      ciudad
    };

    onGuardar(nuevoCliente); // Enviamos el cliente a la pantalla principal
  };

  return (
    // Fondo oscuro (Overlay)
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
      
      {/* La ventana blanca del formulario */}
      <div style={{ background: 'white', padding: '24px', borderRadius: '12px', width: '100%', maxWidth: '400px' }}>
        <h3 style={{ marginTop: 0 }}>Registrar Nuevo Cliente</h3>
        
        <form onSubmit={manejarSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <input type="text" placeholder="Nombre completo *" value={nombre} onChange={(e) => setNombre(e.target.value)} style={inputStyle} />
          <input type="text" placeholder="Teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)} style={inputStyle} />
          <input type="email" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} />
          <input type="text" placeholder="Ciudad" value={ciudad} onChange={(e) => setCiudad(e.target.value)} style={inputStyle} />
          
          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <button type="button" onClick={onCerrar} style={{ flex: 1, padding: '10px', background: '#e0e0e0', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
              Cancelar
            </button>
            <button type="submit" className="boton" style={{ flex: 1 }}>
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const inputStyle = { padding: '10px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '1rem' };