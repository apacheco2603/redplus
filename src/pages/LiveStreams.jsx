import { useState, useEffect, useRef } from 'react';

const CATEGORIES = ['Todos', 'HTML', 'JavaScript', 'Python', 'Java'];

const STREAMS = [
  {
    id: 'carlos', username: 'carlos_dev', title: 'Maquetando el muro del foro RedPlus desde cero',
    category: 'HTML', viewers: 42, color: '#2563eb', avatar: 'C',
    tags: ['HTML', 'CSS', 'Foro', 'Universidad'],
    about: 'Proyecto universitario grupal para maquetar el frontend del foro RedPlus.',
    goal: { current: 15, target: 20, label: 'Likes para entrega' },
    files: [
      { name: 'index.html', icon: '🌐', code: `&lt;div <span class="syntax-attr">class</span>=<span class="syntax-string">"app-layout"</span>&gt;\n  &lt;header&gt;RedPlus+&lt;/header&gt;\n  &lt;main class="feed"&gt;\n    &lt;aside&gt;&lt;h3&gt;Comunidades&lt;/h3&gt;&lt;/aside&gt;\n  &lt;/main&gt;\n&lt;/div&gt;` },
      { name: 'styles.css', icon: '🎨', code: `<span class="syntax-class">.app-layout</span> {\n  display: flex;\n  min-height: 100vh;\n  background: #f4f6f9;\n}` }
    ]
  },
  {
    id: 'ana', username: 'ana_react', title: 'Creando Custom Hooks avanzados en React 19',
    category: 'JavaScript', viewers: 128, color: '#10b981', avatar: 'A',
    tags: ['React', 'JavaScript', 'WebDev'],
    about: 'Diseñando custom hooks en React 19 para optimizar el muro de proyectos de RedPlus.',
    goal: { current: 8, target: 10, label: 'Seguidores hoy' },
    files: [
      { name: 'useFetch.jsx', icon: '⚛️', code: `<span class="syntax-keyword">export function</span> <span class="syntax-func">useFetch</span>(url) {\n  const [data, setData] = useState(null);\n  const [loading, setLoading] = useState(true);\n  useEffect(() => {\n    fetch(url).then(r => r.json()).then(setData);\n    setLoading(false);\n  }, [url]);\n  return { data, loading };\n}` }
    ]
  },
  {
    id: 'david', username: 'retrodavid', title: 'Desarrollando un emulador CHIP-8 en Python',
    category: 'Python', viewers: 85, color: '#f59e0b', avatar: 'D',
    tags: ['Python', 'Emulación', 'Retro'],
    about: 'Escribiendo un emulador Chip-8 desde cero en Python usando pygame.',
    goal: { current: 4, target: 5, label: 'Torneos retro' },
    files: [
      { name: 'cpu.py', icon: '🐍', code: `<span class="syntax-comment"># CPU Emulator - CHIP-8</span>\nclass <span class="syntax-class">Cpu</span>:\n    def __init__(self):\n        self.memory = [0] * 4096\n        self.registers = [0] * 16` }
    ]
  },
  {
    id: 'sofia', username: 'sofia_spring', title: 'REST APIs con Spring Boot',
    category: 'Java', viewers: 54, color: '#ec4899', avatar: 'S',
    tags: ['Java', 'Spring', 'REST-API'],
    about: 'Optimizando bases de datos y creando controllers RESTful con Spring Boot.',
    goal: { current: 2, target: 5, label: 'Consultas exitosas' },
    files: [
      { name: 'Controller.java', icon: '☕', code: `<span class="syntax-comment">// REST Controller</span>\n@RestController\npublic class <span class="syntax-class">ProjectController</span> {\n    @GetMapping("/projects")\n    public List&lt;Project&gt; getAll() {\n        return service.findAll();\n    }\n}` }
    ]
  }
];

const CHAT_USERS = ['kwioz020', 'carlos_omar', 'juan_dev', 'css_ninja', 'react_lover', 'java_coder'];
const CHAT_MSGS = [
  '¡Buenísimo el código!', '¿Por qué decidiste estructurarlo así?',
  '¡React 19 está brutal!', '¿Qué plugin de VS Code usas?',
  '¡Súper limpio! 👍', '¿Habrá tutorial de CSS después?',
  'Spring Boot es muy cómodo para backend.', 'Los bugs de sintaxis siempre nos atrapan.'
];

const USER_COLORS = ['#e74c3c','#3498db','#2ecc71','#f1c40f','#e67e22','#9b59b6','#1abc9c','#e84393'];
const getUserColor = (name) => {
  if (name === 'u/usuario') return '#2563eb';
  let h = 0;
  for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h);
  return USER_COLORS[Math.abs(h) % USER_COLORS.length];
};

function LiveStreams() {
  const [category, setCategory] = useState('Todos');
  const [stream, setStream] = useState(null);
  const [fileIdx, setFileIdx] = useState(0);
  const [chat, setChat] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat]);

  useEffect(() => {
    if (!stream) return;
    const id = setInterval(() => {
      const user = CHAT_USERS[Math.floor(Math.random() * CHAT_USERS.length)];
      const text = CHAT_MSGS[Math.floor(Math.random() * CHAT_MSGS.length)];
      setChat(prev => [...prev, { user, text }]);
    }, 2000);
    return () => clearInterval(id);
  }, [stream]);

  const enterStream = (s) => {
    setStream(s);
    setFileIdx(0);
    setChat([
      { user: 'moderador_foro', text: `¡Bienvenidos a la transmisión de ${s.username}!`, isSystem: true },
      { user: 'juan_dev', text: '¡Hola! Interesante proyecto.' },
      { user: 'css_ninja', text: 'Buenas, a ver qué tal la sesión de hoy.' }
    ]);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setChat(prev => [...prev, { user: 'u/usuario', text: chatInput }]);
    setChatInput('');
  };

  const pct = stream ? Math.round((stream.goal.current / stream.goal.target) * 100) : 0;

  // Vista de Stream (Twitch-like)
  if (stream) {
    const file = stream.files[fileIdx];
    return (
      <div className="twitch-layout">

        {/* Sidebar izquierdo — canales */}
        <aside className="twitch-sidebar">
          <div className="twitch-sidebar-header"><h4>En Directo</h4></div>
          <ul className="twitch-channel-list">
            {STREAMS.map(ch => (
              <li key={ch.id} className={`twitch-channel-item ${stream.id === ch.id ? 'active' : ''}`} onClick={() => enterStream(ch)}>
                <div className="twitch-sidebar-avatar-wrapper">
                  <div className="twitch-sidebar-avatar live-border" style={{ background: ch.color }}>{ch.avatar}</div>
                </div>
                <div className="twitch-channel-info-wrapper">
                  <h5 className="twitch-channel-name">{ch.username}</h5>
                  <p className="twitch-channel-category">{ch.category}</p>
                </div>
                <div className="twitch-live-stats">
                  <span className="twitch-dot-red" /><span>{ch.viewers}</span>
                </div>
              </li>
            ))}
          </ul>
        </aside>

        {/* Columna central */}
        <main className="twitch-main-content">
          <div className="twitch-header-top">
            <button className="twitch-btn-back" onClick={() => setStream(null)}>⬅ Volver</button>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 'bold' }}>🔴 TRANSMITIENDO EN VIVO</span>
          </div>

          {/* Player / IDE */}
          <div className="twitch-video-player">
            <div className="twitch-webcam-overlay">
              <div className="twitch-webcam-header"><span>CÁMARA</span><span style={{ color: '#ef4444' }}>●</span></div>
              <div className="twitch-webcam-feed">
                <span className="twitch-webcam-avatar">💻</span>
                <span className="twitch-webcam-label">{stream.username}</span>
              </div>
            </div>

            <div className="ide-player-overlay">EN DIRECTO</div>

            <div className="twitch-ide-viewport">
              <div className="twitch-ide-sidebar">
                <span style={{ padding: '8px 10px', fontSize: '0.6rem', color: '#adadb8', textTransform: 'uppercase', fontWeight: 'bold' }}>Archivos</span>
                {stream.files.map((f, i) => (
                  <div key={i} className={`twitch-ide-file-item ${fileIdx === i ? 'active' : ''}`} onClick={() => setFileIdx(i)}>
                    <span>{f.icon}</span><span>{f.name}</span>
                  </div>
                ))}
              </div>
              <div className="twitch-ide-editor-area">
                <div className="twitch-ide-tabs">
                  {stream.files.map((f, i) => (
                    <div key={i} className={`twitch-ide-tab ${fileIdx === i ? 'active' : ''}`} onClick={() => setFileIdx(i)}>
                      <span>{f.icon}</span><span>{f.name}</span>
                    </div>
                  ))}
                </div>
                <div className="twitch-ide-code">
                  <div className="ide-line-numbers">
                    {file.code.split('\n').map((_, i) => <span key={i}>{i + 1}</span>)}
                  </div>
                  <pre className="ide-code-content" style={{ paddingLeft: 12, margin: 0 }}>
                    <code dangerouslySetInnerHTML={{ __html: file.code }} />
                  </pre>
                </div>
              </div>
            </div>

            <div className="twitch-player-hud">
              <div className="twitch-hud-left">
                <button className="twitch-hud-btn">▶</button>
                <button className="twitch-hud-btn">🔊</button>
                <span style={{ fontSize: '0.72rem', color: '#adadb8' }}>LIVE</span>
              </div>
              <div className="twitch-hud-right">
                <button className="twitch-hud-btn">⚙</button>
                <button className="twitch-hud-btn">⛶</button>
              </div>
            </div>
          </div>

          {/* Info del streamer */}
          <div className="twitch-streamer-bar">
            <div className="twitch-streamer-info-left">
              <div className="twitch-streamer-avatar-live">{stream.avatar}</div>
              <div className="twitch-streamer-details">
                <div className="twitch-streamer-name-row">
                  <h3 className="twitch-streamer-name">{stream.username}</h3>
                  <span className="twitch-verify-badge">✔</span>
                </div>
                <h4 className="twitch-stream-title">{stream.title}</h4>
                <div className="twitch-stream-tags">
                  <span className="twitch-live-indicator">EN DIRECTO</span>
                  <span className="twitch-tag-badge category">{stream.category}</span>
                  {stream.tags.map(t => <span key={t} className="twitch-tag-badge">#{t}</span>)}
                </div>
              </div>
            </div>
            <div className="twitch-streamer-actions">
              <button className="twitch-btn-follow">❤️ Seguir</button>
              <button className="twitch-btn-gift">🎁 Regalar sub</button>
              <button className="twitch-btn-subscribe">⭐ Suscribirse</button>
            </div>
          </div>

          <div className="twitch-stream-metrics-wrapper">
            <div className="twitch-metric-item live-views"><span>👤 {stream.viewers} espectadores</span></div>
            <div className="twitch-metric-item"><span>Meta: {pct}%</span></div>
          </div>

          <div className="twitch-lower-sections">
            <div className="twitch-info-card">
              <h4>Acerca de {stream.username}</h4>
              <p>{stream.about}</p>
            </div>
            <div className="twitch-info-card">
              <h4>Meta: {stream.goal.label}</h4>
              <p>Ayúdanos a cumplir los objetivos del canal.</p>
              <div className="twitch-progress-container">
                <div className="twitch-progress-bar-bg">
                  <div className="twitch-progress-bar-fill" style={{ width: `${pct}%` }} />
                </div>
                <div className="twitch-progress-labels">
                  <span>{stream.goal.label}</span>
                  <span>{stream.goal.current} / {stream.goal.target} ({pct}%)</span>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Chat derecho */}
        <aside className="twitch-chat">
          <div className="twitch-chat-header">
            <h4>Chat del stream</h4>
            <span style={{ cursor: 'pointer' }}>👤</span>
          </div>
          <div className="twitch-pinned-card">
            <span className="twitch-pinned-icon">📌</span>
            <div className="twitch-pinned-content">
              <span className="twitch-pinned-author">Moderador:</span>
              <span>¡Drops activos y respeto en el chat!</span>
            </div>
          </div>
          <div className="twitch-chat-messages">
            {chat.map((msg, i) => (
              <div key={i} className="twitch-chat-row">
                {msg.isSystem
                  ? <span style={{ color: 'var(--text-muted)', fontStyle: 'italic', fontSize: '0.72rem' }}>{msg.text}</span>
                  : <>
                      <span className="twitch-chat-badge-sub">Sub</span>
                      <span className="twitch-chat-user" style={{ color: getUserColor(msg.user) }}>{msg.user}</span>
                      <span className="twitch-chat-text">: {msg.text}</span>
                    </>
                }
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          <div className="twitch-chat-footer">
            <form onSubmit={sendMessage} className="twitch-chat-input-wrapper">
              <input
                type="text" placeholder="Enviar un mensaje"
                className="twitch-chat-input"
                value={chatInput} onChange={e => setChatInput(e.target.value)}
              />
              <div className="twitch-chat-input-actions">
                <button type="button" className="twitch-chat-icon-btn">😊</button>
                <button type="submit" className="twitch-chat-btn-send">Enviar</button>
              </div>
            </form>
          </div>
        </aside>
      </div>
    );
  }

  // Vista de directorio
  const filtered = category === 'Todos' ? STREAMS : STREAMS.filter(s => s.category === category);

  return (
    <main className="content-feed">
      <div style={{ marginBottom: '20px' }}>
        <h2>🔴 Programación en VIVO</h2>
        <p style={{ color: 'var(--text-muted)' }}>Explora repositorios en vivo, asiste a explicaciones y chatea con los estudiantes.</p>
      </div>

      <div className="live-categories-bar">
        {CATEGORIES.map(c => (
          <button key={c} className={`category-btn ${category === c ? 'active' : ''}`} onClick={() => setCategory(c)}>{c}</button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="live-grid">
          {filtered.map(s => (
            <div key={s.id} className="live-card" onClick={() => enterStream(s)}>
              <div className="live-thumbnail-wrapper">
                <span className="live-badge">● VIVO</span>
                <span className="live-tag">{s.category}</span>
                <span className="live-viewer-count">👤 {s.viewers}</span>
                <div className="live-thumbnail-mock">
                  <div>// {s.username}</div>
                  <div>public class Core {'{'}</div>
                  <div>  System.out.println("Live!");</div>
                  <div>{'}'}</div>
                </div>
              </div>
              <div className="live-card-body">
                <div className="live-streamer-avatar" style={{ background: s.color }}>{s.avatar}</div>
                <div className="live-card-info">
                  <h4 className="live-card-title">{s.title}</h4>
                  <p className="live-card-author">{s.username}</p>
                  <span className="live-card-category">{s.category}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
          No hay transmisiones en "{category}" en este momento.
        </div>
      )}
    </main>
  );
}

export default LiveStreams;
