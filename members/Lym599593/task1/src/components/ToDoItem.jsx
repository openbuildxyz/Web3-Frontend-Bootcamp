// src/components/ToDoItem.jsx
import React from 'react';

const ToDoItem = ({ todo, deleteTodo, toggleComplete }) => {
  return (
    <li style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
      <span onClick={() => toggleComplete(todo.id)}>{todo.text}</span>
      <button onClick={() => deleteTodo(todo.id)}>Delete</button>
    </li>
  );
};

export default ToDoItem;
