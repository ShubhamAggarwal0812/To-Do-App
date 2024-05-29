import React from 'react';
import { Link } from 'react-router-dom';

const HomeScreen = () => {
  return (
    <div className="text-center mt-20">
      <h1 className="text-4xl font-bold mb-5">Welcome to the TODO App</h1>
      <Link to="/register" className="text-blue-500 hover:underline mr-4">Register</Link>
      <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
    </div>
  );
};

export default HomeScreen;
