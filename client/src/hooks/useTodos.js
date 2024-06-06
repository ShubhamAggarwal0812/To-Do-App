// client/src/hooks/useTodos.js

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import filterTodos from '../utils/filterTodos';
import { fetchTodos, createTodo, updateTodo, deleteTodo, markTodoAsDone } from '../utils/api';
import getToken from '../utils/getToken';

const useTodos = () => {
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [filter, setFilter] = useState('All');
  const [editing, setEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const getTodos = async () => {
      const activeTodos = await fetchTodos();
      setTodos(activeTodos);
      setFilteredTodos(activeTodos);
    };

    getTodos();
  }, []);

  useEffect(() => {
    setFilteredTodos(filterTodos(todos, filter));
  }, [filter, todos]);

  const onSubmit = async (formData) => {
    if (!formData.title || !formData.dueDate) {
      toast.error('Title and Due Date are required.');
      return;
    }

    const token = getToken();
    let updatedTodos;

    if (editing) {
      const updatedTodo = await updateTodo(currentTodo._id, formData, token);
      if (updatedTodo) {
        updatedTodos = todos.map((todo) => (todo._id === currentTodo._id ? updatedTodo : todo))
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setTodos(updatedTodos);
        setEditing(false);
      }
    } else {
      const newTodo = await createTodo(formData, token);
      if (newTodo) {
        updatedTodos = [newTodo, ...todos];
        setTodos(updatedTodos);
      }
    }
    setModalIsOpen(false);
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
      const token = getToken();
      if (await deleteTodo(id, token)) {
        const updatedTodos = todos.filter((todo) => todo._id !== id);
        setTodos(updatedTodos);
        setFilteredTodos(updatedTodos);
      }
    }
  };

  const handleMarkAsDone = async (id, status) => {
    const token = getToken();
    const updatedTodo = await markTodoAsDone(id, status, token);
    if (updatedTodo) {
      const updatedTodos = todos.map((todo) => (todo._id === id ? updatedTodo : todo))
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setTodos(updatedTodos);
    }
  };

  return {
    filteredTodos,
    filter,
    editing,
    currentTodo,
    modalIsOpen,
    setFilter,
    openModal: () => {
      setEditing(false);
      setCurrentTodo(null);
      setModalIsOpen(true);
    },
    closeModal: () => {
      setModalIsOpen(false);
      setEditing(false);
    },
    onSubmit,
    handleEdit,
    handleDelete,
    handleMarkAsDone,
    handleFilterChange: (event) => setFilter(event.target.value),
    getPersonalizedMessage: () => {
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
    }
  };
};

export default useTodos;
