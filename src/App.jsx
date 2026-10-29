import { useState } from 'react'
import { MODULOS } from './data/modulos'
import { leerSesion, cerrarSesion } from './auth/sesion'
import Login from './components/Login'
import Ventana from './components/Ventana'
import Inicio from './components/Inicio'
import PantallaModulo from './components/PantallaModulo'

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

  return (
    <Ventana
      pantalla={pantalla}
      irA={irA}
      menuAbierto={menuAbierto}
      setMenuAbierto={setMenuAbierto}
      usuario={sesion.nombre}
      alSalir={salir}
    >
      {modulo ? <PantallaModulo modulo={modulo} irA={irA} /> : <Inicio irA={irA} />}
    </Ventana>
  )
}

export default App
