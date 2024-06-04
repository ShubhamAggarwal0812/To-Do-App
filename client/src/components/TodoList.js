import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ filteredTodos, handleEdit, handleDelete, handleMarkAsDone, getPersonalizedMessage }) => {
  return (
    <div className="todo-list mx-auto w-full sm:w-1/2">
      <div className="text-center mb-6 text-xl text-gray-500">
        {getPersonalizedMessage()}
      </div>
      <ul className="space-y-4">
        {filteredTodos.map((todo) => (
          <TodoItem
            key={todo._id}
            todo={todo}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            handleMarkAsDone={handleMarkAsDone}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
