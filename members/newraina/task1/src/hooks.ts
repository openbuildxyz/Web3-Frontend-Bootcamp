import { useState } from 'react'

export interface TodoItem {
  id: number
  text: string
  status: 'done' | 'not-done'
}

export function useTodoListState() {
  const [todoList, setTodoList] = useLocalStorage<TodoItem[]>('todo-list', [])

  const addTodo = (text: string) => {
    setTodoList((prev) => [...prev, { text, id: Date.now(), status: 'not-done' }])
  }

  const removeTodo = (id: number) => {
    setTodoList((prev) => prev.filter((todo) => todo.id !== id))
  }

  const toggleTodo = (id: number) => {
    const todo = todoList.find((todo) => todo.id === id)
    if (todo) {
      const newTodo: TodoItem = { ...todo, status: todo.status === 'done' ? 'not-done' : 'done' }
      setTodoList((prev) => prev.map((todo) => todo.id === id ? newTodo : todo))
    }
  }

  return { todos: todoList, addTodo, removeTodo, toggleTodo }
}

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const item = window.localStorage.getItem(key)
    return item ? JSON.parse(item) : initialValue
  })

  const setStoredValue = (newValue: T | ((prev: T) => T)) => {
    setValue((prev) => {
      const valueToStore = newValue instanceof Function ? newValue(prev) : newValue
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
      return valueToStore
    })
  }

  return [value, setStoredValue] as const
}
