// src/components/ToDoItem.jsx
import React from "react";

const ToDoItem = ({ todo, deleteTodo, toggleTodo }) => {
  return (
    <li
      style={{
        backgroundColor: todo.completed ? "lightgreen" : "transparent",
        padding: "10px",
        marginBottom: "5px",
        borderRadius: "5px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={toggleTodo}
        style={{ marginRight: "10px" }}
      />
      <span
        style={{
          textDecoration: todo.completed ? "line-through" : "none",
          flexGrow: 1,
        }}
        onClick={toggleTodo}
      >
        {todo.text}
      </span>
      <button onClick={deleteTodo}>删除</button>
    </li>
  );
};

export default ToDoItem;
