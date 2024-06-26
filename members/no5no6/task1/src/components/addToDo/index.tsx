
import { Input, Button } from "antd"
import type { InputRef } from 'antd';
import { useState, useRef, useEffect } from "react"

import { ITodoItem } from "@/types"

interface IProps {
  onAddTask: (item: ITodoItem) => void
}

function AddToDo({onAddTask} : IProps ) {

  // input dom 对象
  const inputRef = useRef<InputRef>(null)

  // 待办事项初始数据
  const initTask = {
    id: 0,
    value: '',
    isComplete: false
  }

  // 待办事项对象
  const [task, setTask] = useState<ITodoItem>(initTask)

  // 输入框内容变化更新 task 内容
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleInputChange = (e: any) => {
    setTask( { ...task, id: new Date().getTime(), value: e.target.value} )
  }

  // 添加待办事项
  const handleAdd = () => {
    if (task.value.trim() !== '') {
      // 创建一个新任务对象，不直接修改原状态
      const newTask = {
        ...task,
        id: new Date().getTime(),
        value: task.value.trim()
      };

      // 更新 task 
      setTask({ id: 0, value: '', isComplete: false })

      // 调用 props 中的方法添加任务
      onAddTask(newTask)

      // 初始化待办事项
      clearTask()
    }
  }

  // 回车添加待办事项
  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAdd()
    }
  }

  // 清除待办事项
  const clearTask = () => {
    setTask(initTask)
  }

  // dom 加载完成后，自动聚焦输入框
  useEffect(() => {
    inputRef.current?.focus()
  }, [])


  return (
    <div className="flex">
      <Input ref={inputRef} className="mr-2" value={task.value} size="large" placeholder="请输入待办事项" onChange={ handleInputChange } onKeyUp={handleKeyUp} />
      <Button size="large" type="primary" onClick={handleAdd}>添加</Button>
    </div>
  )
}

export default AddToDo