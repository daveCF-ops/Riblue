/* eslint-disable */
import { useState, useEffect } from 'react'; 
import { MODULOS } from '../data/modulos';
import { leerDatos } from '../services/datos'; 
import Migas from './Migas';

export default function Inicio({ irA }) {
  // --- ESTADOS PARA CONTADORES REALES ---
  const [totalClientes, setTotalClientes] = useState(0);
  const [totalProductos, setTotalProductos] = useState(0);
  const [productosBajos, setProductosBajos] = useState(0); // Nuevo estado para alertas

  // Contamos los datos apenas se carga la pantalla
  useEffect(() => {
    const clientesReales = leerDatos('clientes');
    setTotalClientes(Array.isArray(clientesReales) ? clientesReales.length : 0);
    
    const productosReales = leerDatos('productos');
    if (Array.isArray(productosReales)) {
      setTotalProductos(productosReales.length);
      
      // MAGIA: Contamos cuántos productos tienen stock bajo
      const bajos = productosReales.filter(p => p.stock <= (p.stockMinimo || 0)).length;
      setProductosBajos(bajos);
    }
  }, []);

  return (
    <>
      <Migas partes={[{ texto: 'Inicio' }]} />

      {/* --- PANEL DE BIENVENIDA --- */}
      <div style={{
        background: 'white',
        padding: '24px',
        borderRadius: '16px',
        marginTop: '24px',
        marginBottom: '32px',
        border: '1px solid var(--borde)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div>
          <h3 style={{ margin: 0, fontSize: '1.3rem', color: 'var(--azul-oscuro)' }}>
            ¡Bienvenido de vuelta! 👋
          </h3>
          <p style={{ margin: '4px 0 0', color: 'var(--tinta-suave)' }}>
            Aquí tienes el resumen de tu sistema Riblue.
          </p>
        </div>
      </div>

      <h2 className="titulo" style={{ fontSize: '2rem' }}>¿Qué quieres gestionar hoy?</h2>

      <div className="accesos">
        {MODULOS.map((m) => (
          <div key={m.id} className="acceso-wrapper">
            <button type="button" className="acceso" onClick={() => irA(m.id)}>
              
<div className="acceso__frente" style={{ position: 'relative' }}>
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
    <span className="acceso__nombre" style={{ fontSize: '1.25rem' }}>{m.nombre}</span>
    
    {/* EL CÍRCULO AMARILLO: Solo aparece si es producto y hay alertas */}
    {m.id === 'productos' && productosBajos > 0 && (
      <span 
        className="alerta-pulso" 
        title={`${productosBajos} producto(s) con stock bajo`}
      ></span>
    )}
  </div>
  <span className="acceso__detalle">{m.descripcion}</span>
</div>

              {/* Contenido que aparece al hacer hover */}
              <div className="acceso__info-extra">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  
                  {/* Métricas dinámicas */}
                  <span style={{ fontWeight: 'bold', fontSize: '0.95rem' }}>
                    {m.id === 'clientes' ? `${totalClientes} Activos` : 
                     m.id === 'productos' ? `${totalProductos} Ítems` : 
                     m.metrica}
                  </span>

                  {/* ALERTA DINÁMICA PARA PRODUCTOS */}
                  {m.id === 'productos' && productosBajos > 0 && (
                    <span style={{ fontSize: '0.8rem', color: '#b91c1c' }}>
                      {productosBajos} por agotarse
                    </span>
                  )}

                  {/* Alertas estáticas de los demás módulos */}
                  {m.id !== 'productos' && m.alerta && (
                    <span style={{ fontSize: '0.8rem', color: m.alerta.includes('$') ? '#b45309' : '#b91c1c' }}>
                      {m.alerta}
                    </span>
                  )}
                </div>
                
                <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
                  <span style={{ fontSize: '0.8rem', background: 'rgba(255,255,255,0.6)', padding: '4px 8px', borderRadius: '6px' }}>
                    {m.accion1}
                  </span>
                  <span style={{ fontSize: '0.8rem', background: 'rgba(255,255,255,0.6)', padding: '4px 8px', borderRadius: '6px' }}>
                    {m.accion2}
                  </span>
                </div>
              </div>

            </button>
          </div>
        ))}
      </div>
    </>
  )
}