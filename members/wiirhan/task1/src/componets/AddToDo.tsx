import { useCallback, useState } from 'react'
import { Todo } from '../App'
import './AddToDo.css'

function AddToDo({ addItem }: { addItem: React.Dispatch<React.SetStateAction<Todo[]>> }) {
  const [text, setText] = useState('')

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }, [])

  const handleAdd = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key !== 'Enter') return
      if (text.trim() === '') return
      addItem((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          text: text,
          completed: false,
        },
      ])
      setText('')
    },
    [text],
  )

  const toggleAll = useCallback(() => {
    addItem((prev) => {
      const isAllCompleted = prev.every((todo) => todo.completed)
      return prev.map((todo) => ({ ...todo, completed: !isAllCompleted }))
    })
  }, [])

  return (
    <div className="todo rounded border-2">
      <input
        id="toggle-all"
        className="toggle-all"
        type="checkbox"
        onChange={toggleAll}
      />
      <label htmlFor="toggle-all"></label>
      <input
        className="px-4 grow"
        placeholder="What needs to be done?"
        type="text"
        value={text}
        onChange={handleChange}
        onKeyUp={handleAdd}
      />
    </div>
  )
}

export default AddToDo
