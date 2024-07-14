/**
 * Task 1: Using React framework to make a "Todolist" app.
 * What I need to do:
 * 
 * # Init the project
 * 1. Init the project by using Create-vite.
 * 2. Config the structure of the project, create folders and files in necessity. 
 * 
 * # Create the following components
 * 1. App
 * 2. Header
 * 3. AddTodo
 * 4. TodoItem
 * 5. TodoList
 */


import './App.css'
import Header from './components/Header'
import AddTodo from './components/AddTodo'
import TodoList from './components/TodoList'
import { useEffect, useState } from 'react'

function App() {

  // Read and save item into local storage.
  const [todos, setTodos] = useState<string[]>(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      return JSON.parse(storedTodos);
    } else {
      return [];
    }
  })

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
    console.log('Saved to local storage:', todos);
  }, [todos]);

  // Implementation of the following functions:
  // 1. AddTodo
  // 2. DeleteTodo
  // 3. ToggleTodo
  const addTodo = (todo) => {
    setTodos([...todos, todo]);
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  const toggleTodo = (id) => {
    setTodos(todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed
        };
      }
      return todo;
    }));
  }
  return (
    <>
      <Header />
      <AddTodo addTodo={addTodo} />
      <TodoList todos={todos} deleteTodo={deleteTodo} toggleTodo={toggleTodo} />
    </>
  );
}

export default App
