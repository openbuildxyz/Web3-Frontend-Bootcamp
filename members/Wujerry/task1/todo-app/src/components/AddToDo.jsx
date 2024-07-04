import { useState } from 'react'

export default function AddToDo({ onAddTodo }) {
  const [value, setValue] = useState('')
  const handleAddTodo = (text) => {
    if (text) {
      onAddTodo(text)
      setValue('')
    }
  }
  return (
    <div className='add-todo'>
      <input
        type='text'
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleAddTodo(value)
          }
        }}
        value={value}
        placeholder='type to add todo ...'
        className='px-5 py-2 border border-gray-300 rounded-md w-80'
      />
      <button
        onClick={() => handleAddTodo(value)}
        className='ml-5 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 me-2 '
      >
        Add
      </button>
    </div>
  )
}
