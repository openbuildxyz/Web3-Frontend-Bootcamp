import React from "react";
import ToDoItem from "./ToDoItem";

const ToDoList = ({ todos, deleteTodo, toggleTodo }) => {
  return (
    <ul>
      {todos.map((todo, index) => (
        <ToDoItem
          key={index}
          todo={todo}
          deleteTodo={() => deleteTodo(index)}
          toggleTodo={() => toggleTodo(index)}
        />
      ))}
    </ul>
  );
};

export default ToDoList;
