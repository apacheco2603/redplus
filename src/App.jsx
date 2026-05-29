import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Groups from './pages/Groups';

function App() {
  const [theme, setTheme] = useState('light');
  const [pantalla, setPantalla] = useState('home');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);
  const cambiarVista = () => {
    if (pantalla === 'profile') return <Profile />;
    if (pantalla === 'groups') return <Groups />;
    return <Home />;
  };
  return (
    <div className="app-container">
      <Navbar theme={theme} toggleTheme={() => setTheme(theme === 'light' ? 'dark' : 'light')} setPantalla={setPantalla} />
      <div className="main-layout">
        <Sidebar setPantalla={setPantalla} />
        {cambiarVista()}
      </div>
    </div>
  );
}

export default App;