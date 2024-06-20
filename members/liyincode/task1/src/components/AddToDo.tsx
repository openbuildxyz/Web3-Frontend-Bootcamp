import { useContext, useId, useRef, useState } from 'react'
import { Input } from '@nextui-org/react'
import { TodosDispatchContext } from '../todosContext.tsx'

export function AddToDo() {
  const [inputValue, setInputValue] = useState('')
  const inputId = useId()
  const inputRef = useRef<HTMLInputElement>(null)
  const dispatch = useContext(TodosDispatchContext)

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (!inputRef.current) {
      return
    }

    const todo = inputRef.current.value.trim()
    if (todo && dispatch) {
      dispatch(
        {
          type: 'ADD_TODO',
          payload: {
            text: todo,
            completed: false,
            date: new Date(),
            id: Math.random().toString(36).substring(2, 9),
          },
        },
      )
      setInputValue('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex">
      <Input
        type="text"
        value={inputValue}
        id={inputId}
        ref={inputRef}
        placeholder="what do you need to do?"
        onChange={event => setInputValue(event.target.value)}
      />
    </form>
  )
}
