import React from 'react';

const ToDoItem = ({ todo, deleteTodo, toggleCompletion }) => {
  return (
    <li className={`flex justify-between items-center p-2 ${todo.completed ? 'line-through text-gray-500' : ''}`}>
      <span onClick={() => toggleCompletion(todo.id)} className="cursor-pointer">{todo.title}</span>
      <button onClick={() => deleteTodo(todo.id)} className="text-red-500 hover:text-red-700">删除</button>
    </li>
  );
};

export default ToDoItem;
