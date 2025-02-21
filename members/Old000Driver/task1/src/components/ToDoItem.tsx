import React from 'react'
import { Todo } from '../App'

interface ToDoItemProps {
  todo: Todo
  onDelete: (id: number) => void
  onToggle: (id: number) => void
}

const ToDoItem: React.FC<ToDoItemProps> = ({ todo, onDelete, onToggle }) => {
  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-left">
        <button
          type="button"
          onClick={() => onToggle(todo.id)}
          className={`toggle-button ${todo.completed ? 'completed' : ''}`}
          aria-label={todo.completed ? '标记为未完成' : '标记为已完成'}
        />
        <span
          className={`todo-text ${todo.completed ? 'completed' : ''}`}
        >
          {todo.text}
        </span>
      </div>
      <button 
        onClick={() => onDelete(todo.id)}
        className="delete-button"
      >
        删除
      </button>
    </div>
  )
}

export default ToDoItem 