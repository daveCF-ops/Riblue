import { useNavigate } from 'react-router-dom';
import './Menu.css';

function Menu() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="menu-container">
      
      <header className="menu-header">
        <h1>Menú de Riblue</h1>
        <button className="btn-logout" onClick={handleLogout}>
          Cerrar Sesión
        </button>
      </header>

      <div className="menu-grid">
        
        {/* Cada tarjeta ahora es un <button> con su onClick */}
        <button className="menu-card" onClick={() => navigate('/categorias')}>
          <h2>Categorías</h2>
        </button>

        <button className="menu-card" onClick={() => navigate('/ventas')}>
          <h2>Ventas</h2>
        </button>

        <button className="menu-card" onClick={() => navigate('/clientes')}>
          <h2>Clientes</h2>
        </button>

        <button className="menu-card" onClick={() => navigate('/productos')}>
          <h2>Productos</h2>
        </button>

        <button className="menu-card" onClick={() => navigate('/proveedores')}>
          <h2>Proveedores</h2>
        </button>

        <button className="menu-card" onClick={() => navigate('/tipos')}>
          <h2>Tipos</h2>
        </button>

      </div>
    </div>
  );
}

export default Menu;