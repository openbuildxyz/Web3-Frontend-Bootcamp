import React, { useState } from 'react';

function AddToDo({ onAdd }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input) {
      onAdd(input);
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
      <button type="submit">添加</button>
    </form>
  );
}

export default AddToDo;
