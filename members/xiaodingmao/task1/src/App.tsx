import React, { useEffect, useState } from 'react'
import './App.css'
import Header from './components/header'
import AddToDo from './components/AddTodo'
import TodoList from './components/TodoList'

export interface Todo {
  text: string
  completed: boolean
}
function App() {
  const [todos, setTodos] = useState<Todo[]>(()=>{
    return JSON.parse(localStorage.getItem('todos') || '[]') as Todo[]
  })
  // useEffect(() => {
  //   const storedTodos = JSON.parse(localStorage.getItem('todos') || '[]') as Todo[]; // 将结果转换为 Todo[] 类型
  //   setTodos(storedTodos);
  //   console.log(localStorage.getItem('todos'), todos)
  // }, [])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])
  function addTodo(text: string) {
    setTodos([...todos, { text, completed: false }])
  }
  const deleteTodo = (index: number) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos)
  }
  const toggleTodo = (index: number) => {
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
