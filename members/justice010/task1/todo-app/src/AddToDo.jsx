import { useState } from "react";
import { PropTypes } from "prop-types";

export function AddToDo({ addToDo }) {
  const [inputValue, setInputValue] = useState("");

  function handleInputChange(e) {
    setInputValue(e.target.value);
  }

  function handleSubmit() {
    addToDo(inputValue);
    setInputValue("");
  }

  return (
    <div className="add-todo">
      <input
        type="text"
        value={inputValue}
        placeholder="添加待办事项"
        onChange={handleInputChange}
      />
      <button onClick={handleSubmit}>添加</button>
    </div>
  );
}

AddToDo.propTypes = {
  addToDo: PropTypes.func.isRequired,
};
