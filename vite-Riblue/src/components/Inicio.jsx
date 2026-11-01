import { MODULOS } from '../data/modulos'
import Migas from './Migas'

export default function Inicio({ irA }) {
  return (
    <>
      <Migas partes={[{ texto: 'Inicio' }]} />

      <h2 className="titulo">¿Qué quieres gestionar hoy?</h2>

      <div className="accesos">
        {MODULOS.map((m) => (
          <button key={m.id} type="button" className="acceso" onClick={() => irA(m.id)}>
            <span className="acceso__nombre">{m.nombre}</span>
            <span className="acceso__detalle">{m.descripcion}</span>
          </button>
        ))}
      </div>
    </>
  )
}
