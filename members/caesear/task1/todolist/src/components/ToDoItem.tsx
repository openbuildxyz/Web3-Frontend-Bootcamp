import React from 'react';
import { ToDoItemProps } from '../types';

// 定义 ToDoItem 组件，显示单个待办事项
const ToDoItem: React.FC<ToDoItemProps> = ({ todo, deleteTodo, toggleComplete }) => {
  return (
    <li className={`flex items-center justify-between p-2 border-b ${todo.completed ? 'bg-gray-200' : 'bg-white'}`}> 
      <div className="flex items-center flex-grow">
        <label className="flex-grow flex items-center">
          <input
            className="mr-2"
            type="checkbox" 
            checked={todo.completed} 
            onChange={() => toggleComplete(todo.id)}  
          />
          <span
            onClick={() => toggleComplete(todo.id)}  
            className={`cursor-pointer ${todo.completed ? 'line-through text-gray-500' : ''}`} 
          >
            {todo.text}  
          </span>
        </label>
        <button 
         className="text-red-500 hover:text-red-700 ml-2"
        onClick={() => deleteTodo(todo.id)}>删除</button>  
      </div>
    </li>
  );
};

export default ToDoItem;
