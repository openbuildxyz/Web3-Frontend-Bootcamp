import { TODO } from '@/app/utils/interface/page'
import { Button } from '@/components/ui/button'
import React from 'react'

export default function ToDoItem({
  todo,
  finish,
  del,
  index,
}: {
  todo: TODO
  finish: Function
  del: Function
  index: number
}) {
  return (
    <div className="flex m-2">
      <div className="bg-gray-200 flex items-center p-2 rounded-md">
        {todo.completed ? (
          <div className="mr-20 ml-20 font-semibold line-through">
            {todo.title}
          </div>
        ) : (
          <div className="mr-20 ml-20 font-semibold">{todo.title}</div>
        )}
      </div>
      <div className="ml-2">
        <Button onClick={() => finish(index)}>Finish</Button>
        <Button onClick={() => del(index)}>Delete</Button>
      </div>
    </div>
  )
}
