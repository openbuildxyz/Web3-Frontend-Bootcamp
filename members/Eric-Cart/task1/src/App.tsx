/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react'
import './App.css'
import Header from './header'
import ToDoList from './todolist'
import { ToDo } from './todo'

function App() {
  const [inputValue, setInputValue] = useState('')
  const [toDoList, setToDoList] = useState<ToDo[]>([])
  // toDoList:
  // [
  //   {
  //     index: 0,
  //     content: 'read books',
  //     isDone: false
  //   },
  //   {
  //     index: 1,
  //     content: 'eat',
  //     isDone: true
  //   }
  //  ]


  useEffect(() => {
    const theList = localStorage.getItem('to-do-list');
    if (theList) setToDoList(JSON.parse(theList));
  }, [])

  const addToDoItem = () => {
    if (inputValue) {
      const updatedList = [...toDoList, {
        key: toDoList.length,
        content: inputValue,
        isDone: false
      }]

      setToDoList(updatedList)
      setInputValue('')
      localStorage.setItem('to-do-list', JSON.stringify(updatedList));
    }

    console.log(toDoList)
  }

  const deleteToDo = (key: number) => {
    const updatedList = toDoList.filter((item) => item.key !== key)
    setToDoList(updatedList)
    localStorage.setItem('to-do-list', JSON.stringify(updatedList));
  }

  const handleIsDone = (index: number) => {
    const updatedList = toDoList.map((todo) => todo.key === index ? { ...todo, isDone: !todo.isDone } : todo)
    setToDoList(updatedList)
    localStorage.setItem('to-do-list', JSON.stringify(updatedList));
  }

  return (
    <>
      <Header title='To Do List' />

      <input
        placeholder='Please enter a to do item'
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value)
        }}
      />

      <button
        onClick={addToDoItem}
      >submit</button>

      <ToDoList toDoList={toDoList} deleteToDo={deleteToDo} handleIsDone={handleIsDone} />
    </>
  )
}

export default App
