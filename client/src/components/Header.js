// client/src/components/Header.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.png';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/login', { replace: true });

    // Prevent back navigation
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = function () {
      window.history.go(1);
    };
  };

  return (
    <header className="bg-blue-600 py-4 px-5 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4 cursor-pointer" onClick={() => navigate('/')}>
          <img src={Logo} alt="Logo" className="h-10" />
          <h1 className="text-2xl font-bold">TODO App</h1>
        </div>
        <nav className="space-x-4">
          <button onClick={() => navigate('/about')} className="hover:underline">About</button>
          <button onClick={() => navigate('/help')} className="hover:underline">Help</button>
          {localStorage.getItem('userInfo') && (
            <button onClick={handleLogout} className="hover:underline">Logout</button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
