function Sidebar({ setPantalla }) {
  return (
    <aside className="sidebar">
      <h3 onClick={() => setPantalla('groups')} style={{ cursor: 'pointer' }}>
        📌 Comunidades
      </h3>
      <ul className="group-list">
        <li className="group-item" onClick={() => setPantalla('home')}>🏠 Home</li>
        <li onClick={() => setPantalla('groups')} className="group-item">📚 Grupos Temáticos</li>
        <li className="group-item" onClick={() => setPantalla('live')} style={{ color: '#ef4444', fontWeight: 'bold' }}>🔴 EN VIVO</li>
        <li className="group-item" onClick={() => setPantalla('groups')}>🕹️ r/retrogaming</li>
        <li className="group-item" onClick={() => setPantalla('groups')}>👾 r/HTML</li>
      </ul>
    </aside>
  );
}

export default Sidebar;