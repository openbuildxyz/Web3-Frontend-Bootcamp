import React from 'react';
import ToDoItem from './list_item'

interface ToDoListProps {
  todos: { id: number; text: string; completed: boolean }[];
  deleteTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
}

const ToDoList: React.FC<ToDoListProps> = ({ todos, deleteTodo, toggleTodo }) => {
  return (
    <ul>
      {todos.map(todo => (
        <ToDoItem
          key={todo.id}
          todo={todo}
          deleteTodo={deleteTodo}
          toggleTodo={toggleTodo}
        />
      ))}
    </ul>
  );
};

export default ToDoList;
