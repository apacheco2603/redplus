import React, { useState } from 'react';

function Profile({ user }) {
  const usuariosDb = JSON.parse(localStorage.getItem('usuarios_redplus')) || [];
  const datosUsuario = usuariosDb.find(u => u.username === user) || {
    username: user,
    bio: 'Espacio de trabajo del grupo. Desarrollando vistas modulares en React utilizando estados dinámicos simples para simular la persistencia.',
    avatar: '👤',
    habilities: ['React', 'CSS', 'Vite']
  };

  const [editando, setEditando] = useState(false);
  const [bio, setBio] = useState(datosUsuario.bio);
  const [avatar, setAvatar] = useState(datosUsuario.avatar);
  const [nuevaHabilidad, setNuevaHabilidad] = useState('');
  const [habilidades, setHabilidades] = useState(datosUsuario.habilities);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const guardarCambios = () => {
    const nuevasDb = usuariosDb.map(u => {
      if (u.username === user) {
        return { ...u, bio, avatar, habilities: habilidades };
      }
      return u;
    });

    localStorage.setItem('usuarios_redplus', JSON.stringify(nuevasDb));
    setEditando(false);
    alert('¡Perfil actualizado en la base de datos local!');
  };

  const agregarHabilidad = (e) => {
    e.preventDefault();
    if (nuevaHabilidad.trim() && !habilidades.includes(nuevaHabilidad.trim())) {
      setHabilidades([...habilidades, nuevaHabilidad.trim()]);
      setNuevaHabilidad('');
    }
  };

  const eliminarHabilidad = (hab) => {
    setHabilidades(habilidades.filter(h => h !== hab));
  };

  return (
    <>
      <main className="feed">
        <div className="post" style={{ padding: '20px' }}>
          <div className="profile-banner">
            <div className="avatar" style={{ overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '50%', background: '#2a3c42' }}>
              {avatar && avatar !== '👤' ? (
                <img src={avatar} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <span style={{ fontSize: '20px' }}>👤</span>
              )}
            </div>
            <h2>u/{user}</h2>
          </div>
          <p style={{ color: '#82959b', marginBottom: '15px' }}>Miembro Estudiante Universitario</p>
          
          {editando ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '15px' }}>
              <label style={{ fontSize: '12px', fontWeight: 'bold' }}>Subir nueva foto de perfil:</label>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageChange} 
                style={{ marginBottom: '5px' }}
              />

              <label style={{ fontSize: '12px', fontWeight: 'bold' }}>Biografía:</label>
              <textarea 
                style={{ width: '100%', padding: '10px', background: 'var(--bg-main)', color: 'var(--text-main)', border: '1px solid var(--border)', borderRadius: '8px', minHeight: '60px', fontFamily: 'inherit', boxSizing: 'border-box' }}
                value={bio} 
                onChange={e => setBio(e.target.value)} 
              />

              <button className="btn-profile" onClick={guardarCambios}>Guardar Cambios</button>
            </div>
          ) : (
            <>
              <p style={{ fontSize: '14px', lineHeight: '1.5' }}>{bio}</p>
              <button className="btn-theme" style={{ marginTop: '10px', marginBottom: '15px' }} onClick={() => setEditando(true)}>
                ✏️ Editar Perfil
              </button>
            </>
          )}

          <div style={{ marginTop: '20px', borderTop: '1px solid #1a282d', paddingTop: '15px' }}>
            <h4>Tecnologías del Proyecto</h4>
            
            {editando && (
              <form onSubmit={agregarHabilidad} style={{ display: 'flex', gap: '10px', marginBottom: '1rem' }}>
                <input 
                  type="text" 
                  placeholder="Nueva habilidad..." 
                  className="search-input"
                  style={{ width: '150px' }}
                  value={nuevaHabilidad}
                  onChange={e => setNuevaHabilidad(e.target.value)}
                />
                <button type="submit" className="btn-profile" style={{ padding: '4px 12px' }}>+ Añadir</button>
              </form>
            )}

            <div style={{ display: 'flex', gap: '10px', marginTop: '10px', flexWrap: 'wrap' }}>
              {habilidades.map((hab, index) => (
                <span key={index} style={{ background: '#2a3c42', padding: '4px 8px', borderRadius: '6px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {hab}
                  {editando && (
                    <button 
                      type="button" 
                      onClick={() => eliminarHabilidad(hab)}
                      style={{ background: 'none', border: 'none', color: '#e74c3c', cursor: 'pointer', fontWeight: 'bold', padding: 0 }}
                    >
                      ×
                    </button>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
      </main>

      <aside className="side-right">
        <div className="trending-card">
          <h3>Estadísticas u/{user}</h3>
          <p style={{ fontSize: '14px', margin: '5px 0' }}>Karma de Post: 18</p>
          <p style={{ fontSize: '14px', margin: '5px 0' }}>Comentarios: 5</p>
        </div>
      </aside>
    </>
  );
}

export default Profile;