import { useRef, useState } from 'react'
import { type TodoItemType, genId } from '~/App'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
interface AddToDoProps {
  addToDos: (toDo: TodoItemType) => void
}
export default function AddToDo({ addToDos }: AddToDoProps) {
  const [content, setContent] = useState('')

  function handleAdd() {
    if (content) {
      addToDos({
        id: genId(),
        content,
        completed: false,
      })
      setContent('')
    }
  }
  return (
    <div className="flex w-full items-center space-x-2">
      <Input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        type="text"
        placeholder="输入文字后，点击右侧按钮添加 todo 事项"
      />
      <Button onClick={handleAdd} type="submit">
        添加
      </Button>
    </div>
  )
}
