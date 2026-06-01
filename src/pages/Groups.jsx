function Groups() {
  const comunidades = [
    { name: "r/retrogaming", desc: "Espacio de videojuegos clásicos y consolas antiguas.", posts: "15.4k" },
    { name: "r/HTML", desc: "Todo sobre maquetación web, Frontend y trucos de CSS.", posts: "8.2k" },
    { name: "r/TechPeru", desc: "Comunidad tecnológica local y debates de TI.", posts: "12.1k" },
    { name: "r/WebDevelopment", desc: "Programación general y arquitecturas modernas.", posts: "24.9k" }
  ];

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
          <button className="btn-primary" style={{ padding: '8px 16px', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold' }}>
            Unirse
          </button>
        </div>
      ))}
    </main>
  );
}

export default Groups;