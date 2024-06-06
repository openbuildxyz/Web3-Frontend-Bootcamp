import React from 'react';
import "./index.css"

const ToDoItem = ({ item, onDelete, onToggle }) => {
  return (
    <li className="todo-item-container">
      <input type="checkbox" checked={item.completed} onChange={() => onToggle(item.id)} className="todo-checkbox" />
      <span className={`todo-text ${item.completed? 'completed' : ''}`} style={{ textDecoration: item.completed? 'line-through' : 'none' }}>{item.text}</span>
      <button onClick={() => onDelete(item.id)} className="todo-delete-button">Delete</button>
    </li>
  );
};

export default ToDoItem;