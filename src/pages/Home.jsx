const POSTS = [
  {
    author: 'Carlos Mendoza', role: 'r/HTML • Estudiante', color: 'var(--primary)',
    title: 'Proyecto de Frontend Avanzado',
    body: 'Gente, avanzamos la estructura principal del foro para la entrega. Dejo los componentes base listos para revisión grupal.',
    likes: 15, comments: 4
  }
];

const TRENDING = [
  { tag: '#Retrogaming', posts: '15.4k posts', category: 'Gaming' },
  { tag: '#HTML',        posts: '8.2k posts',  category: 'Consolas' },
  { tag: '#TechPeru',    posts: '12.1k posts', category: 'Tecnología' },
  { tag: '#WebDev',      posts: '24.9k posts', category: 'Programación' }
];

function Home({ user }) {
  const myPost = {
    author: `u/${user}`, role: 'r/WebDevelopment • Creador', color: 'var(--accent)',
    title: 'Duda con useEffect en React',
    body: '¿Alguien sabe por qué se duplica el renderizado al cargar datos simulados de la lista de tendencias?',
    likes: 3, comments: 1
  };

  return (
    <>
      <main className="content-feed">
        <div className="feed-header">
          <h2>Muro de Proyectos</h2>
          <p>Bienvenido de vuelta, u/{user}</p>
        </div>

        {/* Barra de Publicación */}
        <div className="project-card" style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
          <input 
            type="text" 
            placeholder="Crear una publicación general..." 
            style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg-main)', color: 'var(--text-main)', outline: 'none' }}
          />
          <button style={{ background: 'var(--primary)', color: 'white', border: 'none', padding: '0 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
            Publicar
          </button>
        </div>
        {/* Fin */}

        {[...POSTS, myPost].map((p, i) => (
          <article key={i} className="project-card">
            <div className="card-header">
              <div className="user-avatar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: p.color, color: 'white', fontWeight: 'bold' }}>u</div>
              <div>
                <h4>{p.author}</h4>
                <span className="user-badge">{p.role}</span>
              </div>
            </div>
            <div className="card-body">
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </div>
            <div className="card-footer">
              <button className="btn-action btn-like">👍 Apoyar ({p.likes})</button>
              <button className="btn-action">💬 Comentar ({p.comments})</button>
            </div>
          </article>
        ))}
      </main>

      <aside className="sidebar" style={{ width: '280px' }}>
        <h3>⚡ Tendencias para ti</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '1rem' }}>
          {TRENDING.map((t, i) => (
            <div key={i} style={{ padding: '6px 0', borderBottom: '1px solid var(--border)' }}>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{t.category}</span>
              <p style={{ margin: '2px 0', fontWeight: 'bold', fontSize: '14px' }}>{t.tag}</p>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{t.posts}</span>
            </div>
          ))}
        </div>
      </aside>
    </>
  );
}

export default Home;