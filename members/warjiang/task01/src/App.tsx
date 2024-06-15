import { useState } from 'react'
import './App.css'
import { ToDoList, AddToDo, ItemStatus } from './components/todo/index'
import type { TodoItemInfo, } from './components/todo/index'

const TODO_KEY = 'todos'

function App() {
  const [todos, setTodos] = useState<TodoItemInfo[]>(() => {
    let ret = [] as TodoItemInfo[]
    try {
      ret = JSON.parse(localStorage.getItem(TODO_KEY) || '[]')
    } catch (e) {
      ret = [] as TodoItemInfo[]
    }
    return ret
  })

  return (
    <>
      <ToDoList
        todos={todos}
        onToggle={(idx) => {
          const clonedTodos = [...todos]
          const todoItem = todos[idx]
          todoItem.status = todoItem.status === ItemStatus.Created ? ItemStatus.Finished : ItemStatus.Created
          clonedTodos[idx] = {
            ...todoItem
          }
          setTodos(clonedTodos)
        }}
        onDelete={(idx) => {
          const clonedTodos = [...todos]
          clonedTodos.splice(idx, 1)
          setTodos(clonedTodos)
        }}
      />
      <AddToDo
        onSubmit={(todo) => {
          setTodos([
            ...todos,
            {
              title: todo,
              status: ItemStatus.Created
            }
          ])
        }}
      />
      <button
        style={{
          width: '100%',
          marginTop: 6,
          cursor: 'pointer'
        }}
        onClick={() => {
          localStorage.setItem(TODO_KEY, JSON.stringify(todos))
        }}
      >
        保存
      </button>
    </>
  )
}

export default App
