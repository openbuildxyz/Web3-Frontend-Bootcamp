import { useEffect, useState } from "react"
import AddToDo from "../components/AddToDo"
import Header from "../components/Header"
import './App.css'
import ToDoList from "../components/ToDoList"

function App() {
  const [todoList, setTodoList] = useState(() => {
    const todos = localStorage.getItem('todos') 
    return todos ? JSON.parse(todos) : []
  })

  useEffect(() => {
    const todos = JSON.stringify(todoList)
    localStorage.setItem('todos', todos)
  },[todoList])

  const add = (value) => {
    const len = todoList.length
    const newItem = {
      id: len > 0 ? todoList[len-1].id + 1 : 1,
      title: value,
      status: 0
    }
    const newToDoList = [
      ...todoList,
      newItem
    ]
    setTodoList(newToDoList)
  }

  const del = (id) => {
    const newToDoList = todoList.filter((item) => item.id !== id)
    setTodoList(newToDoList)
  }

  const update = (id) => {
    const newToDoList = [...todoList]
    newToDoList.forEach(item => {
      if (item.id == id) {
        item.status = !item.status
      }
    })
    setTodoList(newToDoList)
  } 

  return (
    <>
      <Header title='ToDoList'/>
      <AddToDo onAddToDo={(value) => add(value)}/>
      <ToDoList 
        data={todoList} 
        onDelToDo={(id) => del(id)}
        onUpdate={(id) => update(id)}
      /> 
    </>
  )
}

export default App
