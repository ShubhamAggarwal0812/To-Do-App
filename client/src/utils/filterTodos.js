// client/src/utils/filterTodos.js
const filterTodos = (todos, filter) => {
    const currentDate = new Date();
    let filtered = todos.filter(todo => todo.active);
  
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
  
    return filtered;
  };
  
  export default filterTodos;
