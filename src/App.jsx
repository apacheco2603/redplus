import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Groups from './pages/Groups';

function App() {
  const [theme, setTheme] = useState('light');
  const [pantalla, setPantalla] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (user.trim().toLowerCase() === 'usuario' && pass === '1234') {
      setIsLoggedIn(true);
    } else {
      setError('Datos incorrectos. Usa Usuario / 1234');
    }
  };

  const cambiarVista = () => {
    if (pantalla === 'profile') return <Profile user={user} />;
    if (pantalla === 'groups') return <Groups />;
    return <Home user={user} />;
  };

  if (!isLoggedIn) {
    return (
      <div className="login-box">
        <form onSubmit={handleLogin}>
          <h2>RedPlus</h2>
          {error && <p className="error">{error}</p>}
          <input type="text" placeholder="Usuario" onChange={e => setUser(e.target.value)} required />
          <input type="password" placeholder="Contraseña" onChange={e => setPass(e.target.value)} required />
          <button type="submit">Entrar</button>
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
      <div className="main-layout" style={{ gridTemplateColumns: '240px 1fr 280px' }}>
        <Sidebar setPantalla={setPantalla} />
        {cambiarVista()}
      </div>
    </div>
  );
}

export default App;