function Groups({ setPantalla, setActiveGroup }) {
  const comunidades = [
    { id: 'frontend', name: "Frontend", desc: "Todo sobre React, UI/UX, CSS, Vite y maquetación web.", posts: "15.4k" },
    { id: 'backend', name: "Backend", desc: "Node.js, APIs, bases de datos y arquitectura de servidores.", posts: "8.2k" },
    { id: 'data', name: "Data Science", desc: "Python, Machine Learning, manejo de datos y estadísticas.", posts: "12.1k" },
    { id: 'redes', name: "Redes y TI", desc: "Infraestructura, servidores Linux, hardware y recuperación de datos.", posts: "24.9k" }
  ];

  const entrarAlGrupo = (grupo) => {
    setActiveGroup(grupo);
    setPantalla('groupForum');
  };

  return (
    <main className="content-feed">
      <div style={{ marginBottom: '20px' }}>
        <h2>Comunidades Tecnológicas</h2>
        <p style={{ color: 'var(--text-muted)' }}>Explora los grupos disponibles en RedPlus</p>
      </div>

      {comunidades.map((grupo, index) => (
        <div key={index} className="project-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <div>
            <h3 style={{ margin: '0 0 5px 0', color: 'var(--primary)' }}>{grupo.name}</h3>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>{grupo.desc}</p>
          </div>
          <button className="btn-primary" onClick={() => entrarAlGrupo(grupo)} style={{ padding: '8px 16px', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold', background: 'var(--primary)', color: 'white', border: 'none' }}>
            Entrar
          </button>
        </div>
      ))}
    </main>
  );
}

export default Groups;