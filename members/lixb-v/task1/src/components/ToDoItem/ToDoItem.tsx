import React from 'react';

export type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

interface ToDoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export const ToDoItem: React.FC<ToDoItemProps> = ({
  todo,
  onDelete,
  onToggle,
}) => {
  const handleDeleteClick = () => {
    onDelete(todo.id);
  };

  const handleToggle = () => {
    onToggle(todo.id);
  };
  return (
    <li className="flex items-center justify-between py-2 border-b border-zinc-300 dark:border-zinc-600">
      <div>
        <input
          checked={todo.completed}
          type="checkbox"
          className="mr-2"
          onChange={handleToggle}
        />
        <span
          className={`text-zinc-800 dark:text-zinc-200 ${
            todo.completed && 'line-through'
          }`}
        >
          {todo.text}
        </span>
      </div>
      <button
        className="text-red-500 dark:text-red-300"
        onClick={handleDeleteClick}
      >
        Delete
      </button>
    </li>
  );
};

ToDoItem.displayName = 'ToDoItem';
