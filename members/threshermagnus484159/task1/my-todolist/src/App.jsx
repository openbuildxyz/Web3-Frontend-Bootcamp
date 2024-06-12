import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ToDoList from './components/ToDoList';
import AddToDo from './components/AddToDo';
import './App.css';


function App() {
  // 初始化待办事项状态为一个空数组
  const [todos, setTodos] = useState([]);

  // 从本地存储加载待办事项
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  // 添加待办事项的函数
  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(), // 为新待办事项生成唯一ID
      text,
      completed: false
    };
    setTodos([...todos, newTodo]);
    localStorage.setItem('todos', JSON.stringify(todos)); // 保存到本地存储
  };

  // 删除待办事项的函数
  const deleteTodo = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos)); // 保存到本地存储
  };

  // 切换待办事项完成状态的函数
  const toggleCompleted = (id) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos)); // 保存到本地存储
  };

  return (
    <div className="App">
      <Header />
      <AddToDo onAdd={addTodo} />
      <ToDoList 
        todos={todos} 
        onDelete={deleteTodo} 
        onToggle={toggleCompleted} 
      />
    </div>
  );
}

export default App;