import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ToDoList from './components/ToDoList';
import AddToDo from './components/AddToDo';
import {Todo} from './types';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [storageLoaded, setStorageLoaded] = useState<boolean>(false);

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos && storedTodos != '[]') {
      setTodos(JSON.parse(storedTodos));
    }
    setStorageLoaded(true);
  }, []);

  useEffect(() => {
    if(storageLoaded) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos, storageLoaded]);

  const addTodo = (text: string) => {
    setTodos([...todos, { text, completed: false }]);
  };

  const deleteTodo = (index: number) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const toggleComplete = (index: number) => {
    const newTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(newTodos);
  };

  return (
    <div className="container">
      <Header />
      <AddToDo addTodo={addTodo} />
      <ToDoList todos={todos} deleteTodo={deleteTodo} toggleComplete={toggleComplete} />
    </div>
  );
};

export default App;