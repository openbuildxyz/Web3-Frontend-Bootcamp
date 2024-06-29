import { cn } from '~/lib/utils'
import { Button } from '../ui/button'
import { Checkbox } from '../ui/checkbox'
import type { TodoItemType } from '@/App'

interface ToDoItemprops {
  toDo: TodoItemType
  removeToDos: (toDo: TodoItemType) => void
  toggleToDos: (toDo: TodoItemType) => void
}
export default function ToDoItem({
  toDo,
  removeToDos,
  toggleToDos,
}: ToDoItemprops) {
  return (
    <div
      className={cn(
        'flex justify-between border border-gray-200 rounded-md py-2 px-4 mt-2 items-center space-x-2',
        toDo.completed ? '!opacity-50' : '',
      )}
    >
      <div className="flex flex-row justify-start items-center gap-4">
        <Checkbox
          id={toDo.id}
          checked={toDo.completed}
          onCheckedChange={() => toggleToDos(toDo)}
        />
        <label
          htmlFor={toDo.id}
          className={cn(
            'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
            toDo.completed ? '!italic ' : '',
          )}
        >
          {toDo.content}
        </label>
      </div>
      {/* @ts-ignore */}
      <Button variant="outline" onClick={() => removeToDos(toDo)}>
        <span className={cn(toDo.completed ? '!italic ' : '')}>删除此项</span>
      </Button>
    </div>
  )
}
