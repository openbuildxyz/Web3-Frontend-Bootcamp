import React from 'react';
import { ToDoItemProps } from '../types';

// 定义 ToDoItem 组件，显示单个待办事项
const ToDoItem: React.FC<ToDoItemProps> = ({ todo, deleteTodo, toggleComplete }) => {
  return (
    <li className={todo.completed ? 'completed' : ''}>  
      <div>
        <label>
          <input
            type="checkbox" 
            checked={todo.completed} 
            onChange={() => toggleComplete(todo.id)}  
          />
          <span
            onClick={() => toggleComplete(todo.id)}  
            style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}  
          >
            {todo.text}  
          </span>
        </label>
        <button onClick={() => deleteTodo(todo.id)}>删除</button>  
      </div>
    </li>
  );
};

export default ToDoItem;
