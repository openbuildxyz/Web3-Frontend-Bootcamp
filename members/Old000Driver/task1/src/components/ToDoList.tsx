import React from "react";
import ToDoItem from "./ToDoItem";
import { Todo } from "../App";

interface ToDoListProps {
  todos: Todo[];
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
}

const ToDoList: React.FC<ToDoListProps> = ({ todos, onDelete, onToggle }) => {
  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <ToDoItem
          key={todo.id}
          todo={todo}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
};

export default ToDoList;
