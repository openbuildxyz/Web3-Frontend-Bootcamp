// src/components/ToDoList.tsx
import React from 'react';
import { ToDoListProps } from '../types';
import ToDoItem from './ToDoItem';


const ToDoList: React.FC<ToDoListProps> = ({ todos, deleteTodo, toggleComplete }) => {
  return (
    <ul>
      {todos.map(todo => (
        <ToDoItem
          key={todo.id}  
          todo={todo}  
          toggleComplete={toggleComplete}  
          deleteTodo={deleteTodo}  
        />
      ))}
    </ul>
  );
};

export default ToDoList;  
