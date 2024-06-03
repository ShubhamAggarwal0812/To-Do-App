import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/login', { replace: true });
  };

  return (
    <header className="bg-blue-600 py-4 px-5 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">TODO App</h1>
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
