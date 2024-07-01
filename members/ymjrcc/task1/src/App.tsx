import { useState, useEffect } from 'react';
import Header from './components/Header';
import ToDoList from './components/ToDoList';
import AddToDo from './components/AddToDo';

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addToDo = (text: string) => {
    const newToDo = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTodos([...todos, newToDo]);
  };

  const toggleComplete = (id: number) => {
    setTodos(todos.map((todo: { id: number; completed: any; }) => (
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )));
  };

  const removeToDo = (id: number) => {
    setTodos(todos.filter((todo: { id: number; }) => todo.id !== id));
  };

  return (
    <div className="App">
      <Header />
      <AddToDo addToDo={addToDo} />
      <ToDoList todos={todos} toggleComplete={toggleComplete} removeToDo={removeToDo} />
    </div>
  );
}

export default App;