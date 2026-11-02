// Módulos del sistema. Cada uno corresponde a una tabla de la base de datos.
// Para agregar una pantalla al menú, agrega un objeto aquí.
export const MODULOS = [
  { id: 'clientes', nombre: 'Clientes', descripcion: 'Contacto y dirección de entrega', metrica: '124 Activos', alerta: null, accion1: '+ Añadir', accion2: 'Ver todos' },
  { id: 'empleados', nombre: 'Empleados', descripcion: 'Personal, rol y estado', metrica: '8/10 en turno', alerta: '2 en descanso', accion1: 'Checar entrada', accion2: 'Roles' },
  { id: 'proveedores', nombre: 'Proveedores', descripcion: 'A quién le compras y cómo le pagas', metrica: '2 entregas hoy', alerta: '$5,800 por pagar', accion1: '+ Nuevo pedido', accion2: 'Directorio' },
  { id: 'categorias', nombre: 'Categorías', descripcion: 'Helados, concentrados, coctelería', metrica: '6 activas', alerta: null, accion1: '+ Crear', accion2: 'Reordenar' },
  { id: 'productos', nombre: 'Productos', descripcion: 'Existencias, precios y proveedor', metrica: '340 items', alerta: '4 por agotarse', accion1: '+ Registrar', accion2: 'Ajustar stock' },
  { id: 'almacen', nombre: 'Almacén', descripcion: 'Inventario de compras y bodega', metrica: 'Bodega Central', alerta: null, accion1: 'Ver inventario', accion2: 'Surtir barra' }, // <-- NUEVO
  { id: 'ventas', nombre: 'Ventas', descripcion: 'Pedidos, pagos y entregas', metrica: '$14,250 hoy', alerta: '+12% vs ayer', accion1: '+ Nueva venta', accion2: 'Facturas' },
  { id: 'tipos', nombre: 'Tipos', descripcion: 'Servicio, curso o producto', metrica: '12 Serv / 4 Cur', alerta: null, accion1: 'Configurar', accion2: 'Tarifas' },
]
