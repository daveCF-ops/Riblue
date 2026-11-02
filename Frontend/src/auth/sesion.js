// ⚠️ TEMPORAL: esta validación es de práctica, vive en el navegador y cualquiera
// puede verla. Cuando tengas backend, reemplaza SOLO el cuerpo de iniciarSesion()
// por una petición, por ejemplo:
//   const res = await fetch('/api/login', { method: 'POST', ... })
// El resto de la app no necesita cambios.
const USUARIO_PRUEBA = { usuario: 'admin', contrasena: 'riblue123', nombre: 'Administrador' }

const CLAVE = 'riblue-sesion'

export async function iniciarSesion(usuario, contrasena) {
  await new Promise((r) => setTimeout(r, 400)) // simula la espera del servidor
  const coincide =
    usuario.trim().toLowerCase() === USUARIO_PRUEBA.usuario &&
    contrasena === USUARIO_PRUEBA.contrasena
  if (!coincide) throw new Error('Usuario o contraseña incorrectos.')
  const sesion = { usuario: USUARIO_PRUEBA.usuario, nombre: USUARIO_PRUEBA.nombre }
  try {
    sessionStorage.setItem(CLAVE, JSON.stringify(sesion))
  } catch {
    /* si el navegador bloquea el almacenamiento, la sesión dura mientras no recargues */
  }
  return sesion
}

export function leerSesion() {
  try {
    return JSON.parse(sessionStorage.getItem(CLAVE))
  } catch {
    return null
  }
}

export function cerrarSesion() {
  try {
    sessionStorage.removeItem(CLAVE)
  } catch {
    /* nada que limpiar */
  }
}
