import { ToDoItem } from "./ToDoItem";
import { PropTypes } from "prop-types";

export function ToDoList({ todos, onDelete, onToggle }) {
  return (
    <div>
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
}

ToDoList.propTypes = {
  todos: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
};
