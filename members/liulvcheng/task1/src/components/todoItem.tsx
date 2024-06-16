import '../styles/todo.css'

interface TodoItemProps {
  index: number,
  item: { value: string; status: number }
  checkTodo: (index: number) => void
  removeTodo: (index: number) => void
}

function todoListTwo({ index, item, checkTodo, removeTodo }: TodoItemProps) {
  return (
    <div>
      <li key={index}>
        <div
          className={`${item.status === 2 ? 'completed' : ''} del-todo flex`}
        >
          <input
            type="checkbox"
            checked={item.status === 2}
            onChange={() => checkTodo(index)}
          />
          <div>{item.value}</div>
          <button
            className='del-btn flex'
            onClick={() => removeTodo(index)}
            disabled={item.status === 2}
          >
            Delete
          </button>
        </div>
      </li>
    </div>
  )
}

export default todoListTwo
