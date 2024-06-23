import React from 'react';
import ToDoItem from './ToDoItem';

// ToDoList组件：展示待办事项列表
function ToDoList({ todos, deleteTodo, toggleCompleted }) {
  console.log('Rendering ToDoList with todos:', todos); // 添加日志以检查传入的todos

  return (
    <ul>
      {todos.map((todo, index) => (
        <ToDoItem
          key={index}
          todo={todo}
          deleteTodo={() => deleteTodo(index)}
          toggleCompleted={() => toggleCompleted(index)}
        />
      ))}
    </ul>
  );
}

export default ToDoList;
