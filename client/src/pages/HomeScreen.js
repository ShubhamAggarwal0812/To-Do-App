import React from 'react';
import { Link } from 'react-router-dom';

const HomeScreen = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center">
      <header className="bg-blue-600 w-full py-4 shadow-md">
        <div className="container mx-auto px-4">
          <h1 className="text-white text-3xl font-bold">TODO App</h1>
        </div>
      </header>
      <main className="flex-1 container mx-auto px-4 py-8">
        <section className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Welcome to the Professional TODO App</h2>
          <p className="text-gray-600 mb-6">Manage your tasks efficiently and effectively.</p>
          <div>
            <Link to="/register" className="bg-blue-500 text-white py-2 px-4 rounded-md mr-4 hover:bg-blue-600">
              Register
            </Link>
            <Link to="/login" className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400">
              Login
            </Link>
          </div>
        </section>
        <section className="text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Features</h3>
          <div className="flex flex-wrap justify-center">
            <div className="w-full sm:w-1/2 lg:w-1/3 p-4">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h4 className="text-xl font-bold mb-2">Easy Task Management</h4>
                <p className="text-gray-600">Create, edit, and delete tasks with ease.</p>
              </div>
            </div>
            <div className="w-full sm:w-1/2 lg:w-1/3 p-4">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h4 className="text-xl font-bold mb-2">Organize Your Work</h4>
                <p className="text-gray-600">Keep track of your tasks and deadlines.</p>
              </div>
            </div>
            <div className="w-full sm:w-1/2 lg:w-1/3 p-4">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h4 className="text-xl font-bold mb-2">Stay Productive</h4>
                <p className="text-gray-600">Mark tasks as done and stay on top of your work.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-gray-800 w-full py-4">
        <div className="container mx-auto px-4 text-center text-white">
          &copy; 2024 TODO App. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default HomeScreen;
