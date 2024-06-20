import React from 'react';
import {Todo} from '../types';

interface ToDoItemProps {
  todo: Todo;
  index: number;
  deleteTodo: (index: number) => void;
  toggleComplete: (index: number) => void;
}

const ToDoItem: React.FC<ToDoItemProps> = ({ todo, index, deleteTodo, toggleComplete }) => {
  return (
    <li className={todo.completed ? 'completed' : ''}>
      <input 
        type="checkbox" 
        checked={todo.completed} 
        onChange={() => toggleComplete(index)} 
      />
      <span>
        {todo.text}
      </span>
      <button className="delete" onClick={() => deleteTodo(index)}>Delete</button>
    </li>
  );
};

export default ToDoItem;
