import React from 'react';

function Sidebar({ setPantalla }) {
  return (
    <aside className="sidebar">
      <h3 onClick={() => setPantalla('groups')} style={{ cursor: 'pointer' }}>
        📌 Grupos Temáticos
      </h3>
      <ul className="group-list">
        <li className="group-item" onClick={() => setPantalla('groups')}>🌐 Frontend</li>
        <li className="group-item" onClick={() => setPantalla('groups')}>⚙️ Backend</li>
        <li className="group-item" onClick={() => setPantalla('groups')}>📊 Data Science</li>
        <li className="group-item" onClick={() => setPantalla('groups')}>📡 Redes y TI</li>
        <li className="group-item" onClick={() => setPantalla('groups')}>🎮 Videojuegos</li>
      </ul>
    </aside>
  );
}

export default Sidebar;