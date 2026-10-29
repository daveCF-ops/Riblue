import { useState } from 'react'
import { iniciarSesion } from '../auth/sesion'

export default function Login({ alEntrar }) {
  const [usuario, setUsuario] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false)

  const enviar = async (e) => {
    e.preventDefault()
    setError('')
    setCargando(true)
    try {
      const sesion = await iniciarSesion(usuario, contrasena)
      alEntrar(sesion)
    } catch (err) {
      setError(err.message)
      setCargando(false)
    }
  }

  return (
    <div className="ventana ventana--login">
      <header className="barra">
        <h1 className="barra__marca">Riblue</h1>
      </header>

      <main className="login">
        <form className="login__form" onSubmit={enviar}>
          <h2 className="titulo titulo--login">Iniciar sesión</h2>
          <p className="subtitulo">Entra para gestionar clientes, ventas e inventario.</p>

          <label className="campo">
            <span>Usuario</span>
            <input
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              autoComplete="username"
              autoFocus
              required
            />
          </label>

          <label className="campo">
            <span>Contraseña</span>
            <input
              type="password"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              autoComplete="current-password"
              required
            />
          </label>

          {error && (
            <p className="error" role="alert">
              {error}
            </p>
          )}

          <button type="submit" className="boton" disabled={cargando}>
            {cargando ? 'Entrando…' : 'Iniciar sesión'}
          </button>
        </form>
      </main>
    </div>
  )
}
