// client/src/components/TodoModal.js
import React from 'react';
import Modal from 'react-modal';
import TodoForm from './TodoForm';

const TodoModal = ({ modalIsOpen, closeModal, onSubmit, currentTodo, editing }) => (
  <Modal
    isOpen={modalIsOpen}
    onRequestClose={closeModal}
    className="modal-content"
    overlayClassName="modal-overlay"
  >
    <TodoForm onSubmit={onSubmit} currentTodo={currentTodo} editing={editing} closeModal={closeModal} />
  </Modal>
);

export default TodoModal;
