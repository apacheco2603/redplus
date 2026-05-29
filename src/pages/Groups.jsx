import React from 'react';

function Groups() {
  const comunidades = [
    { name: "🌐 Frontend", desc: "Comunidad de React, Vue, Angular y diseño web UI/UX.", members: 145 },
    { name: "⚙️ Backend", desc: "Discusiones sobre Node.js, Express, bases de datos y arquitectura.", members: 120 },
    { name: "🎮 Videojuegos", desc: "Desarrollo en Unity, Unreal Engine y modelado 3D.", members: 98 },
    { name: "📡 Redes y TI", desc: "Configuración de servidores, protocolos, CCNA y ciberseguridad.", members: 64 }
  ];

  return (
    <main className="content-feed">
      <div className="feed-header">
        <h2>Grupos Temáticos Explora comunidades especializadas.</h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '1rem' }}>
        {comunidades.map((grupo, index) => (
          <div key={index} className="project-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <h3>{grupo.name}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{grupo.desc}</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', borderTop: '1px solid var(--border)', paddingTop: '0.75rem' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>👥 {grupo.members} miembros</span>
              <button className="btn-primary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}>Unirse al grupo</button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Groups;