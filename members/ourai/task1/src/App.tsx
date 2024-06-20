import { useState, useEffect } from 'react'
import type { Task } from './typing'
import Header from './Header'
import ToDoList from './ToDoList'
import AddToDo from './AddToDo'

const STORE_KEY = 'OpenBuild-ReactToDoListDemo'

function resolveCache(): Task[] {
  const cached = sessionStorage.getItem(STORE_KEY)

  return cached ? JSON.parse(cached) : []
}

function cacheTasks(tasks: Task[]) {
  sessionStorage.setItem(STORE_KEY, JSON.stringify(tasks))
}

function App() {
  const [tasks, setTasks] = useState<Task[]>(resolveCache())

  const handleSubmit = (text: string) => {
    setTasks(tasks.concat({ id: Date.now().toString(32), text, done: false }))
  }

  const handleMark = (task: Task) => {
    const newTasks = tasks.slice()
    const idx = tasks.findIndex(({ id }) => id === task.id)

    newTasks[idx].done = !tasks[idx].done

    setTasks(newTasks)
  }

  const handleRemove = (task: Task) => {
    const newTasks = tasks.slice()
    newTasks.splice(tasks.findIndex(({ id }) => id === task.id), 1)
    setTasks(newTasks)
  }

  useEffect(() => cacheTasks(tasks), [tasks])

  return (
    <>
      <Header />
      <div className="App-body">
        <AddToDo onSubmit={handleSubmit} />
        <ToDoList dataSource={tasks} onMark={handleMark} onRemove={handleRemove} />
      </div>
    </>
  )
}

export default App
