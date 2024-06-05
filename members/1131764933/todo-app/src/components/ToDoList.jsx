
import React from 'react';
import ToDoItem from './ToDoItem';

const ToDoList = ({ todos, deleteToDo, toggleComplete }) => {
  return (
    <div>
      {todos.map((todo, index) => (
        <ToDoItem
          key={index}
          todo={todo}
          deleteToDo={() => deleteToDo(index)}
          toggleComplete={() => toggleComplete(index)}
        />
      ))}
    </div>
  );
};

export default ToDoList;
