import React from 'react';
import ToDoItem from './ToDoItem';

const ToDoList = ({ todos, removeTodo, toggleComplete }) => {
  return (
    <div className="ToDoList">
      {todos.map((todo) => (
        <ToDoItem key={todo.id} todo={todo} removeTodo={removeTodo} toggleComplete={toggleComplete} />
      ))}
    </div>
  );
};

export default ToDoList;