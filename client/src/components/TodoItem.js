// client/src/components/TodoItem.js

import React from 'react';
import { FaEdit, FaTrashAlt, FaCheck, FaUndo } from 'react-icons/fa';
import { motion } from 'framer-motion';
import moment from 'moment';

const TodoItem = ({ todo, handleEdit, handleDelete, handleMarkAsDone }) => {
  return (
    <motion.li
      className="todo-item bg-white p-4 rounded-lg shadow-md flex justify-between items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <h2 className="text-xl font-bold text-gray-800">{todo.title}</h2>
        <p className="text-gray-600">{todo.description}</p>
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
  );
};

export default TodoItem;
