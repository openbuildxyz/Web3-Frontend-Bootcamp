import { createContext } from 'react'

export interface TodoItem {
  id: number
  text: string
  isDone: boolean
}

export const Context = createContext<{
  todoList: TodoItem[]
  setTodoList: React.Dispatch<React.SetStateAction<TodoItem[]>>
}>({
  todoList: [],
  setTodoList: () => {
    // noop
  },
})
