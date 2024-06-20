import { useState } from 'react'
import Header from './components/Header'
import ToDoHero from './components/ToDoHero'
import AddToDo from './components/AddToDo'
import ToDoList from './components/ToDoList'
import type { Todo } from './TodoList' 
import './App.css'

function App() {

  const [todos, setTodos] = useState<Todo[]>(() => {
    return localStorage.getItem('todos')
      ? JSON.parse(localStorage.getItem('todos')!)
      : []
  });

  const todos_completed = todos.filter(
    (todo) => todo.is_completed == true
  ).length;
  const total_todos = todos.length;

  return (
    <>
      <div>
        <Header />
        <ToDoHero todos_completed={todos_completed} total_todos={total_todos} />
        <AddToDo todos={todos} setTodos={setTodos} />
        <ToDoList todos={todos} setTodos={setTodos} />
      </div>
    </>
  )
}

export default App
