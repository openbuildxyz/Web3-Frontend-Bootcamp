import React from 'react'
import { ToDo } from './todo';


interface ToDoItemProps {
  todo: ToDo;
  deleteToDo: (key: number) => void;
  handleIsDone: (index: number) => void;
}

const ToDoItem: React.FC<ToDoItemProps> = ({ todo, deleteToDo, handleIsDone }) => {
  const { isDone } = todo;
  return (
    <div className='flex justify-center'>
      <div
        className={isDone ? 'line-through mr-4' : 'mr-4'}
        onClick={() => {
          handleIsDone(todo.key)
        }}>
        {todo.key}: {todo.content}
      </div>
      <button
        onClick={() => {
          deleteToDo(todo.key)
        }}
      >x</button>
    </div>
  )
}

export default ToDoItem