// src/components/ToDoList.tsx
import React from 'react';
import ToDoItem from './ToDoItem';

interface ToDo {
  text: string;
  completed: boolean;
}

interface ToDoListProps {
  todos: ToDo[];
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
          deleteTodo={() => deleteTodo(index)}
          toggleComplete={() => toggleComplete(index)}
        />
      ))}
    </ul>
  );
};

export default ToDoList;