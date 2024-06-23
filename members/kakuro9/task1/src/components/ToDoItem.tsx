import { React, useState } from "react";
import { ToDo } from "../types";

interface ToDoItemProps {
  item: ToDo;
  toggleComplete: (id: number) => void;
  deleteToDo: (id: number) => void;
  updateToDo: (id: number, text: string) => void;
}

const ToDoItem: React.FC<ToDoItemProps> = ({
  item,
  toggleComplete,
  deleteToDo,
  updateToDo,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(item.text);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditText(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      updateToDo(item.id, editText);
      setIsEditing(false);
    }
  };

  const handleBlur = () => {
    updateToDo(item.id, editText);
    setIsEditing(false);
  };

  return (
    <div className="flex items-center justify-between p-2 border-b">
      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
          onBlur={handleBlur}
          className="flex-grow p-2 border rounded"
          autoFocus
        />
      ) : (
        <div
          className="flex flex-grow items-center"
          onDoubleClick={handleDoubleClick}
        >
          <input
            type="checkbox"
            checked={item.completed}
            onChange={() => toggleComplete(item.id)}
            className="mr-2"
          />
          <span
            className={`${item.completed ? "line-through text-gray-400" : ""}`}
          >
            {item.text}
          </span>
        </div>
      )}
      <button
        onClick={() => deleteToDo(item.id)}
        className="bg-red-500 text-white px-2 py-1 rounded"
      >
        delete
      </button>
    </div>
  );
};

export default ToDoItem;
