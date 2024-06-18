import React, { useRef } from 'react';

interface AddToDoProps {
  onAddToDo: (text: string) => void;
}

export const AddToDo: React.FC<AddToDoProps> = ({ onAddToDo }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    const value = inputRef.current?.value;
    if (!value) {
      return;
    }
    onAddToDo(value);
  };
  return (
    <div className="flex items-center border-b border-zinc-300 dark:border-zinc-600 py-2">
      <input
        ref={inputRef}
        type="text"
        placeholder="Add a new todo..."
        className="w-full bg-transparent focus:outline-none dark:text-zinc-200"
      />
      <button
        className="text-blue-500 dark:text-blue-300"
        onClick={handleClick}
      >
        Add
      </button>
    </div>
  );
};

AddToDo.displayName = 'AddToDoProps';
