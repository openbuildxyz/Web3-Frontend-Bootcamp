import { useState } from 'react'

interface TodoItem {
  content: string;
  completed: boolean;
}

const AddToDo = ({
  addTask,
}: {
  addTask: (task: TodoItem) => void
}) => {
  const [content, setContent] = useState<string>('')
  
  const handleAdd = () => {
    if (content.trim()) { // 检查输入内容不为空
      addTask({content: content.trim(), completed: false})
      setContent('') // 清空输入框
    }
  }
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAdd()
    }
  }
  
  return (
    <div>
      <input 
        type="text" 
        value={content} 
        onChange={(e) => setContent(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="请输入任务内容"
      />
      <button onClick={handleAdd} style={{margin: '0 10px',height: '30px',width: '60px',fontSize: '12px'}}>添加</button>
    </div>
  )
}

export default AddToDo;