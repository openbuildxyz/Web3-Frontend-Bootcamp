import React from 'react';
import ToDoItem from './ToDoItem';

const ToDoList = ({ todos, onDelete, onToggle }) => { // 接收 onDelete 和 onToggle 作为 props
  return (
    <ul>
      {todos.map(todo => (
        <ToDoItem 
          key={todo.id} 
          todo={todo}
          onDelete={() => onDelete(todo.id)} // 传递 onDelete 函数
          onToggle={() => onToggle(todo.id)} // 传递 onToggle 函数
        />
      ))}
    </ul>
  );
};

export default ToDoList;