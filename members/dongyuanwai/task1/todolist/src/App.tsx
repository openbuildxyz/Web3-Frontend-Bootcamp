import Header from './components/Header'
import ToDoList from './components/ToDoList'
import AddToDo from './components/AddToDo'
import { useState,useEffect } from 'react'
function App() {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('')

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'))
    if (storedTodos) {
      setTodos(storedTodos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { text: newTodo, completed: false }])
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


  return (
    <div style={{
      width:'100vw',
      display:"flex",
      alignItems:'center',
      justifyContent:'center'
    }}>
      <div>
        <Header />
        <AddToDo
          newTodo={newTodo}
          setNewTodo={setNewTodo}
          addTodo={addTodo}
        />
        <ToDoList
          todos={todos}
          deleteTodo={deleteTodo}
          toggleTodo={toggleTodo}
        />
      </div>
    </div>
  )
}

export default App