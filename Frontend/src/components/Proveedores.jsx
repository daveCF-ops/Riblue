/* eslint-disable */
import { useState, useEffect } from 'react';
import Migas from './Migas';
import FormularioProveedor from './Modals/FormularioProveedor';
import FormularioPedido from './Modals/FormularioPedido';
import { leerDatos, guardarDatos } from '../services/datos';

export default function Proveedores({ irA }) {
  const [proveedores, setProveedores] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  
  const [mostrarFormProveedor, setMostrarFormProveedor] = useState(false);
  const [mostrarFormPedido, setMostrarFormPedido] = useState(false);
  
  // Estados para los modales
  const [pedidoAConfirmar, setPedidoAConfirmar] = useState(null);
  const [pedidoAEliminar, setPedidoAEliminar] = useState(null);
  const [pedidoACancelar, setPedidoACancelar] = useState(null); 

  useEffect(() => {
    const provs = leerDatos('proveedores');
    setProveedores(Array.isArray(provs) ? provs : []);
    
    const peds = leerDatos('pedidos');
    setPedidos(Array.isArray(peds) ? peds : []);
  }, []);

  const agregarProveedor = (nuevoProv) => {
    const lista = [...proveedores, nuevoProv];
    setProveedores(lista);
    guardarDatos('proveedores', lista);
    setMostrarFormProveedor(false);
  };

  const agregarPedido = (nuevoPedido) => {
    const lista = [...pedidos, nuevoPedido];
    setPedidos(lista);
    guardarDatos('pedidos', lista);
    setMostrarFormPedido(false);
  };

  const ejecutarConfirmacion = () => {
    if (pedidoAConfirmar) {
      const almacenActual = leerDatos('catalogo') || [];
      
      // --- LÓGICA DE ACUMULACIÓN MEJORADA ---
      // Extraemos la medida real del pedido (ej. "750 ml" o "700 ml")
      const medidaPedido = pedidoAConfirmar.unidad.includes('ml') 
        ? pedidoAConfirmar.unidad.match(/\d+\s*ml/)[0] 
        : pedidoAConfirmar.unidad.includes('Litro') 
          ? pedidoAConfirmar.unidad.match(/\d+\s*Litros?/)[0]
          : '';
          
      // Extraemos el tipo de envase (Botella o Lata)
      const tipoPedido = pedidoAConfirmar.unidad.includes('Botella') ? 'Botella' : 'Lata';

      // Buscamos si ya existe un producto con el mismo nombre, mismo tipo de envase y misma medida
      const indexExistente = almacenActual.findIndex((item) => {
        if (item.nombre !== pedidoAConfirmar.nombre) return false;
        
        // Lógica para extraer la medida del item del almacén
        let medidaItem = '';
        if (item.unidad.includes('ml')) {
          const match = item.unidad.match(/\d+\s*ml/);
          if (match) medidaItem = match[0];
        } else if (item.unidad.includes('Litro') || item.unidad.includes('Litros')) {
          const match = item.unidad.match(/\d+\s*Litros?/);
          if (match) medidaItem = match[0];
        }

        const tipoItem = item.unidad.includes('Botella') ? 'Botella' : 'Lata';
        
        return medidaItem === medidaPedido && tipoItem === tipoPedido;
      });

      let almacenActualizado;

      if (indexExistente !== -1) {
        // Si existe, sumamos el costo
        almacenActual[indexExistente].costo += pedidoAConfirmar.costo;
        
        // --- LÓGICA PARA SUMAR LAS CAJAS ---
        const matchCajasActuales = almacenActual[indexExistente].unidad.match(/^(\d+)\s+Caja/);
        const cajasActuales = matchCajasActuales ? parseInt(matchCajasActuales[1]) : 0;
        
        const matchCajasNuevas = pedidoAConfirmar.unidad.match(/^(\d+)\s+Caja/);
        const cajasNuevas = matchCajasNuevas ? parseInt(matchCajasNuevas[1]) : 1;
        
        const nuevasCajasTotales = cajasActuales + cajasNuevas;
        const textoUnidadNuevo = almacenActual[indexExistente].unidad.replace(/^(\d+)\s+Caja/, `${nuevasCajasTotales} Caja`);

        almacenActual[indexExistente].unidad = textoUnidadNuevo;
        almacenActualizado = [...almacenActual];
        // ------------------------------------

      } else {
        // Si no existe, lo creamos como un nuevo registro
        const nuevoInsumoAlmacen = {
          id: Date.now(),
          nombre: pedidoAConfirmar.nombre, 
          proveedor: pedidoAConfirmar.proveedor,
          costo: pedidoAConfirmar.costo,
          tipo: pedidoAConfirmar.tipo,
          familia: pedidoAConfirmar.familia,
          unidad: pedidoAConfirmar.unidad 
        };
        almacenActualizado = [...almacenActual, nuevoInsumoAlmacen];
      }
      
      guardarDatos('catalogo', almacenActualizado);

      // Actualizamos el estado del pedido a "Entregado"
      const pedidosActualizados = pedidos.map(p => 
        p.id === pedidoAConfirmar.id ? { ...p, estado: 'Entregado' } : p
      );
      setPedidos(pedidosActualizados);
      guardarDatos('pedidos', pedidosActualizados);
      
      setPedidoAConfirmar(null); 
    }
  };

  const ejecutarEliminarPedido = () => {
    if (pedidoAEliminar) {
      const listaFiltrada = pedidos.filter(p => p.id !== pedidoAEliminar.id);
      setPedidos(listaFiltrada);
      guardarDatos('pedidos', listaFiltrada);
      setPedidoAEliminar(null);
    }
  };

  const ejecutarCancelarPedido = () => {
    if (pedidoACancelar) {
      const pedidosActualizados = pedidos.map(p => 
        p.id === pedidoACancelar.id ? { ...p, estado: 'Cancelado' } : p
      );
      setPedidos(pedidosActualizados);
      guardarDatos('pedidos', pedidosActualizados);
      setPedidoACancelar(null);
    }
  };

  return (
    <>
      <Migas partes={[{ texto: 'Inicio', onClick: () => irA('inicio') }, { texto: 'Proveedores' }]} />
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
        <div>
          <h2 className="titulo" style={{ marginBottom: '4px' }}>Compras y Proveedores</h2>
          <p className="subtitulo" style={{ margin: 0 }}>Agenda pedidos y confirma entregas para surtir el almacén</p>
        </div>
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => setMostrarFormProveedor(true)} style={{ padding: '10px 16px', background: 'transparent', border: '1px solid var(--azul-oscuro)', color: 'var(--azul-oscuro)', borderRadius: '20px', cursor: 'pointer', fontWeight: '500' }}>
            + Nuevo Proveedor
          </button>
          <button className="boton" onClick={() => setMostrarFormPedido(true)}>
            + Registrar Pedido
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        
        {/* DIRECTORIO */}
        <div style={{ flex: '1 1 400px', background: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
          <h3 style={{ marginTop: 0, marginBottom: '16px', color: 'var(--azul-oscuro)' }}>Directorio</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ background: 'var(--fondo-pagina)', textAlign: 'left' }}>
              <tr>
                <th style={{ padding: '10px' }}>Empresa</th>
                <th style={{ padding: '10px' }}>Contacto</th>
              </tr>
            </thead>
            <tbody>
              {proveedores.map(p => (
                <tr key={p.id} style={{ borderTop: '1px solid var(--borde)' }}>
                  <td style={{ padding: '10px', fontWeight: '500' }}>{p.empresa}</td>
                  <td style={{ padding: '10px', color: 'var(--tinta-suave)' }}>{p.contacto}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PEDIDOS */}
        <div style={{ flex: '1 1 400px', background: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
          <h3 style={{ marginTop: 0, marginBottom: '16px', color: 'var(--azul-oscuro)' }}>Pedidos Agendados</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {pedidos.length === 0 ? (
              <p style={{ color: 'var(--tinta-suave)', textAlign: 'center' }}>No hay pedidos agendados.</p>
            ) : (
              pedidos.map(pedido => (
                <div key={pedido.id} style={{ border: '1px solid var(--borde)', borderRadius: '8px', padding: '12px', background: pedido.estado === 'Entregado' ? '#f0fdf4' : pedido.estado === 'Cancelado' ? '#fef2f2' : '#fff' }}>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <strong style={{ color: 'var(--azul-oscuro)', fontSize: '1rem' }}>{pedido.nombre}</strong>
                      <span style={{ 
                        fontSize: '0.8rem', padding: '2px 8px', borderRadius: '12px', fontWeight: '600', width: 'fit-content',
                        background: pedido.estado === 'Entregado' ? '#dcfce7' : pedido.estado === 'Cancelado' ? '#fee2e2' : '#fef3c7', 
                        color: pedido.estado === 'Entregado' ? '#166534' : pedido.estado === 'Cancelado' ? '#991b1b' : '#92400e' 
                      }}>
                        {pedido.estado}
                      </span>
                    </div>

                    <button 
                      onClick={() => setPedidoAEliminar(pedido)}
                      title="Eliminar registro"
                      style={{ background: '#fee2e2', border: 'none', cursor: 'pointer', padding: '4px 8px', borderRadius: '6px', transition: 'background 0.2s' }}
                      onMouseOver={(e) => e.currentTarget.style.background = '#fca5a5'}
                      onMouseOut={(e) => e.currentTarget.style.background = '#fee2e2'}
                    >
                      🗑️
                    </button>
                  </div>

                  <div style={{ fontSize: '0.85rem', color: 'var(--tinta-suave)', marginBottom: '8px' }}>
                    <div>Proveedor: {pedido.proveedor}</div>
                    <div>Formato: {pedido.unidad}</div>
                    <div>Llega: <strong>{pedido.fechaEntrega}</strong></div>
                    <div>Costo: ${pedido.costo.toFixed(2)}</div>
                  </div>
                  
                  {pedido.estado === 'En tránsito' && (
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button 
                        onClick={() => setPedidoAConfirmar(pedido)}
                        style={{ flex: 1, padding: '8px', background: '#1e8e3e', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '0.85rem' }}
                      >
                        Confirmar Entrega
                      </button>
                      <button 
                        onClick={() => setPedidoACancelar(pedido)}
                        style={{ flex: 1, padding: '8px', background: 'transparent', color: '#b91c1c', border: '1px solid #b91c1c', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '0.85rem' }}
                      >
                        Cancelar Pedido
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      {mostrarFormProveedor && (
        <FormularioProveedor onGuardar={agregarProveedor} onCerrar={() => setMostrarFormProveedor(false)} />
      )}

      {mostrarFormPedido && (
        <FormularioPedido onGuardar={agregarPedido} onCerrar={() => setMostrarFormPedido(false)} proveedores={proveedores} />
      )}

      {/* --- MODAL CONFIRMAR ENTREGA --- */}
      {pedidoAConfirmar && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ background: 'white', padding: '24px', borderRadius: '12px', width: '100%', maxWidth: '400px', textAlign: 'center', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
            <div style={{ fontSize: '3rem', marginBottom: '10px' }}>📦</div>
            <h3 style={{ marginTop: 0, color: 'var(--azul-oscuro)' }}>¿Confirmar entrega?</h3>
            <p style={{ color: 'var(--tinta-suave)', marginBottom: '24px' }}>
              ¿Confirmas que llegó el pedido de <strong>{pedidoAConfirmar.nombre}</strong>? Se guardará en el Almacén.
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setPedidoAConfirmar(null)} style={{ flex: 1, padding: '12px', background: '#e0e0e0', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', color: '#333' }}>No</button>
              <button onClick={ejecutarConfirmacion} style={{ flex: 1, padding: '12px', background: '#1e8e3e', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', color: 'white' }}>Confirmar</button>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL CANCELAR PEDIDO --- */}
      {pedidoACancelar && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ background: 'white', padding: '24px', borderRadius: '12px', width: '100%', maxWidth: '400px', textAlign: 'center', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
            <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🚫</div>
            <h3 style={{ marginTop: 0, color: 'var(--azul-oscuro)' }}>¿Cancelar pedido?</h3>
            <p style={{ color: 'var(--tinta-suave)', marginBottom: '24px' }}>
              ¿Estás seguro de cancelar el pedido de <strong>{pedidoACancelar.nombre}</strong>? El proveedor ya no lo entregará y quedará registrado como cancelado.
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setPedidoACancelar(null)} style={{ flex: 1, padding: '12px', background: '#e0e0e0', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', color: '#333' }}>Volver</button>
              <button onClick={ejecutarCancelarPedido} style={{ flex: 1, padding: '12px', background: '#b91c1c', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', color: 'white' }}>Sí, cancelar</button>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL ELIMINAR REGISTRO --- */}
      {pedidoAEliminar && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ background: 'white', padding: '24px', borderRadius: '12px', width: '100%', maxWidth: '400px', textAlign: 'center', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
            <div style={{ fontSize: '3rem', marginBottom: '10px' }}>⚠️</div>
            <h3 style={{ marginTop: 0, color: 'var(--azul-oscuro)' }}>¿Eliminar registro?</h3>
            <p style={{ color: 'var(--tinta-suave)', marginBottom: '24px' }}>
              Estás a punto de borrar el historial del pedido de <strong>{pedidoAEliminar.nombre}</strong>. Esta acción no se puede deshacer.
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setPedidoAEliminar(null)} style={{ flex: 1, padding: '12px', background: '#e0e0e0', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', color: '#333' }}>Deshacer</button>
              <button onClick={ejecutarEliminarPedido} style={{ flex: 1, padding: '12px', background: '#b91c1c', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', color: 'white' }}>Eliminar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}