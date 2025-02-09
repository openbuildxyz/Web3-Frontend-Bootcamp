import React, { useState } from "react";

interface AddToDoProps {
  onAdd: (text: string) => void;
}

const AddToDo: React.FC<AddToDoProps> = ({ onAdd }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(text);
    setText("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="add-todo-form">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="添加新的待办事项"
          className="add-todo-input"
        />
        <button type="submit" className="add-button">
          添加
        </button>
      </form>
    </div>
  );
};

export default AddToDo;
