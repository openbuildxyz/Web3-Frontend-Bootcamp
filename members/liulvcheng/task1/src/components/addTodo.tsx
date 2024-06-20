import { useRef } from 'react'
import '../styles/todo.css'

interface AddTodoProps {
  addTodo: (todo: string) => void
}

function AddToDo({ addTodo }: AddTodoProps) {
  const inputRef = useRef(null)

  const handleClick = () => {
    const value = inputRef.current?.value || ''
    if (value) {
      addTodo(value.trim())
      if (inputRef.current) {
        inputRef.current.value = ''
      }
    }
  }

  return (
    <div className="add-todo flex">
      <input
        ref={inputRef}
        type="text"
        minLength={1}
        maxLength={10}
        placeholder="Please input"
      />
      <button onClick={handleClick}>Add</button>
    </div>
  )
}

export default AddToDo
