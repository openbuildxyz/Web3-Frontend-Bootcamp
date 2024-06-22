import {  useState, useRef, useEffect } from 'react'
import './App.css'
import AddTodo from './components/todo-add'
import TodoList from './components/todo-list'
import TodoHeader from './components/todo-header'
import { TodoItem } from './components/todo-list-item'
import { GlobalProvider } from './context'

function App() {

  const [todoList, setTodoList] = useState<TodoItem[]>([])
  const lastTodoList = useRef(todoList);

  const handleAdd = (content: string) => {
    setTodoList([
      ...todoList,
      {
        id: Date.now().toString(),
        content,
      }
    ])
  }

  const handleRemove = (id: string) => {
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
    if (JSON.stringify(todoList) !== JSON.stringify(lastTodoList.current)){ 
      lastTodoList.current = todoList
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
