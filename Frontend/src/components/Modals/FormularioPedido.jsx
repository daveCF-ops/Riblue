/* eslint-disable */
import { useState, useEffect } from 'react';
import { leerDatos } from '../../services/datos';

export default function FormularioPedido({ onGuardar, onCerrar, proveedores }) {
  const [proveedor, setProveedor] = useState('');
  
  // Fecha de entrega
  const [fechaEntrega, setFechaEntrega] = useState('');
  const [horaEntrega, setHoraEntrega] = useState('12:00');

  // --- DATOS DEL INSUMO ---
  const [nombre, setNombre] = useState('');
  const [costoTotal, setCostoTotal] = useState('');
  
  // Productos del catálogo
  const [productosRegistrados, setProductosRegistrados] = useState([]);
  const [modoNuevoProducto, setModoNuevoProducto] = useState(true); // Si empieza en true, muestra el input de texto

  // Lógica de categorías
  const [familia, setFamilia] = useState('Espirituoso Base');
  const [subcategoria, setSubcategoria] = useState('Vodka');
  const [subcategoriaManual, setSubcategoriaManual] = useState('');
  const [mostrarSubcategoriaManual, setMostrarSubcategoriaManual] = useState(false);

  // Lógica de empaque
  const [tipoEmpaque, setTipoEmpaque] = useState('Caja'); 
  const [cantidadCajas, setCantidadCajas] = useState('1');
  const [piezasPorCaja, setPiezasPorCaja] = useState('12'); 
  const [contenidoCaja, setContenidoCaja] = useState('Botella'); 
  const [medidaInterior, setMedidaInterior] = useState('750 ml');
  const [medidaSuelta, setMedidaSuelta] = useState('750 ml');

  // Medidas manuales
  const [medidaInteriorManual, setMedidaInteriorManual] = useState('');
  const [unidadInterior, setUnidadInterior] = useState('ml'); 
  const [mostrarMedidaManual, setMostrarMedidaManual] = useState(false);

  const fechaPedidoAuto = new Date().toLocaleDateString('es-MX') + ' a las ' + new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' });

  const opcionesHoras = [];
  for (let i = 6; i <= 23; i++) {
    opcionesHoras.push(i.toString().padStart(2, '0') + ':00');
  }

  useEffect(() => {
    if (proveedores.length > 0) setProveedor(proveedores[0].empresa);
    
    // --- CORRECCIÓN AQUÍ: Leemos del catálogo base, no del almacén ---
    const baseGuardada = leerDatos('catalogoBase');
    setProductosRegistrados(Array.isArray(baseGuardada) ? baseGuardada : []);
  }, [proveedores]);

  const subcategoriasPorFamilia = {
    'Espirituoso Base': ['Vodka', 'Tequila', 'Ron', 'Gin', 'Whisky', 'Mezcal'],
    'Licor / Modificador': ['Triple Sec', 'Campari', 'Aperol', 'Kahlúa', 'Amaretto', 'Vermut'],
    'Mezclador': ['Agua Tónica', 'Ginger Beer', 'Jugo de Naranja', 'Jugo de Arándano', 'Refresco de Cola'],
    'Bitters': ['Angostura', 'Peychauds', 'Orange Bitters'],
    'Jarabe / Perecedero': ['Jarabe Simple', 'Jarabe de Agave', 'Limón', 'Hielo']
  };

  const medidasInteriores = {
    Botella: ['50 ml (Miniatura)', '200 ml (Media/Petaca)', '375 ml (Media botella)', '700 ml (Estándar europeo)', '750 ml (Estándar universal)', '1 Litro (Litro de barra)', '1.5 Litros (Magnum de vino)', '1.75 Litros (Handle)'],
    Lata: ['150 ml (Mini can)', '200 ml (Mini can)', '222 ml (Sleek pequeña)', '250 ml (Slim can)', '330 ml (Estándar europea)', '355 ml (Estándar tradicional)', '355 ml (Sleek estilizada)', '473 ml (Tallboy)', '500 ml (Pinta europea)', '710 ml (Mega can)', '750 ml (Mega can)']
  };

  // --- FUNCIÓN MÁGICA: AL SELECCIONAR UN PRODUCTO, LLENA LOS DATOS ---
  const seleccionarProducto = (e) => {
    const valor = e.target.value;
    setModoNuevoProducto(false);

    if (valor === "nuevo") {
      // Si elige "crear nuevo", limpia todo
      setModoNuevoProducto(true);
      setNombre('');
      setFamilia('Espirituoso Base');
      setSubcategoria('Vodka');
      setTipoEmpaque('Caja');
      setCantidadCajas('1');
      setPiezasPorCaja('12');
      setContenidoCaja('Botella');
      setMedidaInterior('750 ml');
      return;
    }

    // Si elige un producto existente, buscamos sus datos
    const producto = productosRegistrados.find(p => p.nombre === valor);
    if (producto) {
      setNombre(producto.nombre);
      
      // Llenamos familia y tipo
      if (producto.familia) setFamilia(producto.familia);
      if (producto.tipo) setSubcategoria(producto.tipo);

      // Autocompletamos el empaque basado en lo que ya tiene guardado
      if (producto.unidad && producto.unidad.includes('Caja(s) de')) {
        setTipoEmpaque('Caja');
        // Extraemos la cantidad de cajas, las piezas y la medida (lógica aproximada)
        const matchCajas = producto.unidad.match(/^(\d+)\s+Caja/);
        const matchPiezas = producto.unidad.match(/de\s+(\d+)\s+(?:Botella|Lata)/);
        if (matchCajas) setCantidadCajas(matchCajas[1]);
        if (matchPiezas) setPiezasPorCaja(matchPiezas[1]);
      } else if (producto.unidad && producto.unidad.includes('Botella')) {
        setTipoEmpaque('Botella');
      } else if (producto.unidad && producto.unidad.includes('Lata')) {
        setTipoEmpaque('Lata');
      }
    }
  };

  const cambiarFamilia = (e) => {
    const nuevaFamilia = e.target.value;
    setFamilia(nuevaFamilia);
    setSubcategoria(subcategoriasPorFamilia[nuevaFamilia][0]);
    setMostrarSubcategoriaManual(false);
  };

  const cambiarContenidoCaja = (e) => {
    const nuevoContenido = e.target.value;
    setContenidoCaja(nuevoContenido);
    setMedidaInterior(medidasInteriores[nuevoContenido][0]);
  };

  const manejarSubmit = (e) => {
    e.preventDefault();
    if (!proveedor || !nombre || !costoTotal) return alert('Llena los campos obligatorios');

    const categoriaFinal = mostrarSubcategoriaManual && subcategoriaManual.trim() !== ''
      ? subcategoriaManual
      : subcategoria;

    let textoUnidadFinal = '';
    if (tipoEmpaque === 'Caja') {
      const medidaFinal = mostrarMedidaManual && medidaInteriorManual.trim() !== '' 
        ? `${medidaInteriorManual} ${unidadInterior}` 
        : medidaInterior;
      textoUnidadFinal = `${cantidadCajas} Caja(s) de ${piezasPorCaja} ${contenidoCaja}(s) (${medidaFinal} c/u)`;
    } else {
      textoUnidadFinal = `${tipoEmpaque} - ${medidaSuelta}`;
    }

    const nuevoPedido = {
      id: Date.now(),
      proveedor,
      fechaPedido: fechaPedidoAuto,
      fechaEntrega: fechaEntrega ? `${fechaEntrega} a las ${horaEntrega}` : 'Pendiente',
      nombre,
      tipo: categoriaFinal,
      familia: familia,
      costo: parseFloat(costoTotal),
      unidad: textoUnidadFinal,
      estado: 'En tránsito'
    };

    onGuardar(nuevoPedido);
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
      <div style={{ background: 'white', padding: '32px', borderRadius: '12px', width: '100%', maxWidth: '650px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)', maxHeight: '90vh', overflowY: 'auto' }}>
        <h3 style={{ marginTop: 0, marginBottom: '24px', color: 'var(--azul-oscuro)', fontSize: '1.5rem' }}>Agendar Pedido a Proveedor</h3>
        
        <form onSubmit={manejarSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div>
            <label style={{ fontSize: '0.9rem', fontWeight: '600' }}>Proveedor</label>
            <select value={proveedor} onChange={(e) => setProveedor(e.target.value)} style={inputStyle} required>
              {proveedores.map(p => <option key={p.id} value={p.empresa}>{p.empresa}</option>)}
            </select>
          </div>

          <div style={{ background: 'var(--fondo-pagina)', padding: '12px', borderRadius: '8px', border: '1px solid var(--borde)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--tinta-suave)' }}>Pedido generado el:</span>
            <strong style={{ fontSize: '0.85rem', color: 'var(--azul-oscuro)' }}>{fechaPedidoAuto} hrs</strong>
          </div>

          <div style={{ display: 'flex', gap: '10px', background: '#e0f2fe', padding: '12px', borderRadius: '8px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: '0.8rem', color: '#0369a1', fontWeight: '600' }}>Fecha de entrega</label>
              <input type="date" value={fechaEntrega} onChange={(e) => setFechaEntrega(e.target.value)} style={inputStyle} required />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: '0.8rem', color: '#0369a1', fontWeight: '600' }}>Hora de entrega</label>
              <select value={horaEntrega} onChange={(e) => setHoraEntrega(e.target.value)} style={inputStyle} required>
                {opcionesHoras.map(h => <option key={h} value={h}>{h} hrs</option>)}
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <div style={{ flex: '2 1 300px' }}>
              <label style={{ fontSize: '0.9rem', fontWeight: '600' }}>Insumo</label>
              
              {/* SELECTOR DE PRODUCTOS YA REGISTRADOS */}
              <select 
                onChange={seleccionarProducto} 
                value={modoNuevoProducto ? "nuevo" : nombre}
                style={inputStyle}
              >
                <option value="nuevo">+ Crear nuevo producto...</option>
                {productosRegistrados.map((prod) => (
                  <option key={prod.id} value={prod.nombre}>{prod.nombre}</option>
                ))}
              </select>
              
              {/* Si elige crear nuevo, le mostramos el input de texto */}
              {modoNuevoProducto && (
                <input 
                  type="text" 
                  placeholder="Escribe el nombre del nuevo producto..." 
                  value={nombre} 
                  onChange={(e) => setNombre(e.target.value.toUpperCase())} 
                  style={{...inputStyle, marginTop: '8px'}} 
                  required 
                />
              )}
            </div>
            <div style={{ flex: '1 1 150px' }}>
              <label style={{ fontSize: '0.9rem', fontWeight: '600' }}>Costo Total ($)</label>
              <input type="number" step="0.01" placeholder="0.00" value={costoTotal} onChange={(e) => setCostoTotal(e.target.value)} style={inputStyle} required />
            </div>
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

          <div style={{ background: 'var(--fondo-pagina)', padding: '20px', borderRadius: '10px', border: '1px solid var(--borde)' }}>
            <h4 style={{ margin: '0 0 16px 0', fontSize: '1rem', color: 'var(--azul-oscuro)' }}>Detalles del empaque</h4>
            
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '0.85rem', color: 'var(--tinta-suave)' }}>¿Cómo lo pediste?</label>
              <select value={tipoEmpaque} onChange={(e) => setTipoEmpaque(e.target.value)} style={inputStyle}>
                <option value="Caja">Por Caja / Empaque</option>
                <option value="Botella">Botella suelta</option>
                <option value="Lata">Lata suelta</option>
              </select>
            </div>

            {tipoEmpaque === 'Caja' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', background: '#e0f2fe', padding: '16px', borderRadius: '8px', border: '1px solid #bae6fd' }}>
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                  <div style={{ flex: '1 1 150px' }}>
                    <label style={{ fontSize: '0.85rem', color: 'var(--tinta-suave)' }}>Cantidad de cajas</label>
                    <input type="number" min="1" value={cantidadCajas} onChange={(e) => setCantidadCajas(e.target.value)} style={inputStyle} />
                  </div>
                  <div style={{ flex: '1 1 150px' }}>
                    <label style={{ fontSize: '0.85rem', color: 'var(--tinta-suave)' }}>Piezas por caja</label>
                    <select value={piezasPorCaja} onChange={(e) => setPiezasPorCaja(e.target.value)} style={inputStyle}>
                      <option value="3">3 piezas</option>
                      <option value="4">4 piezas</option>
                      <option value="6">6 piezas</option>
                      <option value="12">12 piezas</option>
                      <option value="24">24 piezas</option>
                      <option value="60">60 piezas</option>
                      <option value="120">120 piezas</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                  <div style={{ flex: '1 1 150px' }}>
                    <label style={{ fontSize: '0.85rem', color: 'var(--tinta-suave)' }}>¿Qué contiene la caja?</label>
                    <select value={contenidoCaja} onChange={cambiarContenidoCaja} style={inputStyle}>
                      <option value="Botella">Botellas</option>
                      <option value="Lata">Latas</option>
                    </select>
                  </div>
                  <div style={{ flex: '2 1 250px' }}>
                    <label style={{ fontSize: '0.85rem', color: 'var(--tinta-suave)' }}>Medida de cada {contenidoCaja.toLowerCase()}</label>
                    {!mostrarMedidaManual ? (
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <select value={medidaInterior} onChange={(e) => setMedidaInterior(e.target.value)} style={inputStyle}>
                          {medidasInteriores[contenidoCaja].map(med => <option key={med} value={med}>{med}</option>)}
                        </select>
                        <button type="button" onClick={() => setMostrarMedidaManual(true)} style={btnMasStyle}>+</button>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <input type="number" placeholder="Ej. 18" value={medidaInteriorManual} onChange={(e) => setMedidaInteriorManual(e.target.value)} style={{...inputStyle, flex: 1, border: '2px solid var(--azul-barra)'}} autoFocus min="1" />
                        <select value={unidadInterior} onChange={(e) => setUnidadInterior(e.target.value)} style={{...inputStyle, width: '90px', border: '2px solid var(--azul-barra)'}}>
                          <option value="ml">ml</option>
                          <option value="L">L</option>
                          <option value="oz">oz</option>
                          <option value="pza">pza</option>
                        </select>
                        <button type="button" onClick={() => { setMostrarMedidaManual(false); setMedidaInteriorManual(''); }} style={btnCancelarMiniStyle}>✕</button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {tipoEmpaque !== 'Caja' && (
              <div>
                <label style={{ fontSize: '0.85rem', color: 'var(--tinta-suave)' }}>Medida de la {tipoEmpaque.toLowerCase()}</label>
                <select value={medidaSuelta} onChange={(e) => setMedidaSuelta(e.target.value)} style={inputStyle}>
                  {tipoEmpaque === 'Botella' 
                    ? medidasInteriores.Botella.map(med => <option key={med} value={med}>{med}</option>)
                    : medidasInteriores.Lata.map(med => <option key={med} value={med}>{med}</option>)
                  }
                </select>
              </div>
            )}
          </div>
          
          <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
            <button type="button" onClick={onCerrar} style={{ flex: 1, padding: '14px', background: '#e0e0e0', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>Cancelar</button>
            <button type="submit" className="boton" style={{ flex: 1, padding: '14px' }}>Agendar Pedido</button>
          </div>
        </form>
      </div>
    </div>
  );
}

const inputStyle = { padding: '10px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '1rem', width: '100%', boxSizing: 'border-box', background: 'white' };
const btnMasStyle = { padding: '0 18px', background: 'var(--azul-barra)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1.2rem' };
const btnCancelarMiniStyle = { padding: '0 16px', background: '#e0e0e0', color: '#333', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' };