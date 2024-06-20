import React, { useState } from 'react';

const AddToDo = ({ addTodo }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newTodo = {
      id: Date.now(),
      text: input,
      completed: false
    };

    addTodo(newTodo);
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
      style={{
        width:'300px',
        marginLeft:'10px',
        marginRight:'10px',
        paddingLeft:'10px',
        paddingTop: '10px', // 增加左侧内间距
        paddingBottom: '10px' // 增加右侧内间距
      }}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a new task"
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddToDo;
