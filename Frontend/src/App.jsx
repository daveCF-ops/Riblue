import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';// Importamos los componentes necesarios de react-router-dom
import Login from './components/Login';// Importamos los componentes desde la carpeta components
import Menu from './components/Menu';
import Cliente from './views/Cliente';
import Categoria from './views/Categoria';
import Venta from './views/Venta';
import './App.css';// Importamos los estilos globales de App

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta pública del Login (Sin menú lateral) */}
        <Route path="/" element={<Login />} />

        {/* Ruta contenedora: Menu actúa como plantilla general */}
        <Route element={<Menu />}>
          <Route path="/menu" element={<Navigate to="/ventas" replace />} />
          <Route path="/clientes" element={<Cliente />} />
          <Route path="/categorias" element={<Categoria />} />
          <Route path="/ventas" element={<Venta />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;