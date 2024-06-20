import React from 'react';
import ToDoItem from './ToDoItem';

function ToDoList({ todos, setTodos }) {
  return (
    <ul>
      {todos.map((todo, index) => (
        <ToDoItem key={index} todo={todo} todos={todos} setTodos={setTodos} index={index} />
      ))}
    </ul>
  );
}

export default ToDoList;
