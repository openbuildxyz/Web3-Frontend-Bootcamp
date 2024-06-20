'use client'
import Header from './components/header/page'
import ToDoList from './components/todolist/page'

export default function Home() {
  return (
    <>
      <div className="w-[450px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <Header />
        <ToDoList></ToDoList>
      </div>
    </>
  )
}
