import { useState, useEffect } from 'react'
import AddToDo from './addTodo'
import TodoList from './todoList'

interface TodoItem {
  value: string
  status: number
}

function Todo() {
  const [todoList, setTodoList] = useState<TodoItem[]>([])
  const [isInitialLoad, setIsInitialLoad] = useState(true)

  const addTodo = (todo: string) => {
    const newTodo: TodoItem = {
      value: todo,
      status: 1,
    }
    setTodoList((prevTodoList) => [...prevTodoList, newTodo])
  }

  const checkTodo = (index: number) => {
    setTodoList((prevTodoList) =>
      prevTodoList.map((mapItem, mapIndex) =>
        index === mapIndex ? { ...mapItem, status: 2 } : mapItem
      )
    )
  }

  const removeTodo = (index: number) => {
    setTodoList((prevTodoList) =>
      prevTodoList.filter((_, filterIndex) => filterIndex !== index)
    )
  }

  // 依赖源是 [isInitialLoad]
  useEffect(() => {
    if (!isInitialLoad) {
      return
    }
    const storagedList = localStorage.getItem('todoList')
    if (storagedList?.length) {
      setTodoList(JSON.parse(storagedList))
    }
    setIsInitialLoad(false)
  }, [isInitialLoad])

  // 依赖源是 [todoList, isInitialLoad]
  useEffect(() => {
    if (isInitialLoad) {
      return
    }
    localStorage.setItem('todoList', JSON.stringify(todoList))
  }, [todoList, isInitialLoad])

  return (
    <div className="App">
      <AddToDo addTodo={addTodo} />
      <TodoList
        todoList={todoList}
        checkTodo={checkTodo}
        removeTodo={removeTodo}
      />
    </div>
  )
}

export default Todo
