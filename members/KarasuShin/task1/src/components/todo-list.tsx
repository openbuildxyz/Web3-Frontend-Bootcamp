import { useContext } from 'react'
import { Context } from '../components/context'
import { TodoItem } from './todo-item'

export function TodoList() {
  const { todoList } = useContext(Context)

  return (
    <div className='max-h-full rounded-md overflow-hidden mt-4'>
      <div className='p-4 bg-slate-800 h-full overflow-y-auto'>
        {todoList.map(item => <TodoItem item={item} key={item.id} />)}
      </div>
    </div>
  )
}
