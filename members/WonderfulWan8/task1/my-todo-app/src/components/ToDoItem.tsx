// src/components/ToDoItem.tsx
import React from 'react';

interface ToDoItemProps {
  todo: {
    id: number;
    text: string;
    completed: boolean;
  };
  toggleComplete: (id: number) => void;
  deleteTodo: (id: number) => void;
}

const ToDoItem: React.FC<ToDoItemProps> = ({ todo, toggleComplete, deleteTodo }) => {
  return (
    <li>
      <span
        style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
        onClick={() => toggleComplete(todo.id)}
      >
        {todo.text}
      </span>
      <button onClick={() => deleteTodo(todo.id)}>完成</button>
    </li>
  );
};

export default ToDoItem;
