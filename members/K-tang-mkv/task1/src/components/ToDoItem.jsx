import React from 'react';

const ToDoItem = ({ todo, deleteTodo, toggleTodo }) => {
  return (
    <li style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
      {todo.text}
      <button onClick={() => toggleTodo(todo.id)}>
        {todo.completed ? '未完成' : '完成'}
      </button>
      <button onClick={() => deleteTodo(todo.id)}>删除</button>
    </li>
  );
};

export default ToDoItem;

