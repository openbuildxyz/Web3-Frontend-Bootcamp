import React, { useState, useEffect } from 'react';
import Header from './compents/Header';
import ToDoList from './compents/ToDoList';
import AddToDo from './compents/AddToDo';

function App() {
  const [todos, setTodos] = useState([]);

  // Load todos from local storage when component mounts
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos'));
    if (savedTodos) {
      setTodos(savedTodos);
    }
  }, []);

  // Save todos to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <div>
      <Header />
      <AddToDo setTodos={setTodos} />
      <ToDoList todos={todos} setTodos={setTodos} />
    </div>
  );
}

export default App;
