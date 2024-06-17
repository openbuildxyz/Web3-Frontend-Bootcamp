import { useState, useEffect } from 'react';
import Header from './Header';
import AddToDo from './AddToDo';
import ToDoList from './ToDoList';

function App() {
  const [todos, setTodos] = useState(() => {
    const localData = localStorage.getItem('todos');
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addToDo = (text: string) => {
    const newToDo = { id: Date.now(), text, completed: false };
    setTodos([...todos, newToDo]);
  };

  const toggleToDo = (id: string) => {
    setTodos(
      todos.map((todo: { id: string; completed: any; }) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteToDo = (id: string) => {
    setTodos(todos.filter((todo: { id: string; }) => todo.id !== id));
  };

  return (
    <div className="container mx-auto mt-10 max-w-lg">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <Header />
        <AddToDo onAdd={addToDo} />
        <ToDoList items={todos} onToggle={toggleToDo} onDelete={deleteToDo} />
      </div>
    </div>
  );
}

export default App;