import React, { useState, useEffect } from 'react';
import Header from './Header';
import ToDoList from './ToDoList';
import AddToDo from './AddToDo';
import { ToDo } from './types';

const App: React.FC = () => {
  const [todos, setTodos] = useState<ToDo[]>([]);

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

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
};

export default App;