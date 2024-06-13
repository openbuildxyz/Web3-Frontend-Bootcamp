import { clsx } from 'clsx'
import { useContext } from 'react'
import type { TodoItem as ITodoItem } from './context'
import { Context } from './context'
import { CheckIcon } from './check-icon'
import { CloseIcon } from './close-icon'

interface Props {
  readonly item: ITodoItem
}

export function TodoItem({ item }: Props) {
  const { setTodoList } = useContext(Context)

  const onToggle = (id: number) => {
    setTodoList(state => state.map(item => {
      if (item.id === id) {
        return {
          ...item,
          isDone: !item.isDone,
        }
      }
      return item
    }))
  }

  const onDelete = (e: React.MouseEvent, id: number) => {
    e.stopPropagation()
    setTodoList(state => state.filter(item => item.id !== id))
  }

  return (
    <div className='flex items-center cursor-pointer hover:bg-slate-900 p-4' key={item.id} onClick={() => onToggle(item.id)}>
      <div className='flex flex-1 items-center gap-x-4'>
        <div className={clsx('flex items-center justify-center size-6 text-transparent rounded-full border-2 border-gray-500', {
          'bg-green-500 border-green-500': item.isDone,
        })}
        >
          {item.isDone ? <CheckIcon className='size-4 text-white' /> : null}
        </div>
        <div className={clsx({
          'line-through text-gray-500': item.isDone,
        })}
        >
          {item.text}
        </div>
      </div>
      <CloseIcon className='size-4 text-red-600' onClick={e => onDelete(e, item.id)} />
    </div>
  )
}
