// src/components/AddToDo.tsx
import React, { useState } from 'react';

interface AddToDoProps {
  addTodo: (todo: { text: string; completed: boolean }) => void;
}

const AddToDo: React.FC<AddToDoProps> = ({ addTodo }) => {
  const [text, setText] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo({ text, completed: false });
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">Add ToDo</button>
    </form>
  );
};

export default AddToDo;