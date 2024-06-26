import React from 'react';

const ToDoItem = ({ todo, deleteTodo, toggleTodo }) => {
  return (
    <li>
      <span 
        onClick={() => toggleTodo(todo.id)} 
        style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
      >
        {todo.text}
      </span>
      <button onClick={() => deleteTodo(todo.id)}>删除</button>
    </li>
  );
};

export default ToDoItem;
