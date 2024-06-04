import React from 'react';
import { useForm } from 'react-hook-form';
import { FaTimes } from 'react-icons/fa';

const TodoForm = ({ onSubmit, currentTodo, editing, closeModal }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: currentTodo || {
      title: '',
      description: '',
      type: 'Personal',
      dueDate: '',
    }
  });

  const handleFormSubmit = (data) => {
    onSubmit(data);
    reset();
  };

  return (
    <div className="relative p-6">
      <button className="close-button absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-700" onClick={closeModal}>
        <FaTimes size={20} />
      </button>
      <div className="container mx-auto p-6 bg-white rounded shadow-md">
        <h1 className="text-4xl font-bold mb-5 text-center text-blue-600">{editing ? 'Edit TODO' : 'Add TODO'}</h1>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="bg-gray-100 p-4 rounded-lg shadow-md">
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
            <textarea
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
      </div>
    </div>
  );
};

export default TodoForm;
