import React from 'react';
import ToDoItem from './ToDoItem';
import { ToDoItemType } from '../types';

interface ToDoListProps {
  todos: Array<ToDoItemType>;
  onDelete: (id: number) => void;
  onToggleComplete: (id: number) => void;
}

const ToDoList: React.FC<ToDoListProps> = ({ todos, onDelete, onToggleComplete }) => {
  
  return (
    <ul>
      {todos.map((todo) => (
        <ToDoItem 
          key={todo.id}
          todo={todo}
          onDelete={onDelete}
          onToggleComplete={onToggleComplete}
        />
      ))}
    </ul>
  );
};

export default ToDoList;