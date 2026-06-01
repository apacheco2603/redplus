import { useState, useEffect, useRef } from 'react';

const CONTACTS = [
  { id: 'carlos', name: 'Carlos Mendoza', role: 'r/HTML • Estudiante',      color: '#2563eb', avatar: 'C', online: true  },
  { id: 'ana',    name: 'Ana Gómez',      role: 'r/WebDev • Creadora',       color: '#10b981', avatar: 'A', online: true  },
  { id: 'david',  name: 'David Ruiz',     role: 'r/retrogaming • Moderador', color: '#f59e0b', avatar: 'D', online: true  },
  { id: 'laura',  name: 'Laura Torres',   role: 'r/TechPeru • Diseñadora',   color: '#ec4899', avatar: 'L', online: false }
];

const INIT_MSGS = {
  carlos: [{ sender: 'contact', text: '¡Hola! ¿Pudiste revisar los componentes para la entrega grupal?', time: '10:30' }],
  ana:    [{ sender: 'contact', text: '¿Qué tal va el muro de proyectos? ¡Se ve increíble!', time: '10:45' }],
  david:  [{ sender: 'contact', text: '¡El fin de semana organizamos torneo de juegos clásicos. ¿Te apuntas?', time: 'Ayer' }],
  laura:  [{ sender: 'contact', text: 'Vi tu publicación sobre React. ¡Muy buena explicación!', time: 'Hace 2 días' }]
};

const REPLIES = {
  carlos: ['¡Genial! Sigamos puliendo los detalles.', 'Revisaré los componentes y te aviso.', '¡La entrega grupal va excelente!'],
  ana:    ['React 19 maneja estados de forma muy óptima.', '¡CSS nativo con variables es súper rápido!', 'Recuerda el arreglo de dependencias en useEffect.'],
  david:  ['¡Deberíamos armar una partida!', 'Las consolas retro tienen un encanto especial. 👾', '¡Apuntado al 100%!'],
  laura:  ['¡Gracias por el feedback!', 'El diseño usa variables CSS para ambos temas.', '¡Subo los cambios a la rama principal!'],
  default:['¡Súper interesante! 🚀', '¡Déjame revisar y te respondo.', '¡Gracias por compartirlo!']
};

const now = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
const pick = arr => arr[Math.floor(Math.random() * arr.length)];

function ChatWidget() {
  const [open, setOpen]       = useState(false);
  const [chats, setChats]     = useState([]);
  const [minimized, setMin]   = useState([]);
  const [msgs, setMsgs]       = useState(INIT_MSGS);
  const [typing, setTyping]   = useState({});
  const [unread, setUnread]   = useState({});
  const [inputs, setInputs]   = useState({});
  const endRefs = useRef({});

  useEffect(() => {
    chats.forEach(id => {
      if (!minimized.includes(id)) endRefs.current[id]?.scrollIntoView({ behavior: 'smooth' });
    });
  }, [msgs, chats, minimized, typing]);

  const openChat = (id) => {
    if (!chats.includes(id)) setChats(prev => [...prev, id]);
    setMin(prev => prev.filter(x => x !== id));
    setUnread(prev => ({ ...prev, [id]: 0 }));
  };

  const closeChat = (id, e) => {
    e.stopPropagation();
    setChats(prev => prev.filter(x => x !== id));
    setMin(prev => prev.filter(x => x !== id));
  };

  const toggleMin = (id, e) => {
    e.stopPropagation();
    if (minimized.includes(id)) {
      setMin(prev => prev.filter(x => x !== id));
      setUnread(prev => ({ ...prev, [id]: 0 }));
    } else {
      setMin(prev => [...prev, id]);
    }
  };

  const sendMsg = (id, e) => {
    e.preventDefault();
    const text = (inputs[id] || '').trim();
    if (!text) return;
    setMsgs(prev => ({ ...prev, [id]: [...(prev[id] || []), { sender: 'user', text, time: now() }] }));
    setInputs(prev => ({ ...prev, [id]: '' }));

    // Respuesta automática
    setTimeout(() => {
      setTyping(prev => ({ ...prev, [id]: true }));
      setTimeout(() => {
        setTyping(prev => ({ ...prev, [id]: false }));
        const reply = pick(REPLIES[id] || REPLIES.default);
        setMsgs(prev => ({ ...prev, [id]: [...(prev[id] || []), { sender: 'contact', text: reply, time: now() }] }));
        if (!chats.includes(id) || minimized.includes(id))
          setUnread(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
      }, 1500);
    }, 800);
  };

  const totalUnread = Object.values(unread).reduce((a, b) => a + b, 0);

  return (
    <div className="chat-widget-container">
      {/* Ventanas de chat abiertas */}
      <div className="chat-windows-dock">
        {chats.map(id => {
          const c = CONTACTS.find(x => x.id === id);
          if (!c) return null;
          const isMin = minimized.includes(id);
          return (
            <div key={id} className={`chat-window ${isMin ? 'minimized' : ''}`}>
              <div className="chat-window-header" onClick={e => toggleMin(id, e)}>
                <div className="chat-window-user">
                  <div className="chat-window-avatar" style={{ background: c.color }}>{c.avatar}</div>
                  <h5 className="chat-window-name">
                    {c.name}
                    {(unread[id] > 0) && <span className="chat-badge" style={{ marginLeft: 6, fontSize: '0.65rem' }}>{unread[id]}</span>}
                  </h5>
                </div>
                <div className="chat-window-actions">
                  <button className="chat-window-btn" onClick={e => toggleMin(id, e)}>{isMin ? '▲' : '−'}</button>
                  <button className="chat-window-btn" onClick={e => closeChat(id, e)} style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>✕</button>
                </div>
              </div>
              {!isMin && (
                <>
                  <div className="chat-window-messages">
                    {(msgs[id] || []).map((m, i) => (
                      <div key={i} className={`message-wrapper ${m.sender === 'user' ? 'sent' : 'received'}`}>
                        <div className="message-bubble">{m.text}</div>
                        <span className="message-time">{m.time}</span>
                      </div>
                    ))}
                    {typing[id] && (
                      <div className="typing-indicator-container">
                        <div className="typing-bubble">
                          <div className="typing-dot" /><div className="typing-dot" /><div className="typing-dot" />
                        </div>
                      </div>
                    )}
                    <div ref={el => endRefs.current[id] = el} />
                  </div>
                  <form onSubmit={e => sendMsg(id, e)} className="chat-window-input-area">
                    <input
                      type="text" placeholder="Escribe un mensaje..." className="chat-input"
                      value={inputs[id] || ''} onChange={e => setInputs(prev => ({ ...prev, [id]: e.target.value }))}
                    />
                    <button type="submit" className="chat-send-btn">➤</button>
                  </form>
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Barra principal de contactos */}
      <div className="chat-main-bar">
        <div className="chat-main-header" onClick={() => setOpen(!open)}>
          <div className="chat-header-title">
            <span>💬 Mensajes Privados</span>
            {totalUnread > 0 && <span className="chat-badge">{totalUnread}</span>}
          </div>
          <span>{open ? '▼' : '▲'}</span>
        </div>
        {open && (
          <div className="chat-contacts-list">
            {CONTACTS.map(c => (
              <div key={c.id} className="chat-contact-item" onClick={() => openChat(c.id)}>
                <div className="chat-avatar-wrapper">
                  <div className="chat-avatar" style={{ background: c.color }}>{c.avatar}</div>
                  <span className={`status-dot ${c.online ? 'online' : 'offline'}`} />
                </div>
                <div className="chat-contact-info">
                  <h5 className="chat-contact-name">{c.name}</h5>
                  <p className="chat-contact-status">{c.role}</p>
                </div>
                {(unread[c.id] > 0) && <span className="chat-badge">{unread[c.id]}</span>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatWidget;
