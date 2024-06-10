import type { PropsWithChildren } from 'react'
import type { Task } from './typing'

type ToDoItemProps = PropsWithChildren<{
  readonly task: Task;
  readonly onMark: (task: Task) => void;
  readonly onRemove: (task: Task) => void;
}>

function ToDoItem(props: ToDoItemProps) {
  const { task, onMark, onRemove } = props

  const handleClick = e => {
    if (confirm(`确定要删除「${task.text}」`)) {
      onRemove(task)
    }

    e.stopPropagation()
  }

  const classNames = ['ToDoItem']

  if (task.done) {
    classNames.push('is-done')
  }

  return (
    <li className={classNames.join(' ')} onClick={() => onMark(task)}>
      <span className="ToDoItem-text">{task.text}</span>
      <button className="ToDoItem-button" onClick={handleClick}>删除</button>
    </li>
  )
}

export default ToDoItem
