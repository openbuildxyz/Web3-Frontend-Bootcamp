import { useState } from 'react'
import { Header } from './components/Header'
import { ToDoList } from './components/ToDoList'
import { AddToDo } from './components/AddToDo'

export type TodoItem = {
  id: number
  title: string
  done: boolean
}

function App() {
  const [list, setList] = useState<TodoItem[]>([{ id: Date.now(), title: 'Task 1', done: false }])
  const toggleDone = (id: number) => {
    setList(
      list.map(item => {
        if (item.id === id) {
          return { ...item, done: !item.done }
        }
        return item
      })
    )
  }

  const deleteItem = (id: number) => {
    setList(list.filter(item => item.id !== id))
  }

  const addTodo = (title: string) => {
    setList([...list, { id: Date.now(), title, done: false }])
  }

  return (
    <div className='mx-auto mt-20'>
      <Header></Header>
      <ToDoList list={list} toggleDone={toggleDone} deleteItem={deleteItem} />
      <AddToDo addTodo={addTodo} />
    </div>
  )
}

export default App
