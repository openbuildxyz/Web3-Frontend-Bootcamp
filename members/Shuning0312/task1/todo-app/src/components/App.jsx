// src/components/App.jsx
import React, { useState, useEffect } from 'react';
import Header from './Header';
import ToDoList from './ToDoList';
import AddToDo from './AddToDo';
import './App.css'; // 确保路径和文件名正确

function App() {
  const [todos, setTodos] = useState(() => JSON.parse(localStorage.getItem('todos')) || []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = text => {
    const newTodo = { id: Date.now(), text, completed: false };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = id => {
    setTodos(
      todos.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
    );
  };

  const removeTodo = id => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="container">
      <Header />
      <AddToDo onAddTodo={addTodo} />
      <ToDoList todos={todos} onToggleTodo={toggleTodo} onRemoveTodo={removeTodo} />
    </div>
  );
}

export default App;
