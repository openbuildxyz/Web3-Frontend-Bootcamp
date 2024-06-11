import ToDoItem from "./ToDoItem";
import React from 'react';  
const ToDoList = ({ items, toggleItem, deleteItem }) => {
  return (
    <div >
      {items.length === 0 && (
        <p >No todos yet...</p>
      )}
      {items.map((item) => (
        <ToDoItem
          key={item.id}
          {...item}
          toggleItem={toggleItem}
          deleteItem={deleteItem}
        />
      ))}
    </div>
  );
};

export default ToDoList;