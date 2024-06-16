import { useEffect, useState } from 'react'
import './App.css'
import AddToDo from './componets/AddToDo'
import Header from './componets/Header'
import ToDoList from './componets/ToDoList'

export interface Todo {
  id: string
  text: string
  completed: boolean
}

const STORAGE_KEY = 'todo'

function App() {
  const [data, setData] = useState<Todo[]>(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'))

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }, [data])

  return (
    <div className="w-[550px]">
      <Header />
      <AddToDo addItem={setData} />
      <ToDoList
        data={data}
        updateData={setData}
      />
    </div>
  )
}

export default App
