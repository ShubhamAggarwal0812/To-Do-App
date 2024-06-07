// client/src/pages/HomeScreen.js

import React from "react";
import { Link } from "react-router-dom";
import placeholderLogo from "../assets/logo.png";
import taskIcon from "../assets/task.png";
import workIcon from "../assets/work.png";
import productiveIcon from "../assets/productive.png";

const HomeScreen = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center">
      <main className="flex-1 container mx-auto px-4 py-8">
        <section className="text-center mb-12">
          <img
            src={placeholderLogo}
            alt="Logo"
            className="mx-auto mb-4 w-24 h-24 animate-bounce"
          />
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome to TODO App
          </h2>
          <p className="text-gray-600 mb-6">
            Manage your tasks efficiently and effectively.
          </p>
          <div>
            <Link
              to="/login"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out transform hover:-translate-y-1"
            >
              Get Started
            </Link>
          </div>
        </section>
        <section className="text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Features</h3>
          <div className="flex flex-wrap justify-center">
            <div className="w-full sm:w-1/2 lg:w-1/3 p-4">
              <div className="bg-white p-6 rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
                <h4 className="text-xl font-bold mb-2">Easy Task Management</h4>
                <img
                  src={taskIcon}
                  alt="Task"
                  className="mx-auto mb-4 w-24 h-24"
                />
                <p className="text-gray-600">
                  Create, edit, and delete tasks with ease.
                </p>
              </div>
            </div>
            <div className="w-full sm:w-1/2 lg:w-1/3 p-4">
              <div className="bg-white p-6 rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
                <h4 className="text-xl font-bold mb-2">Organize Your Work</h4>
                <img
                  src={workIcon}
                  alt="Work"
                  className="mx-auto mb-4 w-24 h-24"
                />
                <p className="text-gray-600">
                  Keep track of your tasks and deadlines.
                </p>
              </div>
            </div>
            <div className="w-full sm:w-1/2 lg:w-1/3 p-4">
              <div className="bg-white p-6 rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
                <h4 className="text-xl font-bold mb-2">Stay Productive</h4>
                <img
                  src={productiveIcon}
                  alt="Productive"
                  className="mx-auto mb-4 w-24 h-24"
                />
                <p className="text-gray-600">
                  Mark tasks as done and stay on top of your work.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomeScreen;
