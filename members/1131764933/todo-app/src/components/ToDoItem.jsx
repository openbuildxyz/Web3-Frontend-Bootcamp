
import React from 'react';

const ToDoItem = ({ todo, deleteToDo, toggleComplete }) => {
  return (
    <div style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
      <span onClick={toggleComplete}>{todo.task}</span>
      <button onClick={deleteToDo}>删除</button>
    </div>
  );
};

export default ToDoItem;
