// client/src/pages/TodoScreen.js

import React from "react";
import { ToastContainer } from "react-toastify";
import { FaPlus } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import Filter from "../components/todo-filter";
import TodoModal from "../components/todo-modal";
import TodoList from "../components/todo-list";
import useTodos from "../hooks/use-todos";

const TodoScreen = () => {
  const {
    filteredTodos,
    filter,
    editing,
    currentTodo,
    modalIsOpen,
    openModal,
    closeModal,
    onSubmit,
    handleEdit,
    handleDelete,
    handleToggleStatus,
    handleFilterChange,
    getPersonalizedMessage,
  } = useTodos();

  return (
    <div className="container mx-auto p-6 bg-white rounded shadow-md flex flex-col min-h-screen items-center">
      <ToastContainer />
      <h1 className="text-4xl font-bold mb-5 text-center text-blue-600">
        TODOs
      </h1>
      <button
        className="mb-6 w-full sm:w-1/2 inline-flex items-center justify-center bg-blue-600 text-white py-2 px-4 rounded-md font-bold transition transform hover:bg-blue-500 hover:-translate-y-1"
        onClick={openModal}
      >
        <FaPlus className="mr-2" /> Add TODO
      </button>

      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <TodoModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        onSubmit={onSubmit}
        currentTodo={currentTodo}
        editing={editing}
      />

      <TodoList
        filteredTodos={filteredTodos}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleToggleStatus={handleToggleStatus}
        getPersonalizedMessage={getPersonalizedMessage}
      />
    </div>
  );
};

export default TodoScreen;
