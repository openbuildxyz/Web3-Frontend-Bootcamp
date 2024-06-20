import React, { useState } from 'react';

interface AddToDoProps {
  onAdd: (text: string) => void;
}

const AddToDo: React.FC<AddToDoProps> = ({ onAdd }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputValue.trim()) {
      onAdd(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="添加一个任务"
      />
      <button type="submit">添加</button>
    </form>
  );
};

export default AddToDo;