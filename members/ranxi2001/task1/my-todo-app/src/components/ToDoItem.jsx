// src/components/ToDoItem.jsx
import React from 'react';

function ToDoItem({ todo, deleteTodo, toggleComplete }) {
  return (
    <li>
      <span 
        style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
        onClick={() => toggleComplete(todo.id)}
      >
        {todo.text}
      </span>
      <button onClick={() => deleteTodo(todo.id)}>Delete</button>
    </li>
  );
}

export default ToDoItem;
