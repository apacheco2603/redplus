import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Groups from './pages/Groups';
import LiveStreams from './pages/LiveStreams';
import ChatWidget from './components/ChatWidget';
import GroupChat from './pages/GroupChat';
import GroupForum from './pages/GroupForum';
import Register from './pages/Register';

function App() {
  const [theme, setTheme] = useState('light');
  const [pantalla, setPantalla] = useState('home');
  const [activeGroup, setActiveGroup] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [esLogin, setEsLogin] = useState(true);
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const handleLogin = (e) => {
    e.preventDefault();
    const usuariosDb = JSON.parse(localStorage.getItem('usuarios_redplus')) || [];
    
    const usuarioValido = usuariosDb.find(
      u => u.username.toLowerCase() === user.trim().toLowerCase() && u.password === pass
    );

    if (usuarioValido || (user.trim().toLowerCase() === 'usuario' && pass === '1234')) {
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Usuario no registrado o contraseña incorrecta.');
    }
  };

  const cambiarVista = () => {
    if (pantalla === 'profile') return <Profile user={user} />;
    if (pantalla === 'groups') return <Groups setPantalla={setPantalla} setActiveGroup={setActiveGroup} />;
    if (pantalla === 'groupForum') return <GroupForum group={activeGroup} setPantalla={setPantalla} />;
    if (pantalla === 'groupChat') return <GroupChat group={activeGroup} setPantalla={setPantalla} user={user} />;
    if (pantalla === 'live') return <LiveStreams />;
    return <Home user={user} />;
  };

  if (!isLoggedIn) {
    if (!esLogin) {
      return <Register setEsLogin={setEsLogin} />;
    }

    return (
      <div className="login-box">
        <form onSubmit={handleLogin}>
          <h2>RedPlus</h2>
          {error && <p className="error">{error}</p>}
          <input 
            type="text" 
            placeholder="Usuario" 
            value={user}
            onChange={e => setUser(e.target.value)} 
            required 
          />
          <input 
            type="password" 
            placeholder="Contraseña" 
            value={pass}
            onChange={e => setPass(e.target.value)} 
            required 
          />
          <button type="submit">Entrar</button>
          
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '15px' }}>
            ¿No tienes cuenta?{' '}
            <span 
              onClick={() => setEsLogin(false)} 
              style={{ color: 'var(--primary)', cursor: 'pointer', fontWeight: 'bold' }}
            >
              Regístrate aquí
            </span>
          </p>
        </form>
      </div>
    );
  }

  return (
    <div className="app-container">
      <Navbar 
        theme={theme} 
        toggleTheme={() => setTheme(theme === 'light' ? 'dark' : 'light')} 
        setPantalla={setPantalla} 
        setIsLoggedIn={setIsLoggedIn}
      />
      <div className="main-layout">
        <Sidebar setPantalla={setPantalla} />
        {cambiarVista()}
      </div>
      <ChatWidget />
    </div>
  );
}

export default App;