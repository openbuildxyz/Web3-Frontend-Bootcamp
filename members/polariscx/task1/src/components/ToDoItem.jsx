import React from 'react';

const ToDoItem = ({ todo, toggleComplete, deleteTodo }) => {
  return (
    <div className="todo-item">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleComplete(todo.id)}
      />
      <span className={todo.completed ? 'completed' : ''}>{todo.text}</span>
      <button onClick={() => deleteTodo(todo.id)}>Delete</button>
    </div>
  );
};

export default ToDoItem;


