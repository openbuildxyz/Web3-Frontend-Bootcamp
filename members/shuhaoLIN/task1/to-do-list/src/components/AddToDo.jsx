import React, { useState } from 'react';

function AddToDo({ addToDo }) {
  const [text, setText] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    if (text.trim() !== '') {
      addToDo(text);
      setText('');
    }
  };

  return (
    <form className="add-to-do-form" onSubmit={onSubmit}>
      <input
        type="text"
        className="add-to-do-input"
        placeholder="Enter a new to-do item"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit" className="add-to-do-button">
        Add
      </button>
    </form>
  );
}

export default AddToDo;