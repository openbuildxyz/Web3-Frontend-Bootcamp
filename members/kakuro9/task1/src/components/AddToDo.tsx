import React, { useState } from "react";

interface AddToDoProps {
  addToDo: (text: string) => void;
}

const AddToDo: React.FC<AddToDoProps> = ({ addToDo }) => {
  const [inputValue, setInputValue] = useState("");

  const handleAdd = () => {
    if (inputValue.trim()) {
      addToDo(inputValue);
      setInputValue("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };

  return (
    <div className="flex mt-4">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyPress}
        className="flex-grow p-2 border rounded-l"
        placeholder="What needs to be done?"
      />
      {/* <button
        onClick={handleAdd}
        className="bg-blue-500 text-white px-4 py-2 rounded-r"
      >
        添加
      </button> */}
    </div>
  );
};

export default AddToDo;
