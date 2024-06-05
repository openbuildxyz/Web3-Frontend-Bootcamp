import React, { useState } from 'react';

const AddToDo = ({ addTodo }) => {
  const [inputValue, setInputValue] = useState('');

  const handleAddTodo = () => {
    if (inputValue.trim() === '') return;
    addTodo(inputValue);
    setInputValue('');
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="添加新任务"
      />
      <button onClick={handleAddTodo}>添加</button>
    </div>
  );
};

export default AddToDo;