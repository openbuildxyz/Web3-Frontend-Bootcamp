import { useState, useEffect } from 'react'

import { ITodoItem } from '@/types'

import Header from '@/components/header'
import TodoList from '@/components/todoList'
import TodoItem from './components/todoItem'
import AddToDo from './components/addToDo'


function App() {
  // 缓存数据 key
  const KEY = 'TODO_LIST'

  // 从缓存中拿取记录
  const localListData = JSON.parse(localStorage.getItem(KEY) || '[]')

  // 待办事件列表
  const [todoList, setTodoList] = useState<ITodoItem[]>(localListData)

  // 监控 todoList 的变化，当 todoList 变化时，将 todoList 存入缓存
  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(todoList))
  }, [todoList])

  // 添加待办事项
  const onAddTask = (item: ITodoItem) => {
    setTodoList([...todoList, item])
  }

  // 更新待办事项
  const onUpdateTask = (item: ITodoItem) => {

    // 更新的数据覆盖原有数据
    const newTodoList = todoList.map(todo => todo.id === item.id ? {...item} : todo)
    // 更新 todoList
    setTodoList(newTodoList)
  }

  // 
  const onDeleteTask = (id: number) => {
    const newTodoList = todoList.filter(todo => todo.id !== id)
    setTodoList(newTodoList)
  }

  return (
    <>
      <div className="w-full h-screen flex flex-justify-center flex-items-center">
        <div className="w-lg">
          <Header />
          <AddToDo onAddTask={ onAddTask } />
          <TodoList >
            {
              todoList.map(item => (
                <TodoItem key={item.id} item={item} onUpdateTask={ onUpdateTask } onDeleteTask={ onDeleteTask } />
              ))
            }
          </TodoList>
        </div>
      </div>
    </>
  )
}

export default App
