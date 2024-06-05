// src/components/ToDoItem.tsx
import React from 'react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface ToDoItemProps {
  todo: Todo;
  deleteTodo: (id: number) => void;
  toggleComplete: (id: number) => void;
}

const ToDoItem: React.FC<ToDoItemProps> = ({ todo, deleteTodo, toggleComplete }) => {
  return (
    <li style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
        <div>
      {todo.text}
      <input type="checkbox" checked={todo.completed} onChange={() => toggleComplete(todo.id)} />
      <button onClick={() => deleteTodo(todo.id)}>删除</button>
        </div>
      {/* <button onClick={() => toggleComplete(todo.id)}>完成</button> */}
    </li>
  );
};

export default ToDoItem;
