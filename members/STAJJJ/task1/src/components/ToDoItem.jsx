import React from 'react';

const ToDoItem = ({ todo, index, deleteTodo, toggleTodo }) => {
  return (
    <li>
      <span
        className={todo.completed ? 'completed' : ''}
        onClick={() => toggleTodo(index)}
      >
        {todo.title}
      </span>
      <button onClick={() => deleteTodo(index)}>删除</button>
    </li>
  );
};

export default ToDoItem;
