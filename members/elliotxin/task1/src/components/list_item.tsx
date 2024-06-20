import React from 'react';

interface ToDoItemProps {
  todo: { id: number; text: string; completed: boolean };
  deleteTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
}

const ToDoItem: React.FC<ToDoItemProps> = ({ todo, deleteTodo, toggleTodo }) => {
  return (
    <li style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
      <span onClick={() => toggleTodo(todo.id)}>{todo.text}</span>
      <button onClick={() => deleteTodo(todo.id)}>Delete</button>
    </li>
  );
};

export default ToDoItem;
