import React, { useState } from "react"

function AddToDo({ onAdd }) {

  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!value) return;
    onAdd(value);
    setValue("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="enter new task"
      />
      <button type="submit">Add</button>
    </form>
    
  )
}

export default AddToDo