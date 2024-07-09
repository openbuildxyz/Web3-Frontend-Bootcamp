// src/components/ToDoItem.jsx
import React from "react";

function ToDoItem({ todo, deleteTodo, toggleTodo }) {
  return (
    <li>
      <span
        style={{ textDecoration: todo.completed ? "line-through" : "none" }}
        onClick={toggleTodo}
      >
        {todo.text}
      </span>
      <button onClick={deleteTodo}>Delete</button>
    </li>
  );
}

export default ToDoItem;
