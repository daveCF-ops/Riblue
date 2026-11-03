/* eslint-disable */
import { useState, useEffect } from 'react';
// import Migas from './Migas';
import FormularioProducto from './Modals/FormularioProducto';
// import FormularioCatalogo from './Modals/FormularioCatalogo';
// import { leerDatos, guardarDatos } from '../services/datos';

export default function Productos({ irA }) {
  const [productos, setProductos] = useState([]);
  const [catalogo, setCatalogo] = useState([]); // <-- Este es el Almacén
  const [catalogoBase, setCatalogoBase] = useState([]); // <-- Solo para nombres
  
  const [productoAEliminar, setProductoAEliminar] = useState(null);
  const [catalogoAEliminar, setCatalogoAEliminar] = useState(null);
  
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [mostrarCatalogo, setMostrarCatalogo] = useState(false);
  const [mostrarCatalogoBase, setMostrarCatalogoBase] = useState(false);

  useEffect(() => {
    const datosGuardados = leerDatos('productos');
    setProductos(Array.isArray(datosGuardados) ? datosGuardados : []);
    
    const catalogoGuardado = leerDatos('catalogo');
    setCatalogo(Array.isArray(catalogoGuardado) ? catalogoGuardado : []);

    // Cargamos el catálogo base (solo nombres)
    const baseGuardada = leerDatos('catalogoBase');
    setCatalogoBase(Array.isArray(baseGuardada) ? baseGuardada : []);
  }, [mostrarFormulario, mostrarCatalogo]); 

  // --- LÓGICA ACTUALIZADA PARA AGRUPAR PRODUCTOS ---
  const agregarProducto = (productoRecibido, fueActualizacion) => {
    let listaActualizada;
    
    if (fueActualizacion) {
      // Si el formulario detectó que era el mismo producto y precio, reemplazamos el existente (con el nuevo stock sumado)
      listaActualizada = productos.map(p => 
        p.id === productoRecibido.id ? productoRecibido : p
      );
    } else {
      // Si es nuevo o cambió de precio, lo agregamos como una nueva fila
      listaActualizada = [...productos, productoRecibido];
    }

    setProductos(listaActualizada);
    guardarDatos('productos', listaActualizada);
    
    // Refrescamos el almacén porque el insumo se acaba de sacar
    const catalogoGuardado = leerDatos('catalogo');
    setCatalogo(Array.isArray(catalogoGuardado) ? catalogoGuardado : []);
    setMostrarFormulario(false);
  };

  const agregarAlCatalogo = (nuevoInsumo) => {
    const listaActualizada = [...catalogoBase, nuevoInsumo];
    setCatalogoBase(listaActualizada);
    guardarDatos('catalogoBase', listaActualizada);
    setMostrarCatalogo(false);
  };

  const confirmarEliminar = () => {
    if (productoAEliminar) {
      const listaFiltrada = productos.filter(p => p.id !== productoAEliminar.id);
      setProductos(listaFiltrada);
      guardarDatos('productos', listaFiltrada);
      setProductoAEliminar(null); 
    }
  };

  const confirmarEliminarCatalogo = () => {
    if (catalogoAEliminar) {
      const listaFiltrada = catalogoBase.filter(c => c.id !== catalogoAEliminar.id);
      setCatalogoBase(listaFiltrada);
      guardarDatos('catalogoBase', listaFiltrada);
      setCatalogoAEliminar(null); 
    }
  };

  return (
    <>
      <Migas partes={[{ texto: 'Inicio', onClick: () => irA('inicio') }, { texto: 'Productos' }]} />
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
        <div>
          <h2 className="titulo" style={{ marginBottom: '4px' }}>Productos</h2>
          <p className="subtitulo" style={{ margin: 0 }}>Existencias, precios y proveedor</p>
        </div>
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            onClick={() => setMostrarCatalogo(true)} 
            style={{ padding: '10px 16px', background: 'transparent', border: '1px solid var(--azul-oscuro)', color: 'var(--azul-oscuro)', borderRadius: '20px', cursor: 'pointer', fontWeight: '500' }}
          >
            + Registrar Producto (Catálogo)
          </button>
          <button className="boton" onClick={() => setMostrarFormulario(true)}>
            + Surtir a la Barra
          </button>
        </div>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <button 
          onClick={() => setMostrarCatalogoBase(!mostrarCatalogoBase)}
          style={{ 
            padding: '8px 16px', 
            background: mostrarCatalogoBase ? 'var(--azul-oscuro)' : 'white', 
            color: mostrarCatalogoBase ? 'white' : 'var(--azul-oscuro)', 
            border: '1px solid var(--azul-oscuro)', 
            borderRadius: '8px', 
            cursor: 'pointer', 
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          {mostrarCatalogoBase ? 'Ocultar Catálogo Base' : 'Ver Catálogo Base Registrados'}
        </button>
      </div>

      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        
        {/* COLUMNA IZQUIERDA: INVENTARIO EN BARRA */}
        <div style={{ flex: '1 1 500px', background: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
          <h3 style={{ marginTop: 0, marginBottom: '16px', color: 'var(--azul-oscuro)' }}>Inventario en Barra</h3>
          
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ background: 'var(--fondo-pagina)', textAlign: 'left' }}>
              <tr>
                <th style={{ padding: '10px' }}>Producto</th>
                <th style={{ padding: '10px' }}>Precio</th>
                <th style={{ padding: '10px' }}>Stock</th>
                <th style={{ padding: '10px', textAlign: 'center' }}>Acción</th>
              </tr>
            </thead>
            <tbody>
              {productos.length > 0 ? (
                productos.map((p) => {
                  const stockBajo = p.stock <= (p.stockMinimo || 0);
                  return (
                    <tr key={p.id} style={{ borderTop: '1px solid var(--borde)', background: stockBajo ? '#fff5f5' : 'transparent' }}>
                      
                      <td style={{ padding: '12px 10px' }}>
                        <div style={{ fontWeight: '600', fontSize: '1rem', color: 'var(--azul-oscuro)' }}>
                          {p.nombre}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--tinta-suave)', marginTop: '2px' }}>
                          {p.unidad} {p.categoria ? `| ${p.categoria}` : ''} {p.proveedor ? `| Prov: ${p.proveedor}` : ''}
                        </div>
                      </td>

                      <td style={{ padding: '12px 10px', fontWeight: '600', color: 'var(--azul-oscuro)' }}>
                        ${p.precio ? p.precio.toFixed(2) : '0.00'}
                      </td>
                      
                      <td style={{ padding: '12px 10px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ background: stockBajo ? '#fee2e2' : '#e6f4ea', color: stockBajo ? '#b91c1c' : '#1e8e3e', padding: '4px 8px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: '600', whiteSpace: 'nowrap' }}>
                            {p.stock} uds {stockBajo && '⚠️'}
                          </span>
                        </div>
                      </td>

                      <td style={{ padding: '12px 10px', textAlign: 'center' }}>
                        <button 
                          onClick={() => setProductoAEliminar(p)}
                          title="Eliminar producto"
                          style={{ background: '#fee2e2', border: 'none', cursor: 'pointer', padding: '6px', borderRadius: '6px' }}
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="4" style={{ padding: '20px', textAlign: 'center', color: 'var(--tinta-suave)' }}>No hay productos en la barra. Surtir desde Almacén.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* COLUMNA DERECHA: CATÁLOGO BASE */}
        {mostrarCatalogoBase && (
          <div style={{ flex: '1 1 400px', background: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
            <h3 style={{ marginTop: 0, marginBottom: '16px', color: 'var(--tinta-suave)' }}>Catálogo Base</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--tinta-suave)', marginBottom: '16px' }}>Lista maestra de productos que vende el bar.</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {catalogoBase.length > 0 ? (
                catalogoBase.map((c) => (
                  <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', border: '1px solid var(--borde)', borderRadius: '8px', background: '#fafafa' }}>
                    <div>
                      <strong style={{ display: 'block', fontSize: '0.9rem', color: 'var(--azul-oscuro)' }}>{c.nombre}</strong>
                      <span style={{ fontSize: '0.75rem', color: 'var(--tinta-suave)' }}>{c.tipo} | {c.familia}</span>
                    </div>
                    <button 
                      onClick={() => setCatalogoAEliminar(c)}
                      title="Eliminar del catálogo"
                      style={{ background: '#fee2e2', border: 'none', cursor: 'pointer', padding: '4px 6px', borderRadius: '6px' }}
                    >
                      🗑️
                    </button>
                  </div>
                ))
              ) : (
                <p style={{ fontSize: '0.85rem', color: 'var(--tinta-suave)', textAlign: 'center' }}>No hay productos registrados en el catálogo base.</p>
              )}
            </div>
          </div>
        )}

      </div>

      {mostrarFormulario && (
        <FormularioProducto 
          onGuardar={agregarProducto} 
          onCerrar={() => setMostrarFormulario(false)} 
          catalogo={catalogo} 
          productosActuales={productos} // <-- IMPORTANTE: Le pasamos la lista actual para agrupar
        />
      )}

      {mostrarCatalogo && (
        <FormularioCatalogo 
          onGuardar={agregarAlCatalogo} 
          onCerrar={() => setMostrarCatalogo(false)} 
        />
      )}

      {/* MODAL DE ELIMINAR (BARRA) */}
      {productoAEliminar && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ background: 'white', padding: '24px', borderRadius: '12px', width: '100%', maxWidth: '400px', textAlign: 'center', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
            <div style={{ fontSize: '3rem', marginBottom: '10px' }}>⚠️</div>
            <h3 style={{ marginTop: 0, color: 'var(--azul-oscuro)' }}>¿Estás seguro?</h3>
            <p style={{ color: 'var(--tinta-suave)', marginBottom: '24px' }}>
              Estás a punto de eliminar el producto <strong>"{productoAEliminar.nombre}"</strong> de la barra.
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setProductoAEliminar(null)} style={{ flex: 1, padding: '12px', background: '#e0e0e0', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', color: '#333' }}>Deshacer</button>
              <button onClick={confirmarEliminar} style={{ flex: 1, padding: '12px', background: '#b91c1c', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', color: 'white' }}>Eliminar</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE ELIMINAR (CATÁLOGO) */}
      {catalogoAEliminar && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ background: 'white', padding: '24px', borderRadius: '12px', width: '100%', maxWidth: '400px', textAlign: 'center', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
            <div style={{ fontSize: '3rem', marginBottom: '10px' }}>⚠️</div>
            <h3 style={{ marginTop: 0, color: 'var(--azul-oscuro)' }}>¿Eliminar del catálogo?</h3>
            <p style={{ color: 'var(--tinta-suave)', marginBottom: '24px' }}>
              Estás a punto de borrar el registro de <strong>"{catalogoAEliminar.nombre}"</strong> del catálogo base. Esta acción no se puede deshacer.
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setCatalogoAEliminar(null)} style={{ flex: 1, padding: '12px', background: '#e0e0e0', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', color: '#333' }}>Deshacer</button>
              <button onClick={confirmarEliminarCatalogo} style={{ flex: 1, padding: '12px', background: '#b91c1c', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', color: 'white' }}>Eliminar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}