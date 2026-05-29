import React from 'react';

function Navbar({ theme, toggleTheme }) {
  return (
    <nav className="navbar">
      <div className="nav-logo">RedPlus<span>+</span></div>
      
      <div className="search-container">
        <input type="text" placeholder="Buscar proyectos, grupos o habilidades..." className="search-input" />
      </div>

      <div className="nav-actions">
        <button onClick={toggleTheme} className="btn-theme">
          {theme === 'light' ? '🌙 Modo Oscuro' : '☀️ Modo Claro'}
        </button>
        <button className="btn-profile">Mi Perfil</button>
      </div>
    </nav>
  );
}

export default Navbar;