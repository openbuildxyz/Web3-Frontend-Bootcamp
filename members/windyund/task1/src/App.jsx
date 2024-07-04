import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import Head from "./components/Header";
import AddToDo from "./components/AddToDo";
import ToDoList from "./components/ToDoList";
import Footer from "./components/Footer";

import './App.css'

function App() {

  let [todos, setTodos] = useState([])


  //从本地存储恢复待办事项
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      todos = JSON.parse(savedTodos)
      setTodos(todos);
    }
  }, [])

  // 当 todos 发生变化时保存到本地存储
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  function addTodo(todoObj) {
    setTodos([todoObj, ...todos])
  }

  function deleteTodo(id) {
    if(window.confirm("确认删除吗？")) {
      setTodos(todos.filter(todo => todo.id !== id))
    }
  }

  function updateTodo(id, done) {
    const newTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, done }
      } else {
        return todo
      }
    })
    setTodos(newTodos)
  }

  function checkAllDone(flag){
    const newTodos =  todos.map(todoObj =>{
      return   {...todoObj, done:flag}
    })
    setTodos(newTodos)
  }


  function clearTodoDone(){
    const newTodos = todos.filter(todo=>{
       return !todo.done
    })
    setTodos(newTodos)
  }


  return (
    <>
      <div className="todo-container">
        <div className="todo-wrap">
          <Head />
          <AddToDo addTodo={addTodo} />
          <ToDoList todos={todos} deleteTodo={deleteTodo} updateTodo={updateTodo} />
          <Footer todos={todos} checkAllDone={checkAllDone} clearTodoDone={clearTodoDone}/>
        </div>
      </div>
    </>
  )
}

export default App
