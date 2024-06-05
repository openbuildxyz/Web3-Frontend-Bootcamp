import React from 'react';
import ToDoItem from './ToDoItem';

function ToDoList ({ todos, toggleComplete, deleteToDo }) {
  return (
    <div className="todo-list">
      {todos.map(todo => (
        <ToDoItem
          key={todo.id}
          todo={todo}
          toggleComplete={toggleComplete}
          deleteToDo={deleteToDo}
        />
      ))}
    </div>
  );
}

export default ToDoList;
