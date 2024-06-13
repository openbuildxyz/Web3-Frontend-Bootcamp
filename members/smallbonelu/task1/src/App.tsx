import { useEffect, useRef, useState } from 'react'
import './App.css'
import AddToDo from './components/AddToDo'
import ToDoList from './components/ToDoList'
import type { ToDo } from './types'
import ToDoItem from './components/ToDoItem'
import Header from './components/Header'



function App() {

  const [data, setData] = useState<ToDo[]>([]);
  const mountRef = useRef(false)

  function saveToLocalStorage(todoList: ToDo[]) {
    localStorage.setItem('data', JSON.stringify(todoList));
  }

  function loadFromLocalStorage() {
    const data = localStorage.getItem('data');
    if (data) {
      return JSON.parse(data);
    }
  }

  useEffect(() => {
    if (!mountRef.current) {
      mountRef.current = true
      const todoList = loadFromLocalStorage();
      if (todoList) {
        setData(todoList);
      }
    }

    saveToLocalStorage(data)
  }, [data])

  function generateId() {
    return Date.now().toString(36) + Math.floor(Math.pow(10, 12) + Math.random() * 9*Math.pow(10, 12)).toString(36)
  }
  function handleAdd(text: string) {
    const id = generateId();
    setData([{ id, text, completed: false }, ...data])
  }

  function handleOnDelete(id: string) {
    setData(data.filter((item) => item.id !== id))
  }

  function handleOnComplete(id: string) {
    setData(data.map((item) => item.id === id ? { ...item, completed: !item.completed } : item))
  }

  return (
    <div className='flex flex-col gap-4'>
      <Header />
      <AddToDo onAdd={handleAdd} />
      <ToDoList>
        {data.length ?
          data.map((item) => (<ToDoItem key={item.id} id={item.id} text={item.text} completed={item.completed} onDelete={handleOnDelete} onComplete={handleOnComplete} />))
          : <p>No data</p>}
      </ToDoList>
    </div>
  )
}

export default App
