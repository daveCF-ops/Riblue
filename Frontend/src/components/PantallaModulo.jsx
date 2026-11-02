import Migas from './Migas'

// Pantalla provisional para cada módulo. Aquí irá la tabla con los botones
// "Agregar" y "Modificar" según el diagrama de interfaces.
export default function PantallaModulo({ modulo, irA }) {
  return (
    <>
      <Migas
        partes={[{ texto: 'Inicio', onClick: () => irA('inicio') }, { texto: modulo.nombre }]}
      />

      <h2 className="titulo">{modulo.nombre}</h2>
      <p className="subtitulo">{modulo.descripcion}</p>

      <div className="pendiente">
        Aquí irá la tabla de {modulo.nombre.toLowerCase()} con sus botones Agregar y Modificar.
      </div>
    </>
  )
}
