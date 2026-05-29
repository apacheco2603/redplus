import React from 'react';

function Home() {
  return (
    <main className="content-feed">
      <div className="feed-header">
        <h2>Muro de Proyectos</h2>
        <p>Explora y colabora con los trabajos de la comunidad</p>
      </div>

      {/* Tarjeta de Proyecto 1 */}
      <article className="project-card">
        <div className="card-header">
          <img src="https://via.placeholder.com/40" alt="Avatar" className="user-avatar" />
          <div>
            <h4>Carlos Mendoza</h4>
            <span className="user-badge">Estudiante - Ulima</span>
          </div>
        </div>
        <div className="card-body">
          <h3>E-Commerce con React y Tailwind</h3>
          <p>Estoy desarrollando el frontend de una tienda virtual para el curso. Dejo mi repositorio por si alguien quiere sumarse al equipo o dar feedback.</p>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="github-link">
            📁 Ver repositorio en GitHub
          </a>
        </div>
        <div className="card-footer">
          <button className="btn-action btn-like">👍 Apoyar (15)</button>
          <button className="btn-action">💬 Comentar (4)</button>
        </div>
      </article>

      {/* Tarjeta de Proyecto 2 */}
      <article className="project-card">
        <div className="card-header">
          <img src="https://via.placeholder.com/40" alt="Avatar" className="user-avatar" />
          <div>
            <h4>Andrea R.</h4>
            <span className="user-badge">Modeladora 3D</span>
          </div>
        </div>
        <div className="card-body">
          <h3>Diseño de Entorno Cyberpunk</h3>
          <p>Acabo de terminar este mapa conceptual interactivo para un videojuego independiente. ¡Usa CSS dinámico para cambiar la iluminación!</p>
          <span className="tech-tag">Modelado 3D</span>
        </div>
        <div className="card-footer">
          <button className="btn-action btn-like">👍 Apoyar (32)</button>
          <button className="btn-action">💬 Comentar (8)</button>
        </div>
      </article>
    </main>
  );
}

export default Home;