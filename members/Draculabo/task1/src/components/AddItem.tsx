import React, { FormEvent, useState } from 'react';

const AddItem = ({ addTodo }: { addTodo: (id: string) => void }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const value = input.trim();
    if (value.length === 0) {
      return;
    }
    if (input.trim()) {
      addTodo(value);
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full p-2 border border-gray-300 mb-2 outline-none rounded-md"
        placeholder="输入待办"
      />
      <button
        type="submit"
        className="w-full bg-green-400 rounded-md text-white p-2 hover:bg-green-600 focus:outline-none"
      >
        添加
      </button>
    </form>
  );
};

export default AddItem;
