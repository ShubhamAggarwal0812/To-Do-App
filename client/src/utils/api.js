// client/src/utils/api.js
import axios from 'axios';
import { toast } from 'react-toastify';

export const fetchTodos = async () => {
  try {
    const { data } = await axios.get('/api/todos', {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`,
      },
    });
    return data.filter(todo => todo.active);
  } catch (error) {
    toast.error('Error fetching TODOs');
    return [];
  }
};

export const createTodo = async (formData, token) => {
  try {
    const { data } = await axios.post('/api/todos', { ...formData, active: true }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success('TODO added successfully!');
    return data;
  } catch (error) {
    toast.error('Error creating TODO');
    return null;
  }
};

export const updateTodo = async (id, formData, token) => {
  try {
    const { data } = await axios.put(`/api/todos/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success('TODO updated successfully!');
    return data;
  } catch (error) {
    toast.error('Error updating TODO');
    return null;
  }
};

export const deleteTodo = async (id, token) => {
  try {
    await axios.delete(`/api/todos/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success('TODO deleted successfully!');
    return true;
  } catch (error) {
    toast.error('Error deleting TODO');
    return false;
  }
};

export const markTodoAsDone = async (id, status, token) => {
  try {
    const { data } = await axios.put(`/api/todos/${id}`, { status }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success(`TODO marked as ${status === 'Done' ? 'Done' : 'To Do'}!`);
    return data;
  } catch (error) {
    toast.error('Error updating TODO status');
    return null;
  }
};
