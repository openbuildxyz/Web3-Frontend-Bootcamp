import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

interface Props {
  addTodo: (todo: ITodoItem) => void
}

export default function AddToDo(props: Props) {
  const [todoText, setTodoText] = useState("")

  const handleAddTodo = () => {
    props.addTodo({
      id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
      title: todoText,
      completed: false
    })
    setTodoText("")
  }

  return (
    <>
      <div className="flex items-center w-full gap-x-2">
        <Input value={todoText} onChange={(e) => setTodoText(e.target.value)} placeholder="What do you need to do?" />
        <Button
          disabled={!todoText.trim()}
          onClick={handleAddTodo}
        >
          Add
        </Button>
      </div>
    </>
  )
}
