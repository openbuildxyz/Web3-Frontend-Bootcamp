import "../App.css";

import ToDoItem, { TODOProps } from "./ToDoItem";

interface TODOListProps {
  todos: TODOProps[];
  toggleComplete: (index: number) => void;
  deleteTodo: (index: number) => void;
}

const ToDoList = ({ todos, toggleComplete, deleteTodo }: TODOListProps) => {
  return (
    <div className="todo-list">
      {todos.map((todo: any, index: number) => (
        <ToDoItem
          key={index}
          todo={todo}
          index={index}
          toggleComplete={toggleComplete}
          deleteTodo={deleteTodo}
        />
      ))}
    </div>
  );
};

export default ToDoList;
