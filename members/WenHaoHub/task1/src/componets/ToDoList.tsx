import { clsx } from 'clsx'
import { useEffect, useState } from 'react'
import { Todo } from '../App'
import ToDoItem from './ToDoItem'

function ToDoList({ data, updateData }: { data: Todo[]; updateData: React.Dispatch<React.SetStateAction<Todo[]>> }) {
  const [showData, setShowData] = useState(data)
  const [currentType, setCurrentType] = useState<'all' | 'active' | 'completed'>('all')

  const onToggle = (id: string) => {
    updateData((prev) => prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  const onClearCompleted = () => {
    updateData((prev) => prev.filter((todo) => !todo.completed))
  }

  const onFilter = (type: 'all' | 'active' | 'completed') => {
    setCurrentType(type)
  }

  const removeItem = (id: string) => {
    updateData((prev) => prev.filter((todo) => todo.id !== id))
  }
  useEffect(() => {
    setShowData(
      data.filter((todo) => {
        if (currentType === 'all') return true
        if (currentType === 'active') return !todo.completed
        if (currentType === 'completed') return todo.completed
        return false
      }),
    )
  }, [currentType, data])

  return (
    <div className="flex flex-col rounded border-2">
      <ul>
        {showData.map((todo) => (
          <ToDoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggle}
            removeItem={removeItem}
          />
        ))}
      </ul>
      <footer className="flex items-center p-2 justify-between">
        <div className="space-x-2  w-[300px]">
          <button
            className={clsx('button', currentType === 'all' ? 'selected' : '')}
            onClick={() => onFilter('all')}
          >
            所有任务
          </button>
          <button
            className={clsx('button', currentType === 'active' ? 'selected' : '')}
            onClick={() => onFilter('active')}
          >
            待完成
          </button>
          <button
            className={clsx('button', currentType === 'completed' ? 'selected' : '')}
            onClick={() => onFilter('completed')}
          >
            已完成
          </button>
        </div>
        <span className="w-[100px]">{data.filter((todo) => !todo.completed).length} 条待完成</span>

        {/* <div className="w-[150px]">
          {data.some((todo) => todo.completed) && (
            <button
              className="pl-2 button"
              onClick={onClearCompleted}
            >
              全部清除
            </button>
          )}
        </div> */}
      </footer>
    </div>
  )
}

export default ToDoList
