import React from 'react';
import ToDoItem from './ToDoItem';

const ToDoList = ({ todos, deleteTodo, toggleTodo }) => {
  return (
    <ul>
      {todos.map(todo => (
        <ToDoItem
          key={todo.id}
          todo={todo}
          deleteTodo={deleteTodo}
          toggleTodo={toggleTodo}
        />
      ))}
    </ul>
  );
};

export default ToDoList;
