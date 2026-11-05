
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
// Agregamos los iconos que faltan: Package (Productos), Truck (Proveedores), Tags (Tipos)
import { Home, Package, Folder, Users, ShoppingCart, LogOut, LayoutGrid, Truck, Tags } from 'lucide-react';
import './Menu.css';

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
            
            {/* NUEVOS ENLACES AGREGADOS */}
            <li>
              <Link to="/productos" className="nav-item">
                <Package size={18} /> Productos
              </Link>
            </li>
            <li>
              <Link to="/proveedores" className="nav-item">
                <Truck size={18} /> Proveedores
              </Link>
            </li>

            <li>
              <Link to="/categorias" className="nav-item">
                <Folder size={18} /> Categorías
              </Link>
            </li>

            <li>
              <Link to="/tipos" className="nav-item">
                <Tags size={18} /> Tipos
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

        {/* AQUÍ SE INYECTAN DINÁMICAMENTE LAS PANTALLAS */}
        <section className="content-area">
          <Outlet /> 
        </section>
      </main>
    </div>
  );
}