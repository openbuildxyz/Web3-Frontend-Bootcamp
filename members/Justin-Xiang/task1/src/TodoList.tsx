import React from "react";
import TodoItem from "./TodoItem";
import { Todo } from "./TodoItem";
interface ToDoListProps {
  todos: Todo[];
  toggleTodo: (index: number) => void;
  deleteTodo: (index: number) => void;
}

const ToDoList: React.FC<ToDoListProps> = ({
  todos,
  toggleTodo,
  deleteTodo,
}) => {
  return (
    <ul>
      {todos.map((todo, index) => (
        <TodoItem
          key={index}
          todo={todo}
          index={index}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
        />
      ))}
    </ul>
  );
};
export default ToDoList;
