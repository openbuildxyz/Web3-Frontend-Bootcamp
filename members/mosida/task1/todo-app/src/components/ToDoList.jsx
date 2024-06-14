import React from 'react';
import ToDoItem from './ToDoItem';

function ToDoList({ todos, onToggleCompleted, onDeleteTodo }) {
  return (
    <ul>
      {todos.map(todo => (
        <ToDoItem
          key={todo.id}
          todo={todo}
          onToggleCompleted={() => onToggleCompleted(todo.id)}
          onDeleteTodo={() => onDeleteTodo(todo.id)}
        />
      ))}
    </ul>
  );
}

export default ToDoList;
