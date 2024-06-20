import { useContext, useState } from 'react'
import { Context } from './context'

export function AddTodo() {
  const { setTodoList } = useContext(Context)
  const [inputValue, setInputValue] = useState<string>()

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const onAdd = () => {
    if (!inputValue) {
      return
    }
    setTodoList(state => [
      ...state,
      {
        id: Date.now(),
        text: inputValue,
        isDone: false,
      },
    ])
    setInputValue('')
  }

  return <div className="flex items-center mt-4 gap-x-2">
    <div className="flex-1 p-2 bg-slate-800 rounded-md shadow-md">
      <input
        className="rounded-lg w-full bg-transparent outline-none h-6"
        onChange={onInputChange}
        placeholder='Add Todo'
        type='text'
        value={inputValue}
      />
    </div>
    <button
      className='bg-slate-800 rounded-md p-2 shadow-md disabled:text-slate-600 transition'
      disabled={!inputValue}
      onClick={onAdd}
      type='button'
    >
      Add
    </button>
  </div>
}
