import React, { useState } from 'react';

interface AddToDoProps {
  addTodo: (text: string) => void;
}

const AddToDo: React.FC<AddToDoProps> = ({ addTodo }) => {
  const [inputValue, setInputValue] = useState('');

  const handleAdd = () => {
    if (inputValue.trim()) {
      addTodo(inputValue);
      setInputValue('');
    }
  };

  return (
    <div className="add-todo">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
};

export default AddToDo;
