import { FC } from 'react';
import { ToDoItemProps } from '../types';

export const ToDoItem: FC<ToDoItemProps> = ({ text, completed: checked, handleRemove, id, handleToggle }) => {
  return (
    <div>
      <input type='checkbox' checked={checked} onChange={() => handleToggle(id)} />
      <span>{text}</span>
      <button onClick={() => handleRemove(id)}>x</button>
    </div>
  );
};
