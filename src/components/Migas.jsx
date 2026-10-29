// Ruta de navegación: "INICIO | CLIENTES | AGREGAR"
// "partes" es una lista de { texto, onClick }. La última es la pantalla actual.
export default function Migas({ partes }) {
  return (
    <nav aria-label="Ubicación" className="migas">
      <ol>
        {partes.map((parte, i) => {
          const esActual = i === partes.length - 1
          return (
            <li key={parte.texto}>
              {esActual ? (
                <span aria-current="page">{parte.texto}</span>
              ) : (
                <button type="button" onClick={parte.onClick}>
                  {parte.texto}
                </button>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
