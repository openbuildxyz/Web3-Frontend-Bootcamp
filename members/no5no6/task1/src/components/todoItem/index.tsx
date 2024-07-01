
import { Checkbox } from 'antd'
import { useState } from 'react'
import { ITodoItem } from '@/types'

import { DeleteOutlined } from '@ant-design/icons'

interface IProps {
  item: ITodoItem
  onUpdateTask: (item: ITodoItem) => void
  onDeleteTask: (id: number) => void
}

function TodoItem({ item, onUpdateTask, onDeleteTask }: IProps) {
  // 待办事项数据
  const { id, value, isComplete } = item

  // 待办事项状态
  const [status, setStatus] = useState(isComplete)

  // 鼠标浮动状态
  const [hover, setHover] = useState(false)

  // 更新待办事项
  const updateStatus = () => {
    setStatus(!status)
    onUpdateTask({id, value, isComplete: !status})
  }
  
  // 删除待办事项
  const deleteTask = () => {
    onDeleteTask(id)
  }

  // 鼠标 浮动/离开 事件
  const onMouseEvent = () => {
    setHover(!hover)
  }

  return (
    <div className={`flex flex-justify-between flex-items-center font-size-4 line-height-12 p-4 cursor-pointer ${hover ? 'bg-blue bg-op-20' : ''}`} onMouseEnter={onMouseEvent} onMouseLeave={onMouseEvent}>
      <span>
        <Checkbox checked={status} onChange={ updateStatus }></Checkbox>
        <span className={`ml-2 ${ status ? 'line-through' : ''}`}>{ value }</span>
      </span>
      {
        hover && (
          <span>
            <DeleteOutlined onClick={ deleteTask }/>
          </span>
        )
      }
    </div>
  )
}

export default TodoItem