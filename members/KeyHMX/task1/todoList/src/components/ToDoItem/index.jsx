import PropTypes from "prop-types";
import { useState } from "react";

const TodoItem = ({ todo, clickToDelete, id }) => {
  const [toggle, setToggle] = useState(false);
  const handleClickDone = () => {
    setToggle(!toggle);
  };
  return (
    <div className="todoitem">
      <p className="todo">{todo}</p>
      <p className="have-done">{toggle ? "have done" : "haven't done"}</p>
      <button
        className="delete"
        onClick={() => {
          clickToDelete(id);
        }}
      >
        Delete
      </button>
      <button className="have-done-btn" onClick={handleClickDone}>
        Done?
      </button>
    </div>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.string.isRequired,
  clickToDelete: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default TodoItem;
