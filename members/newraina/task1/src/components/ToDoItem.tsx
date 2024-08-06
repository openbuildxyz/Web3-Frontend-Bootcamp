import { TodoItem } from '../hooks'

interface Props {
  todo: TodoItem
  removeTodo: (id: number) => void
  toggleTodo: (id: number) => void
}

function ToDoItem({ todo, removeTodo, toggleTodo }: Props) {
  return (
    <>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={todo.status === 'done'}
          onChange={() => toggleTodo(todo.id)}
        />
        <span
          className={
            todo.status === 'done'
              ? 'line-through text-gray-500 text-ellipsis max-w-[140px]'
              : 'text-ellipsis max-w-[140px]'
          }
        >
          {todo.text}
        </span>
      </div>
      <button onClick={() => removeTodo(todo.id)}>Remove</button>
    </>
  )
}

export default ToDoItem
