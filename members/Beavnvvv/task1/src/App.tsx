import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import AddToDo from './components/AddToDo';
import ToDoList from './components/ToDoList';
import { ToDoItemType } from './types';

const App: React.FC = () => {
  const [todos, setTodos] = useState<ToDoItemType[]>([]);

  useEffect(() => {
    const loadTodos = () => {
      const storedTodos = localStorage.getItem('todos');
      setTodos(storedTodos ? JSON.parse(storedTodos) : []);
    };

    loadTodos();
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string) => {
    const newTodo: ToDoItemType = {
      id: Date.now(),
      text,
      isCompleted: false,
    };
    setTodos([...todos, newTodo]);
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleComplete = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    ));
  };

  return (
    <div className="App">
      <Header />
      <AddToDo onAdd={addTodo} />
      <ToDoList todos={todos} onDelete={deleteTodo} onToggleComplete={toggleComplete} />
    </div>
  );
};

export default App;