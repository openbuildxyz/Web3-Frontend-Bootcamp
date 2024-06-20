import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header'
import AddToDo from './components/AddToDo'
import ToDoItem from './components/ToDoItem';

interface Todo {
  id: number;
  text: string;
  complete: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
      const getSaveTodos = localStorage.getItem("todos")
      //JSON.parse(savedTodos) 将 savedTodos 从 JSON 字符串转换为对象或数组。
      // as Todo[] 是 TypeScript 的类型断言，表示解析后的结果应被视为 Todo[] 类型（一个 Todo 对象的数组）。
      return getSaveTodos ? JSON.parse(getSaveTodos) as Todo[] : []
    }
  )



  const [currentId, setCurrentId] = useState<number>(() => {
     const getSaveId = localStorage.getItem("currentId")
     return getSaveId ? JSON.parse(getSaveId) as number : 1
  })

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  useEffect(() => {
    localStorage.setItem("currentId", JSON.stringify(currentId))
  }, [currentId])

  const addToDo = (text: string): void => {
    const newTodo: Todo = {
      id: currentId,
      text,
      complete: false
    }
    // console.log(newTodo)
    // console.log(currentId)
    // console.log(localStorage.getItem("todos"))
    
    setTodos([...todos, newTodo])
    setCurrentId( currentId + 1)
  }

  // const item = (): Todo[] => {

  // }

  return (
    <div>
      <Header />
      <AddToDo addToDo={addToDo}/>
      <ToDoItem list={todos} setList={setTodos}></ToDoItem>
    </div>
  )
}

export default App
