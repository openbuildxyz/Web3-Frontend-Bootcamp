import React from 'react';

const ToDoItem = ({ todo, removeTodo, toggleComplete }) => {
  return (
    <div className={`ToDoItem ${todo.completed ? 'completed' : ''}`}>
      <span onClick={() => toggleComplete(todo.id)}>{todo.text}</span>
      <button onClick={() => removeTodo(todo.id)}>删除</button>
    </div>
  );
};

export default ToDoItem;