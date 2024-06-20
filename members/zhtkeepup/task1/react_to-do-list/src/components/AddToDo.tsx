import React from "react";

import { useState } from "react";

import { nanoid } from "nanoid";

function AddToDo({ tasks, setTasks }) {
  const [name, setName] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    if (name != "" && name != null) {
      const newTask = { id: `todo-${nanoid()}`, name, completed: false };
      setTasks([...tasks, newTask]);

      setName("");
    }
  }

  function handleChange(event) {
    setName(event.target.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        id="new-todo-input"
        className="input input__lg"
        name="text"
        autoComplete="off"
        value={name}
        onChange={handleChange}
      />
      <button type="submit" className="btn btn__primary btn__lg">
        Add
      </button>

      {/* <h2 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label__lg">
          [openbuild]
        </label>
      </h2> */}
    </form>
  );
}

export default AddToDo;
