import React, { useState } from 'react';

const AddToDo = ({ addTodo }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      addTodo(input);
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input 
        type="text" 
        value={input} 
        onChange={(e) => setInput(e.target.value)} 
        className="w-full p-2 border border-gray-300 rounded mb-2" 
        placeholder="输入待办事项" 
      />
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700">添加</button>
    </form>
  );
};

export default AddToDo;
