import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';

function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="app-container">
      {/* Llamamos a la barra superior y le pasamos la función del modo oscuro */}
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      
      {/* Estructura de dos columnas: Menú a la izquierda, Contenido a la derecha */}
      <div className="main-layout">
        <Sidebar />
        <Home />
      </div>
    </div>
  );
}

export default App;