import { Divider } from '@nextui-org/react'
import { useContext, useMemo } from 'react'
import type { ToDo } from '../types'
import { TodosContext } from '../todosContext.tsx'
import { ToDoItem } from './ToDoItem.tsx'

interface ToDoListProps {
  className?: string
}

export function ToDoList({ className }: ToDoListProps) {
  const todos = useContext(TodosContext)
  const { completedTodos, uncompletedTodos } = useMemo(
    () => {
      if (!todos) {
        return {
          completedTodos: [],
          uncompletedTodos: [],
        }
      }

      const completedTodos = todos.filter(todo => todo.completed)
      const uncompletedTodos = todos.filter(todo => !todo.completed)

      return {
        completedTodos,
        uncompletedTodos,
      }
    },
    [todos],
  )

  function renderSection(title: string, todos: ToDo[]) {
    return (
      <>
        <h2>
          <span className="text-base text-gray-900 mr-2">
            {title}
          </span>
          <span className="text-gray-600 text-sm mr-1">
            {todos.length}
          </span>
          <span className="text-gray-600 text-sm">
            items
          </span>
        </h2>
        <Divider className="mb-2 mt-3" />
        {todos.map(todo => (
          <ToDoItem
            key={todo.id}
            todo={todo}
          />
        ))}
      </>
    )
  }

  return (
    <div className={className}>
      {renderSection('ToDo', uncompletedTodos)}
      <div className="my-2"></div>
      {renderSection('Completed', completedTodos)}
    </div>
  )
}
