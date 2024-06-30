import { ChangeEvent, Dispatch, FC, SetStateAction } from "react";
import { Todo } from "../ToDoList";



const ToDoItem: FC<{ item: Todo, onSetTodo: Dispatch<SetStateAction<Todo[]>> }> = ({ item, onSetTodo }) => {

  const handleDeleteTodo = (createAt: string) => {
    onSetTodo((pre: Todo[]) => pre.filter(todo => todo.createAt !== createAt))
  }

  const handleTodoCheck = (event: ChangeEvent<HTMLInputElement>, createAt: string) => {
    onSetTodo((pre: Todo[]) => pre.map(todo => todo.createAt === createAt ? { ...todo, complete: event.target.checked } : todo)
    )
  }

  return <li className="leading-10 flex justify-between">
    <label className="has-[:checked]:line-through" >
      <input type="checkbox" className="mr-2 w-3.5 h-3.5" checked={item.complete} onChange={(e) => handleTodoCheck(e, item.createAt)} />
      {item.content}
    </label>
    <button className="text-red-600" onClick={() => handleDeleteTodo(item.createAt)}>X</button>
  </li>
}


export { ToDoItem }
