import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TodoScreen = () => {
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [filter, setFilter] = useState('All');
  const [editing, setEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'Personal',
    dueDate: '',
  });

  const { title, description, type, dueDate } = formData;

  useEffect(() => {
    const fetchTodos = async () => {
      const { data } = await axios.get('/api/todos', {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`,
        },
      });
      setTodos(data);
      setFilteredTodos(data);
    };

    fetchTodos();
  }, []);

  useEffect(() => {
    filterTodos();
  }, [filter, todos]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      const { data } = await axios.put(`/api/todos/${currentTodo._id}`, formData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`,
        },
      });
      setTodos(todos.map((todo) => (todo._id === currentTodo._id ? data : todo)));
      setEditing(false);
    } else {
      const { data } = await axios.post('/api/todos', formData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`,
        },
      });
      setTodos([...todos, data]);
    }
    setFormData({
      title: '',
      description: '',
      type: 'Personal',
      dueDate: '',
    });
  };

  const handleEdit = (todo) => {
    setEditing(true);
    setCurrentTodo(todo);
    setFormData({
      title: todo.title,
      description: todo.description,
      type: todo.type,
      dueDate: todo.dueDate,
    });
  };

  const handleDelete = async (id) => {
    await axios.delete(`/api/todos/${id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`,
      },
    });
    setTodos(todos.filter((todo) => todo._id !== id));
  };

  const handleMarkAsDone = async (id, status) => {
    const { data } = await axios.put(`/api/todos/${id}`, { status }, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`,
      },
    });
    setTodos(todos.map((todo) => (todo._id === id ? data : todo)));
  };

  const filterTodos = () => {
    let filtered = todos;
    if (filter === 'Overdue') {
      filtered = todos.filter(todo => new Date(todo.dueDate) < new Date());
    } else if (filter === 'To Do' || filter === 'Done') {
      filtered = todos.filter(todo => todo.status === filter);
    }
    setFilteredTodos(filtered);
  };

  return (
    <div className="max-w-lg mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-5">TODOs</h1>
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <input
            type="text"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Type</label>
          <select
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
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
            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          {editing ? 'Update TODO' : 'Add TODO'}
        </button>
      </form>

      <div className="mt-5">
        <label className="block text-sm font-medium text-gray-700">Filter</label>
        <select
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Overdue">Overdue</option>
          <option value="To Do">To Do</option>
          <option value="Done">Done</option>
        </select>
      </div>

      <ul className="mt-5">
        {filteredTodos.map((todo) => (
          <li key={todo._id} className="bg-white p-4 rounded-lg shadow-md mb-3">
            <h2 className="font-bold text-lg">{todo.title}</h2>
            <p>{todo.description}</p>
            <p className="text-sm text-gray-500">{todo.type} - {new Date(todo.dueDate).toLocaleDateString()}</p>
            <p className="text-sm text-gray-500">{todo.status}</p>
            <button
              className="mr-2 text-blue-500 hover:underline"
              onClick={() => handleEdit(todo)}
            >
              Edit
            </button>
            <button
              className="mr-2 text-red-500 hover:underline"
              onClick={() => handleDelete(todo._id)}
            >
              Delete
            </button>
            <button
              className={`mr-2 ${todo.status === 'Done' ? 'text-yellow-500' : 'text-green-500'} hover:underline`}
              onClick={() => handleMarkAsDone(todo._id, todo.status === 'Done' ? 'To Do' : 'Done')}
            >
              {todo.status === 'Done' ? 'Undo' : 'Mark as Done'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoScreen;