import React from 'react';
import ToDoItem from './ToDoItem'; // 假设 ToDoItem 组件在同一目录下

const ToDoList = ({ todos, onTodoDelete, onTodoToggle }) => {
  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <ToDoItem
          key={todo.id}
          todo={todo}
          onTodoDelete={onTodoDelete}
          onTodoToggle={onTodoToggle}
        />
      ))}
    </div>
  );
};

export default ToDoList;