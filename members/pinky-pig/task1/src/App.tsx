import { useEffect, useState } from 'react'
import AddToDo from '@/components/layout/AddToDo'
import Header from '@/components/layout/Header'
import ToDoList from '@/components/layout/ToDoList'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from './components/ui/card'

export type TodoItemType = {
  id: string
  content: string
  completed: boolean
}

export const genId = (() => {
  let count = 0
  return () => {
    return (++count).toString()
  }
})()

export function Home() {
  const [toDos, setToDos] = useState<TodoItemType[]>(() => {
    const saved = localStorage.getItem('toDos')
    if (saved) {
      return JSON.parse(saved)
    }
    return []
  })

  useEffect(() => {
    localStorage.setItem('toDos', JSON.stringify(toDos))
  }, [toDos])

  function addToDos(toDo: TodoItemType) {
    setToDos((prev) => [...prev, toDo])
  }
  function removeToDos(toDo: TodoItemType) {
    setToDos((prev) => prev.filter((item) => item.id !== toDo.id))
  }
  function toggleToDos(toDo: TodoItemType) {
    setToDos((prev) =>
      prev.map((item) =>
        item.id === toDo.id ? { ...item, completed: !item.completed } : item,
      ),
    )
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center px-4 pt-10">
      <Card className="w-[600px]">
        <CardHeader>
          <CardTitle>
            <Header>Todo</Header>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <AddToDo addToDos={addToDos}></AddToDo>
          <br></br>
          <ToDoList
            toDos={toDos}
            removeToDos={removeToDos}
            toggleToDos={toggleToDos}
          ></ToDoList>
        </CardContent>
        <CardFooter className="flex justify-between">
          <hr></hr>
          <small className="italic">By Arvin</small>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Home
