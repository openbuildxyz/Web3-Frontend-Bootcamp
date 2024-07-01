import PropTypes from "prop-types";
// import { useState } from "react";

const TodoItem = ({ todo, clickToDelete, id, onToggle, done }) => {
  // const [toggle, setToggle] = useState(false);
  // const handleClickDone = () => {
  //   setToggle(!toggle);
  // };
  return (
    <div className="todoitem">
      <p className="todo">{todo}</p>
      <p className="have-done">{done ? "have done" : "haven't done"}</p>
      <button
        className="delete"
        onClick={() => {
          clickToDelete(id);
        }}
      >
        Delete
      </button>
      <button className="have-done-btn" onClick={() => onToggle(id)}>
        Done?
      </button>
    </div>
  );
};

TodoItem.propTypes = {
  done: PropTypes.bool.isRequired,
  todo: PropTypes.string.isRequired,
  clickToDelete: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default TodoItem;
