import React from 'react';
import { ToDoItemType } from '../types';

interface ToDoItemProps {
  todo: ToDoItemType;
  onDelete: (id: number) => void;
  onToggleComplete: (id: number) => void;
}

const ToDoItem: React.FC<ToDoItemProps> = ({ todo, onDelete, onToggleComplete }) => {
  return (
    <li
      style={{ textDecoration: todo.isCompleted ? 'line-through' : 'none' }}
      className={todo.isCompleted ? 'completed' : ''}
    >
      {todo.text}
      <button onClick={() => onDelete(todo.id)}>删除</button>
      <button onClick={() => onToggleComplete(todo.id)}>完成</button>
    </li>
  );
};

export default ToDoItem;