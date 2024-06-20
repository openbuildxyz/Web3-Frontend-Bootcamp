import { useState, useEffect } from 'react'
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from '@/components/header/index'
import { ToDoList } from '@/components/todo-list/index'
import { CopyRight } from '@/components/copyright'
import { AddToDo } from '@/components/add-todo'

export interface ToDoListItem {
  id: string
  text: string
  completed: boolean
}

const LOCAL_STORAGE_KEY = 'tooooodooooo'
const DEFAULT_TODO_LIST = [
  {
    id: 1,
    text: '任务一：使用 React 开发一个待办事项应用',
    completed: false
  },
  {
    id: 2,
    text: '任务二：区块链基础小测',
    completed: false
  },
  {
    id: 3,
    text: '任务三：编写并部署一个NFTMarket的合约',
    completed: false
  },
  {
    id: 4,
    text: '任务四：使用ethers.js和wagmi与NFTMarket合约交互',
    completed: false
  },
  {
    id: 5,
    text: '任务五：完成一个完整的NFTMarket的Dapp',
    completed: false
  },
  {
    id: 6,
    text: '任务六：完成SDK学习，制作一个与uniswap交互的前端app',
    completed: false
  },
  {
    id: 7,
    text: '任务七：跟随教程学习EVM++，实现一个限流器demo',
    completed: false
  }
]

function App() {
  const localToDoList = localStorage.getItem(LOCAL_STORAGE_KEY)
  const [toDoList, setToDoList] = useState<ToDoListItem[]>(JSON.parse(localToDoList || JSON.stringify(DEFAULT_TODO_LIST)))

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(toDoList))
  }, [toDoList])

  // Add new todo
  const handleAddNewToDo = (data: ToDoListItem) => {
    setToDoList([...toDoList, data])
  }

  // Completed todo
  const handleToDoCompleted = (toDo: ToDoListItem) => {
    const { id, text, completed } = toDo
    setToDoList(toDoList.map(toDo => {
      if(toDo.id === id) {
        toDo.text = text
        toDo.completed = completed
      }
      return toDo
    }))
  }

  // Remove todo
  const handleRemoveToDo = (id: ToDoListItem['id']) => {
    setToDoList(toDoList.filter(toDo => toDo.id !== id))
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="tooooodooooo-theme">
      <div className="w-full h-screen flex flex-col px-8">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center box-border">
          <div className="w-full flex-1 max-w-screen-sm pt-14">
            <AddToDo onAdd={ handleAddNewToDo } />
            <ToDoList data={toDoList} onChange={handleToDoCompleted} onRemove={handleRemoveToDo} />
          </div>
          <CopyRight />
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App
