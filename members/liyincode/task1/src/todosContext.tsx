import {createContext, useEffect, useReducer} from 'react'
import type { Action, ToDo } from './types.ts'

type Dispatch = (action: Action) => void

export const TodosContext = createContext<ToDo[] | null>(null)
export const TodosDispatchContext = createContext<Dispatch | null>(null)

export function TodosProvider({ children }: { children: React.ReactNode }) {
  const [todos, dispatch] = useReducer(
    todosReducer,
    [],
    (initial: ToDo[]) => {
      const saved = localStorage.getItem('todos')
      if (saved) {
        return JSON.parse(saved) as ToDo[]
      }

      return initial
    },
  )

  useEffect(
    () => localStorage.setItem('todos', JSON.stringify(todos)),
    [todos],
  )

  return (
    <TodosContext.Provider value={todos}>
      <TodosDispatchContext.Provider value={dispatch}>
        {children}
      </TodosDispatchContext.Provider>
    </TodosContext.Provider>
  )
}

function todosReducer(todos: ToDo[] = [], action: Action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...todos,
         action.payload,
      ]
    case 'TOGGLE_TODO':
      return todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return {
            ...todo,
            completed: !todo.completed,
          }
        }
        return todo
      })
    case 'REMOVE_TODO':
      return todos.filter(todo => todo.id !== action.payload.id)
    default:
      return todos
  }
}
