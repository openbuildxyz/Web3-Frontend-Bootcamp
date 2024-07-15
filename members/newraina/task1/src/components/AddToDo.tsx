import { useCallback, useState } from 'react'

interface Props {
  addTodo: (text: string) => void
}

function AddToDo({ addTodo }: Props) {
  const [input, setInput] = useState('')

  const handleAddTodo = useCallback(() => {
    const trimmedInput = input.trim()
    if (trimmedInput === '') {
      return
    }
    addTodo(trimmedInput)
    setInput('')
  }, [input, addTodo])

  return (
    <div className="flex w-full items-center justify-between gap-2">
      <input
        type="text"
        value={input}
        className="w-full h-[24px]"
        placeholder="Add a new todo..."
        onKeyDown={(e) => e.key === 'Enter' && handleAddTodo()}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleAddTodo}>Add</button>
    </div>
  )
}

export default AddToDo
