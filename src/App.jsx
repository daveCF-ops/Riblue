import { useState } from 'react'
import { MODULOS } from './data/modulos'
import { leerSesion, cerrarSesion } from './auth/sesion'
import Login from './components/Login'
import Ventana from './components/Ventana'
import Inicio from './components/Inicio'
import PantallaModulo from './components/PantallaModulo'

// --- IMPORTAMOS LAS PANTALLAS NUEVAS ---
import Productos from './components/Productos'
import Clientes from './components/Clientes'
import Proveedores from './components/Proveedores'
import Almacen from './components/Almacen' // <-- NUEVO

function App() {
  const [sesion, setSesion] = useState(leerSesion)
  const [pantalla, setPantalla] = useState('inicio')
  const [menuAbierto, setMenuAbierto] = useState(false)

  const irA = (id) => {
    setPantalla(id)
    setMenuAbierto(false)
  }

  const salir = () => {
    cerrarSesion()
    setSesion(null)
    setPantalla('inicio')
    setMenuAbierto(false)
  }

  if (!sesion) return <Login alEntrar={setSesion} />

  const modulo = MODULOS.find((m) => m.id === pantalla)

  // --- LÓGICA PARA ELEGIR QUÉ PANTALLA MOSTRAR ---
  let contenido;
  
  if (pantalla === 'inicio') {
    contenido = <Inicio irA={irA} />;
  } else if (pantalla === 'productos') {
    contenido = <Productos irA={irA} />;
  } else if (pantalla === 'clientes') {
    contenido = <Clientes irA={irA} />;
  } else if (pantalla === 'proveedores') {      
    contenido = <Proveedores irA={irA} />;      
  } else if (pantalla === 'almacen') {          // <-- NUEVO
    contenido = <Almacen irA={irA} />;          // <-- NUEVO
  } else {
    // Si es empleados, ventas, etc., usa la pantalla provisional por ahora
    contenido = <PantallaModulo modulo={modulo} irA={irA} />;
  }

  return (
    <Ventana
      pantalla={pantalla}
      irA={irA}
      menuAbierto={menuAbierto}
      setMenuAbierto={setMenuAbierto}
      usuario={sesion.nombre}
      alSalir={salir}
    >
      {contenido}
    </Ventana>
  )
}

export default App