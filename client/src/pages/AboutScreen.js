// client/src/pages/AboutScreen.js

import React from 'react';
import { FaClipboardList, FaUsers, FaLightbulb } from 'react-icons/fa';

const AboutScreen = () => {
  return (
    <div className="container mx-auto p-6 mt-10 bg-white rounded shadow-md">
      <h1 className="text-4xl font-bold mb-5 text-center text-blue-600">About TODO App</h1>
      <div className="text-center mb-6">
        <FaClipboardList className="text-blue-600 inline-block mb-4" size={60} />
        <p className="text-gray-700 mb-4">
          TODO App is a simple yet effective task management tool designed to help you stay organized and productive.
        </p>
        <FaUsers className="text-blue-600 inline-block mb-4" size={60} />
        <p className="text-gray-700 mb-4">
          Our mission is to provide a user-friendly platform that helps individuals and teams manage their tasks efficiently.
        </p>
        <FaLightbulb className="text-blue-600 inline-block mb-4" size={60} />
        <p className="text-gray-700">
          We hope you enjoy using TODO App and find it helpful in managing your daily tasks. If you have any feedback or suggestions, please reach out to us.
        </p>
      </div>
    </div>
  );
};

export default AboutScreen;
