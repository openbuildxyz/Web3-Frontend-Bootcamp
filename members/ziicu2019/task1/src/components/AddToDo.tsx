import React, { useState } from "react";

type AddToDoProps = {
  onAddTodo: (inputValue: string) => void;
};

const AddToDo: React.FC<AddToDoProps> = ({ onAddTodo }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleAddClick = () => {
    if (!inputValue) return;
    onAddTodo(inputValue);
    setInputValue("");
  };

  return (
    <div className="mt-10 flex items-center">
      <input
        type="text"
        placeholder="Add a new todo item..."
        className="border border-cyan-300 flex-grow text-2xl p-2 rounded-md mr-2 lg:w-96"
        value={inputValue}
        onChange={handleInputChange}
      />
      <button
        className="w-20 border border-cyan-300 bg-cyan-600 text-white text-2xl rounded-md p-2 hover:bg-cyan-500 active:bg-cyan-700"
        onClick={handleAddClick}
      >
        Add
      </button>
    </div>
  );
};

export default AddToDo;
