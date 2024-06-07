import type { PropsWithChildren } from 'react'
import { useState } from 'react'

type AddToDoProps = PropsWithChildren<{
  readonly onSubmit: (text: string) => void;
}>

function AddToDo(props: AddToDoProps) {
  const [text, setText] = useState('')

  const handleClick = () => {
    const trimmed = text.trim()

    if (trimmed === '') {
      return alert('待办不能为空')
    }

    props.onSubmit(trimmed)
    setText('')
  }

  return (
    <div className="AddToDo">
      <input value={text} onInput={e => setText(e.target.value)} />
      <button onClick={handleClick}>添加</button>
    </div>
  )
}

export default AddToDo
