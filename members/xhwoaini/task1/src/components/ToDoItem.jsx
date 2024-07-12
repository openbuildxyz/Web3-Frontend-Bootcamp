// src/components/ToDoItem.jsx
import React from 'react';

const ToDoItem = ({ todo, deleteTodo, toggleTodo }) => {
  return (
    <li>
      <span
        style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
        onClick={() => toggleTodo(todo.id)}
      >
        {todo.text}
      </span>
      <button onClick={() => deleteTodo(todo.id)}>删除</button>
    </li>
  );
};

export default ToDoItem;