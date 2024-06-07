import type { PropsWithChildren } from 'react'
import type { Task } from './typing'
import ToDoItem from './ToDoItem'

type ToDoListProps = PropsWithChildren<{
  readonly dataSource: Task[];
  readonly onMark: (task: Task) => void;
  readonly onRemove: (task: Task) => void;
}>

function ToDoList(props: ToDoListProps) {
  const { dataSource, onMark, onRemove } = props
  const count = dataSource.length
  const notEmpty = count > 0
  const classNames = ['ToDoList']

  if (!notEmpty) {
    classNames.push('is-empty')
  }

  return (
    <div className={classNames.join(' ')}>
      {notEmpty ? (
        <>
          <ul className="ToDoList-body">
            {dataSource.map(task => (
              <ToDoItem key={task.id} task={task} onMark={onMark} onRemove={onRemove} />
            ))}
          </ul>
          <p className="ToDoList-footer">共 {count} 个待办</p>
        </>
      ) : (
        <p className="ToDoList-empty">暂无数据</p>
      )}
    </div>
  )
}

export default ToDoList
