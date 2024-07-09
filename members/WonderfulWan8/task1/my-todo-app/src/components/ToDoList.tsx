// src/components/ToDoList.tsx
import React from 'react';
import ToDoItem from './ToDoItem';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface ToDoListProps {
  todos: Todo[];
  toggleComplete: (id: number) => void;
  deleteTodo: (id: number) => void;
}

const ToDoList: React.FC<ToDoListProps> = ({ todos, toggleComplete, deleteTodo }) => {
  return (
    <ul>
      {todos.map((todo) => (
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
