import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ToDoList from './components/ToDoList';
import AddToDo from './components/AddToDo';

function App () {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addToDo = text => {
    const newTodo = {
      id: todos.length + 1,
      text,
      completed: false
    };
    setTodos([...todos, newTodo]);
  };

  const toggleComplete = id => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteToDo = id => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="app">
      <Header />
      <ToDoList
        todos={todos}
        toggleComplete={toggleComplete}
        deleteToDo={deleteToDo}
      />
      <AddToDo addToDo={addToDo} />
    </div>
  );
}

export default App;

