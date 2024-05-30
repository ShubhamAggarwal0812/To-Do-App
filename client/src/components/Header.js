import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/login', { replace: true });
  };

  return (
    <header className="bg-blue-600 w-full py-4 shadow-md">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <h1 className="text-white text-3xl font-bold">TODO App</h1>
        <nav className="space-x-4">
          <Link to="/" className="text-white hover:underline">Home</Link>
          <Link to="/about" className="text-white hover:underline">About</Link>
          <Link to="/help" className="text-white hover:underline">Help</Link>
          <Link to="/contact" className="text-white hover:underline">Contact</Link>
          {localStorage.getItem('userInfo') ? (
            <button onClick={handleLogout} className="text-white hover:underline">Logout</button>
          ) : (
            <>
              <Link to="/register" className="text-white hover:underline">Register</Link>
              <Link to="/login" className="text-white hover:underline">Login</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
