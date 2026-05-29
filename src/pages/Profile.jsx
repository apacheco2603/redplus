import React from 'react';

function Profile({ user }) {
  return (
    <>
      <main className="feed">
        <div className="post" style={{ padding: '20px' }}>
          <div className="profile-banner">
            <div className="avatar">👤</div>
            <h2>u/{user}</h2>
          </div>
          <p style={{ color: '#82959b', marginBottom: '15px' }}>Miembro Estudiante Universitario</p>
          
          <p style={{ fontSize: '14px', lineHeight: '1.5' }}>
            Espacio de trabajo del grupo. Desarrollando vistas modulares en React utilizando estados dinámicos simples para simular la persistencia.
          </p>

          <div style={{ marginTop: '20px', borderTop: '1px solid #1a282d', paddingTop: '15px' }}>
            <h4>Tecnologías del Proyecto</h4>
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <span style={{ background: '#2a3c42', padding: '4px 8px', borderRadius: '6px', fontSize: '13px' }}>React</span>
              <span style={{ background: '#2a3c42', padding: '4px 8px', borderRadius: '6px', fontSize: '13px' }}>CSS</span>
              <span style={{ background: '#2a3c42', padding: '4px 8px', borderRadius: '6px', fontSize: '13px' }}>Vite</span>
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