import React from 'react';

function Sidebar() {
  return (
    <aside className="sidebar">
      <h3>📌 Grupos Temáticos</h3>
      <ul className="group-list">
        <li className="group-item active">🌐 Frontend</li>
        <li className="group-item">⚙️ Backend</li>
        <li className="group-item">📊 Data Science</li>
        <li className="group-item">📡 Redes y TI</li>
        <li className="group-item">🎮 Videojuegos</li>
      </ul>
    </aside>
  );
}

export default Sidebar;