import { useContext, useState, createContext, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AddTodo from './components/todo-add'
import TodoList from './components/todo-list'
import TodoHeader from './components/todo-header'
import { TodoItem } from './components/todo-list-item'
import { GlobalProvider } from './context'

function App() {

  const [todoList, setTodoList] = useState<TodoItem[]>([])

  const handleAdd = (content: string) => {
    setTodoList([
      ...todoList,
      {
        id: Date.now().toString(),
        content,
      }
    ])
    console.log('当前列表：', todoList)
  }

  const handleRemove = (id: string) => {
    console.log('删除todo: ', id);
    const index = todoList.findIndex(it => it.id === id)
    const newList = [...todoList]
    newList.splice(index, 1)
    setTodoList(newList)
  }

  useEffect(() => {
    const json = localStorage.getItem('todoList') || '[]'
    try {
      // 防止localStorage里面是非法json
      setTodoList(JSON.parse(json))
    } catch (error) {
      setTodoList([])
    }
  }, [])

  useEffect(() => {
    if (todoList.length){ 
      console.log('todoList变化了', todoList);
      localStorage.setItem('todoList', JSON.stringify(todoList))
    }
  }, [todoList])

  return (
    <GlobalProvider value={{ todoList, handleAdd, handleRemove }}>
      <>
        <TodoHeader />
        <AddTodo />
        <TodoList setTodoList={setTodoList} />
      </>
    </GlobalProvider>
  )
}

export default App
