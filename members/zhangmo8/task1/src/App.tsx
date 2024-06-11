import { useState } from 'react'

import AddToDo from './components/AddToDo'
import Header from './components/Header'
import ToDoList from './components/ToDoList'

import { TodoItemType } from './types'

function App() {
  const [todoListAtom, setTodoListAtom] = useState<TodoItemType[]>( JSON.parse(localStorage.getItem('todoList') || '[]'))

  const onSetTodoList = (todoList: TodoItemType[]) => {
    setTodoListAtom(todoList)
    localStorage.setItem('todoList', JSON.stringify(todoList))
  }

  return (
    <main>
      <Header />
      <ToDoList todoList={todoListAtom} onSetList={onSetTodoList} />
      <AddToDo todoList={todoListAtom} onSetList={onSetTodoList} />
    </main>
  )
}

export default App
