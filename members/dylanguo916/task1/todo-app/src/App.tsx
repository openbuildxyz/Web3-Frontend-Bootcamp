// src/App.tsx
import { useState, useEffect } from 'react';
import Header from './components/Header';
import AddToDo from './components/AddToDo';
import ToDoList from './components/ToDoList';

interface ToDo {
  id: number;
  text: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<ToDo[]>([]);

  // Load todos from localStorage on first render
  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleAddToDo = (text: string) => {
    const newTodo: ToDo = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTodos((prev) => [...prev, newTodo]);
  };

  const handleToggleToDo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDeleteToDo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <div className="App">
      <Header />
      <AddToDo onAdd={handleAddToDo} />
      <ToDoList
        todos={todos}
        onToggle={handleToggleToDo}
        onDelete={handleDeleteToDo}
      />
    </div>
  );
}

export default App;