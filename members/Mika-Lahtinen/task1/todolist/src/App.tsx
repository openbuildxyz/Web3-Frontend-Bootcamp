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
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState<string>('')

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { text: newTodo, completed: false }]);
      setNewTodo('')
    }
  }

  const deleteTodo = (index) => {
    const newTodos = [...todos]
    newTodos.splice(index, 1)
    setTodos(newTodos)
  }

  const toggleTodo = (index) => {
    const newTodos = [...todos]
    newTodos[index].completed = !newTodos[index].completed
    setTodos(newTodos)
  }

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'))
    if(storedTodos){
      setTodos(storedTodos)
    }
  }, [])

  useEffect(()=>{
    localStorage.setItem('todos',JSON.stringify(todos))
  }, [todos])
  
  return (
    <>
      <div>
        <Header />
        <AddTodo
          newTodo={newTodo}
          setNewTodo={setNewTodo}
          addTodo={addTodo} />
        <TodoList
          todos={todos}
          deleteTodo={deleteTodo}
          toggleTodo={toggleTodo} 
          />
      </div>
    </>
  )
}

export default App
