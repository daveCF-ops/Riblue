// App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Menu from './components/Menu';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta principal (Login) */}
        <Route path="/" element={<Login />} />
        
        {/* Ruta del Menú */}
        <Route path="/menu" element={<Menu />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;