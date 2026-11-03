import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Menu from './components/Menu';
import Clientes from './components/Clientes';
import Productos from './components/Productos';
import Proveedores from './components/Proveedores';
import Categorias from './components/Categorias'; 
import Ventas from './components/Ventas';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta pública del Login */}
        <Route path="/" element={<Login />} />

        {/* Rutas anidadas dentro de Menu (Mantienen el menú visible en todas las vistas) */}
        <Route element={<Menu />}>
          <Route path="/menu" element={<Navigate to="/clientes" replace />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/proveedores" element={<Proveedores />} />
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/ventas" element={<Ventas />} />
        </Route>

        {/* Ruta comodín (404): Redirige al Login si la URL no existe */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;