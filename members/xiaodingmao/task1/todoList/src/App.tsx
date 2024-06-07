import { useState } from 'react'
import './App.css'
import Header from './components/header'
import AddToDo from './components/AddTodo'
import TodoList from './components/TodoList'

export interface Todo {
  text: string
  completed: boolean
}
function App() {
  const [todos, setTodos] = useState<Todo[]>([])

  function addTodo(text: string) {
    setTodos([...todos, { text, completed: false }])
  }
  const deleteTodo =(index:number)=>{
    const newTodos = [...todos];
    newTodos.splice(index,1);
    setTodos(newTodos)
  }
  const toggleTodo = (index: number)=>{
    const newTodos = [...todos]
    newTodos[index].completed = !newTodos[index].completed
    setTodos(newTodos)
  }
  return (
    <>
      <div>
        <Header />
        <AddToDo addTodo={addTodo} />
      </div>
      <div className="card">
        <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo}></TodoList>
      </div>

    </>
  )
}

export default App
