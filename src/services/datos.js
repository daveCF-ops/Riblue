// src/services/datos.js

// Función para guardar datos en el navegador
export const guardarDatos = (coleccion, datos) => {
  localStorage.setItem(coleccion, JSON.stringify(datos));
};

// Función para leer datos
export const leerDatos = (coleccion) => {
  const datos = localStorage.getItem(coleccion);
  return datos ? JSON.parse(datos) : [];
};

// --- SIMULACIÓN DE CLIENTES INICIALES ---
// Si no hay clientes guardados, ponemos unos de prueba
if (leerDatos('clientes').length === 0) {
  guardarDatos('clientes', [
    { id: 1, nombre: 'Juan Pérez', telefono: '555-1234', email: 'juan@mail.com', ciudad: 'CDMX' },
    { id: 2, nombre: 'María López', telefono: '555-5678', email: 'maria@mail.com', ciudad: 'Guadalajara' }
  ]);
}
// ... código anterior ...

// --- SIMULACIÓN DE PROVEEDORES INICIALES ---
if (leerDatos('proveedores').length === 0) {
  guardarDatos('proveedores', [
    { id: 1, empresa: 'Distribuidora La Europea', contacto: 'Carlos Ruiz', telefono: '555-999-888', email: 'ventas@laeuropea.com', ciudad: 'CDMX' },
    { id: 2, empresa: 'Coca-Cola FEMSA', contacto: 'Ventas Zona Sur', telefono: '555-111-222', email: 'pedidos@femsa.com', ciudad: 'CDMX' }
  ]);
}