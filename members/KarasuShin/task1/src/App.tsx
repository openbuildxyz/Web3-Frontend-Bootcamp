import { useEffect, useState } from 'react'
import { AddTodo } from './components/add-todo'
import { Header } from './components/header'
import type { TodoItem } from './components/context'
import { Context } from './components/context'
import { TodoList } from './components/todo-list'

export default function App() {
  const [todoList, setTodoList] = useState<TodoItem[]>(() => {
    const storage = localStorage.getItem('todoList')
    if (!storage) {
      return []
    }
    try {
      const value = JSON.parse(storage)
      return Array.isArray(value) ? value : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(todoList))
  }, [todoList])

  return (
    <Context.Provider
      value={{
        todoList,
        setTodoList,
      }}
    >
      <div className="h-full from-slate-900 to-slate-600 bg-gradient-to-tl">
        <div className='text-white mx-auto pt-12 max-w-xl h-full flex flex-col pb-4'>
          <Header />
          <AddTodo />
          <TodoList />
        </div>
      </div>
    </Context.Provider>
  )
}
