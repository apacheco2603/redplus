import React, { useState } from 'react';

const TRENDING = [
  { tag: '#Retrogaming', posts: '15.4k posts', category: 'Gaming' },
  { tag: '#HTML',        posts: '8.2k posts',  category: 'Consolas' },
  { tag: '#TechPeru',    posts: '12.1k posts', category: 'Tecnología' },
  { tag: '#WebDev',      posts: '24.9k posts', category: 'Programación' }
];

function Home({ user }) {
  const [publicaciones, setPublicaciones] = useState(() => {
    const guardadas = JSON.parse(localStorage.getItem('posts_redplus'));
    if (guardadas && guardadas.length > 0) return guardadas;

    return [
      {
        id: 1,
        author: 'Carlos Mendoza',
        role: 'r/HTML • Estudiante',
        color: 'var(--primary)',
        title: 'Proyecto de Frontend Avanzado',
        body: 'Gente, avanzamos la estructura principal del foro para la entrega. Dejo los componentes base listos para revisión grupal.',
        likes: 15,
        usuariosLike: [],
        comentarios: []
      },
      {
        id: 2,
        author: `u/${user || 'usuario'}`,
        role: 'r/WebDevelopment • Creador',
        color: 'var(--accent)',
        title: 'Duda con useEffect en React',
        body: '¿Alguien sabe por qué se duplica el renderizado al cargar datos simulados de la lista de tendencias?',
        likes: 3,
        usuariosLike: [],
        comentarios: []
      }
    ];
  });

  const [nuevoPostTexto, setNuevoPostTexto] = useState('');
  const [nuevosComentarios, setNuevosComentarios] = useState({});
  const [postAbierto, setPostAbierto] = useState({});

  const guardarEnStorage = (nuevosPosts) => {
    setPublicaciones(nuevosPosts);
    localStorage.setItem('posts_redplus', JSON.stringify(nuevosPosts));
  };

  const handleCrearPost = () => {
    if (!nuevoPostTexto.trim()) return;

    const nuevoPost = {
      id: Date.now(),
      author: user || 'usuario',
      role: 'r/General • Estudiante',
      color: 'var(--primary)',
      title: 'Publicación General',
      body: nuevoPostTexto.trim(),
      likes: 0,
      usuariosLike: [],
      comentarios: []
    };

    guardarEnStorage([nuevoPost, ...publicaciones]);
    setNuevoPostTexto('');
  };

  const handleLike = (id) => {
    const nuevosPosts = publicaciones.map(post => {
      if (post.id === id) {
        const yaDioLike = post.usuariosLike.includes(user);
        let nuevosLikes = post.likes;
        let nuevosUsuarios = [...post.usuariosLike];

        if (yaDioLike) {
          nuevosLikes -= 1;
          nuevosUsuarios = nuevosUsuarios.filter(u => u !== user);
        } else {
          nuevosLikes += 1;
          nuevosUsuarios.push(user);
        }

        return { ...post, likes: nuevosLikes, usuariosLike: nuevosUsuarios };
      }
      return post;
    });
    guardarEnStorage(nuevosPosts);
  };

  const toggleComentarios = (id) => {
    setPostAbierto({
      ...postAbierto,
      [id]: !postAbierto[id]
    });
  };

  const handleInputChange = (postId, texto) => {
    setNuevosComentarios({
      ...nuevosComentarios,
      [postId]: texto
    });
  };

  const handleAddComentario = (e, postId) => {
    e.preventDefault();
    const textoComentario = nuevosComentarios[postId];
    if (!textoComentario || !textoComentario.trim()) return;

    const nuevosPosts = publicaciones.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comentarios: [
            ...post.comentarios,
            { autor: user || 'usuario', texto: textoComentario.trim() }
          ]
        };
      }
      return post;
    });

    guardarEnStorage(nuevosPosts);
    setNuevosComentarios({
      ...nuevosComentarios,
      [postId]: ''
    });
  };

  return (
    <>
      <main className="content-feed">
        <div className="feed-header">
          <h2>Muro de Proyectos</h2>
          <p>Bienvenido de vuelta, u/{user}</p>
        </div>

        <div className="project-card" style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
          <input 
            type="text" 
            placeholder="Crear una publicación general..." 
            value={nuevoPostTexto}
            onChange={(e) => setNuevoPostTexto(e.target.value)}
            style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg-main)', color: 'var(--text-main)', outline: 'none' }}
          />
          <button 
            onClick={handleCrearPost}
            style={{ background: 'var(--primary)', color: 'white', border: 'none', padding: '0 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Publicar
          </button>
        </div>

        {publicaciones.map((p) => {
          const dioLike = p.usuariosLike?.includes(user);
          const estaAbierto = postAbierto[p.id];

          return (
            <article key={p.id} className="project-card" style={{ marginBottom: '20px' }}>
              <div className="card-header">
                <div className="user-avatar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: p.color || 'var(--primary)', color: 'white', fontWeight: 'bold' }}>
                  {p.author.charAt(0).toLowerCase()}
                </div>
                <div>
                  <h4>{p.author.startsWith('u/') ? p.author : `u/${p.author}`}</h4>
                  <span className="user-badge">{p.role}</span>
                </div>
              </div>
              <div className="card-body">
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </div>
              <div className="card-footer" style={{ display: 'flex', gap: '10px' }}>
                <button 
                  className="btn-action btn-like" 
                  onClick={() => handleLike(p.id)}
                  style={{ color: dioLike ? '#10b981' : 'inherit', fontWeight: dioLike ? 'bold' : 'normal' }}
                >
                  {dioLike ? '❤️ Apoyado' : '👍 Apoyar'} ({p.likes})
                </button>
                <button className="btn-action" onClick={() => toggleComentarios(p.id)}>
                  💬 Comentar ({p.comentarios?.length || 0})
                </button>
              </div>

              {estaAbierto && (
                <div style={{ marginTop: '15px', padding: '15px', background: 'var(--bg-main)', borderRadius: '8px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
                    {p.comentarios?.map((com, index) => (
                      <div key={index} style={{ fontSize: '13px', paddingBottom: '4px', borderBottom: '1px solid var(--border)' }}>
                        <span style={{ fontWeight: 'bold' }}>u/{com.autor}: </span>
                        <span>{com.texto}</span>
                      </div>
                    ))}
                  </div>
                  <form onSubmit={(e) => handleAddComentario(e, p.id)} style={{ display: 'flex', gap: '10px' }}>
                    <input 
                      type="text" 
                      placeholder="Escribe un comentario..." 
                      style={{ flex: 1, padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--border)', background: 'var(--bg-card)', color: 'var(--text-main)', outline: 'none', fontSize: '13px' }}
                      value={nuevosComentarios[p.id] || ''}
                      onChange={(e) => handleInputChange(p.id, e.target.value)}
                      required
                    />
                    <button 
                      type="submit" 
                      style={{ background: 'var(--primary)', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: 'bold' }}
                    >
                      Enviar
                    </button>
                  </form>
                </div>
              )}
            </article>
          );
        })}
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
