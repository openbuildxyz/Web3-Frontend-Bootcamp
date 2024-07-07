// import React from "react";

import { useState } from "react";
import PropTypes from "prop-types";
const AddTodo = ({ addItem }) => {
  const [input, setInput] = useState("");
  const handleInputValue = (e) => {
    setInput(e.target.value);
  };
  const handleAddClick = () => {
    if (input.trim() !== "") {
      addItem(input);
      setInput("");
    }
  };
  return (
    <>
      <div className="addtodo">
        <input type="todo-thing" value={input} onChange={handleInputValue} />
        <button className="add-item" onClick={handleAddClick}>
          添加
        </button>
      </div>
    </>
  );
};
AddTodo.propTypes = {
  addItem: PropTypes.func.isRequired,
};
export default AddTodo;
