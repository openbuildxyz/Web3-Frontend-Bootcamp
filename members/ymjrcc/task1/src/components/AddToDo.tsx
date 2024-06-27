import { useState } from 'react';

interface AddToDoProps {
  addToDo: (todo: string) => void;
}

function AddToDo({ addToDo }: AddToDoProps) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      addToDo(inputValue);
      setInputValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        style={{ marginRight: 10 }}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button type="submit">Add ToDo</button>
    </form>
  );
}

export default AddToDo;
