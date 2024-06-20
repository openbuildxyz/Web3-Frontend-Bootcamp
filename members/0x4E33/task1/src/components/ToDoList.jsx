import React from 'react';
import ToDoItem from './ToDoItem.jsx';

const ToDoList = ({ todos, deleteTodo, toggleCompletion }) => {
  return (
    <ul>
      {todos.map(todo => (
        <ToDoItem 
          key={todo.id} 
          todo={todo} 
          deleteTodo={deleteTodo} 
          toggleCompletion={toggleCompletion} 
        />
      ))}
    </ul>
  );
};

export default ToDoList;
