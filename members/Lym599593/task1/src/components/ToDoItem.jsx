import React from 'react';

const ToDoItem = ({ todo, index, toggleTodo, deleteTodo }) => {
  return (
    <li style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
      <span onClick={() => toggleTodo(index)}>{todo.text}</span>
      <button onClick={() => deleteTodo(index)}>删除</button>
    </li>
  );
};

export default ToDoItem;
