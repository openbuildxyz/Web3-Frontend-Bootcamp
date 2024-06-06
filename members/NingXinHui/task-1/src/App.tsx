// src/App.tsx
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ToDoList from './components/ToDoList';
import AddToDo from './components/AddToDo';
import './App.css';

interface ToDo {
  text: string;
  completed: boolean;
}

const App: React.FC = () => {

  const [todos, setTodos] = useState<ToDo[]>([]);

  // 加载本地存储中的待办事项
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  const addTodo = (todo: ToDo) => {
    const _newTodos = [...todos, todo]
    handleSetStorage(_newTodos);
    setTodos([...todos, todo]);
  };

  const deleteTodo = (index: number) => {
    const newTodos = todos.filter((_, i) => i !== index);
    const _newTodos = [...newTodos]
    handleSetStorage(_newTodos);
    setTodos(newTodos);
  };

  const toggleComplete = (index: number) => {
    const newTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    handleSetStorage(newTodos);
    setTodos(newTodos);
  };

  const handleSetStorage = (todos: ToDo[]) => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  return (
    <div>
      <Header />
      <AddToDo addTodo={addTodo} />
      <ToDoList todos={todos} deleteTodo={deleteTodo} toggleComplete={toggleComplete} />
    </div>
  );
};

export default App;