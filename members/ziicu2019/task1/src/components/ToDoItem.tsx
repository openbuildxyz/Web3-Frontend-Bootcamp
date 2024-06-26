import React from "react";

type toDo = {
  index: number;
  text: string;
  completed: boolean;
  onDeleteTodo: (index: number) => void;
  onToggleTodo: (index: number) => void;
};

const ToDoItem: React.FC<toDo> = ({ index, text, completed, onDeleteTodo, onToggleTodo }) => {
  const handleToggle = () => {
    onToggleTodo(index);
  };

  const handleDelete = () => {
    onDeleteTodo(index);
  };

  const icon = completed ? <span className="text-green-500">✅</span> : <span className="text-yellow-500">⏳</span>;

  return (
    <div className="flex items-center justify-between text-2xl py-2 hover:bg-cyan-950">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={completed}
          onChange={handleToggle}
          className="w-6 h-6"
        />
        <span className="ml-2">{text}</span>
        <span>{icon}</span>
      </div>
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded text-xl"
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  );
};

export default ToDoItem;
