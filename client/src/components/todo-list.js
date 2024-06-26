// client/src/components/TodoList.js

import React from "react";
import TodoItem from "./todo-item";

const TodoList = ({
  filteredTodos,
  handleEdit,
  handleDelete,
  handleToggleStatus,
  getPersonalizedMessage,
}) => {
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
            handleToggleStatus={handleToggleStatus}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
