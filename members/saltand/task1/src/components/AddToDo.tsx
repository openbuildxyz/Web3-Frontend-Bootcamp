import { useState } from 'react'

type AddToDoProps = {
  addTodo: (title: string) => void
}

export function AddToDo({ addTodo }: AddToDoProps) {
  const [title, setTitle] = useState('')
  return (
    <form
      onSubmit={e => {
        e.preventDefault()
      }}>
      <input
      className='border border-gray-300 rounded p-1 mr-2 w-60'
        type="text"
        value={title}
        onChange={e => {
          setTitle(e.target.value)
        }}
      />
      <button
      className='border border-gray-300 rounded p-1'
        onClick={() => {
          if (title) {
            addTodo(title)
            setTitle('')
          }
        }}>
        Add
      </button>
    </form>
  )
}
