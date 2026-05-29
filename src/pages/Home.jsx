import React from 'react';

function Home({ user }) {
  const trendingTopics = [
    { tag: '#Retrogaming', posts: '15.4k posts', category: 'Gaming' },
    { tag: '#HTML', posts: '8.2k posts', category: 'Consolas' },
    { tag: '#TechPeru', posts: '12.1k posts', category: 'Tecnología' },
    { tag: '#WebDevelopment', posts: '24.9k posts', category: 'Programación' }
  ];

  return (
    <>
      <main className="content-feed">
        <div className="feed-header">
          <h2>Muro de Proyectos</h2>
          <p>Bienvenido de vuelta, u/{user}</p>
        </div>

        <article className="project-card">
          <div className="card-header">
            <div className="user-avatar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--primary)', color: 'white', fontWeight: 'bold' }}>u</div>
            <div>
              <h4>Carlos Mendoza</h4>
              <span className="user-badge">r/HTML • Estudiante</span>
            </div>
          </div>
          <div className="card-body">
            <h3>Proyecto de Frontend Avanzado</h3>
            <p>Gente, avanzamos la estructura principal del foro para la entrega. Dejo los componentes base listos para revisión grupal.</p>
          </div>
          <div className="card-footer">
            <button className="btn-action btn-like">👍 Apoyar (15)</button>
            <button className="btn-action">💬 Comentar (4)</button>
          </div>
        </article>

        <article className="project-card">
          <div className="card-header">
            <div className="user-avatar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--accent)', color: 'white', fontWeight: 'bold' }}>u</div>
            <div>
              <h4>u/{user}</h4>
              <span className="user-badge">r/WebDevelopment • Creador</span>
            </div>
          </div>
          <div className="card-body">
            <h3>Duda con useEffect en React</h3>
            <p>¿Alguien sabe por qué se me duplica el renderizado al cargar los datos simulados de la lista de tendencias?</p>
          </div>
          <div className="card-footer">
            <button className="btn-action btn-like">👍 Apoyar (3)</button>
            <button className="btn-action">💬 Comentar (1)</button>
          </div>
        </article>
      </main>

      <aside className="sidebar" style={{ width: '280px' }}>
        <h3>⚡ Tendencias para ti</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '1rem' }}>
          {trendingTopics.map((topic, index) => (
            <div key={index} style={{ padding: '6px 0', borderBottom: '1px solid var(--border)' }}>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{topic.category}</span>
              <p style={{ margin: '2px 0', fontWeight: 'bold', fontSize: '14px' }}>{topic.tag}</p>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{topic.posts}</span>
            </div>
          ))}
        </div>
      </aside>
    </>
  );
}

export default Home;