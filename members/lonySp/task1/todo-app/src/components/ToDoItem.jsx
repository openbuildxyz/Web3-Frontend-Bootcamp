import React from 'react';

const ToDoItem = ({ todo, index, toggleTodo, deleteTodo }) => {
  return (
    <li style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
      <span onClick={() => toggleTodo(index)} style={{ cursor: 'pointer' }}>
        {todo.text}
      </span>
      <button onClick={() => deleteTodo(index)}>删除</button>
      <button onClick={() => toggleTodo(index)}>
        {todo.completed ? '未完成' : '完成'}
      </button>
    </li>
  );
};

export default ToDoItem;
