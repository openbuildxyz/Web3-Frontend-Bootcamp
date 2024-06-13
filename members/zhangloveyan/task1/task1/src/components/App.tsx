// src/App.tsx
import { useState, useEffect } from 'react';
import TodoList from './ToDoList';
import AddTodo from './AddToDo';
import Header from './Header';
import './App.css';

interface Todo {
  id: number;
  text: string;
  isCompleted: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    return localStorage.getItem('todos')
      ? JSON.parse(localStorage.getItem('todos')!) : [];
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = (text: string) => {
    const newTodo = {
      id: todos.length + 1,
      text,
      isCompleted: false,
    };
    setTodos([...todos, newTodo]);
  };

  const handleToggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className='app-container'>
      <div className="app-content">
        <Header />
        <AddTodo onAdd={handleAddTodo} />
        <TodoList
          todos={todos}
          onToggleTodo={handleToggleTodo}
          onDeleteTodo={handleDeleteTodo}
        />
      </div>
    </div>
  );
}

export default App;
