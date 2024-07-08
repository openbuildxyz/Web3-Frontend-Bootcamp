import React, { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import ToDoList from './components/ToDoList'
import AddToDo from './components/AddToDo'
import { v4 as uuidv4 } from 'uuid'; // 引入 uuid 生成器

function App() {
  
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos');
    if(saved) {
      return JSON.parse(saved);
    }
    return [];
  })

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (task) => {
    const newTodo = { id: uuidv4(), task }; // 为每个任务生成唯一 ID
    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
  }

  const deleteTodo = (id) => {
    const newTodos = todos.filter(todo => todo.id !== id);
    setTodos(newTodos);
  }

  return (
    <div className='App'>
      <Header />
      <AddToDo onAdd={addTodo} />
      <ToDoList items={todos} onDelete={deleteTodo}/>
    </div>
  )
}

export default App
