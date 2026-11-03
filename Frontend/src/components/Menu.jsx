import React from 'react';// Importamos React
import { Link, Outlet } from 'react-router-dom';// Importamos Link y Outlet de react-router-dom para la navegación dinámica
import { Home, Package, Folder, Users, ShoppingCart, LogOut, LayoutGrid } from 'lucide-react';// Importamos los iconos de la interfaz
import './Menu.css';// Importamos los estilos del menú

export default function Menu() {
  return (
    <div className="layout-container">
      {/* ===== BARRA LATERAL FIJA ===== */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <LayoutGrid size={24} />
          <div>
            <div className="brand-title">RIBLUE</div>
            <div className="brand-subtitle">Gestión de Coctelería</div>
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section-label">Menú Principal</div>
          <ul className="nav-list">
            <li>
              <Link to="/categorias" className="nav-item">
                <Folder size={18} /> Categorías
              </Link>
            </li>
            <li>
              <Link to="/clientes" className="nav-item">
                <Users size={18} /> Clientes
              </Link>
            </li>
            <li>
              <Link to="/ventas" className="nav-item">
                <ShoppingCart size={18} /> Ventas
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* ===== ÁREA PRINCIPAL ===== */}
      <main className="main-wrapper">
        <header className="top-header">
          <h1>Panel de Control</h1>
          <button className="logout-btn">
            <LogOut size={14} /> Cerrar sesión
          </button>
        </header>

        {/* AQUÍ SE INYECTAN DINÁMICAMENTE CLIENTES, CATEGORÍAS O VENTAS */}
        <section className="content-area">
          <Outlet /> 
        </section>
      </main>
    </div>
  );
}