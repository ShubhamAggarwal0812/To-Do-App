// client/src/utils/api.js

import axios from 'axios';
import { toast } from 'react-toastify';
import getToken from './getToken';

export const fetchTodos = async () => {
    try {
        const token = getToken();
        const { data } = await axios.get('/api/todos', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return data.filter(todo => todo.active);
    } catch (error) {
        toast.error('Error fetching TODOs');
        return [];
    }
};

export const createTodo = async (formData) => {
    try {
        const token = getToken();
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

export const updateTodo = async (id, formData) => {
    try {
        const token = getToken();
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

export const deleteTodo = async (id) => {
    try {
        const token = getToken();
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

export const markTodoAsDone = async (id, status) => {
    try {
        const token = getToken();
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

export const toggleTodoStatus = async (id) => {
    try {
        const token = getToken();
        const { data } = await axios.patch(`/api/todos/${id}/status`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        toast.success(`TODO status toggled to ${data.status}`);
        return data;
    } catch (error) {
        toast.error('Error toggling TODO status');
        return null;
    }
};
