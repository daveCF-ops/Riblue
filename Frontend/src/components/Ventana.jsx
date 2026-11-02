import { useEffect } from 'react'
import { MODULOS } from '../data/modulos'
import { IconoMenu, IconoCerrar } from './Iconos'

// Marco general de la app: barra azul con el menú y el contenido de cada pantalla.
export default function Ventana({
  pantalla,
  irA,
  menuAbierto,
  setMenuAbierto,
  usuario,
  alSalir,
  children,
}) {
  // Esc cierra el menú
  useEffect(() => {
    if (!menuAbierto) return
    const alPresionar = (e) => e.key === 'Escape' && setMenuAbierto(false)
    window.addEventListener('keydown', alPresionar)
    return () => window.removeEventListener('keydown', alPresionar)
  }, [menuAbierto, setMenuAbierto])

  return (
    <div className="ventana">
      <header className="barra">
        <h1 className="barra__marca">Riblue</h1>
        <div className="barra__acciones">
          <span className="barra__usuario">{usuario}</span>
          <button
            type="button"
            className="barra__boton"
            aria-label={menuAbierto ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuAbierto}
            aria-controls="menu-lateral"
            onClick={() => setMenuAbierto(!menuAbierto)}
          >
            <IconoMenu />
          </button>
          <button
            type="button"
            className="barra__boton"
            aria-label="Cerrar sesión"
            title="Cerrar sesión"
            onClick={alSalir}
          >
            <IconoCerrar />
          </button>
        </div>
      </header>

      <div className="cuerpo">
        <nav
          id="menu-lateral"
          className={`menu ${menuAbierto ? 'menu--abierto' : ''}`}
          aria-label="Menú principal"
          inert={!menuAbierto}
        >
          <button
            type="button"
            className={`menu__item ${pantalla === 'inicio' ? 'menu__item--activo' : ''}`}
            onClick={() => irA('inicio')}
          >
            Inicio
          </button>
          {MODULOS.map((m) => (
            <button
              key={m.id}
              type="button"
              className={`menu__item ${pantalla === m.id ? 'menu__item--activo' : ''}`}
              onClick={() => irA(m.id)}
            >
              {m.nombre}
            </button>
          ))}
        </nav>

        {menuAbierto && (
          <div className="velo" onClick={() => setMenuAbierto(false)} aria-hidden="true" />
        )}

        <main className="contenido">{children}</main>
      </div>
    </div>
  )
}
