import React from 'react';
import { ToDo } from '../types';

interface ToDoItemProps {
  todo: ToDo;
  toggleComplete: (id: number) => void;
  deleteTodo: (id: number) => void;
}

const ToDoItem: React.FC<ToDoItemProps> = ({ todo, toggleComplete, deleteTodo }) => {
  return (
    <div className="todo-item">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleComplete(todo.id)}
        className="checkbox"
      />
      <span
        className="todo-text"
        style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
        onClick={() => toggleComplete(todo.id)}
      >
        {todo.text}
      </span>
      <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>删除</button>
    </div>
  );
}

export default ToDoItem;
