import React from 'react';

function Profile() {
  return (
    <main className="content-feed">
      <div className="project-card" style={{ textAlign: 'center', padding: '2rem' }}>
        <img 
          src="https://via.placeholder.com/120" 
          alt="Foto de Perfil" 
          style={{ borderRadius: '50%', border: '4px solid var(--primary)', marginBottom: '1rem' }} 
        />
        <h2>Carlos Mendoza</h2>
        <p style={{ color: 'var(--text-muted)', marginTop: '-0.5rem' }}>Estudiante de Ingeniería de Sistemas - Ulima</p>
        
        <p style={{ maxWidth: '600px', margin: '1rem auto', lineHexight: '1.6' }}>
          Apasionado por el desarrollo Front-End y la arquitectura de software. Actualmente aprendiendo React, Vite y metodologías ágiles. ¡Abierto a colaborar en proyectos de videojuegos y web!
        </p>

        <hr style={{ border: '0', borderTop: '1px solid var(--border)', margin: '2rem 0' }} />

        <h3>🛠️ Mis Habilidades</h3>
        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '1rem' }}>
          <span className="tech-tag">React.js</span>
          <span className="tech-tag">JavaScript ES6</span>
          <span className="tech-tag">HTML5 & CSS3</span>
          <span className="tech-tag">Git & GitHub</span>
          <span className="tech-tag">UI/UX Design</span>
        </div>
      </div>
    </main>
  );
}

export default Profile;