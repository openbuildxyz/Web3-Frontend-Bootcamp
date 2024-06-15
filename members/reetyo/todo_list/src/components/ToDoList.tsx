import React from 'react';
import ToDoItem from './ToDoItem';

function ToDoList({ todos, onDelete, onToggle }) {
  return (
    <ul>
      {todos.map((todo, index) => (
        <ToDoItem key={index} todo={todo} onDelete={onDelete} onToggle={onToggle} />
      ))}
    </ul>
  );
}

export default ToDoList;