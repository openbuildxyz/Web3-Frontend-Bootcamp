import { Todo } from '../App'

type ToDoItemProps = {
  todo: Todo
  onToggle: (id: string) => void
}

function ToDoItem({ todo, onToggle }: ToDoItemProps) {
  return (
    <div>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <span>{todo.text}</span>
    </div>
  )
}

export default ToDoItem
