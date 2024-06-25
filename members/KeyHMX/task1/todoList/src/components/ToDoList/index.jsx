// import React from "react";
import TodoItem from "../ToDoItem";
import PropTypes from "prop-types";
const TodoList = ({ todos, onDelete }) => {
  return (
    <div>
      {todos.map((item) => (
        <TodoItem
          key={item.id}
          todo={item.todo}
          clickToDelete={onDelete}
          id={item.id}
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
};
export default TodoList;
