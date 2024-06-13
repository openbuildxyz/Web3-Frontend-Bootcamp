import { useState, useEffect } from 'react'
import Header from './Header.jsx'
import AddToDo from './AddToDo.jsx'
import ToDoList from './ToDoList.jsx'

function ToDoListWrapper() {
  const myListData = localStorage.myListData ? JSON.parse(localStorage.myListData) : []
  const [list, setList] = useState(myListData)

  useEffect(() => {
    localStorage.myListData = JSON.stringify(list)
  }, [list])

  function addList(inputValue) {
    let value = inputValue?.trim()
    if (value) {
      const newList = [...list, {value, status: false, id: Date.now()}]
      setList(newList)
    }
  }

  function removeItem(id) {
    const newList = list.filter(v => v.id !== id)
    setList(newList)
  }

  function toggleStatus(id) {
    const newList = list.map(item => {
      if (item.id === id) {
        return {
          ...item,
          status: !item.status
        }
      }
      return item
    })
    setList(newList)
  }
  
  return (
    <div className="flex flex-col w-1/5 h-1/2 border border-gray-200 rounded-lg shadow-lg">
      <Header></Header>
      <AddToDo addList={addList} ></AddToDo>
      <ToDoList list={list} removeItem={removeItem} toggleStatus={toggleStatus} ></ToDoList>
    </div>
  )
}

export default ToDoListWrapper
