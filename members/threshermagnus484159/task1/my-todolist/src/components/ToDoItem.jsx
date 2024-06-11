import React from 'react';

const ToDoItem = ({ todo, onDelete, onToggle }) => {
  return (
    <li>
      <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
        {todo.text}
      </span>
      <button onClick={() => onDelete(todo.id)}>删除</button>
      <button onClick={() => onToggle(todo.id)}>完成</button>
    </li>
  );
};

export default ToDoItem;