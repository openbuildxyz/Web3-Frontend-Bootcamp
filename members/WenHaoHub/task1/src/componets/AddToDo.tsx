import { useCallback, useState } from 'react'
import { Todo } from '../App'
import './AddToDo.css'

function AddToDo({ addItem }: { addItem: React.Dispatch<React.SetStateAction<Todo[]>> }) {
  const [text, setText] = useState('')
  const [isSelect, setSelect] = useState(false);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }, [])

  const handleAdd =
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key !== 'Enter') return
      if (text.trim() === '') return //原生方法
      //写函数 表示前一次的state,
      addItem((prev) => {
        console.log('>>>prev', prev);
        return [...prev, { id: Date.now().toString(), text, completed: false }]
      })
      setText('')
    }



  const selectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    addItem((prev) => {
      const isAllCompleted = prev.every((todo) => todo.completed)
      if (e.target.checked === false && isAllCompleted) {
        setSelect(e.target.checked)
        return prev.map((todo) => ({ ...todo, completed: !isAllCompleted }))
      } else if (e.target.checked === false && !isAllCompleted) {
        return prev.map((todo) => ({ ...todo, completed: !isAllCompleted }))
      } else if (e.target.checked === true && isAllCompleted) {
        setSelect(e.target.checked)
        return prev.map((todo) => ({ ...todo, completed: true }))

      } else {
        setSelect(e.target.checked)
        return prev.map((todo) => ({ ...todo, completed: !isAllCompleted }))
      }
    })
  }

  return (
    <div className="todo rounded border-2 flex items-center">
      <label className="ml-4 mr-2">
        <input
          type="checkbox"
          checked={isSelect}
          onChange={selectAll}
        />
        {/* Dark mode */}
      </label>

      <input
        className="px-4 grow"
        placeholder="添加代办事项"
        type="text"
        value={text}
        onChange={handleChange}
        onKeyUp={handleAdd}
      />
    </div>
  )
}

export default AddToDo
