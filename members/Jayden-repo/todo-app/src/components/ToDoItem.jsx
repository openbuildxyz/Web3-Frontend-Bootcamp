import React from 'react';

function ToDoItem ({ todo, toggleComplete, deleteToDo }) {
  const handleToggleComplete = () => {
    toggleComplete(todo.id);
  };

  const handleDelete = () => {
    deleteToDo(todo.id);
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggleComplete}
      />
      <span>{todo.text}</span>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default ToDoItem;
