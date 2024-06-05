import ToDoItem from './ToDoItem'
import type { TodoItemType } from '~/App'

interface ToDoListProps {
  toDos: TodoItemType[]
  removeToDos: (toDo: TodoItemType) => void
  toggleToDos: (toDo: TodoItemType) => void
}
export default function ToDoList({
  toDos,
  removeToDos,
  toggleToDos,
}: ToDoListProps) {
  return (
    <div>
      {toDos.map((toDo, index) => {
        return (
          <ToDoItem
            removeToDos={removeToDos}
            toggleToDos={toggleToDos}
            key={index}
            toDo={toDo}
          />
        )
      })}
    </div>
  )
}
