import React from 'react';

export interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

interface ITodoItemProps {
  todo: TodoItem;
  onToggleComplete: (todo: TodoItem) => void;
  onDeleteTodo: (todo: TodoItem) => void;
}

const ITodoItem: React.FC<ITodoItemProps> = ({ todo, onToggleComplete, onDeleteTodo }) => {
  return (
    <li className={`flex justify-between items-center p-4 mb-2 rounded ${todo.completed ? 'bg-green-100' : 'bg-gray-100'}`}>
      <div>
        <input type="checkbox" checked={todo.completed} onChange={() => onToggleComplete(todo)} />
        <span className={`${todo.completed ? 'line-through' : ''}`} style={{ marginLeft: '8px' }}>
          {todo.text}
        </span>
      </div>
      <div className="flex items-center">
        <button onClick={() => onDeleteTodo(todo)}>❌</button>
      </div>
    </li>
  );
};

export default ITodoItem;
