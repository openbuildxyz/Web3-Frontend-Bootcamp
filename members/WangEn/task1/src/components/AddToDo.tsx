import React, { useState } from "react"

interface newProps {
  onAdd: (text: string) => void
}


const AddTodo: React.FC<newProps> = ({ onAdd }) => {
  const [ newTodo, setNewTodo ] = useState('')

  const addTodo = () => {
    if(newTodo.trim()) {
      onAdd(newTodo)
      setNewTodo('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter') {
      addTodo()
    }
  }
  
  return (
    <div className="todo-input">
      <input type="text" placeholder="请输入新增待办" value={newTodo} onChange={e => setNewTodo(e.target.value)} onKeyDown={handleKeyDown} />
      <button onClick={() => addTodo()}>新增待办</button>
    </div>
  )
}

export default AddTodo