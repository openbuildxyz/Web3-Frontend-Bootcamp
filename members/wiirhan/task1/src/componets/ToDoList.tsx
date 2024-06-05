import { useCallback, useEffect, useState } from 'react'
import { Todo } from '../App'
import ToDoItem from './ToDoItem'

function ToDoList({ data, updateData }: { data: Todo[]; updateData: React.Dispatch<React.SetStateAction<Todo[]>> }) {
  const [showData, setShowData] = useState(data)
  const [currentType, setCurrentType] = useState<'all' | 'active' | 'completed'>('all')

  const onToggle = useCallback((id: string) => {
    updateData((prev) => prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }, [])

  const onClearCompleted = useCallback(() => {
    updateData((prev) => prev.filter((todo) => !todo.completed))
  }, [])

  const onFilter = useCallback((type: 'all' | 'active' | 'completed') => {
    setCurrentType(type)
  }, [])

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
    <div className="flex flex-col">
      <ul>
        {showData.map((todo) => (
          <ToDoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggle}
          />
        ))}
      </ul>
      <footer className="flex justify-between">
        <span>{data.filter((todo) => !todo.completed).length} items left</span>
        <div>
          <button onClick={() => onFilter('all')}>All</button>
          <button onClick={() => onFilter('active')}>Active</button>
          <button onClick={() => onFilter('completed')}>Completed</button>
        </div>
        {data.some((todo) => todo.completed) && <button onClick={onClearCompleted}>Clear completed</button>}
      </footer>
    </div>
  )
}

export default ToDoList
