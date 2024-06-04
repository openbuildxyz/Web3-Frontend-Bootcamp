import React, { useEffect, useState } from 'react'
import './App.css'
import Header from './Header'
import AddToDo from './AddToDo'
import ToDoList from './ToDoList'
import {v4 as uuidv4} from 'uuid';

function App() {
  const [todoList, setTodoList] = useState([])

  // useEffect(() => {
  //   const storedTodoList = JSON.parse(localStorage.getItem('todoList'))
  //   if (storedTodoList) setTodoList(storedTodoList)
  // }, [])

  // useEffect(() => {
  //   localStorage.setItem('todoList', JSON.stringify(todoList))
  // }, [todoList])

  const addTodo = (text) => {
    setTodoList([...todoList, {id: uuidv4(), value: text, completed: false}])
  }

  const deleteTodo = (id) => {
    setTodoList(todoList.filter(todo => todo.id !== id))
  }

  const toggleTodo = (id) => {
    setTodoList ((preTodoList) => 
      preTodoList.map(todo => (
        todo.id === id ? {...todo, completed: !todo.completed} : todo
      ))
    ) 
  }


  return (
    <>
      <Header />
      <AddToDo addTodo={addTodo} />
      <ToDoList todoList={todoList} deleteTodo={deleteTodo} toggleTodo={toggleTodo}/>
    </>
  )
}

export default App
