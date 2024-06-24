import React, { useEffect, useState } from 'react';
import './App.css';

import Header from './components/Header';
import ToDoList from './components/ToDoList';
import AddToDo from './components/AddToDo';

function App() {
  const [todos, setTodos] = useState([]);

  // 在组件挂载时从 localStorage 加载待办事项
  useEffect(() => {
    const loadTodos = () => {
      const storedTodos = localStorage.getItem('todos');
      if (storedTodos) {
        const parsedTodos = JSON.parse(storedTodos);
        console.log('Loaded todos from localStorage:', parsedTodos);
        setTodos(parsedTodos);
      } else {
        console.log('No todos found in localStorage.');
      }
    };
    loadTodos();
  }, []); // 空依赖数组表示这个 effect 只在初次渲染后执行一次

  // // 每当 todos 状态改变时，将其保存到 localStorage
  // useEffect(() => {
  //   if (todos.length > 0) {
  //     console.log('Saving todos to localStorage:', todos);
  //     localStorage.setItem('todos', JSON.stringify(todos));
  //   }
  // }, [todos]); // 依赖数组包含 todos，因此每次 todos 变化时都会执行这个 effect

  // 添加新待办事项的函数
  const addTodo = (text) => {
    const newTodos = [...todos, { text, completed: false }];
    console.log('New todos after addTodo:', newTodos);
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));

  };

  // 根据索引删除待办事项的函数
  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, todoIndex) => todoIndex !== index);
    console.log('New todos after deleteTodo:', newTodos);
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));

  };

  // 根据索引切换待办事项完成状态的函数
  const toggleCompleted = (index) => {
    const newTodos = todos.map((todo, i) => 
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    console.log('New todos after toggleCompleted:', newTodos);
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  };

  return (
    <div className="App">
      <Header />
      <AddToDo addTodo={addTodo} />
      <ToDoList todos={todos} deleteTodo={deleteTodo} toggleCompleted={toggleCompleted} />
    </div>
  );
}

export default App;
