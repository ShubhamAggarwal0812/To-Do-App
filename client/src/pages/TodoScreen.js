import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaPlus } from 'react-icons/fa';
import Modal from 'react-modal';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';

const TodoScreen = () => {
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [filter, setFilter] = useState('All');
  const [editing, setEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const { data } = await axios.get('/api/todos', {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`,
          },
        });
        const activeTodos = data.filter(todo => todo.active);
        setTodos(activeTodos);
        setFilteredTodos(activeTodos);
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
        const updatedTodos = todos.map((todo) => (todo._id === currentTodo._id ? data : todo)).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setTodos(updatedTodos);
        setEditing(false);
      } else {
        const { data } = await axios.post('/api/todos', { ...formData, active: true }, {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`,
          },
        });
        const updatedTodos = [data, ...todos];
        setTodos(updatedTodos);
      }
      toast.success(editing ? 'TODO updated successfully!' : 'TODO added successfully!');
      setModalIsOpen(false);
    } catch (error) {
      toast.error('Error creating/updating TODO');
    }
  };

  const handleEdit = (todo) => {
    if (todo.status === 'Done') {
      toast.error('Cannot edit a completed TODO');
      return;
    }
    setEditing(true);
    setCurrentTodo(todo);
    setModalIsOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this TODO?')) {
      try {
        const { data } = await axios.delete(`/api/todos/${id}`, {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`,
          },
        });
        const updatedTodos = todos.filter((todo) => todo._id !== id);
        setTodos(updatedTodos);
        setFilteredTodos(updatedTodos);
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
      const updatedTodos = todos.map((todo) => (todo._id === id ? data : todo)).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setTodos(updatedTodos);
      toast.success(`TODO marked as ${status === 'Done' ? 'Done' : 'To Do'}!`);
    } catch (error) {
      toast.error('Error updating TODO status');
    }
  };

  const filterTodos = () => {
    let filtered = todos.filter(todo => todo.active); // Ensure filtering only active TODOs
    const currentDate = new Date();

    if (filter === 'Overdue') {
      filtered = filtered.filter(todo => new Date(todo.dueDate) < currentDate && todo.status === 'To Do')
        .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    } else if (filter === 'To Do') {
      filtered = filtered.filter(todo => todo.status === filter)
        .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    } else if (filter === 'Done') {
      filtered = filtered.filter(todo => todo.status === filter)
        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    } else {
      filtered = filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    setFilteredTodos(filtered);
  };

  const getPersonalizedMessage = () => {
    if (filteredTodos.length === 0) {
      return 'No tasks found for the selected filter.';
    }

    switch (filter) {
      case 'All':
        return 'Here are all your tasks.';
      case 'Overdue':
        return 'These tasks are overdue. Try to complete them soon!';
      case 'To Do':
        return 'Tasks to be completed.';
      case 'Done':
        return 'Completed tasks. Well done!';
      default:
        return '';
    }
  };

  const openModal = () => {
    setEditing(false);
    setCurrentTodo(null);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setEditing(false);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded shadow-md flex flex-col min-h-screen items-center">
      <ToastContainer />
      <h1 className="text-4xl font-bold mb-5 text-center text-blue-600">TODOs</h1>
      <button
        className="mb-6 w-full sm:w-1/2 inline-flex items-center justify-center bg-blue-600 text-white py-2 px-4 rounded-md font-bold transition transform hover:bg-blue-500 hover:-translate-y-1"
        onClick={openModal}
      >
        <FaPlus className="mr-2" /> Add TODO
      </button>

      <div className="mb-6 w-full sm:w-1/2">
        <select
          value={filter}
          onChange={handleFilterChange}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="All">All</option>
          <option value="Overdue">Overdue</option>
          <option value="To Do">To Do</option>
          <option value="Done">Done</option>
        </select>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <TodoForm onSubmit={onSubmit} currentTodo={currentTodo} editing={editing} closeModal={closeModal} />
      </Modal>

      <TodoList
        filteredTodos={filteredTodos}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleMarkAsDone={handleMarkAsDone}
        getPersonalizedMessage={getPersonalizedMessage}
      />
    </div>
  );
};

export default TodoScreen;
