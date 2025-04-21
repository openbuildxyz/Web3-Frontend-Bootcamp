// src/components/AddToDo.tsx
import { useState } from 'react';

interface AddToDoProps {
  onAdd: (text: string) => void;
}

const AddToDo = ({ onAdd }: AddToDoProps) => {
  const [inputValue, setInputValue] = useState('');

  const handleAdd = () => {
    const trimmed = inputValue.trim();
    if (trimmed) {
      onAdd(trimmed);
      setInputValue('');
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter a new task..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
};

export default AddToDo;