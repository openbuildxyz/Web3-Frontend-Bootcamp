import React from 'react';

function ToDoItem({ todo, onDelete, onToggle }) {
  return (
    <li onClick={() => onToggle(todo.id)} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
      {todo.text}
      <button onClick={() => onDelete(todo.id)}>删除</button>
    </li>
  );
}

export default ToDoItem;