import React from "react";
import { ToDo } from "../App";

interface ToDoItemProps {
  todo: ToDo;
  deleteTodo: (id: number) => void;
  toggleComplete: (id: number) => void;
}

const ToDoItem: React.FC<ToDoItemProps> = ({
  todo,
  deleteTodo,
  toggleComplete,
}) => {
  return (
    <li>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleComplete(todo.id)}
      />
      <span
        style={{ textDecoration: todo.completed ? "line-through" : "none" }}
      >
        {todo.text}
      </span>
      <button onClick={() => deleteTodo(todo.id)}>Delete</button>
    </li>
  );
};

export default ToDoItem;
