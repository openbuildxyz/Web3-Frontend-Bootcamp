import { useState, useEffect } from 'react'
import { Todo } from './types'
import Header from './components/Header'
import AddTodo from './components/AddTodo'
import TodoList from './components/TodoList'

import './App.css'

function App() {
  const [todos, setTodos] = useState<Todo[]>(JSON.parse(localStorage.getItem('todos') || '[]'))

  const addTodo = (text: string) => {
    setTodos([
      ...todos,
      {
        id: Date.now(),
        text: text,
        completed: false,
      }
    ])
  }
  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }
  const toggleCompleted = (id: number) => {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed
        }
      }
      return todo
    }))
  }

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  return (
    <div className='todolist-container'>
      <Header title={"Todo List"} />
      <AddTodo onAdd={addTodo} />
      <TodoList onDelete={deleteTodo} onToggle={toggleCompleted} todos={todos} />
    </div>
  )
}

export default App
