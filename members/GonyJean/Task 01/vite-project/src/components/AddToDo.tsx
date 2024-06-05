// src/components/AddToDo.tsx
import React, { useState } from 'react';

interface AddToDoProps {
  addTodo: (todo: { id: number; text: string; completed: boolean }) => void;
}

const AddToDo: React.FC<AddToDoProps> = ({ addTodo }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    addTodo({
      id: Date.now(),
      text,
      completed: false
    });
    setText('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">添加</button>
    </form>
  );
};

export default AddToDo;
