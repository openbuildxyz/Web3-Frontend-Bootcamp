import React from "react";
import ToDoItem from "./ToDoItem";
import { ToDo } from "../App";

interface ToDoListProps {
  todos: ToDo[];
  deleteTodo: (id: number) => void;
  toggleComplete: (id: number) => void;
}

const ToDoList: React.FC<ToDoListProps> = ({
  todos,
  deleteTodo,
  toggleComplete,
}) => {
  return (
    <ul>
      {todos.map((todo) => (
        <ToDoItem
          key={todo.id}
          todo={todo}
          deleteTodo={deleteTodo}
          toggleComplete={toggleComplete}
        />
      ))}
    </ul>
  );
};

export default ToDoList;
