import { useCallback } from 'react'
import AddToDo from './components/AddToDo'
import Header from './components/Header'
import ToDoList from './components/ToDoList'
import { useTodoListState } from './hooks'

function App() {
  const todoListState = useTodoListState()

  const addTodo = useCallback(
    (text: string) => {
      if (text === '') {
        return
      }
      todoListState.addTodo(text)
    },
    [todoListState],
  )

  const removeTodo = useCallback(
    (id: number) => {
      todoListState.removeTodo(id)
    },
    [todoListState],
  )

  const toggleTodo = useCallback(
    (id: number) => {
      todoListState.toggleTodo(id)
    },
    [todoListState],
  )

  return (
    <>
      <Header />

      <div className="gap-4 w-full">
        <AddToDo addTodo={addTodo} />

        <ToDoList todoList={todoListState.todos} removeTodo={removeTodo} toggleTodo={toggleTodo} />
      </div>
    </>
  )
}

export default App
