import React from 'react';

function ToDoItem({ todo, deleteTodo, toggleCompleted }) {
  return (
    <li>
      <span
        style={{ textDecoration: todo.completed ? 'line-through' : 'none', cursor: 'pointer' }}
        onClick={toggleCompleted}
      >
        {todo.text}
      </span>
      <button onClick={deleteTodo}>删除</button>
    </li>
  );
}

export default ToDoItem;
