import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TodoScreen = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('Personal');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    const fetchTodos = async () => {
      const { data } = await axios.get('/api/todos', {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`,
        },
      });
      setTodos(data);
    };

    fetchTodos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await axios.post(
      '/api/todos',
      { title, description, type, dueDate },
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`,
        },
      }
    );
    setTodos([...todos, data]);
  };

  return (
    <div className="max-w-lg mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-5">TODOs</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <input
            type="text"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Type</label>
          <select
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="Personal">Personal</option>
            <option value="Official">Official</option>
            <option value="Hobby">Hobby</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Due Date</label>
          <input
            type="date"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Add TODO
        </button>
      </form>
      <ul className="mt-5">
        {todos.map((todo) => (
          <li key={todo._id} className="bg-gray-100 p-3 rounded-md mb-3">
            <h2 className="font-bold text-lg">{todo.title}</h2>
            <p>{todo.description}</p>
            <p className="text-sm text-gray-500">{todo.type} - {new Date(todo.dueDate).toLocaleDateString()}</p>
            <p className="text-sm text-gray-500">{todo.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoScreen;
