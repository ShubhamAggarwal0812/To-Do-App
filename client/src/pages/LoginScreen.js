// client/src/pages/LoginScreen.js

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import logo from '../assets/logo.png';

const LoginScreen = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      navigate('/todos');
    }
  }, [navigate]);

  const onSubmit = async (data) => {
    try {
      const { data: responseData } = await axios.post('/api/users/access-tokens', data);
      localStorage.setItem('userInfo', JSON.stringify(responseData));
      navigate('/todos', { replace: true });
    } catch (error) {
      toast.error(error.response && error.response.data.message
        ? error.response.data.message
        : error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-5 text-center">Login</h1>
      <img src={logo} alt="Login" className="mx-auto mb-4 w-24 h-24" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: 'Invalid email address'
              }
            })}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>
        <div className="mb-4 relative">
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            {...register('password', { required: 'Password is required' })}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          <button
            type="button"
            className="absolute right-3 top-9 text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Login
        </button>
      </form>
      <div className="text-center mt-4">
        <p className="text-sm text-gray-600">Not registered yet? <a href="/register" className="text-blue-500 hover:underline">Register here</a></p>
      </div>
    </div>
  );
};

export default LoginScreen;
