// src/App.tsx
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ToDoList from './components/ToDoList';
import AddToDo from './components/AddToDo';
import { Todo } from './types';
import './index.css'

// 定义根组件，管理应用状态和逻辑
const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos');  // 从本地存储获取已保存的待办事项
    return savedTodos ? JSON.parse(savedTodos) : [];  // 如果存在则解析为对象，否则返回空数组
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));  // 每次待办事项变化时保存到本地存储
  }, [todos]);

  const addTodo = (todo: Todo) => {
    setTodos([...todos, todo]);  // 添加新的待办事项到数组
  };

  const toggleComplete = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo  // 切换待办事项的完成状态
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));  // 过滤掉要删除的待办事项
  };

  return (
    <div className="container mx-auto mt-10 max-w-lg">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <Header />
     
          <AddToDo addTodo={addTodo} />
          <ToDoList todos={todos} toggleComplete={toggleComplete} deleteTodo={deleteTodo} />
     
      </div>
     
     
    </div>
  );
};

export default App;  // 导出根组件
