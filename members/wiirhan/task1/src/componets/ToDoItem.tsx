import { clsx } from 'clsx'
import { Todo } from '../App'

type ToDoItemProps = {
  todo: Todo
  onToggle: (id: string) => void
  removeItem: (id: string) => void
}

function ToDoItem({ todo, onToggle, removeItem }: ToDoItemProps) {
  return (
    <div className="todo text-2xl items-center border-b-2 todo-item">
      <input
        className="w-[45px] h-[20px]"
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <span className={clsx('grow text-left px-4', todo.completed && 'completed')}>{todo.text}</span>
      <button
        className="destroy mr-5"
        onClick={() => removeItem(todo.id)}
      ></button>
    </div>
  )
}

export default ToDoItem
