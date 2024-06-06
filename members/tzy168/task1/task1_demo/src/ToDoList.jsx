import React from 'react';
import ToDoItem from './ToDoItem';
import "./index.css"

const ToDoList = ({ toDoItems, onDelete, onToggle }) => {
  // console.log(toDoItems);
  return (
    <ul className="todo-list">
      {toDoItems.map((item) => (
        <ToDoItem key={item.id} item={item} onDelete={onDelete} onToggle={onToggle} />
      ))}
    </ul>
  );
};

export default ToDoList;