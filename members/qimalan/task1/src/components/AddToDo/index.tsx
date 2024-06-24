import { Dispatch, FC, FormEventHandler, useRef } from "react"
import { Todo } from "../ToDoList"

const AddToDo: FC<{ onAddTodo: Dispatch<React.SetStateAction<Todo[]>> }> = ({ onAddTodo }) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleAddTodo: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()

    if (inputRef.current) {
      const todo: Todo = {
        createAt: new Date().toTimeString(),
        complete: false,
        content: inputRef.current.value.trim()
      }
      onAddTodo((pre) => [...pre, todo])
      inputRef.current.value = ''
    }
  }

  return <form onSubmit={handleAddTodo}>
    <input type="text" placeholder="add to do..." className="p-1 rounded mr-2" name="todo" ref={inputRef} />
    <button className="bg-green-200 px-2 py-1 rounded" type="submit">Add</button>
  </form>
}

export { AddToDo }
