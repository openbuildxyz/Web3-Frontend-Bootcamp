import './App.css'
import { Header } from './components/Header'
import { ToDoList } from './components/ToDoList'
import { AddToDo } from './components/AddToDo'
import { useLocalStorage } from './composables/useLocalStorage'
import { FC } from 'react'
import { ToDo } from './types'

const STORAGE_KEY = "todo_list"

const App: FC = () => {
  const [toDoList, setToDoList] = useLocalStorage<ToDo[]>(STORAGE_KEY, [])

  const addToDo = (userInput: string) => {
    const item = {
      text: userInput,
      completed: false,
      id: Date.now(),
    }
    setToDoList([...toDoList, item])
  }

  const handleRemove = (id: number) => {
    setToDoList(toDoList.filter(item => item.id !== id))
  }

  const handleToggle = (id: number) => {
    const mapped = toDoList.map((todo) => {
      return todo.id === id ? { ...todo, completed: !todo.completed} : {...todo}
    })
    setToDoList(mapped)
  }

  return (
    <div className='mt-12 text-faded'>
      <Header />
      <div className='mb-5 border-t-2 border-gray-500'></div>
      <AddToDo addToDo={addToDo}/>
      <ToDoList toDoList={toDoList} handleToggle={handleToggle} handleRemove={handleRemove} />
    </div>
  )
}

export default App
