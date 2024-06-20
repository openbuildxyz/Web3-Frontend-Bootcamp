import { TodoItem } from '../App'
import { ToDoItem } from './ToDoItem'

type ToDoListProps = {
  list: TodoItem[]
  deleteItem: (id: number) => void
  toggleDone: (id: number) => void
}

export function ToDoList({ list, deleteItem, toggleDone }: ToDoListProps) {
  return (
    <div>
      {list.map(item => {
        return <ToDoItem key={item.id} item={item} deleteItem={deleteItem} toggleDone={toggleDone} />
      })}
    </div>
  )
}
