import { TodoItem } from '../hooks'
import ToDoItem from './ToDoItem'

interface Props {
  todoList: TodoItem[]
  removeTodo: (id: number) => void
  toggleTodo: (id: number) => void
}

function ToDoList({ todoList, removeTodo, toggleTodo }: Props) {
  return (
    <ul className="mt-4">
      {todoList.map((todo) => (
        <li key={todo.id} className="flex items-center justify-between mt-1">
          <ToDoItem todo={todo} removeTodo={removeTodo} toggleTodo={toggleTodo} />
        </li>
      ))}
    </ul>
  )
}

export default ToDoList
