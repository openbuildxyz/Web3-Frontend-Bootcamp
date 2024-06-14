import { Button, Checkbox } from '@nextui-org/react'
import { useContext } from 'react'
import type { ToDo } from '../types.ts'
import { TodosDispatchContext } from '../todosContext.tsx'

interface ToDoItemProps {
  todo: ToDo
}

export function ToDoItem({ todo }: ToDoItemProps) {
  const dispatch = useContext(TodosDispatchContext)

  function handleComplete(id: string) {
    if (dispatch) {
      dispatch({
        type: 'TOGGLE_TODO',
        payload: {
          id,
        },
      })
    }
  }

  function handleRemove(id: string) {
    if (dispatch) {
      dispatch({
        type: 'REMOVE_TODO',
        payload: {
          id,
        },
      })
    }
  }

  return (
    <div className="flex justify-between">
      <Checkbox
        key={todo.id}
        defaultSelected={todo.completed}
        lineThrough={todo.completed}
        onChange={() => handleComplete(todo.id)}
      >
        {todo.text}
      </Checkbox>
      <div className="flex gap-1">
        <Button
          color="danger"
          variant="light"
          size="sm"
          onClick={() => handleRemove(todo.id)}
        >
          Remove
        </Button>
        <p className="flex items-center">
          {new Date(todo.date).toLocaleString()}
        </p>
      </div>
    </div>
  )
}
