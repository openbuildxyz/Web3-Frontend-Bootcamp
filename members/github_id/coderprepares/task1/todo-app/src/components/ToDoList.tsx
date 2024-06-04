import React from 'react';
import ToDoItem from './ToDoItem';
import {Todo} from '../types';

interface ToDoListProps {
  todos: Todo[];
  deleteTodo: (index: number) => void;
  toggleComplete: (index: number) => void;
}

const ToDoList: React.FC<ToDoListProps> = ({ todos, deleteTodo, toggleComplete }) => {
  return (
    <ul>
      {todos.map((todo, index) => (
        <ToDoItem 
          key={index} 
          todo={todo} 
          index={index} 
          deleteTodo={deleteTodo} 
          toggleComplete={toggleComplete} 
        />
      ))}
    </ul>
  );
};

export default ToDoList;
