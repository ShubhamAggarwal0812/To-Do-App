import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { toast, ToastContainer } from 'react-toastify';
import { useForm } from 'react-hook-form';
import 'react-toastify/dist/ReactToastify.css';
import { FaEdit, FaTrashAlt, FaCheck, FaUndo } from 'react-icons/fa';
import { motion } from 'framer-motion';

const TodoScreen = () => {
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [filter, setFilter] = useState('All');
  const [editing, setEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const { data } = await axios.get('/api/todos', {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`,
          },
        });
        setTodos(data);
        setFilteredTodos(data);
      } catch (error) {
        toast.error('Error fetching TODOs');
      }
    };

    fetchTodos();
  }, []);

  useEffect(() => {
    filterTodos();
  }, [filter, todos]);

  const onSubmit = async (formData) => {
    if (!formData.title || !formData.dueDate) {
      toast.error('Title and Due Date are required.');
      return;
    }

    try {
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
      reset();
      toast.success(editing ? 'TODO updated successfully!' : 'TODO added successfully!');
    } catch (error) {
      toast.error('Error creating/updating TODO');
    }
  };

  const handleEdit = (todo) => {
    setEditing(true);
    setCurrentTodo(todo);
    reset({
      title: todo.title,
      description: todo.description,
      type: todo.type,
      dueDate: todo.dueDate,
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this TODO?')) {
      try {
        await axios.delete(`/api/todos/${id}`, {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`,
          },
        });
        setTodos(todos.filter((todo) => todo._id !== id));
        toast.success('TODO deleted successfully!');
      } catch (error) {
        toast.error('Error deleting TODO');
      }
    }
  };

  const handleMarkAsDone = async (id, status) => {
    try {
      const { data } = await axios.put(`/api/todos/${id}`, { status }, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`,
        },
      });
      setTodos(todos.map((todo) => (todo._id === id ? data : todo)));
      toast.success(`TODO marked as ${status === 'Done' ? 'Done' : 'To Do'}!`);
    } catch (error) {
      toast.error('Error updating TODO status');
    }
  };

  const filterTodos = () => {
    let filtered = todos;
    const currentDate = new Date();
    if (filter === 'Overdue') {
      filtered = todos.filter(todo => new Date(todo.dueDate) < currentDate && todo.status === 'To Do');
    } else if (filter === 'To Do' || filter === 'Done') {
      filtered = todos.filter(todo => todo.status === filter);
    }
    setFilteredTodos(filtered);
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-4">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-5">TODOs</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-4 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            {...register('title', { required: 'Title is required' })}
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <input
            type="text"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            {...register('description')}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Type</label>
          <select
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            {...register('type')}
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
            {...register('dueDate', { required: 'Due Date is required' })}
          />
          {errors.dueDate && <p className="text-red-500 text-sm">{errors.dueDate.message}</p>}
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

      <ul className="mt-5 space-y-4">
        {filteredTodos.map((todo) => (
          <motion.li
            key={todo._id}
            className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <h2 className="font-bold text-lg">{todo.title}</h2>
              <p>{todo.description}</p>
              <p className="text-sm text-gray-500">{todo.type} - {new Date(todo.dueDate).toLocaleDateString()}</p>
              <p className="text-sm text-gray-500">{todo.status}</p>
              <p className="text-sm text-gray-500">Added: {moment(todo.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</p>
              {todo.status === 'Done' && (
                <p className="text-sm text-gray-500">Completed: {moment(todo.updatedAt).format('MMMM Do YYYY, h:mm:ss a')}</p>
              )}
            </div>
            <div className="flex space-x-2">
              <button
                className="text-blue-500 hover:underline"
                onClick={() => handleEdit(todo)}
              >
                <FaEdit />
              </button>
              <button
                className="text-red-500 hover:underline"
                onClick={() => handleDelete(todo._id)}
              >
                <FaTrashAlt />
              </button>
              <button
                className={`${todo.status === 'Done' ? 'text-yellow-500' : 'text-green-500'} hover:underline`}
                onClick={() => handleMarkAsDone(todo._id, todo.status === 'Done' ? 'To Do' : 'Done')}
              >
                {todo.status === 'Done' ? <FaUndo /> : <FaCheck />}
              </button>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export default TodoScreen;
