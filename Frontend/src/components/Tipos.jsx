import React, { useState } from 'react';
import { Edit, Plus, Trash2 } from 'lucide-react';
import FormularioTipo from './Modals/FormularioTipo';
import './Tipos.css';

function Tipos() {
  const [tipos, setTipos] = useState([
    { id: 1, nombre: 'Servicio', descripcion: 'Cursos o servicios' }
  ]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [tipoEditando, setTipoEditando] = useState(null);

  const abrirModalCrear = () => { setTipoEditando(null); setMostrarModal(true); };
  const abrirModalEditar = (tipo) => { setTipoEditando(tipo); setMostrarModal(true); };

  const handleGuardar = (data) => {
    if (tipoEditando) {
      setTipos(tipos.map(t => t.id === tipoEditando.id ? { ...t, ...data } : t));
    } else {
      setTipos([...tipos, { id: Date.now(), ...data }]);
    }
    setMostrarModal(false);
  };

  const handleEliminar = (id) => {
    if (window.confirm('¿Eliminar este tipo?')) {
      setTipos(tipos.filter(t => t.id !== id));
    }
  };

  return (
    <div className="tipo-container">
      <div className="tipo-header">
        <h2>Gestión de Tipos</h2>
        <button className="btn-agregar" onClick={abrirModalCrear}>
          <Plus size={18} /> Nuevo Tipo
        </button>
      </div>
      <div className="tabla-container">
        <table className="tabla-tipos">
          <thead>
            <tr><th>Nombre</th><th>Descripción</th><th>Acciones</th></tr>
          </thead>
          <tbody>
            {tipos.map((t) => (
              <tr key={t.id}>
                <td>{t.nombre}</td>
                <td>{t.descripcion}</td>
                <td className="acciones">
                  <button className="btn-accion btn-editar" onClick={() => abrirModalEditar(t)}><Edit size={16} /></button>
                  <button className="btn-accion btn-eliminar" onClick={() => handleEliminar(t.id)}><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <FormularioTipo mostrarModal={mostrarModal} onClose={() => setMostrarModal(false)} onSave={handleGuardar} tipoEditando={tipoEditando} />
    </div>
  );
}
export default Tipos;