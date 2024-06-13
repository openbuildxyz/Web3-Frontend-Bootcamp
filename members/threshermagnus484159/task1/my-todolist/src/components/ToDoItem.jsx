import React from "react";

const ToDoItem = ({ todo, index, deleteTodo, toggleTodo }) => {
  return (
    <li>
      <span
        style={{ textDecoration: todo.completed ? "line-through" : "none" }}
        onClick={() => toggleTodo(index)}
      >
        {todo.text}
      </span>
      <button onClick={() => deleteTodo(index)}>删除</button>
      
    </li>
  );
};

export default ToDoItem;
