import { useState, useEffect } from 'react'
import Header from './components/Header'
import List from './components/List'
import AddItem from './components/AddItem'

import './App.css'

interface ToDoItem {
  content: string,
  completed: boolean
}

function App() {
  const [todoList, setTodoList] = useState<ToDoItem[]>(() => {
    const hadStoredData = localStorage.getItem('todoList')
    return hadStoredData ? JSON.parse(hadStoredData) : []
  })

  useEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(todoList))
  }, [todoList])

  const deleteItem = (index: number) => {
    const newTodoList = todoList.filter((_, i) => i !== index)
    setTodoList(newTodoList)
  }

  const toggleItem = (index: number) => {
    const newTodoList = todoList.map((e, i) => i === index ? {...e, completed: !e.completed} : e)
    setTodoList(newTodoList)
  }

  const addItem = (content: string) => {
    const newItem = {content, completed: false}
    setTodoList([...todoList, newItem])
  }

  return (
    <div>
      <Header />
      <List todoList={todoList} deleteItem={deleteItem} toggleItem={toggleItem}/>
      <AddItem addItem={addItem} />
    </div>
  )
}

export default App
