import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import TodoList from './components/ToDoList'
import AddToDo from './components/AddToDo'
import { useEffect } from 'react'

function App() {
  const [todos, setTodos] = useState(() => {
    try {
      const todos = JSON.parse(localStorage.getItem('todos'))
      return todos || []
    } catch (error) {
      console.error(error)
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const handleAddTodo = (text) => {
    if (text) {
      setTodos([
        ...todos,
        {
          id: todos.length + 1,
          text,
          completed: false,
        },
      ])
    }
  }

  const handleCompleted = (id) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
        }
      }
      return todo
    })
    setTodos(newTodos)
  }

  const handleDelete = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id)
    setTodos(newTodos)
  }

  return (
    <div className='h-screen'>
      <Header peddingCount={todos.filter((todo) => !todo.completed).length} />
      <AddToDo onAddTodo={handleAddTodo} />
      <TodoList
        todos={todos}
        onCompleted={(id) => handleCompleted(id)}
        onDelete={(id) => handleDelete(id)}
      />
    </div>
  )
}

export default App
