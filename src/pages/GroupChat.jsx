import { useState, useEffect, useRef } from 'react';

function GroupChat({ group, setPantalla, user }) {
  const [mensajes, setMensajes] = useState([]);
  const [nuevoMensaje, setNuevoMensaje] = useState('');
  const mensajesFinRef = useRef(null); 

  useEffect(() => {
    if (!group) return;
    
    const mensajesIniciales = [
      { id: 1, emisor: 'Admin', texto: `¡Bienvenidos al canal de ${group.name}! Reglas: Respeto y compartir código.` }
    ];

    if (group.id === 'frontend') {
      mensajesIniciales.push({ id: 2, emisor: 'react_dev', texto: '¿Alguien ha probado usar hooks personalizados para el estado de la UI?' });
    } else if (group.id === 'redes') {
      mensajesIniciales.push(
        { id: 2, emisor: 'sysadmin', texto: 'Ayer tuve que diagnosticar un corto en la PCB de un disco duro de 1TB. Un dolor de cabeza.' },
        { id: 3, emisor: 'linux_fan', texto: 'Para rescates de datos, recomiendo muchísimo bootear Fedora y usar ddrescue. Literalmente me salvó un Toshiba entero la semana pasada.' }
      );
    }

    setMensajes(mensajesIniciales);
  }, [group]);

  useEffect(() => {
    mensajesFinRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [mensajes]);

  const enviarMensaje = (e) => {
    e.preventDefault();
    if (!nuevoMensaje.trim()) return;

    const miMensaje = { id: Date.now(), emisor: `u/${user}`, texto: nuevoMensaje, propio: true };
    setMensajes(prev => [...prev, miMensaje]);
    setNuevoMensaje('');

    setTimeout(() => {
      const respuestasMock = ['¡Interesante aporte!', 'Totalmente de acuerdo contigo.', '¿Podrías explicar un poco más sobre eso?', 'Voy a probar eso en mi próximo proyecto.'];
      const respuestaAleatoria = respuestasMock[Math.floor(Math.random() * respuestasMock.length)];
      
      const respuesta = { 
        id: Date.now() + 1, 
        emisor: 'bot_comunidad', 
        texto: respuestaAleatoria 
      };
      
      setMensajes(prev => [...prev, respuesta]);
    }, 1500);
  };

  if (!group) return null;

  return (
    <main className="content-feed">
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
        <button 
          onClick={() => setPantalla('groupForum')}
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-main)', padding: '8px 12px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          ⬅ Volver
        </button>
        <div>
          <h2 style={{ margin: '0' }}>Canal: {group.name}</h2>
          <p style={{ color: 'var(--text-muted)', margin: '0', fontSize: '14px' }}>🟢 Conectado vía WebSockets (Simulado)</p>
        </div>
      </div>

      <div className="group-chat-box project-card" style={{ display: 'flex', flexDirection: 'column', height: '60vh', padding: '0', overflow: 'hidden' }}>
        
        {/* Área de mensajes */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px', background: 'var(--bg-main)', display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {mensajes.map((msg) => (
            <div key={msg.id} style={{ alignSelf: msg.propio ? 'flex-end' : 'flex-start', maxWidth: '80%' }}>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px', display: 'block', textAlign: msg.propio ? 'right' : 'left' }}>
                {msg.emisor}
              </span>
              <div style={{ 
                background: msg.propio ? 'var(--primary)' : 'var(--bg-card)', 
                color: msg.propio ? 'white' : 'var(--text-main)',
                padding: '10px 15px', 
                borderRadius: '12px',
                border: msg.propio ? 'none' : '1px solid var(--border)'
              }}>
                {msg.texto}
              </div>
            </div>
          ))}
          <div ref={mensajesFinRef} />
        </div>

        {/* Input para enviar mensajes */}
        <form onSubmit={enviarMensaje} style={{ display: 'flex', padding: '15px', background: 'var(--bg-card)', borderTop: '1px solid var(--border)' }}>
          <input 
            type="text" 
            placeholder={`Escribe un mensaje en ${group.name}...`}
            value={nuevoMensaje}
            onChange={(e) => setNuevoMensaje(e.target.value)}
            style={{ flex: 1, padding: '10px 15px', borderRadius: '20px', border: '1px solid var(--border)', background: 'var(--bg-main)', color: 'var(--text-main)', outline: 'none' }}
          />
          <button type="submit" style={{ marginLeft: '10px', background: 'var(--primary)', color: 'white', border: 'none', padding: '0 20px', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold' }}>
            Enviar
          </button>
        </form>

      </div>
    </main>
  );
}

export default GroupChat;