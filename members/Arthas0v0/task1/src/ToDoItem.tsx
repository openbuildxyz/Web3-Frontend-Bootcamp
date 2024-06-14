import React from 'react';

// 假设每个待办事项是一个对象，包含 id, text 和 completed 属性
const ToDoItem = ({ todo, onTodoDelete, onTodoToggle }) => {
  const handleDelete = () => {
    onTodoDelete(todo.id);
  };

  const handleToggle = () => {
    onTodoToggle(todo.id);
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggle}
      />
      <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
        {todo.text}
      </span>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default ToDoItem;