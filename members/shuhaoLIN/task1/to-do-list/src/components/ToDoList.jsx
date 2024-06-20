import React from 'react';
import ToDoItem from './ToDoItem';

function ToDoList({ todos, deleteToDo, toggleComplete }) {
  return (
    <ul className="to-do-list">
      {todos.map((todo) => (
        <ToDoItem key={todo.id} todo={todo} deleteToDo={deleteToDo} toggleComplete={toggleComplete} />
      ))}
    </ul>
  );
}

export default ToDoList;