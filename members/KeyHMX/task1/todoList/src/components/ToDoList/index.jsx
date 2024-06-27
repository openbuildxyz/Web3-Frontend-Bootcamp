// import React from "react";
import TodoItem from "../ToDoItem";
import PropTypes from "prop-types";
const TodoList = ({ todos, onDelete, onhandleToggle }) => {
  return (
    <div>
      {todos
        .filter((item) => item != null)
        .map((item) => (
          <TodoItem
            key={item.id}
            todo={item.todo}
            clickToDelete={onDelete}
            id={item.id}
            onToggle={onhandleToggle}
            done={item.done}
          />
        ))}
    </div>
  );
};
TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      todo: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
  onhandleToggle: PropTypes.func.isRequired,
};
export default TodoList;
