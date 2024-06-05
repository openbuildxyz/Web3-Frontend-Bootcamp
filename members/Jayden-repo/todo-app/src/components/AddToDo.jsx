import React, { useState } from 'react';

function AddToDo ({ addToDo }) {
  const [text, setText] = useState('');

  const handleChange = e => {
    setText(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    addToDo(text);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={text} onChange={handleChange} />
      <button type="submit">Add</button>
    </form>
  );
}

export default AddToDo;
