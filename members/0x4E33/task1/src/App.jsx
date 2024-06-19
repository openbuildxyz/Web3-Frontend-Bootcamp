import React, { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import ToDoList from './components/ToDoList.jsx';
import AddTodo from './components/AddTodo.jsx';

const App = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (title) => {
    setTodos([...todos, { id: Date.now(), title, completed: false }]);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleCompletion = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? {...todo, completed: !todo.completed} : todo
    ))
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <Header />
      <AddTodo addTodo={addTodo} />
      <ToDoList todos={todos} deleteTodo={deleteTodo} toggleCompletion={toggleCompletion} />
    </div>
  );
};

export default App;
