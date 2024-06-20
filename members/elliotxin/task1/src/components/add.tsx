import React, { useState } from 'react';

interface AddToDoProps {
  addTodo: (text: string) => void;
}

const AddToDo: React.FC<AddToDoProps> = ({ addTodo }) => {
  const [input, setInput] = useState('');

  const handleAdd = () => {
    if (input.trim()) {
      addTodo(input.trim());
      setInput('');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Add a new todo"
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
};

export default AddToDo;
