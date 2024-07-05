// src/components/ToDoItem.jsx
import React from 'react';
import './ToDoItem.css';

function ToDoItem({ todo, onToggleTodo, onRemoveTodo }) {
  return (
    <div className="todo-item">
      <span
        onClick={() => onToggleTodo(todo.id)}
        className={todo.completed ? 'completed' : ''}
      >
        {todo.text}
      </span>
      <button onClick={() => onRemoveTodo(todo.id)}>删除</button>
    </div>
  );
}

export default ToDoItem;
