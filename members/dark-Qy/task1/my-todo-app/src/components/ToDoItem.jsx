import React from 'react';

const ToDoItem = ({ todo, index, deleteTodo, toggleTodo }) => {
  return (
    <li className={todo.completed ? 'completed' : ''}>
      <span onClick={() => toggleTodo(index)}>{todo.text}</span>
      <button className="delete" onClick={() => deleteTodo(index)}>删除</button>
    </li>
  );
};

export default ToDoItem;
