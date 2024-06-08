import React, { ChangeEvent, useState } from 'react';

interface PropsType {
  onAddTodo: (input: string) => void;
}

const AddTodo: React.FC<PropsType> = ({ onAddTodo }) => {
  const [input, setInput] = useState<string>('');

  const handleAddTodo = () => {
    if (input.trim()) {
      onAddTodo(input);
      setInput('');
    }
  };
  return (
    <div className="flex mb-4">
      <input
        type="text"
        className="border rounded-l w-full py-2 px-3 text-pink-500 focus:outline-none"
        value={input}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
        placeholder="请输入待办事项"
      />
      <button className="bg-pink-500 text-white py-2 px-4 rounded-r hover:bg-pink-600 focus:outline-none" onClick={handleAddTodo}>
        Add ToDo
      </button>
    </div>
  );
};

export default AddTodo;
