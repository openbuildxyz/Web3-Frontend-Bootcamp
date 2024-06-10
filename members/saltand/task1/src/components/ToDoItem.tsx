import { TodoItem } from '../App'

type ToDoItemProps = {
  item: TodoItem
  deleteItem: (id: number) => void
  toggleDone: (id: number) => void
}

export function ToDoItem({ item, deleteItem, toggleDone }: ToDoItemProps) {
  return (
    <div key={item.id} className='flex mb-4'>
      <span className='cursor-pointer mr-2' onClick={() => toggleDone(item.id)}>{item.done ? '✅' : '⬜️'}</span>
      <span className='flex-1'>{item.title}</span>
      <span className='cursor-pointer self-end' onClick={() => deleteItem(item.id)}>🗑</span>
    </div>
  )
}
